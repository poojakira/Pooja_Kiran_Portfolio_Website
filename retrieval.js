/*
 * retrieval.js — deterministic, keyless, client-side retrieval core.
 *
 * Pure functions only (no DOM, no network). Imported by both the browser
 * assistant UI and the Node test suite. Treats all input as untrusted DATA:
 * queries and knowledge text are tokenized and scored, never executed or
 * interpreted as instructions. This is a grounded retrieval assistant, not an
 * instruction-following agent — there are no tools, no eval, no fetch here.
 */

'use strict';

const STOPWORDS = new Set([
  'the','a','an','and','or','of','to','in','on','for','is','are','was','were','be','been',
  'do','does','did','with','as','at','by','from','it','its','this','that','these','those',
  'i','you','me','my','your','his','her','their','our','we','they','he','she','what','which',
  'who','whom','how','why','when','where','can','could','would','should','will','shall','may',
  'about','into','over','than','then','there','here','have','has','had','not','no','yes','if',
  'so','tell','show','give','get','know','want','like','please','some','any','more','most'
]);

// Aliases boost matching of entities users may phrase differently.
const ALIASES = {
  'mcp': ['mcp-agent-security-gateway'],
  'gateway': ['mcp-agent-security-gateway'],
  'agent': ['mcp-agent-security-gateway','aws-agent-identity-guard'],
  'tool': ['mcp-agent-security-gateway'],
  'iam': ['aws-agent-identity-guard'],
  'aws': ['aws-agent-identity-guard'],
  'identity': ['aws-agent-identity-guard'],
  'privilege': ['aws-agent-identity-guard'],
  'policy': ['aws-agent-identity-guard'],
  'sarif': ['aws-agent-identity-guard'],
  'supply': ['hf-model-provenance-scanner'],
  'provenance': ['hf-model-provenance-scanner'],
  'huggingface': ['hf-model-provenance-scanner'],
  'hf': ['hf-model-provenance-scanner'],
  'pickle': ['hf-model-provenance-scanner'],
  'safetensors': ['hf-model-provenance-scanner'],
  'redteam': ['llm-redteam-framework'],
  'jailbreak': ['llm-redteam-framework'],
  'injection': ['llm-redteam-framework','mcp-agent-security-gateway'],
  'prompt': ['llm-redteam-framework','mcp-agent-security-gateway'],
  'privacy': ['model-privacy-attacks'],
  'membership': ['model-privacy-attacks'],
  'adversarial': ['adversarial-ml-lab'],
  'fgsm': ['adversarial-ml-lab'],
  'pgd': ['adversarial-ml-lab'],
  'poisoning': ['dataset-poisoning-detector'],
  'poison': ['dataset-poisoning-detector'],
  'dataset': ['dataset-poisoning-detector'],
  'pulsenet': ['PulseNet-RUL-Forecasting'],
  'attack': ['hf-model-provenance-scanner','llm-redteam-framework'],
  'mitre': ['hf-model-provenance-scanner','llm-redteam-framework']
};

const MAX_QUERY_LEN = 400;

/** Strip control characters, collapse whitespace, and cap length. Input is untrusted. */
function sanitizeQuery(raw) {
  if (typeof raw !== 'string') return '';
  // Remove control chars including common Unicode direction/format tricks used in injection.
  let s = raw.replace(/[\u0000-\u001F\u007F-\u009F\u200B-\u200F\u202A-\u202E\u2060-\u206F\uFEFF]/g, ' ');
  s = s.replace(/\s+/g, ' ').trim();
  if (s.length > MAX_QUERY_LEN) s = s.slice(0, MAX_QUERY_LEN);
  return s;
}

function tokenize(text) {
  return String(text)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .split(' ')
    .filter((t) => t && t.length > 1 && !STOPWORDS.has(t));
}

