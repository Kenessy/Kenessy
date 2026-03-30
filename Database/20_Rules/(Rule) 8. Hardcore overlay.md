---
created: 2025-11-17
schema: apex-docs-v1
code: PKG-BAS-MOD-C
title: "Modes — Core vs Hardcore (Switch)"
type: pkg
audience: table
player_facing: true
status: final
version: 0.4
updated: 2025-11-18
tier: core
tags: [pkg/mode, rule/overlay, player-facing]
aliases: ["Modes — Core vs Hardcore", "Modes - Core vs Hardcore", "Core vs Hardcore"]
depends_on:
  - "Injuries — Minor/Major & Caps"
  - "Simple Inventory (BL) — Ballast + Pockets"
  - "Roll State Priority — Hard Override / Soft Override / Offsets"
  - "Chaos & Harmony — Unified Rules"
  - "Revival — Lucifer & Quantum Print"
summary: "Two table-wide presets that flip only marked levers (ammo, injury stacking, Mercy Swap, Soul Debt accrual). Core resolution, currencies, and skill policies never change."
---

# Modes — Core vs Hardcore (Switch)
^top

> [!tldr] **TL;DR — What Modes Do**
> Pick **one** preset at Session Zero (**table‑wide**). Modes flip only **marked levers** on rule cards that carry a **“mode”** callout. **Everything else is invariant** (roll order, currencies, skill policies). There is **no permadeath** in either mode—the Train **always** revives fallen PCs.
> 
> **Presets:**  
> • **Round‑Trip (Core)** — standard/cinematic; **Ammo OFF**; **Mercy Swap ON**; **Deeper Wounds OFF**; **Soul Debt accrual = +1 per decant**.  
> • **End of the Line (Hardcore)** — gritty/survival; **Ammo ON**; **Mercy Swap OFF**; **Deeper Wounds ON**; **Soul Debt accrual = +1/+2/+3 by Majors at death (0–1/2/3)**.

---

## 🧭 Overview
Two presets define the campaign’s tone and resource pressure. **A mode is an overlay**, not a rewrite: it **only** toggles levers on rules that explicitly include a **mode** callout block.

- **Round‑Trip (Core).** Focus on pace and story. Abstract tracking, generous safety valves.  
- **End of the Line (Hardcore).** Higher friction and attrition. Tightened tracking and harsher injury behavior.

> [!note] **No character‑by‑character modes**
> Mode is **table‑wide** to keep expectations aligned.

---

## 🔧 Mode Logic
- Choose **one** mode at **Session Zero** (table‑wide).  
- A mode **toggles only** rule cards that show a **mode** callout. If a card has **no** mode callout, it **does not change**.  
- **Mid‑campaign swap:** Finish the current session under the **old mode**; apply the **new mode** next session. No retroactive rewrites.

---

## 🧱 Invariants (never change by mode)
- **Roll order & resolution:** *Gate → Hard Override → Soft Override → d20 → Offsets → Bands*.  
- **Revival/printing** flow and timings (the Train revives; story continues).  
- **Zone meter / CDR** model and rest semantics.  
- **Currencies & inventory primitives** (LEV/PLUG/ST and BL/pBL).  
- **Skill list, locks policy** (Keyed vs Open, Help), and postures.  
- **Chaos/Harmony interlocks** (e.g., Devil’s Mercy limits) remain as written on their cards.

---

## 🔁 Default Mode Flips (this campaign)
Add flips only where a rule card **explicitly** includes a **“mode”** callout.

| Lever (rule card) | **Round‑Trip (Core)** | **End of the Line (Hardcore)** |
| --- | --- | --- |
| **Ammo Tracking** (Inventory) | **OFF** — abstracted | **ON** — count ammo |
| **Injury: Mercy Swap** (party reaction) | **ON** — nearby ally can take an incoming **Major** | **OFF** — not available |
| **Injury: Deeper Wounds** (duplicate Major escalates) | **OFF** | **ON** — duplicates on the **same lane & same named Major** escalate (`H2d8 → H2d10 → H2d12`) |
| **Soul Debt accrual per decant** (Revival) | **+1 SD** *(each time you **finish decanting** after a death)* | **+1 / +2 / +3 SD** by **Majors at death** *(0–1 / 2 / 3)* |

