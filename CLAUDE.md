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
Navbar → About → NavigatorToTop → Skills → Projects → Education → Contact → Footer
```

Two conventions matter across the whole app:

- **Navigation is anchor-based, not routed.** Each section owns an `id` (`about`, `skills`, `projects`, `education`, `contact`) and both `Navbar` and `Footer` jump to those ids. `Navbar` uses `href="#id"`; `Footer` uses `scrollIntoView`. Smooth scrolling comes from `html { scroll-behavior: smooth }` in `index.css`. If you add a section, add its id to the `menuitems` array in `Navbar.jsx` and the link list in `Footer.jsx`. `react-router-dom` and `react-scroll` are installed but unused.
- **All content is data, not markup.** `src/constants.js` exports `SkillsInfo`, `projects`, and `education`, and imports every image from `src/assets/` so Vite fingerprints them. Sections map over these arrays. To add a project or skill, edit `constants.js` — never hardcode content into a component.

Section components are self-contained and share a layout idiom worth matching: `<section id="..." className="py-24 px-[12vw] md:px-[7vw] lg:px-[Nvw]">`, a centered title block, then the content grid. The purple accent is `#8245ec` and the page background is `#050414`.

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
