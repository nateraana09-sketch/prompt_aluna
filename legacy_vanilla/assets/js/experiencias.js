/* Cuatro mecánicas educativas locales. Situaciones ficticias; sin resultados personales. */
(()=>{
 const $=s=>document.querySelector(s),all=s=>[...document.querySelectorAll(s)];
 if(!$('#eje1'))return;
 const el=(tag,text,cls)=>{const e=document.createElement(tag);if(text)e.textContent=text;if(cls)e.className=cls;return e;};
 function button(text,fn,cls){const b=el('button',text,cls);b.type='button';b.addEventListener('click',fn);return b;}
 function activity(axis,title,intro,instruction){
  const box=el('section','','playground');box.dataset.experience=axis;
  box.append(el('p','Exploración participativa · Puedes volver a empezar','eyebrow'),el('h3',title),el('p',intro),el('p',instruction,'play-instruction'));
  const state=el('p','','play-feedback');state.setAttribute('role','status');
  const board=el('div','','play-board');box.append(board,state);
  const guide=el('details','','guide-options');guide.append(el('summary','Guía visual · propuesta ajustable'),el('p','La rama señala dónde actuar; el felino es otra propuesta gráfica sin significado cultural atribuido. Ninguno es una figura tradicional ni interpreta lo que sientes.'));
  const image=el('img');image.src='assets/img/guia-rama.svg';image.alt='Rama ilustrada que dirige la atención hacia la actividad';image.width=140;image.height=100;
  const guideRow=el('div','','guide-row');guideRow.append(image,button('Rama',()=>{image.src='assets/img/guia-rama.svg';image.alt='Rama ilustrada';}),button('Felino (estudio)',()=>{image.src='assets/img/guia-felino.svg';image.alt='Estudio gráfico de un felino, pendiente de revisión';}));
  guide.append(guideRow);box.append(guide);
  const anchor=$(`[data-activity="${axis}"]`);anchor.before(box);
  const old=el('details','','previous-reading');old.append(el('summary','Explorar las miradas de la fase anterior'));anchor.replaceWith(old);old.append(anchor);
  return {box,board,state};
 }
 // Puntero y alternativa de dos toques: ningún contenido depende de arrastrar.
 function draggable(item,onDrop){
  let start=null,ghost=null;
  item.addEventListener('pointerdown',e=>{if(e.button>0)return;start={x:e.clientX,y:e.clientY};});
  item.addEventListener('pointermove',e=>{
   if(!start)return;
   if(!ghost&&Math.hypot(e.clientX-start.x,e.clientY-start.y)>8){ghost=item.cloneNode(true);ghost.className='drag-ghost';ghost.setAttribute('aria-hidden','true');document.body.append(ghost);item.setPointerCapture?.(e.pointerId);}
   if(ghost){ghost.style.left=`${e.clientX}px`;ghost.style.top=`${e.clientY}px`;}
  });
  const finish=e=>{if(ghost){ghost.remove();ghost=null;const target=document.elementFromPoint?.(e.clientX,e.clientY)?.closest('[data-drop]');if(target)onDrop(target.dataset.drop);}start=null;};
  item.addEventListener('pointerup',finish);item.addEventListener('pointercancel',()=>{ghost?.remove();ghost=null;start=null;});
 }
 // 1. Clasificación manipulable: comparar una lectura posible, no puntuar.
 {
  const {box,board,state}=activity(1,'Desarma una discusión','Una tarea compartida no salió como se esperaba. Distingue lo que se siente, se piensa y se hace.','Toca una frase y después una zona. También puedes arrastrarla. Puedes moverla otra vez.');
  const phrases=[['rabia','«Siento rabia»','sentir','La rabia es una emoción. El documento nombra Sheishe; no equivale a maltratar.'],['idea','«No me están escuchando»','pensar','Es una interpretación de la situación, que podría contrastarse conversando.'],['insulto','«Le grita un insulto»','actuar','Aquí se describe una acción. Nusa se refiere en la fuente a rabia que llega al maltrato.'],['pregunta','«Pregunta qué ocurrió»','actuar','Preguntar puede abrir diálogo sin asumir qué piensa la otra persona.']];
  let selected=null,places={};const tray=el('div','','phrase-tray'),zones=el('div','','drop-zones');board.append(tray,zones);
  function move(id,zone){if(!['sentir','pensar','actuar'].includes(zone))return;places[id]=zone;selected=null;draw();board.querySelector(`[data-piece="${id}"]`).focus({preventScroll:true});state.textContent=phrases.find(p=>p[0]===id)[3];}
  function draw(){tray.replaceChildren();zones.replaceChildren();zones.removeAttribute('data-compared');
   const containers={};for(const [id,label]of [['sentir','Sentir'],['pensar','Pensar'],['actuar','Actuar']]){const z=el('div','','drop-zone');z.dataset.drop=id;z.append(button(label,()=>{if(selected)move(selected,id);else state.textContent='Primero elige una frase de la escena.';}));zones.append(z);containers[id]=z;}
   for(const [id,text]of phrases){const b=button(text,()=>{selected=id;all('[data-piece]').forEach(t=>t.setAttribute('aria-pressed',String(t.dataset.piece===id)));state.textContent='Ahora elige Sentir, Pensar o Actuar.';},'phrase');b.dataset.piece=id;b.setAttribute('aria-pressed','false');draggable(b,zone=>move(id,zone));(containers[places[id]]||tray).append(b);}
  }
  box.append(button('Comparar una lectura posible',()=>{
   if(Object.keys(places).length<phrases.length){state.textContent='Ubica las cuatro frases para observar sus relaciones. No hay una nota ni un resultado personal.';return;}
   state.textContent='Una lectura posible distingue la rabia (sentir), la interpretación (pensar) y el insulto o la pregunta (actuar). Tu distribución se conserva para compararla; puedes cambiarla. Sentir una emoción no justifica una agresión.';
   zones.dataset.compared='true';
  },'play-primary'),button('Vaciar la mesa',()=>{selected=null;places={};draw();state.textContent='Mesa vacía. Puedes probar otra distribución.';}));
  draw();box.append(el('p','Fuente: documento 2024 §7.2 y §8.1. Frases y agrupación: propuesta pedagógica del equipo, no traducción cultural.','play-source'));
 }
 // 2. Rompecabezas de proceso: reorganizar y explicar el orden propuesto.
 {
  const {box,board,state}=activity(2,'Construye una conversación','Dos personas necesitan retomar un trabajo después de un desacuerdo.','Reordena las piezas con Subir y Bajar o arrastra una sobre otra. Después observa el recorrido.');
  let order=['acordar','observar','escuchar'];const names={observar:'Observar lo ocurrido',escuchar:'Escuchar otra perspectiva',acordar:'Proponer un acuerdo'};
  function move(id,to){const from=order.indexOf(id),target=typeof to==='number'?to:order.indexOf(to);if(target<0||target>=order.length)return;order.splice(from,1);order.splice(target,0,id);draw();state.textContent='Recorrido reorganizado. Puedes explorar otro orden.';}
  function draw(){board.replaceChildren();order.forEach((id,i)=>{const row=el('div','','sequence-piece');row.dataset.drop=id;const handle=button(`${i+1}. ${names[id]}`,()=>{state.textContent='Usa Subir o Bajar para cambiar su posición.';},'sequence-handle');draggable(handle,to=>move(id,to));row.append(handle,button('Subir',()=>{move(id,i-1);board.querySelectorAll('.sequence-piece')[Math.max(0,i-1)].querySelector('button').focus();}),button('Bajar',()=>{move(id,i+1);board.querySelectorAll('.sequence-piece')[Math.min(2,i+1)].querySelector('button').focus();}));row.children[1].disabled=i===0;row.children[2].disabled=i===2;board.append(row);});}
  box.append(button('Recorrer mi secuencia',()=>{board.dataset.connected='true';state.textContent=`Tu recorrido: ${order.map(id=>names[id].toLowerCase()).join(' → ')}. Empezar por observar puede ayudar a distinguir hechos de suposiciones; escuchar puede modificar un acuerdo. No es una receta: los pasos pueden retomarse. Dulazhikshiji aparece en el documento como acuerdos y diálogo.`;},'play-primary'),button('Reiniciar piezas',()=>{order=['acordar','observar','escuchar'];board.removeAttribute('data-connected');draw();state.textContent='Prueba otra organización.';}));
  draw();box.append(el('p','Fuente: documento 2024 §8.1 y §8.3. Secuencia editorial; no reproduce un consejo ni una consulta tradicional.','play-source'));
 }
 // 3. Historia con bifurcaciones y memoria de decisiones, reversible.
 {
  const {box,board,state}=activity(3,'Un mensaje, varios caminos','Una amistad escribe: «Estos días me cuesta estar con los demás». No sabes qué está pasando.','Elige una respuesta para recorrer esta historia ficticia. Puedes volver a una decisión anterior.');
  const story={
   inicio:{text:'El mensaje llega al terminar el día. ¿Cómo abrirías la conversación?',choices:[['Ofrecer escuchar','escucha'],['Proponer buscar compañía','red']]},
   escucha:{text:'Respondes que puedes escuchar. La persona dice que prefiere no explicar todavía. Escuchar también incluye respetar ese límite.',choices:[['Ofrecer compañía sin pedir detalles','compania'],['Preguntar qué apoyo preferiría','eleccion']]},
   red:{text:'Propones buscar apoyo. La persona pregunta si tendrá que contar todo a alguien. No hace falta decidir por ella.',choices:[['Explorar una persona de confianza','compania'],['Explorar atención en salud','salud']]},
   compania:{text:'Acuerdan un momento para acompañarse. La cercanía puede facilitar otra conversación; no garantiza que el malestar desaparezca.',choices:[['Pensar también en otras redes','eleccion']]},
   eleccion:{text:'La persona puede elegir entre vínculos seguros, redes comunitarias y profesionales. No es obligatorio agotar una ruta antes de acceder a salud.',end:true},
   salud:{text:'Ofreces ayudar a ubicar un servicio de salud. El acompañamiento profesional y comunitario pueden complementarse; no se promete un resultado.',end:true}
  };let history=['inicio'];board.setAttribute('aria-live','polite');
  function draw(){const id=history.at(-1),s=story[id];board.replaceChildren();board.append(el('div','Una conversación imaginada','story-illustration'),el('p',s.text,'story-text'));for(const [label,to]of s.choices||[])board.append(button(label,()=>{history.push(to);draw();state.textContent='La historia cambia con esta decisión.';},'story-choice'));if(s.end){board.append(el('p','Lo que puedes descubrir: acompañar no es interpretar ni decidir por alguien. Si existe peligro inmediato, busca compañía y atención presencial urgente.','story-ending'));const link=el('a','Ver recursos de apoyo ↗','text-link');link.href='apoyo.html';board.append(link);}box.dataset.branch=id;}
  box.append(button('Volver una decisión',()=>{if(history.length>1)history.pop();draw();state.textContent='Puedes explorar otra respuesta.';}),button('Empezar otra historia',()=>{history=['inicio'];draw();state.textContent='Elige otro camino para comparar perspectivas.';}));draw();box.append(el('p','Base: recopilación §8 y documento 2024 §8.6–8.8. Historia y consecuencias posibles: adaptación del equipo, no testimonio ni predicción.','play-source'));
 }
 // 4. Exploración espacial: desplazar la lupa y descubrir tres capas de información.
 {
  const {box,board,state}=activity(4,'La lupa del contexto','Un mensaje menciona plantas y prácticas tradicionales. Una palabra sola no cuenta toda la historia.','Mueve la lupa sobre la lámina. También puedes usar el deslizador con las flechas del teclado.');
  const poster=el('div','','context-poster');const words=['CONTEXTO','INFORMACIÓN','ACOMPAÑAMIENTO'];words.forEach((w,i)=>{const z=el('span',w,'poster-zone');z.dataset.zone=i;poster.append(z);});
  const lens=el('span','','context-lens');lens.setAttribute('aria-hidden','true');poster.append(lens);
  const label=el('label','Posición de la lupa');label.htmlFor='lupa-posicion';const range=el('input');range.id='lupa-posicion';range.type='range';range.min='0';range.max='100';range.value='0';range.setAttribute('aria-describedby','lupa-desc');
  const desc=el('p','La posición permite descubrir tres aspectos del mensaje.');desc.id='lupa-desc';const seen=new Set();
  const explanations=['Contexto: jañu y nuake aparecen como plantas en las fuentes; sugi es un objeto. No son términos intercambiables.','Información: el documento identifica el acceso desinformado como preocupación. Una práctica tradicional no demuestra inocuidad ni autoriza una recomendación de uso.','Acompañamiento: ante una duda puedes conversar con una persona de confianza, autoridades tradicionales o servicios de salud. No hace falta inventar efectos para pedir orientación.'];
  function reveal(value){const v=Math.max(0,Math.min(100,Number(value)));range.value=String(v);poster.style.setProperty('--lens',`${10+v*.8}%`);const zone=Math.min(2,Math.floor(v/34));seen.add(zone);poster.querySelectorAll('.poster-zone').forEach((z,i)=>z.dataset.revealed=String(seen.has(i)));state.textContent=explanations[zone]+(seen.size===3?' Has explorado las tres capas: distinguir objeto, planta y contexto ayuda a preguntar antes de concluir.':'');}
  range.addEventListener('input',()=>reveal(range.value));
  let dragging=false;function point(e){const rect=poster.getBoundingClientRect();if(rect.width)reveal((e.clientX-rect.left)/rect.width*100);}
  poster.addEventListener('pointerdown',e=>{dragging=true;poster.setPointerCapture?.(e.pointerId);point(e);});poster.addEventListener('pointermove',e=>{if(dragging)point(e);});poster.addEventListener('pointerup',()=>{dragging=false;});poster.addEventListener('pointercancel',()=>{dragging=false;});
  board.append(poster,label,range,desc);box.append(button('Volver a observar',()=>{seen.clear();reveal(0);}));reveal(0);box.append(el('p','Fuente: documento 2024 §6.9.1, §7.2 y §7.3.3. Lámina y lupa son recursos editoriales; no se manipulan plantas ni objetos ceremoniales.','play-source'));
 }
})();