/** Build a searchable corpus from the knowledge base. Each doc carries evidence sourceIds. */
function buildIndex(kb) {
  const docs = [];
  const push = (id, type, title, text, evidence, extra) => {
    docs.push({ id, type, title, text, evidence: evidence || [], ...(extra || {}) });
  };

  // Identity
  push('identity', 'identity', 'About ' + kb.identity.name,
    [kb.identity.positioning, kb.identity.summary, kb.identity.headline_full, kb.identity.location].join(' '),
    kb.identity.provenance);

  // FAQ seeds (highest-signal answers)
  kb.faq.forEach((f, i) => {
    push('faq-' + i, 'faq', f.q, [f.q, f.a, (f.tags || []).join(' ')].join(' '), f.evidence, { answer: f.a });
  });

  // Projects — one rich doc per project
  kb.projects.forEach((p) => {
    const parts = [
      p.name, p.tagline, p.problem, p.context,
      (p.implementation || []).join(' '),
      (p.controls || []).join(' '),
      (p.limitations || []).join(' '),
      (p.results || []).join(' '),
      (p.lessons || []).join(' '),
      ...(p.threat_model && p.threat_model.threats ? p.threat_model.threats.map((t) => t.t + ' ' + t.mitigation) : [])
    ];
    const ev = (p.evidence || []).map((e) => e.sourceId);
    push('project-' + p.id, 'project', p.name, parts.join(' '), ev, { projectId: p.id });
  });

  // Philosophy
  kb.philosophy.forEach((ph) => {
    push('phil-' + ph.id, 'philosophy', ph.principle, ph.principle + ' ' + ph.detail, [], { answer: ph.principle + ' — ' + ph.detail });
  });

  // Skills
  kb.skills.forEach((s, i) => {
    push('skill-' + i, 'skill', s.name, s.name + ' ' + (s.note || ''), s.evidence, { answer: s.name + (s.note ? ': ' + s.note : '') });
  });

  // Resume
  (kb.resume.roles || []).forEach((r, i) => {
    push('role-' + i, 'resume', r.title, [r.title, r.org, r.summary].join(' '), r.evidence, { answer: `${r.title}, ${r.org}. ${r.summary}` });
  });
  (kb.resume.publications || []).forEach((pub, i) => {
    push('pub-' + i, 'resume', pub.title, [pub.title, pub.venue, String(pub.year)].join(' '), pub.evidence, { answer: `${pub.title} (${pub.venue}, ${pub.year}).` });
  });

  // Document frequency for IDF
  const df = new Map();
  docs.forEach((d) => {
    d.tokens = tokenize(d.text);
    const seen = new Set(d.tokens);
    seen.forEach((t) => df.set(t, (df.get(t) || 0) + 1));
  });
  const N = docs.length;
  return { docs, df, N };
}

/** Score a query against the index. Returns ranked results with attached evidence. */
function retrieve(index, kb, rawQuery, opts) {
  const options = opts || {};
  const limit = options.limit || 3;
  const query = sanitizeQuery(rawQuery);
  const qTokens = tokenize(query);
  if (qTokens.length === 0) return { query, results: [], top: null, grounded: false };

  const qCounts = new Map();
  qTokens.forEach((t) => qCounts.set(t, (qCounts.get(t) || 0) + 1));

  // Alias-driven project boosts
  const boostProjects = new Set();
  qTokens.forEach((t) => { (ALIASES[t] || []).forEach((pid) => boostProjects.add(pid)); });

  const scored = index.docs.map((d) => {
    const tf = new Map();
    d.tokens.forEach((t) => tf.set(t, (tf.get(t) || 0) + 1));
    let score = 0;
    qCounts.forEach((qc, t) => {
      const f = tf.get(t);
      if (!f) return;
      const idf = Math.log(1 + index.N / (1 + (index.df.get(t) || 0)));
      score += (1 + Math.log(f)) * idf * qc;
    });
    // Normalize by doc length to avoid long-doc bias
    if (d.tokens.length) score = score / Math.sqrt(d.tokens.length);
    // Type priors: FAQ answers are curated and high-signal
    if (d.type === 'faq') score *= 1.6;
    if (d.type === 'identity') score *= 1.15;
    // Entity/alias boost
    if (d.projectId && boostProjects.has(d.projectId)) score += 0.9;
    return { doc: d, score };
  });

  scored.sort((a, b) => b.score - a.score);
  const top = scored[0];
  const grounded = !!(top && top.score >= (options.threshold || 0.35));
  const results = scored.filter((s) => s.score > 0).slice(0, limit).map((s) => enrich(s, kb));
  return { query, results, top: grounded ? enrich(top, kb) : null, grounded };
}

