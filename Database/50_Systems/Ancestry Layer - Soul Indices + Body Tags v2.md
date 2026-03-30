# Soul Indices — Current Package (Single-Doc Working Draft)

> This document contains the current “race” layer (Soul Indices) as one package.
> Only text explicitly marked **LOCKED** should be treated as final. Anything marked **TBD / UNLOCKED** is pending a decision.

---

## 1) Shared Framework (LOCKED)

### 1.1 What a Soul Index is (LOCKED)
- Soul Index = your **race/ancestry slot**.
- It defines how your soul behaves under pressure (your default “problem-solving mode”).
- It is separate from **Body Tag** (HUM / CYB / SYN) and separate from class.

### 1.2 Behavioural Axes (LOCKED)
Each Soul Index has a fixed 1–3 profile on three axes:
- **Structure:** 1 Wild / 2 Framed / 3 Systematic
- **Plasticity:** 1 World-first / 2 Balanced / 3 Self-first
- **Tempo:** 1 Eventual / 2 Rhythmic / 3 Immediate

Design constraint (LOCKED): each Index has exactly **one 1, one 2, one 3** across the three axes.

### 1.3 Soul Index kit structure (LOCKED)
Every Soul Index gives:
- **Skill Imprint:** +1 OFS (R) to **two skills**, each with tight, on-theme triggers.
- **Active:** one signature “button” (per rest / per scene / per encounter).
- **Passive (optional):** long-cycle or always-on effect (some Indices may have none).
- **Drawback:** always-on penalty.

### 1.4 Soul Index Stacking (LOCKED)
To prevent multi-player spam on the same roll/effect:

- If multiple instances of the **same named Soul Index feature** could apply to the **same roll or effect**
  (e.g., two Crowns’ Grids on one attack, or two Maws’ Deep Cuts on the same gate check),
  only **one instance** applies to that roll/effect.
- The creature making the roll chooses which instance to use.
- Different features (class abilities, spells, items, other Index features) can still stack normally, subject to their own rules.


### 1.5 Scene definitions (LOCKED)

Some Soul Index features and backgrounds refresh **per scene**.

- **Scene:** a single GM-framed beat — a combat, a discrete exploration task, or a social exchange with stakes.
  - A scene ends when the objective is resolved, the situation meaningfully resets, or the group disengages and transitions (location/time/actors).
  - **Downtime is not a scene.**
  - The GM is the final caller on when a scene starts/ends.

- **Major conflict scene:** a **scene the GM flags as a major conflict** (typically a high-stakes showdown; often initiative combat, a boss fight, or a major escalation).
  - Features that are 1× per **major conflict scene** are intended to be available in the big fights, not every minor scuffle.


### 1.6 Round timing (LOCKED)

Some Soul Index features are **once per round**.

- **Round = 6 seconds.**
- **In initiative:** use the normal initiative round structure.
- **Outside initiative:** if a rule says “once per round,” treat it as **once per 6 seconds** of in-fiction time.
  - If the table is not tracking seconds, the GM chunks time in ~6‑second beats during time‑tight sequences (hazards, chases, active threats) and should stay consistent within the scene.


---

## 2) Axis Profiles (LOCKED)

| Soul Index | Structure | Plasticity | Tempo |
|---|---:|---:|---:|
| **Boiler-Type** | 2 (Framed) | 1 (World-first) | 3 (Immediate) |
| **Crown-Type**  | 3 (Systematic) | 1 (World-first) | 2 (Rhythmic) |
| **Maw-Type**    | 3 (Systematic) | 2 (Balanced) | 1 (Eventual) |
| **Mirror-Type** | 1 (Wild) | 3 (Self-first) | 2 (Rhythmic) |

---

# 3) Boiler-Type (Wrath / Redline)

## 3.1 Skill Imprint — Furnace Presence (LOCKED)
You burn hotter than most and refuse to back down.

You gain **+1 OFS (R)** in each lane:

- **Pry (PRY):** when you use raw force/leverage in a direct, aggressive way to wrench, rip, pry, or brace through an obstacle clearly “in your way”.
- **Soul Grit (SLG):** when you roll Soul Grit to refuse to drop under harm / stay standing (per Soul Grit rules).

Skill-only; never modifies attacks/damage/DCs directly.

