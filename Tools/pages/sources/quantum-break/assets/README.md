# Quantum Break Journey Images

This directory is the source-of-truth handoff for generated Quantum Break journal images.

Default format: `16:9` landscape PNG.

Shared prompt base:

```text
16:9 cinematic sci-fi comic panel for a Quantum Break illustrated playthrough journal. Use one coherent cinematic sci-fi comic style across every panel: dark Riverport university or lab mood, blue chronon light, amber emergency contrast, grounded human silhouettes, clean composition, and readable story action at mobile width.
```

Negative prompt:

```text
Avoid large non-diegetic typography, fake UI overlays, logos, captions, unreadable screen text, over-busy time distortion, abstract noise, or composition that hides the story beat.
```

Art direction guardrails:
- Keep one coherent cinematic sci-fi comic style across the full page.
- Keep silhouettes, faces, and time effects readable at small mobile widths.
- Avoid large non-diegetic typography, logos, fake UI overlays, or captions inside the image.
- Prefer dark university/lab mood, blue chronon light, amber emergency contrast, and clean composition.

Page 01 prompts:
- `qb-page-01-a-university-exterior.png`: Riverport University before dawn, cold air, protest pressure near the campus entrance, cinematic sci-fi thriller mood. Use a wide establishing shot with a readable campus silhouette. Avoid fake logos or large protest text.
- `qb-page-01-b-paul-corridor.png`: Paul Serene leading Jack through a clean research corridor, controlled secrecy, blue tech light, restrained corporate lab atmosphere. Use two-character walk-and-talk framing. Avoid weapons focus or heavy typography on screens.
- `qb-page-01-c-science-primer.png`: Project Promenade presentation moment, black-hole or field-primer visual, screen glow on observers, lab context still readable. Keep the diagram abstract. Avoid real equations or giant nonsense words.
- `qb-page-01-d-will-shadow.png`: Subtle family tension and Will Joyce foreshadowing through documents, screens, an empty chair, or environmental traces. Use a quiet detail shot. Avoid spoiler-heavy imagery or readable legal text.

Next-page candidates:
- `qb-page-02-a-airlock-threshold.png`: Jack and Paul at the machine threshold, clean tech door, the experiment still controlled but visibly about to cross into danger.
- `qb-page-02-b-first-anomaly.png`: Time fracture beginning, readable distortion, strong silhouettes, cinematic spectacle without visual confusion.

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
