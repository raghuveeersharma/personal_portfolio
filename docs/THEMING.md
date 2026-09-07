# Adding a light theme — implementation plan

Status: **Phases 1–4 complete.** Phase 5 not started.

| Phase | State |
| --- | --- |
| 1 — Token foundation and theme plumbing | ✅ landed |
| 2 — App shell and the toggle UI | ✅ landed |
| 3 — The hero (`About.jsx`) | ✅ landed |
| 4 — Content sections and the data-layer colours | ✅ landed |
| 5 — Motion layer, accessibility audit, and docs | not started |

## Ground rule: dark is the baseline and it does not change

The dark theme is what the site already is. This project **adds a light
theme beside it** — it is not a "build light and dark modes" job. Concretely:

- **The dark theme's appearance is frozen.** Every dark value is carried
  over verbatim from what is on `master` today. Where a colour moves into a
  token, the token's dark value is the exact hex that was there before.
- Every phase is diffed against dark **first**. A visible change in dark
  mode is a bug in this workstream, not an improvement, even if the new
  value is arguably better.
- Dark stays the default, the no-JS fallback, and the site's identity.
  Light is the accommodation.

The work is therefore: extract the hardcoded dark values into a semantic
token layer without altering them, author a light value for each, and add a
toggle. Split into five phases that each land as a working, shippable
state.

---

## 1. Where we are today

The obstacle is not the light theme itself — it is that the existing dark
look is not extractable as-is. A survey of `src/` (September 2026) found it
expressed in four distinct layers, which is also why a naive `dark:`-prefix
pass would fail:

| Layer | Where | Scale |
| --- | --- | --- |
| Semantic tokens (good) | `@theme` in `src/styles/theme.css`, consumed as `bg-accent`, `text-hero-muted`, … | ~76 utility usages across 11 tokens |
| Raw Tailwind palette classes | components | ~150 usages — `text-white` ×37, `text-gray-400` ×18, `text-gray-500` ×12, `border-white/10` ×10, `bg-gray-900` ×8, … |
| Arbitrary hex in JSX / CSS | 21 files | ~200 literals — `bg-[#050414]`, `#111118` ×12, `#1e1e2e` ×8, … |
| Hex baked into **content data** | `src/constants.js` | ~60 literals: every `journeyNodes` / `journeyTools` / `journeyStack` entry and every `services` entry carries `color` + `bg` + `border` |

Also relevant:

- `dark:` appears **0 times**. There is no existing dark-mode variant
  machinery to build on, and no `tailwind.config.js` to add a `darkMode`
  key to (Tailwind v4 — tokens live in CSS, see `CLAUDE.md`).
- `index.html` hard-declares `<meta name="color-scheme" content="dark">`
  and `<meta name="theme-color" content="#050414">`.
- `src/pages/HomePage.jsx` sets the page ground with a literal
  `className="bg-[#050414]"`, plus a grid-lines overlay whose line colour
  `#4f4f4f2e` and radial mask `#000` are both tuned for a dark ground.
- `BlurBlob.jsx` is `bg-purple-500 opacity-30 blur-3xl` — an ambient glow
  that reads as light bleeding through a dark page. On a light ground at
  the same opacity it becomes a grey-lavender smudge.
- `About.jsx` (18 hex literals) is the densest single component: it owns
  the hero's `--color-hero-*` palette and a fake code panel with its own
  syntax-highlight colours (`#c792ea`, `#c3e88d`, `#f78c6c`, `#ffe873`…).

### What this means

The work is **not** "add a toggle." It is a token-extraction job with a
toggle at the end of it. Roughly 350 hardcoded colour decisions have to
become ~40 semantic tokens first, or every future change has to be made
twice. The extraction is value-preserving by construction — each token's
dark value is the literal it replaced — so the phases below can proceed
incrementally without the site breaking or dark drifting between them.

---

## 2. Technical approach

### 2.1 The one load-bearing decision: `@theme inline`

Tailwind v4's `@theme` block emits its variables on `:root` *and* generates
the matching utilities. That is exactly wrong for theming — a token defined
in `@theme` is a fixed value, so `bg-surface` would compile to the dark
value and never change.

The fix is `@theme inline`. With `inline`, the generated utility inlines the
*reference* rather than the resolved value:

```css
/* the swappable raw values — plain CSS, NOT in @theme */
:root,
:root[data-theme="dark"] {
  --surface: #111118;
  --content: #e8e8f4;
}
:root[data-theme="light"] {
  --surface: #ffffff;
  --content: #1a1a24;
}

/* the token layer — `inline` makes bg-surface compile to
   `background-color: var(--surface)`, which re-resolves per theme */
@theme inline {
  --color-surface: var(--surface);
  --color-content: var(--content);
}
```