## 3.2 Active — Overboil (LOCKED)
High-risk overdrive: you hit harder the longer you keep landing blows, but incoming damage to you also scales up.

**Frequency:** 1× per Long Rest.  
**Activation:** Bonus Action to enter Overboil.

**Pressure**
- Enter with **Pressure 0**.
- End of each of your turns where you **dealt damage to at least one hostile** → Pressure +1 (max 3).
- If on your turn you **deal no damage** to any hostile → Overboil ends; Pressure resets to 0.

**Damage scaling (both ways)**
- While Overboil is active and Pressure ≥ 1:
  - Each time you **deal damage**, add:
    - Pressure 1: +1d4
    - Pressure 2: +1d6
    - Pressure 3: +1d8
  - Each time you **take damage**, damage against you also gains the same extra die (based on your current Pressure).

**End conditions**
- Overboil ends if you fail to deal damage on your turn, become unconscious, or a rule/feature ends it.
- When Overboil ends, Pressure resets to 0.

### Shove rider — Boiler Super‑Shove (LOCKED)

- Usable **once per Overboil activation**.
- You may only use Super‑Shove while **Overboil is active** and your **Pressure ≥ 1**.
- When you take the **Shove** action and succeed against a **hostile** creature:
  - You may **push the target up to 10 ft** and **knock it prone** (both, on the same shove).

**Impact damage (LOCKED)**
- The target also takes **bludgeoning damage equal to your current Pressure die**:
  - Pressure 1: **1d4**
  - Pressure 2: **1d6**
  - Pressure 3: **1d8**
- This damage **counts** as “you dealt damage to a hostile creature this turn” for Overboil’s upkeep / Pressure logic.
- This damage **does not** receive an additional Overboil bonus die (it already *is* the Pressure die for this shove).

## 3.3 Passive — Tomorrow’s Wounds (LOCKED)
Once per Long Rest, when you would gain a **Minor or Major Injury** (non-printing), you may defer it if you have no deferred Injury already.

- You have one **Tomorrow Slot** (one deferred Injury only).
- A deferred Injury:
  - has **no effect** until after your next Trueflow Long Rest,
  - does not count toward injury caps/merges/Hellstatic while deferred.
- At the **end of your next Trueflow Long Rest**, apply the deferred Injury as if newly gained and clear the slot.
- No HP / temp HP effects; pure deferral.

## 3.4 Drawback — Blunt Logic (LOCKED)
- You suffer **OFS −1 (R)** on **all Riddlecraft (RDL)** checks.

---

# 4) Crown-Type (Pride / Command)

## 4.1 Skill Imprint — Executive Protocol (LOCKED)
You route power through chains of command and planned schemes.

You gain **+1 OFS (R)** in each lane:

- **Influence (IFC):** when you invoke rank/contract/regulation/procedure to secure compliance.
- **Guile (GIL):** when running structured deception as part of a plan (cover ID, operation, long-form misdirection).

Skill-only; never modifies attacks/damage/DCs directly.

## 4.2 Active — Priority Target / Grid (LOCKED SHAPE; numbers currently used in sims)
**Frequency:** 1× per major conflict scene.

At the start of your turn:
- Choose up to **2 allies** in your IAZ as **Under Command**.
- Choose 1 hostile you can perceive as the **Priority Target**.

For the next **2 of your turns**, when you or a commanded ally makes an **attack roll vs the Priority Target**:
- Add **+1d4 OFS (R)** to that attack roll (before Bands).

### Multi‑Crown stacking limits (LOCKED)
- A creature can be Under Command of **only one Crown at a time**.
- A hostile can be Priority Target of **only one Grid at a time**.
- A single attack can benefit from **only one Grid bonus**.

## 4.3 Passive — None (LOCKED)
- Crown-Type has **no passive feature**.

## 4.4 Drawback — Can’t Carry Alone (LOCKED)
- In multi-step teamwork challenges, if Crown attempts to solo multiple steps, later solo checks in that chain suffer **−d4 OFS**.

---

# 5) Maw-Type (Greed / Hoarder)

## 5.1 Skill Imprint — Tinker’s Greed (LOCKED)
You are always a bit better when fiddling with things for value.

You gain **+1 OFS (R)** in each lane:

