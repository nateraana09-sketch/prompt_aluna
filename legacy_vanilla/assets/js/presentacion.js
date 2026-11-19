/* En escritorio, el documento real se renderiza a 414 px en un marco local.
   En teléfonos no se crea ningún marco ni iframe. Sin red externa ni perfiles. */
(()=>{
 if(window.self!==window.top||window.innerWidth<900)return;
 const current=new URL(location.href);
 const frame=document.createElement('iframe');frame.title='Prototipo móvil interactivo';frame.src=current.href;frame.className='device-content';
 const shell=document.createElement('div');shell.className='device-shell';shell.append(frame);
 const caption=document.createElement('p');caption.className='device-caption';caption.textContent='Prototipo móvil · Explora dentro del dispositivo';
 document.body.replaceChildren(shell,caption);document.body.className='desktop-presentation';
 frame.addEventListener('load',()=>{try{document.title=frame.contentDocument.title;history.replaceState(null,'',frame.contentWindow.location.href);}catch{/* Los enlaces externos se abren fuera del marco. */}});
})();