`bg-surface` now follows `data-theme` with no variant prefix and no
duplicated class. This is the mechanism for the whole migration; the
`dark:` variant is a fallback, not the strategy (see 2.4).

### 2.2 Theme resolution: three states, not two

The stored preference has three values — `"light"`, `"dark"`, `"system"` —
and `"system"` is the default. Only an explicit choice writes
`data-theme` to `<html>`; `"system"` leaves the attribute off and lets
`prefers-color-scheme` decide, which is why the raw values above are
declared on bare `:root` (dark, today's look) and overridden under
`:root[data-theme="light"]`, with a
`@media (prefers-color-scheme: light) { :root:not([data-theme="dark"]) }`
block for the system case.

Dark stays the default and the no-JS fallback. This is a portfolio whose
identity is dark; light is the accommodation, not the new baseline.

### 2.3 No flash of wrong theme

A React-only implementation paints dark, then corrects on hydration —
visible as a flash for anyone whose preference is light. A tiny blocking
script in `index.html`, before the module bundle, reads `localStorage` and
stamps `data-theme` on `<html>` synchronously. It must be inline (not a
`src=`) and wrapped in `try/catch`, because `localStorage` throws in some
privacy modes.

`index.html`'s static `<meta name="color-scheme" content="dark">` gets
replaced by a CSS `color-scheme` declaration per theme, so form controls,
scrollbars and the canvas behind the page follow. `theme-color` is updated
from JS on change.

### 2.4 When to reach for the `dark:` variant

Registered once, for escape hatches only:

```css
@custom-variant dark (&:where([data-theme="dark"], [data-theme="dark"] *));
```

Use it where the difference is **structural rather than a colour swap** — an
opacity, a shadow spread, a gradient stop count, `mix-blend-mode`, whether
the blob renders at all. Anything that is "this colour becomes that colour"
must be a token. A `dark:` prefix appearing next to a plain colour class is
a code-review flag: it means a token was missed.

### 2.5 Token naming

Semantic, by role, not by appearance — `--color-surface-raised`, never
`--color-gray-800`. Proposed set (~40 tokens, finalised in Phase 1):

- **Ground:** `bg-base`, `bg-subtle`, `surface`, `surface-raised`, `surface-sunken`
- **Content:** `content` (primary), `content-muted`, `content-subtle`, `content-inverse`
- **Line:** `border`, `border-strong`, `border-subtle`
- **Accent:** `accent`, `accent-deep`, `accent-text`, `accent-contrast`, `accent-wash`
- **Status:** `success`, `warning`, `info`, plus a `-wash` each
- **Hero:** the existing `hero-*` set, kept scoped to `About`
- **Journey/service data colours:** see Phase 4

The existing `--color-accent-text` comment in `theme.css` already documents
the trap this naming avoids: `#8245ec` is 3.88:1 on the dark ground so it
fails AA as text, while `#9d6ef5` fails as a *background* under white text.
Fills and text need separate tokens, and both need a light-theme twin.

---

## 3. The five phases

Each phase is independently mergeable and leaves `npm run build` green.
Phases 1–2 are the risky, thinking-heavy ones; 3–4 are mechanical once the
token set is settled.

### Phase 1 — Token foundation and theme plumbing

**Goal:** the switch works end-to-end, and *nothing looks different.*

This is the phase that decides whether the other four are easy. Per the
ground rule, the dark side of every token pair is today's exact hex value,
so dark mode is pixel-identical and the diff is provably safe. Light values
are drafted here but only the shell consumes them yet.

- Restructure `src/styles/theme.css`: raw swappable values in `:root` /
  `[data-theme="light"]` / `prefers-color-scheme` blocks, plus an
  `@theme inline` token layer over them. Static tokens (fonts, keyframes,
  `--animate-*`) stay in the plain `@theme` block — they don't swap.
- Draft the full light palette. Every pair gets a target contrast ratio
  written next to it as a comment, in the style `theme.css` already uses.
- Register the `dark:` custom variant.
- `src/theme/` — new folder, matching the existing `src/animation/`
  first-party-system convention:
  - `useTheme.js` — `{ theme, resolvedTheme, setTheme, cycleTheme }`,
    reads/writes `localStorage` under one key, listens for
    `prefers-color-scheme` changes while in `"system"`, stamps
    `data-theme` and updates `theme-color`.
  - `ThemeProvider.jsx` — context so `useTheme` has one source of truth
    and the toggle and any consumer can't disagree.
  - `index.js` — barrel, mirroring `src/animation/index.js`.
- Mount the provider in `main.jsx`, outside `BrowserRouter`.
- Add the blocking anti-flash script to `index.html`; drop the static
  `color-scheme` meta.
- Keep the `localStorage` access patterns defensive — same posture as
  `useReducedMotion.js`, which is the existing precedent for reading an
  environment preference in exactly one place.

**Done when:** flipping `data-theme` in devtools visibly changes the few
tokens already wired, dark mode is byte-identical to `master` visually, and
a hard reload with a light system preference shows no dark flash.

**Watch for:** `@theme inline` vs `@theme` is the single most likely thing
to get wrong; if `bg-surface` compiles to a literal hex in the built CSS,
the `inline` keyword is missing.

#### ✅ What landed

- `src/styles/theme.css` restructured into the four documented parts.
  40 semantic tokens over 40 raw values per theme. Every dark value is
  the literal it replaced.
- `src/theme/` — `themeContext.js` (context + the three states),
  `themeStorage.js` (guarded storage, the single `prefers-color-scheme`
  reader, `applyTheme`), `ThemeProvider.jsx`, `useTheme.js`, `index.js`.
  Split this way so no file exports both a component and a non-component,
  which `react-refresh/only-export-components` warns on.
- `src/main.jsx` — provider mounted outside `BrowserRouter`.
- `index.html` — inline blocking theme script added; the static
  `color-scheme` meta removed in favour of the per-theme CSS declaration.

**Verified:** `npm run lint` clean, `npm run build` green. In the built
CSS every colour utility emits a reference rather than a baked value —
`.text-hero-muted{color:var(--hero-muted)}` — and opacity modifiers
compose correctly (`.bg-accent\/10` →
`color-mix(in oklab,var(--accent)10%,transparent)`). Both `[data-theme]`
blocks and the `prefers-color-scheme` block are present, and the four
resolution cases (stored × OS) were checked against selector specificity:
the `:root:not([data-theme="dark"])` guard is what makes an explicit dark
choice survive a light OS preference.

**One deliberate deviation from byte-identical dark:** `@layer base` now
sets `color: var(--content)` on `body`. Light mode cannot depend on the
37 `text-white` classes being swept first, so the ground needs a default
text colour. In dark this resolves to `#ffffff`, which is what all
visible text already used — the only thing it can change is text that is
*currently* invisible black-on-dark. The `bg-white` elements were checked
and contain images only, no text. Worth an eyeball in `npm run dev`.

**Not yet consumed:** no component was touched, so `bg-base`, `surface`,
`content*`, `border*` and the status tokens generate no CSS yet. Tailwind
only emits utilities that appear in markup — `border-border` showing zero
occurrences in the built file is expected, not a bug. Phase 2 starts
using them.

---

### Phase 2 — App shell and the toggle UI

**Goal:** a real, usable toggle, and a page that is fully themed at the
chrome level even though sections inside it are still dark-only.

- `HomePage.jsx`: literal `bg-[#050414]` → `bg-base`.
- The grid-lines overlay: line colour and radial mask both become tokens.
  On light, the mask needs to fade to the light ground, and the line
  colour has to be re-picked — `#4f4f4f2e` over white is nearly invisible.
- `BlurBlob.jsx`: this is a `dark:` case, not a token case. The dark glow
  is additive light; the light-theme equivalent is a much softer,
  higher-saturation, lower-opacity tint, and it may read better suppressed
  entirely. Decide by eye. Keep `animate-blob` untouched.
- `Navbar.jsx`: tokenise, then add the toggle. Placement — desktop: after
  the social icons, right-aligned; mobile: inside the hamburger panel as a
  labelled row, since a bare icon there is unclear. Must be a real
  `<button>` with `aria-label` reflecting the *next* state and
  `aria-live` announcement of the change; three-state cycle
  system → light → dark → system with the current state visible, not
  a two-position switch that hides the system option.
- `Footer.jsx`, `NavigatorToTop.jsx`, and the `ProjectDetail.jsx` shell
  (11 hex literals) tokenised.
- The toggle animates its icon crossfade — under
  `prefers-reduced-motion: reduce` it cuts instead, per the existing
  motion rules in `CLAUDE.md`.

**Done when:** the toggle works, persists across reload, follows the OS
while in `"system"`, and the shell reads correctly in both themes. Section
interiors are expected to look wrong in light here — that is Phases 3–4.

#### ✅ What landed

- **A Phase 1 bug fixed first.** The `dark` variant was registered as a
  single `[data-theme="dark"]` selector, which silently missed every
  visitor on `system` with a dark OS — that path deliberately writes no
  attribute, so they got dark *tokens* but no dark *variant* rules. Since
  dark is the default, "dark is active" is really "light is not active",
  so the variant is now two arms mirroring the token cascade exactly: the
  attribute, plus `@media not all and (prefers-color-scheme: light)`
  guarded by `:not([data-theme="light"])`. Written in the legacy `not all
  and` form because older Safari drops a block it cannot parse, and
  losing this one would take dark styling with it.
- `src/components/ThemeToggle.jsx` — one component, two presentations.
  `icon` cycles (navbar, desktop); `segmented` shows all three states at
  once (mobile sheet), because a cycling icon cannot distinguish `system`
  resolving to dark from an explicit dark choice. Uses `aria-pressed`
  toggle buttons rather than `role="radio"`, which would owe the visitor
  arrow-key navigation for no gain in meaning. The accessible name states
  the current theme *and* the next one; a separate `aria-live` region
  sits outside the button so focus does not re-announce it.
- Shell tokenised: `HomePage`, `BlurBlob`, `Navbar`, `Footer`,
  `NavigatorToTop`, `ProjectDetail`.
- The background grid became a `.grid-lines` utility in `index.css`
  alongside the existing `clip-path-*` ones. It was duplicated inline in
  two files with the line colour hardcoded in each; the mask stays black
  because there it means opacity, not colour.
- `BlurBlob` is the phase's one true `dark:` case, and only its opacity
  is gated — the colour is a token (`--glow`, the old `bg-purple-500`,
  which is deliberately *not* `--accent`: the blob reads as light
  bleeding through the page, so it runs brighter than the brand fill).
  On light it drops to `opacity-[0.14]`; at dark's 0.30 the same shape is
  a grey-lavender smudge.
- New tokens this phase needed: `--border-faint` and `--surface-hover`
  (what `border-white/5` and `hover:bg-white/5` resolved to over the
  ground — a translucent white hairline is invisible on a light page),
  `--glow`, `--grid-line`. `--color-bg-base` was withdrawn in favour of
  the pre-existing `ink`: two utilities for one value is the drift this
  layer exists to prevent, and `bg-ink/70` reads better than
  `bg-bg-base/70`.
- `ProjectDetail`'s accent glows are `dark:`-gated rather than
  recoloured, ahead of the Phase 5 policy, since the page was being
  tokenised anyway.

**Verified:** `npm run lint` clean, `npm run build` green. In the built
CSS every `dark:` utility emits both arms; `.grid-lines` reads
`var(--grid-line)`; the alpha forms compose (`.bg-ink/70` →
`color-mix(in oklab, var(--bg-base) 70%, transparent)`). The
`hidden lg:grid` on the desktop toggle was checked against Tailwind's
emitted order — `.hidden` sorts after `.grid`, and `.lg:grid` lands last
inside its media query, so the display utilities resolve correctly.

#### Scope adjustment: `ProjectDetail` was done in full

The plan scoped this phase to `ProjectDetail`'s "shell (11 hex
literals)". That was wrong: it is a *route*, not a section, and no later
phase owned its interior — Phase 4 lists only the homepage sections. A
visitor can navigate to `/project/:id` directly, and a half-themed page
is a worse outcome than either extreme, so the whole file (~60 colour
decisions) was tokenised here.

