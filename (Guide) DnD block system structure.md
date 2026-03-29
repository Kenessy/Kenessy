# Apocalypse Express – GM Block System (Obsidian Template)

A modular block system for writing and running D&D‑style adventures in Obsidian / Markdown.

- **Goal:** fast, scannable, reference‑first notes that are still readable as text.
- **Usage:** compose scenes from a small set of reusable “blocks” (callouts).
- **Profiles:** each scene is marked as **Micro**, **Standard**, or **Set‑Piece** to avoid over‑structuring small moments.

---

## 1. Scene Profiles

Every scene gets a profile. This tells you how many blocks to use.

**Micro Scene**  
Simple room, throwaway encounter, short interaction.

- Use: `SCENE`, `DESCRIBE`, `FEATURES` (+ maybe a couple of `CHECKS`), short `OUTCOME`.  
- Optional: `CREATURES`, `TREASURE`, `CLUE`.  
- Avoid: `CHOICE`, `FLOW` unless there is a real fork.

**Standard Scene**  
Typical meaningful scene (combat, investigation, social).

- Use: `SCENE`, `DESCRIBE`, `FEATURES`, `CREATURES` (if any), `CHECKS`, `CLUE` (if any), `OUTCOME`.  
- Optional: `CHOICE`, `TREASURE`, `FLOW`, `GMNOTE`.

**Set‑Piece Scene**  
Boss fights, major story beats, complex hazards.

- Use: everything you need: `SCENE`, `DESCRIBE`, `FEATURES`, `CREATURES`/`NPC`, `CHECKS`, `CLUE`, `CHOICE`, `OUTCOME`, `FLOW`, `GMNOTE`, references to `TRACK`.

---

## 2. Canonical Block Order (inside a scene)

Use this order in every scene note to build DM muscle memory:

1. `SCENE` (with profile + meta)  
2. `DESCRIBE` (read‑aloud + senses)  
3. `FEATURES` (points of interest, interactables)  
4. `CREATURES` / `NPC` (if present)  
5. `CHECKS` (all important DCs and saves)  
6. `CLUE` (if the scene hides or delivers important info)  
7. `CHOICE` (if there is a clear A/B/C decision)  
8. `TREASURE` (if any rewards)  
9. `OUTCOME` (state changes, next scenes)  
10. `FLOW` (optional DM walkthrough)  
11. `GMNOTE` (tone, special advice)

You do **not** have to use every block in every scene; just keep the order.

---

## 3. Block Index (What each block is for)

Below are the block types as Obsidian callouts, plus how to use each.

> Note: Obsidian treats any `[!word]` as a callout; all identifiers below (`scene`, `describe`, etc.) are arbitrary labels.

### 3.1 SCENE

Top‑level container for a scene / keyed area.

> [!scene] SCENE S3 – Engine Car: Sabotage in Progress
> Profile: Standard        <!-- Micro | Standard | Set‑Piece -->
> Type: Combat / Exploration
> Level: 3–4
> Tags: #scene #train #engine
> Role in story: Stop the sabotage and establish the train as fragile, high‑stakes.
> Tone: tense, industrial horror
> Relevant Tracks: Train Integrity (TI), Alarm Level (AL)

---

### 3.2 DESCRIBE (read‑aloud + senses)

Primary description block. Use this instead of separate read‑aloud + senses blocks.

> [!describe] DESCRIBE
> _Optional short read‑aloud to set the scene._
> Steam and coal smoke choke the air as you swing open the heavy door. Red emergency
> lights strobe over a maze of pistons and pipes.
>
> - **Sight:** Narrow metal walkway, sparking control console, masked saboteurs, red pressure gauge.
> - **Sound:** Roar of engines, clang of metal, shouted orders.
> - **Smell:** Ozone, hot oil, burnt cloth.
> - **Feel:** Constant vibration underfoot, heat from nearby pipes.

- For **Micro** scenes, you can just do bullets and skip the prose.

---

### 3.3 FEATURES (points of interest / interactables)

