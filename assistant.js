/*
 * assistant.js — browser controller for Ask My AI (text) and Talk to Me (voice).
 *
 * Uses the pure retrieval core in retrieval.js. Renders ALL dynamic content with
 * textContent / safe DOM builders (never innerHTML with user or retrieved text),
 * so retrieved repository text and user input cannot inject markup or scripts.
 *
 * Voice uses the Web Speech API as progressive enhancement with a graceful text
 * fallback. Nothing autoplays. No credentials, no network calls, no third-party code.
 */

'use strict';

import * as core from './retrieval.js';

const KB_URL = 'data/knowledge.json';

// Privacy-preserving, in-memory observability. No network, no PII, resets on reload.
const metrics = {
  asks: 0, voiceSessions: 0, grounded: 0, ungrounded: 0, errors: 0,
  latencies: [], lastState: 'idle',
  note: 'In-memory only. No analytics or network beacons.'
};
function record(ev, val) {
  if (ev === 'ask') metrics.asks++;
  else if (ev === 'grounded') metrics.grounded++;
  else if (ev === 'ungrounded') metrics.ungrounded++;
  else if (ev === 'voice') metrics.voiceSessions++;
  else if (ev === 'error') metrics.errors++;
  else if (ev === 'latency') { metrics.latencies.push(val); if (metrics.latencies.length > 50) metrics.latencies.shift(); }
  else if (ev === 'state') metrics.lastState = val;
}

let KB = null;
let INDEX = null;
let loadError = null;

async function loadKB() {
  if (KB) return KB;
  const res = await fetch(KB_URL, { cache: 'no-store' });
  if (!res.ok) throw new Error('knowledge base unavailable (' + res.status + ')');
  KB = await res.json();
  INDEX = core.buildIndex(KB);
  return KB;
}

/* ------------------------------- DOM helpers ------------------------------ */
function el(tag, opts, children) {
  const node = document.createElement(tag);
  if (opts) {
    if (opts.class) node.className = opts.class;
    if (opts.text != null) node.textContent = opts.text; // safe
    if (opts.attrs) Object.entries(opts.attrs).forEach(([k, v]) => node.setAttribute(k, v));
  }
  (children || []).forEach((c) => c && node.appendChild(c));
  return node;
}
function clear(node) { while (node.firstChild) node.removeChild(node.firstChild); }

function evidenceList(evidence, projectId) {
  const wrap = el('div', { class: 'msg-evidence' });
  wrap.appendChild(el('span', { class: 'evidence-label', text: 'Evidence' }));
  const ul = el('ul');
  (evidence || []).slice(0, 4).forEach((s) => {
    const li = el('li');
    const a = el('a', { text: s.label, attrs: { href: s.url, target: '_blank', rel: 'noopener noreferrer' } });
    li.appendChild(a);
    ul.appendChild(li);
  });
  if (projectId) {
    const li = el('li');
    const a = el('a', { class: 'prove-it', text: 'Prove it — open project detail', attrs: { href: '#project-' + projectId, 'data-project': projectId } });
    li.appendChild(a);
    ul.appendChild(li);
  }
  if (!ul.childElementCount) return null;
  wrap.appendChild(ul);
  return wrap;
}

/* ------------------------------ Answer builder ---------------------------- */
function answerFor(query) {
  const t0 = (typeof performance !== 'undefined' ? performance.now() : Date.now());
  const r = core.retrieve(INDEX, KB, query, { limit: 3, threshold: 0.35 });
  const dt = (typeof performance !== 'undefined' ? performance.now() : Date.now()) - t0;
  record('latency', dt); record('ask');
  if (!r.grounded || !r.top) {
    record('ungrounded');
    return {
      grounded: false,
      text: "I can't verify that from the available evidence. Try asking about my projects (MCP gateway, IAM guard, HF scanner), my approach to prompt injection or least privilege, or my experience and publications.",
      evidence: [], projectId: null, spoken: "I can't verify that from the available evidence. Try asking about my projects, my approach to prompt injection or least privilege, or my experience."
    };
  }
  record('grounded');
  const top = r.top;
  const text = top.answer || top.title;
  return { grounded: true, text, evidence: top.evidence, projectId: top.projectId, spoken: stripForSpeech(text) };
}

function stripForSpeech(s) {
  return String(s).replace(/[•·—–]/g, ', ').replace(/\s+/g, ' ').trim();
}