#### Normalisations — deliberate, small dark changes

The ground rule says dark values carry over verbatim. These do not, and
each is a conscious call rather than an oversight. The cause is that the
codebase used **eight** near-identical greys where the token scale has
four steps; collapsing them *is* the drift the token layer exists to
remove, but it is still a visible change and belongs on the record.

| Was | Now | Dark effect |
| --- | --- | --- |
| `text-gray-100` `#f3f4f6`, `text-gray-200` `#e5e7eb` | `content` `#ffffff` | Marginally brighter; 18.4:1 and 16.7:1 → 20.3:1 |
| `text-gray-600` `#4b5563` | `content-subtle` `#6b7280` | Brighter; improves the page's worst contrast |
| `text-purple-300/400` `#d8b4fe`/`#c084fc`, `text-purple-500` `#a855f7` | `accent-text` `#9d6ef5` | Slightly deeper, and now the AA-checked accent |
| `bg-gray-900` `#111827`, `bg-gray-800` `#1f2937` | `surface` `#111118`, `surface-raised` `#1a1a24` | Loses a little blue; matches the rest of the site |
| `bg-white/[0.03]` (active nav item) | `accent-wash` `#131025` | Accent-tinted rather than neutral |

Exact carry-overs, for contrast: `text-white`, `text-gray-300`,
`text-gray-400`, `text-gray-500`, `border-white/10`, `border-white/5`,
`bg-purple-500` (as `--glow`) and every `#050414` all map to a token
holding the identical value.

