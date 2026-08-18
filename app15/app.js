/* =========================================================================
   Sei Cappelli per Pensare — Edward de Bono (1985)
   App statica, nessuna dipendenza. Dati solo in localStorage.
   ========================================================================= */
(() => {
'use strict';

/* ---------------------------------------------------------------- dati */

const HATS = {
  white: {
    name: 'Cappello Bianco', short: 'Bianco', role: 'Fatti e informazioni', color: '#cfd9ec',
    tagline: 'Solo dati, niente interpretazioni',
    desc: 'Il cappello bianco è neutro come un foglio di carta: raccoglie fatti, numeri e informazioni verificabili. Serve anche a mettere a fuoco ciò che non sappiamo ancora e come procurarcelo.',
    avoid: 'Opinioni mascherate da dati, previsioni personali, "secondo me".',
    questions: [
      'Quali fatti conosciamo con certezza su questo tema?',
      'Quali informazioni ci mancano per decidere davvero?',
      'Che numeri, dati o misure abbiamo a disposizione?',
      'Come potremmo procurarci le informazioni che mancano?',
      'Quali dati sono verificati e quali sono solo voci?'
    ]
  },
  red: {
    name: 'Cappello Rosso', short: 'Rosso', role: 'Emozioni e intuito', color: '#ee6352',
    tagline: 'La pancia, senza doversi giustificare',
    desc: 'Il cappello rosso legittima emozioni, intuizioni e sensazioni. È l\'unico momento in cui non serve alcuna spiegazione: dire "questa cosa non mi convince" basta e avanza.',
    avoid: 'Motivare, argomentare, cercare prove. Qui la giustificazione è vietata.',
    questions: [
      'Qual è la tua reazione di pancia, in tre secondi?',
      'Che emozione ti suscita questa idea?',
      'Cosa ti entusiasma e cosa ti mette a disagio?',
      'Se dovessi decidere solo con l\'istinto, cosa faresti?',
      'Che sensazione avranno le persone coinvolte?'
    ]
  },
  black: {
    name: 'Cappello Nero', short: 'Nero', role: 'Rischi e prudenza', color: '#8b95ab',
    tagline: 'Il critico costruttivo',
    desc: 'Il cappello nero è il giudizio prudente: cerca difetti, rischi e ostacoli. È il più utile e il più abusato — potentissimo quando ha il suo turno, tossico quando invade quello degli altri.',
    avoid: 'Usarlo tutto il tempo, o trasformarlo in attacchi alle persone invece che alle idee.',
    questions: [
      'Cosa può andare storto, realisticamente?',
      'Quali sono i rischi che stiamo sottovalutando?',
      'Perché questa soluzione potrebbe non funzionare?',
      'Quali vincoli, costi o regole ci ostacolano?',
      'Chi potrebbe opporsi, e con quali ragioni valide?'
    ]
  },
  yellow: {
    name: 'Cappello Giallo', short: 'Giallo', role: 'Benefici e valore', color: '#f4bb3f',
    tagline: 'Ottimismo motivato',
    desc: 'Il cappello giallo cerca il valore: vantaggi, opportunità, scenari in cui le cose funzionano. Non è entusiasmo cieco, ogni beneficio va argomentato.',
    avoid: 'Facile entusiasmo senza motivazione, e il "sì, però..." che è nero travestito.',
    questions: [
      'Quali benefici concreti porta questa strada?',
      'Nel migliore dei casi, cosa otteniamo?',
      'Perché questa idea potrebbe funzionare bene?',
      'Che opportunità si aprono se andiamo avanti?',
      'Qual è il valore che oggi nessun altro sta cogliendo?'
    ]
  },
  green: {
    name: 'Cappello Verde', short: 'Verde', role: 'Creatività e alternative', color: '#3fb950',
    tagline: 'Idee nuove, anche assurde',
    desc: 'Il cappello verde è l\'energia creativa: alternative, provocazioni, soluzioni laterali. Qui la quantità conta più della qualità e l\'idea impossibile è benvenuta perché ne apre una possibile.',
    avoid: 'Valutare le idee mentre nascono. Il giudizio arriva dopo, con altri cappelli.',
    questions: [
      'Quali alternative non abbiamo ancora considerato?',
      'E se facessimo l\'esatto contrario?',
      'Come risolverebbe il problema un bambino? E un hacker?',
      'Cosa faremmo se avessimo il triplo delle risorse? E se ne avessimo zero?',
      'Come possiamo superare l\'ostacolo emerso col cappello nero?'
    ]
  },
  blue: {
    name: 'Cappello Blu', short: 'Blu', role: 'Processo e regia', color: '#58a6ff',
    tagline: 'Il direttore d\'orchestra',
    desc: 'Il cappello blu governa il pensiero stesso: definisce l\'obiettivo, decide l\'ordine dei cappelli, richiama il gruppo alla regola e alla fine tira le somme.',
    avoid: 'Entrare nel merito del problema. Il blu guarda il processo, non il contenuto.',
    questions: [
      'Qual è esattamente la domanda a cui vogliamo rispondere?',
      'Che risultato ci serve alla fine di questa sessione?',
      'Cosa è emerso finora, in una frase?',
      'Qual è la decisione o il prossimo passo concreto?',
      'Chi fa cosa, entro quando?'
    ]
  }
};

const HAT_ORDER = ['white', 'red', 'black', 'yellow', 'green', 'blue'];

const SEQUENCE = [
  { key: 'blue',   hat: 'blue',   kicker: 'Tappa 1 · Apertura',  title: 'Definisci l\'obiettivo' },
  { key: 'white',  hat: 'white',  kicker: 'Tappa 2 · Fatti',     title: 'Cosa sappiamo davvero' },
  { key: 'green',  hat: 'green',  kicker: 'Tappa 3 · Idee',      title: 'Genera alternative' },
  { key: 'yellow', hat: 'yellow', kicker: 'Tappa 4 · Valore',    title: 'Cerca i benefici' },
  { key: 'black',  hat: 'black',  kicker: 'Tappa 5 · Rischi',    title: 'Metti alla prova' },
  { key: 'red',    hat: 'red',    kicker: 'Tappa 6 · Istinto',   title: 'Ascolta la pancia' },
  { key: 'blue2',  hat: 'blue',   kicker: 'Tappa 7 · Sintesi',   title: 'Tira le somme' }
];

const FREE_STEPS = HAT_ORDER.map((h, i) => ({
  key: h, hat: h, kicker: 'Cappello ' + (i + 1) + ' di 6', title: null
}));

/* ------------------------------------------------------------- storage */

const LS = { sessions: 'sc.sessions.v1', theme: 'sc.theme', current: 'sc.current' };

const store = {
  read(k, fb) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : fb; } catch { return fb; } },
  write(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} },
  del(k) { try { localStorage.removeItem(k); } catch {} }
};

