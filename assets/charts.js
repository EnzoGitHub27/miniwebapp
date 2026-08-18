/* ============================================================
   Mini Web App — grafici
   ------------------------------------------------------------
   Sostituisce Chart.js. Disegna SVG, non canvas: nitido su ogni
   schermo, segue il tema chiaro/scuro senza ridisegnare nulla,
   si stampa bene e non dipende da nessun server esterno.

   La scala è sempre quella che dichiari tu (max), quindi due
   rilevazioni fatte in momenti diversi restano confrontabili:
   era il difetto principale della vecchia versione con Chart.js.

       Charts.radar(elemento, {
         labels: ['Finanze','Lavoro', ...],
         max: 10,
         series: [{ name:'Oggi', values:[7,6,...] }]
       });

       Charts.bars(elemento, {
         labels: ['TV','Streaming','Social'],
         max: 10,
         values: [3,7,9]
       });
   ============================================================ */
(function (global) {
  'use strict';

  var NS = 'http://www.w3.org/2000/svg';

  function el(name, attrs) {
    var node = document.createElementNS(NS, name);
    for (var k in attrs) if (attrs[k] != null) node.setAttribute(k, attrs[k]);
    return node;
  }

  /* Colori delle serie: il primo è l'accento dell'app, gli altri
     sono neutri di appoggio. Letti dal CSS, quindi cambiano da soli
     quando l'utente passa da chiaro a scuro. */
  function seriesColor(index, node) {
    var cs = getComputedStyle(node);
    var accent = cs.getPropertyValue('--accent').trim() || '#2f6ad1';
    var mute = cs.getPropertyValue('--text-mute').trim() || '#77829a';
    return index === 0 ? accent : mute;
  }

  function themeInk(node) {
    var cs = getComputedStyle(node);
    return {
      grid: cs.getPropertyValue('--stroke').trim() || '#ccc',
      grid2: cs.getPropertyValue('--stroke-2').trim() || '#999',
      text: cs.getPropertyValue('--text-dim').trim() || '#444',
      mute: cs.getPropertyValue('--text-mute').trim() || '#888'
    };
  }

  /* Manda a capo un'etichetta lunga su più righe */
  function wrap(text, limit) {
    var words = String(text).split(' ');
    var lines = [], line = '';
    words.forEach(function (w) {
      if ((line + ' ' + w).trim().length > limit && line) { lines.push(line); line = w; }
      else { line = (line + ' ' + w).trim(); }
    });
    if (line) lines.push(line);
    return lines;
  }

  /* ---------------------------------------------------------
     Radar
     --------------------------------------------------------- */
  function radar(host, opts) {
    if (!host) return;
    var labels = opts.labels || [];
    var series = (opts.series || []).filter(function (s) { return s && s.values; });
    var max = opts.max || 10;
    var rings = opts.rings || 5;
    var n = labels.length;
    if (!n || !series.length) { host.innerHTML = ''; return; }

    var ink = themeInk(host);
    var pad = opts.labelRoom || 92;          // spazio per le etichette attorno
    var R = 150;                             // raggio della tela
    var size = (R + pad) * 2;
    var cx = size / 2, cy = size / 2;

    var svg = el('svg', {
      viewBox: '0 0 ' + size + ' ' + size,
      role: 'img',
      'aria-label': opts.alt || 'Grafico radar',
      style: 'width:100%;height:auto;display:block;overflow:visible'
    });

    function point(i, value) {
      var a = (Math.PI * 2 * i) / n - Math.PI / 2;
      var r = (Math.max(0, Math.min(max, value)) / max) * R;
      return [cx + Math.cos(a) * r, cy + Math.sin(a) * r];
    }
    function edge(i, k) {
      var a = (Math.PI * 2 * i) / n - Math.PI / 2;
      return [cx + Math.cos(a) * R * k, cy + Math.sin(a) * R * k];
    }

    /* anelli */
    for (var r = 1; r <= rings; r++) {
      var k = r / rings, pts = [];
      for (var i = 0; i < n; i++) {
        var p = edge(i, k);
        pts.push(p[0].toFixed(1) + ',' + p[1].toFixed(1));
      }
      svg.appendChild(el('polygon', {
        points: pts.join(' '),
        fill: r === rings ? 'none' : 'none',
        stroke: r === rings ? ink.grid2 : ink.grid,
        'stroke-width': r === rings ? 1.4 : 1
      }));
    }

    /* raggi */
    for (var j = 0; j < n; j++) {
      var e = edge(j, 1);
      svg.appendChild(el('line', {
        x1: cx, y1: cy, x2: e[0].toFixed(1), y2: e[1].toFixed(1),
        stroke: ink.grid, 'stroke-width': 1
      }));
    }

    /* valori degli anelli, su un solo raggio per non affollare */
    if (opts.showScale !== false) {
      for (var t = 1; t <= rings; t++) {
        svg.appendChild(el('text', {
          x: cx + 5, y: cy - (R * t) / rings + 4,
          'font-size': 11, fill: ink.mute, 'font-family': 'Inter,sans-serif'
        })).textContent = Math.round((max * t) / rings);
      }
    }

    /* serie */
    series.forEach(function (s, si) {
      var color = s.color || seriesColor(si, host);
      var pts = s.values.map(function (v, i) {
        var p = point(i, Number(v) || 0);
        return p[0].toFixed(1) + ',' + p[1].toFixed(1);
      }).join(' ');

      svg.appendChild(el('polygon', {
        points: pts,
        fill: color, 'fill-opacity': si === 0 ? .18 : .09,
        stroke: color, 'stroke-width': si === 0 ? 2.4 : 1.8,
        'stroke-linejoin': 'round',
        'stroke-dasharray': si === 0 ? null : '5 4'
      }));

      if (si === 0) {
        s.values.forEach(function (v, i) {
          var p = point(i, Number(v) || 0);
          svg.appendChild(el('circle', {
            cx: p[0].toFixed(1), cy: p[1].toFixed(1), r: 3.6,
            fill: color, stroke: 'var(--surface)', 'stroke-width': 1.6
          }));
        });
      }
    });

    /* etichette */
    labels.forEach(function (label, i) {
      var a = (Math.PI * 2 * i) / n - Math.PI / 2;
      var lx = cx + Math.cos(a) * (R + 16);
      var ly = cy + Math.sin(a) * (R + 16);
      var cos = Math.cos(a);
      var anchor = Math.abs(cos) < .25 ? 'middle' : (cos > 0 ? 'start' : 'end');
      var lines = wrap(label, 14);
      var text = el('text', {
        x: lx.toFixed(1), y: (ly + 4).toFixed(1),
        'text-anchor': anchor, 'font-size': 12.5, fill: ink.text,
        'font-family': 'Inter,sans-serif'
      });
      // centra verticalmente il blocco di righe
      var shift = -((lines.length - 1) * 14) / 2;
      lines.forEach(function (line, li) {
        var span = el('tspan', { x: lx.toFixed(1), dy: li === 0 ? shift : 14 });
        span.textContent = line;
        text.appendChild(span);
      });
      svg.appendChild(text);
    });

    host.innerHTML = '';
    host.appendChild(svg);

    /* legenda, solo se ci sono più serie */
    if (series.length > 1) {
      var leg = document.createElement('div');
      leg.className = 'row-wrap small';
      leg.style.cssText = 'justify-content:center;gap:1rem;margin-top:.5rem';
      series.forEach(function (s, si) {
        var color = s.color || seriesColor(si, host);
        var item = document.createElement('span');
        item.className = 'row-wrap';
        item.style.gap = '.4rem';
        item.innerHTML =
          '<span style="width:.85rem;height:.2rem;border-radius:2px;background:' + color +
          (si ? ';opacity:.7' : '') + '"></span>' +
          '<span class="dim">' + (s.name || 'Serie ' + (si + 1)) + '</span>';
        leg.appendChild(item);
      });
      host.appendChild(leg);
    }

    /* alternativa testuale per chi non vede il grafico */
    if (opts.table !== false) {
      var tbl = document.createElement('table');
      tbl.className = 'sr-only';
      var head = '<tr><th>Area</th>' + series.map(function (s, si) {
        return '<th>' + (s.name || 'Serie ' + (si + 1)) + '</th>';
      }).join('') + '</tr>';
      var body = labels.map(function (l, i) {
        return '<tr><td>' + l + '</td>' + series.map(function (s) {
          return '<td>' + (s.values[i] != null ? s.values[i] : '') + '</td>';
        }).join('') + '</tr>';
      }).join('');
      tbl.innerHTML = '<caption>' + (opts.alt || 'Dati del grafico') + '</caption>' +
                      '<thead>' + head + '</thead><tbody>' + body + '</tbody>';
      host.appendChild(tbl);
    }
  }

  /* ---------------------------------------------------------
     Barre orizzontali
     --------------------------------------------------------- */
  function bars(host, opts) {
    if (!host) return;
    var labels = opts.labels || [];
    var values = opts.values || [];
    var max = opts.max || Math.max.apply(null, values.concat([1]));
    if (!labels.length) { host.innerHTML = ''; return; }

    var wrapEl = document.createElement('div');
    wrapEl.className = 'stack';
    wrapEl.style.gap = '.6rem';

    labels.forEach(function (label, i) {
      var v = Number(values[i]) || 0;
      var pct = Math.max(0, Math.min(100, (v / max) * 100));
      var row = document.createElement('div');
      row.className = 'stack';
      row.style.gap = '.25rem';
      row.innerHTML =
        '<div class="spread small" style="gap:.5rem">' +
          '<span class="dim">' + label + '</span>' +
          '<b class="nums">' + (opts.format ? opts.format(v) : v) + '</b>' +
        '</div>' +
        '<div class="progress"><i style="width:' + pct.toFixed(1) + '%' +
          (opts.colors && opts.colors[i] ? ';background:' + opts.colors[i] : '') +
        '"></i></div>';
      wrapEl.appendChild(row);
    });

    host.innerHTML = '';
    host.appendChild(wrapEl);
  }

  /* ---------------------------------------------------------
     Esporta il radar come immagine PNG
     --------------------------------------------------------- */
  function toPng(host, filename, scale) {
    var svg = host.querySelector('svg');
    if (!svg) return Promise.reject(new Error('nessun grafico da esportare'));

    var cs = getComputedStyle(host);
    var bg = cs.getPropertyValue('--surface').trim() || '#fff';
    var clone = svg.cloneNode(true);
    clone.setAttribute('xmlns', NS);
    // le variabili CSS non sopravvivono alla serializzazione
    Array.prototype.forEach.call(clone.querySelectorAll('[stroke="var(--surface)"]'), function (n) {
      n.setAttribute('stroke', bg);
    });

    var box = svg.viewBox.baseVal;
    var w = box.width, h = box.height;
    var k = scale || 2;
    var data = new XMLSerializer().serializeToString(clone);
    var url = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(data);

    return new Promise(function (resolve, reject) {
      var img = new Image();
      img.onload = function () {
        var canvas = document.createElement('canvas');
        canvas.width = w * k; canvas.height = h * k;
        var ctx = canvas.getContext('2d');
        ctx.fillStyle = bg;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        canvas.toBlob(function (blob) {
          if (!blob) { reject(new Error('esportazione non riuscita')); return; }
          if (global.Shell) global.Shell.download(filename || 'grafico.png', blob);
          resolve(blob);
        }, 'image/png');
      };
      img.onerror = function () { reject(new Error('esportazione non riuscita')); };
      img.src = url;
    });
  }

  global.Charts = { radar: radar, bars: bars, toPng: toPng };
})(window);