#### Known gap, by design

Below `lg` the theme control lives only inside the hamburger sheet, so a
visitor who never opens the menu sees no toggle. That is the plan's
placement decision, not an oversight — the icon row is already at its
width limit on a 360px viewport.

---

### Phase 3 — The hero (`About.jsx`)

**Goal:** the first screenful is correct in both themes.

Isolated deliberately: it is the densest colour file, it owns a private
palette, and it is the one section a visitor judges the theme by.

- Give every `--color-hero-*` token a light twin. The hero runs a cooler
  violet than the site accent by design — preserve that relationship
  rather than collapsing it onto `accent`.
- The fake code panel is the fiddly part: a dark syntax theme inverted
  naively goes muddy. Treat it as a themed pair of syntax palettes
  (dark: the current values; light: a light-syntax set at matched
  contrast), with the panel keeping a slightly sunken surface in both.
- The `--font-display` / `--font-mono` treatment and the hero's
  `<Reveal immediate>` entrances are untouched — this is colour only.
- Re-check the availability dot and the live badge, which share
  `--animate-avail-pulse`; a pulse that is legible on dark can vanish on
  light.

**Done when:** the hero is correct in both themes at 360px, 768px and
1440px, and the code panel is legible rather than merely inverted.

#### ✅ What landed