> [!tip] **Hardcore SD design (why this works)**
> The **+1/+2/+3** ladder keys to a **fact you already track** (Major count at the moment of death):  
> • **0–1 Majors → +1 SD** *(low friction; early‑arc deaths don’t snowball)*.  
> • **2 Majors → +2 SD** *(you were compromised)*.  
> • **3 Majors → +3 SD** *(HS Active; risky play costs more)*.  
> It **rewards care** (clearing Minors/Majors before pushing) and **punishes reckless loops** without extra clocks.

---

## 🩸 Deeper Wounds (Hardcore lever)
When **ON**, taking a **duplicate Major** on the **same lane** (and **same named injury**) doesn’t add another copy; it **escalates** the existing Major’s harm die instead, up to a cap.

- **Escalation track:** `H2d8` (**Skin‑Deep**) → `H2d10` (**Bone‑Deep**) → `H2d12` (**Soul‑Deep**) → *(cap)*.  
- **Lane‑locked:** Only duplicates **on the same lane** escalate. Cross‑lane injuries don’t stack.  
- **Reset:** Clearing the Major **removes** its escalation. If regained later, it returns at `H2d8`.

---

## 🫱 Mercy Swap (Round‑Trip lever)
When **ON**, a nearby ally can **take the incoming Major** (same assignment method). If taken, **no duplicate lands** on the original target (so **no** escalation occurs even in Hardcore campaigns that later switch modes).

---

## 🔁 Choosing & Swapping
- **Recommendation:** Start new/story‑first tables on **Round‑Trip**. Survival‑hungry groups opt into **Hardcore**.  
- **Swapping between sessions:** Allowed by table consent. Existing injuries keep their current tier/state. New injuries follow the **new** mode’s lever settings.

---

## ❓ Player FAQ
**Q. Is permadeath a thing in Hardcore?**  
**A. No.** The Train always revives. Modes only change **levers** (resource/realism), not the revival premise.

**Q. Can different players run different modes at the same table?**  
**A. No.** Mode is **table‑wide**.

**Q. Does Hardcore change XP, loot, or story rewards?**  
**A. No** (unless a specific rule card says otherwise). Hardcore **tightens tracking** and **punishes injuries more**; it doesn’t change plot scale.

**Q. We swapped to Hardcore—do our current injuries jump tiers?**  
**A. No.** Mode changes are **not retroactive**. Ongoing or future injuries use the new settings.

**Q. What exactly counts as “ammo” here?**  
**A. Items tagged **Ammunition** on their card.** Spells, abilities, and other resource clocks aren’t ammo unless the card says so.

---

## ✅ Acceptance checks
- **Pipeline invariance:** Resolution always follows **Gate → HARD → SOFT → d20 → OFS → Bands** under **both** modes.  
- **Ammo lever:** In **Round‑Trip**, ammo is **not tracked**; in **Hardcore**, ammo is **tracked** per the Inventory card.  
- **Mercy Swap lever:** **ON** in **Round‑Trip**, **OFF** in **Hardcore**.  
- **Deeper Wounds lever:** **OFF** in **Round‑Trip**; **ON** in **Hardcore** (`H2d8 → H2d10 → H2d12` for **same named Major on the same lane**).  
- **Soul Debt lever:** In **Round‑Trip**, each completed revival adds **+1 SD**. In **Hardcore**, add **+1/+2/+3 SD** based on **Majors at death** (**0–1 / 2 / 3**). *(Count Majors at the moment of death; **ignore decant injuries**.)*  
- **Mid‑campaign swap:** No retroactive changes; existing injuries keep their current tier/state.

---

## See also (titles only)
- Injuries — Minor/Major & Caps  
- Simple Inventory (BL) — Ballast + Pockets  
- Roll State Priority — Hard Override / Soft Override / Offsets  
- Chaos & Harmony — Unified Rules  
- Revival — Lucifer & Quantum Print

---

## 🔄 Changelog
- **v0.4 (2025‑11‑18)** — Added **Soul Debt accrual** lever: **Core +1 per decant**; **Hardcore +1/+2/+3 by Majors at death (0–1/2/3)**. Updated presets & acceptance.  
- **v0.3 (2025-11-17)** — Clarified **ammo scope**, lane/name conditions for **Deeper Wounds**, and **non‑retroactivity** on mid‑campaign swaps; tightened invariants & acceptance checks; editorial polish.  
- **v0.2 (2025‑11‑16)** — Unified properties header; expanded **invariants** and **acceptance checks**; clarified overlay semantics; synced Deeper Wounds & Mercy Swap language; minor copy‑edits.  
- **v0.1 (prior)** — Initial publication of the two‑mode overlay with default levers.
