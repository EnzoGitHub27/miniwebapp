/* ============================================================
   Leadership Etica — logica
   ------------------------------------------------------------
   Differenze rispetto alla versione precedente:

   - le risposte si salvano da sole mentre scrivi: prima un
     ricaricamento accidentale cancellava un'intervista intera
   - il pulsante email non punta più a destinatario@example.com,
     che era il segnaposto rimasto nel codice: apre il programma
     di posta senza destinatario, lo scegli tu
   - le risposte si esportano in Markdown, si copiano e si stampano
     in PDF; gli a capo si vedono davvero (prima textContent con \n
     mostrava tutto su una riga sola)
   - otto ruoli invece di tre, e la possibilità di aggiungere
     domande proprie
   - la pagina dichiara lang="it" e non più lang="en"
   ============================================================ */
(function () {
  'use strict';

  const $ = Shell.$;
  const $$ = Shell.$$;
  const esc = Shell.esc;
  const store = Shell.store();
  const dati = window.INTERVISTE;

  let ruolo = store.get('ruolo', dati.ruoli[0].id);
  let lingua = store.get('lingua', 'it');
  let domande = [];       // testo delle domande in uso
  let risposte = [];      // testo scritto, stesso indice
  let timerSalva = null;

  /* chiave diversa per ogni combinazione ruolo + lingua:
     cambiare ruolo non cancella quello che avevi scritto prima */
  function chiave() { return 'bozza.' + ruolo + '.' + lingua; }
  function chiaveExtra() { return 'extra.' + ruolo + '.' + lingua; }

  function ruoloCorrente() {
    return dati.ruoli.find((r) => r.id === ruolo) || dati.ruoli[0];
  }

  /* ==========================================================
     Composizione della traccia
     ========================================================== */
  function componi() {
    const r = ruoloCorrente();
    const proprie = store.get(chiaveExtra(), []);
    domande = r.domande[lingua]
      .concat(dati.generali[lingua])
      .concat(proprie);

    const salvate = store.get(chiave(), []);
    risposte = domande.map((_, i) => salvate[i] || '');
  }

  /* ==========================================================
     Disegno
     ========================================================== */
  function disegna() {
    const r = ruoloCorrente();
    $('#titolo-traccia').textContent = lingua === 'it'
      ? 'Domande per: ' + r.nome.it
      : 'Questions for: ' + r.nome.en;

    const numeroProprie = store.get(chiaveExtra(), []).length;
    const primaDelleProprie = domande.length - numeroProprie;

    $('#elenco').innerHTML = domande.map((d, i) => {
      const scritta = (risposte[i] || '').trim().length > 0;
      const propria = i >= primaDelleProprie;
      return '' +
        '<div class="domanda-blocco' + (scritta ? ' risposto' : '') + '" data-i="' + i + '">' +
          '<div class="domanda-testa">' +
            '<span class="numero">' + (i + 1) + '</span>' +
            '<span class="domanda-testo">' + esc(d) + '</span>' +
            (propria
              ? '<button class="icon-btn no-print" type="button" data-togli="' + i + '" ' +
                'aria-label="Togli questa domanda">' +
                '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>' +
                '</button>'
              : '') +
          '</div>' +
          '<textarea data-r="' + i + '" rows="3" ' +
            'aria-label="Risposta alla domanda ' + (i + 1) + '" ' +
            'placeholder="' + (lingua === 'it' ? 'Scrivi qui la risposta…' : 'Write the answer here…') + '"' +
          '>' + esc(risposte[i] || '') + '</textarea>' +
        '</div>';
    }).join('');

    $$('#elenco textarea').forEach((ta) => {
      adattaAltezza(ta);
      ta.addEventListener('input', () => {
        risposte[Number(ta.dataset.r)] = ta.value;
        adattaAltezza(ta);
        aggiornaAvanzamento();
        salvaFraPoco();
      });
    });

    aggiornaAvanzamento();
  }

  /* il campo cresce con il testo: niente barre di scorrimento interne,
     e in stampa si vede tutto */
  function adattaAltezza(ta) {
    ta.style.height = 'auto';
    ta.style.height = Math.max(ta.scrollHeight, 76) + 'px';
  }

  function aggiornaAvanzamento() {
    const fatte = risposte.filter((r) => (r || '').trim().length > 0).length;
    const totale = domande.length;
    $('#avanzamento-testo').textContent = fatte + ' risposte su ' + totale;
    $('#barra').style.width = totale ? (fatte / totale * 100) + '%' : '0%';

    const parole = risposte.join(' ').trim().split(/\s+/).filter(Boolean).length;
    $('#parole-tot').textContent = parole ? parole + ' parole' : '';

    $$('#elenco .domanda-blocco').forEach((b) => {
      const i = Number(b.dataset.i);
      b.classList.toggle('risposto', (risposte[i] || '').trim().length > 0);
    });
  }

  /* ==========================================================
     Salvataggio automatico
     ========================================================== */
  function salvaFraPoco() {
    clearTimeout(timerSalva);
    $('#stato').textContent = lingua === 'it' ? 'Sto salvando…' : 'Saving…';
    timerSalva = setTimeout(() => {
      store.set(chiave(), risposte);
      $('#stato').innerHTML = '<i class="pallino-ok"></i>' +
        (lingua === 'it' ? 'Salvato su questo dispositivo' : 'Saved on this device');
    }, 500);
  }

  /* ==========================================================
     Comandi
     ========================================================== */
  const selRuolo = $('#ruolo');
  function riempiRuoli() {
    selRuolo.innerHTML = dati.ruoli.map((r) =>
      '<option value="' + r.id + '"' + (r.id === ruolo ? ' selected' : '') + '>' +
      esc(r.nome[lingua]) + '</option>').join('');
  }

  selRuolo.addEventListener('change', () => {
    ruolo = selRuolo.value;
    store.set('ruolo', ruolo);
    componi(); disegna();
    $('#stato').textContent = '';
  });

  $('#lingua').addEventListener('change', () => {
    lingua = $('#lingua').value;
    store.set('lingua', lingua);
    riempiRuoli();
    componi(); disegna();
    $('#stato').textContent = '';
  });

  /* ---------- domande proprie ---------- */
  function aggiungiDomanda() {
    const testo = $('#nuova').value.trim();
    if (!testo) return;
    const proprie = store.get(chiaveExtra(), []);
    proprie.push(testo);
    store.set(chiaveExtra(), proprie);
    $('#nuova').value = '';
    componi(); disegna();
    Shell.toast(lingua === 'it' ? 'Domanda aggiunta' : 'Question added');
  }

  $('#aggiungi').addEventListener('click', aggiungiDomanda);
  $('#nuova').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') { e.preventDefault(); aggiungiDomanda(); }
  });

  $('#elenco').addEventListener('click', (e) => {
    const b = e.target.closest('[data-togli]');
    if (!b) return;
    const i = Number(b.dataset.togli);
    const proprie = store.get(chiaveExtra(), []);
    const primaDelleProprie = domande.length - proprie.length;
    proprie.splice(i - primaDelleProprie, 1);
    store.set(chiaveExtra(), proprie);
    risposte.splice(i, 1);
    store.set(chiave(), risposte);
    componi(); disegna();
  });

  /* ==========================================================
     Esportazione
     ========================================================== */
  function testoMarkdown() {
    const et = dati.etichette[lingua];
    const r = ruoloCorrente();
    const righe = [
      '# ' + et.titoloDoc,
      '',
      '**' + et.ruolo + ':** ' + r.nome[lingua],
      '**' + et.data + ':** ' + Shell.itDate(new Date()),
      ''
    ];
    domande.forEach((d, i) => {
      righe.push('## ' + (i + 1) + '. ' + d);
      righe.push('');
      righe.push((risposte[i] || '').trim() || '_' + et.senzaRisposta + '_');
      righe.push('');
    });
    return righe.join('\n');
  }

  $('#stampa').addEventListener('click', Shell.print);

  $('#markdown').addEventListener('click', () => {
    Shell.download('leadership-etica-' + ruolo + '-' + Shell.stamp() + '.md',
                   testoMarkdown(), 'text/markdown');
    Shell.toast(lingua === 'it' ? 'File scaricato' : 'File downloaded');
  });

  $('#copia').addEventListener('click', () => {
    Shell.copy(testoMarkdown(), lingua === 'it' ? 'Testo copiato' : 'Text copied');
  });

  $('#email').addEventListener('click', () => {
    const et = dati.etichette[lingua];
    const oggetto = et.titoloDoc + ' — ' + ruoloCorrente().nome[lingua];
    const corpo = testoMarkdown();

    // niente destinatario: lo sceglie chi manda. Nella versione precedente
    // qui c'era destinatario@example.com, rimasto dal segnaposto.
    const url = 'mailto:?subject=' + encodeURIComponent(oggetto) +
                '&body=' + encodeURIComponent(corpo);

    // oltre i 2000 caratteri diversi client troncano il corpo senza dirlo
    if (url.length > 1900) {
      Shell.copy(corpo, lingua === 'it'
        ? 'Intervista troppo lunga per la mail: l’ho copiata, incollala tu'
        : 'Too long for a mailto link: copied to the clipboard instead');
      return;
    }
    location.href = url;
  });

  $('#pulisci').addEventListener('click', () => {
    const messaggio = lingua === 'it'
      ? 'Cancellare tutte le risposte di questa traccia? Le altre restano.'
      : 'Delete all answers for this set? The others are kept.';
    if (!confirm(messaggio)) return;
    store.del(chiave());
    componi(); disegna();
    $('#stato').textContent = '';
    Shell.toast(lingua === 'it' ? 'Risposte cancellate' : 'Answers cleared');
  });

  /* ---------- partenza ---------- */
  $('#lingua').value = lingua;
  riempiRuoli();
  componi();
  disegna();
})();
