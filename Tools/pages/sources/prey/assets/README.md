# Prey Illustrated Journal Evidence

This directory is the source-of-truth handoff for generated Prey illustrated journal images. The public copy is generated to `docs/assets/img/prey/`.

## Drop-In Rule

Generate 16:9 PNGs and place them in `docs/assets/img/prey/` with the exact filenames below. Then run:

```bash
npm run build:metro
npm run qa:prey-assets
```

Missing images remain listed in the art queue until exact filenames exist. Existing visible images are validated and auto-wired into the public journey page.

## Current Slots

### prey-page-02-a-rooftop-helicopter.png

Rooftop helicopter route and first-day facade hook.

Prompt:

```text
16:9 cinematic sci-fi illustrated evidence image for a Prey review journal. Morgan approaches a rooftop helicopter at sunrise above a polished futuristic city, wet helipad reflections, staged first-day corporate facade, subtle unease under a beautiful commute, amber blue dawn palette, no readable logos, no UI, no captions, no fake text, painterly cinematic realism, clean composition readable at mobile width.
```

### prey-page-03-a-mimic-paranoia.png

First Mimic breach in the test-room lab after the experiment facade breaks.

Prompt:

```text
16:9 cinematic sci-fi illustrated evidence image for a Prey review journal. Talos I test-room lab viewed through observation glass as Mimics attack researchers during the experiment breach, scattered debris, wet reflective floor, people fleeing, black alien shapes in motion, blue station darkness with amber/cyan highlights, no gore focus, no UI, no captions, no logos, no fake text, painterly cinematic realism, clean composition readable at mobile width.
```

### prey-page-03-b-crew-terminal-trace.png

Crew trace workstation evidence without readable fake text.

Prompt:

```text
16:9 cinematic sci-fi illustrated evidence image for a Prey review journal. Abandoned crew workstation inside Talos I, dark terminal glow, scattered personal objects, audio log recorder, access card shape, coffee stain, station corridor beyond, amber green cyan station ambience, environmental storytelling about missing crew, no readable screen text, no UI, no captions, no logos, no fake text, painterly cinematic realism, clean composition readable at mobile width.
```

### prey-page-04-a-lobby-wrench-mimic.png

First wrench-forward Mimic fight after the apartment set breaks open.

Prompt:

```text
16:9 cinematic sci-fi illustrated evidence image for a Prey review journal. First-person Morgan raises a wrench against a black Mimic threat inside a dark orbital station lobby after the apartment simulation breaks, floating debris, blue station depth with amber sparks, vulnerable early-combat tension, no readable UI, no captions, no logos, no fake text, painterly cinematic realism, clean composition readable at mobile width.
```

Do not manually edit generated image tags in `Tools/pages/sources/prey/journey.html`. Keep stable `data-prey-slot` markers there; `npm run build:metro` performs the image wiring from `flight-recorder-manifest.json`.