/* ------------------------------- Ask My AI -------------------------------- */
function initAsk() {
  const dialog = document.getElementById('ask-dialog');
  const openers = document.querySelectorAll('[data-open="ask"]');
  const form = document.getElementById('ask-form');
  const input = document.getElementById('ask-input');
  const log = document.getElementById('ask-log');
  const closeBtn = dialog ? dialog.querySelector('[data-close]') : null;
  const chips = document.querySelectorAll('#ask-suggestions [data-q]');
  if (!dialog || !form || !input || !log) return;

  let lastFocus = null;
  const open = () => {
    lastFocus = document.activeElement;
    if (typeof dialog.showModal === 'function') dialog.showModal();
    else dialog.setAttribute('open', '');
    setTimeout(() => input.focus(), 30);
    if (!log.childElementCount) systemLine("Ask about my projects, engineering decisions, evidence, experience, or skills. Every substantive answer links to its source.");
  };
  const close = () => {
    if (typeof dialog.close === 'function') dialog.close(); else dialog.removeAttribute('open');
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  };
  openers.forEach((b) => b.addEventListener('click', open));
  closeBtn && closeBtn.addEventListener('click', close);
  dialog.addEventListener('cancel', (e) => { e.preventDefault(); close(); });
  dialog.addEventListener('click', (e) => { if (e.target === dialog) close(); });

  function systemLine(txt) {
    const row = el('div', { class: 'msg msg-system' }, [el('p', { text: txt })]);
    log.appendChild(row); log.scrollTop = log.scrollHeight;
  }
  function userLine(txt) {
    const row = el('div', { class: 'msg msg-user' }, [el('p', { text: txt })]);
    log.appendChild(row); log.scrollTop = log.scrollHeight;
  }
  function botLine(ans) {
    const row = el('div', { class: 'msg msg-bot' + (ans.grounded ? '' : ' msg-unverified') });
    row.appendChild(el('p', { text: ans.text }));
    const ev = evidenceList(ans.evidence, ans.projectId);
    if (ev) row.appendChild(ev);
    log.appendChild(row); log.scrollTop = log.scrollHeight;
    wireProveIt(row, close);
  }

  function ask(q) {
    const query = core.sanitizeQuery(q);
    if (!query) return;
    userLine(query);
    if (!KB) {
      botLine({ grounded: false, text: loadError ? 'The knowledge base could not load, so I can only offer the static content on this page. Please try reloading.' : 'Loading the knowledge base…', evidence: [], projectId: null });
      return;
    }
    try { botLine(answerFor(query)); }
    catch (err) { record('error'); botLine({ grounded: false, text: 'Something went wrong answering that. The page content and project links below still work.', evidence: [], projectId: null }); }
  }

  form.addEventListener('submit', (e) => { e.preventDefault(); const v = input.value; input.value = ''; ask(v); });
  chips.forEach((c) => c.addEventListener('click', () => { open(); ask(c.getAttribute('data-q')); }));
}

function wireProveIt(scope, closeFn) {
  scope.querySelectorAll('[data-project]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('data-project');
      const target = document.getElementById('project-' + id);
      if (target) {
        e.preventDefault();
        if (closeFn) closeFn();
        if (typeof target.open === 'boolean') target.open = true;
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        target.classList.add('flash');
        setTimeout(() => target.classList.remove('flash'), 1600);
      }
    });
  });
}

