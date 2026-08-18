/* ============================================================
   Test dei Quattro Colori — logica
   ------------------------------------------------------------
   Nella versione precedente il colore dominante veniva scelto con
   quattro if consecutivi invece di else-if: a parità di punteggio
   vinceva sempre l'ultimo controllato, il Verde. E siccome tutti i
   cursori partivano da 5, chi premeva senza toccare niente otteneva
   sempre Verde. Qui i pareggi sono dichiarati, non nascosti.

   Inoltre: sedici domande invece di otto, scala a cinque livelli,
   testi separati dalla logica, e la scala del grafico non cambia
   più a seconda delle risposte.
   ============================================================ */
(function () {
  'use strict';

  const $ = Shell.$;
  const $$ = Shell.$$;
  const esc = Shell.esc;
  const store = Shell.store();
  const dati = window.COLORI;

  const MAX = 10;
  const MAX_STORICO = 10;

  let risposte = new Array(dati.domande.length).fill(null);
  let indice = 0;
  let esito = null;

  /* la tinta giusta per il tema in corso */
  function tinta(chiave) {
    const c = dati.colori[chiave];
    const scuro = document.documentElement.dataset.theme === 'dark'
      || (!document.documentElement.dataset.theme
          && matchMedia('(prefers-color-scheme: dark)').matches);
    return scuro ? c.tintaScura : c.tinta;
  }

  function mostra(id) {
    $$('.view').forEach((v) => { v.hidden = v.id !== id; });
    window.scrollTo(0, 0);
  }

  /* ==========================================================
     Domande
     ========================================================== */
  $('#inizia').addEventListener('click', () => {
    risposte = new Array(dati.domande.length).fill(null);
    indice = 0;
    mostra('view-quiz');
    disegnaDomanda();
  });

  function disegnaDomanda() {
    const d = dati.domande[indice];
    const totale = dati.domande.length;

    $('#conteggio').textContent = 'Domanda ' + (indice + 1) + ' di ' + totale;
    $('#barra').style.width = (indice / totale * 100) + '%';
    $('#testo-domanda').textContent = d.t;
    $('#indietro').disabled = indice === 0;

    $('#scala').innerHTML = dati.scalaEtichette.map((etichetta, i) => {
      const valore = i + 1;
      return '<label class="choice">' +
        '<input type="radio" name="risposta" value="' + valore + '"' +
          (risposte[indice] === valore ? ' checked' : '') + '>' +
        '<span><i class="n">' + valore + '</i>' + esc(etichetta) + '</span></label>';
    }).join('');

    $$('#scala input').forEach((input) => {
      input.addEventListener('change', () => {
        risposte[indice] = Number(input.value);
        setTimeout(avanti, 180);
      });
    });
  }

  function avanti() {
    if (indice < dati.domande.length - 1) { indice++; disegnaDomanda(); }
    else calcola();
  }

  $('#indietro').addEventListener('click', () => {
    if (indice > 0) { indice--; disegnaDomanda(); }
  });

  $('#ricomincia').addEventListener('click', () => {
    if (confirm('Ricominciare da capo?')) { mostra('view-intro'); aggiornaStorico(); }
  });

  document.addEventListener('keydown', (e) => {
    if ($('#view-quiz').hidden) return;
    if (e.key >= '1' && e.key <= '5') {
      const i = $('#scala input[value="' + e.key + '"]');
      if (i) { i.checked = true; i.dispatchEvent(new Event('change')); }
    }
    if (e.key === 'ArrowLeft' && indice > 0) { indice--; disegnaDomanda(); }
  });

  /* ==========================================================
     Calcolo
     ========================================================== */
  function calcola() {
    const somme = {}, conte = {};
    dati.ordine.forEach((k) => { somme[k] = 0; conte[k] = 0; });

    dati.domande.forEach((d, i) => {
      if (risposte[i] == null) return;
      somme[d.c] += risposte[i];
      conte[d.c]++;
    });

    // media riportata su 0-10: la scala non dipende dalle risposte
    const punteggi = {};
    dati.ordine.forEach((k) => {
      const media = conte[k] ? somme[k] / conte[k] : 1;
      punteggi[k] = Math.round(((media - 1) / (dati.scala - 1) * MAX) * 10) / 10;
    });

    const classifica = dati.ordine.slice().sort((a, b) => punteggi[b] - punteggi[a]);
    const primo = classifica[0], secondo = classifica[1];
    const misto = (punteggi[primo] - punteggi[secondo]) < 0.8;

    // ripartizione percentuale: se sono tutti a zero si divide equamente
    const totale = dati.ordine.reduce((a, k) => a + punteggi[k], 0);
    const quote = {};
    dati.ordine.forEach((k) => {
      quote[k] = totale > 0 ? Math.round(punteggi[k] / totale * 100) : 25;
    });
    // gli arrotondamenti non fanno mai 100 esatto: il resto va alla quota maggiore
    const somma = dati.ordine.reduce((a, k) => a + quote[k], 0);
    if (somma !== 100) {
      const maggiore = dati.ordine.reduce((a, b) => (quote[a] >= quote[b] ? a : b));
      quote[maggiore] += 100 - somma;
    }

    esito = {
      data: new Date().toISOString(),
      dominante: primo, secondario: secondo, misto: misto,
      punteggi: punteggi, quote: quote, classifica: classifica
    };

    const storico = store.get('storico', []);
    storico.unshift(esito);
    store.set('storico', storico.slice(0, MAX_STORICO));

    disegnaEsito(esito);
    mostra('view-esito');
  }

  /* ==========================================================
     Esito
     ========================================================== */
  function disegnaEsito(e) {
    const c = dati.colori[e.dominante];
    const t = tinta(e.dominante);

    $('#verdetto').style.setProperty('--tinta', t);
    $('#pastiglia').style.background = t;
    $('#pastiglia').textContent = c.nome;
    $('#esito-titolo').textContent = c.titolo;
    $('#esito-motto').textContent = c.motto;
    $('#esito-descrizione').textContent = c.descrizione;
    $('#esito-altri').textContent = c.conGliAltri;
    $('#esito-consiglio').textContent = c.consiglio;

    const lista = (a) => a.map((x) => '<li>' + esc(x) + '</li>').join('');
    $('#sw-forza').innerHTML = lista(c.swot.forza);
    $('#sw-debolezza').innerHTML = lista(c.swot.debolezza);
    $('#sw-opportunita').innerHTML = lista(c.swot.opportunita);
    $('#sw-minaccia').innerHTML = lista(c.swot.minaccia);

    /* barra di ripartizione, in ordine di peso */
    $('#mix').innerHTML = e.classifica.map((k) => {
      const q = e.quote[k];
      return '<span style="flex:' + Math.max(q, 1) + ';background:' + tinta(k) + '">' +
        (q >= 12 ? q + '%' : '') + '</span>';
    }).join('');

    $('#mix-legenda').innerHTML = e.classifica.map((k) =>
      '<span><i style="background:' + tinta(k) + '"></i>' +
      esc(dati.colori[k].nome) + ' ' + e.quote[k] + '%</span>').join('');

    /* lettura della combinazione dominante + secondario.
       Le chiavi nel file dati non sono in ordine alfabetico, quindi
       si prova in tutti e due i versi invece di ordinarle. */
    const lettura = dati.combinazioni[e.dominante + '+' + e.secondario]
                 || dati.combinazioni[e.secondario + '+' + e.dominante];
    $('#esito-combinazione').textContent = e.misto && lettura
      ? 'Il tuo profilo è misto, ' + dati.colori[e.dominante].nome.toLowerCase() + ' e ' +
        dati.colori[e.secondario].nome.toLowerCase() + ' quasi alla pari. ' + lettura
      : (lettura ? 'Dopo il ' + dati.colori[e.dominante].nome.toLowerCase() + ', il colore che pesa di più è il ' +
          dati.colori[e.secondario].nome.toLowerCase() + '. ' + lettura : '');

    Charts.radar($('#grafico'), {
      labels: dati.ordine.map((k) => dati.colori[k].nome),
      max: MAX, rings: 5, labelRoom: 60,
      alt: 'Punteggio dei quattro colori da 0 a 10',
      series: [{ name: 'Il tuo profilo', values: dati.ordine.map((k) => e.punteggi[k]), color: t }]
    });
  }

  /* ==========================================================
     Storico
     ========================================================== */
  function aggiornaStorico() {
    const storico = store.get('storico', []);
    const box = $('#box-storico');
    if (!storico.length) { box.hidden = true; return; }
    box.hidden = false;

    $('#storico').innerHTML = storico.map((v) => {
      const c = dati.colori[v.dominante];
      if (!c) return '';
      return '<div class="storico-voce">' +
        '<i class="pallino" style="background:' + tinta(v.dominante) + '"></i>' +
        '<b>' + esc(c.nome) + '</b>' +
        '<span class="muted small">' + esc(c.titolo) + '</span>' +
        '<span class="quando">' + esc(Shell.itDate(v.data)) + '</span>' +
      '</div>';
    }).join('');
  }

  $('#svuota').addEventListener('click', () => {
    if (!confirm('Cancellare i risultati salvati su questo dispositivo?')) return;
    store.del('storico');
    aggiornaStorico();
    Shell.toast('Storico cancellato');
  });

  /* ==========================================================
     Porta via
     ========================================================== */
  $('#stampa').addEventListener('click', Shell.print);
  $('#rifai').addEventListener('click', () => { mostra('view-intro'); aggiornaStorico(); });

  $('#png').addEventListener('click', () => {
    Charts.toPng($('#grafico'), 'quattro-colori-' + Shell.stamp() + '.png')
      .then(() => Shell.toast('Grafico scaricato'))
      .catch(() => Shell.toast('Non riesco a esportare il grafico'));
  });

  $('#condividi').addEventListener('click', () => {
    if (!esito) return;
    const c = dati.colori[esito.dominante];
    Shell.share({
      title: 'Test dei Quattro Colori',
      text: 'Il mio colore dominante è ' + c.nome + ' — ' + c.titolo + '. ' + c.motto,
      url: location.href
    });
  });

  /* ---------- partenza ---------- */
  aggiornaStorico();
  mostra('view-intro');
})();
