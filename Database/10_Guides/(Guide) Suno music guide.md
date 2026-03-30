# Suno v5 – D&D Soundtrack Knowledge Base

This single file is designed to be:

- Readable and editable by humans (e.g. in Obsidian).
- Easy for an AI to ingest as a knowledge base about **Suno v5** for **D&D / Miracle‑of‑Sound‑style** music.

Use headings and lists as “rules” and “patterns” when training or prompting an AI.

---

## 0. TL;DR – Core Rules

1. **Work in Custom mode with v5.** Use **Create → Custom**, select **Model: v5**, not Simple mode.
2. **Style of Music = short global spec.** 120 characters; use tags like  
   `epic symphonic rock, 110bpm, heroic melancholic, male vocal, strings+choir`.
3. **Lyrics = structure + story + detail.** Use `[Intro] [Verse] [Pre-Chorus] [Chorus] [Bridge] [Outro]` tags, short lines, clear rhymes.
4. **Sliders control behaviour.**  
   - Weirdness: creativity / chaos.  
   - Style Influence: strictness to Style prompt.  
   - Use 35–45 Weirdness & 70–85 Style Influence for tight choruses.
5. **D&D flavour = concrete imagery + world terms.** Bring in kingdoms, relics, gods, battles, taverns; keep language singable.
6. **Iterate section by section in Studio.** Lock good choruses, regenerate weak verses/bridges only.
7. **Always know the track’s job.** Battle theme, tragic ballad, exploration score, tavern song, bittersweet ending, etc.

---

## 1. Model & Interface Overview

### 1.1 What Suno v5 is

- A generative music model with:
  - Human‑like singing in multiple styles.
  - Coherent songs from short hooks to multi‑minute pieces.
  - Control over creativity and style faithfulness via sliders.

### 1.2 Where to work (web UI, Custom mode)

Use Suno’s website or app:

1. Go to **Create → Custom**.
2. Make sure **Model = v5** (not 4.5‑All).
3. You will see:
   - **Style of Music** – short text box (~120 characters).
   - **Lyrics** – multi‑line text area (~3,000 characters).
   - Optional audio upload / record.
   - **Advanced** section:
     - Weirdness slider.
     - Style Influence slider.
     - Audio Influence slider (only if using audio).
     - Exclude Styles field.
     - Vocal Gender selector.

### 1.3 What goes where

- **Style of Music**: compact description of genre, tempo, mood, core instruments, vocal type, and 1–2 constraints.
- **Lyrics**: song sections, story, wording, meta‑tags and performance cues.
- **Advanced**: numeric “knobs” that change how literally v5 follows your text.

---

## 2. Style Prompts (Style of Music Box)

The Style box is a **120‑character global style spec**. Think tags, not essay.

### 2.1 Goals of a Style prompt

A good Style prompt:

1. Sets **genre blend** (1–2 genres maximum).
2. States **mood** (epic, melancholic, mystical, bitter‑sweet).
3. Optionally includes **tempo (BPM)** and maybe key.
4. Names **2–3 core instruments**.
5. Defines **vocal type** (`male vocal`, `female vocal`, `instrumental only`).
6. Optionally adds **1–2 constraints** (`no heavy metal`, `no EDM`).

It should **not** list 5–6 genres or ramble in long sentences.

### 2.2 Recommended template

Pattern:

> `genre, bpm, mood, vocal, core instruments`

Examples for your D&D use‑case:

- **Epic boss battle (male)**  
  `epic symphonic rock, 110bpm, heroic melancholic, male vocal, strings+choir`

- **Tragic backstory ballad**  
  `melancholic folk rock, 75bpm, male vocal, acoustic+strings, cinematic`

- **Mystic Fey exploration (female)**  
  `celtic fantasy rock, 95bpm, mystical, female vocal, strings+hand drums`

- **Dark instrumental underscore**  
  `dark orchestral score, 70bpm, tense, instrumental only, strings+low brass`

