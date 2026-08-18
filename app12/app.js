/* ============================================================
   Quiz Generazionale — logica
   ------------------------------------------------------------
   Differenze rispetto alla versione precedente:

   - le età si calcolano dall'anno in corso: prima erano scritte
     a mano nel codice ("Gen Z: 12-27 anni") e invecchiavano
   - ci sono anche la Generazione Alpha e quella silenziosa: prima
     chi era nato dopo il 2012 o prima del 1946 finiva in "Altro"
   - la "generazione mentale" non dipende più da soglie arbitrarie
     su un punteggio pesato, ma dalla distanza effettiva fra il tuo
     profilo e quello di ciascuna generazione
   - i grafici si ridisegnano correttamente a ogni nuovo calcolo:
     prima, dal secondo invio in poi, Chart.js si bloccava perché
     il canvas risultava già occupato
   - scala a cinque livelli con etichette a parole invece di dieci
     pulsanti radio in fila, illeggibili sul telefono
   - al posto della finta SWOT (quattro riquadri che ripetevano gli
     stessi numeri) c'è la lettura degli scostamenti
   ============================================================ */
(function () {
  'use strict';

  const $ = Shell.$;
  const $$ = Shell.$$;
  const esc = Shell.esc;
  const store = Shell.store();
  const dati = window.GENERAZIONI;

  const MAX = 10;
  const DIM = dati.dimensioni.map((d) => d.id);
  const TOTALE_DOMANDE = dati.domande.length + dati.extra.length;

  let anno = null;
  let risposte = {};      // per dimensione: 1..5
  let extra = {};         // per id: valore scelto
  let indice = 0;
  let esito = null;

  function mostra(id) {
    $$('.view').forEach((v) => { v.hidden = v.id !== id; });
    window.scrollTo(0, 0);
  }

  /* ==========================================================
     Generazioni
     ========================================================== */
  function generazioneDi(annoNascita) {
    return dati.elenco.find((g) => annoNascita >= g.da && annoNascita <= g.a) || null;
  }

  /* calcolata ogni volta, non scritta nel codice */
  function fasciaEta(g) {
    const oggi = new Date().getFullYear();
    const min = oggi - g.a;
    const max = oggi - g.da;
    if (min < 0) return 'non ancora nati';
    return 'oggi ' + min + '-' + max + ' anni';
  }

  const campoAnno = $('#nascita');

  campoAnno.addEventListener('input', () => {
    const v = Number(campoAnno.value);
    const g = v ? generazioneDi(v) : null;
    $('#anno-nota').textContent = g
      ? g.nome + ' · ' + fasciaEta(g)
      : (campoAnno.value.length >= 4
          ? 'Fuori dalle generazioni previste (1928-2024).'
          : 'Serve solo per il confronto e resta su questo dispositivo.');
  });

  /* ==========================================================
     Avvio
     ========================================================== */
  $('#inizia').addEventListener('click', () => {
    const v = Number(campoAnno.value);
    if (!v || !generazioneDi(v)) {
      Shell.toast('Serve un anno di nascita fra il 1928 e il 2024');
      campoAnno.focus();
      return;
    }
    anno = v;
    store.set('anno', anno);
    risposte = {}; extra = {}; indice = 0;
    $('#gen-anagrafica').textContent = generazioneDi(anno).nome;
    mostra('view-quiz');
    disegnaDomanda();
  });

  /* ==========================================================
     Domande
     ========================================================== */
  function disegnaDomanda() {
    const inScala = indice < dati.domande.length;
    const d = inScala ? dati.domande[indice] : dati.extra[indice - dati.domande.length];

    $('#conteggio').textContent = 'Domanda ' + (indice + 1) + ' di ' + TOTALE_DOMANDE;
    $('#barra').style.width = (indice / TOTALE_DOMANDE * 100) + '%';
    $('#testo-domanda').textContent = d.t;
    $('#indietro').disabled = indice === 0;

    const opzioni = inScala
      ? dati.scalaEtichette.map((t, i) => ({ v: i + 1, t: t }))
      : d.opzioni;
    const scelto = inScala ? risposte[d.d] : extra[d.id];

    $('#scala').innerHTML = opzioni.map((o) =>
      '<label class="choice">' +
        '<input type="radio" name="risposta" value="' + o.v + '"' +
          (scelto === o.v ? ' checked' : '') + '>' +
        '<span><i class="n">' + o.v + '</i>' + esc(o.t) + '</span>' +
      '</label>').join('');

    $$('#scala input').forEach((input) => {
      input.addEventListener('change', () => {
        const valore = Number(input.value);
        if (inScala) risposte[d.d] = valore; else extra[d.id] = valore;
        setTimeout(avanti, 180);
      });
    });
  }

  function avanti() {
    if (indice < TOTALE_DOMANDE - 1) { indice++; disegnaDomanda(); }
    else calcola();
  }

  $('#indietro').addEventListener('click', () => {
    if (indice > 0) { indice--; disegnaDomanda(); }
  });

  $('#ricomincia').addEventListener('click', () => {
    if (confirm('Ricominciare da capo?')) mostra('view-intro');
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
    // risposte 1-5 riportate su 0-10, la stessa scala dei profili
    const profilo = {};
    DIM.forEach((k) => {
      const r = risposte[k] || 1;
      profilo[k] = Math.round(((r - 1) / (dati.scala - 1) * MAX) * 10) / 10;
    });

    const anagrafica = generazioneDi(anno);

    /* somiglianza = quanto il tuo profilo è vicino a quello tipico.
       Distanza euclidea normalizzata sul massimo possibile, girata
       in percentuale perché "somigli all'82%" si capisce al volo. */
    const massimo = Math.sqrt(DIM.length * MAX * MAX);
    const somiglianze = dati.elenco.map((g) => {
      const dist = Math.sqrt(DIM.reduce((acc, k) => {
        const diff = profilo[k] - g.profilo[k];
        return acc + diff * diff;
      }, 0));
      return { gen: g, percentuale: Math.round((1 - dist / massimo) * 100) };
    }).sort((a, b) => b.percentuale - a.percentuale);

    const mentale = somiglianze[0].gen;

    esito = {
      data: new Date().toISOString(),
      anno: anno, profilo: profilo,
      anagrafica: anagrafica.id, mentale: mentale.id,
      somiglianze: somiglianze.map((s) => ({ id: s.gen.id, p: s.percentuale })),
      extra: Object.assign({}, extra)
    };

    store.set('ultimo', esito);
    disegnaEsito(anagrafica, mentale, profilo, somiglianze);
    mostra('view-esito');
  }

  /* ==========================================================
     Esito
     ========================================================== */
  function disegnaEsito(anagrafica, mentale, profilo, somiglianze) {
    const uguali = anagrafica.id === mentale.id;

    $('#titolone').innerHTML = uguali
      ? 'Sei <em>' + esc(anagrafica.nome) + '</em>, dentro e fuori.'
      : 'Sull’anagrafe sei <em>' + esc(anagrafica.nome) +
        '</em>, ma vivi come <em>' + esc(mentale.conArticolo) + '</em>.';

    $('#box-anagrafica').textContent = anagrafica.nome;
    $('#box-eta').textContent = anagrafica.da + '-' + anagrafica.a + ' · ' + fasciaEta(anagrafica);
    $('#box-mentale').textContent = mentale.nome;
    $('#box-somiglianza').textContent = somiglianze[0].percentuale + '% di somiglianza';

    $('#commento').textContent = uguali
      ? anagrafica.descrizione + ' ' + anagrafica.segno +
        ' Le tue risposte si allineano al profilo tipico della tua generazione.'
      : anagrafica.descrizione + ' Le tue abitudini però assomigliano di più a quelle ' +
        mentale.di + ': ' + mentale.segno.charAt(0).toLowerCase() + mentale.segno.slice(1) +
        ' Non è un difetto né un merito: è un’informazione su come ti muovi.';

    /* radar: tu contro il profilo tipico della tua generazione anagrafica */
    $('#legenda-grafico').textContent =
      'La linea piena sei tu, quella tratteggiata è il profilo tipico della ' + anagrafica.nome + '.';

    Charts.radar($('#grafico'), {
      labels: dati.dimensioni.map((d) => d.nome),
      max: MAX, rings: 5, labelRoom: 96,
      alt: 'Confronto fra il tuo profilo e quello della tua generazione',
      series: [
        { name: 'Tu', values: DIM.map((k) => profilo[k]) },
        { name: anagrafica.nome, values: DIM.map((k) => anagrafica.profilo[k]) }
      ]
    });

    /* scostamenti dal profilo tipico */
    const scarti = dati.dimensioni.map((d) => ({
      nome: d.nome,
      delta: Math.round((profilo[d.id] - anagrafica.profilo[d.id]) * 10) / 10
    })).filter((s) => Math.abs(s.delta) >= 1)
      .sort((a, b) => Math.abs(b.delta) - Math.abs(a.delta));

    $('#scarti').innerHTML = scarti.length
      ? scarti.map((s) =>
          '<div class="scarto ' + (s.delta > 0 ? 'su' : 'giu') + '">' +
            '<span class="freccia">' + (s.delta > 0 ? '↑' : '↓') + '</span>' +
            '<span><b>' + esc(s.nome) + '</b> — ' +
              (s.delta > 0 ? 'sopra' : 'sotto') + ' la media della tua generazione di ' +
              Math.abs(s.delta).toString().replace('.', ',') + ' punti</span>' +
          '</div>').join('')
      : '<p class="dim small">Sei in linea con il profilo tipico su tutte le dimensioni.</p>';

    /* classifica delle somiglianze */
    $('#vicinanza').innerHTML = somiglianze.map((s, i) =>
      '<div class="vic-riga' + (i === 0 ? ' top' : '') + '">' +
        '<span class="nome">' + esc(s.gen.nome) + '</span>' +
        '<span class="progress"><i style="width:' + Math.max(0, s.percentuale) + '%"></i></span>' +
        '<span class="val">' + s.percentuale + '%</span>' +
      '</div>').join('');

    /* lettura su informazione e media */
    const parti = [];
    if (extra.fonte) parti.push(dati.fonteEtichette[extra.fonte]);
    if (extra.influenza) parti.push(dati.influenzaEtichette[extra.influenza]);
    if (extra.fonte >= 3 && extra.influenza <= 2) {
      parti.push('Vale la pena notare una cosa: più le fonti sono frammentate, più è difficile accorgersi di quanto orientino — e chi si sente meno influenzato spesso lo è quanto gli altri.');
    } else if (extra.fonte <= 2 && extra.influenza >= 3) {
      parti.push('Riconoscere l’influenza dei media è già metà del lavoro: chi se ne accorge tende a verificare di più.');
    }
    $('#lettura-media').textContent = parti.join(' ');
  }

  /* ==========================================================
     Porta via
     ========================================================== */
  $('#stampa').addEventListener('click', Shell.print);
  $('#rifai').addEventListener('click', () => mostra('view-intro'));

  $('#png').addEventListener('click', () => {
    Charts.toPng($('#grafico'), 'quiz-generazionale-' + Shell.stamp() + '.png')
      .then(() => Shell.toast('Grafico scaricato'))
      .catch(() => Shell.toast('Non riesco a esportare il grafico'));
  });

  $('#condividi').addEventListener('click', () => {
    if (!esito) return;
    const a = dati.elenco.find((g) => g.id === esito.anagrafica);
    const m = dati.elenco.find((g) => g.id === esito.mentale);
    Shell.share({
      title: 'Quiz Generazionale',
      text: a.id === m.id
        ? 'Sono ' + a.nome + ', dentro e fuori.'
        : 'Sull’anagrafe sono ' + a.nome + ', ma vivo come ' + m.conArticolo + '.',
      url: location.href
    });
  });

  /* ---------- partenza ---------- */
  const annoSalvato = store.get('anno', null);
  if (annoSalvato) {
    campoAnno.value = annoSalvato;
    campoAnno.dispatchEvent(new Event('input'));
  }
  mostra('view-intro');
})();
