# Raghuveer Sharma — Portfolio

A responsive personal portfolio built with React and Vite. It includes
project detail routes, a three-state light/dark/system theme preference,
accessible scroll-driven motion, an interactive MERN request journey, and an
EmailJS contact form.

## Stack

- React 19, React Router, and Vite 6
- Tailwind CSS v4, configured through CSS tokens and `@tailwindcss/vite`
- EmailJS for contact-form delivery (loaded only on form submission)
- Vercel deployment configuration

## Run locally

Requires Node.js 18 or newer.

```bash
npm install
cp .env.example .env
npm run dev
```

Open the local URL printed by Vite (normally `http://localhost:5173`).

## Environment variables

Use `.env.example` as the template for local values. `VITE_*` values are
compiled into the browser bundle, so only put public URLs and EmailJS's
publishable identifiers in them.

| Variable | Purpose |
| --- | --- |
| `VITE_RESUME_URL` | Public resume URL |
| `VITE_GITHUB_URL` | GitHub profile URL |
| `VITE_LINKEDIN_URL` | LinkedIn profile URL |
| `VITE_TWITTER_URL` | Twitter/X profile URL |
| `VITE_INSTAGRAM_URL` | Instagram profile URL |
| `VITE_LEETCODE_URL` | LeetCode profile URL |
| `VITE_EMAIL_URL` | Contact `mailto:` link |
| `VITE_EMAILJS_SERVICE_ID` | EmailJS service ID |
| `VITE_EMAILJS_TEMPLATE_ID` | EmailJS template ID |
| `VITE_EMAILJS_PUBLIC_KEY` | EmailJS public key |

Without the three EmailJS variables, the contact form safely shows its direct
email fallback instead of attempting a request.

## Commands

```bash
npm run dev             # Start the development server
npm run build           # Create a production build in dist/
npm run preview         # Serve the production build locally
npm run lint            # Run ESLint
npm run audit:contrast  # Check theme-token contrast ratios
```

## Project structure

```text
src/
  components/   Portfolio sections and shared UI
  pages/        Home page and /project/:id detail route
  animation/    Reveal, stagger, and scroll-progress primitives
  theme/        Theme preference, persistence, and provider
  styles/       Theme tokens and animation styles
  constants.js  Portfolio content and asset imports
docs/           Typography and theming implementation notes
```

## Notes for contributors

- Content collections and navigation links live in `src/constants.js`.
- Theme colours are semantic CSS tokens in `src/styles/theme.css`; do not add
  component-local colour literals for themeable UI.
- The dark theme is the baseline. See [docs/THEMING.md](docs/THEMING.md) for
  token conventions and known visual verification follow-ups.
- See [CLAUDE.md](CLAUDE.md) for the detailed architecture and motion rules.
