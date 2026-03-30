---
schema: apex-docs-v1
code: REF-GDE-ITM-001-A
title: "Item Card Categories — Canon + Color/Icon Standard"
type: guide
audience: author
status: final
version: 1.1
updated: 2025-12-22
tags:
  - ae/cards
  - ae/items
  - ui/category
  - styleguide
summary: "7 stable item categories for card sorting + table clarity. Includes strict inclusion rules, edge-case rulings, and a print-safe color/icon system."
---

# Item Card Categories — Canon + Color/Icon Standard

## 0) Scope (what category *means*)
**Category** is a **sorting + scanning** signal for players (footer badge + icon + accent color).  
It must **not** encode rarity/power. Rarity lives in the **5‑pip quality** meter.

**We keep exactly 7 categories** and solve everything else with **tags in FUNCTION**.

---

## 1) Global rules (non‑negotiable)

### 1.1 Category does not change card geometry
All items share the same universal frame. Category only affects:
- footer label + icon
- accent color (badge + optional thin side stripe)
- the **TYPE line** in FUNCTION (first line)

### 1.2 Avoid currency-color collisions
Your PRICE field uses **Gray / Red / Gold tickets**.  
Do **not** use those three hues as category colors.

### 1.3 Color is never the only signal
Every category must have:
- **label** (text)
- **icon**
- optional **pattern** (stripe/hatch) for grayscale/print

### 1.4 “Primary purpose” decides category
If an item could fit multiple categories, assign it by the **single most common table use**.

Use this decision order:

1) **Is it rest fuel?** → Camp Supplies  
2) **Is it consumed on use (discarded/emptied/detonated)?** → Consumables  
3) **Is it primarily for attacks/damage as equipped gear?** → Weapons  
4) **Is it primarily for AC/protection as worn gear?** → Armor & Wearables  
5) **Is it reusable utility or enables checks?** → Gear & Tools  
6) **Is it mainly an upgrade/input/turn‑in resource?** → Salvage & Materials  
7) **Is it a plot key / attunement-gated artifact that isn’t “basically a weapon/armor/tool”?** → Relics & Keys  

> **Important:** A “Relic Sword” is still a **Weapon** (with Relic quality).  
> “Relics & Keys” is for **non-standard artifacts** and **plot gates**, not for normal equipment.

---

## 2) Canon category list (7)

## 2.1 Camp Supplies
**Footer label:** `CAMP SUPPLIES`  
**Purpose:** fuels long rests / camp supply stash (train deposit loop).

**Includes**
- food, water, rations, pantry bundles, “trash snacks”
- anything whose primary output is `CAMP SUPPLY +X`

**Excludes**
- healing/drugs/stims → Consumables
- crafting ingredients → Salvage & Materials

**FUNCTION conventions (top lines)**
- `TYPE: Camp Supply (Food/Drink/Pack)`
- `CAMP SUPPLY: +X`
- `DEPOSIT: Kitchen (Train) → +X`

---

## 2.2 Consumables
**Footer label:** `CONSUMABLE`  
**Purpose:** one‑use or limited‑use effects you spend in play.

**Includes**
- potions, injectors, bandages (single-use), grenades, charges
- ammo packs *if you treat them as expendable resource items*

**Excludes**
- reusable kits/tools → Gear & Tools
- food that only exists to refill camp supply → Camp Supplies

**FUNCTION conventions**
- `TYPE: Consumable (Stim/Explosive/Elixir/etc.)`
- `USE: Action / Bonus / Reaction / 1 min`
- `EFFECT: …` (short, then details)

---

## 2.3 Weapons
**Footer label:** `WEAPON`  
**Purpose:** equipped items whose primary role is to make attacks.

**Includes**
- melee/ranged weapons, weapon‑tools (machete, pry‑axe) if used mainly to attack
- attachments that mostly alter attack profile (optional)

**Excludes**
- thrown explosives that are discarded → Consumables

**FUNCTION conventions**
- `TYPE: Weapon (Melee/Ranged)`
- `DMG: …` (dice + type)
- `RANGE/PROP: …` (compact)

---

## 2.4 Armor & Wearables
**Footer label:** `ARMOR`  
**Purpose:** worn items whose primary role is defense/protection.

**Includes**
- armor, shields, helmets, masks, protective suits
- “always‑on” defensive wearables

**Excludes**
- purely utility wearables (grappling belt, tool harness) → Gear & Tools
- plot-gate artifacts → Relics & Keys (unless they are basically normal armor)

**FUNCTION conventions**
- `TYPE: Armor (Light/Medium/Heavy) / Shield`
- `AC: …`
- `REQ/STEALTH/RESIST: …` (as needed)

---

## 2.5 Gear & Tools
**Footer label:** `GEAR`  
**Purpose:** reusable utility, kits, and check‑enablers.

**Includes**
- rope, lanterns, lockpicks, kits, scanners, containers, maps
- devices with charges that persist (not discarded)

