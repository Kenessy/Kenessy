# Quantum Break Scrapbook Photo Evidence

This directory is the source-of-truth handoff for generated Quantum Break journal images.

The current layout is a dark dossier / notebook / scrapbook reader. It does not need four to eight visual slots per page. Use 1-3 attached photos only when the page benefits from visual evidence.

Default format: `16:9` landscape PNG.

Shared prompt base:

```text
16:9 cinematic sci-fi dossier photo for a Quantum Break illustrated journal. Use a coherent yellow-white-black Quantum Break palette with neutral muted tones, dark laboratory or Riverport environment mood, amber/white chronon fracture light, grounded human silhouettes, painterly cinematic realism, clean composition, and readable story action at mobile width.
```

Negative prompt:

```text
Avoid large non-diegetic typography, fake UI overlays, logos, captions, unreadable screen text, over-busy time distortion, abstract noise, or composition that hides the story beat.
```

Art direction guardrails:
- Keep one coherent dark dossier photo language across the full scrapbook.
- Keep silhouettes, faces, hand contact, and time effects readable at small mobile widths.
- Avoid large non-diegetic typography, logos, fake UI overlays, fake readable text, or captions inside the image.
- Prefer yellow-white-black Quantum Break contrast, neutral muted tones, dark lab mood, and amber/white chronon light.
- Prompt-only missing images stay in the brief; do not restore empty visible slots just to show a queue.

Current wired photo evidence:
- `qb-page-02-a-airlock-threshold.png`: Jack and Paul at the machine threshold, clean tech door, the experiment still controlled but visibly about to cross into danger.
- `qb-page-02-c-core-detonation.png`: Time machine core overloading and detonating on its own, amber emergency light, blue-white chronon rupture, people caught mid-reaction, cause intentionally unclear.

Next missing image:

```text
qb-page-02-d-frozen-will.png
```

Prompt:

```text
16:9 cinematic sci-fi dossier photo for a Quantum Break illustrated journal. Will frozen inside a time stutter while Jack reaches out and touches him awake, suspended debris and amber/white chronon fracture light around them, dark laboratory background, grounded human silhouettes, readable hand-contact focal point, no UI, no captions, no logos, no fake text, coherent yellow-white-black Quantum Break palette, painterly cinematic realism, clean composition readable at mobile width.
```

Drop generated images into `docs/assets/img/quantum-break/` using the exact filenames in `panel-manifest.json`, then run the build so the journey page auto-wires matching visible photo-evidence slots:

```powershell
npm run build:metro
```

Then run:

```powershell
npm run qa:qb-assets
```

This non-strict check allows missing prompt-only images, validates every image that exists, and verifies that generated journey HTML only references image files that are actually present. Before treating all manifest images as complete, run:

```powershell
npm run qa:qb-assets:all
```

Do not manually swap photo frames in `Tools/pages/sources/quantum-break/journey.html`. Keep stable `data-qb-slot` markers there; `npm run build:metro` performs the image wiring from the manifest.
