# Typography

The page is set in a serif. That decision lives in exactly two places:

| Where                              | What it does                                              |
| ---------------------------------- | --------------------------------------------------------- |
| `src/styles/theme.css`             | declares the four family tokens and applies the serif to `body` |
| `index.html`                       | the single `<link>` that actually downloads webfonts       |

| Token            | Utility        | Face        | Used for                              |
| ---------------- | -------------- | ----------- | ------------------------------------- |
| `--font-serif`   | inherited      | Newsreader  | the whole page by default             |
| `--font-sans`    | `font-sans`    | Inter       | micro-copy: tags, dates, badges       |
| `--font-display` | `font-display` | Syne        | the hero name, and nothing else       |
| `--font-mono`    | `font-mono`    | Fira Code   | the hero's code panel                 |

Outside the hero, components never name a font family. They inherit the
serif and use `font-sans` only to step out of it for micro-copy. The hero
is the one section that sets type deliberately — it is a different kind of
object from the rest of the page.

## Why the stack looks like that

```css
--font-serif: "Copernicus", "Tiempos Text", "Newsreader", ui-serif, Georgia, …;
```

Anthropic sets its own products in **Copernicus** (display) and **Tiempos
Text** (reading), with **Styrene** as the sans. All three are commercially
licensed — they cannot be pulled from a CDN, and this repo does not ship
them.

So the stack names them *first* but does not fetch them, and falls through
to **Newsreader** — a free transitional serif with the same high x-height
and a real optical-size axis, which is the closest open face to that look.
Newsreader is what renders today.

The payoff: the day you license the real thing, you drop the files in and
change nothing else.

## Swapping in the licensed faces

1. Put the woff2 files in `public/fonts/`.
2. Add the `@font-face` blocks to `src/styles/theme.css`, above the
   `@theme` block:

   ```css
   @font-face {
     font-family: "Copernicus";
     src: url("/fonts/copernicus-variable.woff2") format("woff2-variations");
     font-weight: 300 800;
     font-display: swap;
   }
   ```

3. Drop `&family=Newsreader:…` from the `<link>` URL in `index.html`. The
   other three families stay.

The `--font-serif` stack itself needs no edit — it already prefers
`Copernicus`.

## Rules

- **One request.** The page makes exactly one stylesheet request; the four
  families are asked for in a single `css2` URL. Add a family by extending
  that URL, never by adding a second `<link>`.
- **Pin the weights.** Newsreader is variable, so every weight and optical
  size comes from one file. The other three are requested at fixed weights
  (Syne 700/800, Inter 400/500/600, Fira Code 400/500) — widening those
  ranges is what actually costs bytes, not the family count.
- **Dropping a face is cheap.** Each one falls through to a sane stack:
  Inter → system UI sans, Fira Code → `ui-monospace`, Syne → Inter. Remove
  the family from the URL and the page still renders correctly, just
  plainer. Syne is the only one whose absence is obvious.
- Newsreader runs loose at display sizes; `theme.css` tightens `h1`–`h3`
  with `letter-spacing: -0.02em`. Match that if you add new display text.
