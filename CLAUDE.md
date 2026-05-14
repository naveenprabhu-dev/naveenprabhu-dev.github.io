# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

- `npm run dev` — start dev server at http://localhost:3000
- `npm run build` — production build
- `npm run start` — serve the production build
- `npm run lint` — ESLint (flat config in `eslint.config.mjs`, extends `eslint-config-next/core-web-vitals` and `eslint-config-next/typescript`)

No test runner is configured.

## Stack

- Next.js App Router with React 18 and TypeScript (`strict: true`)
- Tailwind CSS with a custom dark/neon theme
- Path alias `@/*` → `./src/*`

Version mismatches to be aware of: `next@14.2.15` is installed, but `eslint-config-next@16` (different major) — keep this in mind if lint config behaves unexpectedly. The repo also contains both `postcss.config.js` (Tailwind v3 style: `tailwindcss` + `autoprefixer`) and `postcss.config.mjs` (Tailwind v4 style: `@tailwindcss/postcss`); only one is active per Next's resolution order. Reconcile these before changing PostCSS behavior.

## Architecture

Single-page portfolio. `src/app/page.tsx` composes section components from `src/components/`: `Navbar`, `Hero` (+ `ExperienceItem`), `Projects` (+ `ProjectCard`), `ChessSection`, `Footer`. Navigation is in-page anchors (`#home`, `#about`, `#experience`, `#projects`, `#chess`).

`src/app/layout.tsx` is the root layout: it loads IBM Plex Mono via `next/font/google` (exposed as the `--font-ibm-plex-mono` CSS variable), sets the body's mono font, and renders a single fixed `crt-overlay` div over the whole page.

## Styling conventions

`src/app/globals.css` defines reusable visual primitives the components rely on — prefer reusing these over inventing equivalents:
- `.glass` — translucent dark panel with blur and a neon-blue bottom border (Navbar, Hero card, ExperienceItem, ChessSection, Footer)
- `.glow-blue` / `.glow-mint` — static box-shadow glow
- `.hover-glow-blue` / `.hover-glow-mint` — glow on hover
- `.text-glow-blue` / `.text-glow-mint` — text-shadow glow
- `.crt-overlay` — fixed scanline overlay, applied once in the root layout

Theme tokens live in `tailwind.config.js`: `background` (#0e131f), `foreground` (#ededed), `neon-blue` (#1faaff), `neon-mint` (#c4ebc8). Use the named tokens instead of hex literals.

## Out of scope

`_vanilla_backup/` is the previous static-HTML version kept for reference — do not edit it as part of work on the Next app.