### 2.3 Style prompt rules (for humans and AIs)

When constructing Style of Music:

1. **Genres:** choose 1–2 (e.g. `symphonic rock`, `celtic rock`, `orchestral score`).
2. **Mood:** add 1–2 words (e.g. `heroic melancholic`, `tragic haunting`, `mystical`).
3. **Tempo:** add BPM when you care about feel (`90bpm`, `110bpm`, `75bpm`).
4. **Instruments:** name 2–3 (`strings+choir`, `acoustic+violin`, `flute+hand drums`).
5. **Vocal type:** `male vocal`, `female vocal`, or `instrumental only`.
6. **Constraints:** keep short: `no heavy metal`, `no EDM`, `no growls`.

Tip for AI: if Style becomes longer than ~120 characters, prioritise:

> genre + mood + vocal + instruments

and drop less important extras.

---

## 3. Lyrics & Tags

Lyrics tell v5 how to structure and perform the song.

### 3.1 Structure tags

Use bracket tags on their own line:

- `[Intro]`
- `[Verse]`, `[Verse 1]`, `[Verse 2]`
- `[Pre-Chorus]` or `[Pre]`
- `[Chorus]`
- `[Bridge]`
- `[Break]`, `[Drop]`
- `[Instrumental]`
- `[Outro]`, `[End]`, `[Fade Out]`

**Rules:**

1. Each tag is on its own line.
2. Put a blank line after a tag before the lines.
3. Repeat `[Chorus]` with the same text wherever you want the chorus to return.
4. For music‑only parts, either:
   - Use `[Instrumental]`, or  
   - Annotate the section: `[Intro – instrumental, low strings]`.

Example:

```text
[Verse 1]
Line one of the verse
Line two of the verse
Line three of the verse
Line four of the verse

[Chorus]
Hook line one
Hook line two
Hook line three
Hook line four
```

### 3.2 Meta‑tags (section‑level directives)

You can extend section tags with extra info:

```text
[Intro – instrumental only, low strings, distant drums]

[Verse 1 – soft, intimate]
...

[Chorus – powerful, full band, choir behind]
...

[Bridge – whispered, minimal instruments]
...
```

Useful meta‑tags:

- Mood: `[Mood: Melancholic]`, `[Mood: Heroic]`.
- Energy: `[Energy: Low]`, `[Energy: High]`.
- Vocal: `[Vocal Style: Whisper]`, `[Vocal Style: Gritty]`, `[Vocalist: Male]`.
- Instrument: `[Instrument: Strings (Legato)]`, `[Instrument: Taiko Drums]`.
- Dynamics: `[Dynamic: Crescendo]`.
- Instrumental: `[Instrumental]`.

Place the meta‑tag **immediately above** the lines it controls.

### 3.3 Inline performance cues

For micro‑delivery inside lines, use parentheses:

- `(whispered)`
- `(soft)`
- `(belted)`
- `(spoken)`
- `(echoed)`

Example:

```text
[Chorus] (belted, heroic)
We are the fire in the falling night,
Bleeding but burning, we hold the line.
```

Guidelines:

1. Place the cue immediately before the words.
2. Use sparingly – a few per song.
3. Prefer section‑level tags when the whole section shares one mood.

### 3.4 Lyric length and rhythm

- Aim for **7–12 syllables per line**.
- Verses: **4–6 lines** each.
- Choruses: **2–4 short, strong lines**.
- Total lyrics per song: roughly **60–160 words** is often enough.

### 3.5 Poetic but singable (D&D / Miracle‑of‑Sound flavour)

Rules:

1. Use **concrete fantasy imagery**:
   - Ruins, crowns, banners, steel, blood, oaths, stars, Feywild, etc.
2. Keep **syntax simple**:
   - Avoid huge complex sentences; split into multiple short lines.
3. Use **consistent rhyme**:
   - ABAB, AABB etc. Avoid rhyming every single line in a simplistic way.
