#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const TYPE = [12, 16, 20, 24, 28, 32, 36, 40, 48, 56, 64];
const SPACE = [4, 8, 12, 16, 24, 32, 48, 64, 96, 128];
const LINE = { 12: 16, 16: 24, 20: 28, 24: 32, 28: 36, 32: 40, 36: 44, 40: 48, 48: 56, 56: 64, 64: 72 };

const GRID = new Set();
for (const w of [56, 64, 72]) {
  for (const g of [24, 32, 40]) {
    GRID.add(12 * w + 11 * g);
  }
}
const sortedGrid = Array.from(GRID).sort((a, b) => a - b);

const TW_TEXT = {
  'text-xs': 12,
  'text-sm': 14,
  'text-base': 16,
  'text-lg': 18,
  'text-xl': 20,
  'text-2xl': 24,
  'text-3xl': 30,
  'text-4xl': 36,
  'text-5xl': 48,
  'text-6xl': 60,
  'text-7xl': 72,
  'text-8xl': 96,
  'text-9xl': 128,
};

const TW_RADIUS = { 'rounded-md': 6, 'rounded-sm': 2 };
const TW_SP = '(?:p|px|py|pt|pb|pl|pr|m|mx|my|mt|mb|ml|mr|gap|gap-x|gap-y|space-x|space-y|w|h|min-w|min-h|max-h|top|left|right|bottom|inset|size)';
const EXEMPT = /^(border(?!-radius)|outline|box-shadow|text-shadow|letter-spacing|stroke|filter|backdrop-filter|opacity|transform|ring)/i;

function nearest(v, scale = null, tie = 'up') {
  if (scale) {
    let best = scale[0];
    let minDiff = Math.abs(scale[0] - v);
    for (const s of scale) {
      const diff = Math.abs(s - v);
      if (diff < minDiff || (diff === minDiff && s > best)) {
        minDiff = diff;
        best = s;
      }
    }
    return best;
  }
  const lo = Math.floor(v / 4) * 4;
  const hi = lo + 4;
  return (v - lo) < (hi - v) ? lo : hi;
}

function classify(prop) {
  const p = prop.toLowerCase();
  if (p === 'font-size') return 'font';
  if (p === 'line-height') return 'line';
  if (p.includes('radius')) return 'radius';
  if (/(^|-)(width|height)$/.test(p)) return 'size';
  if (/^(padding|margin|gap|row-gap|column-gap|top|left|right|bottom|inset)/.test(p)) return 'space';
  return null;
}

function propose(kind, v) {
  if (kind === 'font') return nearest(v, TYPE);
  if (kind === 'space') return nearest(v, SPACE);
  if (kind === 'size' || kind === 'radius') return nearest(v);
  return nearest(v);
}