let sessions = store.read(LS.sessions, []);
let session = null;          // sessione attiva
let stepIndex = 0;
let promptIndex = 0;

/* ---------------------------------------------------------------- utils */

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const uid = () => Math.random().toString(36).slice(2, 10);
const esc = s => String(s).replace(/[&<>"']/g, c =>
  ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

const fmtDate = ts => new Date(ts).toLocaleDateString('it-IT',
  { day: 'numeric', month: 'long', year: 'numeric' });
const fmtDateTime = ts => new Date(ts).toLocaleString('it-IT',
  { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit' });

const buzz = ms => { try { navigator.vibrate && navigator.vibrate(ms); } catch {} };

let toastT;
function toast(msg) {
  const el = $('#toast');
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(toastT);
  toastT = setTimeout(() => el.classList.remove('show'), 2200);
}

function steps() { return session && session.mode === 'free' ? FREE_STEPS : SEQUENCE; }
function currentStep() { return steps()[stepIndex]; }
function noteCount(s) {
  return Object.values(s.notes || {}).reduce((n, arr) => n + arr.length, 0);
}

function setAccent(color) {
  document.documentElement.style.setProperty('--hat', color);
  document.documentElement.style.setProperty('--hat-soft',
    'color-mix(in srgb, ' + color + ' 18%, transparent)');
  const meta = $('meta[name="theme-color"]');
  if (meta) meta.content = getComputedStyle(document.body).backgroundColor;
}

/* ------------------------------------------------------------ navigazione */

function show(view) {
  $$('.view').forEach(v => v.classList.toggle('is-active', v.id === 'view-' + view));
  window.scrollTo({ top: 0, behavior: 'auto' });
}

function goHome() {
  stopTimer();
  setAccent('#7c8cf8');
  renderRecent();
  show('home');
}

/* ------------------------------------------------------------------ home */

function renderHatGrid() {
  $('#hat-grid').innerHTML = HAT_ORDER.map(id => {
    const h = HATS[id];
    return '<button class="hat-card" data-hat="' + id + '" style="--c:' + h.color + '">' +
      '<svg class="hat-ico" viewBox="0 0 48 32" aria-hidden="true">' +
        '<ellipse cx="24" cy="24" rx="22" ry="6.5" class="brim"/>' +
        '<path d="M9 24c0-9 4-19 15-19s15 10 15 19c-3.2 2.6-9 4-15 4s-11.8-1.4-15-4Z" class="crown"/>' +
      '</svg>' +
      '<h3>' + esc(h.short) + '</h3>' +
      '<p>' + esc(h.role) + '</p>' +
    '</button>';
  }).join('');
}

function sessionRow(s) {
  const dots = (s.mode === 'free' ? FREE_STEPS : SEQUENCE).map(st =>
    '<i class="' + ((s.notes[st.key] || []).length ? 'on' : '') +
    '" style="--c:' + HATS[st.hat].color + '"></i>').join('');
  const n = noteCount(s);
  return '<div class="recent-item" data-open="' + s.id + '" role="button" tabindex="0">' +
    '<span class="recent-dots">' + dots + '</span>' +
    '<span class="recent-main"><strong>' + esc(s.topic || 'Senza titolo') + '</strong>' +
    '<span>' + fmtDateTime(s.updatedAt) + ' · ' + n + (n === 1 ? ' nota' : ' note') + '</span></span>' +
    '<button class="recent-del" data-del="' + s.id + '" aria-label="Elimina sessione">' +
      '<svg viewBox="0 0 24 24"><path d="M4 7h16M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2m-9 0 1 13h10l1-13"/></svg>' +
    '</button></div>';
}

function renderRecent() {
  const wrap = $('#recent-wrap');
  const recent = sessions.slice(0, 3);
  wrap.hidden = recent.length === 0;
  $('#recent-list').innerHTML = recent.map(sessionRow).join('');
  const saved = store.read(LS.current, null);
  $('#resume-line').hidden = !(saved && sessions.some(s => s.id === saved));
}

function renderArchive() {
  $('#archive-list').innerHTML = sessions.length
    ? sessions.map(sessionRow).join('')
    : '<p class="empty-state">Nessuna sessione salvata.<br>Le sessioni compaiono qui appena aggiungi la prima nota.</p>';
  show('archive');
}

/* ----------------------------------------------------------- ciclo sessione */

function startSession() {
  const topic = $('#topic').value.trim();
  const mode = $('.seg.is-on').dataset.mode;
  const minutes = Number($('.chip.is-on').dataset.min);
  session = {
    id: uid(), topic, mode, minutes,
    createdAt: Date.now(), updatedAt: Date.now(), notes: {}
  };
  stepIndex = 0;
  openStep(0, true);
  show('session');
}

function openSession(id) {
  const s = sessions.find(x => x.id === id);
  if (!s) return;
  session = s;
  stepIndex = 0;
  openStep(0, true);
  show('session');
}

function persist() {
  if (!session) return;
  session.updatedAt = Date.now();
  if (noteCount(session) === 0 && !sessions.some(s => s.id === session.id)) return;
  const i = sessions.findIndex(s => s.id === session.id);
  if (i >= 0) sessions[i] = session; else sessions.unshift(session);
  sessions.sort((a, b) => b.updatedAt - a.updatedAt);
  sessions = sessions.slice(0, 40);
  store.write(LS.sessions, sessions);
  store.write(LS.current, session.id);
}

function openStep(i, autostart) {
  stepIndex = Math.max(0, Math.min(steps().length - 1, i));
  const step = currentStep();
  const hat = HATS[step.hat];

  setAccent(hat.color);
  $('#session-topic').textContent = session.topic || 'Sessione senza titolo';
  $('#stage-kicker').textContent = step.kicker;
  $('#stage-name').textContent = hat.name;
  $('#stage-role').textContent = step.title || hat.tagline;
  $('#note-input').placeholder = 'Nota col cappello ' + hat.short.toLowerCase() + '…';

  promptIndex = step.key === 'blue2' ? 2 : 0;
  renderPrompt();
  renderRail();
  renderNotes();
  setupTimer(autostart);

  const last = stepIndex === steps().length - 1;
  $('#btn-next').innerHTML = last
    ? 'Vedi la sintesi <svg viewBox="0 0 24 24"><path d="M5 12h14m-6-7 7 7-7 7"/></svg>'
    : 'Avanti <svg viewBox="0 0 24 24"><path d="M5 12h14m-6-7 7 7-7 7"/></svg>';
  $('#btn-prev').disabled = stepIndex === 0;
  $('#btn-prev').style.opacity = stepIndex === 0 ? .4 : 1;
}

function renderRail() {
  $('#steps-rail').innerHTML = steps().map((st, i) => {
    const cls = i === stepIndex ? 'now' : ((session.notes[st.key] || []).length ? 'done' : '');
    return '<button class="rail-step ' + cls + '" data-step="' + i + '" style="--c:' +
      HATS[st.hat].color + '" aria-label="' + esc(HATS[st.hat].name) + '"><i></i></button>';
  }).join('');
}

function renderPrompt() {
  const qs = HATS[currentStep().hat].questions;
  $('#prompt-text').textContent = qs[promptIndex % qs.length];
}

function renderNotes() {
  const list = session.notes[currentStep().key] || [];
  $('#notes').innerHTML = list.map(n =>
    '<li class="note"><p>' + esc(n.text) + '</p>' +
    '<button data-note="' + n.id + '" aria-label="Elimina nota">' +
      '<svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6 6 18"/></svg>' +
    '</button></li>').join('');
  $('#notes-empty').hidden = list.length > 0;
}

function addNote(text) {
  text = text.trim();
  if (!text) return;
  const key = currentStep().key;
  (session.notes[key] = session.notes[key] || []).push({ id: uid(), text });
  persist();
  renderNotes();
  renderRail();
  buzz(12);
}

function removeNote(id) {
  const key = currentStep().key;
  session.notes[key] = (session.notes[key] || []).filter(n => n.id !== id);
  persist();
  renderNotes();
  renderRail();
}

/* ----------------------------------------------------------------- timer */

/* Il conto alla rovescia si basa su una scadenza assoluta, non sul numero di tick:
   in background il browser rallenta setInterval e un timer a decremento perderebbe secondi. */
let tInt = null, tLeft = 0, tRunning = false, tDeadline = 0, tFired = false;

function setupTimer(autostart) {
  stopTimer();
  const box = $('#timer');
  box.hidden = !session.minutes;
  box.classList.remove('is-over');
  if (!session.minutes) return;
  tLeft = session.minutes * 60;
  tFired = false;
  paintTimer();
  if (autostart) startTimer(); else $('#btn-timer-toggle').textContent = 'Avvia';
}

function paintTimer() {
  const total = session.minutes * 60;
  const m = Math.floor(Math.abs(tLeft) / 60), s = Math.abs(tLeft) % 60;
  $('#timer-clock').textContent = (tLeft < 0 ? '+' : '') +
    String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0');
  const ratio = Math.max(0, Math.min(1, tLeft / total));
  $('#timer-fill').style.transform = 'scaleX(' + ratio + ')';
  $('#timer').classList.toggle('is-over', tLeft <= 0);
}

function tick() {
  tLeft = Math.round((tDeadline - Date.now()) / 1000);
  if (!tFired && tLeft <= 0) {
    tFired = true;
    chime(); buzz([90, 60, 90]);
    toast('Tempo scaduto per questo cappello');
  }
  paintTimer();
}

function startTimer() {
  if (tRunning || !session.minutes) return;
  tRunning = true;
  tDeadline = Date.now() + tLeft * 1000;
  $('#btn-timer-toggle').textContent = 'Pausa';
  clearInterval(tInt);
  tInt = setInterval(tick, 250);
  paintTimer();
}

function stopTimer() {
  if (tRunning) tLeft = Math.round((tDeadline - Date.now()) / 1000);
  tRunning = false;
  clearInterval(tInt);
  tInt = null;
  const b = $('#btn-timer-toggle');
  if (b) b.textContent = 'Riprendi';
}

function chime() {
  try {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return;
    const ctx = new Ctx();
    [880, 1320].forEach((f, i) => {
      const o = ctx.createOscillator(), g = ctx.createGain();
      o.type = 'sine'; o.frequency.value = f;
      g.gain.setValueAtTime(0.0001, ctx.currentTime + i * 0.18);
      g.gain.exponentialRampToValueAtTime(0.25, ctx.currentTime + i * 0.18 + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + i * 0.18 + 0.35);
      o.connect(g); g.connect(ctx.destination);
      o.start(ctx.currentTime + i * 0.18);
      o.stop(ctx.currentTime + i * 0.18 + 0.4);
    });
    setTimeout(() => ctx.close(), 1200);
  } catch {}
}

/* ---------------------------------------------------------------- sintesi */

function renderSummary() {
  stopTimer();
  setAccent('#7c8cf8');
  $('#sum-date').textContent = fmtDate(session.createdAt);
  $('#sum-topic').textContent = session.topic || 'Sessione senza titolo';

  const n = noteCount(session);
  const used = steps().filter(st => (session.notes[st.key] || []).length).length;
  $('#sum-stats').innerHTML =
    '<span>' + n + (n === 1 ? ' nota' : ' note') + '</span>' +
    '<span>' + used + ' cappelli su ' + steps().length + '</span>' +
    '<span>' + (session.mode === 'free' ? 'Modalità libera' : 'Sequenza guidata') + '</span>';

  $('#summary-body').innerHTML = steps().map(st => {
    const hat = HATS[st.hat];
    const list = session.notes[st.key] || [];
    return '<section class="sum-block" style="--c:' + hat.color + '">' +
      '<h3>' + esc(hat.name) + '</h3>' +
      '<p class="sum-role">' + esc(st.title || hat.role) + '</p>' +
      (list.length
        ? '<ul>' + list.map(x => '<li>' + esc(x.text) + '</li>').join('') + '</ul>'
        : '<p class="none">Nessuna nota per questo cappello.</p>') +
    '</section>';
  }).join('');

  show('summary');
}

function toMarkdown() {
  let md = '# Sei Cappelli per Pensare\n\n';
  md += '**Tema:** ' + (session.topic || 'Sessione senza titolo') + '\n\n';
  md += '**Data:** ' + fmtDate(session.createdAt) + '  \n';
  md += '**Modalità:** ' + (session.mode === 'free' ? 'libera' : 'sequenza guidata') + '\n\n---\n\n';
  steps().forEach(st => {
    const hat = HATS[st.hat], list = session.notes[st.key] || [];
    md += '## ' + hat.name + ' — ' + (st.title || hat.role) + '\n\n';
    md += list.length ? list.map(x => '- ' + x.text).join('\n') + '\n\n'
                      : '_Nessuna nota._\n\n';
  });
  md += '---\n_Tecnica dei Sei Cappelli per Pensare di Edward de Bono (1985)._\n';
  return md;
}

function slug() {
  return (session.topic || 'sessione').toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 48) || 'sessione';
}

async function copyMd() {
  const md = toMarkdown();
  try {
    await navigator.clipboard.writeText(md);
    toast('Sintesi copiata');
  } catch {
    const ta = document.createElement('textarea');
    ta.value = md; ta.style.position = 'fixed'; ta.style.opacity = '0';
    document.body.appendChild(ta); ta.select();
    try { document.execCommand('copy'); toast('Sintesi copiata'); }
    catch { toast('Copia non riuscita'); }
    ta.remove();
  }
}

function downloadMd() {
  const blob = new Blob([toMarkdown()], { type: 'text/markdown;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = 'sei-cappelli-' + slug() + '.md';
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/* ----------------------------------------------------------------- modale */

function openModal(id) {
  const h = HATS[id];
  const m = $('#modal');
  m.style.setProperty('--c', h.color);
  $('#modal-title').textContent = h.name;
  $('#modal-role').textContent = h.role + ' · ' + h.tagline;
  $('#modal-desc').textContent = h.desc;
  $('#modal-questions').innerHTML = h.questions.map(q => '<li>' + esc(q) + '</li>').join('');
  $('#modal-avoid').textContent = h.avoid;
  m.hidden = false;
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  $('#modal').hidden = true;
  document.body.style.overflow = '';
}

/* ------------------------------------------------------------------ tema */

function applyTheme(t) {
  document.documentElement.dataset.theme = t;
  store.write(LS.theme, t);
  const meta = $('meta[name="theme-color"]');
  if (meta) meta.content = t === 'light' ? '#f6f7fb' : '#0b0e14';
}

/* ----------------------------------------------------------------- eventi */

function bind() {
  // tema
  applyTheme(store.read(LS.theme, window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'));
  $('#btn-theme').addEventListener('click', () =>
    applyTheme(document.documentElement.dataset.theme === 'light' ? 'dark' : 'light'));

  // home: selettori
  $$('.seg').forEach(b => b.addEventListener('click', () => {
    $$('.seg').forEach(x => { x.classList.remove('is-on'); x.setAttribute('aria-checked', 'false'); });
    b.classList.add('is-on'); b.setAttribute('aria-checked', 'true');
  }));
  $$('.chip').forEach(b => b.addEventListener('click', () => {
    $$('.chip').forEach(x => { x.classList.remove('is-on'); x.setAttribute('aria-checked', 'false'); });
    b.classList.add('is-on'); b.setAttribute('aria-checked', 'true');
  }));

  $('#btn-start').addEventListener('click', startSession);
  $('#btn-resume').addEventListener('click', () => openSession(store.read(LS.current, null)));
  $('#btn-history').addEventListener('click', renderArchive);
  $$('[data-nav="home"]').forEach(b => b.addEventListener('click', e => { e.preventDefault(); goHome(); }));

  // griglia cappelli + liste sessioni (delegation)
  document.addEventListener('click', e => {
    const hatCard = e.target.closest('.hat-card');
    if (hatCard) return openModal(hatCard.dataset.hat);

    const del = e.target.closest('[data-del]');
    if (del) {
      e.stopPropagation();
      sessions = sessions.filter(s => s.id !== del.dataset.del);
      store.write(LS.sessions, sessions);
      if (store.read(LS.current, null) === del.dataset.del) store.del(LS.current);
      renderRecent();
      if ($('#view-archive').classList.contains('is-active')) renderArchive();
      toast('Sessione eliminata');
      return;
    }
    const open = e.target.closest('[data-open]');
    if (open) return openSession(open.dataset.open);

    if (e.target.closest('[data-close]')) return closeModal();
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !$('#modal').hidden) closeModal();
    const row = e.target.closest && e.target.closest('[data-open]');
    if (row && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); openSession(row.dataset.open); }
  });

  // sessione
  $('#steps-rail').addEventListener('click', e => {
    const b = e.target.closest('[data-step]');
    if (b) openStep(Number(b.dataset.step), false);
  });
  $('#btn-prompt-next').addEventListener('click', () => { promptIndex++; renderPrompt(); });
  $('#note-form').addEventListener('submit', e => {
    e.preventDefault();
    addNote($('#note-input').value);
    $('#note-input').value = '';
    $('#note-input').focus();
  });
  $('#notes').addEventListener('click', e => {
    const b = e.target.closest('[data-note]');
    if (b) removeNote(b.dataset.note);
  });
  $('#btn-prev').addEventListener('click', () => openStep(stepIndex - 1, false));
  $('#btn-next').addEventListener('click', () => {
    if (stepIndex === steps().length - 1) { persist(); renderSummary(); }
    else openStep(stepIndex + 1, true);
  });
  $('#btn-exit').addEventListener('click', () => { persist(); goHome(); });
  $('#btn-finish-top').addEventListener('click', () => { persist(); renderSummary(); });
  $('#btn-timer-toggle').addEventListener('click', () => tRunning ? stopTimer() : startTimer());
  $('#btn-timer-reset').addEventListener('click', () => setupTimer(false));

  // sintesi
  $('#btn-back-session').addEventListener('click', () => { openStep(stepIndex, false); show('session'); });
  $('#btn-copy').addEventListener('click', copyMd);
  $('#btn-download').addEventListener('click', downloadMd);
  $('#btn-print').addEventListener('click', () => window.print());
  $('#btn-new').addEventListener('click', () => { $('#topic').value = ''; goHome(); });

  if (navigator.share) {
    const b = $('#btn-share');
    b.hidden = false;
    b.addEventListener('click', async () => {
      try {
        await navigator.share({
          title: 'Sei Cappelli · ' + (session.topic || 'Sessione'),
          text: toMarkdown()
        });
      } catch {}
    });
  }

  window.addEventListener('beforeunload', () => { if (session) persist(); });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) { if (session) persist(); }
    else if (tRunning) tick();   // riallinea l'orologio al rientro dal background
  });
}

/* ------------------------------------------------------------------ avvio */

renderHatGrid();
renderRecent();
bind();
setAccent('#7c8cf8');

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(() => {}));
}

})();