What’s in the scene that players can touch, examine, open, talk to, break, etc.

> [!features] FEATURES
> - **Control Console** – Cracked glass and exposed runes; studying it might reveal sabotage (see CHECKS).
> - **Rune‑Charges** – Glowing bricks strapped to pipes; obvious explosive threat (see CHECKS to disarm).
> - **Emergency Brake Wheel** – Large red wheel at the far bulkhead; triggers emergency stop (see OUTCOME).
> - **Overhead Catwalk** – Narrow, slightly swaying platform; provides height advantage but risky footing.

**Block responsibility:**  
Do **not** hide DCs or damage here; always write “(see CHECKS)” instead.

---

### 3.4 CREATURES (mini‑stats) & NPC

Quick‑reference for combatants and important NPCs in the scene. Full stat blocks live elsewhere.

> [!creatures] CREATURES (MINI‑STATS)
> - **Rail Butcher** – AC 15, HP 52, +6 to hit (1d10+4 slashing); shoves and uses hazards; see Bestiary B2.
> - **2x Ash‑Touched Brute** – AC 13, HP 30, +4 to hit (1d12+2 bludgeoning); advantage on shove/grapple.
>
> [!npc] NPC – Varkos, Cult Saboteur
> Role: Fanatical engineer trying to “save the world” by wrecking the train.
> Appearance: Soot‑stained overalls, cracked goggles, burned hands.
> Personality: Fervent, exhausted, convinced he’s right.
> Goals: Complete the sabotage; avoid dying pointlessly.
> Secrets: Knows about “The Final City” at the end of the line.
> Stat Reference: see Bestiary N4 – Varkos (full 5e stat block).

---

### 3.5 CHECKS (skill checks, saves, key rolls)

Single source of truth for all checks with meaningful consequences.

> [!checks] CHECKS
> - **Scan the sabotage** – Int (Investigation) DC 14 or Wis (Perception) DC 16  
>   - Success: Spot all active charges; realize sabotage is deliberate.  
>   - Failure: Miss some charges; they may go off later.
> - **Disarm a rune‑charge** – Dex (thieves’ tools) DC 15  
>   - Success: Safely remove or deactivate the charge.  
>   - Failure by 5+: Premature explosion (2d6 fire, Dex save 13 half).
> - **Stabilize engine systems** – Int (Arcana or tools) DC 15  
>   - Success: Pause Train Integrity loss for 3 rounds.  
>   - Failure: No effect; failure by 5+ also causes TI −1.

**Rule:** if failing a roll can hurt, branch the story, or change a track, it should be listed here.

---

### 3.6 CLUE (revelations that matter later)

Explicitly mark clues with IDs so you can index them.

> [!clue] CLUES
> - **C7 – Sabotage Blueprint Fragment**  
>   - Found: tucked under the control console or in Varkos’ satchel.  
>   - Tells them: There are secondary charges in the Observation Car.  
>   - Points to: Scene E5 – Observation Car – Civilians in Danger.
> - **C8 – Iron Choir Sigil**  
>   - Found: stamped into rune‑charges.  
>   - Tells them: The Iron Choir cult is behind the attack.

**Rule of thumb:**

- Only make CLUE entries for **plot‑relevant revelations**.  
- Trivia can live in FEATURES or OUTCOME.

---

### 3.7 CHOICE (A/B/C decision structure)

Use when a scene has clear, meaningful options with different consequences.

> [!choice] CHOICE – HOW TO DEAL WITH VARKOS
> - **Option A – Negotiate**  
>   - Fiction: They talk rather than attack; offer alternatives or evidence.  
>   - Mechanics: Use “Talk Varkos down” check in CHECKS.  
>   - Consequences: see OUTCOME – “Clean Success” or “Stalled Saboteur”.
> - **Option B – Immediate Attack**  
>   - Fiction: They open with violence.  
>   - Mechanics: Varkos acts first; each round he is free at the console → TI −1 at end of round.  
>   - Consequences: see OUTCOME – “Messy Success” or “Failure”.
> - **Option C – Retreat / Call Guards**  
>   - Fiction: They pull back and alert crew.  
>   - Consequences: Alarm +1; TI drops 1–2 before help arrives (see OUTCOME).

