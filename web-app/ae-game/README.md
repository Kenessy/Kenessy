# Apocalypse Express — Web Game

Single-player interactive fiction adaptation of the Apocalypse Express tabletop campaign.

## Stack

- **Next.js 16** + TypeScript
- **inkjs** — Ink narrative engine
- **Zustand** — Game state management
- **Tailwind CSS v4** — Styling
- **Howler.js** — Audio (planned)

## Getting Started

```bash
npm install
npm run dev
```

The `predev` script automatically compiles all `.ink` files to `.json` before starting the dev server.

## Adding New Scenes

1. Write the scene in `src/ink/YourScene.ink`
2. Run `npm run ink:compile` to compile to JSON
3. Import the JSON in `page.tsx` and wire up the `InkEngine`

## Project Structure

```
src/
├── app/          — Next.js App Router pages
├── components/   — UI components
├── engine/       — Ink runtime wrapper + dice roller
├── store/        — Zustand game state
├── types/        — TypeScript types (full AE rule system)
└── ink/          — .ink scenes + compiled .json files
scripts/
└── compile-ink.mjs  — .ink → .json compiler
```