- **The syntax palette became theme variables.** `About`'s `CODE` map
  now holds `var(--code-kw)` and friends instead of literals, so the
  panel switches with the page and never needs `resolvedTheme`. Light is
  its own palette picked against white, not a transform of the dark one:
  `#6f42c1` / `#116329` / `#0550ae` / `#953800`, all 6.5–7.6:1.
- **The JSON key inverts its relationship.** The dark response panel
  distinguishes key from value with a *paler* green (`#a5f3c0` against
  `#4ade80`). Paler means lower contrast on white, so light does the
  opposite: `--code-prop` is `#0a5c2a`, *darker* than `--success`, which
  keeps the two distinguishable at 7.54:1.
- Hero tokens gained light twins, plus `--hero-accent-hover` (the CTA's
  old `hover:bg-[#7C6FFA]`) and `--success-line` / `--warning-line` /
  `--info-line` — the last two are unused so far but are exactly the
  journey-node border literals Phase 4 needs.
- The **editor traffic lights stay literal and unthemed**, with a
  comment saying so: a real editor shows the same three dots in both
  themes. Same convention as the per-technology hues in `constants.js`.
- Availability badge and response panel moved onto
  `success-wash` / `success-line`.

#### The `.tech-chip` mechanism — Phase 4's pattern, proven here

The hero's stack chips are the first per-item coloured data to be
themed, so the asymmetric approach the plan settled on for Phase 4 was
built here on four chips rather than twenty.

`constants.js` is **unchanged**. The chip passes its colours as custom
properties only — never as `backgroundColor` — and a single `.tech-chip`
rule in `theme.css` reads them:

- **dark** reads the hand-picked literals straight off the element, so
  the dark chips are exact;
- **light** ignores them and derives all three from the brand hue with
  `color-mix`.

Inline styles setting custom properties rather than colour properties is
what makes this work — an inline `background-color` would outrank any
selector in the stylesheet.

**Why 55%.** The text mix is the constrained one: it must clear AA on
the 10%-tinted background for every hue in `constants.js`. Measured
across all twelve, 55% gives a worst case of 4.85:1 (Tailwind's pale
`#7dd3fc`); at 60% that hue drops to 4.19:1 and fails. The percentage is
load-bearing and the comment in `theme.css` says not to raise it without
re-measuring.

**A build behaviour worth knowing about.** Lightning CSS generates its
own fallback for any `color-mix` it cannot resolve at compile time.
Because every argument here is a custom property it can resolve none of
them, and the fallback it picks is the bare brand hue for *all three*
properties — which in light mode is hue-on-hue, an invisible label. So
the light arms declare a legible neutral chip first and gate the mixes
behind `@supports (color: color-mix(...))`. Confirmed in the built CSS:
without `color-mix` the whole block is skipped and the neutral chip
applies; with it, the real mix wins as the later rule. If a future
change moves those rules, keep the ordering.

**Verified:** `npm run lint` clean, `npm run build` green. Every dark
value in the hero and syntax sets was diffed against its original
literal in the built CSS — all exact, no normalisations this phase. The
only remaining hex literals in `About.jsx` are the three traffic-light
dots.

