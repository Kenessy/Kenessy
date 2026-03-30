---
id: ae-visual-system
title: Apocalypse Express — Visual System (Concise)
version: 1.0
updated: 2025-11-16
status: stable
palette_version: v0.3
tokens_version: v0.1
tags: [style-guide, color, typography, layout, accessibility]
---

# Apocalypse Express — Visual System (Concise)

> [!summary] One‑liner
> Cinematic, melancholic, **industrial‑arcane** dark fantasy in frozen time: **purple haze** + **golden light** over **basalt neutrals**; **ember** for danger, **cyan** for info.

> [!tip] Golden rules
> • **Dark‑first** for digital; provide a light/print variant.  
> • Use **tokens, not hex**.  
> • **Neutrals dominate** (65–75%); **cyan is functional**, **ember is rare**.  
> • **Never** set paragraphs in accent hues; body text stays neutral.

---

## 1) Identity snapshot

- **Feel:** cinematic • melancholic • dark‑fantasy • industrial‑arcane • grounded/real.  
- **Canon locks:** purple chronon haze; golden‑hour lighting; train = dark steel; Lucifer = black suit + red tie.  
- **No‑go:** cartoony, high‑fantasy tropes, neon cyberpunk, grimdark excess, “parchment + bright red” cliché.

---

## 2) Palette v0.3 (production)

> [!info] Use these via tokens (see §3).

### Neutrals
| Token | Hex | Role |
|---|---|---|
| `apex.bg.canvas` | `#05040A` | Page void / dark bg |
| `apex.bg.surface` | `#0B0E16` | Main panels |
| `apex.bg.surface-alt` | `#1B1F2B` | Secondary panels |
| `apex.bg.paper` | `#F4EADF` | Paper/light mode |
| `apex.text.main-on-dark` | `#F8F5F0` | Body on dark |
| `apex.text.main-on-light` | `#171321` | Body on light |
| `apex.text.invert` | `#05040A` | Dark text on **mid‑tone chips** |

### Brand & lanes
| Token | Hex | Use |
|---|---|---|
| `apex.brand.primary` | `#4C2B70` | Brand violet (headings/UI) |
| `apex.brand.primary-soft` | `#A38BCF` | Soft tint panels |
| `apex.brand.secondary` | `#C99C5A` | Gold (divine/premium) |
| `apex.brand.border` | `#2A163F` | Strong outlines |

| Lane | Tokens | Notes |
|---|---|---|
| **Gold** | `apex.state.ok` `#E6CFA1`, `apex.state.divine` `#C99C5A` | Positive/precious |
| **Ember** | `apex.state.warning` `#FF7B5C`, `apex.state.danger` `#FF4B3A`, `apex.state.danger-deep` `#B32118` | Risk/hell/Surges |
| **Cyan** | `apex.state.info` `#28BDD8`, `apex.state.info-deep` `#117086`, `apex.cyan.soft` `#A3ECFF` | Info/tech |
| **Zones** | `apex.zone.trueflow` `#0B0E16`, `apex.zone.lowlight` `#1B1F2B`, `apex.zone.surgefront` `#FF7B5C`, `apex.zone.deepstasis` `#2A163F` | Overlays/mood |

> [!important] Safe text on fill
> • **Dark backgrounds:** use `apex.text.main-on-dark`.  
> • **Light/paper:** use `apex.text.main-on-light`.  
> • **Mid‑tone chips (gold/ember/cyan/ok/surgefront):** use **dark text** (`apex.text.invert` or `apex.text.main-on-light`).  
> • Keep white text for **dark** fills (brand primary/border, info‑deep, danger‑deep, dark neutrals).

---

## 3) Tokens (use these names everywhere)

```css
/* CSS variable example */
:root{
  --apex-bg-canvas:#05040A; --apex-bg-surface:#0B0E16; --apex-bg-surface-alt:#1B1F2B; --apex-bg-paper:#F4EADF;
  --apex-text-main-dark:#F8F5F0; --apex-text-main-light:#171321; --apex-text-invert:#05040A;
  --apex-brand-primary:#4C2B70; --apex-brand-primary-soft:#A38BCF; --apex-brand-secondary:#C99C5A; --apex-brand-border:#2A163F;
  --apex-state-ok:#E6CFA1; --apex-state-warning:#FF7B5C; --apex-state-danger:#FF4B3A; --apex-state-danger-deep:#B32118;
  --apex-state-info:#28BDD8; --apex-state-info-deep:#117086; --apex-zone-trueflow:#0B0E16; --apex-zone-lowlight:#1B1F2B;
  --apex-zone-surgefront:#FF7B5C; --apex-zone-deepstasis:#2A163F;
}
```

