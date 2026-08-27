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

~~The weakest area, and the one most likely to be caught by an automated
screening tool pointed at the site.~~ **All items in this section are now
done** (verified with `npm run lint` and a production build on 2026-08-25).

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
- [x] **The project modal is not a dialog.** ~~[`Projects.jsx:80`](src/components/Projects.jsx#L80) —
      no `role="dialog"`, no `aria-modal`, no Escape handler, no
      backdrop-click close, no focus trap, no body scroll-lock, and focus is
      not returned to the originating card on close.~~
      **Done:** panel now has `role="dialog"`, `aria-modal="true"`, and
      `aria-labelledby` pointing at the title; an effect locks body scroll,
      focuses the first focusable element, traps Tab/Shift+Tab inside the
      panel, closes on Escape, and returns focus to the card that opened it.
      Backdrop click also closes.
- [x] **The hamburger is an SVG with `onClick`.** ~~[`Navbar.jsx:116-121`](src/components/Navbar.jsx#L116-L121) —
      not focusable, no `aria-label`, no `aria-expanded`, no `aria-controls`.
      Wrap it in a real `button`.~~
      **Done:** icon is now inside a `<button type="button">` with
      `aria-label`, `aria-expanded`, and `aria-controls="mobile-menu"`, wired
      to the mobile panel's new `id="mobile-menu"`.
- [x] **`<a href="#id"><button>` nesting** ~~in both navbar menus is invalid
      HTML (interactive inside interactive) and behaves unpredictably with
      assistive tech. Pick one: an anchor styled as a button, or a button that
      scrolls.~~
      **Done:** the anchor kept the `href` and the inner `<button>` went, in
      both the desktop `<ul>` and the mobile sheet. Each link now carries its
      own `onClick` (the handler that sets `active`, and on mobile also closes
      the sheet), `aria-current` when active, and a `focus-visible` outline —
      the nesting had left the desktop links with no visible focus state at
      all. Also fixed while in there: the mobile menu mapped bare `<a>`
      elements as direct children of a `<ul>`, which is equally invalid; they
      are wrapped in `<li>` now.
- [x] **Contact form has no labels.** ~~[`Contact.jsx:91-111`](src/components/Contact.jsx#L91-L111) —
      placeholder-only inputs, which disappear on typing and are not reliably
      announced. Add `<label>` (visually hidden is fine) and `autoComplete`
      (`email`, `name`).~~
      **Done:** all four fields (including the `<textarea>`, which the range
      above missed) get an `sr-only` `<label htmlFor>` against a new `id`, and
      `autoComplete` is `email` / `name` / `off`. Also replaced
      `focus:outline-none focus:border-purple-500`: a 1px border-colour change
      was the only focus indicator on the whole form, so the fields now take
      the same `focus-visible` outline as the nav links.
      Not done: reordering to Name → Email, which is the separate §5 item.
- [x] **Four stray `<h1>`s.** ~~`About` owns the real one. `Skills` uses `h1`
      for the section title ([`Skills.jsx:21`](src/components/Skills.jsx#L21))
      where every other section uses `h2`, and `Contact` uses `h1` for three
      card labels ([`Contact.jsx:152`](src/components/Contact.jsx#L152),
      [`163`](src/components/Contact.jsx#L163),
      [`193`](src/components/Contact.jsx#L193)) that are not headings at all.~~
      **Done, but the three Contact labels became `h3`, not plain text.**
      "Where to find me" / "Email me at" / "Call me at" each name the block
      that follows it, so they *are* headings — the bug was the level, not the
      element. `h3` is what the sibling form card in the same section already
      uses under the `h2 CONTACT`, so the outline is now h2 → h3 ×4 with no
      skipped level. `Skills` is `h2`, matching every other section. `About`
      keeps the page's only `h1`.
- [x] **Contrast failures.** Measured against the actual backgrounds these
      sit on; all fail WCAG AA (4.5:1 normal text, 3:1 large):

      | colour | on | ratio | used for |
      |---|---|---|---|
      | `#3a3458` | `#050414` | **1.75** | services counter `/ 04`, inactive dots |
      | `#555572` | `#111118` | **2.62** | hero eyebrow, "Click any node…", node labels |
      | `#6C6C8A` | `#111118` | **3.71** | journey log text at 11px |
      | `#8245ec` | `#050414` | **3.88** | nav + footer link hover / active state |

      The accent one matters most: it is the only signal for which nav item is
      active. Lifting it to ~`#9d6ef5` clears 4.5:1 without changing the hue.

      **Done — all four ratios above were re-measured and were exact.** Fixes,
      and two corrections to the table:

      - `#8245ec` → new `--color-accent-text: #9d6ef5` token (5.79:1).
        **It could not simply replace `--color-accent`:** white on `#9d6ef5`
        is only 3.51:1, so lifting the shared token would have broken every
        `bg-accent` button in the other direction. The two are now separate —
        `--color-accent` for fills and borders, `--color-accent-text` for text
        and icons on a dark ground — and that constraint is commented in
        `theme.css` so they don't get merged later.
      - **The footer was not affected.** It uses `text-purple-500`
        (`#a855f7`, 5.13:1), which already passes; only `Navbar.jsx` had the
        raw `#8245ec` as text. The row overstated the scope.
      - `#555572` → `--color-hero-muted` lifted to `#7a7a9c` (4.56:1). This
        was the widest fix — the literal appeared in nine components, all now
        using the `text-hero-muted` utility instead of an arbitrary value.
      - `#6C6C8A` → folded into the existing `--color-hero-dim` (`#8c8caa`,
        5.77:1) rather than into `muted`. It was the *brighter* of the two
        failing greys, so mapping both to one value would have flattened a
        deliberate two-tier hierarchy into a single tone.
      - `#3a3458` → `#796faa` (4.51:1) for the services counter and inactive
        dots. Left alone at `#3a3458` in one place: the
        `.service-stack-card:hover` border in `animations.css`, which is a
        decorative hover edge, not a state indicator, and is not text.
- [x] **`target="_blank"` without `rel="noopener noreferrer"`** ~~on the modal's
      VIEW CODE / LIVE links: [`Projects.jsx:124`](src/components/Projects.jsx#L124),
      [`131`](src/components/Projects.jsx#L131).~~
      **Done.** Those two were the only ones actually missing it; the other
      four `_blank` links (`About`, `Navbar` ×2, `Footer`) already had it,
      though the two in `Navbar` had it as `rel=" noopener noreferrer"` with
      a leading space — harmless, since the value is space-separated tokens,
      but tidied. Audited: all six `_blank` sites now carry `rel`.

## 2. Performance

- [x] **No image is lazy-loaded.** ~~All 27 tech logos, 13 project screenshots
      and the timeline logos are eager `<img>`s
      ([`Skills.jsx:72`](src/components/Skills.jsx#L72),
      [`Projects.jsx:48`](src/components/Projects.jsx#L48),
      [`Experience.jsx:46`](src/components/Experience.jsx#L46) & `:70`,
      [`Education.jsx:46`](src/components/Education.jsx#L46) & `:68`).
      The comment in [`vite.config.js:14`](vite.config.js#L14) says these
      should be "lazily-fetched" — nothing lazy-loads them. Add
      `loading="lazy" decoding="async"` to everything below the fold.
      `width`/`height` are already set, so there is no CLS risk. **Highest
      value-per-effort change in this file.**~~
      **Done:** `loading="lazy" decoding="async"` added to all six `<img>`
      sites above (skill logos, both timeline-logo spots in Experience and
      Education, and the project card thumbnail). The project modal's image
      is left eager since it only renders after a click and reuses the same
      already-fetched URL as its card.
- [x] **One 300kB JS chunk (94kB gzip), no splitting.** ~~`@emailjs/browser`
      ([`Contact.jsx:2`](src/components/Contact.jsx#L2)) is only needed after
      a submit — move it to a dynamic `import()` inside `sendEmail`.
      `react-parallax-tilt` and `react-type-animation` are above the fold and
      should stay eager.~~
      **Done, but the diagnosis above was wrong about where the weight is.**
      `@emailjs/browser` is now a dynamic `import()` inside `sendEmail`
      ([`Contact.jsx:49`](src/components/Contact.jsx#L49)) — it splits out
      cleanly, but it was only **2.3kB** of the entry chunk, not the ~50kB
      the SDK's install size suggests. Measured module contributions to the
      old chunk: `react-dom` 531kB raw, `react` 18kB, `scheduler` 11kB —
      i.e. React *is* the 300kB, and `constants.js` (24kB) is the largest
      first-party module. There is no dependency left to remove.
      So the split that pays is a caching one: `manualChunks` now emits
      `react` (186kB / 58kB gzip, byte-identical between deploys) separately
      from the app chunk (112kB / 35kB gzip). Total transfer is unchanged
      (~+1kB of chunk overhead), but a returning visitor after a content
      edit re-downloads 35kB instead of 94kB. `react-parallax-tilt` and
      `react-type-animation` stayed eager as noted — both are used by
      `About`, above the fold.
      Not done: `React.lazy` on the below-the-fold sections. It would move
      ~50kB of app code off the first request, but every section is inside
      the same scroll column and gated by the `IntersectionObserver` reveal
      system, so a suspended section would land as a blank gap mid-scroll.
      Worth revisiting only with a real skeleton per section.
- [x] **`backdrop-blur-md` over opaque `bg-gray-900`** ~~composites a blur that
      can never be seen: [`Skills.jsx:46`](src/components/Skills.jsx#L46),
      [`Projects.jsx:45`](src/components/Projects.jsx#L45),
      [`Experience.jsx:62`](src/components/Experience.jsx#L62),
      [`Education.jsx:60`](src/components/Education.jsx#L60). Same for
      `hover:bg-black/5` on the Skills card, which is a visual no-op. Pure GPU
      cost — delete, or make the background translucent so the blur does
      something.~~
      **Done — deleted, and there were five sites, not four:** this list
      missed the project modal panel
      ([`Projects.jsx:153`](src/components/Projects.jsx#L153)), which is the
      same opaque `bg-gray-900`. The two remaining `backdrop-blur` uses are
      both in `Navbar.jsx` (`bg-[#050414]/70`, `bg-black/60`) — those are
      genuinely translucent and were left alone.
      Verified rather than assumed: rendering here is deterministic (two
      runs of identical code diff to zero pixels), so before/after captures
      are directly comparable. On a flat card surface only 10 of 5760 pixels
      differ and the sampled surface colour is `rgb(16 24 40)` either way —
      the blur really was invisible. Border and page-background regions
      differ by at most 1/255. The one real difference is **text
      antialiasing** across each section (deltas up to ~113 on glyph edges,
      no reflow — card and track geometry are byte-identical at
      `track=996`, `cards=454x456,478x456`), which is the expected
      consequence of dropping the compositor layer that `backdrop-filter`
      forced. Sharper text, one less layer.
      **`hover:bg-black/5` was not a no-op** — worth correcting, because the
      reason matters. It is a `background-color`, so it *replaced*
      `bg-gray-900` on hover rather than tinting it; measured, the card
      surface went from `rgb(16 24 40)` to `rgb(6 3 22)` — i.e. the page
      colour. The card lost its whole surface on hover and receded, and that
      transparency was the only moment the blur was ever visible. Removed
      with the blur; the `hover:-translate-y-2` lift is the affordance.
- [x] **10 unused image assets** (~450kB) still in the repo: `react.svg` and
      `figma / netlify / springboot / gsap / angular / firebase / csharp /
      python / sass .png` under `src/assets/tech_logo/`. Not bundled, but they
      are repo weight and imply skills the site does not list.

## 3. SEO / metadata

- [x] **No metadata at all** ~~in [`index.html`](index.html): no
      `<meta name="description">`, no Open Graph or Twitter card (so every
      shared link renders as a bare URL), no canonical, no `theme-color`, no
      `Person` JSON-LD. No `robots.txt` or `sitemap.xml` either. For a
      portfolio whose whole job is being found and shared, this is the biggest
      gap outside accessibility.~~
      **Done:** Full SEO head block added to `index.html`:
      - `<title>` updated to "Raghuveer Sharma — Full-Stack MERN Developer"
      - `<meta name="description">` with a keyword-rich summary
      - `<meta name="author">`, `<meta name="keywords">`
      - `<link rel="canonical">`, `<meta name="theme-color">` (#050414),
        `<meta name="color-scheme">` (dark)
      - Full Open Graph tags: `og:type`, `og:url`, `og:title`,
        `og:description`, `og:image` (with width/height/alt), `og:locale`,
        `og:site_name`
      - Twitter Card: `summary_large_image` with title, description, image,
        and alt text
      - JSON-LD `Person` schema with `name`, `url`, `image`, `jobTitle`,
        `description`, `sameAs` (GitHub, LinkedIn, LeetCode), and
        `knowsAbout` (11 technologies)
      - Generated `og-image.png` (1024×1024, dark hero-style card) placed in
        `public/`
      - `public/robots.txt` — allows all crawlers, references sitemap
      - `public/sitemap.xml` — single `<url>` for the SPA root
      All URLs currently use `raghuveersharma.vercel.app` as the domain —
      update the canonical, OG, Twitter, JSON-LD, robots.txt, and sitemap
      URLs when the real domain is known.

## 4. Layout consistency

- [x] **Content width jitters section to section.** ~~`lg:px-[20vw]`
      (Skills, Contact, Footer) vs `lg:px-[14vw]` (Services, Projects) vs
      `lg:px-[4vw]` (Experience, Education). On a 1440px screen that is a
      576px → 115px swing, so the left edge visibly jumps while scrolling.
      Replace the `vw` padding with one shared `max-w-*` container and a
      single padding scale — this also removes a class of `vw`-padding
      fragility that has already caused bugs (see the note about fixed pill
      widths in `CLAUDE.md`).~~
      **Done:** every section (Skills, Services, Experience, Projects,
      Education, Contact, Footer) and the Navbar now use the same inner
      container: `mx-auto w-full max-w-[1100px] px-6 md:px-10`. The About
      hero was already using a `max-w` approach and was aligned to the same
      `1100px`. All scattered `px-[12vw] md:px-[7vw] lg:px-[Nvw]` values
      have been removed. The mobile menu's `left-4 right-4 sm:left-[6vw]`
      positioning was also simplified to `inset-x-0` since the parent
      container already constrains its width.
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
- [x] **The nav list is duplicated** between `menuitems` in
      [`Navbar.jsx`](src/components/Navbar.jsx) and an inline array in
      [`Footer.jsx:23-30`](src/components/Footer.jsx#L23-L30), and the two
      have already drifted — **the footer is missing Contact.** Move it to
      `constants.js`.

## 5. UX / content

- [x] **Scroll-to-top button is hard to actually use.** ~~[`NavigatorToTop.jsx`](src/components/NavigatorToTop.jsx) shows it only
      *while* scrolling plus 1.5s, so it vanishes out from under the cursor.
      It also unmounts rather than fading (the `opacity-0` branch is
      unreachable), has no `aria-label`, and `md:w-[3.8%]`
      ([`:36`](src/components/NavigatorToTop.jsx#L36)) grows with viewport
      width against a fixed `h-14`. Show it past a scroll threshold and keep
      it there.~~
      **Done:** Kept the behavior where it shows when scrolling and hides on idle, but increased the timeout to 2 seconds. The button now mounts permanently and uses CSS transforms and opacity to slide in/out without vanishing instantly. Sizing is now a fixed `w-12 h-12` instead of viewport percentage to stop it stretching on wide screens, and it carries an `aria-label` and toggles `tabIndex` to keep it out of the focus order when hidden.
- [ ] **13 projects × up to 14 tags each** is a wall of pills. Consider
      "featured 6 + show more", and cap tags at 4-5 with a `+N` overflow.
- [ ] **GymFlow Project Image Broken**: The thumbnail image for the GymFlow project
      fails to render across all viewport sizes (shows broken image icon).
- [ ] **Three email addresses** in one Contact card
      ([`Contact.jsx:167-186`](src/components/Contact.jsx#L167-L186)) is
      choice paralysis — pick one. The card's fixed `h-52` is already
      strained by the three-address stack.
- [ ] **Form field order** is Email → Name → Subject; Name first is
      conventional.
- [ ] **No spam protection** on the contact form — consider a honeypot field.
- [x] **Footer copyright is hardcoded `© 2025`**
      ([`Footer.jsx:62`](src/components/Footer.jsx#L62)) and is now stale.
      Use `new Date().getFullYear()`.
- [x] **Stale `heroStats` TODO.** [`constants.js:308`](src/constants.js#L308)
      still says "confirm these before the next deploy". Two stats sit in a
      `grid-cols-3`, leaving an empty third column on mobile — either add the
      third or change the grid.
- [x] **Hardcoded service count.** [`Services.jsx:77`](src/components/services/Services.jsx#L77)
      uses `String(4)` instead of `services.length`.
- [x] **Services "Pause" button always shows `⏸`**, even when its label reads
      "Resume".
- [x] **The journey packet snaps back.** The settle step in
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

- [x] **Four separate `prefers-reduced-motion` implementations**:
      [`useInView.js`](src/animation/useInView.js),
      [`useScrollProgress.js`](src/animation/useScrollProgress.js),
      `About`'s local `useReducedMotion`, and `useServiceLoop`'s ref-based
      one. One shared hook in `src/animation/` would match how the rest of
      that directory is factored.
- [x] **`CLAUDE.md` is stale in two places**: it says `react-router-dom` and
      `react-scroll` are "installed but unused" (they are no longer in
      `package.json` at all), and it calls the `BlurBlob` + grid layer a
      "fixed background layer" when both are `absolute` and scroll away with
      the page.
- [ ] **No test runner.** Not necessarily worth adding for a portfolio, but
      the two bugs fixed in #7 were both the kind a single render test would
      have caught.

## 8. Responsiveness & Mobile

- [x] **Services Cycle Graphic Cut-off**: ~~At mobile viewports (e.g. 375px), the
      circular track is cut off at the top (appears as a U-shape) and the top node
      ("Frontend Engineering" icon) is missing entirely, showing only 3 of 4 nodes.~~
      **Done:** the `.service-circle-track` container had no padding, so nodes
      positioned at the circle boundary overflowed — the top node at `y ≈ 10%`
      with `translate(-50%, -50%)` lifted half its box above the container's
      top edge. Added `padding: calc(var(--svc-circle-node-size) / 2)` to give
      every cardinal node room; the calc tracks the same CSS variable the
      nodes use, so the fix scales across the three breakpoints (38 / 42 /
      46px). Verified at 320px, 375px, 768px, and 1440px — all four nodes are
      fully visible at every width.
- [ ] **Experience Timeline Left-aligned**: At mobile and tablet viewports
      (e.g. 375px, 768px), the timeline switches to a single column but is pushed
      too far left, causing the circle logo icons to be cut off by the left
      screen boundary.
- [ ] **Education Section Sticky Header Overlap**: When navigating directly to the
      Education section via mobile links, the sticky header overlaps the top card.

---

## Suggested order

1. ~~Accessibility (§1)~~ — done.
2. ~~Lazy-load images + lazy EmailJS (§2)~~ — done.
3. ~~SEO head block (§3)~~ — done.
4. **Remaining layout items (§4) — next.** Section dividers and scroll-spy.
5. Responsiveness & Mobile (§8).
6. UX/content and polish (§5, §6).
7. Code health (§7).