/* ------------------------------- Talk to Me ------------------------------- */
function initVoice() {
  const dialog = document.getElementById('voice-dialog');
  const openers = document.querySelectorAll('[data-open="voice"]');
  if (!dialog) return;
  const closeBtn = dialog.querySelector('[data-close]');
  const micBtn = document.getElementById('voice-mic');
  const stateEl = document.getElementById('voice-state');
  const transcriptEl = document.getElementById('voice-transcript');
  const captionEl = document.getElementById('voice-caption');
  const muteBtn = document.getElementById('voice-mute');
  const retryBtn = document.getElementById('voice-retry');
  const fallbackNote = document.getElementById('voice-fallback');

  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  const synth = window.speechSynthesis;
  const voiceSupported = !!SR && !!synth;
  let recog = null, listening = false, muted = false, lastQuery = '', lastFocus = null;

  function setState(s, label) {
    record('state', s);
    dialog.setAttribute('data-state', s);
    if (stateEl) stateEl.textContent = label;
  }

  const open = () => {
    lastFocus = document.activeElement;
    if (typeof dialog.showModal === 'function') dialog.showModal(); else dialog.setAttribute('open', '');
    record('voice');
    if (!voiceSupported) {
      setState('unsupported', 'Voice is not supported in this browser.');
      if (fallbackNote) fallbackNote.hidden = false;
      if (micBtn) micBtn.disabled = true;
    } else {
      setState('idle', 'Tap the microphone and ask a question.');
    }
    setTimeout(() => (micBtn && !micBtn.disabled ? micBtn : closeBtn) && (micBtn && !micBtn.disabled ? micBtn : closeBtn).focus(), 30);
  };
  const close = () => {
    stopListening(); if (synth) synth.cancel();
    if (typeof dialog.close === 'function') dialog.close(); else dialog.removeAttribute('open');
    setState('idle', '');
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  };
  openers.forEach((b) => b.addEventListener('click', open));
  closeBtn && closeBtn.addEventListener('click', close);
  dialog.addEventListener('cancel', (e) => { e.preventDefault(); close(); });
  dialog.addEventListener('click', (e) => { if (e.target === dialog) close(); });

  function speak(text) {
    if (!synth || muted) { setState('idle', 'Muted. Read the answer below.'); return; }
    synth.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.rate = 1.02; u.pitch = 1.0;
    u.onstart = () => setState('speaking', 'Speaking…');
    u.onend = () => setState('idle', 'Ask another question, or tap the mic again.');
    u.onerror = () => setState('idle', 'Could not play audio. The answer is shown below.');
    synth.speak(u);
  }

  function answerQuery(q) {
    lastQuery = q;
    if (transcriptEl) transcriptEl.textContent = 'You: ' + q;
    setState('thinking', 'Thinking…');
    // Interruptible: cancel any current speech before answering.
    if (synth) synth.cancel();
    setTimeout(() => {
      let ans;
      try { ans = KB ? answerFor(q) : { text: 'The knowledge base is still loading. Please try again in a moment.', spoken: 'The knowledge base is still loading. Please try again in a moment.', grounded: false, evidence: [], projectId: null }; }
      catch (e) { record('error'); ans = { text: 'Something went wrong. Please try again.', spoken: 'Something went wrong. Please try again.', grounded: false, evidence: [], projectId: null }; }
      renderCaption(ans);
      speak(ans.spoken || ans.text);
    }, 60);
  }

  function renderCaption(ans) {
    if (!captionEl) return;
    clear(captionEl);
    captionEl.appendChild(el('p', { text: ans.text }));
    const ev = evidenceList(ans.evidence, ans.projectId);
    if (ev) captionEl.appendChild(ev);
    wireProveIt(captionEl, close);
  }

  function startListening() {
    if (!voiceSupported || listening) return;
    recog = new SR();
    recog.lang = 'en-US'; recog.interimResults = true; recog.maxAlternatives = 1; recog.continuous = false;
    let finalText = '';
    recog.onstart = () => { listening = true; setState('listening', 'Listening… ask your question.'); };
    recog.onresult = (e) => {
      let interim = '';
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const tr = e.results[i][0].transcript;
        if (e.results[i].isFinal) finalText += tr; else interim += tr;
      }
      if (transcriptEl) transcriptEl.textContent = 'You: ' + (finalText || interim);
    };
    recog.onerror = (e) => {
      listening = false;
      if (e.error === 'not-allowed' || e.error === 'service-not-allowed') {
        setState('denied', 'Microphone permission denied. Use Ask My AI to type instead.');
        if (fallbackNote) fallbackNote.hidden = false;
      } else if (e.error === 'no-speech') {
        setState('idle', "I didn't catch that. Tap the mic and try again.");
      } else {
        setState('idle', 'Voice error. You can retry or type your question.');
      }
    };
    recog.onend = () => {
      listening = false;
      const q = core.sanitizeQuery(finalText);
      if (q) answerQuery(q);
      else if (dialog.getAttribute('data-state') === 'listening') setState('idle', 'Tap the mic to try again.');
    };
    try { recog.start(); } catch (_) { setState('idle', 'Could not start listening. Try again.'); }
  }
  function stopListening() { if (recog && listening) { try { recog.stop(); } catch (_) {} } listening = false; }

  micBtn && micBtn.addEventListener('click', () => {
    if (listening) { stopListening(); setState('thinking', 'Processing…'); }
    else { if (synth) synth.cancel(); startListening(); }
  });
  muteBtn && muteBtn.addEventListener('click', () => {
    muted = !muted;
    muteBtn.setAttribute('aria-pressed', String(muted));
    muteBtn.textContent = muted ? 'Unmute' : 'Mute';
    if (muted && synth) synth.cancel();
  });
  retryBtn && retryBtn.addEventListener('click', () => { if (lastQuery) answerQuery(lastQuery); else startListening(); });
}

/* --------------------------------- Boot ---------------------------------- */
function showLoadState(state) {
  document.querySelectorAll('[data-assistant-status]').forEach((n) => {
    n.setAttribute('data-assistant-status', state);
  });
}

async function boot() {
  initAsk();
  initVoice();
  try {
    await loadKB();
    showLoadState('ready');
    document.dispatchEvent(new CustomEvent('kb:ready', { detail: { kb: KB } }));
  } catch (err) {
    loadError = err;
    showLoadState('error');
    record('error');
    document.dispatchEvent(new CustomEvent('kb:error', { detail: { message: String(err && err.message || err) } }));
  }
  // Expose a privacy-safe debug hook (no network, no PII).
  window.__assistantMetrics = () => JSON.parse(JSON.stringify({
    ...metrics,
    avgLatencyMs: metrics.latencies.length ? Math.round(metrics.latencies.reduce((a, b) => a + b, 0) / metrics.latencies.length) : 0
  }));
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
else boot();

export { boot, answerFor, loadKB };
