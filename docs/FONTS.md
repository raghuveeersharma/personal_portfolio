# Typography

The page is set in a serif. That decision lives in exactly two places:

| Where                              | What it does                                              |
| ---------------------------------- | --------------------------------------------------------- |
| `src/styles/theme.css`             | declares `--font-serif` / `--font-sans` and applies the serif to `body` |
| `index.html`                       | the single `<link>` that actually downloads a webfont      |

Components never name a font family. They inherit the serif, and use the
`font-sans` utility only to step out of it for micro-copy (tags, dates,
button labels, the copyright line).

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

3. Delete the Newsreader `<link>` (and both `preconnect`s) from
   `index.html`.

The `--font-serif` stack itself needs no edit — it already prefers
`Copernicus`.

## Rules

- **One webfont request.** The page currently makes exactly one. Adding a
  second means removing one, or self-hosting. Newsreader is variable, so
  every weight and optical size on the page comes from that one file — do
  not add per-weight requests.
- `--font-sans` is a pure system stack and costs nothing. Keep it that way
  unless Styrene gets self-hosted too.
- Newsreader runs loose at display sizes; `theme.css` tightens `h1`–`h3`
  with `letter-spacing: -0.02em`. Match that if you add new display text.