4. The **chorus** should state the core idea in simple, memorable phrases.

Example chorus for a battle theme:

```text
[Chorus – powerful, full band]
We rise from the ashes, we carry the flame,
Bound by the blood and the oaths that we made.
Through thunder and shadow we shout out your name,
We stand, we stand, unafraid.
```

### 3.6 D&D narrative angles

Common angles that work well:

- **Battle anthem** – courage, comrades, oaths, enemy imagery.
- **Tragic backstory** – lost kingdoms, betrayals, broken vows.
- **Exploration / mystic** – strange landscapes, Feywild paths, ruins, whispers.
- **Character theme** – one character’s flaw, desire, or turning point.
- **Faction anthem** – ideology, symbol, and unique style of a group.

Workflow:

1. Decide the **scene type**.
2. Pick a template (see section 6).
3. Replace placeholders with your world’s names and details.

---

## 4. Sliders & Advanced Settings

The Advanced panel controls how “literally” v5 follows prompts.

### 4.1 Weirdness

**Meaning:** how experimental or chaotic the composition is.

Ranges (approx):

- 0–40: safe, predictable, genre‑typical.
- 45–55: “normal” baseline.
- 60–80: creative, unusual textures and structures.
- >80: often chaotic / broken.

Rules:

1. Start at **50%** for drafts.
2. For **choruses**: 35–45 for tight, radio‑ready hooks.
3. For **bridges / ambient intros**: 55–70 for exploratory sections.
4. Avoid >80 unless you explicitly want glitchy or very strange results.

### 4.2 Style Influence

**Meaning:** how closely the model follows the Style of Music string.

Ranges:

- 0–40: loose, genre‑bending, lots of freedom.
- 45–70: balanced.
- 70–90: very strict to your tags.

Rules:

1. Start at **65–75** for most D&D songs.
2. Use **75–85** on choruses for strong identity.
3. Use **60–70** on verses for some flexibility.
4. Use **50–65** on bridges to allow a twist while staying connected.

### 4.3 Audio Influence

Visible only when audio is uploaded/recorded.

- 20–40: uploaded audio is ambient texture.
- 40–60: strong influence but not dominant.
- 60–80: uploaded audio leads melody or rhythm.

For your use:

- Riff or vocal idea → 60–75.
- Ambience (rain, crowd, drones) → 20–40.

### 4.4 Exclude Styles (negative prompting)

**Purpose:** tell v5 which genres / sounds to avoid.

Good entries for this KB:

- `heavy metal`
- `hard rock`
- `screamed vocals`
- `EDM`
- `trap`
- `auto-tune rap`
- `chiptune`

Rules:

1. Use **1–4 items**, not long lists.
2. Target real genres / sound types.
3. For “more symphonic, less rock”, exclude:
   - `heavy metal`, `hard rock`, `screamed vocals`, `distorted guitar`.

Combine Exclude Styles with:

- Style: `instrumental only, no vocals` if needed.
- Lyrics tags: `[Instrumental]` for music‑only sections.

### 4.5 Vocal Gender

Controls the main vocal:

- **Male** – good for Miracle‑of‑Sound‑like bard songs.
- **Female** – good for ethereal / elven / mystic vocals.

You can reinforce with tags:

- `[Vocalist: Male]`
- `[Vocalist: Female]`

For instrumentals, combine:

- Vocal gender set arbitrarily
- Style: `instrumental only`
- Sections tagged `[Instrumental]`

---

## 5. Workflows for D&D Soundtracks

### 5.1 Shared steps

1. Decide **track role**:
   - Boss fight, travel, tavern, villain, epilogue, etc.
2. Decide **length**:
   - Full song (2–4 min) vs loop (60–120 sec).
3. Prepare:
   - One good **Style prompt**.
   - At least a **draft chorus** in Lyrics.

### 5.2 Chorus‑first workflow (for vocal songs)

