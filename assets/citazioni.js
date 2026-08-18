/* ============================================================
   Motore comune per le app di citazioni
   ------------------------------------------------------------
   Usato da app11 (Saggezza Stoica) e app14 (L'Arte della Guerra).
   Cambiano solo i dati e il colore: la meccanica è la stessa.

   Si aspetta questa struttura nella pagina:

     #citazione-box   dove compaiono le citazioni
     #pesca           pulsante "un'altra"
     #quante          select con quante citazioni mostrare (opzionale)
     #filtro-autore   select (opzionale, compare solo se serve)
     #filtro-tema     select (opzionale, compare solo se serve)
     #ricerca         campo di ricerca (opzionale)
     #conta           quante citazioni corrispondono ai filtri
     #del-giorno      pulsante "quella di oggi" (opzionale)
     #preferiti-box   contenitore dei preferiti (opzionale)
     #preferiti       elenco dei preferiti

   Avvio:
     Citazioni.avvia({
       app: 'app11',
       dati: window.CITAZIONI_STOICHE,
       titoloCondivisione: 'Saggezza Stoica'
     });
   ============================================================ */
(function (global) {
  'use strict';

  const $ = Shell.$;
  const $$ = Shell.$$;
  const esc = Shell.esc;

  function avvia(cfg) {
    const store = Shell.store(cfg.app);
    const tutte = (cfg.dati || []).slice();
    let preferiti = store.get('preferiti', []);
    let pesca = null;             // estrazione senza ripetizioni
    let ultimeMostrate = [];

    /* ---------- elementi, tutti facoltativi tranne il primo ---------- */
    const box = $('#citazione-box');
    const btnPesca = $('#pesca');
    const selQuante = $('#quante');
    const selAutore = $('#filtro-autore');
    const selTema = $('#filtro-tema');
    const campoCerca = $('#ricerca');
    const conta = $('#conta');
    const btnGiorno = $('#del-giorno');
    const boxPref = $('#preferiti-box');
    const elencoPref = $('#preferiti');

    /* ==========================================================
       Filtri costruiti dai dati, non scritti a mano
       ----------------------------------------------------------
       Nella versione precedente l'elenco degli autori era una
       lista separata dalle citazioni: si erano disallineate, e
       quattro autori presenti nei testi non comparivano nel menu.
       ========================================================== */
    function valoriDistinti(campo) {
      const visti = [];
      tutte.forEach((c) => {
        const v = c[campo];
        if (v && visti.indexOf(v) === -1) visti.push(v);
      });
      return visti.sort((a, b) => a.localeCompare(b, 'it'));
    }

    function riempiFiltro(select, campo, etichettaTutti) {
      if (!select) return;
      const valori = valoriDistinti(campo);
      if (valori.length < 2) {                    // un solo valore: il filtro non serve
        const contenitore = select.closest('.field') || select;
        contenitore.hidden = true;
        return;
      }
      select.innerHTML = '<option value="">' + esc(etichettaTutti) + '</option>' +
        valori.map((v) => {
          const quante = tutte.filter((c) => c[campo] === v).length;
          return '<option value="' + esc(v) + '">' + esc(v) + ' (' + quante + ')</option>';
        }).join('');
    }

    riempiFiltro(selAutore, 'autore', cfg.etichettaAutori || 'Tutti gli autori');
    riempiFiltro(selTema, 'tema', cfg.etichettaTemi || 'Tutti i temi');

    /* ==========================================================
       Selezione
       ========================================================== */
    function filtrate() {
      const autore = selAutore && !selAutore.closest('.field, select').hidden ? selAutore.value : '';
      const tema = selTema && !selTema.closest('.field, select').hidden ? selTema.value : '';
      const cerca = campoCerca ? campoCerca.value.trim().toLowerCase() : '';

      return tutte.filter((c) => {
        if (autore && c.autore !== autore) return false;
        if (tema && c.tema !== tema) return false;
        if (cerca) {
          const testo = [c.testo, c.autore, c.tema, c.fonte].join(' ').toLowerCase();
          if (testo.indexOf(cerca) === -1) return false;
        }
        return true;
      });
    }

    function rigeneraPesca() {
      pesca = Shell.shuffler(filtrate());
    }

    /* ==========================================================
       Disegno
       ========================================================== */
    function scheda(c, opzioni) {
      const o = opzioni || {};
      const salvata = preferiti.some((p) => p.testo === c.testo);
      const dettagli = [c.fonte, c.anno].filter(Boolean).join(' · ');

      return '' +
        '<figure class="citazione' + (o.piccola ? ' piccola' : '') + '">' +
          '<blockquote>' + esc(c.testo) + '</blockquote>' +
          '<figcaption>' +
            '<span class="autore">' + esc(c.autore) + '</span>' +
            (dettagli ? '<span class="fonte">' + esc(dettagli) + '</span>' : '') +
            (c.tema ? '<span class="chip">' + esc(c.tema) + '</span>' : '') +
            (c.certezza === 'attribuita'
              ? '<span class="chip incerta" title="Circola sotto questo nome ma non compare in questa forma nelle fonti">attribuita</span>'
              : '') +
          '</figcaption>' +
          (o.senzaAzioni ? '' :
            '<div class="cit-azioni no-print">' +
              '<button class="icon-btn" type="button" data-pref="' + esc(c.testo) + '" ' +
                      'aria-label="' + (salvata ? 'Togli dai preferiti' : 'Salva fra i preferiti') + '" ' +
                      'title="' + (salvata ? 'Togli dai preferiti' : 'Salva fra i preferiti') + '">' +
                (salvata
                  ? '<svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 21s-8-4.9-8-10.3A4.7 4.7 0 0 1 12 7a4.7 4.7 0 0 1 8 3.7C20 16.1 12 21 12 21z"/></svg>'
                  : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"><path d="M12 21s-8-4.9-8-10.3A4.7 4.7 0 0 1 12 7a4.7 4.7 0 0 1 8 3.7C20 16.1 12 21 12 21z"/></svg>') +
              '</button>' +
              '<button class="icon-btn" type="button" data-copia="' + esc(c.testo) + '" ' +
                      'aria-label="Copia" title="Copia">' +
                '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">' +
                  '<rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/></svg>' +
              '</button>' +
              '<button class="icon-btn" type="button" data-condividi="' + esc(c.testo) + '" ' +
                      'aria-label="Condividi" title="Condividi">' +
                '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">' +
                  '<path d="M12 3v13M8 7l4-4 4 4M5 14v5a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-5"/></svg>' +
              '</button>' +
            '</div>') +
        '</figure>';
    }

    function mostra(elenco) {
      ultimeMostrate = elenco;
      box.innerHTML = elenco.length
        ? elenco.map((c, i) => scheda(c, { piccola: elenco.length > 1 })).join('')
        : '<p class="muted center" style="padding:2rem 0">' +
          (cfg.nessunRisultato || 'Nessuna citazione corrisponde ai filtri.') + '</p>';
      box.classList.remove('appare');
      void box.offsetWidth;                       // riavvia l'animazione
      box.classList.add('appare');
    }

    function aggiornaConta() {
      if (!conta) return;
      const n = filtrate().length;
      conta.textContent = n === tutte.length
        ? tutte.length + (cfg.parolaPlurale || ' citazioni')
        : n + ' su ' + tutte.length;
    }

    /* ==========================================================
       Azioni
       ========================================================== */
    function pescaNuove() {
      const disponibili = filtrate();
      if (!disponibili.length) { mostra([]); return; }
      const quante = selQuante ? Math.min(Number(selQuante.value) || 1, disponibili.length) : 1;
      if (!pesca) rigeneraPesca();

      const uscite = [];
      const visti = {};
      let tentativi = 0;
      while (uscite.length < quante && tentativi < disponibili.length * 4) {
        const c = pesca();
        tentativi++;
        if (!c) break;
        if (visti[c.testo]) continue;             // niente doppioni nella stessa schermata
        visti[c.testo] = true;
        uscite.push(c);
      }
      mostra(uscite);
    }

    /* la citazione del giorno: uguale per tutta la giornata,
       così ha senso condividerla e ritrovarla */
    function quellaDiOggi() {
      const disponibili = filtrate();
      if (!disponibili.length) { mostra([]); return; }
      const i = Shell.daySeed() % disponibili.length;
      mostra([disponibili[i]]);
      Shell.toast(cfg.etichettaGiorno || 'La citazione di oggi');
    }

    function alterna(testo) {
      const i = preferiti.findIndex((p) => p.testo === testo);
      if (i === -1) {
        const c = tutte.find((x) => x.testo === testo);
        if (c) { preferiti.unshift(c); Shell.toast('Salvata fra i preferiti'); }
      } else {
        preferiti.splice(i, 1);
        Shell.toast('Tolta dai preferiti');
      }
      store.set('preferiti', preferiti);
      disegnaPreferiti();
      mostra(ultimeMostrate);                     // aggiorna il cuoricino
    }

    function disegnaPreferiti() {
      if (!boxPref || !elencoPref) return;
      if (!preferiti.length) { boxPref.hidden = true; return; }
      boxPref.hidden = false;
      elencoPref.innerHTML = preferiti.map((c) =>
        '<div class="pref-voce">' +
          '<div class="pref-testo">' +
            '<p>' + esc(c.testo) + '</p>' +
            '<span class="muted small">' + esc(c.autore) +
              (c.fonte ? ' · ' + esc(c.fonte) : '') + '</span>' +
          '</div>' +
          '<button class="icon-btn no-print" type="button" data-togli="' + esc(c.testo) + '" ' +
                  'aria-label="Togli dai preferiti">' +
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>' +
          '</button>' +
        '</div>').join('');
    }

    function testoCondivisibile(c) {
      return '«' + c.testo + '»\n— ' + c.autore + (c.fonte ? ', ' + c.fonte : '');
    }

    /* ==========================================================
       Collegamenti
       ========================================================== */
    document.addEventListener('click', (e) => {
      const b = e.target.closest('button');
      if (!b) return;

      if (b.dataset.pref != null) alterna(b.dataset.pref);
      if (b.dataset.togli != null) alterna(b.dataset.togli);

      if (b.dataset.copia != null) {
        const c = tutte.find((x) => x.testo === b.dataset.copia);
        if (c) Shell.copy(testoCondivisibile(c), 'Citazione copiata');
      }

      if (b.dataset.condividi != null) {
        const c = tutte.find((x) => x.testo === b.dataset.condividi);
        if (c) Shell.share({
          title: cfg.titoloCondivisione || document.title,
          text: testoCondivisibile(c),
          url: location.href
        });
      }
    });

    if (btnPesca) btnPesca.addEventListener('click', pescaNuove);
    if (btnGiorno) btnGiorno.addEventListener('click', quellaDiOggi);
    if (selQuante) selQuante.addEventListener('change', pescaNuove);

    [selAutore, selTema].forEach((sel) => {
      if (!sel) return;
      sel.addEventListener('change', () => { rigeneraPesca(); aggiornaConta(); pescaNuove(); });
    });

    if (campoCerca) {
      let attesa = null;
      campoCerca.addEventListener('input', () => {
        clearTimeout(attesa);
        attesa = setTimeout(() => { rigeneraPesca(); aggiornaConta(); pescaNuove(); }, 220);
      });
    }

    /* barra spaziatrice: un'altra citazione */
    document.addEventListener('keydown', (e) => {
      if (e.code !== 'Space') return;
      if (/^(INPUT|TEXTAREA|SELECT|BUTTON)$/.test(document.activeElement.tagName)) return;
      e.preventDefault();
      pescaNuove();
    });

    /* ---------- partenza ---------- */
    rigeneraPesca();
    aggiornaConta();
    disegnaPreferiti();
    quellaDiOggi();
  }

  global.Citazioni = { avvia: avvia };
})(window);
