/* ============================================================
   Gestione Attività — logica
   ------------------------------------------------------------
   Differenze rispetto alla versione precedente:

   - niente Vue: sono poche centinaia di righe, il framework non
     serviva e la versione 2 non è più supportata dal 2023
   - lo spostamento fra quadranti usa i pointer event, che valgono
     sia per il mouse sia per il dito: prima si usava il drag and
     drop HTML5, che sul telefono semplicemente non esiste
   - in alternativa c'è sempre il menu, che funziona anche da tastiera
   - ogni attività ha un identificativo suo: prima venivano
     riconosciute da titolo + data, e due attività con lo stesso
     titolo si scambiavano di posto
   - le chiavi di salvataggio hanno il prefisso dell'app
   - il CSV contiene anche avanzamento e note, che mancavano
   - niente "esci dall'applicazione": window.close() non funziona
     su una scheda che non è stata aperta da uno script
   ============================================================ */
(function () {
  'use strict';

  const $ = Shell.$;
  const $$ = Shell.$$;
  const esc = Shell.esc;
  const store = Shell.store();

  const QUADRANTI = [
    { id: 'fai',       nome: 'Fallo ora',       regola: 'Urgente e importante' },
    { id: 'pianifica', nome: 'Pianificalo',     regola: 'Importante, non urgente' },
    { id: 'delega',    nome: 'Delegalo',        regola: 'Urgente, non importante' },
    { id: 'elimina',   nome: 'Lascialo perdere', regola: 'Né urgente né importante' }
  ];

  let attivita = store.get('attivita', []);
  let fatte = store.get('fatte', []);

  /* ---------- identificativo unico e stabile ---------- */
  function nuovoId() {
    return 'a' + Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
  }

  function salva() {
    store.set('attivita', attivita);
    store.set('fatte', fatte);
  }

  /* ==========================================================
     Scadenze
     ========================================================== */
  function oggiISO() {
    const d = new Date();
    return d.getFullYear() + '-' +
           String(d.getMonth() + 1).padStart(2, '0') + '-' +
           String(d.getDate()).padStart(2, '0');
  }

  function statoScadenza(iso) {
    if (!iso) return null;
    const oggi = oggiISO();
    if (iso < oggi) return 'scaduta';
    if (iso === oggi) return 'oggi';
    return 'futura';
  }

  function etichettaScadenza(iso) {
    if (!iso) return '';
    const stato = statoScadenza(iso);
    const testo = Shell.itDate(iso + 'T12:00:00');
    if (stato === 'scaduta') return '<span class="scaduta">scaduta il ' + esc(testo) + '</span>';
    if (stato === 'oggi') return '<span class="oggi">scade oggi</span>';
    return '<span>entro il ' + esc(testo) + '</span>';
  }

  /* ==========================================================
     Disegno della matrice
     ========================================================== */
  function disegna() {
    $('#matrice').innerHTML = QUADRANTI.map((q) => {
      const dentro = attivita
        .filter((a) => a.quadrante === q.id)
        .sort(ordina);

      return '' +
        '<section class="quadrante q-' + q.id + '" data-q="' + q.id + '">' +
          '<div class="q-testa">' +
            '<span class="q-nome">' + esc(q.nome) + '</span>' +
            '<span class="q-regola">' + esc(q.regola) + '</span>' +
            '<span class="q-conta">' + dentro.length + '</span>' +
          '</div>' +
          (dentro.length
            ? dentro.map(scheda).join('')
            : '<p class="q-vuoto">Niente qui dentro.</p>') +
        '</section>';
    }).join('');

    aggiornaConteggi();
    disegnaArchivio();
    collegaEventi();
  }

  /* prima le scadenze vicine, poi quelle senza data, poi per inserimento */
  function ordina(a, b) {
    if (a.scadenza && b.scadenza) return a.scadenza < b.scadenza ? -1 : (a.scadenza > b.scadenza ? 1 : 0);
    if (a.scadenza) return -1;
    if (b.scadenza) return 1;
    return 0;
  }

  function scheda(a) {
    return '' +
      '<article class="attivita" data-id="' + a.id + '">' +
        '<button class="presa" type="button" aria-label="Sposta ' + esc(a.titolo) + '" title="Trascina per spostare">' +
          '<svg viewBox="0 0 10 16" fill="currentColor" aria-hidden="true">' +
            '<circle cx="2.5" cy="2.5" r="1.4"/><circle cx="7.5" cy="2.5" r="1.4"/>' +
            '<circle cx="2.5" cy="8" r="1.4"/><circle cx="7.5" cy="8" r="1.4"/>' +
            '<circle cx="2.5" cy="13.5" r="1.4"/><circle cx="7.5" cy="13.5" r="1.4"/>' +
          '</svg>' +
        '</button>' +
        '<h3 class="att-titolo">' + esc(a.titolo) + '</h3>' +
        '<button class="icon-btn att-menu no-print" type="button" data-menu="' + a.id + '" ' +
                'aria-label="Altre azioni per ' + esc(a.titolo) + '">' +
          '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">' +
            '<circle cx="5" cy="12" r="1.8"/><circle cx="12" cy="12" r="1.8"/><circle cx="19" cy="12" r="1.8"/>' +
          '</svg>' +
        '</button>' +
        '<div class="att-info">' + etichettaScadenza(a.scadenza) + '</div>' +
        '<div class="att-avanz no-print">' +
          '<input type="range" min="0" max="100" step="10" value="' + (a.avanzamento || 0) + '" ' +
                 'data-av="' + a.id + '" aria-label="Avanzamento di ' + esc(a.titolo) + '">' +
          '<span class="pct">' + (a.avanzamento || 0) + '%</span>' +
        '</div>' +
        (a.nota ? '<p class="att-nota">' + esc(a.nota) + '</p>' : '') +
      '</article>';
  }

  function aggiornaConteggi() {
    const totale = attivita.length;
    const scadute = attivita.filter((a) => statoScadenza(a.scadenza) === 'scaduta').length;
    const parti = [totale + (totale === 1 ? ' attività aperta' : ' attività aperte')];
    if (scadute) parti.push(scadute + (scadute === 1 ? ' scaduta' : ' scadute'));
    if (fatte.length) parti.push(fatte.length + ' fatte');
    $('#conteggi').textContent = parti.join(' · ');
  }

  function disegnaArchivio() {
    const box = $('#box-archivio');
    if (!fatte.length) { box.hidden = true; return; }
    box.hidden = false;
    $('#archivio').innerHTML = fatte.map((a, i) => '' +
      '<div class="archivio-voce">' +
        '<span class="att-titolo fatta">' + esc(a.titolo) + '</span>' +
        '<span class="quando">' + esc(Shell.itDate(a.completata)) + '</span>' +
        '<button class="btn btn-sm btn-ghost no-print" type="button" data-ripristina="' + i + '">Riapri</button>' +
        '<button class="btn btn-sm btn-ghost no-print" type="button" data-scarta="' + i + '" ' +
                'aria-label="Elimina definitivamente">✕</button>' +
      '</div>').join('');
  }

  /* ==========================================================
     Eventi sulle attività
     ========================================================== */
  function collegaEventi() {
    $$('#matrice input[type="range"]').forEach((el) => {
      el.style.setProperty('--fill', el.value + '%');
      el.addEventListener('input', () => {
        const a = trova(el.dataset.av);
        if (!a) return;
        a.avanzamento = Number(el.value);
        el.style.setProperty('--fill', el.value + '%');
        el.parentElement.querySelector('.pct').textContent = el.value + '%';
        salva();
      });
    });

    $$('.presa').forEach(collegaTrascinamento);
  }

  function trova(id) { return attivita.find((a) => a.id === id); }

  $('#matrice').addEventListener('click', (e) => {
    const b = e.target.closest('[data-menu]');
    if (b) apriMenu(b.dataset.menu, b);
  });

  /* ---------- menu per ogni attività ---------- */
  function apriMenu(id, ancora) {
    const a = trova(id);
    if (!a) return;

    const dlg = document.createElement('dialog');
    dlg.innerHTML =
      '<div class="dlg-head"><h2>' + esc(a.titolo) + '</h2>' +
        '<button class="icon-btn" type="button" data-chiudi aria-label="Chiudi">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>' +
        '</button></div>' +
      '<div class="dlg-body">' +
        '<p class="field-label">Sposta in</p>' +
        '<div class="choices cols">' +
          QUADRANTI.map((q) =>
            '<label class="choice"><input type="radio" name="q" value="' + q.id + '"' +
            (a.quadrante === q.id ? ' checked' : '') + '>' +
            '<span><b>' + esc(q.nome) + '</b>&nbsp;<span class="muted small">' + esc(q.regola) + '</span></span></label>'
          ).join('') +
        '</div>' +
        '<hr style="margin:.5rem 0">' +
        '<div class="row-wrap">' +
          '<button class="btn btn-primary" type="button" data-fatta>Segna come fatta</button>' +
          '<button class="btn" type="button" data-elimina>Elimina</button>' +
        '</div>' +
      '</div>';

    document.body.appendChild(dlg);
    dlg.showModal();

    const chiudi = () => { dlg.close(); dlg.remove(); };

    dlg.querySelector('[data-chiudi]').addEventListener('click', chiudi);
    dlg.addEventListener('click', (e) => { if (e.target === dlg) chiudi(); });

    dlg.querySelectorAll('input[name="q"]').forEach((r) => {
      r.addEventListener('change', () => {
        a.quadrante = r.value;
        salva(); disegna(); chiudi();
        Shell.toast('Spostata in «' + QUADRANTI.find((q) => q.id === r.value).nome + '»');
      });
    });

    dlg.querySelector('[data-fatta]').addEventListener('click', () => {
      completa(a.id); chiudi();
    });

    dlg.querySelector('[data-elimina]').addEventListener('click', () => {
      if (!confirm('Eliminare «' + a.titolo + '»?')) return;
      attivita = attivita.filter((x) => x.id !== a.id);
      salva(); disegna(); chiudi();
      Shell.toast('Attività eliminata');
    });
  }

  function completa(id) {
    const a = trova(id);
    if (!a) return;
    attivita = attivita.filter((x) => x.id !== id);
    fatte.unshift(Object.assign({}, a, {
      avanzamento: 100,
      completata: new Date().toISOString()
    }));
    salva(); disegna();
    Shell.toast('Fatta. Bene.');
  }

  /* ==========================================================
     Trascinamento con i pointer event
     ----------------------------------------------------------
     Un solo codice per mouse, dito e penna. La maniglia ha
     touch-action:none, quindi sul telefono il gesto trascina
     l'attività invece di far scorrere la pagina.
     ========================================================== */
  function collegaTrascinamento(presa) {
    presa.addEventListener('pointerdown', (e) => {
      if (e.button != null && e.button !== 0) return;
      e.preventDefault();

      const scheda = presa.closest('.attivita');
      const id = scheda.dataset.id;
      const a = trova(id);
      if (!a) return;

      const fantasma = document.createElement('div');
      fantasma.className = 'fantasma q-' + a.quadrante;
      fantasma.textContent = a.titolo;
      document.body.appendChild(fantasma);
      scheda.classList.add('trascinata');
      presa.setPointerCapture(e.pointerId);

      let bersaglio = null;

      const muovi = (ev) => {
        fantasma.style.left = (ev.clientX + 14) + 'px';
        fantasma.style.top = (ev.clientY - 12) + 'px';

        // elementFromPoint ignora il fantasma perché ha pointer-events:none
        const sotto = document.elementFromPoint(ev.clientX, ev.clientY);
        const q = sotto && sotto.closest('.quadrante');
        if (q !== bersaglio) {
          if (bersaglio) bersaglio.classList.remove('bersaglio');
          bersaglio = q;
          if (bersaglio) bersaglio.classList.add('bersaglio');
        }
      };

      const molla = () => {
        presa.removeEventListener('pointermove', muovi);
        presa.removeEventListener('pointerup', molla);
        presa.removeEventListener('pointercancel', molla);
        fantasma.remove();
        scheda.classList.remove('trascinata');
        if (bersaglio) bersaglio.classList.remove('bersaglio');

        if (bersaglio && bersaglio.dataset.q !== a.quadrante) {
          a.quadrante = bersaglio.dataset.q;
          salva(); disegna();
          Shell.toast('Spostata in «' + QUADRANTI.find((q) => q.id === a.quadrante).nome + '»');
        }
      };

      presa.addEventListener('pointermove', muovi);
      presa.addEventListener('pointerup', molla);
      presa.addEventListener('pointercancel', molla);

      muovi(e);
    });
  }

  /* ==========================================================
     Archivio
     ========================================================== */
  $('#archivio').addEventListener('click', (e) => {
    const b = e.target.closest('button');
    if (!b) return;

    if (b.dataset.ripristina != null) {
      const i = Number(b.dataset.ripristina);
      const a = fatte.splice(i, 1)[0];
      delete a.completata;
      a.avanzamento = 90;
      attivita.push(a);
      salva(); disegna();
      Shell.toast('Riaperta');
    }

    if (b.dataset.scarta != null) {
      fatte.splice(Number(b.dataset.scarta), 1);
      salva(); disegna();
    }
  });

  $('#svuota-archivio').addEventListener('click', () => {
    if (!confirm('Svuotare l’archivio delle attività fatte?')) return;
    fatte = [];
    salva(); disegna();
  });

  /* ==========================================================
     Aggiunta
     ========================================================== */
  $('#modulo').addEventListener('submit', (e) => {
    e.preventDefault();
    const titolo = $('#titolo').value.trim();
    if (!titolo) return;

    attivita.push({
      id: nuovoId(),
      titolo: titolo,
      scadenza: $('#scadenza').value || '',
      quadrante: $('#quadrante').value,
      nota: $('#nota').value.trim(),
      avanzamento: 0,
      creata: new Date().toISOString()
    });

    salva();
    disegna();
    e.target.reset();
    $('#quadrante').value = 'pianifica';
    $('#titolo').focus();
    Shell.toast('Aggiunta');
  });

  /* ==========================================================
     Esportazione
     ========================================================== */
  $('#stampa').addEventListener('click', Shell.print);

  $('#csv').addEventListener('click', () => {
    if (!attivita.length && !fatte.length) {
      Shell.toast('Non c’è ancora niente da esportare');
      return;
    }

    // punto e virgola come separatore: è quello che Excel italiano si aspetta
    const campo = (v) => {
      const s = String(v == null ? '' : v);
      return /[";\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
    };
    const nomeQ = (id) => (QUADRANTI.find((q) => q.id === id) || {}).nome || id;

    const righe = [['Titolo', 'Scadenza', 'Quadrante', 'Avanzamento', 'Nota', 'Stato', 'Completata il']];

    attivita.slice().sort(ordina).forEach((a) => righe.push([
      a.titolo, a.scadenza, nomeQ(a.quadrante),
      (a.avanzamento || 0) + '%', a.nota, 'Aperta', ''
    ]));

    fatte.forEach((a) => righe.push([
      a.titolo, a.scadenza, nomeQ(a.quadrante),
      '100%', a.nota, 'Fatta', a.completata ? a.completata.slice(0, 10) : ''
    ]));

    const csv = righe.map((r) => r.map(campo).join(';')).join('\r\n');
    Shell.download('attivita-' + Shell.stamp() + '.csv', csv, 'text/csv');
    Shell.toast('CSV scaricato');
  });

  /* ==========================================================
     Guida
     ========================================================== */
  const guida = $('#guida');
  $('#apri-guida').addEventListener('click', () => guida.showModal());
  $('#chiudi-guida').addEventListener('click', () => guida.close());
  guida.addEventListener('click', (e) => { if (e.target === guida) guida.close(); });

  /* ---------- partenza ---------- */
  disegna();
})();
