# artstyle.md — “Textured Geometric Cutout Icon” Style Guide (v0.3)

## 0) Hard Requirements (MUST ALWAYS HOLD)
1) TRANSPARENT BACKGROUND ONLY (PNG alpha). No solid fill, no gradient background, no vignette, no environment backdrop, no checkerboard.
2) SINGLE ICON ONLY. Never output a collage, grid, sprite sheet, multi-panel, “4 variations in one image”, or tiled layout.
3) Square 1:1 icon composition. Center the subject with clean padding (icon readability).
4) No text, no letters, no numbers, no watermark, no border/frame.

## 1) Style DNA (Invariants)
- Medium/look: 2D “paper-cut / collage” illustration built from bold geometric shapes.
- Shapes: angular polygons + occasional smooth curves; layered cutout pieces; strong silhouette first.
- Texture: distressed paper/grunge overlay on nearly all shapes (subtle stains, specks, scuffs).
- Shading: mostly flat fills + 1–2 tone steps (no realistic lighting); minimal soft gradients.
- Linework: thin-to-medium dark outlines used to separate major shapes; avoid sketchy lines.
- Detail philosophy: “readable at 64px” — big forms, limited micro-detail, clean negative space.

## 2) Composition Rules
- Primary subject dominates; keep the design centered.
- Maintain breathing room (padding) so the silhouette doesn’t touch edges.
- Prefer iconic poses and strong negative-space cutouts for readability.
- Allow “supporting FX shapes” (flames, crystals, swirls), but they must reinforce the main silhouette and remain within the single-icon rule.

## 3) Color System (Palette Discipline)
- Use a limited palette per icon: typically 3–6 major colors total.
- Use one dominant hue + one accent hue + neutrals (dark/gray/cream) for balance.
- Colors can be saturated but should feel slightly “muted by paper texture” (not glossy neon).
- High contrast between subject layers; avoid muddy midtones that kill readability.

## 4) Texture & Surface
- Apply paper/grunge texture across fills (speckling, light scratches, blotches).
- Texture is visible but not overpowering; avoid photoreal surface detail.
- Avoid smooth plastic/glass renders; keep it “printed on worn paper” vibe.

## 5) Motifs & Decorative Language (Optional but On-Brand)
- Geometric patterns: triangles, zigzags, spirals, key-like runic borders, simple tessellations.
- Place motifs on armor/clothing/props as blocks of pattern, not fine linework.
- Magical FX: stylized shards, curved ribbon shapes, flame tongues, swirling arcs, rune blocks.

## 6) What to Avoid (Hard Negatives)
- No photorealism, no 3D render, no cinematic lighting, no depth-of-field blur.
- No anime line-art style, no painterly brushstrokes, no watercolor “washy backgrounds”.
- No busy detailed backgrounds; background must be transparent.
- No multi-image collages, no grids, no panels, no sprite sheets.
- No text overlays, UI frames, logos, or watermarks.

## 7) Prompt Compiler Template (Use for Every Generation)
Use this exact structure when building the final image prompt:

[SUBJECT]: <what the icon depicts; keep it generic/original>
[POSE/ACTION]: <iconic pose or simple action; optional for objects>
[KEY PROPS/SYMBOLS]: <1–3 important read-at-a-glance elements>
[MOOD/ELEMENT]: <fire/ice/poison/holy/shadow/etc; optional>
[PALETTE]: <dominant hue + accent + neutrals; optional>
[STYLE LOCK]:
- 2D geometric paper-cut collage icon
- distressed paper/grunge texture on shapes
- bold silhouette, readable at 64px
- thin-to-medium dark outlines separating major shapes
[OUTPUT LOCK]:
- single centered icon ONLY
- transparent background PNG (alpha)
- square 1:1
- no text, no border
[NEGATIVES]:
- no collage, no grid, no multi-panel, no sprite sheet
- no background, no vignette
- no photorealism, no 3D, no cinematic lighting

## 8) Regression Test Prompts (Run after each patch)
1) “A flaming skull icon, single centered symbol”
2) “A frost wolf head emblem with ice shards”
3) “A simple potion bottle with runic label shapes (no text)”
4) “A forest spirit mask with leaf motifs”
5) “A lightning bolt sigil with geometric arcs”
Expected: transparent BG, single icon, geometric cutout + grunge texture, readable.

## 9) Changelog
- v0.3: Added explicit single-icon / anti-collage lock, strengthened transparency requirements, added regression tests.
- v0.2: Clarified palette discipline and motif language.
- v0.1: Initial style DNA and negatives.