---

### Phase 4 — Content sections and the data-layer colours

**Goal:** every remaining section themed. The bulk of the mechanical work,
and the one genuinely novel problem.

Order: `Skills` (+ `skills/*`) → `Services` (+ `services/*`) →
`Experience` → `Projects` → `Education` → `Contact`. Roughly largest
colour surface first, so the token set is stress-tested early.

**The novel problem — colour in `constants.js`.** Every `journeyNodes`,
`journeyTools`, `journeyStack` and `services` entry carries
`color` / `bg` / `border`, and the `bg`/`border` values are dark surfaces
(`#0D1729`, `#1A1209`, …) that are meaningless on a light page.
`CLAUDE.md` states these are deliberately *not* `@theme` tokens because
nothing outside their section consumes them — that decision should stand.
Two options:

1. **Shape the data as theme pairs** — `bg: { dark: "#0D1729", light: "#EFF6FF" }`,
   resolved by the consuming component via `resolvedTheme`. Explicit and
   tunable per technology; costs a hand-picked light value ×~20 entries and
   makes the data shape more verbose.
2. **Keep one brand hue per entry and derive the surfaces in CSS** — store
   only `color`, pass it as `--card-color`, and build `bg`/`border` with
   `color-mix(in srgb, var(--card-color) 10%, var(--surface))`. Far less
   data churn, self-consistent across both themes, and `animations.css`
   already uses exactly this pattern at lines 483–507.

**Recommendation: asymmetric — option 1's dark, option 2's light.** Option 2
alone is disqualified by the ground rule: `color-mix` on a brand hue will
not reproduce hand-picked values like `#0D1729` exactly, so deriving *both*
sides would quietly shift the dark theme. So:

- **Dark keeps its authored `bg`/`border` literals, untouched.** They stay
  in `constants.js` exactly as written.
- **Light is derived** from the same entry's `color` via
  `color-mix(in srgb, var(--card-color) 8%, var(--surface))`, so no light
  value has to be hand-picked per entry and the ~20 entries stay readable.
- Any entry whose derived light surface is too weak to read gets an
  explicit light literal as an override — the option 1 shape, but only
  where it is earned.

This preserves dark byte-for-byte, avoids doubling ~40 literals, and reuses
the `color-mix` pattern already at `animations.css` lines 483–507.

Also in this phase:

- Sweep the remaining raw palette classes — `text-white`, `text-gray-*`,
  `border-white/10`, `bg-gray-*` — to `content` / `content-muted` /
  `border` tokens.
- Remove the legacy literal `font-sans` classes on `<section>` elements as
  those files are touched, per the standing instruction in `CLAUDE.md`.
- Do **not** restructure any component while tokenising. The wrapper divs
  that exist to separate reveal transitions from hover transitions are
  load-bearing; a colour pass must not touch the element tree.

**Done when:** `grep -rE '#[0-9a-fA-F]{3,6}' src/components` returns only
intentional per-brand hues, and no `text-gray-*` / `text-white` /
`bg-gray-*` remain.

#### ✅ What landed

Both exit criteria met. Across all of `src`, zero `text-white`,
`text-gray-*`, `bg-gray-*`, `text-slate-*`, `border-gray-*` or
`*-purple-*` classes remain, and the only hex literals left in
`src/components` and `src/pages` are the three editor traffic-light
dots in `About`.

**`constants.js` was not touched.** That was the goal of the
`.tech-chip` work in Phase 3 and it held: every per-technology and
per-service colour is now consumed through the `.brand-hue` contract,
so the data keeps its hand-picked dark literals verbatim.

**The resolver was generalised.** `.tech-chip`'s two-theme arms became
`.brand-hue`, a single scope that resolves a brand hue into four
outputs — `--brand-ink` (text/icons), `--brand-edge` (borders, dots,
glows), `--brand-surface` (tinted background), `--brand-line`
(hairline). Dark passes the literals through and derives only what the
data lacks; light derives everything. Six consumers now share it —
hero chips, tool chips, journey nodes, the detail panel, service nodes
and cards, the service track's SVG segments — and each needs exactly
one rule with no `dark:` prefix and no duplicated arms. All the
per-theme branching lives in one place.

`--brand-edge` is new this phase and its 70% is measured the same way
55% was: bounded by the 3:1 floor for a meaningful boundary, worst case
3.35:1 on the surface and 3.19:1 on its own tint. 75% fails both.

**Three JS colour helpers were deleted rather than themed:**

