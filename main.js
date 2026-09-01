/*
 * main.js — progressive enhancement: navigation, reveal-on-scroll, audience modes,
 * and rendering of the Engineering Atlas, project explorer, resume, philosophy,
 * and skills from the single source of truth (data/knowledge.json).
 *
 * All dynamic content is inserted via textContent / safe DOM builders. No innerHTML
 * with data, no network beyond the local knowledge file, no third-party code.
 */

'use strict';

(() => {
  const root = document.documentElement;
  root.classList.remove('no-js');
  root.classList.add('js');

  /* ------------------------------ Navigation ----------------------------- */
  const header = document.querySelector('[data-header]');
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#primary-nav');
  const setMenu = (open) => {
    header && header.classList.toggle('nav-open', open);
    document.body.classList.toggle('menu-open', open);
    menuButton && menuButton.setAttribute('aria-expanded', String(open));
  };
  menuButton && menuButton.addEventListener('click', () => {
    setMenu(menuButton.getAttribute('aria-expanded') !== 'true');
  });
  nav && nav.addEventListener('click', (e) => { if (e.target instanceof HTMLAnchorElement) setMenu(false); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });

  /* --------------------------- DOM helpers ------------------------------- */
  function el(tag, opts, kids) {
    const n = document.createElement(tag);
    if (opts) { if (opts.class) n.className = opts.class; if (opts.text != null) n.textContent = opts.text;
      if (opts.attrs) Object.entries(opts.attrs).forEach(([k, v]) => n.setAttribute(k, v)); }
    (kids || []).forEach((k) => k && n.appendChild(k));
    return n;
  }
  const roleLabel = (r) => ({ built: 'Built', contributed: 'Contributed', researched: 'Research',
    studied: 'Studied', exploring: 'Exploring' })[r] || r;
  const sourceById = (kb, id) => kb.sources.find((s) => s.id === id) || null;

  /* --------------------------- Audience modes ---------------------------- */
  function initAudienceModes(kb) {
    const buttons = document.querySelectorAll('[data-mode]');
    if (!buttons.length) return;
    const apply = (mode) => {
      const cfg = kb.audience_modes[mode] || kb.audience_modes.explore;
      document.body.setAttribute('data-audience', mode);
      buttons.forEach((b) => {
        const on = b.getAttribute('data-mode') === mode;
        b.setAttribute('aria-pressed', String(on));
      });
      const note = document.getElementById('mode-emphasis');
      if (note) note.textContent = cfg.emphasis === 'balanced'
        ? 'Balanced view of everything.'
        : 'Emphasis: ' + cfg.emphasis + '.';
      // Reorder main sections per the mode's ordering.
      const main = document.getElementById('main');
      const map = { hero: 'top', atlas: 'atlas', projects: 'work', demos: 'demos', philosophy: 'philosophy', resume: 'resume' };
      (cfg.order || []).forEach((key) => {
        const sec = document.getElementById(map[key]);
        if (sec && main) main.appendChild(sec);
      });
      // Contact always last.
      const contact = document.getElementById('contact');
      if (contact && main) main.appendChild(contact);
      try { localStorage.setItem('audience', mode); } catch (_) {}
    };
    buttons.forEach((b) => b.addEventListener('click', () => apply(b.getAttribute('data-mode'))));
    let saved = 'explore';
    try { saved = localStorage.getItem('audience') || 'explore'; } catch (_) {}
    apply(saved);
  }

  /* --------------------------- Engineering Atlas -------------------------- */
  function renderAtlas(kb) {
    const mount = document.getElementById('atlas-map');
    if (!mount) return;
    clear(mount);
    // Trajectory rail
    const rail = el('ol', { class: 'atlas-rail', attrs: { 'aria-label': 'Engineering trajectory' } });
    kb.trajectory.forEach((stage) => {
      const li = el('li', { class: 'atlas-stage' });
      li.appendChild(el('span', { class: 'atlas-stagenum', text: String(stage.stage) }));
      li.appendChild(el('strong', { text: stage.label }));
      li.appendChild(el('p', { text: stage.detail }));
      const links = el('div', { class: 'atlas-stage-projects' });
      (stage.projects || []).forEach((pid) => {
        const p = kb.projects.find((x) => x.id === pid);
        if (p) links.appendChild(el('a', { class: 'atlas-chip', text: p.name, attrs: { href: '#project-' + p.id, 'data-jump': p.id } }));
      });
      li.appendChild(links);
      rail.appendChild(li);
    });
    mount.appendChild(rail);

    // Theme → project grid
    const themes = el('div', { class: 'atlas-themes' });
    kb.themes.forEach((t) => {
      const card = el('article', { class: 'atlas-theme' });
      card.appendChild(el('h3', { text: t.name }));
      card.appendChild(el('p', { text: t.blurb }));
      const tags = el('div', { class: 'atlas-theme-projects' });
      (t.projects || []).forEach((pid) => {
        const p = kb.projects.find((x) => x.id === pid);
        if (p) tags.appendChild(el('a', { class: 'atlas-chip', text: p.name, attrs: { href: '#project-' + p.id, 'data-jump': p.id } }));
      });
      card.appendChild(tags);
      themes.appendChild(card);
    });
    mount.appendChild(themes);

    mount.querySelectorAll('[data-jump]').forEach((a) => a.addEventListener('click', (e) => {
      const id = a.getAttribute('data-jump');
      const target = document.getElementById('project-' + id);
      if (target) { e.preventDefault(); if (typeof target.open === 'boolean') target.open = true;
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        target.classList.add('flash'); setTimeout(() => target.classList.remove('flash'), 1600); }
    }));
  }

  /* ------------------------- Project explorer ---------------------------- */
  function bulletList(title, items) {
    if (!items || !items.length) return null;
    const wrap = el('div', { class: 'disc-block' });
    wrap.appendChild(el('h5', { text: title }));
    const ul = el('ul');
    items.forEach((i) => ul.appendChild(el('li', { text: i })));
    wrap.appendChild(ul);
    return wrap;
  }

  function threatModelView(tm) {
    if (!tm || (!tm.threats || !tm.threats.length)) return null;
    const wrap = el('div', { class: 'disc-block threat-block' });
    wrap.appendChild(el('h5', { text: 'Threat model' }));
    const meta = el('div', { class: 'threat-meta' });
    const metaRow = (label, arr) => { if (arr && arr.length) { const d = el('div');
      d.appendChild(el('span', { class: 'tm-label', text: label })); d.appendChild(el('span', { text: arr.join(' · ') })); meta.appendChild(d); } };
    metaRow('Assets', tm.assets); metaRow('Actors', tm.actors); metaRow('Surfaces', tm.surfaces); metaRow('Trust boundaries', tm.boundaries);
    wrap.appendChild(meta);
    const table = el('table', { class: 'threat-table' });
    const thead = el('thead'); const htr = el('tr');
    ['Threat', 'Mitigation', 'Residual risk'].forEach((h) => htr.appendChild(el('th', { text: h })));
    thead.appendChild(htr); table.appendChild(thead);
    const tbody = el('tbody');
    tm.threats.forEach((t) => {
      const tr = el('tr');
      tr.appendChild(el('td', { text: t.t }));
      tr.appendChild(el('td', { text: t.mitigation }));
      tr.appendChild(el('td', { text: t.residual }));
      tbody.appendChild(tr);
    });
    table.appendChild(tbody); wrap.appendChild(table);
    return wrap;
  }

  function architectureView(arch) {
    if (!arch || (!arch.nodes || !arch.nodes.length)) return null;
    const wrap = el('div', { class: 'disc-block arch-block' });
    wrap.appendChild(el('h5', { text: 'Architecture & data flow' }));
    wrap.appendChild(el('p', { class: 'arch-summary', text: arch.summary }));
    const flow = el('div', { class: 'arch-flow', attrs: { role: 'img',
      'aria-label': 'Data flow: ' + arch.edges.map((e) => nodeLabel(arch, e.from) + ' ' + e.label + ' ' + nodeLabel(arch, e.to)).join('; ') } });
    arch.nodes.forEach((n, i) => {
      flow.appendChild(el('span', { class: 'arch-node kind-' + n.kind, text: n.label }));
      if (i < arch.nodes.length - 1) flow.appendChild(el('span', { class: 'arch-arrow', attrs: { 'aria-hidden': 'true' }, text: '→' }));
    });
    wrap.appendChild(flow);
    return wrap;
  }
  function nodeLabel(arch, id) { const n = arch.nodes.find((x) => x.id === id); return n ? n.label : id; }

  function mappingsView(m) {
    const all = [].concat(m.attack || [], m.atlas || [], m.nist || []);
    if (!all.length) return null;
    const wrap = el('div', { class: 'disc-block' });
    wrap.appendChild(el('h5', { text: 'Framework mappings' }));
    const tags = el('div', { class: 'mapping-tags' });
    all.forEach((x) => tags.appendChild(el('span', { class: 'mapping-tag', text: x })));
    wrap.appendChild(tags);
    return wrap;
  }

  function evidenceView(kb, project) {
    const wrap = el('div', { class: 'disc-block evidence-block' });
    wrap.appendChild(el('h5', { text: 'Source evidence' }));
    const ul = el('ul', { class: 'evidence-links' });
    const seen = new Set();
    (project.evidence || []).forEach((e) => {
      const s = sourceById(kb, e.sourceId);
      if (!s || seen.has(s.id)) return; seen.add(s.id);
      const li = el('li');
      li.appendChild(el('a', { text: s.label, attrs: { href: s.url, target: '_blank', rel: 'noopener noreferrer' } }));
      li.appendChild(el('span', { class: 'evidence-note', text: ' — ' + e.claim }));
      ul.appendChild(li);
    });
    const repoLi = el('li');
    repoLi.appendChild(el('a', { class: 'evidence-repo', text: 'Open repository on GitHub', attrs: { href: project.url, target: '_blank', rel: 'noopener noreferrer' } }));
    ul.appendChild(repoLi);
    wrap.appendChild(ul);
    return wrap;
  }

  function renderProjects(kb) {
    const mount = document.getElementById('projects-list');
    if (!mount) return;
    clear(mount);
    const order = { flagship: 0, supporting: 1, archived: 2 };
    const projects = kb.projects.slice().sort((a, b) => (order[a.prominence] - order[b.prominence]) || (b.stars - a.stars));
    let flagIndex = 0;
    projects.forEach((p) => {
      const details = el('details', { class: 'project prom-' + p.prominence, attrs: { id: 'project-' + p.id } });
      if (p.prominence === 'flagship') details.open = false;
      const summary = el('summary');
      const head = el('div', { class: 'project-head' });
      const idxLabel = p.prominence === 'flagship' ? String(++flagIndex).padStart(2, '0') : roleLabel(p.role);
      head.appendChild(el('span', { class: 'project-index', text: idxLabel }));
      const titleWrap = el('div', { class: 'project-titles' });
      titleWrap.appendChild(el('h3', { text: p.name }));
      titleWrap.appendChild(el('p', { class: 'project-tagline', text: p.tagline }));
      head.appendChild(titleWrap);
      const meta = el('div', { class: 'project-meta' });
      meta.appendChild(el('span', { class: 'chip chip-role', text: roleLabel(p.role) }));
      meta.appendChild(el('span', { class: 'chip', text: p.prominence }));
      if (p.stars) meta.appendChild(el('span', { class: 'chip chip-star', text: '★ ' + p.stars }));
      if (p.forks) meta.appendChild(el('span', { class: 'chip', text: '⑂ ' + p.forks }));
      head.appendChild(meta);
      summary.appendChild(head);
      summary.appendChild(el('span', { class: 'project-toggle', attrs: { 'aria-hidden': 'true' }, text: 'View detail' }));
      details.appendChild(summary);

      const body = el('div', { class: 'project-body' });
      body.appendChild(el('p', { class: 'project-problem', text: p.problem }));
      if (p.context) body.appendChild(el('p', { class: 'project-context', text: p.context }));

      [architectureView(p.architecture),
       threatModelView(p.threat_model),
       bulletList('Implementation', p.implementation),
       bulletList('Security controls', p.controls),
       bulletList('Testing', p.testing),
       bulletList('Results', p.results),
       bulletList('Tradeoffs', p.tradeoffs),
       bulletList('Limitations', p.limitations),
       bulletList('Lessons learned', p.lessons),
       mappingsView(p.mappings || {}),
       evidenceView(kb, p)
      ].forEach((blk) => blk && body.appendChild(blk));

      details.appendChild(body);
      mount.appendChild(details);
    });
  }

  /* ------------------------------- Demos --------------------------------- */
  function renderDemoMeta(kb) {
    kb.demos.forEach((d) => {
      const note = document.querySelector('[data-demo-safety="' + d.id + '"]');
      if (note) note.textContent = d.safety_note;
    });
  }

  /* ------------------------------ Resume --------------------------------- */
  function renderResume(kb) {
    const roles = document.getElementById('resume-roles');
    if (roles) { clear(roles);
      kb.resume.roles.forEach((r) => {
        const li = el('li', { class: 'timeline-item' });
        li.appendChild(el('h4', { text: r.title }));
        li.appendChild(el('p', { class: 'timeline-org', text: r.org }));
        li.appendChild(el('p', { text: r.summary }));
        roles.appendChild(li);
      });
    }
    const edu = document.getElementById('resume-education');
    if (edu) { clear(edu);
      kb.resume.education.forEach((e) => {
        const li = el('li');
        li.appendChild(el('h4', { text: e.credential }));
        if (e.note) li.appendChild(el('p', { text: e.note }));
        edu.appendChild(li);
      });
    }
    const pubs = document.getElementById('resume-publications');
    if (pubs) { clear(pubs);
      kb.resume.publications.forEach((p) => {
        const li = el('li');
        li.appendChild(el('a', { text: p.title, attrs: { href: p.url, target: '_blank', rel: 'noopener noreferrer' } }));
        li.appendChild(el('span', { class: 'pub-venue', text: ' — ' + p.venue + ', ' + p.year }));
        pubs.appendChild(li);
      });
    }
    // Professional ingestion (LinkedIn) placeholder — only shows verified items.
    const prof = document.getElementById('resume-professional');
    if (prof) { clear(prof);
      if (kb.professional_ingestion.status === 'supplied' && kb.professional_ingestion.items.length) {
        kb.professional_ingestion.items.forEach((it) => prof.appendChild(el('li', { text: typeof it === 'string' ? it : (it.text || '') })));
      } else {
        prof.appendChild(el('li', { class: 'ingestion-empty', text: 'Verified professional history (e.g., LinkedIn) will appear here when supplied. Nothing is assumed or invented.' }));
      }
    }
  }

  /* ----------------------------- Skills ---------------------------------- */
  function renderSkills(kb) {
    const mount = document.getElementById('skills-list');
    if (!mount) return; clear(mount);
    kb.skills.forEach((s) => {
      const li = el('li', { class: 'skill-item' });
      li.appendChild(el('span', { class: 'skill-name', text: s.name }));
      if (s.note) li.appendChild(el('span', { class: 'skill-note', text: s.note }));
      mount.appendChild(li);
    });
  }

  /* --------------------------- Philosophy -------------------------------- */
  function renderPhilosophy(kb) {
    const mount = document.getElementById('philosophy-list');
    if (!mount) return; clear(mount);
    kb.philosophy.forEach((ph, i) => {
      const art = el('article', { class: 'principle' });
      art.appendChild(el('span', { class: 'principle-num', text: String(i + 1).padStart(2, '0') }));
      art.appendChild(el('h3', { text: ph.principle }));
      art.appendChild(el('p', { text: ph.detail }));
      mount.appendChild(art);
    });
  }

  function clear(n) { while (n && n.firstChild) n.removeChild(n.firstChild); }

  /* --------------------------- Reveal on scroll -------------------------- */
  function initReveal() {
    const targets = document.querySelectorAll('.section-heading, .atlas-stage, .atlas-theme, .project, .demo-card, .principle, .about-grid article, .resume-col, .repro-links a, .contact');
    targets.forEach((t) => t.classList.add('reveal'));
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if ('IntersectionObserver' in window && !reduce) {
      const obs = new IntersectionObserver((entries) => {
        entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('is-visible'); obs.unobserve(e.target); } });
      }, { threshold: 0.08, rootMargin: '0px 0px -40px' });
      targets.forEach((t) => obs.observe(t));
    } else {
      targets.forEach((t) => t.classList.add('is-visible'));
    }
  }

  /* ------------------------------- Boot ---------------------------------- */
  function renderAll(kb) {
    renderAtlas(kb);
    renderProjects(kb);
    renderDemoMeta(kb);
    renderResume(kb);
    renderSkills(kb);
    renderPhilosophy(kb);
    initAudienceModes(kb);
    initReveal();
    const banner = document.getElementById('kb-status');
    if (banner) banner.hidden = true;
  }

  document.addEventListener('kb:ready', (e) => renderAll(e.detail.kb));
  document.addEventListener('kb:error', () => {
    const banner = document.getElementById('kb-status');
    if (banner) { banner.hidden = false; banner.textContent = 'Live knowledge failed to load — showing the static overview. Reload to try again. Project links below still work.'; }
    initReveal();
  });
})();
