/**
 * Contrast audit for the theme tokens.
 *
 *   npm run audit:contrast
 *
 * Reads the real values out of src/styles/theme.css rather than keeping
 * its own copy of the palette, so it cannot drift from what ships. It
 * checks three things:
 *
 *   1. every token pair the design actually renders, in both themes;
 *   2. the two `.brand-hue` mix percentages against every brand hue in
 *      constants.js — those percentages are load-bearing and the
 *      comments in theme.css claim specific worst cases;
 *   3. that dark has not picked up any *new* failure. Dark's appearance
 *      is frozen (see docs/THEMING.md), so its known failures are
 *      baselined below and only additions fail the run.
 *
 * Exit codes: 0 pass, 1 a light failure or a new dark failure.
 */
import { readFileSync } from "node:fs";
import process from "node:process";

const AA_BODY = 4.5;
const AA_UI = 3.0; // large text and genuine UI-component boundaries

/* ---------- colour maths ------------------------------------- */

const channel = (c) => {
  const v = c / 255;
  return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
};

const luminance = ([r, g, b]) =>
  0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);

const contrast = (a, b) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

/** Parses #rgb, #rrggbb, #rrggbbaa and rgb()/rgba(). Alpha is dropped:
 *  every pair checked here is opaque-over-opaque. */
const parseColor = (raw) => {
  const value = raw.trim();

  const hex = value.match(/^#([0-9a-f]{3,8})$/i)?.[1];
  if (hex) {
    const full =
      hex.length === 3
        ? [...hex].map((d) => d + d).join("")
        : hex.slice(0, 6);
    if (full.length !== 6) return null;
    return [0, 2, 4].map((i) => parseInt(full.slice(i, i + 2), 16));
  }

  const fn = value.match(/^rgba?\(([^)]*)\)$/i)?.[1];
  if (fn) {
    const parts = fn.split(/[,/\s]+/).filter(Boolean).slice(0, 3);
    if (parts.length !== 3) return null;
    return parts.map((p) => Math.round(Number.parseFloat(p)));
  }

  return null;
};

/** `color-mix(in srgb, a pct%, b)`, which is a plain linear blend in
 *  sRGB space — the same function theme.css uses. */
const mix = (a, b, pct) => {
  const f = pct / 100;
  return a.map((c, i) => Math.round(c * f + b[i] * (1 - f)));
};

const BLACK = [0, 0, 0];

/* ---------- reading theme.css -------------------------------- */

const css = readFileSync("src/styles/theme.css", "utf8");

/** Returns the custom properties declared in the rule opened by the
 *  first `{` after `selector`. Brace-matched, so nested at-rules and
 *  the @media print block cannot leak in. */
const tokensIn = (selector) => {
  const at = css.indexOf(selector);
  if (at === -1) throw new Error(`selector not found in theme.css: ${selector}`);

  const open = css.indexOf("{", at);
  let depth = 0;
  let i = open;
  for (; i < css.length; i += 1) {
    if (css[i] === "{") depth += 1;
    else if (css[i] === "}" && (depth -= 1) === 0) break;
  }

  const out = new Map();
  for (const m of css.slice(open, i).matchAll(/(--[a-z0-9-]+)\s*:\s*([^;]+);/g)) {
    const parsed = parseColor(m[2]);
    if (parsed) out.set(m[1], parsed);
  }
  return out;
};

const THEMES = {
  dark: tokensIn(':root[data-theme="dark"]'),
  light: tokensIn(':root[data-theme="light"]'),
};

/* ---------- the pairs that actually render -------------------- */

