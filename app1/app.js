/* ============================================================
   Ruota della Vita — logica
   ------------------------------------------------------------
   Differenze rispetto alla versione precedente:
   - cursori al posto dei campi numerici da riempire a mano
   - il grafico si aggiorna mentre muovi i cursori
   - la scala resta fissa da 0 a 10 (prima cambiava da sola, quindi
     due ruote fatte in mesi diversi non erano confrontabili)
   - storico dei rilevamenti e sovrapposizione di due ruote
   - media e indice di squilibrio
   - PDF dalla stampa del browser, senza librerie esterne
   ============================================================ */
(function () {
  'use strict';

  const $ = Shell.$;
  const $$ = Shell.$$;
  const esc = Shell.esc;
  const store = Shell.store();

  const AREE_PREDEFINITE = [
    'Finanze', 'Lavoro', 'Salute e forma fisica', 'Emozioni',
    'Mente e spirito', 'Amicizie e svago', 'Famiglia', 'Rapporto di coppia'
  ];
  const MAX = 10;
  const MAX_STORIA = 24;

  let nomi = store.get('nomi', AREE_PREDEFINITE.slice());
  let valori = store.get('bozza', new Array(8).fill(5));
  let confronto = null;          // rilevamento passato da sovrapporre

  // se lo storico contiene nomi diversi, ci si adegua alla lunghezza attesa
  if (!Array.isArray(nomi) || nomi.length !== 8) nomi = AREE_PREDEFINITE.slice();
  if (!Array.isArray(valori) || valori.length !== 8) valori = new Array(8).fill(5);

  /* ==========================================================
     I cursori
     ========================================================== */
  function costruisciAree() {
    $('#aree').innerHTML = nomi.map((nome, i) => '' +
      '<div class="area">' +
        '<div class="area-testa">' +
          '<input class="area-nome" type="text" value="' + esc(nome) + '" ' +
                 'data-i="' + i + '" maxlength="34" ' +
                 'aria-label="Nome della area ' + (i + 1) + '">' +
          '<span class="area-val" id="v' + i + '">' + fmt(valori[i]) + '</span>' +
        '</div>' +
        '<input type="range" min="0" max="10" step="0.5" value="' + valori[i] + '" ' +
               'data-i="' + i + '" aria-label="' + esc(nome) + ', da 0 a 10">' +
      '</div>'
    ).join('');

    $$('#aree input[type="range"]').forEach((el) => {
      el.addEventListener('input', () => {
        const i = Number(el.dataset.i);
        valori[i] = Number(el.value);
        $('#v' + i).textContent = fmt(valori[i]);
        riempi(el);
        aggiorna();
      });
      riempi(el);
    });

    $$('#aree .area-nome').forEach((el) => {
      el.addEventListener('change', () => {
        const i = Number(el.dataset.i);
        nomi[i] = el.value.trim() || AREE_PREDEFINITE[i];
        el.value = nomi[i];
        store.set('nomi', nomi);
        aggiorna();
      });
    });
  }

  /* riempimento colorato del cursore */
  function riempi(el) {
    el.style.setProperty('--fill', (Number(el.value) / MAX * 100) + '%');
  }

  function fmt(n) {
    return Number(n) % 1 === 0 ? String(n) : Number(n).toFixed(1).replace('.', ',');
  }

  /* ==========================================================
     Sintesi e grafico
     ========================================================== */
  function media(v) {
    return v.reduce((a, b) => a + b, 0) / v.length;
  }

  /* Scarto quadratico medio: quanto le aree sono distanti fra loro.
     E' il numero che dice se la ruota gira o saltella. */
  function squilibrio(v) {
    const m = media(v);
    return Math.sqrt(v.reduce((a, x) => a + (x - m) * (x - m), 0) / v.length);
  }

  function lettura(m, s, bassa) {
    const parti = [];
    if (s < 1.2) {
      parti.push('La tua ruota è molto regolare: le aree si tengono su livelli simili, quindi gira bene.');
    } else if (s < 2.5) {
      parti.push('La ruota è abbastanza equilibrata, con qualche area che resta indietro rispetto alle altre.');
    } else {
      parti.push('La ruota è parecchio irregolare: c’è un dislivello forte fra le aree, e di solito significa che una parte della tua vita sta pagando il conto di un’altra.');
    }
    if (m >= 7.5) parti.push('Il livello generale è alto.');
    else if (m >= 5.5) parti.push('Il livello generale è discreto.');
    else parti.push('Il livello generale è basso: forse è un periodo, forse è il momento di guardarci dentro.');

    parti.push('L’area più bassa è ' + bassa + '.');
    return parti.join(' ');
  }

  function aggiorna() {
    const m = media(valori);
    const s = squilibrio(valori);
    const iBassa = valori.indexOf(Math.min.apply(null, valori));

    $('#media').textContent = fmt(Math.round(m * 10) / 10);
    $('#squilibrio').textContent = fmt(Math.round(s * 10) / 10);
    $('#piu-bassa').textContent = fmt(valori[iBassa]);
    $('#lettura').textContent = lettura(m, s, nomi[iBassa]);

    const serie = [{ name: 'Adesso', values: valori.slice() }];
    if (confronto) {
      serie.push({ name: Shell.itDate(confronto.data), values: confronto.valori });
    }

    Charts.radar($('#grafico'), {
      labels: nomi,
      max: MAX,
      rings: 5,
      labelRoom: 100,
      alt: 'Ruota della vita: ' + nomi.map((n, i) => n + ' ' + valori[i]).join(', '),
      series: serie
    });

    const leg = $('#legenda-conf');
    leg.hidden = !confronto;
    if (confronto) {
      leg.textContent = 'Confronto attivo con il rilevamento del '
        + Shell.itDate(confronto.data) + '. Tocca di nuovo «Confronta» per toglierlo.';
    }

    store.set('bozza', valori);
  }

  /* ==========================================================
     Storico
     ========================================================== */
  function storia() { return store.get('storia', []); }

  function disegnaStoria() {
    const elenco = storia();
    const box = $('#box-storia');
    if (!elenco.length) { box.hidden = true; return; }
    box.hidden = false;

    $('#storia').innerHTML = elenco.map((v, i) => {
      const m = fmt(Math.round(media(v.valori) * 10) / 10);
      const attivo = confronto && confronto.data === v.data;
      return '' +
        '<div class="voce">' +
          '<span class="voce-data">' + esc(Shell.itDate(v.data)) + '</span>' +
          '<span class="voce-media">media ' + m + ' · squilibrio ' +
            fmt(Math.round(squilibrio(v.valori) * 10) / 10) + '</span>' +
          '<span class="voce-azioni no-print">' +
            '<button class="btn btn-sm' + (attivo ? ' btn-primary' : '') + '" type="button" ' +
                    'data-conf="' + i + '">' + (attivo ? 'Tolgo' : 'Confronta') + '</button>' +
            '<button class="btn btn-sm btn-ghost" type="button" data-ripr="' + i + '">Riprendi</button>' +
            '<button class="btn btn-sm btn-ghost" type="button" data-elim="' + i + '" ' +
                    'aria-label="Elimina il rilevamento del ' + esc(Shell.itDate(v.data)) + '">✕</button>' +
          '</span>' +
          (v.nota ? '<span class="voce-nota">' + esc(v.nota) + '</span>' : '') +
        '</div>';
    }).join('');
  }

  $('#storia').addEventListener('click', (e) => {
    const b = e.target.closest('button');
    if (!b) return;
    const elenco = storia();

    if (b.dataset.conf != null) {
      const v = elenco[Number(b.dataset.conf)];
      confronto = (confronto && confronto.data === v.data) ? null : v;
      disegnaStoria();
      aggiorna();
    }

    if (b.dataset.ripr != null) {
      const v = elenco[Number(b.dataset.ripr)];
      valori = v.valori.slice();
      if (Array.isArray(v.nomi) && v.nomi.length === 8) nomi = v.nomi.slice();
      confronto = null;
      costruisciAree();
      disegnaStoria();
      aggiorna();
      Shell.toast('Rilevamento ripreso');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    if (b.dataset.elim != null) {
      const i = Number(b.dataset.elim);
      const v = elenco[i];
      if (!confirm('Eliminare il rilevamento del ' + Shell.itDate(v.data) + '?')) return;
      if (confronto && confronto.data === v.data) confronto = null;
      elenco.splice(i, 1);
      store.set('storia', elenco);
      disegnaStoria();
      aggiorna();
    }
  });

  $('#salva').addEventListener('click', () => {
    const elenco = storia();
    elenco.unshift({
      data: new Date().toISOString(),
      valori: valori.slice(),
      nomi: nomi.slice(),
      nota: $('#nota').value.trim()
    });
    store.set('storia', elenco.slice(0, MAX_STORIA));
    $('#nota').value = '';
    disegnaStoria();
    Shell.toast('Rilevamento salvato');
  });

  $('#azzera').addEventListener('click', () => {
    valori = new Array(8).fill(5);
    costruisciAree();
    aggiorna();
  });

  $('#svuota').addEventListener('click', () => {
    if (!confirm('Cancellare tutti i rilevamenti salvati su questo dispositivo?')) return;
    store.del('storia');
    confronto = null;
    disegnaStoria();
    aggiorna();
    Shell.toast('Storico cancellato');
  });

  /* ==========================================================
     Esportazione
     ========================================================== */
  $('#stampa').addEventListener('click', Shell.print);

  $('#png').addEventListener('click', () => {
    Charts.toPng($('#grafico'), 'ruota-della-vita-' + Shell.stamp() + '.png')
      .then(() => Shell.toast('Immagine scaricata'))
      .catch(() => Shell.toast('Non riesco a esportare il grafico'));
  });

  /* ==========================================================
     Guida
     ========================================================== */
  const guida = $('#guida');
  $('#apri-guida').addEventListener('click', () => guida.showModal());
  $('#chiudi-guida').addEventListener('click', () => guida.close());
  guida.addEventListener('click', (e) => { if (e.target === guida) guida.close(); });

  /* ---------- partenza ---------- */
  costruisciAree();
  disegnaStoria();
  aggiorna();
})();
