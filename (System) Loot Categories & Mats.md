---
schema: apex-docs-v1
code: RUL-BAS-LUT-W
title: "Loot Categories & Materials — Apocalypse Express"
type: rule
audience: author
status: draft
version: 0.9
updated: 2025-11-28
tier: core
tags: [rule/loot, tables, system, apex]
aliases:
  - "Loot Categories"
  - "Drop Profiles & Materials"
  - "Loot System — Apocalypse Express"
summary: "Defines the 8 functional loot categories for Apocalypse Express, plus the dual material lines (SCRAP & SHARDS) they hook into. This is the backbone for all drop tables and scene loot profiles."
---

# 🎁 Loot Categories & Materials — Apocalypse Express
^top

> [!summary]+ 🧭 On this page
> [[#^tldr|TL;DR]] · [[#^categories|1. Loot Categories (8)]] · [[#^materials|2. Materials (SCRAP & SHARDS)]] · [[#^profiles|3. Loot Profiles (how to use categories)]] · [[#^design|4. Design Guardrails]] · [[#^accept|✅ Acceptance checks]] · [[#^changes|Changelog]]

---

## 💎 TL;DR — What this rule does
^tldr

> [!tldr]
> - **All loot in AE** is written against **8 functional categories**, not 50 micro‑tables.  
> - We track **2 material lines** only: **SCRAP** (common rail salvage) and **SHARDS** (rare A‑Tech fragments).  
> - Scene cards use **Loot Profiles** (weightings) to say *which* categories/tiers to roll, not bespoke tables every time.  
> - This keeps loot **complete but lean**: every item and reward fits somewhere without drowning authors or GMs in detail.

---

## 1️⃣ Loot Categories (8) — Overview
^categories

> [!info] 🔢 Resolution level
> These 8 are **top‑level functional buckets**.  
> **Sub‑types** (Weapons vs Armor, Keys vs Intel vs Favors, etc.) are handled *inside* each category, not as new top‑level categories.

### A. Category list (short)

1. **Currency & Valuables** — LEV, cash‑equivalents, trade goods.  
2. **Combat Gear** — weapons, armor, combat mods, ammo (if tracked).  
3. **Medical & Chems** — healing, stims, detox, injury tools.  
4. **Tools & Tech** — kits, scanners, drones, utility devices.  
5. **Survival & Logistics** — food, water, clothing, camping, lamps, general “living on the rails” kit.  
6. **Salvage & Materials** — scrappable items, **SCRAP** & **SHARDS**.  
7. **A‑Tech & Relics** — rare weird tech, occult artifacts, Train modules.  
8. **Keys, Intel & Boons** — access, secrets, favors, plot coupons, blessings.

Each category normally supports **2–3 tiers** (e.g., **Low / Standard / High**) to express magnitude, but the **category** is always one of these 8.

---

### 1. Currency & Valuables
^cat-currency

**Purpose:** Stuff you can sell, spend, or bribe with.

- **Includes:**
  - LEV tickets (any denomination).
  - Cash‑like tokens (chips, scrip).
  - Small valuables: jewelry, watches, rare booze, cigarettes, collectible stamps, etc.
  - Art objects & contraband (paintings, oddities) that are primarily sold/bartered.
  - Very **rarely**: a **Sparkplug** result (PLUG) as a special high‑tier entry.

- **Excludes:**
  - Train materials (those are **Salvage & Materials**).
  - Intel and favors (those are **Keys, Intel & Boons**).

- **Typical tiers:**
  - **Low:** petty cash, a few LEV, minor valuables.  
  - **Standard:** decent LEV chunks, trade goods worth carrying.  
  - **High:** major scores; vault contents; “this could fund a project.”

---

### 2. Combat Gear
^cat-combat

**Purpose:** Directly changes how you fight.

- **Includes (sub‑tags):**
  - **[Weapon]** melee & ranged weapons, sidearms to heavy.
  - **[Armor]** vests, coats, helmets, shields, personal protection.
  - **[Throwable]** grenades, demo charges, specialty munitions.
  - **[Ammo]** only if you choose to loot ammo (especially in Hardcore).

- **Excludes:**
  - Utility gear (multi‑tools, radios, scanners) → **Tools & Tech**.
  - Relic‑tier magic items → **A‑Tech & Relics** (even if they look like weapons).

- **Typical tiers:**
  - **Low:** improvised, shoddy, or common gear (pipes, old pistols, thin vests).  
  - **Standard:** solid military‑grade kit sized to party level.  
  - **High:** named weapons, prototypes, uniquely modded pieces.

---

### 3. Medical & Chems
^cat-medical

**Purpose:** Patch, boost, or stabilize bodies and minds.

- **Includes:**
  - First‑aid supplies: bandages, splints, trauma kits.
  - Healing items: syringes, sprays, field transfusions.
  - Chems: stims, painkillers, adrenaline shots, combat drugs.
  - Detox & purge agents (poison, radiation, infection).
  - Injury tools (staplers, bone saws) if they have explicit mechanical help.

- **Excludes:**
  - Long‑term ritual healing or CL/HL changes → those are **Boons** or specific **Procedures**.

- **Typical tiers:**
  - **Low:** small HP bumps, minor stims, basic first‑aid.  
  - **Standard:** good in‑scene healing, reliable detox, serious stims.  
  - **High:** rare kits that rival spells or mitigate injury downstream (but **not** Sparkplugs).

---

### 4. Tools & Tech
^cat-tools

**Purpose:** Interact with the world via **skills & systems**, not raw damage.

- **Includes (examples):**
  - Basic tools: crowbars, multi‑tools, lockpicks, rigging kits.
  - Specialist kits: EOD kit, advanced Tinker set.
  - Devices: hand scanners, analyzers, signal interceptors, drones.
  - Hacking dongles, diagnostic rigs, field terminals.

- **Excludes:**
  - Gear whose primary purpose is combat → **Combat Gear**.
  - Pure scrap/parts → **Salvage & Materials**.
  - Full‑blown relics (attunement, Harmony, CL) → **A‑Tech & Relics**.

- **Typical tiers:**
  - **Low:** simple tools; single‑purpose gadgets; minor bonus to one kind of check.  
  - **Standard:** full kits; reusable devices; solid scene‑level effects.  
  - **High:** powerful but non‑relic devices (multi‑scene or campaign‑relevant, but still not magical).

---

### 5. Survival & Logistics
^cat-survival

**Purpose:** Staying alive and functional between fights.

- **Includes:**
  - Food & drink (rations, water, preserved meals).
  - Clothing & environmental gear (coats, masks, boots).
  - Camping kit: tents, bedrolls, cooking gear.
  - Light & fuel: lanterns, batteries, fuel cans.
  - Basic rope, climbing gear, sleds, packs.

- **Excludes:**
  - Medical items → **Medical & Chems**.
  - Train‑scale logistics (cargo cranes, hull plating) → **Salvage & Materials** / **Relics**.

- **Typical tiers:**
  - **Low:** cheap/basic gear, slightly better than nothing.  
  - **Standard:** solid, reliable expedition kit.  
  - **High:** exceptional survival tools (insulated, compact, multipurpose).

---

### 6. Salvage & Materials
^cat-salvage

**Purpose:** Feed the **Train Workshop & upgrades** via physical salvage. Holds your two material lines.

- **Includes:**
  - Scrappable items: couplers, broken generators, structural pieces, cable spools.
  - Direct material drops:
    - **SCRAP** (common Rail Scrap).
    - **SHARDS** (rare A‑Tech Shards).
  - Large “junk” objects that are mainly worth their scrap yield.

- **Excludes:**
  - Tools that are more useful intact than scrapped → **Tools & Tech**.
  - Pure relics/modules (installed as‑is) → **A‑Tech & Relics**.

- **Typical tiers:**
  - **Low:** small, light salvage; 1 unit of SCRAP; low BL.  
  - **Standard:** solid salvage chunks; 2–3 SCRAP; occasional 1 SHARD.  
  - **High:** big ticket salvage: heavy modules, 3+ SCRAP, multi‑SHARD yields.

> [!tip] 🧱 Scrappables vs raw materials
> - **Scrappable items** are normal items with a **Scrap Yield** line that convert into SCRAP/SHARDS at the Workshop.  
> - Some high‑tier results may give **raw SCRAP/SHARDS** directly (“+2 SCRAP to the Train pool”).

---

### 7. A‑Tech & Relics
^cat-relics

**Purpose:** Rare, campaign‑relevant “magic‑item tier” rewards.

- **Includes (sub‑tags):**
  - **[Relic‑Personal]**: Harmony‑attuned items, occult artifacts, unique gadgets usable by PCs.
  - **[Relic‑Train]**: Train modules (sensor masts, ward arrays, armor kits) installed on the Train.
  - Unique A‑Tech devices whose rules go beyond a simple “+1 to X”.

- **Excludes:**
  - Ordinary weapons/armor → **Combat Gear**.  
  - Normal tools & devices → **Tools & Tech**.  
  - Generic scrap → **Salvage & Materials**.

- **Typical tiers:**
  - **Low:** minor relics, limited‑use curios, “baby” versions of major items.  
  - **Standard:** strong relics with campaign relevance.  
  - **High:** apex artifacts and big Train modules; usually authored, not random.

> [!warning] 🎲 Random relics
> Use Relics **sparingly** in tables. Most should be **authored drops** in key scenes, with tables used for color or backup only.

---

### 8. Keys, Intel & Boons
^cat-intel

**Purpose:** Non‑item rewards that move the story or shift position.

- **Includes (sub‑types):**
  - **[Key]**: physical keys, cards, route codes, access writs.
  - **[Intel]**: maps, dossiers, blackmail material, rumors, decoded traffic.
  - **[Boon]**: favors, faction help, discounts, safehouses, one‑time free services, minor blessings.

- **Excludes:**
  - Currency (LEV, art) → **Currency & Valuables**.
  - Permanent mechanical features that behave like items → usually **Relics**.

- **Typical tiers:**
  - **Low:** small clues, local access, minor favors.  
  - **Standard:** major intel, station‑level access, faction shifts, usable safehouses.  
  - **High:** campaign‑scale keys (entry to late Zones), big leverage, ongoing advantages.

> [!tip] 🧩 Loot ≠ only “stuff”
> For many authored scenes, **Keys/Intel/Boons** will be the *primary* loot. The categories exist so we remember to treat those rewards as “real” drops.

---

## 2️⃣ Materials — SCRAP & SHARDS
^materials

> [!info] 🧰 Design intent
> We support **exactly 2 material lines** in core AE.  
> They live inside **Salvage & Materials**, are tracked on the **Train sheet**, and fuel **Train upgrades and certain vendors**.

### A. Material lines

- **SCRAP — Rail Scrap (common)**  
  - Source: most SALVAGE‑tagged items, yard wreckage, industrial Zones.  
  - Use: mundane Train projects (armor plating, brake rigs, cargo tweaks, physical repairs).

- **SHARDS — A‑Tech Shards (rare)**  
  - Source: weird tech, hellcore debris, aSYNC/occult infrastructure, boss setpieces.  
  - Use: high‑tier projects (advanced scanners, Lucifer‑adjacent systems, experimental mods).

> [!tip] 📊 Target frequency
> Over a full campaign:  
> • ~70–85% of salvage yield = **SCRAP**  
> • ~15–30% = **SHARDS** (often from specific authored scenes)

### B. Scrappable items

- Any item can have a **Scrap** line, e.g.:
  - `Scrap: +1 SCRAP`  
  - `Scrap: +1 SCRAP, +1 SHARD`
- At the **Train Workshop** (or specific vendors), you can **convert** scrappables:
  - Spend a Short Rest; destroy the items; add their yields to `SCRAP` / `SHARDS`.

### C. Using materials

- Train projects & some vendors cost:
  - LEV + SCRAP for mundane upgrades;  
  - LEV + SCRAP + SHARDS (and **maybe** 1 PLUG) for high‑end toys.
- Materials **never** replace PLUG, ST, LEV, or CL; they sit alongside those currencies, not on top.

---

## 3️⃣ Loot Profiles — How scenes use categories
^profiles

> [!info] 🎲 Profiles, not bespoke tables
> A **Loot Profile** is a tiny spec per scene/Zone that says *which categories/tiers to roll on* and how often. It avoids inventing a unique table for every encounter.

### A. Profile structure

A profile is:

- A **name** (e.g., `On‑Body — Guard`, `Salvage — Yard`, `Shrine Hoard`).  
- A **weighting** over **categories + tiers**, e.g.:

> `On‑Body — Guard (dead security)`  
> - 40% **Combat Gear (Low/Std)**  
> - 20% **Currency & Valuables (Low)**  
> - 15% **Tools & Tech (Low)**  
> - 15% **Medical & Chems (Low)**  
> - 10% **Keys/Intel & Boons (Low)**

The profile tells you **what to roll on**; the *tables* live under each category/tier.

### B. Using profiles in scene cards

Scene card **Loot** section:

- **Authored loot**: fixed items / keys / boons.  
- **Profile hook(s)**: “On thorough search: roll once on `On‑Body — Guard`.”  
- Optional **mode tweak** (e.g., Hardcore might swap some results to ammo).

---

## 4️⃣ Design Guardrails
^design

> [!warning] 🚧 Don’t over‑resolve
> When adding loot, **do not introduce new top‑level categories**.  
> Any new items must fit one of the 8 above; differences are handled as **sub‑tags** or **tiers**.

### A. When to add a sub‑tag vs a category

- If the difference is **“what does it do?”**, and it doesn’t map to an existing 8, reconsider the item.  
- If the difference is **“what kind of X is this?”** (weapon vs armor, key vs intel vs boon):
  - Keep the same category.
  - Add a **sub‑tag** inside that category’s table.

### B. Materials & currencies

- Do **not** add more base materials (no “metal/plastic/glass scrap” lines).  
- All physical upgrade resources must reduce to **SCRAP** or **SHARDS**.
- Do **not** use SHARDS as substitute PLUGs; keep PLUG special.

### C. Relics & Train modules

- Treat Train modules as **Relics** with `[Relic‑Train]` tag.  
- Large piles of armor plate etc. are **Salvage** (SCRAP), not Relics, unless they’re special.

---

## ✅ Acceptance checks
^accept

> [!accept]
> - **Any lootable thing in AE fits exactly one of the 8 categories.** If you can’t place it, redefine the loot, not the categories.  
> - **Materials:** All salvageable “material” rewards reduce to **SCRAP** and/or **SHARDS**. We never introduce a third baseline material line in core.  
> - **Relics:** Anything that needs Harmony Attunement, changes CL/HL, or installs as a Train module is **A‑Tech & Relics**, not generic gear.  
> - **Story rewards:** Access, secrets, favors, ritual unlocks, and “free services” are all **Keys, Intel & Boons**, not Currency.  
> - **Profiles:** A scene’s random loot is fully describable by “authored items + 0–2 Loot Profiles referencing these 8 categories.”

---

## 🔄 Changelog
^changes

- **v0.9 (2025‑11‑28):** Initial authoring of the 8‑category loot system + dual materials (SCRAP & SHARDS). Locked top‑level categories and material count; clarified Relic vs Salvage vs Tool boundaries; added Profile usage and Acceptance checks.
