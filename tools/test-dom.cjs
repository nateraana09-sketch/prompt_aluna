/* Pruebas DOM: no lanza navegadores ni accede a perfiles. */
const {parseHTML}=require('./test-runtime/node_modules/linkedom');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..');
const legacyRoot=path.resolve(__dirname,'..','legacy_vanilla');
const checks=[];
function check(name,fn){fn();checks.push(name);}
function setup(url='http://127.0.0.1:8000/aprender.html',reducedMotion=false){
  const {window}=parseHTML(fs.readFileSync(path.join(legacyRoot,'aprender.html'),'utf8'));
  const doc=window.document;
  window.matchMedia=()=>({matches:reducedMotion,addEventListener(){}});
  window.HTMLElement.prototype.focus=function(){this.ownerDocument.testFocus=this;};
  window.HTMLElement.prototype.scrollIntoView=function(){};
  window.location=new URL(url);
  window.history={replaceState(_a,_b,url){window.location=new URL(url);}};
  const context=vm.createContext({window,document:doc,location:window.location,history:window.history,URL,console});
  vm.runInContext(fs.readFileSync(path.join(root,'assets/data/content.js'),'utf8'),context);
  vm.runInContext(fs.readFileSync(path.join(root,'assets/js/busqueda.js'),'utf8'),context);
  vm.runInContext(fs.readFileSync(path.join(root,'assets/js/app.js'),'utf8'),context);
  return {window,doc,data:window.ALUNA};
}
const {window,doc,data}=setup();
const $=s=>doc.querySelector(s),all=s=>[...doc.querySelectorAll(s)];
check('Inicialización: índice completo, paisaje y eje 1',()=>{
  assert.equal(all('.concept-row').length,data.conceptos.length);assert.equal(all('.landmark').length,4);
  assert.equal($('#eje1').hidden,false);assert.equal($('#panel-detalle').hidden,true);
});
check('Cada concepto: tres lecturas con contenido y cierre',()=>{
  for(const c of data.conceptos){
    $(`.concept-row[data-concept="${c.id}"]`).click();
    assert.equal($('#pd-titulo').textContent,c.nombre);assert.equal($('#panel-detalle').hidden,false);
    assert.equal($('#territorio').dataset.ambiente,c.escena);
    const tabs=all('.pd-tab');assert.equal(tabs.length,3);
    for(const t of tabs){t.click();assert.ok($('#pd-cuerpo').textContent.length>100);assert.equal(t.getAttribute('aria-pressed'),'true');}
    $('#panel-cierre').click();assert.equal($('#panel-detalle').hidden,true);
    assert.equal(doc.testFocus.dataset.concept,c.id);
  }
});
check('Búsqueda con y sin tildes y estado sin coincidencias',()=>{
  for(const query of ['alegria','alegría','MAULDI','xyzsincoincidencia']){
    $('#buscar').value=query;$('#buscar').dispatchEvent(new window.Event('input'));
    assert.equal(all('.concept-row').length,query==='xyzsincoincidencia'?0:1);
  }
  $('#buscar').value='';$('#buscar').dispatchEvent(new window.Event('input'));assert.equal(all('.concept-row').length,data.conceptos.length);
});
check('Cambios de paisaje, URL de imagen y botones',()=>{
  for(const id of ['bosque','flores','rio']){
    $(`[data-scene="${id}"]`).click();assert.equal($('#territorio').dataset.ambiente,id);
    assert.equal($(`[data-scene="${id}"]`).getAttribute('aria-pressed'),'true');
    assert.ok(fs.existsSync(path.join(root,$('#paisaje').getAttribute('src'))));
  }
});
check('Nikuma enlaza desde el paisaje a su eje completo',()=>{
  $('[data-scene="flores"]').click();$('.landmark[data-concept="nikuma"]').click();assert.equal($('#eje2').hidden,false);
});
check('Los cuatro ejes funcionan y solo uno queda visible',()=>{
  for(let i=1;i<=4;i++){$(`[data-eje="${i}"]`).click();assert.equal($(`#eje${i}`).hidden,false);assert.equal(all('.eje-content').filter(s=>!s.hidden).length,1);}
});
check('Escape cierra y devuelve el foco',()=>{
  $('[data-eje="1"]').click();$('.concept-row').click();const e=new window.Event('keydown');e.key='Escape';doc.dispatchEvent(e);assert.equal($('#panel-detalle').hidden,true);
});
check('Pausa ambiental y reflexión sin puntuación',()=>{
  $('#movimiento').click();assert.equal($('#movimiento').getAttribute('aria-pressed'),'true');$('#movimiento').click();assert.equal($('#movimiento').getAttribute('aria-pressed'),'false');
  $('#reflexion').click();assert.equal($('#reflexion-texto').hidden,false);$('#reflexion').click();assert.equal($('#reflexion-texto').hidden,true);
});
check('Entrada directa a cada eje y URL inválida',()=>{
  for(const id of ['1','2','3','4','99']){const s=setup(`http://127.0.0.1:8000/aprender.html?eje=${id}`);assert.equal(s.doc.querySelector(`#eje${id==='99'?'1':id}`).hidden,false);}
});
check('El índice por enlace directo activa el eje correcto',()=>{const s=setup('http://127.0.0.1:8000/aprender.html?eje=3#indice');assert.equal(s.doc.querySelector('#eje1').hidden,false);});
check('Gestos horizontales cambian paisaje; verticales y cancelados no',()=>{
  const surface=$('#territorio');
  function pointer(type,x,y){const e=new window.Event(type);e.pointerType='touch';e.clientX=x;e.clientY=y;surface.dispatchEvent(e);}
  $('[data-scene="bosque"]').click();pointer('pointerdown',220,100);pointer('pointerup',100,110);assert.equal(surface.dataset.ambiente,'flores');
  pointer('pointerdown',100,100);pointer('pointerup',110,230);assert.equal(surface.dataset.ambiente,'flores');
  pointer('pointerdown',220,100);pointer('pointercancel',180,100);pointer('pointerup',100,100);assert.equal(surface.dataset.ambiente,'flores');
});
check('Preferencia de movimiento reducido inicia con animación pausada',()=>{const s=setup(undefined,true);assert.equal(s.doc.querySelector('#movimiento').getAttribute('aria-pressed'),'true');});
check('Cada actividad ofrece tres miradas independientes y se puede revisitar',()=>{
  assert.equal(all('.learning-activity').length,4);
  for(const activity of data.actividades){
    const host=$(`[data-activity="${activity.id}"]`),buttons=[...host.querySelectorAll('.activity-controls button')];
    assert.equal(host.closest('.eje-content').id,`eje${activity.id}`);assert.equal(buttons.length,3);
    for(const i of [2,0,1,2]){buttons[i].click();assert.equal(host.querySelector('h4').textContent,activity.pasos[i].titulo);assert.equal(buttons[i].getAttribute('aria-pressed'),'true');assert.ok(host.querySelector('.reflection-prompt').textContent.length>20);}
  }
});
check('Todos los referentes visuales dinámicos existen y ya no hay orbes genéricos',()=>{
  for(const id of ['bosque','flores','rio']){$(`[data-scene="${id}"]`).click();assert.equal(all('.orb').length,0);for(const img of all('.landmark img'))assert.ok(fs.existsSync(path.join(root,img.src)));}
  for(const c of data.conceptos)assert.ok(fs.existsSync(path.join(root,`assets/img/elemento-${c.visual}.svg`)));
});
check('Contenido breve primero; fuentes y profundización permanecen plegadas',()=>{
  $('.concept-row[data-concept="preocupacion"]').click();assert.ok($('.concept-composition').textContent.length<300);assert.equal($('.reading-more').hasAttribute('open'),false);assert.equal($('#pd-cuerpo .reading-source').hasAttribute('open'),false);
});
check('Índice y créditos accesibles por enlace directo',()=>{
  const a=setup('http://127.0.0.1:8000/aprender.html#indice');assert.equal(a.doc.querySelector('#indice').open,true);
  const b=setup('http://127.0.0.1:8000/aprender.html#procedencia');assert.equal(b.doc.querySelector('#procedencia').open,true);
});
check('Cada elemento del paisaje ejecuta su acción individualmente',()=>{
  for(const id of ['bosque','flores','rio']){
    $('[data-eje="1"]').click();$(`[data-scene="${id}"]`).click();
    const ids=all('.landmark').map(b=>b.dataset.concept);
    for(const concept of ids){
      $('[data-eje="1"]').click();$(`[data-scene="${id}"]`).click();$(`.landmark[data-concept="${concept}"]`).click();
      if(concept==='nikuma'){assert.equal($('#eje2').hidden,false);assert.equal($('.territorio').hidden,true);}
      else{assert.equal($('#panel-detalle').hidden,false);assert.equal($('#pd-titulo').textContent,data.conceptos.find(c=>c.id===concept).nombre);$('#panel-cierre').click();}
    }
  }
});
check('Exploración del árbol: tres preguntas diferentes, sin datos personales',()=>{
  const results=new Set();for(const b of all('[data-tree]')){b.click();results.add($('#tree-question').textContent);assert.equal(b.getAttribute('aria-pressed'),'true');}assert.equal(results.size,3);
});
check('Sugerir otra mirada abre contenido y permite volver al control',()=>{
  $('[data-eje="1"]').click();$('#recorrer').click();assert.equal($('#panel-detalle').hidden,false);$('#panel-cierre').click();assert.equal(doc.testFocus.id,'recorrer');
});
check('Cuatro páginas sin la marca anterior, apoyo visible y número marcado correctamente',()=>{
  for(const name of ['index.html','aprender.html','apoyo.html','acerca.html']){
    const html=fs.readFileSync(path.join(legacyRoot,name),'utf8');assert.ok(!/\bALUNA\b/i.test(html));const page=parseHTML(html).document;assert.ok(page.querySelector('nav.app-nav a[href="apoyo.html"]'));
  }
  assert.ok(parseHTML(fs.readFileSync(path.join(legacyRoot,'apoyo.html'),'utf8')).document.querySelector('a[href="tel:106"]'));
});
if(require.main===module)console.log(JSON.stringify({tipo:'DOM emulado; no prueba de renderizado',estado:'OK',grupos:checks.length,checks},null,2));

module.exports={setup,root};