Recommended for battle themes, character songs, big story beats.

1. **Set up Custom mode**
   - Model: v5.
   - Style: compressed tag string.
   - Lyrics: write `[Chorus]` (optionally `[Intro]`).
   - Sliders: Weirdness ~50, Style Influence ~65–75.

2. **Generate**
   - Listen to both outputs.
   - Pick the one with the best chorus melody and emotion.

3. **Open in Studio**
   - Keep the chorus if good.
   - Note what you like / dislike about verses and intro.

4. **Write full lyrics**
   - Add `[Verse 1]`, `[Verse 2]`, `[Bridge]`, `[Chorus]`, `[Outro]`.
   - Ensure chorus repeats exactly (or with tiny changes).
   - Stick to the lyric rules in section 3.

5. **Regenerate weak sections only**
   - In the timeline, lock the strong chorus.
   - Select weak Verse/Bridge → Replace / Regenerate.
   - Slightly adjust sliders per section if needed.

6. **Polish transitions**
   - Check energy curve: verse → pre → chorus → bridge → final chorus.
   - Use tags like `[Dynamic: Crescendo]` at build points.

7. **Export**
   - Export WAV (and stems if needed).

### 5.3 Instrumental underscore workflow

For exploration, tension, ambience, tavern background.

1. Style prompt:
   - `dark orchestral score, 70bpm, tense, instrumental only, strings+low brass`
2. Lyrics:
   - Use instrumental tags:
     - `[Intro – instrumental, low strings]`
     - `[Build – more drums, higher strings]`
     - `[Release – quieter, fading]`
3. Sliders:
   - Weirdness: 55–70.
   - Style Influence: 50–65.
4. Generate and use Studio:
   - Extend/shorten sections.
   - Trim boundaries to create loops if needed.

### 5.4 Character theme / lore ballad workflow

1. Choose the **character or faction**.
2. Style: usually `melancholic folk rock` or `cinematic ballad`.
3. Lyric structure:
   - Verse 1: origin.
   - Verse 2: fall / turning point.
   - Bridge: confession or vow.
   - Chorus: core emotional thesis (what the character truly believes or fears).
4. Sliders:
   - Weirdness: 40–55.
   - Style Influence: 60–75.

### 5.5 Persona / house‑sound workflow

To keep a coherent album‑like campaign OST:

1. When a track is perfect, save its recipe:
   - Style string.
   - Slider ranges.
   - Typical tags (structure, mood, vocal style).
2. For future tracks in the same arc:
   - Reuse the recipe.
   - Only change: lyrics, tempo, and perhaps mood words.

---

## 6. Templates for D&D Themes

These are ready‑to‑adapt patterns.

Replace `<CHARACTER_NAME>`, `<KINGDOM_NAME>`, `<PLACE>` etc.

### 6.1 Template – Epic Boss Battle Anthem

**Style of Music**

```text
epic symphonic rock, 110bpm, heroic melancholic, male vocal, strings+choir
```

**Lyrics skeleton**

```text
[Intro – instrumental only, low strings, distant drums]

[Verse 1 – tense, low vocal]
Steel clashes in the dark of <PLACE>,
Shadow banners in the blood‑red haze.
Whispers ride the smoke and flame,
Calling out <CHARACTER_NAME>’s name.

[Pre-Chorus – building]
Every step is carved in pain,
But we rise to fight again.

[Chorus – powerful, full band, choir]
We rise, we roar, in the thunder and the rain,
Bound by oaths and battle scars, we stand again.
Through fire and fear we shout your name,
<CHARACTER_NAME>, we won’t die in vain.

[Verse 2 – more urgent]
<describe casualties, escalation, and resolve>

[Chorus]
(repeat or slight variation)

[Bridge – darker, half‑time]
<short 2–4 lines; introspective or naming the fallen>

[Chorus – final, bigger]
<repeat, maybe add extra “We stand, we stand!” tagline>

[Outro – instrumental, choir and drums fading]
```