/** [text token, background token, floor, what it is] */
const PAIRS = [
  ["--content", "--bg-base", AA_BODY, "primary text on page"],
  ["--content", "--surface", AA_BODY, "primary text on card"],
  ["--content", "--surface-raised", AA_BODY, "text on raised"],
  ["--content", "--bg-subtle", AA_BODY, "text on subtle"],
  ["--content", "--accent-wash", AA_BODY, "form input text"],
  ["--content", "--surface-accent", AA_BODY, "text on contact panel"],
  ["--content-soft", "--bg-base", AA_BODY, "soft text on page"],
  ["--content-soft", "--surface", AA_BODY, "soft text on card"],
  ["--content-muted", "--bg-base", AA_BODY, "muted text on page"],
  ["--content-muted", "--surface", AA_BODY, "muted text on card"],
  ["--content-muted", "--surface-sunken", AA_BODY, "muted on sunken"],
  ["--content-subtle", "--bg-base", AA_BODY, "subtle text on page"],
  ["--content-subtle", "--surface", AA_BODY, "subtle text on card"],
  ["--content-accent", "--bg-base", AA_BODY, "violet-dim text on page"],
  ["--content-accent", "--surface-sunken", AA_BODY, "violet-dim on sunken"],
  ["--accent-text", "--bg-base", AA_BODY, "accent text on page"],
  ["--accent-text", "--surface", AA_BODY, "accent text on card"],
  ["--accent-contrast", "--accent", AA_BODY, "label on accent fill"],
  ["--accent-contrast", "--accent-deep", AA_BODY, "label on accent-deep"],
  ["--success", "--success-wash", AA_BODY, "success badge"],
  ["--warning", "--warning-wash", AA_BODY, "warning badge"],
  ["--info", "--info-wash", AA_BODY, "info badge"],
  ["--hero-text", "--hero-surface", AA_BODY, "hero heading"],
  ["--hero-text", "--hero-card", AA_BODY, "hero chrome heading"],
  ["--hero-dim", "--hero-surface", AA_BODY, "hero body"],
  ["--hero-dim", "--hero-bg", AA_BODY, "hero body on hero bg"],
  ["--hero-dim", "--success-wash", AA_BODY, "json punctuation"],
  ["--hero-muted", "--hero-surface", AA_BODY, "hero eyebrow"],
  ["--hero-muted", "--hero-card", AA_BODY, "editor chrome label"],
  ["--hero-muted", "--hero-bg", AA_BODY, "hero eyebrow on hero bg"],
  ["--hero-accent", "--hero-surface", AA_BODY, "typewriter role"],
  ["--accent-contrast", "--hero-accent", AA_BODY, "hero CTA label"],
  ["--accent-contrast", "--hero-accent-hover", AA_BODY, "hero CTA hover"],
  ["--hero-green", "--success-wash", AA_BODY, "availability badge"],
  ["--code-kw", "--surface", AA_BODY, "syntax keyword"],
  ["--code-str", "--surface", AA_BODY, "syntax string"],
  ["--code-fn", "--surface", AA_BODY, "syntax function"],
  ["--code-num", "--surface", AA_BODY, "syntax number"],
  ["--code-txt", "--surface", AA_BODY, "syntax plain"],
  ["--code-prop", "--success-wash", AA_BODY, "json key"],
  // Non-text. Only genuine UI-component boundaries carry the 3:1 floor.
  ["--border-neutral", "--accent-wash", AA_UI, "form input boundary"],
  ["--border-neutral", "--surface-accent", AA_UI, "input vs contact panel"],
  ["--accent", "--bg-base", AA_UI, "accent fill vs page"],
  ["--accent", "--surface", AA_UI, "accent fill vs card"],
  // Decorative: a static outline around an already-labelled logo, and a
  // hover emphasis that accompanies a colour change. Not 1.4.11
  // components, so no floor — reported for information only.
  ["--border-neutral-soft", "--surface", 0, "skill pill outline (decorative)"],
  ["--border-strong", "--surface", 0, "card hover emphasis (decorative)"],
];

/**
 * Dark is frozen, so these are recorded rather than fixed. Each is a
 * value that predates the light theme. See "Follow-ups logged, not
 * fixed" in docs/THEMING.md before adding to this list — a new entry
 * means dark got worse, which is a regression, not a baseline update.
 */
const KNOWN_DARK_FAILURES = new Set([
  "subtle text on page",
  "subtle text on card",
  "violet-dim on sunken",
  "editor chrome label",
  "hero CTA label",
  "hero CTA hover",
  "form input boundary",
  "input vs contact panel",
]);

/* ---------- the brand-hue percentages ------------------------ */

/** The `color:` / `text:` / `packetColor:` values in constants.js are
 *  the brand hues; `bg:` and `border:` are dark surfaces and are not
 *  used as ink. */