function audit(src) {
  const findings = [];
  function add(line, where, v, kind, note = null) {
    let ok = Math.abs(v % 4) < 1e-9 || v === 0;
    if (kind === 'font' && !TYPE.includes(v)) ok = false;
    if (ok && !note) return;
    const fix = !ok ? propose(kind, v) : null;
    findings.push({
      line,
      where,
      value_px: Math.round(v * 100) / 100,
      role: kind,
      status: !ok ? 'VIOLATION' : 'WARN',
      fix_px: fix,
      note,
    });
  }

  const lines = src.split(/\r?\n/);
  for (let ln = 1; ln <= lines.length; ln++) {
    const text = lines[ln - 1];

    // CSS declarations
    const declRegex = /([a-zA-Z-]+)\s*:\s*([^;}{"']+)/g;
    let m;
    while ((m = declRegex.exec(text)) !== null) {
      const prop = m[1];
      const val = m[2];
      if (EXEMPT.test(prop)) continue;
      const kind = classify(prop);
      if (!kind) continue;
      if (kind === 'line' && /^\s*\d*\.?\d+\s*$/.test(val)) {
        findings.push({
          line: ln,
          where: `${prop}:${val.trim()}`,
          value_px: null,
          role: 'line',
          status: 'WARN',
          fix_px: null,
          note: 'unitless line-height depends on font size; use px from the type scale',
        });
        continue;
      }
      const numRegex = /(-?\d*\.?\d+)(px|rem)/g;
      let n;
      while ((n = numRegex.exec(val)) !== null) {
        const v = parseFloat(n[1]) * (n[2] === 'rem' ? 16 : 1);
        let note = null;
        if (['max-width', 'width'].includes(prop.toLowerCase()) && v >= 900 && v % 4 === 0 && !GRID.has(v) && kind === 'size') {
          let nearestGrid = sortedGrid[0];
          let minGDiff = Math.abs(sortedGrid[0] - v);
          for (const g of sortedGrid) {
            if (Math.abs(g - v) < minGDiff) {
              minGDiff = Math.abs(g - v);
              nearestGrid = g;
            }
          }
          note = `divisible by 4 but not formula-derived; nearest grid width ${nearestGrid}`;
        }
        add(ln, `${prop}:${n[0]}`, v, kind, note);
      }
    }

    // Tailwind spacing/sizing
    const twSpRegex = new RegExp(`(?<![\\w\\[-])(?:[a-z]+:)*(${TW_SP})-(\\d+(?:\\.\\d+)?)(?![\\w\\.\\[%/])`, 'g');
    while ((m = twSpRegex.exec(text)) !== null) {
      const v = parseFloat(m[2]) * 4;
      add(ln, m[0], v, 'space');
    }

    // Tailwind text and radius classes
    for (const [k, v] of Object.entries({ ...TW_TEXT, ...TW_RADIUS })) {
      const re = new RegExp(`(?<![\\w-])${k.replace('-', '\\-')}(?![\\w-])`, 'g');
      while ((m = re.exec(text)) !== null) {
        add(ln, k, v, k.startsWith('text-') ? 'font' : 'radius');
      }
    }

    // Tailwind arbitrary values: [12px], [1.5rem]
    const twArbRegex = /(text|leading|rounded|max-w|min-w|w|h|p|m|gap)-\[(-?\d*\.?\d+)(px|rem)\]/g;
    while ((m = twArbRegex.exec(text)) !== null) {
      const v = parseFloat(m[2]) * (m[3] === 'rem' ? 16 : 1);
      const propKind = { text: 'font', leading: 'line', rounded: 'radius' }[m[1]] ||
        (['p', 'm', 'gap'].includes(m[1]) ? 'space' : 'size');
      if (propKind === 'line') {
        if (v % 4 !== 0) {
          findings.push({
            line: ln,
            where: m[0],
            value_px: v,
            role: 'line',
            status: 'VIOLATION',
            fix_px: nearest(v),
            note: null,
          });
        }
      } else {
        add(ln, m[0], v, propKind);
      }
    }
  }
  return findings;
}

const targetPath = process.argv[2];
if (!targetPath) {
  console.error("Usage: node fourpx_audit.js <file or directory>");
  process.exit(1);
}

function processFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const f = audit(content);
  const violations = f.filter(x => x.status === 'VIOLATION');
  const warnings = f.filter(x => x.status === 'WARN');
  console.log(`\n=== AUDIT: ${filePath} ===`);
  for (const x of f) {
    const fx = x.fix_px !== null ? ` -> ${x.fix_px}px` : '';
    console.log(`line ${String(x.line).padStart(3)}  ${x.status.padEnd(9)} ${x.where.padEnd(24)}${fx}  ${x.note || ''}`);
  }
  console.log(`${violations.length} violations, ${warnings.length} warnings`);
  return violations.length;
}

if (fs.statSync(targetPath).isDirectory()) {
  let totalViolations = 0;
  function walk(dir) {
    for (const item of fs.readdirSync(dir)) {
      if (item === 'node_modules' || item === '.next' || item === '.git') continue;
      const full = path.join(dir, item);
      if (fs.statSync(full).isDirectory()) walk(full);
      else if (/\.(tsx|ts|jsx|js|css|html)$/.test(item)) {
        totalViolations += processFile(full);
      }
    }
  }
  walk(targetPath);
  console.log(`\nTOTAL VIOLATIONS ACROSS DIRECTORY: ${totalViolations}`);
  process.exit(totalViolations > 0 ? 1 : 0);
} else {
  const vCount = processFile(targetPath);
  process.exit(vCount > 0 ? 1 : 0);
}
