const {setup,root}=require('./test-dom.cjs');
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const {window,doc,data}=setup();
vm.runInNewContext(fs.readFileSync(root+'/assets/js/experiencias.js','utf8'),{window,document:doc,console});
const $=s=>doc.querySelector(s),all=s=>[...doc.querySelectorAll(s)];
const checks=[];function test(name,f){f();checks.push(name);}
function clickText(host,text){const b=[...host.querySelectorAll('button')].find(b=>b.textContent===text);assert.ok(b,`Falta ${text}`);b.click();}
const game=n=>$(`[data-experience="${n}"]`);
test('Cuatro mecánicas en sus ejes, con cierre contextual y fuentes',()=>{assert.equal(all('.playground').length,4);for(let n=1;n<=4;n++){assert.equal(game(n).closest('.eje-content').id,`eje${n}`);assert.ok(game(n).querySelector('.play-source'));assert.ok(game(n).querySelector('[role=status]'));}});
test('Clasificar, reubicar, comparar y vaciar sin calificar',()=>{
 for(const [id,zone]of [['rabia','sentir'],['idea','pensar'],['insulto','actuar'],['pregunta','actuar']]){game(1).querySelector(`[data-piece="${id}"]`).click();game(1).querySelector(`[data-drop="${zone}"]>button`).click();assert.equal(game(1).querySelector(`[data-piece="${id}"]`).parentElement.dataset.drop,zone);}
 clickText(game(1),'Comparar una lectura posible');assert.ok(game(1).querySelector('.play-feedback').textContent.includes('Una lectura posible'));
 game(1).querySelector('[data-piece="rabia"]').click();game(1).querySelector('[data-drop="pensar"]>button').click();assert.equal(game(1).querySelector('[data-piece="rabia"]').parentElement.dataset.drop,'pensar');
 clickText(game(1),'Vaciar la mesa');assert.equal(game(1).querySelectorAll('.phrase-tray .phrase').length,4);
});
test('Arrastre por eventos de puntero mueve la pieza; cancelación no la mueve',()=>{
 const b=game(1).querySelector('[data-piece="idea"]');doc.elementFromPoint=()=>game(1).querySelector('[data-drop="pensar"]');
 function pointer(type,x){const e=new window.Event(type);e.clientX=x;e.clientY=50;e.button=0;b.dispatchEvent(e);}
 pointer('pointerdown',20);pointer('pointermove',60);assert.ok($('.drag-ghost'));pointer('pointerup',80);assert.equal(game(1).querySelector('[data-piece="idea"]').parentElement.dataset.drop,'pensar');assert.equal($('.drag-ghost'),null);
 const c=game(1).querySelector('[data-piece="insulto"]');const e=new window.Event('pointerdown');e.clientX=10;e.clientY=10;c.dispatchEvent(e);c.dispatchEvent(new window.Event('pointercancel'));assert.equal(c.parentElement.className,'phrase-tray');
});
test('Secuencia cambia posiciones, ofrece explicación del orden y reinicia',()=>{
 const board=game(2).querySelector('.play-board');const initial=board.querySelector('.sequence-handle').textContent;
 clickText(board.querySelector('.sequence-piece'),'Bajar');assert.notEqual(board.querySelector('.sequence-handle').textContent,initial);
 clickText(game(2),'Recorrer mi secuencia');assert.ok(game(2).querySelector('.play-feedback').textContent.includes('Dulazhikshiji'));assert.equal(board.dataset.connected,'true');
 clickText(game(2),'Reiniciar piezas');assert.equal(board.querySelector('.sequence-handle').textContent,initial);
});
test('Historia ramifica, permite regresar y tiene cierres distintos',()=>{
 clickText(game(3),'Ofrecer escuchar');assert.equal(game(3).dataset.branch,'escucha');clickText(game(3),'Preguntar qué apoyo preferiría');assert.equal(game(3).dataset.branch,'eleccion');assert.ok(game(3).querySelector('a[href="apoyo.html"]'));
 clickText(game(3),'Volver una decisión');assert.equal(game(3).dataset.branch,'escucha');clickText(game(3),'Empezar otra historia');clickText(game(3),'Proponer buscar compañía');clickText(game(3),'Explorar atención en salud');assert.equal(game(3).dataset.branch,'salud');assert.ok(game(3).querySelector('.story-ending'));
});
test('Lupa descubre tres capas, produce síntesis y se puede reiniciar',()=>{
 const range=$('#lupa-posicion');for(const value of ['0','50','100']){range.value=value;range.dispatchEvent(new window.Event('input'));}
 assert.equal(game(4).querySelectorAll('[data-revealed=true]').length,3);assert.ok(game(4).querySelector('.play-feedback').textContent.includes('tres capas'));
 clickText(game(4),'Volver a observar');assert.equal(game(4).querySelectorAll('[data-revealed=true]').length,1);
});
test('Alternativas gráficas son reversibles y locales',()=>{const host=game(1);clickText(host,'Felino (estudio)');assert.ok(host.querySelector('.guide-row img').src.endsWith('guia-felino.svg'));clickText(host,'Rama');assert.ok(host.querySelector('.guide-row img').src.endsWith('guia-rama.svg'));});
test('Búsqueda con relaciones transparentes, errores y vacío justificado',()=>{
 for(const q of ['enojo','molesto','rabia','rabai']){const r=window.BusquedaLocal.buscar(data,q);assert.ok(r.some(r=>r.concepto.id==='rabia'));assert.ok(r.every(r=>r.motivo));}
 assert.equal(window.BusquedaLocal.buscar(data,'impotencia').length,0);
 assert.equal(window.BusquedaLocal.buscar(data,'Twan')[0].concepto.id,'preocupacion');
 assert.ok(window.BusquedaLocal.buscar(data,'Twan')[0].motivo.includes('pendiente'));
 assert.ok(data.conceptos.length>12);assert.ok(data.conceptos.every(c=>c.fuente&&c.eje&&c.resumen&&c.visual));
});
test('Las actividades no piden texto íntimo ni generan perfiles',()=>{assert.equal(all('.playground textarea,.playground input:not([type=range])').length,0);const code=fs.readFileSync(root+'/assets/js/experiencias.js','utf8');assert.ok(!/localStorage|sessionStorage|fetch\(/.test(code));});
test('Marco solo en escritorio superior, nunca dentro del documento móvil',()=>{
 const code=fs.readFileSync(root+'/assets/js/presentacion.js','utf8');
 for(const [width,nested,expected]of [[1366,false,true],[430,false,false],[390,false,false],[360,false,false],[1366,true,false]]){
  const s=setup();const w={innerWidth:width};w.self=w;w.top=nested?{}:w;
  vm.runInNewContext(code,{window:w,document:s.doc,location:{href:'http://127.0.0.1:8000/aprender.html'},URL,history:{replaceState(){}}});
  assert.equal(!!s.doc.querySelector('iframe.device-content'),expected);
 }
});
console.log(JSON.stringify({tipo:'Pruebas de mecánicas con DOM emulado; sin motor de renderizado',estado:'OK',grupos:checks.length,checks},null,2));