- **Tinker (TNK):** when opening/harvesting/disarming/repurposing a device/container/salvage for loot or usable supplies.
- **Riddlecraft (RDL):** when solving puzzles/codes/logic gates that directly gate loot/supplies.

Skill-only; never modifies attacks/damage/DCs directly.

## 5.2 Passive — Hidden Pocket (LOCKED)
- You have one on-body stash slot:
  - One personal-scale item you carry counts as **0 BL** (one item only).

## 5.3 Active — Deep Cut / Jackpot Pull (LOCKED)
**Frequency:** 1× per Trueflow Long Rest.

When you make a loot-gate check (TNK/PRY/SYS or GM-approved) to access supplies/loot:
- GM rates the gate **Tier 1–3**.
- Roll **Tier d4** (1–3d4), choose **one** result, add it as **OFS (R)** to the check.

### Multi‑Maw stacking limits (LOCKED)
- A check can benefit from only **one Deep Cut**.
- Once a gate has been the target of any Deep Cut (success or fail), it cannot be Deep Cut again until the fiction meaningfully changes (new gate / new scene / GM-approved new approach).

## 5.4 Drawback — Loot Itch (LOCKED)
- Once per scene, the first time you fail a check clearly aimed at gaining loot/supplies, you take **1d4 psychic damage** that **cannot reduce you below 1 HP**.

---

# 6) Mirror-Type (Envy / Adaptation)

## 6.1 Skill Imprint — Echo Sense (LOCKED)
You read danger patterns better than most.

You gain **+1 OFS (R)** in each lane:

- **Stillsense (STL):** when using Stillsense to read live threat patterns (LoS, patrol routes, fields of fire) to avoid being detected and to move safely in danger.
- **Godsight (GDS):** when reading wards/sanctity/spoor to infer where it’s safe/unsafe to move or act.

Skill-only; never modifies attacks/damage/DCs directly.

## 6.2 Passive — Adaptive Shell (LOCKED, UPDATED)
You can be adapted to **one damage type at a time**.

**Imprint trigger (LOCKED)**
- You imprint an adaptation **only when you take damage** of a type.
- If you have **no Current Adaptation**, after that damage is resolved you may set that type as your **Current Adaptation**.
  - (So the very first hit of a new type is not reduced.)

**Mitigation (LOCKED)**
- While adapted, you do **not** gain resistance.
- **Once per round**, the first time you would take damage of your Current Adaptation type:
  - Roll **1d6** and reduce that damage by the result (minimum 0).

**Change/Clear (LOCKED SHAPE)**
- You can clear or change your adaptation once per Short or Long Rest.
- You never stack multiple types.
- Certain special/meta harms may be marked **non-adaptable** at GM discretion.
- **Non-adaptable harms are pure GM discretion** (no default list is enforced).

## 6.3 Active — Reflected Strike (LOCKED SHAPE)
**Frequency:** 1× per scene.

When you hit a target while you have a Current Adaptation:
- You may treat that hit’s damage as the **adapted type**, and
- add **+1d4** damage (damage Offset) to that hit.

## 6.4 Drawback — Raw Pattern (LOCKED SHAPE)
When you make a **non-combat** check with:
- no Advantage,
- no Help/Assist,
- no positive random bonus (no +d4, rerolls, etc.),
you suffer **−d4 OFS** on that roll.

---

# 7) Index‑Flavoured Backgrounds (LOCKED TEMPLATE)

- Narrative-first.
- Each Index‑flavoured background grants **exactly one** small mechanical **micro‑boost**.
- This micro‑boost is **skill-check only** (no attack rolls, no damage, no HP, no movement, no inventory/currency changes).

## 7.1 Background micro‑boost types (LOCKED)
A background chooses **one** of the following micro‑boost patterns:

**A) Skill Focus (static)**
- Pick **one skill** and write a **narrow trigger**.
- When you roll that skill under that trigger, gain **+1 OFS (R)** on the check.

**B) Scene Push (spike)**
- Pick **one skill** and write a **narrow trigger**.
- **1× per scene**, when you roll that skill under that trigger, you may add **+1d4 OFS (R)** to the check.

(Backgrounds may still have narrative permissions, contacts, and story hooks; mechanically they are limited to the single micro‑boost above.)
