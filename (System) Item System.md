---
created: 2025-12-07
schema: apex-docs-v1
code: RUL-BAS-ITM-0
title: "Items — Rarity, Tiers & Slots"
type: rule
audience: table
status: draft
version: 0.3
tier: core
player_facing: true
tags:
  - rule/items
  - rule/gear
  - player-facing
aliases:
  - "Items — Rarity & Tiers"
  - "Item Slots & Rarity Matrix"
links:
  - "[[Simple Inventory (BL) — Ballast + Pockets]]"
  - "[[Skills & Postures]]"
  - "[[Chaos & Harmony — Unified Rules]]"
  - "[[Harmony Attunement]]"
  - "[[Revival — Lucifer & Quantum Print]]"
imports: []
summary: "Two axes: **Rarity** (Common → Relic) and **Tier (T1–T5)**. Rarity sets how many **passive/active slots** an item may carry; Tier sets how strong each slot is. Harmony/Chaos tags and Attunement gates sit on top."
---

# Items — Rarity, Tiers & Slots
^top

> [!summary]+ 🧭 On this page
> [[#^tldr|💎 TL;DR]] · [[#^axes|1️⃣ Axes (Rarity × Tier)]] · [[#^rarity|2️⃣ Rarity bands → Slot budgets]] · [[#^tier|3️⃣ Tier bands → Power bands (T1–T5)]] · [[#^slots|4️⃣ Slot types — Passives, Actives, Drawbacks]] · [[#^tags|5️⃣ Tags & Attunement (Harmony/Chaos)]] · [[#^template|6️⃣ Obsidian item template]] · [[#^accept|✅ Acceptance checks]]

---

## 💎 TL;DR ^tldr

- **Two axes:**  
  - **Rarity** = **how many things** an item can do (slot budget).  
  - **Tier (T1–T5)** = **how hard** each thing hits (power band / act).  

- **Passives vs Actives:**  
  - **Passive slots** = always-on or “no-tempo” effects.  
  - **Active slots** = action/bonus/reaction effects with per-scene/per-chapter limits.  

- **Baseline pattern (typical, not mandatory):**

  | Rarity    | Short | Typical pattern (slot budget) |
  |----------|:-----:|--------------------------------|
  | **Common**   | C   | **1 Passive**, **0 Actives** |
  | **Uncommon** | U   | **1 Passive** **+ 0–1 Active** |
  | **Rare**     | R   | **2 Passives + 1 Active** |
  | **Legendary**| L   | **2–3 Passives + 1–2 Actives** |
  | **Relic**    | X   | **3–4 Passives + 2 Actives** (capstone / campaign items) |

- **Tier mapping (rough):**  
  - **T1** — Onboarding / Prologue / early Act I.  
  - **T2** — Late Act I / early Act II.  
  - **T3** — Mid-campaign (Act II).  
  - **T4** — Late Act II / early Act III.  
  - **T5** — Endgame / capstone.

- **Gates:**  
  - Many **Rare+** items require **Attunement**.  
  - Some top-end pieces additionally require **Harmony Attunement** (license) or specific **Chaos Level** brackets.

---

## 1️⃣ Axes — Rarity × Tier ^axes

- **Rarity = slot budget**  
  What label is printed on the card (**Common → Relic**) and how many **passive/active slots** you’re allowed to fill.

- **Tier (T1–T5) = power band**  
  A hidden design dial: each slot’s **numerical weight** and **tempo** is chosen from a Tier band so that **T3 Rare** feels very different from **T1 Rare** even if the slot count matches.

> [!tip] Design intent  
> - **Rarity answers:** “How many toys live on this card?”  
> - **Tier answers:** “If you roll the big toy, how much does the table feel it?”

---

## 2️⃣ Rarity bands → Slot budgets ^rarity

**Rarity sets the *maximum* slot budget.** You don’t have to use all slots, but you **never exceed** them without an explicit exception on the card.

> [!rule] Slot types (quick)  
> - **Passive slot** = a single, coherent always-on effect or rider.  
> - **Active slot** = one activatable move (action, bonus, reaction, or scene trigger) with a defined recharge (per scene / per chapter / per rest).

### 2.1 Rarity Matrix (max slots)

| Rarity | Code | Max Passive slots | Max Active slots | Attunement expectation | Notes |
|--------|:----:|:-----------------:|:----------------:|------------------------|-------|
| **Common** | C | **1** | **0** | Rarely | Simple charms, +1 narrow checks, iconography. |
| **Uncommon** | U | **1–2** | **0–1** | Sometimes | First “real” items. One strong passive, maybe a minor active. |
| **Rare** | R | **2–3** | **1** | Often | Signature weapons, role-defining sets. |
| **Legendary** | L | **3** | **1–2** | Nearly always | Multi-mode anchors; may carry Harmony/Chaos tags. |
| **Relic** | X | **3–4** | **2** | Always (often Harmony) | Campaign relics; define arcs more than math. |

> [!note] Pattern vs cap  
> - The table is a **cap**, not a prescription.  
> - A **Rare** can be “quiet” (2 passives, 0 actives) if the passives are **T4/T5** weight.  
> - A **Common** that wants a small narrative quirk can do it as **spice** inside the 1 passive slot.

### 2.2 Passive slot sizing (Minor vs Major)

For design, treat each passive as **Minor** or **Major**; the slot cap above counts **effects**, not points:

- **Minor passive examples (T1–T2):**  
  - +1 **OFS (R)** to a **single skill lane** (e.g., **TNK checks only**).  
  - Advantage on **one very narrow posture** (e.g., **Influence checks only vs a named faction**).  
  - +1 to **one saving throw** vs **one damage type**.

- **Major passive examples (T2–T4):**  
  - +1 **OFS (R)** to **two linked lanes** (e.g., **SYS & TNK**; or **Awareness & Riddlecraft**).  
  - Advantage on a **common posture** under clear conditions (e.g., **Stealth in industrial interiors**).  
  - Resist a damage type **while attuned & conscious**.

As a soft rule of thumb:

- **Common** = 1 Minor.  
- **Uncommon** = 1 Major **or** 2 Minor.  
- **Rare** = 1 Major + 1–2 Minor.  
- **Legendary/Relic** = 2 Major + 1–2 Minor (respecting slot count).

### 2.3 Active slot sizing (scene vs chapter)

Each **Active slot** chooses **one** recharge lane:

- **Per scene** — “**1×/scene**” or “**PB/scene** (proficiency bonus)”.  
- **Per chapter** — “**1×/chapter**” or “**2×/chapter** (Legendary+ only)”.  
- **Per rest** — “**1×/short rest**” or “**1×/long rest**”.

Indicative power:

- **Uncommon Active (T1–T2):**  
  - Add **+2 OFS (R)** to one declared test (after roll, before bands).  
  - Grant **soft Advantage** to a single skill in a scene.  

- **Rare Active (T2–T3):**  
  - Small **temp HP** bubble to a single target.  
  - One-step **band push** (S → CS or F → S) if margin is within 2.

- **Legendary/Relic Active (T3–T5):**  
  - Short, contained **teleport** or **movement override** in the IAZ.  
  - **Zone-tuned** effect (e.g., small targeted **−CDR** nudge or resist vs one ASH flavor), never bypassing core CDR floors.

---

## 3️⃣ Tier bands (T1–T5) — power by act ^tier

Tier is **almost never printed** on the player card; it’s a GM/author dial to make sure numbers line up with the current Act.

| Tier | Rough act band | Passive feel | Active feel |
|:---:|-----------------|-------------|-------------|
| **T1** | Prologue / early Act I | Small nudges; +1 to narrow things; once-per-scene micro tricks. | “Get out of trouble once” buttons with obvious limits. |
| **T2** | Late I / early II | +1 in broader cases; +2 in narrow cases; one solid scene trick. | Per scene resource that matters in 1–2 fights. |
| **T3** | Act II | +2 to a lane or posture under clear fiction; small resistances. | Once-per-scene big moves or once-per-chapter clutch moves. |
| **T4** | Late II / early III | Reliable shaping of a PC’s lane; edge against Injuries/HS. | Strong, defining actives with real constraints; may interact lightly with Chaos/Harmony. |
| **T5** | Endgame / capstone | “You are never bad at this again” in a slice. | Campaign-defining moments gated by chapter or story triggers. |

> [!tip] Upgrading an item  
> You can **raise Tier** without changing Rarity (and thus slot count). E.g., a **T2 Rare** sword might upgrade to a **T4 Rare** with the same text but **larger numbers / broader triggers**.

---

## 4️⃣ Slot types — Passives, Actives, Drawbacks ^slots

### 4.1 Passive slots

**Definition:** Always-on text that doesn’t consume tempo (no actions, no extra dice beyond Offsets) and follows the **Roll-state Beltline** (Gate → HARD → SOFT → d20 → OFS → Bands).

Examples by category:

- **Skill & posture hooks** —  
  - “You gain **+1 OFS (R)** on **Acrobatics (ACR)** checks.”  
  - “You have **Advantage on Influence (IFC)** vs **rail workers** during negotiations about schedules.”

- **Defense & resilience** —  
  - “You gain **+1 OFS (R)** to saving throws vs **poison**.”  
  - “While attuned, you count as having **one treated Minor** on the **RES** lane when resisting ambient hazards.”

- **Harmony/Chaos flavored** (rare) —  
  - “Once per chapter when you gain a **Seal**, gain **1 temp HP per Seal you now hold**.”  
  - “When you roll Chaos and land on rows **11–14**, you may **glimpse** the visual (Silver Postcard-style) even if the item is stowed.”

> [!rule] Injury & HS safety  
> Passive bonuses should **never bypass** the **3 Major cap**, **Hellstatic**, or **Chaos floors**; they can at most **give Offsets** or **Advantage** on tests that interact with those systems.

### 4.2 Active slots

**Definition:** A discrete push that **consumes tempo** (action, bonus, reaction, or explicitly timed free action) with a clear **recharge**. It may add:

- **OFS (R)** to a roll or **OFS (DC)** on GM side.  
- **Temp HP / small heals** (without trivializing rests).  
- **Positioning / movement** within the IAZ.  
- **Scene-wide nudge** on light knobs (Awareness, Strain, etc).

**Never do (by default):**

- Directly change **CDR**, **Chaos Level**, or **Soul Debt** without explicit module text.  
- Grant **extra Actions** beyond narrow, well-defined clauses.  
- Rewrite **Hellstatic** or **Revival** timing.

### 4.3 Drawbacks & quirks

A card may list **Drawbacks** or **Quirks**:

- **Drawbacks** (“While attuned, −1 OFS (R) to systems using fire.”) can justify slightly **higher Tier** but should **not** grant extra slots.  
- **Quirks** (“Emits soft infernal humming when **Chaos row 10+** is rolled nearby.”) are mostly **fictional color**.

---

## 5️⃣ Tags & Attunement (Harmony/Chaos) ^tags

Items can carry standardized **tags** in their header:

- **[ATTUNEMENT]** — Requires a normal attunement slot (5e baseline).  
- **[HARMONY]** — Text includes *“Requires: Harmony Attunement”*; you must have the **Harmony Attunement license** and spend a **short rest** and a **normal slot** to attune.  
- **[CHAOS]** — Interacts with **Chaos Level (CL)** or **Chaos rolls** (e.g., changes which rows it cares about, or triggers on specific rows).  
- **[SITE-BOUND]** — The item only functions (or unlocks extra slots) at specific **Harmony Unlock** sites or Zones.

> [!note] Attunement, instant rests & printing  
> - **Instant short/long rests from the Chaos table** do **not** permit attuning/unattuning; they explicitly forbid activities that “require the rest’s duration.”  
> - **Printing isn’t a rest**; you can’t attune while decanting.  
> - A character can be attuned to **at most 3 items total**, including items with the **[HARMONY]** tag; **Harmony Attunement is an extra requirement, not extra capacity**.  
> - No item, including **Relics**, ever consumes more than **1 attunement slot**.  
> (See the **Revival**, **Chaos**, and **D&D Baseline — Modified for AE** sections for full text.)

---

## 6️⃣ Obsidian item template (block) ^template

> [!item] **Item Name** *(Rarity, Tier)*  
> **Code:** `ITM-GEA-001-X` · **Rarity:** Uncommon (U) · **Tier:** T2 · **Type:** [weapon/armor/tool/boon] · **Tags:** [ATTUNEMENT] [HARMONY] [CHAOS?]  
> **Size:** MED (1 BL) · **Slots:** 1 Passive, 1 Active  
>  
> **Lore hook.** One-sentence fiction about where this came from or who forged it.  
>  
> **Passive — [slot #1 label]**  
> Text of the passive effect (always-on). Keep to one coherent benefit.  
>  
> **Active — [slot #1 label]**  
> *Cost/tempo:* (Action/Bonus/Reaction; 1×/scene or 1×/chapter, etc.)  
> *Effect:* What it does, expressed using the same OFS / Band / DC language as the core rules.  
>  
> **Drawbacks / Quirks (optional)**  
> Any side-effects, RP hooks, or minor mechanical drawbacks.

> [!example]- Example — “Signalman’s Lens” *(Uncommon T2 utility)*  
> **Code:** `ITM-GEA-001-X` · **Rarity:** Uncommon (U) · **Tier:** T2 · **Type:** Tool (optical) · **Tags:** [ATTUNEMENT] [HARMONY]  
> **Size:** TNY (1 pBL) · **Slots:** 1 Passive, 1 Active  
>  
> **Passive — Read the Lines**  
> While attuned, you gain **+1 OFS (R)** on **Awareness checks to spot trackside hazards, signals, and markers** in the IAZ. When reading printed rail timetables, you have **Advantage on RDL checks** to spot inconsistencies or hidden codes.  
>  
> **Active — Lines in the Glass**  
> **1×/scene, no action (between turns).** When you or an ally you can see in the IAZ fails a **single Awareness or RDL check** by **4 or less**, you may invoke the Lens. The failure becomes a **Success (S)** instead.  
>  
> **Quirk**  
> The lens flickers with faint rail-map overlays whenever nearby **Chaos rows 12–14** are rolled.

---

## ✅ Acceptance checks ^accept

- A **Common T1** charm provides at most **1 Minor Passive** (e.g., +1 OFS to a narrow lane) and **no actives**.  
- An **Uncommon T2** item with **1 Passive + 1 small Active** fits the matrix (1–2 P, 0–1 A).  
- A **Rare T3** weapon should not exceed **3 passives + 1 active**, and its biggest numbers should sit in the **T3 band** (e.g., +2 OFS to a lane under clear fiction, 1×/scene strong active).  
- A **Legendary or Relic** item may hit **T4–T5** numbers but must still respect the **slot caps** and cannot override **Revival, Hellstatic, CDR floors, or Soul Debt** without explicit story text.  
- Items marked **[HARMONY]** always require the **Harmony Attunement license** and a **normal attunement slot**; they cannot be attuned during **instant Chaos rests** or **printing**.


---

## 7️⃣ Tier & Rarity Model — Locked Spec ^tier-rarity-locked

### 7.1 Snapshot

- **Tiers (T0–T5)** = *power band & story act*.  
- **Rarities (C/U/R/L/X)** = *slot budget & specialness*.  
- **Magic items live at T1–T5**; **T0** is mundane/printed gear outside the magic ladder.  
- You get up to **25 conceptual “slots”** (T1–T5 × Common–Relic), but you only use ~10–15 of them regularly.

---

### 7.2 Tier bands (T0–T5)

> [!definition] Tier = when & how hard
> Tiers are **author-facing**. They are rarely printed on the card; they place the item into an **act / power band** so upgrades stay meaningful over long campaigns.

- **T0 — Mundane / Printed**
  - No passives/actives from this system.
  - Covers: printed gear, standard weapons/armor, tools, clothing.
  - May change base damage/AC/etc., but does not spend rarity slots.

- **T1 — Early Game (Onboarding / Prologue / early Act I)**
  - First real items; small OFS bumps, niche tricks.
  - Player feel: “Nice perk, doesn’t redefine my build.”

- **T2 — Low-Mid Game (Late Act I / early Act II)**
  - +1 in broad cases, +2 in narrow; real scene-impact actives.
  - Player feel: “I start planning around this item.”

- **T3 — Mid Game (Core Act II)**
  - +2 to a lane or posture under clear fiction; small resistances.
  - Player feel: “This item is part of my identity.”

- **T4 — Late Game (Late Act II / early Act III)**
  - Strong shaping of a PC’s role; interacts lightly with Injuries, HS, or Harmony/Chaos.
  - Player feel: “This is a set piece. Losing it would hurt.”

- **T5 — Endgame (Final arcs)**
  - Capstone items; may bend subsystems in controlled ways.
  - Player feel: “This belongs in the epilogue or a legend.”

> [!tip] T0 vs T1+
> - **T0** is “background equipment” — track with Inventory & BL only.  
> - **T1+** means “this thing is in the **Items** system”: it has passives/actives, rarity, and design constraints.

---

### 7.3 Rarity bands (C/U/R/L/X) — locked

> [!definition] Rarity = slot budget & specialness
> Rarity is **player-facing**. It controls how many passives/actives an item can carry and how “special” it is in the fiction.

- **Common (C)**
  - Slots: **1 Passive**, **0 Actives** (cap).
  - Feel: helpful charms, minor tools, early magic.

- **Uncommon (U)**
  - Slots: **1–2 Passives**, **0–1 Active**.
  - Feel: first “real” magic items; people remember you own one.

- **Rare (R)**
  - Slots: **2–3 Passives**, **1 Active**.
  - Feel: build-defining in a lane; sought-after. Most named weapons live here.

- **Legendary (L)**
  - Slots: **3 Passives**, **1–2 Actives**.
  - Feel: table-shaping; often has Harmony/Chaos hooks or strong story baggage.

- **Relic (X)**
  - Slots: **3–4 Passives**, **2 Actives** (tightly gated).
  - Feel: campaign anchors. Their existence says something about the world.

> [!rule] T0 & rarity
> - **T0 items do not have a rarity** in this system (or are implicitly “Mundane”).  
> - As soon as an item has a listed **Rarity**, it must be **T1+** and obey its slot caps.

---

### 7.4 Tier × Rarity usage matrix

> [!summary] How often each combo should appear
> Use this to decide **what can exist** at each Tier and how common it should be in loot tables.

Legend:  
- **●** = baseline / expected  
- **○** = rare / special drop  
- **★** = story-gated only  
- **—** = do not use (or only as a one-off exception)

| Tier \ Rarity | Common (C) | Uncommon (U) | Rare (R) | Legendary (L) | Relic (X) |
|---------------|-----------:|-------------:|---------:|--------------:|----------:|
| **T0** Mundane | ● (no magic) | —           | —       | —            | —         |
| **T1** Early   | ●          | ●            | ○       | —            | —         |
| **T2** Low-Mid | ●          | ●            | ●       | ○            | —         |
| **T3** Mid     | ○          | ●            | ●       | ○            | ★         |
| **T4** Late    | —          | ○            | ●       | ●            | ○ / ★     |
| **T5** End     | —          | ○ (niche)    | ●       | ●            | ★         |

Interpretation / guidance:

- **T1:** No Legendary or Relic. Rare is **special** and maybe 1–2 per party for the whole Tier.
- **T2:** Rare becomes a **normal high reward**. Legendary occasionally appears as an **arc finale** or major favor.
- **T3:** Uncommon/Rare are baseline good gear. Legendary shows up in set pieces. Relic appears **once per arc at most**, story-gated.
- **T4:** Rare/Legendary dominate. Relics exist but should be **heavily tied to story, sites, or Apocalyptic Shift events**.
- **T5:** Everyone may see **one Legendary-class item**; Relics are the **keys / catalysts** of the final act.

---

### 7.5 Loot pacing (recommendations)

> [!tip] Target assumptions (tune per table)
> These are **guidelines**, not hard rules; they assume a long-form campaign.

**Per campaign (per PC), rough target counts for T1+ items:**

- **Common:** 2–5  
- **Uncommon:** 4–8  
- **Rare:** 4–8  
- **Legendary:** 1–3  
- **Relic:** 0–1 (2+ only if the campaign is explicitly about collecting them)

**Per session (party-level) suggested “interesting item” rate:**

- **Low-magic pacing:** 1 item every **2–3 sessions**.  
- **Standard pacing:** **1 item per session** on average (some sessions none, some sessions multiple).  
- **Loot-heavy pacing:** 2 items per session, but expect more churn and more dismantling/printing.

> [!warning] Relic & Legendary saturation
> - Avoid having **more than ~2 Relics active in one 4-PC party** at the same time unless that is the explicit story.  
> - Legendary items should feel special: a good target is **~1–2 Legendary pieces per PC total** over an entire long campaign.

---

### 7.6 Design guardrails (sanity checks)

Use these as a checklist when adding or upgrading items:

- **T0 vs T1+**
  - If the item text is just “better numbers” (damage, AC, BL) with no special rules, keep it **T0** and **don’t give it a rarity**.
  - If it has **named passives/actives**, it is **T1+** and must obey rarity slot caps.

- **Per-lane stacking**
  - Total **always-on item Offsets** to any single lane/roll type should **rarely exceed +3** across all equipped items.
  - Anything beyond that should be **situational** (conditions, once per scene, once per chapter, etc.).

- **Legendary / Relic interactions**
  - Do **not** let item text casually override: **Revival costs, Hellstatic, Chaos Drift floors, or Soul Debt rules**.  
  - If an item interacts with these systems, keep it **tightly scoped** and usually make it **Legendary or Relic** with clear gates (Harmony Attunement, Chaos Level, site-bound, etc.).

- **Story gating**
  - Treat **Relics (X)** and **endgame Legendary items** as **story rewards**, not random loot.  
  - Tie them to: specific Zones, Factions, Lucifer bargains, Harmony Unlock sites, or Apocalyptic Shift outcomes.

> [!success] If all of the above hold…
> - You can run **very long campaigns (60–100+ sessions)** without running out of meaningful upgrades.  
> - Players keep seeing **new meaningful tiers of power** without needing more than **5 Tiers × 5 Rarities**.  
> - “Legendary” and “Relic” remain emotionally rare without having to starve the party of loot.


---

## 8️⃣ Tiers as Cantos / Books of the Campaign ^tiers-as-cantos

> [!summary] One Tier = One Canto / Book
> Each **Tier (T1–T5)** corresponds to a major **Canto / Book** in the Apocalypse Express campaign. This keeps item power, story stakes, and Chaos/Harmony escalation in sync.

### 8.1 Mapping Tiers to Cantos

You can rename “Canto” to “Book” or “Arc” in your campaign Bible; the structure stays the same.

- **Canto I – T1 (Onboarding / Prologue / Early Act I)**  
  - Sessions (rough): **1–10** in a 60-session campaign.  
  - Items: **T1**, mostly **Common / Uncommon**, with the occasional **Rare** as a set-piece reward.  
  - Feel: Rail yard scuffles, small miracles, first brushes with Chaos.

- **Canto II – T2 (Late Act I / Early Act II)**  
  - Sessions: **11–20**.  
  - Items: **T2** dominates; **Commons** taper, **Uncommon/Rare** become standard rewards, **Legendary** appears as a rare finale/favor.  
  - Feel: Lines start crossing Zones; Harmony and Lucifer notice the crew.

- **Canto III – T3 (Core Act II)**  
  - Sessions: **21–35**.  
  - Items: **T3** is the backbone; **Uncommon/Rare** are baseline, **Legendary** shows up as boss rewards; the first **Relic** may appear (story-gated).  
  - Feel: The crew has reputations, scars, and an identity. Zone-level stakes.

- **Canto IV – T4 (Late Act II / Early Act III)**  
  - Sessions: **36–50**.  
  - Items: **T4** powers most “main slot” items; **Rare/Legendary** dominate; **Relics** appear as site-bound or Lucifer/Harmony bargains.  
  - Feel: Routes, factions, and ASH events bend because of the party’s prior choices.

- **Canto V – T5 (Endgame / Finale)**  
  - Sessions: **51–60+**.  
  - Items: **T5** items show up; **Rare** is baseline, **Legendary** is common for mains, **Relics** are the keys and fail-safes of the entire campaign.  
  - Feel: Final routes are laid. Items feel like epilogue artifacts, not just loot.

> [!tip] Extending beyond 60 sessions
> For a very long campaign (e.g., 80–100 sessions), stretch each Canto’s session band proportionally (e.g., 15–20 sessions per Canto) rather than adding more Tiers. T1–T5 remains the only Tier ladder; the story just spends longer in each band.

### 8.2 Rarity distribution by 10‑chapter structure ^canto-rarity-table

> [!summary] 10 chapters inside 5 Tiers
> - The campaign is split into **10 chapters** (or “Cantos”), each ~4–6 sessions.  
> - Each pair of chapters shares a **Tier band**:  
>   - Ch.1–2 → T1, Ch.3–4 → T2, Ch.5–6 → T3, Ch.7–8 → T4, Ch.9–10 → T5.  
> - This table gives target **rarity weights for magic item drops** in each chapter.

> [!note] What these percentages mean
> - They are **targets for magic drops only**, not guarantees.  
> - Example: “In Chapter 5, if a magic item drops, ~45% of the time it should be Rare.”  
> - You still decide **how many** items drop; this only shapes what they *are* when they do.

| Chapter | Tier band | Common C | Uncommon U | Rare R | Legendary L | Relic X | Notes                                 |
|---------|-----------|----------|------------|--------|-------------|---------|---------------------------------------|
| **1**   | T1        | 60%      | 30%        | 10%    | 0%          | 0%      | Almost no big stuff yet               |
| **2**   | T1        | 40%      | 35%        | 25%    | 0%          | 0%      | First real Rares as set pieces        |
| **3**   | T2        | 25%      | 40%        | 30%    | 5%          | 0%      | U/R baseline, tiny Legendary chance   |
| **4**   | T2        | 15%      | 35%        | 40%    | 10%         | 0%      | Rares common, L as finale / big favor |
| **5**   | T3        | 5%       | 30%        | 45%    | 15%         | 5%      | First Relics as explicit story hooks  |
| **6**   | T3        | 0%       | 25%        | 45%    | 20%         | 10%     | C gone; R/L/X all in the mix          |
| **7**   | T4        | 0%       | 20%        | 45%    | 25%         | 10%     | High-power baseline                   |
| **8**   | T4        | 0%       | 15%        | 45%    | 25%         | 15%     | More Relics in late midgame           |
| **9**   | T5        | 0%       | 10%        | 40%    | 30%         | 20%     | Endgame: most drops are R+            |
| **10**  | T5        | 0%       | 5%         | 35%    | 30%         | 30%     | Final chapter: Relics clearly visible |

> [!tip] Using this at the table
> - When a magic item drops, pick the **Chapter row** you’re in, roll for **Rarity** using these percentages, then choose an item from the codex that matches **(Tier band, Rarity, Category)**.  
> - Treat **Relic (X)** entries as **story-gated opportunities**, not background random loot — the percentages just tell you roughly **how many chances** the campaign should offer for Relics to appear.


---

## 9️⃣ Weapon Defaults — Filled Slots by Tier & Rarity (Example: Knife) ^weapon-defaults

> [!summary] Knives as a baseline weapon pattern
> This table gives **typical filled slots** (Passives / Actives) for a **single weapon**, assuming a knife-class weapon. It respects the global rarity caps and shows how complexity grows.

**Legend:** `P/A` = Passives / Actives filled on the item card.  
You may **under-fill** these, but should **not exceed** the global caps for that rarity.

### 9.1 Knife – Typical Filled Slots per Tier & Rarity

| Tier \ Rarity | Common (C) | Uncommon (U) | Rare (R)    | Legendary (L)       | Relic (X)            |
|---------------|-----------:|-------------:|------------:|---------------------:|----------------------:|
| **T1**        | 1 / 0      | 1 / 0        | — (avoid)   | —                   | —                     |
| **T2**        | 1 / 0      | 1 / 0–1      | 2 / 0–1     | 2 / 1 (set-piece)   | —                     |
| **T3**        | 1 / 0      | 1 / 1        | 2 / 1       | 2–3 / 1             | 3 / 1 (story only)    |
| **T4**        | 1 / 0      | 1 / 1        | 2–3 / 1     | 3 / 1–2             | 3–4 / 2               |
| **T5**        | 1 / 0      | 1 / 1 (niche)| 3 / 1       | 3 / 1–2             | 3–4 / 2               |

Guidance:

- **Common (C)** knives always stay **1 passive, 0 actives**; Tier simply scales the *strength* of that passive.  
- **Uncommon (U)** unlocks room for **one small active** at T2+, but you don’t need to use it at T1.  
- **Rare (R)** knives want to sit at **2 passives + 1 active** by T3+, but can be simpler in early T2.  
- **Legendary (L)** knives usually hit **3 passives + 1–2 actives** in T4–T5 and begin to hook into Harmony/Chaos tags or site mechanics.  
- **Relic (X)** knives are **story objects**: 3–4 passives, 2 actives, with very tight gates (Harmony Attunement, Chaos Level brackets, site-bound, etc.).

> [!note] Other item types
> - **Armor:** Usually skews toward **more passives, fewer actives** (e.g., defenses, resistances, anti-hazard tools).  
> - **Tools / Charms:** Tend to convert one passive slot into **another active**, leaning into utility and out-of-combat tricks.  
> - When unsure, use the **Knife table** as a baseline, then re-allocate one slot from passive→active or vice-versa depending on type.

---

## 🔟 System Sanity Check & Simulation Summary ^system-sanity-check

> [!summary] Stress test: long campaigns, no plateau
> We simulated long campaigns with the 5×5 Tier×Rarity model to verify that item progression stays meaningful over tens of sessions.

### 10.1 Simulation assumptions

- **Party:** 4 PCs.  
- **Campaign length (baseline):** 60 sessions.  
- **Item flow:** ~**1.2 “interesting items” per session** (some sessions none, some multiple).  
- **Slots per PC:** 5 item slots that can hold T1+ gear.  
- **Tier over time:**  
  - Sessions 1–10 → T1 (**Canto I**)  
  - 11–20 → T2 (**Canto II**)  
  - 21–35 → T3 (**Canto III**)  
  - 36–50 → T4 (**Canto IV**)  
  - 51–60 → T5 (**Canto V**)  
- **Rarity weights per Tier:**  
  - T1: C 50%, U 30%, R 20%  
  - T2: C 30%, U 40%, R 25%, L 5%  
  - T3: C 10%, U 35%, R 40%, L 12%, X 3%  
  - T4: U 20%, R 45%, L 25%, X 10%  
  - T5: U 10%, R 40%, L 30%, X 20%  
- **Power rating (rough):** `rating = Tier × rarity_rank`, where C=1, U=2, R=3, L=4, X=5.  
- When an item drops, it is assigned to a random PC; if its rating exceeds that PC’s worst slot, it **replaces** that item.

### 10.2 Results (averaged over 400 simulated campaigns)

- **Total items per campaign:** ≈ **72** (matches the 1.2 / session target).  
- **Per PC items seen (T1+):** ≈ **18**.

Approximate **items per PC by rarity** across the whole campaign:

- **Common:** ~3.2  
- **Uncommon:** ~4.8  
- **Rare:** ~6.1  
- **Legendary:** ~2.6  
- **Relic:** ~1.2  

Average **final power rating per equipped slot** (0–25 scale):

- Mean ≈ **17.3 / 25**, with no campaigns maxing out all 5 slots.  
- Upgrades continue to appear **even in the last 10–20 sessions**; there is no early plateau.

### 10.3 Interpretation

- The **5 Tiers × 5 Rarities** grid is **sufficient and robust** even for long campaigns:
  - PCs keep getting **meaningful upgrades** throughout Canto I–V.  
  - **Legendary** and **Relic** items appear often enough to matter, but remain rare enough to feel special.  
  - There is still **headroom** above the average end-state, so late additions can still feel impactful.

- You **do not** need more than 5 Tiers or more than 5 Rarities:
  - Adding more Tiers would over-complicate the pacing without solving a real problem.  
  - Adding more Rarities would create label bloat without giving players clearer expectations.

> [!success] Design verdict
> - **Keep Tiers at T0–T5**, with **T1–T5** mapped to **Cantos I–V** of the campaign.  
> - **Keep Rarities at C/U/R/L/X** with the slot caps already defined.  
> - Use the **Tier×Rarity usage matrix** and **weapon defaults** as your practical design guardrails.  
> - Treat **Relics and top-end Legendaries** as **story rewards**, not random loot table entries.


---

## 11️⃣ Item Categories — Types & Biases ^item-categories

> [!summary] What kind of thing is this?
> **Tier** and **Rarity** say *how big* and *when* an item belongs in the story.  
> **Category (Type)** says *what it actually is* and how it tends to spend its slots (passives vs actives), BL, and tags.

### 11.1 Top-level Types

Every T1+ item chooses exactly **one primary Type**:

- **Weapon (WPN)** — Things you attack with in the IAZ.
- **Armor (ARM)** — Worn defenses (armor, shields, specialized suits).
- **Charm (CRM)** — Worn, carried, or symbolic items that tweak luck, Harmony, or social posture.
- **Tool / Kit (TOL)** — Utility gear, specialized instruments, diagnostic rigs, kits.
- **Implant / Graft (IMP)** — Installed gear (cybernetic, occult, infernal).
- **Engine / Vehicle Asset (ENG)** — Train engines, cars, large machinery or subsystems.
- **Document / Writ (DOC)** — Authority objects: passes, charters, warrants, contracts.
- **Consumable / Charge (CON)** — One-shot or limited-charge items (serums, charges, scroll-equivalents).

> [!tip] Choosing between similar Types
> - If it’s about **hurting things** → **Weapon (WPN)**.  
> - If it’s about **soaking or preventing harm** → **Armor (ARM)**.  
> - If it’s a **symbol, relic, or small luck/fate tweak** → **Charm (CRM)**.  
> - If it makes a **skill or procedure better** → **Tool (TOL)**.  
> - If it lives **inside the body** → **Implant (IMP)**.  
> - If it’s part of **train/vehicle infrastructure** → **Engine (ENG)**.  
> - If its power is **“someone recognizes this document”** → **Document (DOC)**.  
> - If you **burn it for an effect and it’s gone** → **Consumable (CON)**.

### 11.2 Category table — BL, slot biases & attunement

**Legend:**  
- `P/A` = typical **Passives / Actives filled at mid Rarity** (Uncommon/Rare), not caps.  
- BL/Size = **default** for the most common form (can be overridden).  
- Attunement = rough expectation; specific items may differ.

| Type | Code | Default Size / BL | Typical slot bias (mid Rarity) | Attunement expectation | Notes |
|------|:----:|-------------------|--------------------------------|------------------------|-------|
| **Weapon** | WPN | MED (1 BL) or BUL (2 BL) | **Balanced** — ~2P/1A at Rare | Sometimes (R+); often for Harmony/Chaos-tagged | Main way to project harm in the IAZ. Knife table is the baseline pattern for light melee. |
| **Armor** | ARM | MED/BUL (1–2 BL), up to 3 BL for heavy | **Passive-heavy** — more P, fewer A (e.g., 2–3P/0–1A at R/L) | Often (spec ARM at U+, usually at R+) | Soaks/deflects damage, mitigates hazards and conditions. Actives are “panic buttons,” not frequent tricks. |
| **Charm** | CRM | TNY (1 pBL or 1 BL) | **Passive-leaning** — 1–3P, 0–1A | Often for [HARMONY]; sometimes for [CHAOS] | Talismans, badges, tokens. Great for always-on weirdness and small once/scene nudges. |
| **Tool / Kit** | TOL | MED (1 BL) | **Active-leaning** — ~1P/1A at U, 1P/1–2A at R+ | Rarely (unless Harmony/Chaos-tuned or very strong) | Out-of-combat supremacy, skill edges, situational combat tricks (scan, repair, bypass hazards). |
| **Implant / Graft** | IMP | Installed (no BL once installed) | **Strong 1–2P + 1A** at U/R | Usually (U+); often requires Harmony or CL prereqs | Fuses with the body; interacts heavily with Injuries, HS, and Chaos. High-commitment choices. |
| **Engine / Vehicle Asset** | ENG | BUL/HVY/MSV (2–5 BL per card) | **Active-heavy across the asset** — each card ~0–1P/1–2A | Not per PC; may require crew rites or site bindings | Macro-scale powers (route shifts, Zone effects). Represented by 1–3 linked item cards, each obeying rarity caps. |
| **Document / Writ** | DOC | TNY or MED (1 pBL / 1 BL) | **Passive-heavy** — 1–2P, rare 0–1A | Rare (usually none); infernal covenants may require Attunement | Social/legal authority, access rights, and narrative vetoes. Power comes from recognition, not physical stats. |
| **Consumable / Charge** | CON | TNY (1 pBL) | **Active-only** — 0P, 1A (1–3 charges) | Never (consumed) | Potions, ampoules, charges, scroll-equivalents. Give big effects without long-term slot pressure. |

> [!rule] Category vs Rarity vs Tier
> - **Category never changes rarity caps.** Rarity still sets `max passives/actives`.  
> - Category only changes **how you usually spend slots** and what kinds of effects are appropriate.  
> - A **T3 Rare Weapon** and a **T3 Rare Charm** share the same **power band**, but show it differently: the Weapon leans into attacks/tempo; the Charm leans into Ofs, Bands, postures, and Harmony/Chaos texture.

---

### 11.3 Category-specific guidelines

#### a) Weapons (WPN)

- Use the **Knife table** (see §9.1) as the baseline for light melee weapons.  
- Heavier weapons (pistols, rifles, greatweapons) follow the same **P/A counts by Tier & Rarity** but spend their passives on:
  - Damage bands, crit riders, or special harm types.  
  - Range, area, or multi-target effects.  
  - Recoil, reload, or interaction with ASH/hazard tags.

Rules of thumb:

- T1–T2: weapons rarely exceed **2 total passives + 1 small active**, even at Rare.  
- T3–T4: Rare weapons comfortably sit at **2P/1A**; Legendary climb to **3P/1–2A**.  
- T5: Legendary/Relic weapons are **story items**; respect rarity caps and consider gating via attunement, Harmony/Chaos, or sites.

#### b) Armor (ARM)

Armor skews **passive** and defensive:

- Common: 1 small passive (resistance to a narrow threat, or +1 OFS vs one hazard).  
- Uncommon: 1–2 passives total, maybe 1 tiny active (1×/scene DR or temp HP shield).  
- Rare: 2–3 passives + optionally 0–1 active.  
- Legendary/Relic: 3 passives + 1 active (e.g., once/long rest or once/chapter “I don’t die yet”).

Armor should **not**:

- Break core caps (Injuries, HS, Hellstatic, Chaos floors, CDR floors).  
- Completely trivialize hazards; it should grant **Offsets, Advantage, or temp HP**, rather than blanket immunity.

#### c) Charms (CRM)

Charms are **small, persistent magic**:

- Low Tier: 1 minor passive, no actives.  
- Mid Tier: 1–2 passives, maybe 1 small once/scene active.  
- High Tier: up to 3 passives + 1 active (Harmony/Chaos/social flavored).

Good homes for:

- Skill/posture buffs (Awareness, Influence, Riddlecraft, etc.).  
- Light Harmony interactions (Seals, Choir, site resonance).  
- Faction-specific social leverage (“Advantage on IFC vs rail unions,” etc.).

#### d) Tools / Kits (TOL)

Tools shine in **utility and problem-solving**:

- Common/Uncommon: usually **1 passive + 1 small active** (scene-scale).  
- Rare: 1 passive + 1–2 actives, all constrained by clear fictional use (scan, repair, bypass, disable).  
- Legendary/Relic: 1–2 passives + 2 actives, often mixing out-of-combat supremacy with one big “oh shit” button.

Tools are ideal for:

- “Once/scene, treat a failed SYS/TNK/GDS check (miss by ≤2) as S.”  
- “1×/short rest, neutralize a specific environmental penalty in the IAZ.”  
- “In a named Zone, you can do X at all (without the tool, the action is impossible).”

> [!warning] Tool power safety
> Tools should rarely, if ever, directly alter **CDR, Soul Debt, or Revival**. They can give Offsets, Advantage, or narrative permission, but can’t rewrite the deep metaphysics without being explicit Relics.

#### e) Implants / Grafts (IMP)

Implants are **high-commitment, identity-shaping**:

- Require downtime, resources, and an in-fiction justification to install/remove.  
- Usually require **Attunement**; many will also demand **Harmony Attunement** or specific **Chaos Level** ranges.

Slot bias:

- Uncommon/Rare: **~2 passives + 1 active**, often as strong as a class feature.  
- Legendary/Relic: **3 passives + 1–2 actives**, with very tight constraints and drawbacks.

Good places for:

- Replacing a standard rule (“You no longer roll X normally; you use Y procedure instead”).  
- Making the PC a partial **Engine node** or **Harmony/Chaos relay** (“Once/chapter you may…”).  
- Long-term, meaningful trade-offs (benefit vs permanent vulnerability).

#### f) Engines / Vehicle Assets (ENG)

Engines and vehicle components are **macro-items**:

- Don’t represent a whole train as a single ENG card unless it’s a mythic Relic.  
- Instead, model **1–3 ENG items** for key subsystems (engine core, condenser, choir car, brake array).

Each ENG item:

- Obeys the same **Tier/Rarity caps** as any other item.  
- Tends to be **active-heavy**: 0–1 passive + 1–2 actives.  
- Has long cooldowns or costs (Spin-Time, crew fatigue, Chaos risk, site requirements).

Typical uses:

- Route manipulation (switches, bypasses, forced delays).  
- Zone-scale hazard management (venting ASH, temporarily calming a Drift).  
- Harmony/Chaos interactions localized to the train or its immediate surroundings.

#### g) Documents / Writs (DOC)

Documents are **fiction-first, rules-light**:

- Almost entirely passive: “You are recognized as X,” “You may enter Y,” “NPCs suffer Z if they defy this.”  
- Actives, if any, are rare and usually **chapter-scale** (“1×/chapter, override a lower-rank authority”).

Examples:

- Tickets, warrants, charters, covenants, infernal contracts.  
- Faction credentials and site passes.

DOC items are the clean way to:

- Encode **social / legal / spiritual high ground** without bloating combat stats.  
- Gate access and choices instead of hit points.

#### h) Consumables / Charges (CON)

Consumables are **disposable power spikes**:

- No long-term passives.  
- Exactly 1 active each (possibly with 2–3 charges if you want a mini-stack).  
- Once the charges are gone, the item is gone.

Ideal uses:

- Letting players taste **higher-Tier power early** as a one-off (e.g., a T4 effect in Canto II).  
- Emergency saves (panic heal, panic cleanse, panic teleport, panic Harmony Seal).  
- Encouraging risky behavior (“Do we burn the only vial now?”).

---

### 11.4 Design checklist using Categories

When you create or review an item:

1. **Set Tier (Canto) and Rarity** using the Tier×Rarity matrix.
2. **Pick a Category (Type)** from WPN / ARM / CRM / TOL / IMP / ENG / DOC / CON.
3. Use the **category’s slot bias** to decide how many passives/actives you actually fill (while staying within Rarity caps).
4. Check:
   - BL/Size vs **Simple Inventory** (TNY / MED / BUL / HVY / MSV / TIT).  
   - Attunement vs **Attunement / Harmony Attunement / Chaos Level** rules.  
   - That it does **not** casually override core rails (Injuries, HS, CDR floors, Soul Debt, Revival).
5. For Legendary/Relic items, ask explicitly:
   - “Is this a **story object** (tied to a Zone, Canto, or major NPC)?”  
   - “Is there a simpler Category (Charm, Document, Engine part) that delivers the same story beat with less bloat?”

If all of the above hold, the item should fit cleanly into the AE item ecosystem without confusing players or breaking pacing.


---

## 12️⃣ D&D Baseline — Modified for AE ^dnd-baseline-ae

### 12.1 Simplified slots (D&D-compatible)

You can wear/carry many magic items, but you only benefit from:

- **Armor:** 1 suit.  
- **Shield:** 1.  
- **Main Hand:** 1 weapon or focus (sword, pistol, rod, staff, wand, etc.).  
- **Off Hand:** 1 weapon, shield, or focus.  
- **Headgear:** 1 (helm, hat, circlet, goggles, lenses).  
- **Neck:** 1 (amulet, periapt, pendant).  
- **Body:** 1 (cloak, cape, mantle, robe, vest, coat).  
- **Hands:** 1 pair (gloves, gauntlets, bracers).  
- **Waist:** 1 (belt, girdle, sash).  
- **Feet:** 1 pair (boots, shoes, greaves).  
- **Rings:** up to **2** rings that confer magical benefits.

Anything else that doesn’t obviously fit a slot is treated as:

- Occupying the **closest appropriate slot**, or  
- Being **slotless but still subject to attunement**, at GM discretion (for very rare cases).

### 12.2 Wondrous items as tags, not a mechanical type

All items that would be “Wondrous Items” in 5e are expressed as:

- A **Type/Slot** (Headgear, Body, Hands, etc.), plus  
- A `Wondrous` tag for familiarity.

Example:

- “Cloak of Protection” → Type: **Body**, Tag: `Wondrous`.  
- “Boots of Speed” → Type: **Feet**, Tag: `Wondrous`.

### 12.3 Rods, staves, and wands as focus weapons

Rods, staves, and wands keep their names but share unified behavior:

- **Rod:** 1-handed focus weapon (Main or Off Hand).  
- **Wand:** 1-handed, lighter focus weapon (Main or Off Hand).  
- **Staff:** 2-handed focus weapon (occupies both hands).

Mechanically, they all:

- Obey the normal **hand and slot rules**.  
- May be treated as **Weapons** for damage if the item text supports it.  
- May require **attunement** like any other strong item.

### 12.4 Attunement (kept at 3)

We keep the D&D standard:

- A character can be attuned to **up to 3 magic items** at a time.  
- Attunement requires a **short rest** focused on that item.  
- Items that say **“requires attunement”** only work while attuned.

Clarifications:

- Effects that **simulate a short rest instantly** do **not** allow attuning or swapping attunements; the time cost is part of the price.  
- Attunement is **per item**, not per slot; swapping items does not move attunement automatically.  
- **Harmony Attunement** is an additional **license/flag**: a [HARMONY] item still uses **only 1** of your 3 attunement slots; it never grants extra attunement capacity.  
- No item, including **Legendary items and Relics**, ever consumes more than **1 attunement slot**.

> [!note] Future AE layers  
> - **Harmony Attunement** and other special attunement forms build on top of this baseline (e.g., as special prerequisites or “upgrades” to normal attunement), not replace it.

### 12.5 Charms & boons (D&D-style baseline)

D&D also defines **Charms** and similar **boons** that are not ordinary inventory items:

- These are **intangible gifts** or marks, **tied directly to a character**, not a piece of gear.  
- They do **not** occupy body slots (Headgear, Neck, Rings, etc.).  
- By default they also do **not** consume attunement slots unless explicitly stated.

In this baseline:

- When we say a **“Charm is connected to the player (like in D&D)”**, we mean these **character-bound boons**.  
- They are tracked on the **character sheet**, not in Simple Inventory BL.  
- Later AE-specific rules may add **item-type Charms (CRM)** as physical trinkets on top of this, but the D&D-style **boon Charms remain character-bound.**

---

## 13️⃣ Helper Item Bonuses — One Per Roll ^helper-items

> [!summary] Only one item can help a check
> Some items give **direct helpers** to a single roll (extra OFS, Advantage, reroll, etc.).  
> To avoid stacking bloat, **only one such helper from items may apply to any single roll.**

### 13.1 What counts as a “helper” bonus?

A **Helper bonus** is any effect from an item that:

- Is explicitly tied to **a single roll or DC check**, and  
- Directly changes the **math of that roll**, such as:
  - Adding or subtracting **Offsets (OFS)** to the roll.  
  - Granting or cancelling **Advantage/Disadvantage** on that roll.  
  - Allowing a **reroll** or **band shift** (e.g., F → S, S → CS) for that roll.  
  - Temporarily adjusting a **DC** or target band for that specific attempt.

Examples:

- “When you make an Awareness check, you gain **+1 OFS (R)** to the roll.”  
- “1×/scene, when you fail a SYS check by 4 or less, treat it as **Success (S)** instead.”  
- “You have **Advantage** on Stealth checks in industrial interiors.”

All of these are **Helper bonuses**.

Effects that are **not** Helpers (and are governed by other rules):

- **Always-on resistances** (“Resist fire damage”).  
- **Flat HP / temp HP** that don’t modify an individual roll.  
- **Static properties** (“You can see in dim light,” “You can speak Infernal”).  
- **Positioning / movement effects** that don’t modify a d20 roll itself.

These may still be limited or capped elsewhere (e.g., resistance stacking), but they do not conflict with the “one Helper per roll” rule.

### 13.2 The rule: one item helper per roll

For any **single roll or DC check** a character makes:

- The character may benefit from **at most one** item-based Helper bonus.  
- If multiple items could apply, the player **chooses exactly one** to use for that roll, or **uses none**.  
- Other item Helper bonuses that would apply to that same roll are **ignored** for that roll.

This applies to:

- Both **passive** item text (“you always have +1 OFS on Awareness”) and  
- **Active** item powers (“1×/scene, add +2 OFS to a SYS check”) that modify that specific roll.

> [!example] Example — two lenses
> A character wears:  
> - Lens A: “You gain **+1 OFS (R)** on Awareness checks.”  
> - Lens B: “1×/scene, when you make an Awareness check, gain **Advantage** on that check.”
>
> They make an Awareness check to spot an ASH hazard:  
> - They may either use **Lens A’s +1 OFS** or **Lens B’s Advantage**, but **not both** on the same roll.  
> - On a different roll later in the scene, they can use the other lens as usual (subject to its recharge).

### 13.3 Interaction with other bonuses

- This limit applies **only to helpers from items**.  
- Non-item sources (skills, postures, class features, environmental advantages) follow their own stacking rules and can still combine with a single item Helper as normal.  
- The existing guideline that **total predictable, always-on item Offsets to any single lane should rarely exceed +3** still stands; the Helper rule simply guarantees that you don’t combine 3 different item helpers on **one** roll to blow past that.

> [!rule] Design hint
> - When designing items, flag any effect that directly modifies a single roll as a **Helper** in your notes.  
> - Expect players to **decide which Helper to use** on important checks — that decision point is part of the fun.

---

## 14️⃣ Damage Mitigation from Items — Resist & Shields ^item-mitigation

> [!summary] Resist is binary; shields are one-per-hit
> - **Resist/Immunity from items is a yes/no state**, not something you stack into “super-resist”.  
> - **Shield-style item effects** (block N damage, reduce to 0 once, etc.) are limited to **one per damage instance**; the player chooses which to use.

### 14.1 Persistent defenses: Resist & Immunity

Some items grant **always-on protection** against certain damage types:

- “You have **resistance to fire damage**.”  
- “You are **immune to poison**.”  
- “You have **resistance to psychic damage**.”

These are **states**, not numeric bonuses.

**Rules:**

- If you have **at least one** item that grants **Resist X**, you have **Resist X**.  
- Multiple item sources of **Resist X do not stack or escalate** (no “double resist” → quarter damage).  
- **Immunity** must be granted **explicitly** (“you are immune to fire damage”).  
  - Having Resist from multiple items **never upgrades** to Immunity unless an effect **specifically says** so.  
- If you have Resist X from several different sources (items, class features, spells), you still just have **Resist X**.

> [!rule] Resist is binary
> For a given damage type, item-based **Resist** is treated as **on/off**, not something you add together.  
> Extra “Resist Fire” lines on new items are redundant for that type (but the item may still be valuable for other properties).

### 14.2 One-shot & charged shields (mitigation helpers)

Other items grant **event-based mitigation**, such as:

- “When you take fire damage, you may **reduce that damage by 6**; then this charm shatters.”  
- “1×/long rest, when you take any damage, you may **reduce it to 0**.”  
- “You carry 3 charges. When you would take lightning damage, you may **spend 1 charge to halve that damage**.”

These are **Mitigation Helpers** for **a single hit / damage instance**, not broad Resist states.

**Rules for shield-style mitigation from items:**

- For each **single damage instance** a character takes (one attack, one hazard tick, one effect application), that character may benefit from **at most one** item-based **Mitigation Helper**.  
- If multiple items could apply (e.g., two different “block 6 fire” charms), the player **chooses exactly one** to trigger for that hit; other eligible item shields do **nothing** on that instance.  
- The chosen item resolves its effect (reduce damage, set to 0, etc.), then **expends itself** or its charge as normal.

**Order of operations (simplified):**

1. Start with raw damage.  
2. Apply **Resist / Vulnerability / Immunity** from all sources (items, features, effects) as usual.  
3. After that, the player may apply **one** item-based **Mitigation Helper** (shield, “reduce by 6”, “set to 0”, etc.) to that remaining damage.  
4. Apply any non-item special-case rules the GM calls for (if relevant).

> [!example] Example — two fire shields
> A character has:  
> - Charm A: “When you take fire damage, you may **reduce that damage by 6**; this charm then breaks.”  
> - Charm B: “1×/day, when you take fire damage, you may **reduce it to 0**.”
>
> They take 17 fire damage from a hazard:  
> 1. They have no Resist; raw damage is 17.  
> 2. They may trigger **either** Charm A (**17−6 = 11**) **or** Charm B (**17→0**), but **not both**.  
> 3. The chosen charm expends as its text says.

### 14.3 Interaction with other systems

- **Resist/Immunity** from items follows the above binary rule and is **separate** from the “one Helper per roll” rule in §13 (Resist usually doesn’t modify a single d20 roll; it changes damage after the fact).  
- **Mitigation Helpers** (shield effects) are conceptually similar to **Helper bonuses**, but operate on **damage instances** instead of **rolls**:  
  - One Helper item per **roll**.  
  - One Mitigation Helper item per **damage instance**.  
- Non-item sources of mitigation (class features, procedures, scene rules) can still combine with these item rules, as long as they don’t contradict the core sequence above.

---

## 15️⃣ Item Progression — Replacement over Upgrading ^item-progression

> [!summary] Find or craft new items; don’t level old ones
> Apocalypse Express does **not** have a generic “upgrade this item’s Tier/Rarity” system.  
> Characters grow by **finding, earning, or crafting new items**, not by repeatedly levelling up the same piece of gear.

### 15.1 No generic Tier/Rarity upgrades

Baseline policy:

- There is **no universal rule** like “pay X to turn a T2 Rare into a T3 Rare” or “combine two Uncommons into a Rare”.  
- Each item is created at a specific **Tier** and **Rarity**, and it **stays there**.  
- When a character wants stronger gear, they:
  - **Find** a new item.  
  - **Earn** it as a reward or bargain.  
  - Or **craft** it (using whatever crafting/printing rules exist in other docs).

If an item “evolves” with a character (e.g., a signature weapon that grows across Cantos), it is treated as:

- A **new stat block** at a higher Tier (and possibly Rarity),  
- That **inherits the name and fiction** of the old one,
- Rather than “the same card with numbers edited in place.”

> [!rule] No automatic scaling
> Items do **not** automatically increase Tier or Rarity when a character levels up, changes Cantos, or gains new features.  
> If an item improves, that improvement is a **specific story or design decision**, not a global rule.

### 15.2 Replacement & retirement

Because items don’t auto-upgrade:

- It is normal for characters to **replace weaker items** with stronger finds or crafts as the campaign progresses.  
- Old items can be:
  - Stored, gifted, sold, or traded.  
  - Used as **story objects** (handed to NPCs, used to pay debts, etc.).  
  - Occasionally referenced by name if a new, improved version is created (“Mark II”, “Reforged”, etc.).

There is **no default rule** that dismantling or destroying an item yields a specific currency or upgrade resource in this document; any such system would live in a separate **crafting/economy** module.

> [!note] Crafting & printing are separate layers
> - The existence of **crafting** or **printing** does not, by itself, imply that items are upgraded in place.  
> - Crafting/printing rules (elsewhere) may allow characters to **create** new items at a chosen Tier/Rarity, but that is still treated as **making a new item**, not levelling an old one.

---

## 16️⃣ Printing & Crafting — Uniqueness as Default ^printing-crafting

> [!summary] Most magic items are one-offs
> - **T0 mundane gear** can be crafted/printed freely.  
> - **T1+ items are unique by default**: they cannot be mass-produced.  
> - Only items or procedures that *explicitly* say they are craftable/printable can be reproduced.

### 16.1 Mundane vs magical

- **T0 (Mundane / Printed)** items:
  - Weapons, armor, tools, supplies with no T1+ passives/actives.  
  - Can be bought, crafted, printed, and replaced freely using currency & printing rules defined elsewhere.

- **T1+ (magical / special)** items:
  - Any item with a listed **Rarity** (C/U/R/L/X) and one or more passives/actives.  
  - Default state: **unique physical objects**.  
  - They **cannot** be duplicated via generic printing or basic crafting.

### 16.2 Crafting & printing T1+ items (exceptions only)

- Only items, blueprints, or procedures that explicitly state:  
  - “**This item may be crafted**”, or  
  - “**This item may be printed**”  
  allow creation of new copies or variants of that specific item.

- In all other cases, attempts to “just print another” T1+ item:  
  - **Fail**, or  
  - Produce only a **mundane analogue** (T0 version) at GM discretion.

> [!rule] Minimalistic crafting
> - There is **no global recipe system** for upgrading or reproducing T1+ items.  
> - Crafting rules, when present, are **attached to specific items, blueprints, or sites** and should be rare.  
> - This keeps most T1+ items as story-significant, one-off rewards rather than commodities.

### 16.3 Story use

- Unique items can be:
  - Quest rewards, heirlooms, pacts, site relics, etc.  
  - Lost, traded, sacrificed, or broken with real weight.

- Printing/crafting is mainly how crews:
  - Equip with **T0 gear** and consumables.  
  - Interact with the economy/currencies.  
  - Occasionally unlock **very specific** T1+ items when the text clearly permits it.

---

## 17️⃣ Availability & Shops — Where Magic Actually Comes From ^availability

> [!summary] Quests first, shops rarely
> - **Most T1+ items are obtained through play** (quests, favors, pacts, sites).  
> - Shops **rarely** carry magical items at all, and when they do, they mostly stock **low-tier, low-rarity** pieces.  
> - Legendary items and Relics are **not for sale** by default.

### 17.1 Sources of T1+ items

Baseline source order:

1. **Quests & story rewards**  
   - Completing routes, solving problems, surviving ASH events, making or breaking pacts.  
   - These are the **primary** way to gain T1+ items.

2. **Favors, pacts & faction play**  
   - Payment from powerful NPCs, Luciferal bargains, Harmony boons.  
   - Often the only way to access **Rare+** items tied to specific Zones or factions.

3. **Shops & markets (rare)**  
   - Ordinary markets mostly sell **T0 gear** and consumables.  
   - Only certain stations, black markets, or specialty dealers will have **any** T1+ items in stock.

### 17.2 What shops can sell (by default)

Default assumptions for T1+ stock:

- **Common (C) & Uncommon (U)**  
  - May appear in shops **occasionally**, especially in larger hubs or specialist stalls.  
  - Treat them as **expensive** and with **very limited quantities** (often 0–2 useful pieces at any given time).

- **Rare (R)**  
  - Only appears in **exceptional** shops (major hubs, secret markets, or after specific story beats).  
  - Never treated as “standard inventory”; each Rare in a shop is its **own mini-hook**.

- **Legendary (L) & Relic (X)**  
  - **Not for sale** under normal circumstances.  
  - Acquired only through **quests, pacts, sites, or major story events**.  
  - If a Legendary or Relic is ever “sold”, it should be a **one-off, heavily story-framed exception**.

> [!rule] Magic shops are not supermarkets
> - There is **no such thing** as a reliable “magic mart” that always stocks whatever you want.  
> - At most, a few stations in the setting may be known as **good places to *try*** to find magic, but actual inventory is always **scarce, specific, and story-driven**.

### 17.3 T0 vs T1+ in commerce

- **T0 gear (mundane / printed):**  
  - Widely available (subject to local economy, law, and rail conditions).  
  - Prices and availability handled by Simple Inventory and economy rules.

- **T1+ items (C/U/R/L/X):**  
  - Treated as **special finds**, not commodities.  
  - Even when present in a shop, each item is effectively a **quest node** or negotiation opportunity, not just a purchase on a list.

---

## 18️⃣ Cursed & Negative Items — Rare, Story-Driven ^cursed-items

> [!summary] Curses are exceptions, not baseline
> - **Most items are not cursed.**  
> - **Cursed / negative items only appear when the story explicitly calls for them.**  
> - They are treated as **rare drops or specific story rewards**, not standard loot.

### 18.1 When curses appear

Baseline policy:

- Cursed items are **not** on normal loot tables.  
- They show up only when:  
  - A particular **story beat** demands it (e.g., a haunted site, a Luciferal bargain, a broken Relic), or  
  - You deliberately choose a **rare drop** to be cursed as part of a planned twist.

Guidelines:

- Cursed items should be **uncommon to rare** over an entire campaign.  
- They are appropriate mostly at **T2+**, and typically **Rare+** in terms of impact (even if the curse is the “main feature”).

### 18.2 Design principles for cursed items

When you do use a cursed or negative item:

- It should **matter**:  
  - The curse has a clear **mechanical impact** (drawback) and a strong **fictional hook**.  
  - It should create **interesting decisions**, not just punish the player for touching loot.

- It should feel **tempting**:  
  - Most cursed items should offer **real benefits** (stronger than a normal item of the same Tier/Rarity) in exchange for the drawback.  
  - Purely negative “gotcha” items should be very rare and usually telegraphed.

- It should be **removable or addressable**:  
  - There is a **path to dealing with the curse** (ritual, quest, sacrifice, Harmony/Lucifer intervention), even if it’s costly.  
  - Removal and mitigation procedures live in the appropriate rule docs (Revival, Harmony, Chaos, etc.), not as generic item rules.

### 18.3 Defaults & tags

- By default, items are assumed to be **uncursed** unless they carry a clear **[CURSED]** tag or curse text.  
- A [CURSED] item:
  - Still obeys normal **Tier, Rarity, slot, and attunement rules** unless its text says otherwise.  
  - May apply its curse whether or not the bearer is attuned, if the text specifies.

> [!rule] Curses are special cases
> - There is **no generic “cursed item” subsystem** beyond this section.  
> - Each cursed item is a **bespoke design** tied to a specific story moment or rare drop.  
> - Use them sparingly so that **every cursed item feels like an event**, not a routine trap.

### 18.4 Default curse philosophy

By default:

- Most [CURSED] items should be **temptations**, not pure punishments:  
  - They offer a **real, noticeable benefit** (often stronger than a normal item of the same Tier/Rarity),  
  - **And** impose a **meaningful drawback** (mechanical and/or narrative) that the player has to live with or work around.

- **Purely negative** cursed items (those with no upside beyond story flavor) are allowed but should be:
  - **Rare**,  
  - Usually **telegraphed** or at least thematically obvious (“this is a bad idea”), and  
  - Used when the **story strongly calls for it** (e.g., a trap reward, a punishment from a patron, or an artifact that’s broken beyond use).

> [!rule] Temptation first
> - When in doubt, design cursed items as **“powerful but dangerous”** rather than as straight traps.  
> - Pure downside curses are edge cases you choose consciously, not the norm.

---

## 19️⃣ Active Effects & Recharge Tags ^active-effects

> [!summary] Every active says how often it can fire
> - **All active effects on items must print their recharge/frequency on the card.**  
> - There is **no hidden default**; if a frequency is missing, that’s a design error, not a rule.

### 19.1 Standard recharge tags

Use short tags at the start of each active effect, then describe what it does.

Recommended tags:

- **[Scene]** — 1× per **scene / encounter / IAZ**. Refreshes when the current scene ends.  
- **[Short]** — 1× per **short rest**. Refreshes after you complete a short rest.  
- **[Long]** — 1× per **long rest**. Refreshes after you complete a long rest.  
- **[Chapter]** — 1× per **chapter / Canto** (or as defined by the current arc).

Example formatting:

- **Edge Sight.** [Scene] When you make an Awareness check to spot hazards, gain **+2 OFS (R)** to that roll.  
- **Grinder Surge.** [Short] When you fail a SYS check by ≤3, treat it as **S** instead.  
- **Last Ticket Home.** [Long] When you would be reduced to 0 HP, you may instead drop to 1 HP and teleport 3 squares.  
- **Routebreaker.** [Chapter] Once per chapter, trigger a controlled **Apocalyptic Shift** in your current Zone (see procedure).

> [!rule] No tag, no active
> - Every **active** on an item card must start with exactly **one** recharge tag.  
> - If an effect has **no usage limit**, it should be written as a **passive** instead, or use a clear “At-will” style note.

### 19.2 Design-size guidance (for authors)

These are **guidelines** for choosing tags; they are not printed on cards:

- **[Scene]** — for **small** actives (Uncommon / some Rare).  
- **[Short]** — for **medium** actives (typical Rare / some Legendary).  
- **[Long] / [Chapter]** — for **big, swingy** actives (Legendary / Relic, T4–T5).

Designers pick the tag based on **Tier, Rarity, and how strongly the effect can swing a situation**.

---

## 20️⃣ Universal Item Templates — Codex & Card ^item-templates

> [!summary] One schema, all items
> - **Codex template (author-facing)** = full data + design notes.  
> - **Card template (player-facing)** = trimmed, ready-to-print rules view.  
> - Works for all Types: WPN / ARM / CRM / TOL / IMP / ENG / DOC / CON.

---

### 20.1 Design goals & invariants

- **Single shape** for all items:
  - Weapons, Armor, Charms, Tools, Implants, Engines, Documents, Consumables.
- **Codex as source of truth:**
  - All rules, tags, and metadata live in one place.
  - Player-facing card is generated from the **Mechanical Block**.
- **No hidden defaults:**
  - Tier, Rarity, Attunement, recharge tags, and effects are **explicit**.
- **Helper / Resist / Shield rules are enforced at design time, not printed on cards:**
  - Cards stay clean; Codex has flags so you sanity-check them.

---

### 20️⃣ Universal Item Templates — Codex & Card ^item-templates

> [!summary] One schema, all items
> - **Codex template (author-facing)** = full data + design notes.  
> - **Card template (player-facing)** = trimmed, ready-to-print rules view.  
> - Works for all Types: WPN / ARM / CRM / TOL / IMP / ENG / DOC / CON.

---

### 20.1 Design goals & invariants

- **Single shape** for all items:
  - Weapons, Armor, Charms, Tools, Implants, Engines, Documents, Consumables.
- **Codex as source of truth:**
  - All rules, tags, and metadata live in one place.
  - Player-facing card is generated from the **Mechanical Block**.
- **No hidden defaults:**
  - Tier, Rarity, Attunement, recharge tags, and effects are **explicit**.
- **Helper / Resist / Shield rules are enforced at design time, not printed on cards:**
  - Cards stay clean; Codex has flags so you sanity-check them.

---

### 20.2 Codex Template (Author-Facing)

Use this as the full Obsidian note for a single item in your Item Codex.

```md
---
id: ITM-CCC-EEE-C             # e.g. ITM-GEA-014-X (see Triad Codes)
name: "{{Item Name}}"
status: draft                 # draft / playtest / released

# Triad & branch
collection_code: GEA          # GEA (Gear) / ART (Artifact) / BOO (Boon)
collection_label: "Gear"

branch_path: "Gear / Weapon / Blade / Knife"
branch_codes:
  - GEA                       # Collection
  - WPN                       # Type
  - BLD                       # Family
  - KNF                       # Archetype

# Classification
tier: T2                      # T1–T5 (T0 is mundane outside this system)
rarity: Rare                  # Common / Uncommon / Rare / Legendary / Relic
rarity_code: R                # C / U / R / L / X

item_type: Weapon             # Weapon / Armor / Charm / Tool / Implant / Engine / Document / Consumable
item_type_code: WPN           # WPN / ARM / CRM / TOL / IMP / ENG / DOC / CON

slot: Main Hand               # Armor / Shield / Main Hand / Off Hand / Headgear / Neck /
                               # Body / Hands / Waist / Feet / Ring / None
size: MED                     # TNY / MED / BUL / HVY / MSV / TIT
bl_cost: 1                    # BL or pBL cost, as per Simple Inventory

attunement: none              # none / attune / attune_harmony
tags:                         # mechanical/world tags
  - Wondrous                  # e.g. [HARMONY], [CHAOS], [CURSED], Wondrous, Document, EnginePart

# Story placement
canto: "Canto II"             # first Canto this appears in
source_zone: "Zone Name"
factions:
  - "Faction A"
  - "Faction B"

summary: "One-sentence snapshot of what this item does and why it matters."
---

# {{Item Name}}

> Short pitch (1–2 lines) describing what it is, does, and feels like.

---

## 1. Mechanical Block (Player-Facing Rules)

> This is the exact block that becomes the player card.

**Tier:** {{T2}} • **Rarity:** {{R}}  
**Type:** {{WPN}} • **Slot:** {{Main Hand}} • **Size:** {{MED, 1 BL}}  
**Attunement:** {{None / Requires Attunement / Requires Attunement & Harmony}}  
**Tags:** {{[HARMONY], [CHAOS], [CURSED], Wondrous, Document, EnginePart, etc.}}

### 1.1 Passives

- **P1.** {{Always-on effect. If it modifies rolls, say which lane/roll explicitly.}}  
- **P2.** {{Optional; only if within rarity passive cap.}}  
- **P3.** {{Optional; Legendary/Relic, within cap.}}

### 1.2 Actives

Each active begins with exactly one recharge tag: **[Scene] / [Short] / [Long] / [Chapter]**.

- **{{Active Name 1}}.** [Scene/Short/Long/Chapter] {{Effect text.}}  
- **{{Active Name 2}}.** [Scene/Short/Long/Chapter] {{Effect text (if any).}}

> If an effect truly has no usage limit, write it as a **Passive** or explicitly mark it "At-will:" in the text.

---

## 2. Type-Specific Details (Author Only)

Fill in the subsection that matches `item_type` and leave others empty.

### 2.1 Weapon details (if item_type = Weapon)

- Base form: {{knife / pistol / rifle / spear / staff / etc.}}  
- Damage & properties (if mirroring 5e): {{e.g. 1d4 piercing, finesse, light}}  
- Typical posture / lane synergy: {{e.g. TNK/STR, RDL/INT, IFC/CHA, etc.}}

### 2.2 Armor details (if item_type = Armor)

- Armor category (light/medium/heavy) and base AC / properties.  
- Notes: {{Stealth disadvantage? Special hazard interactions?}}

### 2.3 Charm / Tool / Implant details (CRM / TOL / IMP)

- Charm: bound boon or trinket? Social or Harmony flavor notes.  
- Tool: what skill/procedure it focuses (SYS/TNK/GDS, etc.).  
- Implant: installation notes, possible side effects or HS/Chaos interactions.

### 2.4 Engine / Vehicle Asset details (ENG)

- Subsystem: {{engine core / condenser / choir car / brake array / etc.}}  
- Scope: {{what part of the train or Zone it can affect}}  
- Special requirements: {{crew rites, site bindings, Harmony/Chaos constraints.}}

### 2.5 Document / Writ details (DOC)

- Authority scope: {{which faction/system recognizes this}}  
- Conditions: {{expiry, revocation, special seals.}}

### 2.6 Consumable / Charge details (CON)

- Physical form: {{vial, ampoule, cartridge, scroll, postcard}}  
- Charges / uses: {{one-shot, 3 charges, etc.}} (and how they are tracked).

---

## 3. Narrative & Hooks (Author Only)

### 3.1 Look & Feel

- How it looks, feels, sounds, smells; how someone recognizes it.

### 3.2 Origin & Lore

- Who made it, where it came from, which stories surround it.

### 3.3 Hooks & Usage

- Scenes or situations you want to highlight.  
- Factions/NPCs who want the item or fear it.  
- How losing/selling/breaking it could cause trouble.

---

## 4. Design & Balance Checklist (Author Only)

> Use this to stress-test the item before play.

- Tier & Rarity match the **Tier↔Canto** and **Tier×Rarity matrix**? **Y/N**  
- Passive/Active counts stay within **rarity slot caps**? **Y/N**  
- Any effect that directly modifies a single roll’s math flagged as a **Helper** and respects **“one item Helper per roll”**? **Y/N**  
- Any shield-style mitigation flagged as **Mitigation Helper** and respects **“one item shield per damage instance”**? **Y/N**  
- Any Resist/Immunity effect respects the **binary Resist rule** (no stacking into super-resist)? **Y/N**  
- No accidental override of core rails (Injuries, HS, CDR floors, Soul Debt, Revival) unless explicitly intended? **Y/N**  
- Attunement & Harmony Attunement usage consistent with §5 & §12? **Y/N**

> If any answer is "N", note why and whether it’s intentional.
```md
---
id: ITM-{{TYPE}}-{{TIER}}{{RARITY}}-{{SHORTNAME}}    # e.g. ITM-WPN-T2R-RAILSPIKE
name: "{{Item Name}}"
status: draft           # draft / playtest / released

# Classification
tier: T2                # T1–T5 (T0 is mundane outside this system)
rarity: Rare            # Common / Uncommon / Rare / Legendary / Relic
rarity_code: R          # C / U / R / L / X

item_type: Weapon       # Weapon / Armor / Charm / Tool / Implant / Engine / Document / Consumable
item_type_code: WPN     # WPN / ARM / CRM / TOL / IMP / ENG / DOC / CON

slot: Main Hand         # Armor / Shield / Main Hand / Off Hand / Headgear / Neck /
                        # Body / Hands / Waist / Feet / Ring / None
size: MED               # TNY / MED / BUL / HVY / MSV / TIT
bl_cost: 1              # BL or pBL cost, as per Simple Inventory

attunement: none        # none / attune / attune_harmony
tags:                   # mechanical/world tags
  - Wondrous            # e.g. [HARMONY], [CHAOS], [CURSED], Wondrous, Document, EnginePart

# Story placement
canto: "Canto II"       # first Canto this appears in
source_zone: "Zone Name"
factions:
  - "Faction A"
  - "Faction B"

summary: "One-sentence snapshot of what this item does and why it matters."
---

# {{Item Name}}

> Short pitch (1–2 lines) describing what it is, does, and feels like.

---

## 1. Mechanical Block (Player-Facing Rules)

> This is the exact block that becomes the player card.

**Tier:** {{T2}} • **Rarity:** {{R}}  
**Type:** {{WPN}} • **Slot:** {{Main Hand}} • **Size:** {{MED, 1 BL}}  
**Attunement:** {{None / Requires Attunement / Requires Attunement & Harmony}}  
**Tags:** {{[HARMONY], [CHAOS], [CURSED], Wondrous, Document, EnginePart, etc.}}

### 1.1 Passives

- **P1.** {{Always-on effect. If it modifies rolls, say which lane/roll explicitly.}}  
- **P2.** {{Optional; only if within rarity passive cap.}}  
- **P3.** {{Optional; Legendary/Relic, within cap.}}

### 1.2 Actives

Each active begins with exactly one recharge tag: **[Scene] / [Short] / [Long] / [Chapter]**.

- **{{Active Name 1}}.** [Scene/Short/Long/Chapter] {{Effect text.}}  
- **{{Active Name 2}}.** [Scene/Short/Long/Chapter] {{Effect text (if any).}}

> If an effect truly has no usage limit, write it as a **Passive** or explicitly mark it "At-will:" in the text.

---

## 2. Type-Specific Details (Author Only)

Fill in the subsection that matches `item_type` and leave others empty.

### 2.1 Weapon details (if item_type = Weapon)

- Base form: {{knife / pistol / rifle / spear / staff / etc.}}  
- Damage & properties (if mirroring 5e): {{e.g. 1d4 piercing, finesse, light}}  
- Typical posture / lane synergy: {{e.g. TNK/STR, RDL/INT, IFC/CHA, etc.}}

### 2.2 Armor details (if item_type = Armor)

- Armor category (light/medium/heavy) and base AC / properties.  
- Notes: {{Stealth disadvantage? Special hazard interactions?}}

### 2.3 Charm / Tool / Implant details (CRM / TOL / IMP)

- Charm: bound boon or trinket? Social or Harmony flavor notes.  
- Tool: what skill/procedure it focuses (SYS/TNK/GDS, etc.).  
- Implant: installation notes, possible side effects or HS/Chaos interactions.

### 2.4 Engine / Vehicle Asset details (ENG)

- Subsystem: {{engine core / condenser / choir car / brake array / etc.}}  
- Scope: {{what part of the train or Zone it can affect}}  
- Special requirements: {{crew rites, site bindings, Harmony/Chaos constraints.}}

### 2.5 Document / Writ details (DOC)

- Authority scope: {{which faction/system recognizes this}}  
- Conditions: {{expiry, revocation, special seals.}}

### 2.6 Consumable / Charge details (CON)

- Physical form: {{vial, ampoule, cartridge, scroll, postcard}}  
- Charges / uses: {{one-shot, 3 charges, etc.}} (and how they are tracked).

---

## 3. Narrative & Hooks (Author Only)

### 3.1 Look & Feel

- How it looks, feels, sounds, smells; how someone recognizes it.

### 3.2 Origin & Lore

- Who made it, where it came from, which stories surround it.

### 3.3 Hooks & Usage

- Scenes or situations you want to highlight.  
- Factions/NPCs who want the item or fear it.  
- How losing/selling/breaking it could cause trouble.

---

## 4. Design & Balance Checklist (Author Only)

> Use this to stress-test the item before play.

- Tier & Rarity match the **Tier↔Canto** and **Tier×Rarity matrix**? **Y/N**  
- Passive/Active counts stay within **rarity slot caps**? **Y/N**  
- Any effect that directly modifies a single roll’s math flagged as a **Helper** and respects **“one item Helper per roll”**? **Y/N**  
- Any shield-style mitigation flagged as **Mitigation Helper** and respects **“one item shield per damage instance”**? **Y/N**  
- Any Resist/Immunity effect respects the **binary Resist rule** (no stacking into super-resist)? **Y/N**  
- No accidental override of core rails (Injuries, HS, CDR floors, Soul Debt, Revival) unless explicitly intended? **Y/N**  
- Attunement & Harmony Attunement usage consistent with §5 & §12? **Y/N**

> If any answer is "N", note why and whether it’s intentional.
```

---

### 20.3 Card Template (Player-Facing)

This is the compact card you hand to players or show in a VTT. It is essentially just **§1 Mechanical Block + one flavor line** from the Codex.

```md
#### {{Item Name}}

- **Tier:** {{T2}} • **Rarity:** {{R}}  
- **Type:** {{WPN}} • **Slot:** {{Main Hand}} • **Size:** {{MED, 1 BL}}  
- **Attunement:** {{None / Requires Attunement / Requires Attunement & Harmony}}  
- **Tags:** {{[HARMONY], [CHAOS], [CURSED], Wondrous, Document, EnginePart, etc.}}

**Passives**  
- {{P1 text.}}  
- {{P2 text (if any).}}  
- {{P3 text (if any).}}

**Actives**  
- **{{Active Name 1}}.** [Scene/Short/Long/Chapter] {{Effect text.}}  
- **{{Active Name 2}}.** [Scene/Short/Long/Chapter] {{Effect text (if any).}}

> _Flavor:_ {{One short line of description or vibe.}}
```

Notes:

- This card template works unchanged for **all item types**:
  - Weapons will often also show damage in Passives text.  
  - Armor will show AC/resistances in Passives.  
  - Charms/Tools/Implants/Engines/Documents/Consumables all fit in the same "Passives + Actives + Tags" shape.
- If an item has **no Actives**, omit the Actives block.  
- If it has **no Passives**, you can omit that block and only show Actives.