**Block responsibility:**  
CHOICE may describe **fictional** consequences, but raw track changes (e.g., “TI −1”, “Alarm +1”) live in OUTCOME.

---

### 3.8 TRACK (clocks / meters)

Reusable track for state: alarms, integrity, time pressure, etc.

> [!track] TRACK – Train Integrity (TI 0–5)
> 5 – Nominal: train runs smoothly.
> 4 – Strained: lights flicker, minor shuddering.
> 3 – Dangerous: constant vibrations; risky footing in engine areas.
> 2 – Critical: engine spaces hazardous; many checks risk damage.
> 1 – Failing: imminent catastrophic failure.
> 0 – Catastrophic: derailment or total shutdown; see “Derailment Event” scene.
>
> Thresholds:
> - When TI drops to 3: announce visible engine instability.  
> - When TI drops to 2: apply additional hazards in scenes tagged “engine”.  
> - When TI hits 0: immediately trigger “Derailment Event”.

Other scenes then say “TI −1” or “If TI ≤ 2, apply extra hazard”.

---

### 3.9 TREASURE (rewards)

Loot, boons, favors, XP / milestones.

> [!treasure] TREASURE & REWARDS
> - **Engine Crew Toolkit** – +1 to checks to repair trains or similar engines.  
> - **Sabotage Blueprints** – acts as Clue C7; also worth 100 gp to the right buyer.  
> - **Favor of the Conductor** – advantage on social checks with crew for the rest of the chapter.  
> - Advancement: award a milestone for preventing catastrophic derailment in this chapter.

---

### 3.10 OUTCOME (post‑scene state + branches)

What this scene changes and where it points next.

> [!outcome] OUTCOME
> - **Clean Success** – Varkos stopped, charges disarmed, TI ≥3  
>   - Set TI to max(TI, 3).  
>   - Alarm unchanged (or −1 if they cooperated with crew).  
>   - Next scenes: E4 – Guard Command Post or E5 – Observation Car (via C7).
> - **Messy Success** – Sabotage stopped, but TI ≤2 or multiple explosions  
>   - Train limps onward; treat future on‑train scenes as unstable terrain.  
>   - Authorities at next station are hostile; +2 social DCs there.
> - **Failure** – TI hits 0, or saboteurs escape with charges still active  
>   - Trigger “Derailment Event” scene immediately.  
>   - Set Alarm to 3.

**Block responsibility:**  
All **track changes, major condition changes, and branch routing** must be written here.

---

### 3.11 RANDOM (tables)

Random encounters, rumors, complications.

> [!random] RANDOM EVENTS – ONBOARD COMPLICATIONS (d6)
> 1 – Loose luggage breaks free; Dex save 12 or be knocked prone.  
> 2 – Passenger recognizes a PC from their past.  
> 3 – A door jams; Str (Athletics) 13 to force.  
> 4 – Panic rises; passenger panic +1 unless calmed.  
> 5 – Guard patrol checks tickets; failed Deception → Alarm +1.  
> 6 – Ominous omen outside the windows; use as foreshadowing.

---

### 3.12 FLOW (optional DM walkthrough)

Helps newer DMs run complex scenes; veterans can ignore.

> [!flow] FLOW (DM GUIDE)
> 1. **Start:** Use DESCRIBE. Let players ask 1–2 questions about the environment.  
> 2. **Common actions:**  
>    - Inspect console → “Scan the sabotage” check; may reveal Clues C7/C8.  
>    - Attack Varkos → go to CHOICE Option B; use CREATURES.  
>    - Call guards → CHOICE Option C; adjust Alarm and TI in OUTCOME.  
> 3. **End the scene when:**  
>    - TI is stabilized (≥3), or  
>    - TI hits 0, or  
>    - Varkos escapes and you move to pursuit.  
> 4. **If they do something unexpected:**  
>    - Decide if it plausibly helps or hurts TI or AL.  
>    - Adjust one track by ±1 and describe what visibly changes.

