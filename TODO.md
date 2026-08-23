# TODO

Outstanding items from the code / UI-UX review. Line references are against
`master` at the time of writing and will drift — treat them as pointers, not
addresses.

Already merged and **not** repeated below: the EmailJS env refactor (#6), and
the four layout/state bugs plus the lint cleanup (#7).

Checked items below are done in the working tree. Everything else was
re-verified against the code on 2026-08-23 and is still outstanding.

---

## 1. Accessibility

The weakest area, and the one most likely to be caught by an automated
screening tool pointed at the site.

- [x] **Project cards are keyboard-unreachable.** ~~[`Projects.jsx:44`](src/components/Projects.jsx#L44)
      is a `div` with `onClick` — no `role`, no `tabIndex`, no key handler.
      Since the modal is the only place a project's GitHub and live links
      exist, a keyboard user cannot reach *any* project link.~~
      **Done:** card takes `role="button"` + `tabIndex={0}` + `aria-label`, a
      `handleProjectKeyDown` handler for Enter/Space (with `preventDefault` on
      Space so it does not scroll), and a `focus-visible` ring in `#9d6ef5`.
      Left as a `div` rather than a `<button>` because the card contains an
      `<h3>`, which is not valid button content. Note this only makes the card
      *reachable* — dismissing the modal from the keyboard is the item below.
- [ ] **The project modal is not a dialog.** [`Projects.jsx:80`](src/components/Projects.jsx#L80) —
      no `role="dialog"`, no `aria-modal`, no Escape handler, no
      backdrop-click close, no focus trap, no body scroll-lock, and focus is
      not returned to the originating card on close.
- [ ] **The hamburger is an SVG with `onClick`.** [`Navbar.jsx:116-121`](src/components/Navbar.jsx#L116-L121) —
      not focusable, no `aria-label`, no `aria-expanded`, no `aria-controls`.
      Wrap it in a real `button`.
- [ ] **`<a href="#id"><button>` nesting** in both navbar menus is invalid
      HTML (interactive inside interactive) and behaves unpredictably with
      assistive tech. Pick one: an anchor styled as a button, or a button that
      scrolls.
- [ ] **Contact form has no labels.** [`Contact.jsx:91-111`](src/components/Contact.jsx#L91-L111) —
      placeholder-only inputs, which disappear on typing and are not reliably
      announced. Add `<label>` (visually hidden is fine) and `autoComplete`
      (`email`, `name`).
- [ ] **Four stray `<h1>`s.** `About` owns the real one. `Skills` uses `h1`
      for the section title ([`Skills.jsx:21`](src/components/Skills.jsx#L21))
      where every other section uses `h2`, and `Contact` uses `h1` for three
      card labels ([`Contact.jsx:152`](src/components/Contact.jsx#L152),
      [`163`](src/components/Contact.jsx#L163),
      [`193`](src/components/Contact.jsx#L193)) that are not headings at all.
- [ ] **Contrast failures.** Measured against the actual backgrounds these
      sit on; all fail WCAG AA (4.5:1 normal text, 3:1 large):

      | colour | on | ratio | used for |
      |---|---|---|---|
      | `#3a3458` | `#050414` | **1.75** | services counter `/ 04`, inactive dots |
      | `#555572` | `#111118` | **2.62** | hero eyebrow, "Click any node…", node labels |
      | `#6C6C8A` | `#111118` | **3.71** | journey log text at 11px |
      | `#8245ec` | `#050414` | **3.88** | nav + footer link hover / active state |

      The accent one matters most: it is the only signal for which nav item is
      active. Lifting it to ~`#9d6ef5` clears 4.5:1 without changing the hue.
- [ ] **`target="_blank"` without `rel="noopener noreferrer"`** on the modal's
      VIEW CODE / LIVE links: [`Projects.jsx:124`](src/components/Projects.jsx#L124),
      [`131`](src/components/Projects.jsx#L131).

## 2. Performance

- [ ] **No image is lazy-loaded.** All 27 tech logos, 13 project screenshots
      and the timeline logos are eager `<img>`s
      ([`Skills.jsx:72`](src/components/Skills.jsx#L72),
      [`Projects.jsx:48`](src/components/Projects.jsx#L48),
      [`Experience.jsx:46`](src/components/Experience.jsx#L46) & `:70`,
      [`Education.jsx:46`](src/components/Education.jsx#L46) & `:68`).
      The comment in [`vite.config.js:14`](vite.config.js#L14) says these
      should be "lazily-fetched" — nothing lazy-loads them. Add
      `loading="lazy" decoding="async"` to everything below the fold.
      `width`/`height` are already set, so there is no CLS risk. **Highest
      value-per-effort change in this file.**
- [ ] **One 300kB JS chunk (94kB gzip), no splitting.** `@emailjs/browser`
      ([`Contact.jsx:2`](src/components/Contact.jsx#L2)) is only needed after
      a submit — move it to a dynamic `import()` inside `sendEmail`.
      `react-parallax-tilt` and `react-type-animation` are above the fold and
      should stay eager.
- [ ] **`backdrop-blur-md` over opaque `bg-gray-900`** composites a blur that
      can never be seen: [`Skills.jsx:46`](src/components/Skills.jsx#L46),
      [`Projects.jsx:45`](src/components/Projects.jsx#L45),
      [`Experience.jsx:62`](src/components/Experience.jsx#L62),
      [`Education.jsx:60`](src/components/Education.jsx#L60). Same for
      `hover:bg-black/5` on the Skills card, which is a visual no-op. Pure GPU
      cost — delete, or make the background translucent so the blur does
      something.
- [ ] **10 unused image assets** (~450kB) still in the repo: `react.svg` and
      `figma / netlify / springboot / gsap / angular / firebase / csharp /
      python / sass .png` under `src/assets/tech_logo/`. Not bundled, but they
      are repo weight and imply skills the site does not list.

## 3. SEO / metadata

- [ ] **No metadata at all** in [`index.html`](index.html): no
      `<meta name="description">`, no Open Graph or Twitter card (so every
      shared link renders as a bare URL), no canonical, no `theme-color`, no
      `Person` JSON-LD. No `robots.txt` or `sitemap.xml` either. For a
      portfolio whose whole job is being found and shared, this is the biggest
      gap outside accessibility.

## 4. Layout consistency

- [ ] **Content width jitters section to section.** `lg:px-[20vw]`
      (Skills, Contact, Footer) vs `lg:px-[14vw]` (Services, Projects) vs
      `lg:px-[4vw]` (Experience, Education). On a 1440px screen that is a
      576px → 115px swing, so the left edge visibly jumps while scrolling.
      Replace the `vw` padding with one shared `max-w-*` container and a
      single padding scale — this also removes a class of `vw`-padding
      fragility that has already caused bugs (see the note about fixed pill
      widths in `CLAUDE.md`).
- [ ] **Section dividers do not match.** `Skills` / `Projects` / `Services`
      use `<hr className="w-32 h-1 text-accent">`
      ([`Skills.jsx:22`](src/components/Skills.jsx#L22),
      [`Projects.jsx:24`](src/components/Projects.jsx#L24),
      [`Services.jsx:60`](src/components/services/Services.jsx#L60)), which
      renders a **1px** border in `currentColor` — `h-1` on an `hr` sets a
      height nothing paints. Experience / Education / Contact use
      `<div className="w-32 h-1 bg-purple-500">` and get the intended 4px
      bar. Pick one; the `div` is the one that works.
- [ ] **No scroll-spy.** The navbar's `active` state only updates on click, so
      it is wrong the moment anyone scrolls. `useInView` already exists —
      an observer over the sections is a ~20-line addition.
- [ ] **The nav list is duplicated** between `menuitems` in
      [`Navbar.jsx`](src/components/Navbar.jsx) and an inline array in
      [`Footer.jsx:23-30`](src/components/Footer.jsx#L23-L30), and the two
      have already drifted — **the footer is missing Contact.** Move it to
      `constants.js`.

## 5. UX / content

- [ ] **Scroll-to-top button is hard to actually use.**
      [`NavigatorToTop.jsx`](src/components/NavigatorToTop.jsx) shows it only
      *while* scrolling plus 1.5s, so it vanishes out from under the cursor.
      It also unmounts rather than fading (the `opacity-0` branch is
      unreachable), has no `aria-label`, and `md:w-[3.8%]`
      ([`:36`](src/components/NavigatorToTop.jsx#L36)) grows with viewport
      width against a fixed `h-14`. Show it past a scroll threshold and keep
      it there.
- [ ] **13 projects × up to 14 tags each** is a wall of pills. Consider
      "featured 6 + show more", and cap tags at 4-5 with a `+N` overflow.
- [ ] **Three email addresses** in one Contact card
      ([`Contact.jsx:167-186`](src/components/Contact.jsx#L167-L186)) is
      choice paralysis — pick one. The card's fixed `h-52` is already
      strained by the three-address stack.
- [ ] **Form field order** is Email → Name → Subject; Name first is
      conventional.
- [ ] **No spam protection** on the contact form — consider a honeypot field.
- [ ] **Footer copyright is hardcoded `© 2025`**
      ([`Footer.jsx:62`](src/components/Footer.jsx#L62)) and is now stale.
      Use `new Date().getFullYear()`.
- [ ] **Stale `heroStats` TODO.** [`constants.js:308`](src/constants.js#L308)
      still says "confirm these before the next deploy". Two stats sit in a
      `grid-cols-3`, leaving an empty third column on mobile — either add the
      third or change the grid.
- [ ] **Hardcoded service count.** [`Services.jsx:77`](src/components/services/Services.jsx#L77)
      uses `String(4)` instead of `services.length`.
- [ ] **Services "Pause" button always shows `⏸`**, even when its label reads
      "Resume".
- [ ] **The journey packet snaps back.** The settle step in
      `useJourneyAnimation` sets `activeStep(-1)` → `--pos: 0`, so the dot
      animates all the way back to the start after "200 OK". Leaving it at
      step 0 would read as "returned to the browser".

## 6. Visual polish

- [ ] **`border border-white`** on every card (Skills, Projects ×2,
      Experience, Education) is the heaviest stylistic choice on the page and
      reads dated next to the genuinely good hero and MERN-journey work.
      `border-white/10` plus the existing purple glow would match the newer
      sections.
- [ ] **Contact breaks the colour system**: `#ff0077` headings and a
      `from-purple-600 to-pink-500` gradient button are the only pink and the
      only gradient CTA on an otherwise purple site.
- [ ] **Competing motion in Skills.** The card lifts on hover
      (`hover:-translate-y-2`) while the `Tilt` inside rotates 20° and scales
      1.05 ([`Skills.jsx:55`](src/components/Skills.jsx#L55)), with
      `gyroscope={true}` ([`:60`](src/components/Skills.jsx#L60)) so it also
      reacts to phone tilt. Two transforms fighting over one hover.
- [ ] **Body copy is set heavy.** Section descriptions use
      `text-lg font-semibold` for what is running prose; regular weight would
      let the headings lead.

## 7. Code health

- [ ] **Four separate `prefers-reduced-motion` implementations**:
      [`useInView.js`](src/animation/useInView.js),
      [`useScrollProgress.js`](src/animation/useScrollProgress.js),
      `About`'s local `useReducedMotion`, and `useServiceLoop`'s ref-based
      one. One shared hook in `src/animation/` would match how the rest of
      that directory is factored.
- [ ] **`CLAUDE.md` is stale in two places**: it says `react-router-dom` and
      `react-scroll` are "installed but unused" (they are no longer in
      `package.json` at all), and it calls the `BlurBlob` + grid layer a
      "fixed background layer" when both are `absolute` and scroll away with
      the page.
- [ ] **No test runner.** Not necessarily worth adding for a portfolio, but
      the two bugs fixed in #7 were both the kind a single render test would
      have caught.

---

## Suggested order

1. Accessibility (§1) — most impact, mostly mechanical.
2. Lazy-load images + lazy EmailJS (§2) — biggest perf win for the effort.
3. SEO head block (§3) — small, self-contained, high value for a portfolio.
4. Layout unification (§4) — the container refactor touches every section, so
   do it in one pass rather than piecemeal.
5. UX/content and polish (§5, §6).
6. Code health (§7).
