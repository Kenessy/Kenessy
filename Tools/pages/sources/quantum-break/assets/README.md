# Quantum Break Journey Images

This directory is the source-of-truth handoff for generated Quantum Break journal images.

Default format: `16:9` landscape PNG.

Drop generated images into `docs/assets/img/quantum-break/` using the exact filenames in `panel-manifest.json`, then run:

```powershell
npm run qa:qb-assets
```

This non-strict check allows missing images, but validates every image that exists. Before wiring Page 01 into the journey, run:

```powershell
npm run qa:qb-assets:strict
```

That strict check requires the four current Page 01 images, validates PNG headers, checks near-16:9 dimensions, and writes checkpoint state to `.cache/qb-asset-qa/latest.json`.

After the strict check passes, update `Tools/pages/sources/quantum-break/journey.html` to swap the matching placeholder frame for an image.

Current Page 01 targets:
- `qb-page-01-a-university-exterior.png`
- `qb-page-01-b-paul-corridor.png`
- `qb-page-01-c-science-primer.png`
- `qb-page-01-d-will-shadow.png`

Next-page candidates:
- `qb-page-02-a-airlock-threshold.png`
- `qb-page-02-b-first-anomaly.png`
