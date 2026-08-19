# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Vite dev server (default http://localhost:5173)
npm run build     # production build to dist/
npm run preview   # serve the built dist/ locally
npm run lint      # ESLint over all .js/.jsx
```

There is no test runner configured in this project — `npm run lint` plus a manual pass in `npm run dev` is the full verification loop.

## Stack

React 19 + Vite 6, styled entirely with **Tailwind CSS v4** via the `@tailwindcss/vite` plugin. Plain JavaScript with JSX — no TypeScript. `prop-types` is used for runtime prop validation on shared components.

Tailwind v4 means **there is no `tailwind.config.js`**. All design tokens live in CSS inside `@theme` blocks (see Design tokens below). Adding a config file would be the wrong instinct; extend the CSS instead. The `postcss`/`autoprefixer`/`@tailwindcss/postcss` devDependencies are leftovers from the v3-style setup and are not part of the active pipeline (the Vite plugin is).

## Architecture

Single-page portfolio. `main.jsx` mounts `App.jsx`, which renders a fixed background layer (`BlurBlob` + a CSS grid-lines overlay) and then stacks every section in one scrolling column:

```
Navbar → About → NavigatorToTop → Skills → Services → Experience → Projects → Education → Contact → Footer
```

Two conventions matter across the whole app:

- **Navigation is anchor-based, not routed.** Each section owns an `id` (`about`, `skills`, `projects`, `education`, `contact`) and both `Navbar` and `Footer` jump to those ids. `Navbar` uses `href="#id"`; `Footer` uses `scrollIntoView`. Smooth scrolling comes from `html { scroll-behavior: smooth }` in `index.css`. If you add a section, add its id to the `menuitems` array in `Navbar.jsx` and the link list in `Footer.jsx`. `react-router-dom` and `react-scroll` are installed but unused.
- **All content is data, not markup.** `src/constants.js` exports `SkillsInfo`, `journeyNodes`, `journeyTools`, `services`, `projects`, and `education`, and imports every image from `src/assets/` so Vite fingerprints them. Sections map over these arrays. To add a project or skill, edit `constants.js` — never hardcode content into a component. `constants.js` stays free of JSX and component imports: `journeyNodes`/`journeyTools` name their icons as **strings**, and `src/components/skills/icons.js` is the only place that maps a name to a `react-icons/tb` component.

Section components are self-contained and share a layout idiom worth matching: `<section id="..." className="py-24 px-[12vw] md:px-[7vw] lg:px-[Nvw]">`, a centered title block, then the content grid. The purple accent is `#8245ec` and the page background is `#050414`.

`Skills` is the one section with two halves under a single `id="skills"`: the `SkillsInfo` card grid, plus `components/skills/MernJourney.jsx` (see below). Keep the id singular — the navbar and footer both target it.

**Fixed pill/card widths are a mobile bug waiting to happen.** With `px-[12vw]` section padding plus a card's own `px-6`, a 2-column grid column is barely 105px on a 360px phone, so a `w-28` chip overhangs its own card border. Size chips with `w-full min-w-0` and let the grid column decide.

## Design tokens

`src/index.css` is the single entry point and does nothing but import, in order: Tailwind, then `src/styles/theme.css` (tokens), then `src/styles/animations.css` (motion). Keep it that way — token definitions must be loaded before the utilities that consume them.

`src/styles/theme.css` holds the `@theme` block. Font families are defined there as `--font-serif` / `--font-sans`, which is what generates the `font-serif` / `font-sans` utilities.

**Typography: the body font is a serif.** `@layer base` sets `font-family: var(--font-serif)` on `body`, so serif is inherited by default and you do not add `font-serif` to individual components. `font-sans` is the opt-out for small mechanical text (badges, tags, code-ish labels). Note that several older components still carry a literal `font-sans` class on their `<section>` — that is legacy and should be removed when you touch those files, not copied.

The serif stack prefers Anthropic's licensed faces (`Copernicus`, `Tiempos Text`) if they are ever self-hosted in `public/fonts/`, and falls back to **Newsreader** (loaded from Google Fonts in `index.html`) which is the free face that actually renders today. See `docs/FONTS.md` for the swap procedure. Do not add a second webfont request without removing one — the page still makes exactly one, and the four families it needs are asked for in a single `css2` URL.

`About` is the one section that sets type deliberately, because it is a hero rather than prose: `--font-display` (Syne) for the name and `--font-mono` (Fira Code) for the code panel, alongside the hero-only colour tokens (`--color-hero-*`) in `theme.css`. Nowhere else should reach for those.

## Scroll animations

Scroll-reveal is a **first-party system in `src/animation/`** built on `IntersectionObserver` and CSS transitions. There is deliberately no `framer-motion` / `gsap` / `aos` dependency — do not add one for reveal-on-scroll work.

Three pieces:

- `useInView.js` — the only observer logic. Returns `[ref, inView]`, disconnects after first reveal by default (`once`).
- `Reveal.jsx` — wraps one element: `<Reveal variant="fade-up" delay={120}>`. Renders a `div` unless you pass `as`.
- `Stagger.jsx` — wraps a **list** container: one observer for the whole group, children revealed in sequence via `step` (ms). Always prefer this over N `Reveal`s in a `.map()`; the project grid and skills grid would otherwise create dozens of observers. A child that sets its own `data-reveal` keeps it, which is how `Education` alternates slide directions per timeline side.
- `useScrollProgress.js` + `ScrollProgressLine.jsx` — the other direction: not "has it appeared" but "how far through it are we". The hook writes `--scroll-progress` (0→1) straight onto the node instead of into state, because it updates every scroll frame. `Experience` and `Education` use the line component for their timeline spine.