const brandHues = () => {
  const src = readFileSync("src/constants.js", "utf8");
  const hues = new Set();
  for (const m of src.matchAll(
    /\b(?:color|text|packetColor)\s*:\s*"(#[0-9a-f]{6})"/gi,
  )) {
    hues.add(m[1].toLowerCase());
  }
  return [...hues];
};

const INK_PCT = 55;
const EDGE_PCT = 70;
const SURFACE_PCT = 10;

/* ---------- reporting ---------------------------------------- */

const pad = (s, n) => String(s).padEnd(n);
let failed = false;
const stale = [];

for (const [theme, tokens] of Object.entries(THEMES)) {
  console.log(`\n${"=".repeat(78)}\n${theme.toUpperCase()}\n${"=".repeat(78)}`);
  const failures = [];

  for (const [fg, bg, floor, label] of PAIRS) {
    if (!tokens.has(fg) || !tokens.has(bg)) {
      console.log(`  [????] missing token: ${tokens.has(fg) ? bg : fg}`);
      failed = true;
      continue;
    }

    const ratio = contrast(tokens.get(fg), tokens.get(bg));
    const known = theme === "dark" && KNOWN_DARK_FAILURES.has(label);
    const passes = floor === 0 || ratio >= floor;

    let flag = "ok  ";
    if (!passes) flag = known ? "known" : "FAIL";
    else if (known) stale.push(label);

    if (!passes && !known) failures.push([label, ratio, floor, fg, bg]);

    const need = floor === 0 ? "  --" : floor.toFixed(1);
    console.log(
      `  [${pad(flag, 5)}] ${ratio.toFixed(2).padStart(5)}:1  need ${need}  ` +
        `${pad(label, 32)} ${fg} on ${bg}`,
    );
  }

  if (failures.length) {
    failed = true;
    console.log(`\n  ${failures.length} unexpected failure(s) in ${theme}:`);
    for (const [label, ratio, floor, fg, bg] of failures) {
      console.log(
        `    - ${label}: ${ratio.toFixed(2)}:1 (need ${floor}) — ${fg} on ${bg}`,
      );
    }
  } else {
    console.log(`\n  no unexpected failures in ${theme}`);
  }
}

console.log(`\n${"=".repeat(78)}\nBRAND HUES (light derivation)\n${"=".repeat(78)}`);
{
  const light = THEMES.light;
  const surface = light.get("--surface");
  const hues = brandHues();
  let worstInk = [Infinity, null];
  let worstEdge = [Infinity, null];

  for (const hue of hues) {
    const rgb = parseColor(hue);
    const tint = mix(rgb, surface, SURFACE_PCT);
    const ink = contrast(mix(rgb, BLACK, INK_PCT), tint);
    const edgeOnSurface = contrast(mix(rgb, BLACK, EDGE_PCT), surface);
    const edgeOnTint = contrast(mix(rgb, BLACK, EDGE_PCT), tint);
    const edge = Math.min(edgeOnSurface, edgeOnTint);

    if (ink < worstInk[0]) worstInk = [ink, hue];
    if (edge < worstEdge[0]) worstEdge = [edge, hue];

    const bad = ink < AA_BODY || edge < AA_UI;
    if (bad) failed = true;
    console.log(
      `  [${bad ? "FAIL" : "ok  "}] ${hue}  ink ${ink.toFixed(2)}:1 ` +
        `(need ${AA_BODY})   edge ${edge.toFixed(2)}:1 (need ${AA_UI})`,
    );
  }

  console.log(
    `\n  ${hues.length} hues.  worst ink ${worstInk[0].toFixed(2)}:1 (${worstInk[1]}) ` +
      `at ${INK_PCT}%   worst edge ${worstEdge[0].toFixed(2)}:1 (${worstEdge[1]}) at ${EDGE_PCT}%`,
  );
  console.log(
    "  These two worst cases are what the percentages in theme.css part 5\n" +
      "  are chosen against. If you change them, update that comment.",
  );
}

if (stale.length) {
  console.log(
    `\nNOTE: ${stale.length} baselined dark failure(s) now pass — ` +
      "remove them from KNOWN_DARK_FAILURES:",
  );
  for (const label of stale) console.log(`  - ${label}`);
}

console.log(
  `\n${"=".repeat(78)}\n${failed ? "FAILED" : "PASSED"}\n${"=".repeat(78)}`,
);
process.exit(failed ? 1 : 0);