function sourceById(kb, id) { return kb.sources.find((s) => s.id === id) || null; }

function enrich(scored, kb) {
  const d = scored.doc;
  const evidence = (d.evidence || []).map((sid) => sourceById(kb, sid)).filter(Boolean);
  let answer = d.answer || null;
  let project = null;
  if (d.projectId) {
    project = kb.projects.find((p) => p.id === d.projectId) || null;
    if (project && !answer) {
      answer = `${project.name} — ${project.tagline} (${roleLabel(project.role)}).`;
    }
  }
  return { id: d.id, type: d.type, title: d.title, answer, score: scored.score, evidence, projectId: d.projectId || null };
}

function roleLabel(role) {
  return ({ built: 'built by Pooja', contributed: 'contributed to', researched: 'research work',
    studied: 'studied', exploring: 'currently exploring' })[role] || role || '';
}

/* ---------------------------------------------------------------------------
 * Deterministic, local demo analyzers. All pure, no network, no execution.
 * ------------------------------------------------------------------------- */

/** MCP tool-call inspector: flags signals in a sample tools/call JSON string. */
function inspectMcpPayload(text) {
  const findings = [];
  const raw = String(text || '');
  const lower = raw.toLowerCase();
  let parsed = null;
  try { parsed = JSON.parse(raw); } catch (_) { /* inspect as text too */ }

  const add = (sev, code, msg) => findings.push({ severity: sev, code, message: msg });

  if (/ignore (?:all |the |previous |above |prior )*(?:instructions|prompts?)|disregard (?:the |all |previous |above |prior )*(?:instructions|prompts?|context)|system prompt|you are now|new instructions/i.test(raw))
    add('critical', 'INJ01', 'Prompt-injection phrasing (instruction override) in arguments');
  if (/[\u200b-\u200f\u202a-\u202e\u2060-\u206f]/.test(raw))
    add('high', 'INJ02', 'Invisible / bidirectional Unicode control characters present');
  if (/(?:[A-Za-z0-9+/]{40,}={0,2})/.test(raw))
    add('medium', 'ENC01', 'Long base64-like blob (possible encoded payload)');
  if (/\\x[0-9a-f]{2}|%[0-9a-f]{2}/i.test(raw))
    add('medium', 'ENC02', 'Hex/percent-encoded sequences detected');
  if (/\b(?:AKIA|ASIA)[A-Z0-9]{16}\b/.test(raw))
    add('critical', 'SEC01', 'Possible AWS access key ID pattern');
  if (/-----BEGIN [A-Z ]*PRIVATE KEY-----/.test(raw))
    add('critical', 'SEC02', 'Private key material present');
  if (/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/.test(raw))
    add('low', 'PII01', 'Email address (possible PII) present');
  if (/\b(?:\d[ -]?){13,16}\b/.test(raw))
    add('medium', 'PII02', 'Long digit sequence (possible card / account number)');
  if (/https?:\/\/(?!(localhost|127\.0\.0\.1))[^\s"']+/i.test(raw))
    add('medium', 'EGR01', 'Outbound URL to an external destination');
  if (/curl|wget|nc |netcat|exfil|upload|send to|http\.request/i.test(lower))
    add('high', 'EGR02', 'Exfiltration / outbound-transfer verbs detected');

  const order = { critical: 3, high: 2, medium: 1, low: 0 };
  const worst = findings.reduce((m, f) => Math.max(m, order[f.severity]), -1);
  const decision = worst >= 2 ? 'BLOCK' : (worst >= 0 ? 'REVIEW' : 'ALLOW');
  return { parsedOk: parsed !== null, findings, decision };
}

/** IAM policy analyzer: a deterministic subset of aws-agent-identity-guard rules. */
function analyzeIamPolicy(text) {
  const findings = [];
  let policy;
  try { policy = JSON.parse(text); } catch (e) {
    return { ok: false, error: 'Input is not valid JSON.', findings: [], decision: 'ERROR' };
  }
  const statements = Array.isArray(policy.Statement) ? policy.Statement
    : (policy.Statement ? [policy.Statement] : []);
  const asArr = (v) => (Array.isArray(v) ? v : (v == null ? [] : [v]));
  const add = (sev, code, msg, remediation) => findings.push({ severity: sev, code, message: msg, remediation });

  statements.forEach((st, idx) => {
    if (!st || st.Effect !== 'Allow') return;
    const actions = asArr(st.Action).map(String);
    const resources = asArr(st.Resource).map(String);
    const cond = st.Condition || null;

    actions.forEach((a) => {
      if (/^[a-z0-9]+:\*$/i.test(a))
        add('critical', 'AIG002', `statement=${idx}: Wildcard service prefix '${a}' grants full service control`, 'Replace with specific actions.');
      if (/^iam:PassRole$/i.test(a) && !(cond && JSON.stringify(cond).includes('iam:PassedToService')))
        add('critical', 'AIG004', `statement=${idx}: iam:PassRole without iam:PassedToService condition`, 'Add a Condition on iam:PassedToService.');
      if (/^iam:(Attach|Put|Create|Delete)/i.test(a))
        add('critical', 'AIG005', `statement=${idx}: Privilege-management action '${a}'`, 'Agents must not modify their own permissions.');
      if (/cloudtrail:StopLogging|guardduty:Delete|config:Delete/i.test(a))
        add('critical', 'AIG011', `statement=${idx}: Audit-tampering action '${a}'`, 'No agent should disable its audit trail.');
      if (/^lambda:InvokeFunction$/i.test(a) && resources.includes('*'))
        add('high', 'AIG016', `statement=${idx}: lambda:InvokeFunction without function-name scoping`, 'Restrict Resource to a specific function ARN.');
    });
    if (resources.includes('*') && actions.length)
      add('high', 'AIG003', `statement=${idx}: Resource '*' with ${actions.length} action(s) creates unbounded blast radius`, 'Scope Resource to specific ARNs.');
    if (resources.includes('*') && !cond)
      add('medium', 'AIG013', `statement=${idx}: Resource '*' with zero Condition keys`, 'Add scoping conditions.');
    if (st.NotAction || st.NotResource)
      add('high', 'AIG001', `statement=${idx}: NotAction/NotResource in an agent policy`, 'Prefer explicit Action/Resource allow-lists.');
  });

  const order = { critical: 3, high: 2, medium: 1, low: 0 };
  const worst = findings.reduce((m, f) => Math.max(m, order[f.severity]), -1);
  const decision = worst >= 2 ? 'EXIT 1 — high/critical' : (findings.length ? 'REVIEW' : 'EXIT 0 — clean (by this subset)');
  return { ok: true, findings, decision };
}

/** Prompt-injection signal check for the LLM demo. */
function checkInjectionSignals(text) {
  const raw = String(text || '');
  const signals = [];
  const test = (re, label) => { if (re.test(raw)) signals.push(label); };
  test(/ignore (?:all |the |previous |above |prior )*(?:instructions|prompts?)/i, 'instruction-override');
  test(/disregard (the |all )?(previous|above|prior)/i, 'context-reset');
  test(/you are (now|a|an) /i, 'role-reassignment');
  test(/system prompt|developer message|reveal your (instructions|prompt)/i, 'system-prompt-probe');
  test(/print|reveal|show|leak|exfiltrate|send|email/i, 'exfiltration-verb');
  test(/base64|rot13|hex|encode|decode/i, 'obfuscation');
  test(/pretend|roleplay|hypothetically|in a fictional/i, 'framing-bypass');
  const flagged = signals.length > 0;
  return { flagged, signals };
}

const API = {
  sanitizeQuery, tokenize, buildIndex, retrieve, roleLabel,
  inspectMcpPayload, analyzeIamPolicy, checkInjectionSignals, MAX_QUERY_LEN
};

// ES module exports (browser + Node ESM tests via dynamic import).
export {
  sanitizeQuery, tokenize, buildIndex, retrieve, roleLabel,
  inspectMcpPayload, analyzeIamPolicy, checkInjectionSignals, MAX_QUERY_LEN
};
export default API;