**Excludes**
- crafting/turn‑in bundles → Salvage & Materials
- one‑use versions of tools → Consumables

**FUNCTION conventions**
- `TYPE: Gear (Tool/Kit/Device)`
- `ENABLE/BONUS/CHECK: …`
- `CHARGES: …` (if any)

---

## 2.6 Salvage & Materials
**Footer label:** `SALVAGE`  
**Purpose:** upgrade inputs, crafting resources, barter goods, heavy awkward finds.

**Includes**
- scrap, machine parts, upgrade components, trade bundles
- cargo meant to be deposited/sold/processed

**Excludes**
- functional tools you use repeatedly → Gear & Tools
- plot keys → Relics & Keys

**FUNCTION conventions**
- `TYPE: Salvage (Material/Component/Cargo)`
- `TURN‑IN: Cargo/Workshop/NPC`
- `USED FOR: …` (recipe bucket)

---

## 2.7 Relics & Keys
**Footer label:** `RELIC`  
**Purpose:** plot gates + attunement-gated artifacts that don’t fit normal “equipment” lanes.

**Includes**
- keys, passes, codes, intel tokens that unlock routes/systems
- unique artifacts with special gating, weird rules, or nonstandard behavior

**Excludes**
- relic weapons/armor that are still basically weapon/armor → keep their normal category; use Relic **quality** + gating text

**FUNCTION conventions**
- `TYPE: Relic / Key`
- `REQUIRES: …` (attunement/license/story flag)
- `EFFECT: …` (short)

---

## 3) Color + icon system (print-safe)

### 3.1 Usage
Use the category color only in:
- bottom-left category badge (fill)
- optional thin side stripe (2–3 mm)
- small icon fill

Keep the rest of the card neutral.

### 3.2 Palette (Base + Tint)
Tint is a light background (10–15% opacity equivalent) for reference sheets, not for the whole card.

| Category            |      Base |      Tint | Text on badge | Icon concept     | Optional pattern |
| ------------------- | --------: | --------: | ------------- | ---------------- | ---------------- |
| Camp Supplies       | `#2D6A4F` | `#E6F3ED` | white         | campfire / pot   | solid bar        |
| Consumables         | `#0F766E` | `#E0F4F2` | white         | vial / syringe   | diagonal hatch   |
| Weapons             | `#9A3412` | `#F7E7E1` | white         | crossed blade    | chevrons         |
| Armor & Wearables   | `#334E68` | `#E6EEF5` | white         | shield           | block stripe     |
| Gear & Tools        | `#1D4ED8` | `#E7EEFF` | white         | wrench / toolkit | dotted stripe    |
| Salvage & Materials | `#6B4423` | `#EFE6E1` | white         | crate / scrap    | crosshatch       |
| Relics & Keys       | `#5B21B6` | `#F0E9FF` | white         | key / sigil      | double stripe    |

> **Note:** These hues intentionally avoid “ticket gray/red/gold” so category meaning doesn’t collide with price meaning.

### 3.3 Icon implementation rule
- Use one **simple silhouette** per category.
- Put the icon inside the category badge (bottom-left) and optionally as a faint watermark behind the badge.
- Never rely on icon alone: the label stays.

---

## 4) Edge-case rulings (adversarial consistency)

### 4.1 Grenades, mines, thrown damage
- **Single-use explosive** → **Consumables** (even if it “attacks”).
- **Reusable launcher** → **Weapons**; its ammo is **Consumable** or **Salvage** depending on how you treat ammunition.

### 4.2 Food that heals HP
- If the item’s main purpose is **camp supply** → Camp Supplies (HP rider goes in FUNCTION).
- If the item’s main purpose is **heal/buff now** → Consumables.

### 4.3 “Relic version” of normal gear
- If it is **basically** weapon/armor/gear: keep that category, set **quality = Relic**, and put gating in FUNCTION.
- Use **Relics & Keys** only when the object is a **plot gate** or **weird artifact** that isn’t primarily “equipment.”

### 4.4 Trade goods vs salvage
- If it’s mostly **sell/turn‑in**: Salvage & Materials.
- If it’s a reusable object: Gear & Tools.

---

## 5) Quick author checklist (before finalizing a card)
- [ ] Does the category match the item’s **primary purpose**?
- [ ] Does the badge use the correct **color + icon + label**?
- [ ] Are ticket colors reserved for **PRICE** only?
- [ ] Is the FUNCTION top line formatted as `TYPE: …`?
- [ ] If it’s a “Relic weapon/armor,” did you keep it in **Weapon/Armor** and only mark **quality** as Relic?

---

## 6) Change control (so this stays stable)
- If you must add a category, you must also write:
  - what existing categories it steals items from
  - 5 example items
  - a forced-field reason (why tags aren’t enough)
- Otherwise: add a **tag** and keep the 7-category canon.