---

### 3.13 GMNOTE (advice / tone)

Non‑mechanical notes, reminders, tone guidance.

> [!gmnote] GM NOTE
> Emphasize the constant noise and vibration. Let players feel the countdown by describing
> the pressure gauge edging toward the red whenever TI drops. Reward creative engineering
> or negotiation that avoids a straight slugfest.

---

## 4. Style Rules (keep things consistent)

- **DC Rule:**  
  All nontrivial checks (damage, branches, track changes) must appear in `CHECKS`.  
  Inline references should point to CHECKS, not re‑define the effects.

- **State / Track Rule:**  
  Any change to a `TRACK`, major NPC attitude change, or campaign‑level state belongs in `OUTCOME` and nowhere else.

- **Block Responsibility Rule:**  
  - `FEATURES` never contains DCs or damage.  
  - `CHOICE` describes fictional consequences, not numeric track changes.  
  - `OUTCOME` is the canonical place for track changes and routing to other scenes.

- **Clue Rule:**  
  - Use `CLUE` only for information that unlocks locations, factions, or major decisions.  
  - Give each clue a unique ID (`C1`, `C2`… or `C2‑3` per chapter).  
  - Optionally maintain a separate “Clue Index” note with all IDs.

- **Description Rule:**  
  - `DESCRIBE` is the primary place for what the scene looks/feels like.  
  - Obvious facts go in DESCRIBE / FEATURES; things that require rolls go in CHECKS.

- **Profile Rule:**  
  - Micro scenes use as few blocks as possible (SCENE + DESCRIBE + FEATURES + minimal CHECKS + OUTCOME).  
  - Only Set‑Pieces should use every available block.

- **Order Rule:**  
  Always keep blocks in the canonical order inside a scene note (SCENE → DESCRIBE → FEATURES → CREATURES → CHECKS → CLUE → CHOICE → TREASURE → OUTCOME → FLOW → GMNOTE).

---

## 5. Templates

Copy these into new notes and fill them out for your own scenes.

### 5.1 Micro Scene Template

# SCENE <ID> – <Title>

> [!scene] SCENE <ID> – <Title>
> Profile: Micro
> Type: <type>        <!-- e.g. Combat / Exploration / Social -->
> Level: <level range>
> Tags: #scene
> Role in story: <1–2 lines>
> Tone: <1–2 words>
> Relevant Tracks: <list or “None”>

> [!describe] DESCRIBE
> _Optional 1–2 sentence intro._
> - **Sight:** …
> - **Sound:** …
> - **Smell:** …
> - **Feel:** …

> [!features] FEATURES
> - **Thing 1** – summary (see CHECKS if needed).
> - **Thing 2** – summary.

> [!creatures] CREATURES (MINI‑STATS)
> - <optional, or delete block if none>

> [!checks] CHECKS
> - <only key checks; small/low‑impact checks can be inline in FEATURES>

> [!treasure] TREASURE & REWARDS
> - <optional, or delete>

> [!outcome] OUTCOME
> - <Success> – <mechanical + narrative outcome>  
> - <Failure> – <mechanical + narrative outcome>

> [!gmnote] GM NOTE
> <Optional tone / tips, or delete>

---

### 5.2 Standard Scene Template

# SCENE <ID> – <Title>

> [!scene] SCENE <ID> – <Title>
> Profile: Standard
> Type: <type>
> Level: <level range>
> Tags: #scene
> Role in story: <1–3 lines>
> Tone: <1–2 words>
> Relevant Tracks: <list or “None”>

> [!describe] DESCRIBE
> _Optional short read‑aloud._
> - **Sight:** …
> - **Sound:** …
> - **Smell:** …
> - **Feel:** …