---

## 4) Usage ratios & do/don’t

> [!check] Ratios (dark‑first)
> **Neutrals 65–75%** • **Purple 15–20%** • **Gold 5–10%** • **Cyan 3–7%** • **Ember 2–4%**

**Gold** = divine/premium (rare). **Ember** = danger/hell (sparingly). **Cyan** = info/links/HUD (functional).  
**Never** use accent hues for paragraph text. If a page feels loud, revert elements to neutral.

> [!note] Print/light variant
> Paper + dark text for most of the page; keep accents to **icons, thin bars, badges**.

---

## 5) Mechanics mapping (quick)

- **Outcome chips:** **CF** `danger-deep` • **F** `danger` • **S** `ok` • **CS** `divine` (labels use **dark text**).  
- **Meters/Tracks:** Harmony → **gold lane**; Dissonance/Chaos → **purple→ember** ramp; Timer/Segments → **ok→warning→danger**.  
- **Blocks (stripe → lane):** CHECK → brand purple; HAZARD_TRAP → warning/danger; REVEAL → info **or** gold; ASSET/REWARD → gold; LOCATION/NPC → brand purple.  
- **Maps/VTT:** overlays — `trueflow 0%`, `lowlight ~12%`, `surgefront 30%`, `deepstasis 25%`; pair lane color with **shape/pattern** (triangle danger, hex info, circle divine).

---

## 6) Typography (screen‑first)

- **Body:** *Source Sans 3* 400 (17px / LH 1.5–1.55).  
- **Headings:** *Cinzel* 700 — H1 40px / H2 32px (on dark use brand purple; openers may use gold).  
- **Mono:** *IBM Plex Mono* (tabular nums) for DCs/clocks.  
- **Rules vs fiction:** rules = neutral; fiction = italics on a very light purple tint.  
- **Inside blocks:** H3 ≈ 22–24px; chips min label 12px. Links = cyan + underline.

---

## 7) Layout templates (reference)

- **Rules spread:** 2 columns; surface panel on canvas; H2 in brand purple; place blocks **inside** columns; keep ember ≤4%.  
- **Chapter opener:** left = big art; right = H1 + short fiction; overlays follow ratios.  
- **Web landing:** canvas bg; hero in brand purple with gold CTA; cards on surface‑alt; article width 650–750px.

> [!example] (Drop your reference images in this note’s folder and embed)  
> ![[step9_rules_spread.png]]  
> ![[step9_chapter_opener.png]]  
> ![[step9_web_landing.png]]

---

## 8) Accessibility & QA

- **Contrast:** AA targets — **4.5:1** normal, **3:1** large; aim **7:1** for body where possible.  
- **CVD/Grayscale:** pair color with **icon/shape/label**; don’t rely on hue alone.  
- **Stress tests:** hazard‑heavy page; cyan‑abuse web; gold‑abuse opener; ASH overlays on maps.  
- **Print checks:** one dark page, one light page, one handout; verify chip size, line weights, tint visibility.

> [!success] Chip label rule
> Mid‑tone chips (gold/ember/cyan/ok/surgefront) **always** use **dark text**. Keep white text for dark fills only.

---

## 9) Implementation & handoff

- Build **Figma/InDesign masters** with tokens (no hard‑coded hex).  
- Define CSS variables (see §3).  
- Export starter assets: chips, stripes, timer ring, overlay patterns.

---

## 10) Checklists (for designers)

- [ ] Neutrals ≥65% and combined accents ≤25% (ember ≤4%).  
- [ ] Headings use brand purple (gold only on openers).  
- [ ] Chips use **dark text** on mid‑tone fills.  
- [ ] Cyan appears only on links/HUD/info.  
- [ ] Print variant uses paper + thin bars/badges for accents.  
- [ ] Contrast AA passes; color‑blind cues present.

---

## 11) Changelog
- **v1.0 (2025‑11‑16):** Concise Obsidian guide distilled from the full canvas; added chip text rule, ratios, meters/blocks quick map, and QA list.
