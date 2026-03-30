---
created: 2025-11-25
schema: apex-docs-v1
code: RUL-BAS-DCX-C
title: "DC Check Block Template — Skill, Save & Contest"
type: rule
audience: table
status: draft
version: 0.9
updated: 2025-11-25
tier: core
tags:
  - rule/checks
  - rule/template
  - table-facing
aliases:
  - "DC Check Template"
  - "DC Checks — Block Template"
summary: "Block-based template for writing checks: one layout that covers skill tests, saves, contests, postures, and passive checks using the Skills & Postures system. Uses Locks, Bands, and the standard roll-state beltline."
---

# DC Check Block Template — Skill, Save & Contest
^top

> [!summary]+ On this page
> [[#^tldr|TL;DR]] · [[#^blocks|Block list (slots)]] · [[#^master|Master row template]] · [[#^variants|Variants (skill, save, contest, posture, passive)]] · [[#^examples|Worked examples]] · [[#^accept|Acceptance checks]]

---

## TL;DR
^tldr

- Every meaningful roll in a scene lives in the scene’s **CHECKS** block, and every check row uses the **same shape**.
- The template is built from a **small set of slots (“blocks”)** that you can pre‑design in layout:
  - **[CHECK LABEL]** — short name.
  - **[CHECK TYPE]** — Skill / Save / Contest / Posture / Passive.
  - **[LANE]** — skill lane + ability (e.g. `SYS (INT)`).
  - **[LOCK]** — `Keyed R#` / `Open R#` / `—`.
  - **[DC MODE]** — Fixed / Formula / Passive / Posture / Contest.
  - **[DC VALUE]** — number or formula / source (e.g. `15`, `Scene DC`, `vs highest Passive Awareness`).
  - **[HOOKS]** — optional Chaos / Injury / Track hooks.
- Outcomes are always written in **Bands**: `CS / S / F / CF`, so they automatically plug into the global rule `Gate → Hard → Soft → d20 → Offsets → Bands`.
- Postures (Stealth, Influence, etc.) use the same template: just set `[CHECK TYPE] = Posture` and `[DC MODE] = Posture` and point to the posture’s own DC recipe.
- This card defines **structure only**. The mechanics of Locks, Bands, Advantage/Disadvantage, Chaos, Injuries, etc. live on their own rule cards.

---

## Block list (slots you can design around)
^blocks

These are the “puzzle pieces” you can turn into chips / layout fragments. The idea is that every check row is just these blocks in a consistent order.

### 1) Identity & fiction

**[CHECK LABEL]**  
Short, human‑readable name for the check.

- Type: text.
- Examples: `Scan the sabotage`, `Leap the gap`, `Talk Varkos down`, `Brace the walkway`.

**[TRIGGER]**  
When does this check happen? Put this in prose or as a clause.

- Type: short sentence or clause.
- Examples:
  - `When a PC examines the rune‑charges for more than a glance.`
  - `When a PC tries to cross the broken gantry without a safety line.`

You can inline [TRIGGER] in the CHECKS line, or keep it implicit if the label already implies it.

---

### 2) Mechanical core

**[CHECK TYPE]**  
What kind of roll this is, mechanically.

- Allowed values:
  - `Skill` — a normal ability/skill roll.
  - `Posture` — Stealth, Influence, or any future posture pattern.
  - `Save` — a saving throw or save‑like test (e.g. Soul Grit).
  - `Contest` — opposed roll, usually vs another creature or lane.
  - `Passive` — no roll; compare DC vs Passive score or a fixed value.

**[LANE]**  
Which skill lane and ability the player rolls.

- Format: `CODE (ABILITY)` or just `CODE` if ability is implied by the lane.
- Examples:
  - `SYS (INT)`
  - `ACR (DEX)`
  - `RGG (STR)` or `RGG (CON)` (when using Ability‑Flex)
  - `IFC (CHA)`
- For multi‑option checks, you can write `SYS or TNK` or split into two rows if consequences differ.

**[LOCK]**  
Rank gate / eligibility.

- Allowed values:
  - `Keyed R#` — must have that rank (or higher) to even attempt.
  - `Open R#` — anyone can try; at/over the rung = Soft Advantage, under = Soft Disadvantage.
  - `—` — no special lock (use default skill rules).
- Examples:
  - `Keyed R2`
  - `Open R1`
  - `—` (for a simple, ungated Awareness check)

**[DC MODE]**  
How the DC is determined.

- Allowed values:
  - `Fixed` — single number (e.g. `15`).
  - `Formula` — derived from context (e.g. `10 + half damage`, `Scene DC +2`).
  - `Passive` — compare vs a passive score (e.g. `vs highest Passive Awareness`).
  - `Posture` — posture‑specific matrix; DC is defined on the posture card.
  - `Contest` — opposed roll vs another lane / creature.

**[DC VALUE]**  
The number, expression, or target for the DC.

- With `Fixed` — write a number: `13`, `15`, `18`.
- With `Formula` — write the expression: `10 + half incoming damage (round down) or scene DC, higher`.
- With `Passive` — write the source: `vs highest Passive Awareness`, `vs Passive Insight or Disposition DC (higher)`.
- With `Posture` — either:
  - `Stealth matrix (DC 12 + up to 3 dials)`; or
  - `Influence matrix (Disposition DC ± Angles)`.
- With `Contest` — write the opposing roll: `vs STR (Athletics) shove`, `vs IFC (CHA) counter‑influence`.

---

### 3) Hooks & tags

**[GROUP RULE]**  
How to interpret multiple PCs rolling.

- Examples:
  - `Group: at least half succeed or the group fails.`
  - `Each PC resolves separately; on F/CF apply zone cost.`
  - `Lead roller only; others Assist.`
- If omitted, default to your table’s normal group‑check policy.

**[CHAOS HOOK]**  
When this check triggers a Chaos roll (if at all).

- Examples:
  - `Chaos: roll on F/CF only.`
  - `Chaos: roll once per attempt, regardless of result.`
  - `Chaos: none.`

**[INJURY HOOK]**  
Any explicit injury outcomes tied to this check.

- Examples:
  - `CF: 1 Minor Injury (lane by fiction).`
  - `F/CF: 1 Minor Injury if fall distance is 20 ft or more.`
  - `No explicit injury; use generic hazard rules.`

**[TRACK / METER HOOK]**  
How this check moves existing tracks (e.g. CDR, Alarm, TI).

- Examples:
  - `On CF: Alarm +1.`
  - `On S/CS: Train Integrity +1 (repair).`
  - `On F/CF: CDR +5 in this Zone.`

You can combine these hooks into a single `[HOOKS]` field if you prefer one visual chip.

---

### 4) Outcome bands (results)

**[CS / S / F / CF]**  
Text for each band’s narrative and mechanical result.

- These always follow the global Bands model:
  - `CS` — roll ≥ DC + 5.
  - `S`  — roll between DC and DC + 4.
  - `F`  — roll between DC − 4 and DC − 1.
  - `CF` — roll ≤ DC − 5.
- For simple checks, you can combine `CS/S` or `F/CF` if they share behavior.
- For posture checks, you usually write outcomes in terms of “unnoticed / suspicion / spotted” (Stealth) or “agree / stall / refuse” (Influence).

---

## Master row template (how a check is written)
^master

You use these blocks inside a scene’s **CHECKS** callout. The master shape is:

> [!checks] CHECKS  
> - **[CHECK LABEL]** – [CHECK TYPE]; [LANE]; [LOCK]; **DC:** [DC VALUE] ([DC MODE])  
>   - CS: [result on Critical Success]  
>   - S: [result on Success]  
>   - F: [result on Failure]  
>   - CF: [result on Critical Failure]  
>   - Group: [GROUP RULE] (optional)  
>   - Hooks: [CHAOS HOOK] · [INJURY HOOK] · [TRACK / METER HOOK] (optional)

Notes:

- You do not restate Advantage/Disadvantage here; those are implied by **Locks**, posture rules, and other features.
- You do not restate the **beltline** (`Gate → Hard → Soft → d20 → Offsets → Bands`); this template assumes that order.
- Postures plug in via `[CHECK TYPE] = Posture` and `[DC MODE] = Posture`, but still use the same row shape.

---

## Variants (skill, save, contest, posture, passive)
^variants

The point of having `[CHECK TYPE]` and `[DC MODE]` is that you never need a different layout; you just pick the right pair of values.

### A) Skill check (standard)

**Use when:** a PC rolls a skill lane against a DC.

- `[CHECK TYPE] = Skill`
- `[DC MODE] = Fixed` or `Formula`

Example shape:

- **Stabilize engine systems** – Skill; `SYS (INT)`; `Open R2`; **DC:** 15 (Fixed)  
  - CS: Systems stabilize cleanly; cancel any pending penalty this round.  
  - S: Systems stabilize; pause Train Integrity loss for 3 rounds.  
  - F: No effect.  
  - CF: Overload; Train Integrity −1 and Chaos: roll once.  
  - Hooks: Chaos: roll on CF; Track: TI −1 on CF.

### B) Save / special test

**Use when:** the roll is conceptually a save (resisting damage/effect) or uses a formula DC.

- `[CHECK TYPE] = Save`
- `[DC MODE] = Formula`

Example shape:

- **Hang on at 1 HP (Soul Grit)** – Save; `SLG (CON)`; `—`; **DC:** `10 + half incoming damage (round down) or scene DC, higher` (Formula)  
  - CS: Stay at 1 HP; keep your action; gain Strain.  
  - S: Stay at 1 HP; lose your bonus action; gain Strain.  
  - F: Drop to 0 HP; gain Strain.  
  - CF: As Failure plus 1 level of Exhaustion.  
  - Hooks: Injury: death avoided on S/CS (no Hellstatic gain).

### C) Contest

**Use when:** there is an explicit opposed roll.

- `[CHECK TYPE] = Contest`
- `[DC MODE] = Contest` (write the opposing lane in [DC VALUE])

Example shape:

- **Shove the cultist off the gantry** – Contest; `PRY (STR)`; `Open R1`; **DC:** `vs PRY (STR) or ACR (DEX) of target` (Contest)  
  - CS: Target is shoved and knocked prone at the destination.  
  - S: Target is shoved.  
  - F: No movement.  
  - CF: You overextend; you are Off‑Balance (Strain) or risk a fall (GM’s call).  
  - Group: Single attacker vs single defender.  
  - Hooks: Injury: if anyone falls 20 ft+ on CF, apply fall damage and consider a Minor Injury.

### D) Posture (Stealth / Influence)

**Use when:** you are using a posture’s dedicated DC recipe.

- `[CHECK TYPE] = Posture`
- `[DC MODE] = Posture`
- [LANE] = the lane used for the posture (e.g. `DEX (ACR)` for Stealth, `CHA (IFC)` for Influence).

You do not restate all posture math here; just name the posture and any local tweaks.

**Stealth example:**

- **Slip past the guard squad** – Posture; `ACR (DEX)`; `Open R1`; **DC:** `Stealth – contest vs highest Passive Awareness (or DC 12 + up to 3 dials when unwatched)` (Posture)  
  - CS: You pass completely unnoticed.  
  - S: You pass; minor noise or trace, but no response.  
  - F: A guard becomes suspicious; soft complication; consider a Strain cost or position loss.  
  - CF: You are spotted; alarm or direct confrontation.  
  - Group: At least half of the group must pass or the group is treated as failing.  
  - Hooks: Chaos: roll once on CF if the area is tagged volatile.

**Influence example:**

- **Talk Varkos down** – Posture; `IFC (CHA)`; `Open R2`; **DC:** `Influence – vs higher of Passive Insight or Disposition DC, ± Angles` (Posture)  
  - CS: Varkos stands down and offers a useful concession or information.  
  - S: Varkos stands down.  
  - F: He stalls or counteroffers; you lose time or position.  
  - CF: He refuses and escalates; prepare for violence or sabotage.  
  - Hooks: Track: on F/CF, Alarm +1.

### E) Passive check

**Use when:** no roll is made; you just compare passive scores or a fixed value.

- `[CHECK TYPE] = Passive`
- `[DC MODE] = Passive`

Example:

- **Notice the rune‑charge tripwire** – Passive; `Awareness (WIS)`; `—`; **DC:** `vs Passive Awareness of any PC at the front` (Passive)  
  - CS/S: The lead PC notices the hazard in time; they may call for an active check to safely disarm it.  
  - F/CF: The group blunders into the hazard; trigger the trap’s effect.  
  - Hooks: Chaos: roll once when the trap is triggered.

---

## Worked examples (assembled CHECKS block)
^examples

Here is a CHECKS block using this template in a Standard scene.

> [!checks] CHECKS  
> - **Scan the sabotage** – Skill; `SYS (INT)`; `Open R1`; **DC:** 14 (Fixed)  
>   - CS: You spot every active charge and their control runes; gain Advantage on any later disarm checks here.  
>   - S: You identify all active charges.  
>   - F: You miss one hidden charge; it may trigger later in the scene.  
>   - CF: You misread the setup; GM may place a false “safe” zone or apply TI −1 when the mistake plays out.  
>   - Hooks: Track: TI −1 on CF when the missed charge goes off.  
> 
> - **Disarm a rune‑charge** – Skill; `TNK (DEX)`; `Keyed R1`; **DC:** 15 (Fixed)  
>   - CS: You disarm the charge cleanly and can recover a usable component.  
>   - S: You disarm the charge safely.  
>   - F: No progress; another attempt costs 1 round.  
>   - CF: Premature detonation in a small burst; 2d6 damage (Dex save 13 half) to nearby creatures.  
>   - Hooks: Chaos: roll on CF only; Injury: apply Minor Injury if CF explosion plus fall or tight quarters justify it.  
> 
> - **Stabilize engine systems** – Skill; `SYS (INT)`; `Open R2`; **DC:** 15 (Fixed)  
>   - CS: Systems stabilize; Train Integrity +1 and any current penalties clear.  
>   - S: Systems stabilize; pause TI loss for 3 rounds.  
>   - F: No effect.  
>   - CF: Mis‑calibration; TI −1.  
>   - Hooks: Track: TI +1 on CS; TI −1 on CF.  
> 
> - **Slip past the guard squad** – Posture; `ACR (DEX)`; `Open R1`; **DC:** `Stealth – vs highest Passive Awareness (or DC 12 + up to 3 dials if unwatched)` (Posture)  
>   - CS: Entire group passes unnoticed; you may also learn a small extra detail about the area.  
>   - S: You pass; no immediate response.  
>   - F: One guard is suspicious; GM escalates soft pressure.  
>   - CF: You are spotted; guards respond and Alarm +1.  
>   - Group: At least half must pass or the group is treated as failing.  
>   - Hooks: Track: Alarm +1 on CF; Chaos: roll on CF if the zone is volatile.

This pattern should look and feel the same in every CHECKS block, regardless of the underlying mechanics.

---

## Acceptance checks (adversarial sanity tests)
^accept

Use these to verify that your implementation is consistent and that the slots are sufficient.

1. **Skill vs DC with lock**  
   - A row marked `Skill; ACR (DEX); Open R1; DC: 14 (Fixed)` is valid.  
   - Any PC may attempt; ACR rank at/over 1 rolls with Soft Advantage, under 1 rolls with Soft Disadvantage.  
   - Bands (CS/S/F/CF) are determined versus DC 14; you do not restate the math here.

2. **Keyed lock can’t be bypassed**  
   - A row marked `Skill; TNK (DEX); Keyed R2; DC: 15 (Fixed)` **cannot** be attempted by a TNK R1 character, even with Help.  
   - The template captures this with `[LOCK] = Keyed R2` and does not need extra wording.

3. **Formula DC (Soul Grit style)**  
   - A row with `[CHECK TYPE] = Save` and `[DC MODE] = Formula` and `DC: 10 + half damage or scene DC, higher` works for any amount of damage.  
   - Bands still apply normally; you never need to alter the layout to support formula DCs.

4. **Posture contest (Stealth)**  
   - A row with `[CHECK TYPE] = Posture`, `[DC MODE] = Posture`, and `DC: Stealth – vs highest Passive Awareness (or DC 12 + dials when unwatched)` correctly covers both the contest and matrix cases under a single row.  
   - Group behavior is captured in `[GROUP RULE]`, e.g. “at least half succeed”.

5. **Influence vs disposition**  
   - A row with `[CHECK TYPE] = Posture`, `[LANE] = IFC (CHA)`, and `DC: Influence – vs higher of Passive Insight or Disposition DC, ± Angles` correctly encodes the resistance logic without changing the base template.  
   - Money‑on‑the‑table or Angles apply as DC adjustments (Offsets), not as separate layout elements.

6. **Passive check vs Passive score**  
   - A row with `[CHECK TYPE] = Passive` and `DC: vs Passive Awareness of the lead PC` represents a no‑roll detection check.  
   - Only the DC comparison changes; the row shape stays identical.

7. **Chaos & Injury hooks are additive, not structural**  
   - Adding `Hooks: Chaos: roll on CF only; Injury: CF → 1 Minor Injury` does not require a different template.  
   - Chaos rolls and injury dice plug in as Offsets / separate procedures; the DC card stays as a structural description.

8. **Group check semantics are explicit**  
   - If a check says `Group: at least half succeed or the group fails`, it is clear how to resolve multiple PCs rolling.  
   - The template lets you vary group behavior per check without altering any other slot.

If a check you want to write does not fit into this matrix, it is a red flag: either it should be decomposed into two simpler checks, or you are trying to encode a whole subsystem instead of a single roll.