- `JourneyNode`'s `node.color + "99"` — string-concatenated hex alpha
  only works on a literal, and the colour is now a variable. Replaced
  with `color-mix(… 60%, transparent)`, which is the same value in dark.
- `ServiceNode`'s `tintedBg()` mixed a hue at 12% over the page
  background in JS, which meant hardcoding `#050414` as the base.
  `--brand-surface` does that mix in CSS against `--bg-base`, so it
  follows the theme. Dark output is identical.
- `--node-color` turned out to be write-only — the CSS that once read it
  is gone — so it went with `tintedBg()`.

**Two things the sweep caught that a class-level pass would have
missed:**

- `node.packetColor` flows from `constants.js` straight into an inline
  `backgroundColor`, so the travelling packet would have stayed a pale
  raw hue on a light track. It now goes through `--brand-edge`.
- Four focus rings in `Projects` were hardcoded as
  `outline-[#9d6ef5]` — the literal value of `--accent-text`. A focus
  ring that does not follow the theme is an accessibility bug, not a
  cosmetic one.

**The wash gradient became `.section-wash`.** The identical inline
`backgroundImage` object was pasted into `Skills`, `Experience` and
`Education`, so its colours were written six times. Light needs the
opacity dropped from 0.15 to 0.05 — at dark's value the two gradients
turn a white page muddy rather than atmospheric.

**Deliberately left unthemed**, each with a comment saying why: the
company/school logo plates stay `bg-white` in both themes (the logos
are dark artwork drawn for a light plate; theming it would make them
unreadable), and the project card's `bg-black/60` hover scrim stays
dark because it exists to carry white text and an accent button.

**Verified:** `npm run lint` clean, `npm run build` green. Eighteen dark
token values that had to be byte-identical were diffed against their
original literals in the built CSS — all exact. The resolver's four
arms were checked for correct source order in the compiled output.

#### Scope adjustment: `animations.css` surfaces came forward

The plan put all of `animations.css` in Phase 5. Its thirteen colour
literals turned out to split along a real boundary rather than a
convenient one: the journey spine and fill, the service card border,
hover border and icon well are plain section *surfaces*, and leaving
them dark-only would have left visible dark bars inside sections that
were otherwise finished. Those are done here (all exact carry-overs),
along with the timeline gradient's stops — light needs
`--progress-tip` to *darken* rather than lighten, since the dark
gradient fades up to a pale lilac that vanishes on white.

Phase 5 keeps what actually belongs to the glow policy: the single
remaining literal, `rgba(130, 69, 236, 0.55)` on the timeline spine's
`box-shadow`.

#### Normalisations this phase

| Was | Now | Dark effect |
| --- | --- | --- |
| `border-gray-700` (skill pills) | `border` `#2a2a3f` | Slightly darker, cooler |
| `border-gray-600` (form inputs) | `border-strong` `#3a3458` | Cooler; light twin meets the 3:1 control-boundary floor |
| `bg-gray-700` (project tag hover) | `surface-raised` | Darker; the hover still lightens from `surface/60` |
| `#0d0c18` (inactive service card), `#0A0A10` (journey log bar) | `surface-sunken` `#0d0d14` | Imperceptible |
| `#534AB7` (journey button, running) | `hero-accent-dim` `#6c5ce7` | Lighter, still clearly darker than the idle state |
| `bg-white/15` (timeline spine) | `border` `#2a2a3f` | Near-exact — the translucent value computed to `#2b2a3a` |
| `text-slate-400` `#94a3b8` | `content-muted` `#9ca3af` | Near-exact; drops an unintended cool/neutral split |

---

### Phase 5 — Motion layer, accessibility audit, and docs

**Goal:** the seams. This phase is where a merely-working theme becomes a
finished one, so it is scoped as real work rather than cleanup.

- `src/styles/animations.css` (13 colour literals): the journey spine
  `#1e1e2e`, packet `#8b7cf8`, card borders, and the accent gradient
  (`#8245ec → #a855f7 → #d8b4fe`) plus its `rgba(130,69,236,.55)` glow.
  Glows are the hard case — a bloom that signals energy on dark reads as
  blur on light, so these become `dark:`-gated shadows rather than
  recoloured ones.
- **Theme-transition policy.** Decide once and document it: a short
  `background-color`/`color` transition on the swap looks deliberate, but
  a global `transition: all` would fight every hover state and the reveal
  system's `transition-property` override (see the reveal rules in
  `CLAUDE.md`). Recommended: a scoped transition on ground and content
  colours only, applied via a short-lived class on `<html>` during the
  swap and removed after, and skipped entirely under reduced motion.
