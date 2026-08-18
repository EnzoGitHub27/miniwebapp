/* ============================================================
   Mini Web App — guscio condiviso
   ------------------------------------------------------------
   Si occupa delle cose che ogni app deve avere e che nessuno
   ha voglia di riscrivere: barra con il ritorno al menu,
   interruttore del tema, salvataggio locale con prefisso,
   copia negli appunti, condivisione, scarico file, notifiche.

   Uso minimo, in fondo al <body>:
       <script src="../assets/shell.js" data-app="app1"
               data-title="Ruota della Vita"></script>

   Poi, nel proprio script:
       const store = Shell.store('app1');
       store.set('storico', [...]);          // -> mwa.app1.storico

   Attributi accettati sul tag <script>:
       data-app     identificativo della cartella (obbligatorio)
       data-title   titolo mostrato nella barra
       data-home    percorso del menu (predefinito "../")
       data-bar     "no" per non iniettare la barra
   ============================================================ */
(function (global) {
  'use strict';

  var script = document.currentScript;
  var cfg = script ? script.dataset : {};
  var APP = cfg.app || 'app';
  var HOME = cfg.home || '../index.html';

  /* ---------- selettori brevi ---------- */
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  /* ---------- archiviazione locale con prefisso ----------
     Tutte le chiavi diventano mwa.<app>.<nome>, così due app
     non possono più pestarsi i piedi sullo stesso dominio. */
  function store(appId) {
    var pre = 'mwa.' + (appId || APP) + '.';
    return {
      get: function (key, fallback) {
        try {
          var raw = localStorage.getItem(pre + key);
          return raw === null ? fallback : JSON.parse(raw);
        } catch (e) { return fallback; }
      },
      set: function (key, value) {
        try { localStorage.setItem(pre + key, JSON.stringify(value)); return true; }
        catch (e) { return false; }
      },
      del: function (key) {
        try { localStorage.removeItem(pre + key); } catch (e) {}
      },
      clear: function () {
        try {
          Object.keys(localStorage)
            .filter(function (k) { return k.indexOf(pre) === 0; })
            .forEach(function (k) { localStorage.removeItem(k); });
        } catch (e) {}
      }
    };
  }

  /* ---------- tema ---------- */
  var theme = {
    get: function () {
      var d = document.documentElement.dataset.theme;
      if (d) return d;
      return matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    },
    set: function (value) {
      document.documentElement.dataset.theme = value;
      try { localStorage.setItem('mwa.theme', value); } catch (e) {}
      var meta = $('meta[name="theme-color"]');
      if (meta) {
        meta.content = getComputedStyle(document.documentElement)
          .getPropertyValue('--bg').trim() || meta.content;
      }
    },
    toggle: function () { theme.set(theme.get() === 'dark' ? 'light' : 'dark'); }
  };

  /* ---------- notifica temporanea ---------- */
  var toastEl = null, toastTimer = null;
  function toast(message) {
    if (!toastEl) {
      toastEl = document.createElement('div');
      toastEl.className = 'mwa-toast';
      toastEl.setAttribute('role', 'status');
      toastEl.setAttribute('aria-live', 'polite');
      document.body.appendChild(toastEl);
    }
    toastEl.textContent = message;
    requestAnimationFrame(function () { toastEl.classList.add('on'); });
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.classList.remove('on'); }, 2400);
  }

  /* ---------- copia negli appunti ----------
     navigator.clipboard esiste solo in contesto sicuro: fuori da
     https (per esempio aprendo il file da disco) serve il ripiego. */
  function copy(text, message) {
    var done = function () { toast(message || 'Copiato negli appunti'); };
    if (navigator.clipboard && global.isSecureContext) {
      return navigator.clipboard.writeText(text).then(done).catch(function () { fallback(); });
    }
    fallback();
    return Promise.resolve();

    function fallback() {
      var ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.cssText = 'position:fixed;top:-1000px;opacity:0';
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy'); done(); }
      catch (e) { toast('Non riesco a copiare: seleziona il testo a mano'); }
      document.body.removeChild(ta);
    }
  }

  /* ---------- condivisione ---------- */
  function share(data) {
    if (navigator.share) {
      return navigator.share(data).catch(function (err) {
        if (err && err.name === 'AbortError') return;   // l'utente ha annullato
        copy(data.text || data.url || '');
      });
    }
    copy([data.text, data.url].filter(Boolean).join('\n'));
    return Promise.resolve();
  }

  /* ---------- scarico di un file ---------- */
  function download(filename, content, mime) {
    var blob = content instanceof Blob
      ? content
      : new Blob(['﻿' + content], { type: (mime || 'text/plain') + ';charset=utf-8' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
  }

  /* ---------- data di oggi in formato file ---------- */
  function stamp(date) {
    var d = date || new Date();
    var p = function (n) { return String(n).padStart(2, '0'); };
    return d.getFullYear() + '-' + p(d.getMonth() + 1) + '-' + p(d.getDate());
  }

  /* ---------- data leggibile in italiano ---------- */
  function itDate(value) {
    var d = value instanceof Date ? value : new Date(value);
    if (isNaN(d)) return '';
    return d.toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' });
  }

  /* ---------- testo sicuro dentro innerHTML ---------- */
  function esc(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  /* ---------- estrazione senza ripetizioni ----------
     Restituisce una funzione che pesca a caso ma non ripropone
     un elemento finché non sono usciti tutti gli altri. */
  function shuffler(items) {
    var pool = [];
    return function next() {
      if (!items.length) return null;
      if (!pool.length) {
        pool = items.slice();
        for (var i = pool.length - 1; i > 0; i--) {
          var j = Math.floor(Math.random() * (i + 1));
          var t = pool[i]; pool[i] = pool[j]; pool[j] = t;
        }
        // evita che la prima del giro nuovo sia uguale all'ultima del giro vecchio
        if (items.length > 1 && pool[pool.length - 1] === next.last) {
          pool.unshift(pool.pop());
        }
      }
      next.last = pool.pop();
      return next.last;
    };
  }

  /* ---------- numero stabile per il giorno corrente ----------
     Serve alla "citazione del giorno": uguale per tutta la giornata. */
  function daySeed() {
    var d = new Date();
    return d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
  }

  /* ---------- cursori: riempimento colorato e valore ----------
     Collega gli <input type="range"> alla variabile --fill usata
     dal CSS, e a un eventuale elemento indicato da data-output. */
  function bindRanges(root) {
    $$('input[type="range"]', root).forEach(function (el) {
      var out = el.dataset.output ? $('#' + el.dataset.output) : null;
      var paint = function () {
        var min = Number(el.min || 0), max = Number(el.max || 100);
        var pct = max === min ? 0 : ((Number(el.value) - min) / (max - min)) * 100;
        el.style.setProperty('--fill', pct + '%');
        if (out) out.textContent = el.value;
      };
      el.addEventListener('input', paint);
      paint();
    });
  }

  /* ---------- barra superiore ---------- */
  function buildBar() {
    if (cfg.bar === 'no' || $('.mwa-topbar')) return;

    var bar = document.createElement('header');
    bar.className = 'mwa-topbar no-print';
    bar.innerHTML =
      '<div class="mwa-topbar-in">' +
        '<a class="mwa-back" href="' + esc(HOME) + '">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" ' +
               'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
            '<path d="M15 18l-6-6 6-6"/></svg>' +
          'Tutte le app' +
        '</a>' +
        '<span class="mwa-title">' + esc(cfg.title || '') + '</span>' +
        '<button class="icon-btn" id="mwa-theme" type="button" ' +
                'aria-label="Cambia tema chiaro o scuro" title="Cambia tema">' +
          '<svg class="ico-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
               'stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
            '<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"/></svg>' +
          '<svg class="ico-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
               'stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
            '<circle cx="12" cy="12" r="4"/>' +
            '<path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>' +
          '</svg>' +
        '</button>' +
      '</div>';

    document.body.insertBefore(bar, document.body.firstChild);
    $('#mwa-theme').addEventListener('click', theme.toggle);
  }

  /* ---------- avvio ---------- */
  function init() {
    buildBar();
    bindRanges(document);
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  /* ---------- interfaccia pubblica ---------- */
  global.Shell = {
    app: APP, home: HOME,
    $: $, $$: $$, esc: esc,
    store: store, theme: theme,
    toast: toast, copy: copy, share: share, download: download,
    stamp: stamp, itDate: itDate,
    shuffler: shuffler, daySeed: daySeed,
    bindRanges: bindRanges,
    print: function () { global.print(); }
  };
})(window);
