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

### invincible-page-02-locator-map.png

Locator device and abstract M-map turning early disorientation into navigable trust.

Prompt:

```text
16:9 cinematic comic-style hard sci-fi illustration. Atompunk astrobiologist on Regis III studies a physical analog locator and an abstract multicolored map plate with no readable labels, red desert landmarks behind, compact rover far away, first navigation trust test, no readable text, no UI, no logos, no watermark.
```

### invincible-page-03-sandstorm-ringed-moon.png

Gentle-route exploration gives way to sandstorm blackout and the ringed moon visual memory.

Prompt:

```text
16:9 cinematic comic-style hard sci-fi illustration. A cautious atompunk explorer crosses a rust-red alien slope toward distant tents as a sandstorm cuts across the valley, Regis III ringed moon visible through dust, blackout/memory mood, no readable text, no UI, no logos, no watermark.
```

### invincible-page-04-camp-krauta.png

Camp investigation: unresponsive android, Dr. Krauta in stupor, comics/codex repairing the timeline.

Prompt:

```text
16:9 cinematic comic-style hard sci-fi illustration. Regis III expedition camp with angular tents, an unresponsive retro android, a quiet medical silhouette representing Dr. Krauta under a tarp, an explorer reconnecting analog cable/radio equipment, eerie investigative mood, no readable text, no UI, no logos, no watermark.
```

### invincible-page-05-aquarium-probe-fear.png

Aquarium fish/probe anomaly: ocean life fears robotic probes for reasons the replay must track.

Prompt:

```text
16:9 cinematic comic-style hard sci-fi illustration. Inside a dim atompunk expedition tent, a glass aquarium holds strange fish-like alien specimens while small retro robot probes hover near the tank, the explorer watches as the fish recoil, scientific mystery mood, no readable text, no UI, no logos, no watermark.
```

### invincible-page-06-relay-repair.png

Mission log, impossible fried relay, replacement part, and android reboot turn camp searching into active problem-solving.

Prompt:

```text
16:9 cinematic comic-style hard sci-fi illustration. An atompunk explorer repairs a fried relay antenna at a Regis III camp, analog cable line, replacement module, retro android nearby, radio mast glowing with abstract signal rings, practical investigation payoff, no readable text, no UI, no logos, no watermark.
```

Do not manually edit generated image tags in `Tools/pages/sources/invincible/journey.html`. Keep stable `data-invincible-slot` markers there; `npm run build:metro` performs the image wiring from `panel-manifest.json`.