- **Contrast audit — light is the deliverable.** Measure both themes, but
  only light is *fixed* here: target AA 4.5:1 for body text and 3:1 for
  large text and UI boundaries. The ratios written as comments in Phase 1
  are *targets* and must be verified with a real checker, not assumed.
  Record the measured numbers in `theme.css` comments the way the existing
  `--color-accent-text` and `--color-hero-dim` notes do. Dark is measured
  for the record only — it already carries deliberate contrast fixes
  (see the `--color-accent-text` and `--color-hero-muted` notes), and any
  new dark finding is **logged as a follow-up, not fixed**, because
  changing it would violate the ground rule.
- Verify `prefers-reduced-motion` still degrades correctly in both
  themes, and that the MERN journey and the Services autoplay keep their
  differing reduced-motion contracts.
- **Final dark-parity check:** walk the whole page in dark against
  `master` at all three breakpoints. Anything that moved is a regression
  to revert, not a judgement call.
- Cross-check: Chrome/Firefox/Safari, iOS Safari, forced-colors mode, and
  a print pass (light tokens should be what prints).
- `npm run lint` clean; manual pass through `npm run dev` in both themes
  at all three breakpoints.
- Update `CLAUDE.md` with a Theming section — the `@theme inline`
  mechanism, the token vocabulary, the "token not `dark:`" rule, and the
  data-colour convention from Phase 4 — and finish this document with what
  actually shipped.

**Done when:** no contrast failures, no motion regressions, and the next
person adding a section knows which token to reach for without reading
this plan.

---

## 4. Sequencing rationale

Foundation before anything consumes it (1), then the shell so the feature
is real and testable end-to-end as early as possible (2), then the hero
because it is highest-visibility and highest-density (3), then the long
mechanical tail once the token set has been proven on hard cases (4), then
the cross-cutting seams that can only be judged with everything in place
(5).

The alternative — sweeping every file for `dark:` variants — was rejected:
it doubles ~350 colour decisions in place, leaves the `constants.js` data
colours unsolved, and produces no reusable vocabulary. It also makes the
ground rule harder to hold, since the dark value stops being the single
authored default and becomes one of two variants to keep in sync.

## 5. Risks

| Risk | Mitigation |
| --- | --- |
| `@theme` used where `@theme inline` is needed; tokens compile to fixed hex | Check the built CSS in Phase 1 before building on it |
| Light values chosen by inversion, giving muddy greys | Pick light values directly against a white ground; verify in Phase 5 |
| Glow/blur effects that only work on dark | Explicitly `dark:`-gated, not recoloured (Phases 2 and 5) |
| Theme transition fighting the reveal system's `transition-property` | Scoped, short-lived transition class; never `transition: all` |
| Dark theme drifting during extraction — the primary risk, given the ground rule | Every token's dark value is the literal it replaced; each phase diffed against dark before light is judged; explicit dark-parity pass in Phase 5 |
| Deriving surfaces with `color-mix` silently shifting dark | `color-mix` is used for **light only**; dark keeps its authored literals (Phase 4) |
| Accent failing AA in one direction | Separate fill vs text tokens, already the established pattern |

## 6. Follow-ups logged, not fixed

Found while extracting, and left alone because dark is frozen. Each needs
its own decision outside this workstream.

- **`--content-subtle` is 4.20:1 on `--bg-base` in dark** (`#6b7280`, the
  old `text-gray-500`, 12 usages). That is AA for large text but under
  the 4.5:1 body-text threshold. Carried over unchanged; the token
  carries a comment saying not to use it for new small copy. Fixing it
  means changing how dark looks, so it is a separate call.
- **`ProjectDetail` uses `--content-subtle` for small copy** in ten
  places (metadata labels, truncated URLs), which is where the failure
  above actually bites hardest. Worth revisiting together with it.
- **`bg-bg-subtle` is an awkward utility name**, produced by the
  `--color-bg-subtle` token. It works, but `bg-subtle` would read
  better. Renaming the token is a mechanical change across one
  consumer, and was left alone rather than churn a phase-4 file for
  cosmetics.
- **The light availability badge sits at 4.64:1** (`--success` on
  `--success-wash`). That passes AA but with little margin, and the
  badge text is 11px. Not a failure, but the first thing to adjust if
  the light palette gets another pass.

## 7. Out of scope

**Any change to how the dark theme looks** — including contrast or palette
improvements that would otherwise be worth making; those are logged as
separate follow-ups. Also out of scope: new dependencies (no `next-themes`
and no motion library — the first-party-system rule in `CLAUDE.md` applies
here too), redesign, per-section theme overrides, and content changes.
