/* ============================================================
   Test Archetipi di Jung — logica
   ------------------------------------------------------------
   Sostituisce le cinque versioni separate di prima (app5, app6,
   app7, app8, app9). Le differenze rispetto a quelle:

   - scala a cinque livelli invece della scelta secca fra due
   - stesso numero di domande per ogni archetipo, cosi' nessuno
     e' favorito dalla struttura del questionario
   - pareggi dichiarati invece di risolti in silenzio dall'ordine
     alfabetico
   - una domanda alla volta, con possibilita' di tornare indietro
   - risultato salvato per poterlo riconfrontare nel tempo
   ============================================================ */
(function () {
  'use strict';

  const $ = Shell.$;
  const $$ = Shell.$$;
  const esc = Shell.esc;
  const store = Shell.store();
  const dati = window.JUNG;

  const MAX = 10;                 // scala del radar e della classifica
  const MAX_STORICO = 12;

  let modo = null;                // 'completo' | 'breve'
  let set = null;                 // il blocco di dati corrispondente
  let risposte = [];              // una per domanda, 1..5 oppure null
  let indice = 0;
  let esito = null;

  /* ---------- passaggio fra le schermate ---------- */
  function mostra(id) {
    $$('.view').forEach((v) => { v.hidden = v.id !== id; });
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
  }

  /* ==========================================================
     Avvio
     ========================================================== */
  $$('.mode').forEach((b) => {
    b.addEventListener('click', () => iniziaTest(b.dataset.modo));
  });

  function iniziaTest(quale) {
    modo = quale;
    set = dati[modo];
    risposte = new Array(set.domande.length).fill(null);
    indice = 0;
    $('#modo-nome').textContent = set.nome;
    mostra('view-quiz');
    disegnaDomanda();
  }

  /* ==========================================================
     Le domande
     ========================================================== */
  function disegnaDomanda() {
    const d = set.domande[indice];
    const totale = set.domande.length;

    $('#conteggio').textContent = 'Domanda ' + (indice + 1) + ' di ' + totale;
    $('#barra').style.width = ((indice) / totale * 100) + '%';
    $('#testo-domanda').textContent = d.t;
    $('#indietro').disabled = indice === 0;

    $('#scala').innerHTML = dati.scalaEtichette.map((etichetta, i) => {
      const valore = i + 1;
      const scelto = risposte[indice] === valore;
      return '' +
        '<label class="choice">' +
          '<input type="radio" name="risposta" value="' + valore + '"' +
            (scelto ? ' checked' : '') + '>' +
          '<span><i class="n">' + valore + '</i>' + esc(etichetta) + '</span>' +
        '</label>';
    }).join('');

    $$('#scala input').forEach((input) => {
      input.addEventListener('change', () => {
        risposte[indice] = Number(input.value);
        // piccola pausa: si vede la scelta prima di passare oltre
        setTimeout(avanti, 180);
      });
    });
  }

  function avanti() {
    if (indice < set.domande.length - 1) {
      indice++;
      disegnaDomanda();
    } else {
      calcola();
    }
  }

  $('#indietro').addEventListener('click', () => {
    if (indice > 0) { indice--; disegnaDomanda(); }
  });

  $('#ricomincia').addEventListener('click', () => {
    if (confirm('Ricominciare da capo? Le risposte date finora andranno perse.')) {
      mostra('view-intro');
      aggiornaStorico();
    }
  });

  /* si può rispondere anche da tastiera, con i tasti da 1 a 5 */
  document.addEventListener('keydown', (e) => {
    if ($('#view-quiz').hidden) return;
    if (e.key >= '1' && e.key <= '5') {
      const input = $('#scala input[value="' + e.key + '"]');
      if (input) { input.checked = true; input.dispatchEvent(new Event('change')); }
    }
    if (e.key === 'ArrowLeft' && indice > 0) { indice--; disegnaDomanda(); }
  });

  /* ==========================================================
     Il calcolo
     ========================================================== */
  function calcola() {
    const somme = {};
    const conteggi = {};
    set.ordine.forEach((k) => { somme[k] = 0; conteggi[k] = 0; });

    set.domande.forEach((d, i) => {
      const r = risposte[i];
      if (r == null) return;
      somme[d.a] += r;
      conteggi[d.a]++;
    });

    // media delle risposte di un archetipo, riportata su una scala 0-10:
    // 1 -> 0, 3 -> 5, 5 -> 10. Cosi' il radar e' sempre confrontabile.
    const punteggi = set.ordine.map((k) => {
      const media = conteggi[k] ? somme[k] / conteggi[k] : 1;
      return { chiave: k, valore: (media - 1) / (set.scala - 1) * MAX };
    });

    const classifica = punteggi.slice().sort((a, b) => b.valore - a.valore);
    const primo = classifica[0];
    const secondo = classifica[1];
    // se la distanza è minima, il profilo è misto e va detto
    const misto = secondo && (primo.valore - secondo.valore) < 0.6;

    esito = {
      modo: modo,
      data: new Date().toISOString(),
      dominante: primo.chiave,
      secondario: secondo ? secondo.chiave : null,
      misto: misto,
      punteggi: punteggi.reduce((acc, p) => {
        acc[p.chiave] = Math.round(p.valore * 10) / 10; return acc;
      }, {}),
      classifica: classifica.map((c) => c.chiave)
    };

    salva(esito);
    disegnaEsito(esito);
    mostra('view-esito');
  }

  /* ==========================================================
     Il risultato
     ========================================================== */
  function disegnaEsito(e) {
    const s = dati[e.modo];
    const a = s.archetipi[e.dominante];
    const b = e.secondario ? s.archetipi[e.secondario] : null;

    $('#esito-modo').textContent = e.misto
      ? 'Un profilo in equilibrio fra due archetipi'
      : 'Il tuo archetipo dominante';
    $('#esito-nome').textContent = a.nome;
    $('#esito-motto').textContent = a.motto;

    $('#esito-secondo').textContent = !b ? '' : (e.misto
      ? 'Subito accanto, quasi alla pari, c’è ' + b.nome + ': le due figure convivono e si bilanciano a vicenda.'
      : 'A ruota lo accompagna ' + b.nome + ', che ne smorza o ne completa il carattere.');

    $('#esito-descrizione').textContent = a.descrizione;
    $('#esito-desiderio').textContent = a.desiderio;
    $('#esito-paura').textContent = a.paura;
    $('#esito-consiglio').textContent = a.consiglio;

    const lista = (arr) => arr.map((x) => '<li>' + esc(x) + '</li>').join('');
    $('#sw-forza').innerHTML = lista(a.swot.forza);
    $('#sw-debolezza').innerHTML = lista(a.swot.debolezza);
    $('#sw-opportunita').innerHTML = lista(a.swot.opportunita);
    $('#sw-minaccia').innerHTML = lista(a.swot.minaccia);

    $('#nota-fonte').textContent = s.fonte +
      '. Questo test è uno spunto di riflessione, non uno strumento diagnostico.';

    /* radar */
    Charts.radar($('#grafico'), {
      labels: s.ordine.map((k) => s.archetipi[k].nome.replace(/^(L’|Il |La )/, '')),
      max: MAX,
      rings: 5,
      labelRoom: s.ordine.length > 6 ? 96 : 80,
      alt: 'Punteggio di ciascun archetipo, da 0 a 10',
      series: [{ name: 'Il tuo profilo', values: s.ordine.map((k) => e.punteggi[k]) }]
    });

    /* classifica */
    $('#classifica').innerHTML = e.classifica.map((k, i) => {
      const v = e.punteggi[k];
      return '' +
        '<div class="riga' + (i < 2 ? ' top' : '') + '">' +
          '<span class="nome">' + esc(s.archetipi[k].nome) + '</span>' +
          '<span class="progress"><i style="width:' + (v / MAX * 100) + '%"></i></span>' +
          '<span class="val">' + v.toFixed(1) + '</span>' +
        '</div>';
    }).join('');

    disegnaConfronto(e);
  }

  /* ==========================================================
     Storico e confronto
     ========================================================== */
  function salva(e) {
    const storico = store.get('storico', []);
    storico.unshift(e);
    store.set('storico', storico.slice(0, MAX_STORICO));
  }

  function etichettaDi(voce) {
    const s = dati[voce.modo];
    return s && s.archetipi[voce.dominante]
      ? s.archetipi[voce.dominante].nome
      : voce.dominante;
  }

  function aggiornaStorico() {
    const storico = store.get('storico', []);
    const box = $('#box-storico');
    if (!storico.length) { box.hidden = true; return; }

    box.hidden = false;
    $('#storico').innerHTML = storico.map((v) =>
      '<div class="storico-voce">' +
        '<b>' + esc(etichettaDi(v)) + '</b>' +
        '<span class="muted small">' + esc(dati[v.modo] ? dati[v.modo].nome : '') + '</span>' +
        '<span class="quando">' + esc(Shell.itDate(v.data)) + '</span>' +
      '</div>'
    ).join('');
  }

  function disegnaConfronto(corrente) {
    // solo i risultati dello stesso tipo di test sono confrontabili
    const precedenti = store.get('storico', [])
      .filter((v) => v.modo === corrente.modo && v.data !== corrente.data);

    const box = $('#box-confronto');
    if (!precedenti.length) { box.hidden = true; return; }

    const s = dati[corrente.modo];
    const ultimo = precedenti[0];

    const cambi = s.ordine
      .map((k) => ({
        nome: s.archetipi[k].nome,
        delta: (corrente.punteggi[k] || 0) - (ultimo.punteggi[k] || 0)
      }))
      .filter((c) => Math.abs(c.delta) >= 0.5)
      .sort((a, b) => Math.abs(b.delta) - Math.abs(a.delta))
      .slice(0, 4);

    const stessoArchetipo = ultimo.dominante === corrente.dominante;

    box.hidden = false;
    $('#confronto').innerHTML =
      '<p class="dim small">L’ultima volta, il ' + esc(Shell.itDate(ultimo.data)) + ', ' +
        (stessoArchetipo
          ? 'era uscito lo stesso archetipo: <b>' + esc(etichettaDi(ultimo)) + '</b>.'
          : 'era uscito <b>' + esc(etichettaDi(ultimo)) + '</b>.') +
      '</p>' +
      (cambi.length
        ? '<div class="classifica" style="margin-top:.75rem">' + cambi.map((c) =>
            '<div class="riga">' +
              '<span class="nome">' + esc(c.nome) + '</span>' +
              '<span class="small ' + (c.delta > 0 ? '' : 'muted') + '">' +
                (c.delta > 0 ? '↑ cresciuto' : '↓ calato') + '</span>' +
              '<span class="val">' + (c.delta > 0 ? '+' : '') + c.delta.toFixed(1) + '</span>' +
            '</div>').join('') + '</div>'
        : '<p class="muted small" style="margin-top:.5rem">Nessuno scostamento rilevante rispetto ad allora.</p>');
  }

  $('#svuota-storico').addEventListener('click', () => {
    if (confirm('Cancellare tutti i risultati salvati su questo dispositivo?')) {
      store.del('storico');
      aggiornaStorico();
      Shell.toast('Storico cancellato');
    }
  });

  /* ==========================================================
     Porta via il risultato
     ========================================================== */
  $('#stampa').addEventListener('click', Shell.print);
  $('#rifai').addEventListener('click', () => { mostra('view-intro'); aggiornaStorico(); });

  $('#png').addEventListener('click', () => {
    Charts.toPng($('#grafico'), 'archetipi-' + Shell.stamp() + '.png')
      .then(() => Shell.toast('Grafico scaricato'))
      .catch(() => Shell.toast('Non riesco a esportare il grafico'));
  });

  $('#condividi').addEventListener('click', () => {
    if (!esito) return;
    const s = dati[esito.modo];
    const a = s.archetipi[esito.dominante];
    Shell.share({
      title: 'Test Archetipi di Jung',
      text: 'Il mio archetipo dominante è ' + a.nome + '. ' + a.motto,
      url: location.href
    });
  });

  /* ---------- partenza ---------- */
  aggiornaStorico();
  mostra('view-intro');
})();
