# The Invincible Illustrated Playthrough Assets

This directory is the source-of-truth handoff for The Invincible replay page assets. The public copy is generated to `docs/assets/img/invincible/`.

## Drop-In Rule

Generate PNGs and place them in `docs/assets/img/invincible/` with the exact filenames below. All visible playthrough panels use 16:9. Then run:

```bash
npm run build:metro
npm run qa:invincible-assets
```

Missing images remain listed in the art queue until exact filenames exist. Existing visible images are validated and auto-wired into the public playthrough page.

## Current Slots

### invincible-hero-regis.png

Wide report hero: lone atompunk expedition against the Regis III desert.

Prompt:

```text
16:9 cinematic comic-style hard sci-fi illustration. A lone orange-suited astrobiologist stands near analog expedition equipment in a rust-red alien desert, distant retro-futuristic rover silhouettes, pale sky, lonely mystery, restrained atompunk design, no readable text, no UI, no logos, no watermark.
```

### invincible-page-01-wake-regis.png

Waking alone beside scattered analog equipment on Regis III.

Prompt:

```text
16:9 cinematic comic-style hard sci-fi illustration for The Invincible replay. A lone astrobiologist in an orange atompunk spacesuit wakes in a rust-red desert beside scattered analog expedition instruments, pale sun, dust haze, low survival tension, no readable text, no UI, no logos, no watermark.
```

### invincible-page-02-instrument-trail.png

Analog detector, cable reel, and footstep trail turning exploration into procedure.

Prompt:

```text
16:9 cinematic comic-style hard sci-fi illustration. Close-to-mid scene of an atompunk explorer following an analog detector needle and cable reel across a red alien valley, footprints, dust, compact rover in the distance, procedural mystery mood, no readable text, no UI, no logos, no watermark.
```

### invincible-page-03-convoy-valley.png

Dusty convoy path and silent expedition machines in the Regis III valley.

Prompt:

```text
16:9 cinematic comic-style hard sci-fi illustration. Retro-futuristic expedition convoy vehicles sit silent in a rust-red alien valley, one explorer approaches from the foreground, analog antennas and round hulls, oppressive quiet, pale sky, no readable text, no UI, no logos, no watermark.
```

### invincible-page-04-robot-ruins.png

Ruined machines and antenna shadows suggesting the planet is not empty.

Prompt:

```text
16:9 cinematic comic-style hard sci-fi illustration. An explorer studies broken retro robots and antenna-like machine ruins half buried in red dust, long shadows, analog flashlight beam, the planet feels not empty but not alive in a human way, no readable text, no UI, no logos, no watermark.
```

### invincible-page-05-metal-cloud.png

A black metallic micro-machine cloud crossing the sunlit desert as the core threat lens.

Prompt:

```text
16:9 cinematic comic-style hard sci-fi illustration. A black metallic micro-machine cloud crosses a rust-red desert valley, blotting part of the pale sky, a lone orange-suited explorer watches from behind a rock with analog scanner raised, eerie non-biological threat, no readable text, no UI, no logos, no watermark.
```

### invincible-page-06-return-signal.png

Analog radio mast, distant lander signal, and the review question shifting from survival to judgment.

Prompt:

```text
16:9 cinematic comic-style hard sci-fi illustration. At dusk on Regis III, a lone explorer tunes an analog radio mast beside a compact lander silhouette, dusty orange horizon, equipment lights, final reflective mystery rather than action, no readable text, no UI, no logos, no watermark.
```

Do not manually edit generated image tags in `Tools/pages/sources/invincible/journey.html`. Keep stable `data-invincible-slot` markers there; `npm run build:metro` performs the image wiring from `panel-manifest.json`.
