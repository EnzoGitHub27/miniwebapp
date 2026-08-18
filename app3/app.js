/* ============================================================
   Generatore di password — logica
   ------------------------------------------------------------
   La versione precedente usava Math.random(), che non e' pensato
   per la sicurezza: la sequenza che produce e' prevedibile se si
   conosce lo stato del generatore. Qui si usa crypto.getRandomValues,
   che e' il generatore crittografico del browser.

   Altre differenze: lunghezza libera, classi di caratteri a scelta,
   garanzia che ogni classe attiva compaia davvero, esclusione dei
   caratteri che si confondono, stima dell'entropia e frasi di accesso.
   ============================================================ */
(function () {
  'use strict';

  const $ = Shell.$;
  const $$ = Shell.$$;
  const parole = window.PAROLE || [];

  const ALFABETI = {
    min: 'abcdefghijklmnopqrstuvwxyz',
    mai: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    num: '0123456789',
    sim: '!@#$%&*?+-=_:;.,()[]{}<>/'
  };
  // caratteri che si scambiano fra loro quando si legge o si detta
  const AMBIGUI = 'O0oIl1|5S2Z8B';

  let modo = 'caratteri';
  let ultima = '';

  /* ==========================================================
     Casualita' vera, senza sbilanciamenti
     ----------------------------------------------------------
     Prendere il resto della divisione (% n) favorisce i primi
     valori quando n non divide esattamente 256. Si scartano i
     numeri che cadono nella coda incompleta: e' il modo corretto
     di estrarre un intero uniforme da byte casuali.
     ========================================================== */
  function intero(n) {
    if (n <= 0) return 0;
    const soglia = 256 - (256 % n);
    const buf = new Uint8Array(1);
    let v;
    do { crypto.getRandomValues(buf); v = buf[0]; } while (v >= soglia);
    return v % n;
  }

  function pesca(insieme) {
    return insieme[intero(insieme.length)];
  }

  function mescola(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = intero(i + 1);
      const t = arr[i]; arr[i] = arr[j]; arr[j] = t;
    }
    return arr;
  }

  /* ==========================================================
     Password a caratteri
     ========================================================== */
  function classiAttive() {
    const senzaAmbigui = $('#o-amb').checked;
    const filtra = (s) => senzaAmbigui
      ? s.split('').filter((c) => AMBIGUI.indexOf(c) === -1).join('')
      : s;

    const attive = [];
    if ($('#o-min').checked) attive.push(filtra(ALFABETI.min));
    if ($('#o-mai').checked) attive.push(filtra(ALFABETI.mai));
    if ($('#o-num').checked) attive.push(filtra(ALFABETI.num));
    if ($('#o-sim').checked) attive.push(filtra(ALFABETI.sim));
    return attive;
  }

  function generaCaratteri() {
    const attive = classiAttive();
    const lunghezza = Number($('#lunghezza').value);

    if (!attive.length) {
      return { testo: '', bit: 0, errore: 'Serve almeno un tipo di carattere.' };
    }

    const tutti = attive.join('');
    const caratteri = [];

    // una per classe, cosi' la garanzia e' reale e non sperata
    attive.forEach((cl) => { if (caratteri.length < lunghezza) caratteri.push(pesca(cl)); });
    while (caratteri.length < lunghezza) caratteri.push(pesca(tutti));

    mescola(caratteri);

    return {
      testo: caratteri.join(''),
      bit: lunghezza * Math.log2(tutti.length)
    };
  }

  /* ==========================================================
     Frase di accesso
     ========================================================== */
  function generaFrase() {
    if (!parole.length) return { testo: '', bit: 0, errore: 'Elenco di parole non disponibile.' };

    const quante = Number($('#parole').value);
    const sep = $('#separatore').value;
    const maiuscole = $('#f-mai').checked;
    const conNumero = $('#f-num').checked;

    const scelte = [];
    for (let i = 0; i < quante; i++) {
      let p = pesca(parole);
      if (maiuscole) p = p.charAt(0).toUpperCase() + p.slice(1);
      scelte.push(p);
    }

    let testo = scelte.join(sep);
    let bit = quante * Math.log2(parole.length);

    if (conNumero) {
      const n = intero(100);
      testo += (sep || '') + String(n).padStart(2, '0');
      bit += Math.log2(100);
    }

    return { testo: testo, bit: bit, pezzi: scelte, sep: sep, numero: conNumero };
  }

  /* ==========================================================
     Robustezza
     ========================================================== */
  const LIVELLI = [
    { min: 0,  nome: 'Molto debole', colore: 'var(--bad)',   quota: 20 },
    { min: 45, nome: 'Debole',       colore: 'var(--warn)',  quota: 40 },
    { min: 60, nome: 'Discreta',     colore: 'var(--warn)',  quota: 62 },
    { min: 75, nome: 'Robusta',      colore: 'var(--ok)',    quota: 82 },
    { min: 100, nome: 'Molto robusta', colore: 'var(--ok)',  quota: 100 }
  ];

  function livello(bit) {
    let scelto = LIVELLI[0];
    LIVELLI.forEach((l) => { if (bit >= l.min) scelto = l; });
    return scelto;
  }

  /* Tempo medio con cento miliardi di tentativi al secondo.
     In media basta metà dello spazio, da qui il "- 1" sull'esponente. */
  function tempoStimato(bit) {
    const secondi = Math.pow(2, bit - 1) / 1e11;
    if (secondi < 1) return 'Verrebbe indovinata subito.';

    const unita = [
      [1, 'secondi'], [60, 'minuti'], [3600, 'ore'], [86400, 'giorni'],
      [2629800, 'mesi'], [31557600, 'anni'], [31557600e3, 'millenni']
    ];
    let scala = unita[0];
    unita.forEach((u) => { if (secondi >= u[0]) scala = u; });

    const quanti = secondi / scala[0];
    if (quanti >= 1e6) {
      const esp = Math.floor(Math.log10(quanti));
      return 'Servirebbero circa 10' + apice(esp) + ' ' + scala[1] + ' per indovinarla.';
    }
    const arrotondato = quanti >= 10 ? Math.round(quanti) : Math.round(quanti * 10) / 10;
    return 'Servirebbero circa ' + String(arrotondato).replace('.', ',') + ' ' + scala[1] + ' per indovinarla.';
  }

  function apice(n) {
    const cifre = '⁰¹²³⁴⁵⁶⁷⁸⁹';
    return String(n).split('').map((c) => cifre[Number(c)] || c).join('');
  }

  /* ==========================================================
     Disegno
     ========================================================== */
  function mostra(risultato) {
    const out = $('#testo');

    if (risultato.errore) {
      ultima = '';
      out.textContent = risultato.errore;
      out.style.color = 'var(--bad)';
      $('#forza-barra').style.width = '0%';
      $('#forza-nome').textContent = '—';
      $('#forza-bit').textContent = '';
      $('#forza-tempo').textContent = '';
      return;
    }

    ultima = risultato.testo;
    out.style.color = '';

    // nella frase si colorano separatori e numero: si legge molto meglio
    if (risultato.pezzi) {
      const sep = risultato.sep === ' ' ? '&nbsp;' : Shell.esc(risultato.sep);
      let html = risultato.pezzi.map(Shell.esc)
        .join(sep ? '<span class="sep">' + sep + '</span>' : '');
      if (risultato.numero) {
        const coda = risultato.testo.slice(-2);
        html += (sep ? '<span class="sep">' + sep + '</span>' : '') +
                '<span class="num">' + Shell.esc(coda) + '</span>';
      }
      out.innerHTML = html;
    } else {
      out.textContent = risultato.testo;
    }

    const bit = Math.round(risultato.bit);
    const l = livello(bit);
    $('#forza-barra').style.width = l.quota + '%';
    $('#forza-barra').style.background = l.colore;
    $('#forza-nome').textContent = l.nome;
    $('#forza-nome').style.color = l.colore;
    $('#forza-bit').textContent = bit + ' bit di entropia';
    $('#forza-tempo').textContent = tempoStimato(bit);
  }

  function genera() {
    mostra(modo === 'caratteri' ? generaCaratteri() : generaFrase());
  }

  /* ==========================================================
     Comandi
     ========================================================== */
  $$('.modo-scelta button').forEach((b) => {
    b.addEventListener('click', () => {
      modo = b.dataset.modo;
      $$('.modo-scelta button').forEach((x) =>
        x.setAttribute('aria-pressed', String(x.dataset.modo === modo)));
      $('#pan-caratteri').hidden = modo !== 'caratteri';
      $('#pan-frase').hidden = modo !== 'frase';
      genera();
    });
  });

  $('#lunghezza').addEventListener('input', () => {
    $('#lunghezza-val').value = $('#lunghezza').value;
    genera();
  });

  $('#parole').addEventListener('input', () => {
    $('#parole-val').value = $('#parole').value;
    genera();
  });

  ['#o-min', '#o-mai', '#o-num', '#o-sim', '#o-amb', '#f-num', '#f-mai', '#separatore']
    .forEach((sel) => $(sel).addEventListener('change', () => {
      aggiornaSpente();
      genera();
    }));

  /* quando una classe è spenta, l'etichetta lo dice anche visivamente */
  function aggiornaSpente() {
    $$('.opz').forEach((o) => {
      const c = o.querySelector('input[type="checkbox"]');
      if (c) o.classList.toggle('spenta', !c.checked);
    });
  }

  $('#genera').addEventListener('click', genera);
  $('#rigenera').addEventListener('click', genera);

  $('#copia').addEventListener('click', () => {
    if (!ultima) { Shell.toast('Non c’è niente da copiare'); return; }
    Shell.copy(ultima, 'Password copiata');
  });

  /* ---------- partenza ---------- */
  $('#quante-parole').textContent = parole.length;
  $('#lunghezza-val').value = $('#lunghezza').value;
  $('#parole-val').value = $('#parole').value;
  aggiornaSpente();
  genera();
})();
