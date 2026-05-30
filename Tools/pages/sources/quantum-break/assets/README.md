# Quantum Break Journey Images

This directory is the source-of-truth handoff for generated Quantum Break journal images.

Default format: `16:9` landscape PNG.

Art direction guardrails:
- Keep one coherent cinematic sci-fi comic style across the full page.
- Keep silhouettes, faces, and time effects readable at small mobile widths.
- Avoid large non-diegetic typography, logos, fake UI overlays, or captions inside the image.
- Prefer dark university/lab mood, blue chronon light, amber emergency contrast, and clean composition.

Drop generated images into `docs/assets/img/quantum-break/` using the exact filenames in `panel-manifest.json`, then run the build so the journey page auto-wires any matching manifest files:

```powershell
npm run build:metro
```

Then run:

```powershell
npm run qa:qb-assets
```

This non-strict check allows missing images, validates every image that exists, and verifies that generated journey HTML only references image files that are actually present. Before treating Page 01 as image-complete, run:

```powershell
npm run qa:qb-assets:strict
```

That strict check requires the four current Page 01 images, validates PNG headers, checks near-16:9 dimensions, verifies the auto-wired journey markup, and writes checkpoint state to `.cache/qb-asset-qa/latest.json`.

Do not manually swap placeholder frames in `Tools/pages/sources/quantum-break/journey.html`. Keep stable `data-qb-slot` markers there; `npm run build:metro` performs the image wiring from the manifest.

Current Page 01 targets:
- `qb-page-01-a-university-exterior.png`
- `qb-page-01-b-paul-corridor.png`
- `qb-page-01-c-science-primer.png`
- `qb-page-01-d-will-shadow.png`

Next-page candidates:
- `qb-page-02-a-airlock-threshold.png`
- `qb-page-02-b-first-anomaly.png`