---

### 6.2 Template – Tragic Character Ballad

**Style of Music**

```text
melancholic folk rock, 75bpm, male vocal, acoustic+strings, cinematic
```

**Lyrics skeleton**

```text
[Intro – acoustic + soft strings, instrumental]

[Verse 1 – soft, intimate]
In the ruins of the throne of <KINGDOM_NAME>,
Echoes of a vow that burned like flame.
Ashes on the banners, dust on the crown,
Everything we built lies broken down.

[Chorus – bittersweet, warm]
Oh <CHARACTER_NAME>, you carry every scar,
A fallen star that wandered far.
Your shadow walks where legends fade,
A ghost of all the plans we made.

[Verse 2 – reveal more backstory]
<betrayal, war, a choice that changed everything>

[Bridge – almost whispered]
<confession or secret; why they can’t move on>

[Chorus – more emotional]
<repeat chorus, maybe substitute one line for resolution>

[Outro – instrumental, solo violin and fading guitar]
```

---

### 6.3 Template – Mystic Feywild Exploration

**Style of Music**

```text
celtic fantasy rock, 95bpm, mystical, female vocal, strings+hand drums
```

**Lyrics skeleton**

```text
[Intro – instrumental, flutes and soft drums]

[Verse 1 – ethereal]
Silver leaves on branches made of light,
Foxfire trails that dance through endless night.
Every step a secret, half‑remembered dream,
Ripples in a moonlit stream.

[Chorus – airy, wide reverb]
We walk the paths where the wild stars sing,
Through the veil where the old bells ring.
In the hush between the dusk and dawn,
The Feywild calls us on and on.

[Verse 2 – stranger imagery]
<deeper lore: bargains, courts, ancient treaties>

[Bridge – mostly instrumental, few whispered phrases]
<maybe 1–2 whispered lines as a spell or warning>

[Chorus – last, with more choir]
<repeat, lean into the hypnotic feel>
```

---

### 6.4 Template – Tavern / Road Song

**Style of Music**

```text
folk rock shanty, 95bpm, rowdy, male vocal, acoustic+fiddle
```

**Lyrics skeleton**

```text
[Intro – fiddle + handclaps, instrumental]

[Verse 1 – storytelling]
We paved the road with ale and scars,
Chased the sun and stole the stars.
Every town a different sin,
Every door we kicked was grinning in.

[Chorus – singalong]
Raise your glass and curse the road,
For every friend and every foe.
We live, we laugh, we never stay,
We drink the night and ride the day.

[Verse 2 – introduce party members]
<two lines per member, with a memorable trait>

[Bridge – half‑tempo, nostalgic]
<quiet reflection on the ones they lost>

[Chorus – big group shout]
<repeat chorus, add “HEY!” type interjections if desired>
```

---

### 6.5 Template – Bittersweet Victory

**Style of Music**

```text
epic orchestral rock, 90bpm, bittersweet, male vocal, strings+choir
```

**Lyrics skeleton**

```text
[Intro – slow strings, distant choir]

[Verse 1 – quiet]
The smoke has cleared above the field,
The broken blades no longer shield.
We won the war, we paid the cost,
Count the living, name the lost.

[Chorus – soaring, bittersweet]
We stand in the silence after the roar,
Heroes of a nameless war.
We saved the world and lost our own,
Kings of ashes, crowns of stone.

[Verse 2 – reflect on specific losses]
<focus on 1–2 named comrades or places>

[Bridge – minimal, almost spoken]
<short, raw lines; accepting the price>

[Chorus – last, with extra choir]
<repeat chorus, slightly stronger or with one line of hope>
```

---

## 7. Troubleshooting & Pitfalls

Quick symptom → cause → fix.

### 7.1 Song sounds generic “epic trailer”

- **Cause**
  - Style prompt too vague (`epic orchestral music` only).
  - Style Influence high with generic tags.