> [!features] FEATURES
> - **Feature / POI 1** – summary (see CHECKS).  
> - **Feature / POI 2** – summary.  
> - …

> [!creatures] CREATURES (MINI‑STATS)
> - <Name> – AC, HP, attack, role; stat ref.
> - …

> [!npc] NPC – <Name>           <!-- delete if none -->
> Role:
> Appearance:
> Personality:
> Goals:
> Secrets:
> Stat Reference:

> [!checks] CHECKS
> - **Action / trigger** – Ability (Skill) DC X  
>   - Success: …  
>   - Failure: …

> [!clue] CLUES
> - **C# – Clue Name**  
>   - Found: …  
>   - Tells: …  
>   - Points to: …

> [!choice] CHOICE – <Title>    <!-- only if there’s a real fork -->
> - **Option A – …**  
>   - Fiction: …  
>   - Consequences: see OUTCOME.
> - **Option B – …**  
>   - …

> [!treasure] TREASURE & REWARDS
> - …

> [!outcome] OUTCOME
> - **Clean Success** – … (track changes, next scenes)  
> - **Messy Success** – …  
> - **Failure** – …

> [!flow] FLOW (DM GUIDE)       <!-- optional -->
> 1. Start: …
> 2. Common actions: …
> 3. End when: …
> 4. If unexpected: …

> [!gmnote] GM NOTE
> <Tone, reminders, prep notes>

---

### 5.3 Set‑Piece Scene Template

# SCENE <ID> – <Title> (Set‑Piece)

> [!scene] SCENE <ID> – <Title>
> Profile: Set‑Piece
> Type: <type>
> Level: <level range>
> Tags: #scene #setpiece
> Role in story: <2–4 lines>
> Tone: <1–3 words>
> Relevant Tracks: <list>

> [!describe] DESCRIBE
> _Short, punchy read‑aloud + sensory bullets._

> [!features] FEATURES
> ...

> [!creatures] CREATURES (MINI‑STATS)
> ...

> [!npc] NPC – <Name>          <!-- optional -->
> ...

> [!checks] CHECKS
> ...

> [!clue] CLUES
> ...

> [!choice] CHOICE – <Main dilemmas>
> ...

> [!treasure] TREASURE & REWARDS
> ...

> [!outcome] OUTCOME
> ...

> [!random] RANDOM EVENTS (optional)
> - …

> [!flow] FLOW (DM GUIDE)
> ...

> [!gmnote] GM NOTE
> ...

---

### 5.4 TRACK Template

# TRACK – <Name>

> [!track] TRACK – <Name> (<Abbrev> min–max)
> max – description
> …
> min – description
>
> Thresholds:
> - When <Abbrev> = X: <effect / trigger>.
> - When <Abbrev> ≤ Y: <effect>.
> - When <Abbrev> = 0: <catastrophic / reset event>.

---

### 5.5 NPC Template

# NPC – <Name>

> [!npc] NPC – <Name>
> Role: <in the story>
> Appearance: <short>
> Personality: <short>
> Goals: <short>
> Fears / Weaknesses: <short>
> Secrets: <short>
> Hooks: <how PCs might care, 1–3 bullets>
> Stat Reference: <link to stat block / page>

---

## 6. Layout Map (Blocks → PDF / Booklet Regions)

This section defines **where each GM block appears** in the final 2‑column DM booklet layout.  
In Obsidian / web, you just use the blocks in the canonical order; in print/PDF, you route them to regions.

### 6.1 Regions

- **Header band (full width)** – top of the page, above columns.  
- **Left column** – fiction‑first: what the GM *says, shows, and roleplays*.  
- **Right column** – mechanics/state‑first: what the GM *rolls, tracks, and routes*.

### 6.2 Block → Region mapping

