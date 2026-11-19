"""Comprobaciones estáticas y HTTP locales; no es una prueba de navegador."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit, unquote
from urllib.request import urlopen
import hashlib,json,re,struct
import xml.etree.ElementTree as ET
ROOT=Path(__file__).resolve().parents[1]
class Document(HTMLParser):
    def __init__(self,path):
        super().__init__(convert_charrefs=True)
        self.path=path;self.ids=[];self.refs=[];self.images=[];self.scripts=[]
        self.feed(path.read_text(encoding='utf-8'))
    def handle_starttag(self,tag,attrs):
        a=dict(attrs)
        if 'id' in a:self.ids.append(a['id'])
        for key in ('href','src'):
            if key in a:self.refs.append(a[key])
        if tag=='img':self.images.append(a)
        if tag=='script' and 'src' in a:self.scripts.append(a['src'])
docs={p.name:Document(p) for p in ROOT.glob('*.html')}
errors=[]; resources=set(); pages=[]
for name,d in docs.items():
    if re.search(r'\bALUNA\b',d.path.read_text(encoding='utf-8'),re.I):errors.append(f'Marca anterior en HTML: {name}')
for name,d in docs.items():
    if len(d.ids)!=len(set(d.ids)):errors.append(f'ID duplicado: {name}')
    for image in d.images:
        if 'alt' not in image:errors.append(f'Imagen sin alternativa: {name}')
    for ref in d.refs:
        u=urlsplit(ref)
        if u.scheme or u.netloc:continue
        target=(d.path.parent/unquote(u.path)).resolve() if u.path else d.path
        if not target.exists():errors.append(f'Recurso inexistente: {name} -> {ref}');continue
        resources.add(target.relative_to(ROOT).as_posix())
        if u.fragment and target.suffix=='.html':
            other=docs.get(target.name)
            if not other or u.fragment not in other.ids:errors.append(f'Ancla inexistente: {name} -> {ref}')
    pages.append(name)
active=[*ROOT.glob('*.html'),*ROOT.glob('assets/**/*.js'),*ROOT.glob('assets/**/*.json'),*ROOT.glob('assets/**/*.css')]
for p in active:
    if re.search(r'alcohol|licor(?:es)?\b|cerveza|embriag|aguardiente|etanol',p.read_text(encoding='utf-8'),re.I):errors.append(f'Término excluido en recurso activo: {p.relative_to(ROOT)}')
    if p.suffix=='.css':
        css=re.sub(r'/\*.*?\*/','',p.read_text(encoding='utf-8'),flags=re.S)
        if css.count('{')!=css.count('}'):errors.append(f'Llaves CSS sin balance: {p}')
original=json.loads((ROOT/'backups/fuentes-sha256.json').read_text(encoding='utf-8-sig'))
for item in original:
    path=Path(item['Path'])
    if hashlib.sha256(path.read_bytes()).hexdigest().upper()!=item['Hash']:errors.append(f'Fuente alterada: {path.name}')
data=json.loads((ROOT/'assets/data/content.json').read_text(encoding='utf-8'))
runtime=(ROOT/'assets/data/content.js').read_text(encoding='utf-8')
js_data=json.loads(runtime.split('window.ALUNA = ',1)[1].rsplit(';',1)[0])
if data!=js_data:errors.append('Datos JSON y JS desincronizados')
if len(data['ejes'])!=4:errors.append('Cantidad de ejes incorrecta')
if 'glosario' in (ROOT/'acerca.html').read_text(encoding='utf-8').lower():errors.append('Glosario en Acerca')
images=[]
def jpeg_size(b):
    i=2
    while i<len(b):
        if b[i]!=255:i+=1;continue
        marker=b[i+1];i+=2
        if marker in (0xD8,0xD9):continue
        n=struct.unpack('>H',b[i:i+2])[0]
        if marker in (0xC0,0xC1,0xC2):
            h,w=struct.unpack('>HH',b[i+3:i+7]);return w,h
        i+=n
    raise ValueError('JPEG sin dimensiones')
for p in (ROOT/'assets/img').glob('*.jpg'):
    b=p.read_bytes();w,h=jpeg_size(b)
    images.append(dict(archivo=p.name,bytes=len(b),ancho=w,alto=h))
    resources.add(p.relative_to(ROOT).as_posix())
for p in (ROOT/'assets/img').glob('*.svg'):
    try:ET.fromstring(p.read_text(encoding='utf-8'))
    except ET.ParseError:errors.append(f'SVG inválido: {p.name}')
    resources.add(p.relative_to(ROOT).as_posix())
http=[]
for resource in sorted(resources|set(pages)):
    try:
        with urlopen('http://127.0.0.1:8000/'+resource,timeout=5) as response:
            status=response.status;body=response.read()
            if status!=200:errors.append(f'HTTP {status}: {resource}')
            http.append(dict(recurso=resource,status=status,bytes=len(body)))
    except Exception as error:errors.append(f'HTTP {resource}: {error}')
result=dict(fecha='2026-11-18',tipo='Inspección estática y recursos HTTP locales; sin navegador',paginas=pages,
    conceptos=len(data['conceptos']),ejes=len(data['ejes']),imagenes=images,fuentes_integras=not any('Fuente alterada' in x for x in errors),http=http,errores=errors,
    pendientes=['Inspección visual de páginas en navegador','Renderizado a 360, 390, 430 y 1366 px','Gestos y desplazamiento en un teléfono real','Consola y red de un navegador real','Validación comunitaria de grafías, asociaciones y términos sensibles'])
(ROOT/'VALIDACION.json').write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print(json.dumps(result,ensure_ascii=False,indent=2))
raise SystemExit(bool(errors))