Per-instance distances are set with `style={{ "--reveal-distance": "10px" }}` — the variants read that variable, so you tune a reveal without adding a variant for every offset.

The actual visual states live in `src/styles/animations.css`, keyed off `[data-reveal]` / `[data-revealed]` attributes that the components set. **Adding a new variant is a CSS-only change** — add a `[data-reveal="my-variant"]` rule setting `--reveal-x/y/scale`, then pass `variant="my-variant"`. Don't animate anything other than `opacity` and `transform` in these rules; that constraint is what keeps reveals off the main thread.

Two rules that are easy to get wrong:

- **Never put a reveal on an element that has its own `transition-*` classes.** The reveal sets `transition-property: opacity, transform` and a 700ms duration, which replaces the element's `transition-all duration-500`, so its hover lift snaps instead of easing. The fix is a wrapper: reveal on the outer div, hover on the inner card — that is why `Skills` and `Projects` have an extra `div` per item. Cards with no transition of their own (`Contact`'s info cards) can take the reveal directly.
- **Above-the-fold content uses `immediate`.** `<Reveal immediate>` skips the observer and plays on mount. The whole `About` hero uses it: on a short viewport the CTA sits just below the fold, and as a scroll reveal it would sit at `opacity: 0` until the visitor happened to scroll. Anything in the first screenful should be an entrance, not a scroll reveal.

`prefers-reduced-motion: reduce` is honored in both layers — `animations.css` pins every variant to its final state with no transition, and `useInView` skips creating observers entirely. Smooth anchor scrolling is also disabled. Any new motion must degrade the same way.

## The MERN request journey (`src/components/skills/`)

The interactive lower half of `Skills`: a **Send request** button sends a packet through Browser → React → Node.js → Express → MongoDB and back, lighting each node and logging what that layer is doing. It is the one piece of stateful, user-driven motion in the app, and it follows the same no-motion-library rule as the reveals — `framer-motion` is not installed and must not be added for it.

```
MernJourney        header + card + tools row
 ├─ JourneyVisualizer   node track, log bar, controls, one open detail panel
 │   ├─ JourneyNode     one hop; presentational, 4 states
 │   └─ SkillDetailPanel
 ├─ ToolsRow            supporting tools — outside the card, below it
 ├─ useJourneyAnimation timing only
 └─ icons.js            icon-name → react-icons/tb component
```

Four things to preserve when touching it:

- **`useJourneyAnimation.js` owns timing and nothing else** — which node is lit (`activeStep`), the direction, the log line, the status. It is chained `setTimeout`s, never `setInterval`, so each step has a precise offset and one `clearAll()` cancels a run; its `useEffect` cleanup is what stops a run in flight from setting state after unmount. Don't move geometry into it.
- **Geometry is one CSS variable.** The visualiser writes `--pos` (0→1, how far along the track the packet is) onto `.journey-track`; the spine fill and the packet are both `calc()` of it in the "MERN request journey" block of `animations.css`. That is why the mobile vertical timeline (<640px) and the desktop row are a media query rather than a second animation path — swap which axis reads `--pos` and the forward/return passes come along for free.
- **Cross-fades are done by keying, not by `AnimatePresence`.** The log line is keyed on its text and the detail panel on its node id, so React remounts them and a one-shot CSS entrance (`.journey-log-line`) replays. Same trick works anywhere a presence animation is wanted.
- **It never auto-plays**, only one detail panel is open at a time, and there are no percentage "skill levels" anywhere in the section — the interaction is the proof. Under reduced motion the journey still runs (the visitor asked for it) but cuts between states with no transitions and no looping cursor or spinner.

Per-technology colours are inline on the nodes and deliberately **not** `@theme` tokens: nothing outside this one section consumes them, so they live in `constants.js` next to the copy they describe.

## The Services section (`src/components/services/`)

A showcase of offered services with an auto-playing animated track. This is the **second** piece of the app (after the MERN journey) that uses per-item colors instead of the global accent — each service has its own hue defined inline in `constants.js`.

```
Services           section wrapper, header, composes the two pieces
 ├─ ServiceTrack     track + nodes + packet
 │   └─ ServiceNode  one node; presentational, active/inactive states
 ├─ ServiceCarousel  card + arrows + dots
 └─ useServiceLoop   timing only — active index, pause/resume
```

Five things to preserve when touching it:

- **`useServiceLoop.js` owns timing and nothing else** — which service is active (`activeIndex`), pause/resume, and the autoplay interval. Geometry (where the packet sits) is derived from `activeIndex` and animated in CSS via `--svc-pos`.
- **It always auto-plays** (the opposite of the MERN journey). The loop runs forward only (0→1→2→3→0→…), never pinging back. All timers are cleared and restarted on manual interaction so autoplay resumes cleanly.
- **Expanding a card pauses autoplay; collapsing resumes it.** Only one card is ever expanded.
- **Under `prefers-reduced-motion: reduce`, autoplay stops entirely** — land on the first node, no cycling, no color animation, and require explicit clicks to move. This is stricter than the MERN journey's reduced-motion handling because a self-triggering, indefinitely looping animation is exactly what that setting exists to prevent.
- **Per-service colours are inline** in `constants.js` and deliberately not `@theme` tokens, same convention as the MERN journey nodes.