| Block        | PDF Region                     | Notes / Usage                                                          |
|--------------|--------------------------------|-------------------------------------------------------------------------|
| `SCENE`      | Header band (full width)       | Scene ID, title, level, type, 1‑line summary, tone, tags.              |
| `TRACK`      | Right column / hub sidebars    | Global or chapter clocks; also appears in chapter hubs.                |
| `DESCRIBE`   | Left column (top)              | Intro paragraph + sensory bullets; replaces classic read‑aloud boxes.  |
| `READ-ALOUD` | Left column (top, with DESCRIBE)| Optional; if used, sits as a short boxed intro above/beside DESCRIBE. |
| `GLANCE`     | Left column (with DESCRIBE)    | Additional “at a glance” bullets if you separate them from DESCRIBE.   |
| `FEATURES` / `POI` | Left column (mid)        | Interactable objects and terrain; never includes DCs or damage.        |
| `INTERACTION`| Left column (mid/bottom)       | Social node blocks; how to play an NPC conversation.                   |
| `CREATURES` / `NPC` | Left column (small card) | Visible foes and key NPCs, mini‑stats and hooks; full stats elsewhere. |
| `CHECKS`     | Right column (top)             | All important DCs and saves; usually the first block on the right.     |
| `CLUE`       | Right column (callout)         | Short box with C# IDs; often beside CHECKS or OUTCOME.                 |
| `CHOICE`     | Left column (near bottom)      | Fictional A/B/C options; references OUTCOME for mechanical changes.    |
| `OUTCOME`    | Right column (mid/bottom)      | Track changes, branches, “what this scene does” to the campaign.       |
| `TREASURE`   | Right column (near OUTCOME)    | Loot, boons, XP/milestones.                                            |
| `RANDOM`     | Right column (sidebar)         | Optional tables: encounters, rumors, complications.                    |
| `PHASE`      | Right column (Set‑Pieces)      | Multi‑phase fights/rituals; usually grouped under CHECKS/OUTCOME.      |
| `FLOW`       | Right column (optional)        | DM walkthrough; newer GMs read this, veterans can ignore.              |
| `GMNOTE`     | Right column (small sidebar)   | Tone, tips, safety notes, and variants; never the only source of rules.|

### 6.3 Profile → Page guidance

Use this as a sizing guide when you move from Obsidian notes into a PDF layout.

**Micro Scene (5–15 minutes of table time)**  
- Real estate: ~¼–½ page, often stacked 2–3 per page.  
- Left column: very short DESCRIBE + 2–3 FEATURES.  
- Right column: 1 small CHECKS block + 1‑line OUTCOME; TREASURE/CLUE only if needed.  
- Blocks used: `SCENE`, `DESCRIBE`, `FEATURES`, `CHECKS`, `OUTCOME` (+ optional `TREASURE`/`CLUE`).

**Standard Scene (20–40 minutes)**  
- Real estate: ~½–1 page.  
- Left column: full DESCRIBE, FEATURES, small CREATURES/NPC card, CHOICE summary if any.  
- Right column: CHECKS, CLUE, OUTCOME, TREASURE, small GMNOTE.  
- Blocks used: as per §1 “Standard Scene”, mapped using the table above.

**Set‑Piece Scene (45–90 minutes, big beats)**  
- Real estate: often a full spread (2 pages).  
- Left page/column: map (if any), DESCRIBE, FEATURES, CREATURES/NPC.  
- Right page/column: CHECKS, PHASE blocks, CLUE, CHOICE, OUTCOME, TREASURE, RANDOM, FLOW, GMNOTE.  
- Blocks used: as per §1 “Set‑Piece Scene”, but expanded and visually emphasized.

### 6.4 Implementation note

- In **Obsidian/web**, always follow the **canonical block order** from §2 and don’t worry about columns.  
- In **layout tools** (InDesign, Affinity, Figma), use master pages with:
  - A header band for `SCENE`.  
  - A left content frame for DESCRIBE/FEATURES/INTERACTION/CREATURES.  
  - A right content frame for CHECKS/CLUE/CHOICE labels/OUTCOME/TREASURE/TRACK/RANDOM/PHASE/FLOW/GMNOTE.  
- This keeps DM booklets visually consistent while letting you maintain a single source of truth in Markdown.