- **Fix**
  - Add 1–2 **world‑specific flavours**: `celtic`, `desert caravan`, `pirate shanty`, etc.
  - Name at least one distinctive instrument: `dulcimer`, `hurdy-gurdy`, `frame drum`.
  - Lower Style Influence slightly (e.g. 75 → 60).

### 7.2 Song feels chaotic or off‑key

- **Cause**
  - Weirdness too high.
  - Too many genres in Style.
- **Fix**
  - Lower Weirdness by 10–15 points.
  - Restrict Style to 1–2 genres and 2–3 instruments.
  - Ensure tempo and mood are clearly specified.

### 7.3 Lyrics rushed or mis‑stressed

- **Cause**
  - Lines too long, syllable counts inconsistent.
- **Fix**
  - Cut lines to ~7–12 syllables.
  - Split long sentences into 2–3 lines.
  - Keep each section to 4–6 lines.
  - Aim for total lyrics ≤ ~100–120 words.

### 7.4 Vocals sound flat or robotic

- **Cause**
  - Chorus not clearly marked.
  - No performance cues.
  - No simple hook phrase.
- **Fix**
  - Use `[Chorus]` and give it a short, repeated hook.
  - Add 1–2 cues like `(belted)`, `[Vocal Style: Emotional]`.
  - Repeat key words in the chorus (`We rise, we rise again`).

### 7.5 Too “rock”, not enough “symphonic”

- **Cause**
  - Rock instruments dominate in Style.
  - No orchestral emphasis.
- **Fix**
  - Style: start with orchestral emphasis:
    - `epic orchestral rock, strings+choir+brass`.
  - Exclude Styles: add
    - `heavy metal`, `hard rock`, `screamed vocals`, `distorted guitar`.
  - Lyrics: emphasize orchestral meta‑tags:
    - `[Intro – strings only]`, `[Chorus – full strings and choir]`.

### 7.6 Negative prompts partly ignored

- **Cause**
  - Model bias or weak negatives.
- **Fix**
  - Combine:
    - Exclude Styles (`trap, EDM, rap`).
    - Style negatives (`instrumental only, no vocals`).
    - Lyrics tags (`[Instrumental]`).
  - Regenerate only the problematic section after tweaks.

### 7.7 Sections don’t transition well

- **Cause**
  - Sections made with very different slider settings.
  - Missing or inconsistent tags.
- **Fix**
  - Regenerate sections in context in Studio.
  - Keep slider ranges similar across adjacent sections.
  - Check tags: ensure proper `[Verse] → [Pre-Chorus] → [Chorus]` order.

### 7.8 Debug checklist

When a generation fails, check:

1. **Style prompt**
   - ≤ 120 chars?  
   - Only 1–2 genres?  
   - Includes mood, vocal, instruments, and 0–3 short negatives?
2. **Lyrics**
   - Clear section tags?  
   - Lines short and rhythmic?  
   - Total words reasonable (≤ ~120)?
3. **Sliders**
   - Weirdness between 40–60?  
   - Style Influence between 55–75?
4. **Studio use**
   - Regenerating just the weak section, not the whole song?  
   - Transitions still aligned after changes?

---

## 8. Notes for AI Systems

If this file is ingested as a knowledge base for an AI:

- Treat **headings** as topics or skills (e.g. “Style Prompts”, “Sliders”).
- Treat **numbered lists** as explicit rules.
- Treat **templates** as patterns to copy and adapt, not as immutable text.
- When asked to generate a Suno v5 prompt for this campaign:
  1. Choose a **scene type** (section 3.6 and 5.1).
  2. Build a Style string using section 2.2 rules.
  3. Build lyrics following sections 3 and 6.
  4. Recommend slider values using section 4.
- Default to **symphonic / folk‑rock D&D flavour** with:
  - Strong choruses, story‑driven verses.
  - Concrete fantasy imagery.
  - Balance between epic and melancholic.
