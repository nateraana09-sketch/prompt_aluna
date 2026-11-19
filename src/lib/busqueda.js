/* Búsqueda local de conceptos con tolerancia a escritura y motivos pedagógicos transparentes */

export function normalize(s) {
  return (s || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

function near(a, b) {
  if (a.length < 5 || Math.abs(a.length - b.length) > 1) return false;
  if (a.length === b.length) {
    const dif = [...a].map((c, i) => (c !== b[i] ? i : -1)).filter(i => i >= 0);
    if (dif.length === 2 && dif[1] === dif[0] + 1 && a[dif[0]] === b[dif[1]] && a[dif[1]] === b[dif[0]]) {
      return true;
    }
  }
  let row = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    let next = [i];
    for (let j = 1; j <= b.length; j++) {
      next[j] = Math.min(next[j - 1] + 1, row[j] + 1, row[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    }
    row = next;
  }
  return row[b.length] <= 1;
}

export function buscar(data, input) {
  const q = normalize(input);
  if (!data || !data.conceptos) return [];
  
  return data.conceptos.flatMap(c => {
    if (!q) {
      return [{ concepto: c, motivo: `Eje ${c.eje} · ${c.tipo}` }];
    }
    if (normalize(c.nombre).includes(q)) {
      return [{ concepto: c, motivo: 'Coincidencia con el nombre' }];
    }
    if (c.termino_documental && normalize(c.termino_documental).includes(q)) {
      return [{ concepto: c, motivo: 'Grafía documental · pendiente de validación lingüística' }];
    }
    const terms = (data.busqueda && data.busqueda[c.id]) || [];
    const term = terms.find(t => normalize(t.texto).includes(q));
    if (term) {
      return [{ concepto: c, motivo: `${term.clase}: «${term.texto}»` }];
    }
    if ([c.nombre, ...terms.map(t => t.texto)].some(t => normalize(t).split(/\s+/).some(w => near(q, w)))) {
      return [{ concepto: c, motivo: 'Posible coincidencia por escritura · revisa el concepto' }];
    }
    return [];
  });
}
