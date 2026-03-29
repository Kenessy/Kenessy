---
created: '2025-08-27'
formerly: []
supersedes: ""
export:
  player: true
  gm: true
cover: ""
license: ""
attribution: ""
schema: apex-docs-v1
player_facing: true
depends_on: []
reliability: canonical
spoiler_tier: 0
code: RUL-BAS-INV-6
title: "Simple Inventory (BL) — Ballast + Pockets"
type: rule
audience: player
status: final
version: 1.8
updated: '2025-11-17'
tier: core
tags:
  - rule/inventory
  - rule/encumbrance
  - player-facing
aliases:
  - "Simple Inventory (BL) — Ballast + Pockets"
  - "Simple Inventory (BL) - Ballast + Pockets"
links:
  - "[[Skills & Postures#^rigging|Rigging (RGG) — Capacity & Stow]]"
  - "[[Revival — Lucifer & Quantum Print]]"
  - "[[Money — Leverage, Sparkplugs, Spin Time (Player)]]"
  - "[[Chaos Drift (CDR) — Focus‑Zone Hazard Meter]]"
imports: []
options:
  ammo_tracking: false
  hard_cap_immobile: false
summary: "🪨 BL replaces pounds; 👖 pBL for pockets. 📦 Capacity = 10 BL + Rigging. 👝 Pockets = 2×5 pBL (TNY only). 🐢 Encumbrance: +1–2 BL → −10 ft; 3+ BL → ½ speed, no Dash. ✋ Retrieve BUL+ = Action. 🎟️ LEV on‑person = 1 BL; 🔌 PLUG = TNY/pBL; ⏱️ ST = daily tokens (intangible; no chips). 💀 Death drops gear; 🛌 printing isn’t a rest."
---

# 🪨 Simple Inventory (BL) — Ballast + Pockets
^top

> [!abstract]+ 🎨 Artistic depiction of an average adventurer’s inventory
> ![[(Art) Adventurer's inventory showcase.png]]

> [!tldr] 💎 **Player TL;DR**
> - 📦 **Capacity:** Base **10 BL** + **Rigging** (**R1–R4 = +2/+4/+6/+8**).
> - 🐢 **Overages:** **+1–2 BL → Encumbered (−10 ft)**; **3+ BL → Heavily Encumbered (½ speed; no Dash)**.
> - 👖 **Pockets:** **2×5 pBL**; **TNY only**. **Outside pockets, a TNY = 1 BL (treat as MED)**.
> - ✋ **Access:** **Drop = free** · **Stow = Interaction** · **Retrieve BUL+ from any container/strap = Action** (rummage included; no extra Interaction).
> - 🔫 **Ammo:** **OFF** by default; if **ON**, **≤3 pBL/pocket** (see table).
> - 🎟️ **Money carry:** **LEV on‑person = 1 BL** (flat); **stashed LEV = 0 BL**.
> - 🔌 **PLUG:** **TNY (1 pBL)** in pockets; **1 BL** outside.
> - ⏱️ **ST (Spin‑Time):** **daily tokens**, **intangible**, **expire next LR**, **no chips**.
> - 💀 **Death/Print:** **All gear drops**; **ST are not items**; **printing isn’t a rest**.

> [!tip] 🧭 **Icon Key — Ballast**
> **BL** = Ballast (weight) · **pBL** = pocket‑Ballast (pocket clutter)

> [!mode] **Mode lever (Ammo Tracking)**
> **Round‑Trip (Core):** **Ammo OFF** (abstract). **Hardcore:** **Ammo ON** (count ammo). This switch lives on **Modes — Core vs Hardcore**; the rest of this card is invariant.

---

## A) 📦 Capacity & Overages

| Component | Value |
|---|---:|
| Base capacity | **10 BL** |
| Rigging bonus — **R1** | **+2 BL** |
| Rigging bonus — **R2** | **+4 BL** |
| Rigging bonus — **R3** | **+6 BL** |
| Rigging bonus — **R4** | **+8 BL** |

**Total Capacity by RGG Rank**

| RGG Rank | Total BL |
|---:|---:|
| **R0** | **10** |
| **R1** | **12** |
| **R2** | **14** |
| **R3** | **16** |
| **R4** | **18** |

**Soft Overage Penalties**

| Over by | Effect |
|---:|---|
| **+1–2 BL** | **Encumbered** (−10 ft speed) |
| **3+ BL** | **Heavily Encumbered** (Speed halved; no Dash) |

> [!tip] 🔒 **Optional: Hard Cap (OFF)**
> If you want a stronger simulation dial: at **+6 BL or more over your cap**, you **can’t move** until you **drop** enough load (dropping is free).

> [!abstract]+ 🪨 Ballast icon
> ![[(Icon) Ballast.png]]

---

## B) 🧱 Sizes & Defaults

| Tag | Name | Where it fits | BL (outside pockets) | Pocket use |
|---|---|---|---:|---|
| **TNY** | **Tiny** (vials, keys, talismans, data chips, fobs, plugs, spin chips†) | **Pockets (as TNY) • pack/strap (as MED 1 BL)** | **1** | **1 pBL** each; **max 5** per pocket |
| **MED** | **Medium / Normal** (toolkit, rope, bedroll, lantern, pistol, book) | Pack, sling, scabbard, **belt/clip/sheath** | **1** | **Not pocketable** |
| **BUL** | **Bulky** (shield, crowbar, small drum, long gun, greatsword) | Pack/strap | **2** | **Not pocketable** |
| **HVY** | **Heavy** (genset head, heavy rifle) | Salvage / RGG stow | **3** | **Not pocketable** |
| **MSV** | **Massive** (switch frog, altar slab) | Salvage / RGG stow | **5** | **Not pocketable** |
| **TIT** | **Titanic** (wheelset, engine component) | Salvage / RGG stow | **8** | **Not pocketable** |

† **Spin Chips (SC):** Only **exist** when a module explicitly **mints** SC from today’s compute. Otherwise, **ignore SC entirely** (see Money — daily **ST** model).

> [!tip] 👖 **Pocket test**
> If it fits a field‑jacket pocket without tools or straps, it’s **TNY**. If it doesn’t, treat as **MED (1 BL)**. **Belt/clip/sheath is not a pocket**.

### B2) 🧰 Typical Items (mapped)

**B2‑a. Wearables & Protection**

| Item | Tag | BL | Pocketable |
|---|---|---:|---|
| Clothing, cloak | MED | **1** | No |
| Armor — Light (leather, padded, soft suit) | — | **1** | — |
| Armor — Medium (chain shirt, tactical vest) | — | **2** | — |
| Armor — Heavy (plate, powered frame, riot suit) | — | **3** | — |
| Shield | BUL | **2** | No |
| Helmet (non‑powered) | MED | **1** | No |
| Gas mask / respirator | MED | **1** | No |

**B2‑b. Weapons & Offense** *(examples; tune per setting)*

| Item | Tag | BL | Pocketable |
|---|---|---:|---|
| Dagger / knife | MED | **1** | No |
| Shortsword / baton | MED | **1** | No |
| Longsword / machete | MED | **1** | No |
| Greatsword / maul | BUL | **2** | No |
| Pistol / hand‑xbow | MED | **1** | No |
| SMG / sawed‑off | BUL | **2** | No |
| Rifle / shotgun / longbow | BUL | **2** | No |
| Heavy rifle / anti‑materiel | HVY | **3** | No |
| Grenade / charge (single) | TNY | **1 (outside)** | **1 pBL** |

**B2‑c. Tools & Kits**

| Item | Tag | BL | Pocketable |
|---|---|---:|---|
| Toolkit (general) | MED | **1** | No |
| Lockpick / micro‑tool set | TNY | **1 (outside)** | **1 pBL** |
| Climbing kit (pitons, line)* | BUL | **2** | No |
| Rope (50 ft) | MED | **1** | No |
| Lantern / torch set | MED | **1** | No |
| Medkit / trauma kit | MED | **1** | No |
| Bedroll | MED | **1** | No |
| Mess kit / cook set | MED | **1** | No |
| Small instrument (harmonica/whistle) | TNY | **1 (outside)** | **1 pBL** |
| Book / manual | MED | **1** | No |
| Short scroll tube | TNY | **1 (outside)** | **1 pBL** |

**B2‑d. Consumables & Tech**

| Item | Tag | BL | Pocketable |
|---|---|---:|---|
| Potion / vial / injector | TNY | **1 (outside)** | **1 pBL** |
| Battery pack (hand tool) | MED | **1** | No |
| Data chip / key | TNY | **1 (outside)** | **1 pBL** |
| Sparkplug (PLUG) | TNY | **1 (outside)** | **1 pBL** |
| Spin Chip (SC) *(module‑minted only)* | TNY | **1 (outside)** | **1 pBL** |
| Rations, 1 day | MED | **1** | No |
| Waterskin / canteen | MED | **1** | No |

> [!note] 🧩 **Edge cases**
> If uncertain, default to **MED 1 BL** and **not pocketable**. Anything roughly longer than a forearm or requiring two hands to carry safely.

---

## C) ✋ Access & Actions (5e‑aligned)

- **Object Interaction (once/turn):** draw/stow a weapon, open/close, pick up, pull a **TNY** from a pocket, etc.
- **More interactions this turn →** spend your **Action**.
- **Retrieve BUL+** from any container/strap = **Action**. *(Includes rummaging; you don’t also spend your Interaction.)*
- **Drop is free.** **Stow** consumes your **Interaction**.

> [!abstract]+ 🧳 Unpacking a bag is slow
> ![[(Art) Tedious unpacking from the inventory.png]]

> [!example]+ 🗂️ Action economy diagram (placeholder)
> ![[(Diagram) Item dropping and interacting action costs.png]]

---

## D) 👖 Pockets (pBL)

- You have **2 pockets** (jacket/trouser) with **5 pBL each** (**10 pBL total**).
- Only **TNY** items use **pBL**.
- Outside pockets, a **TNY** item costs **1 BL** (treat as **MED** for capacity).
- Ammo in pockets (if **Ammo = ON**): **≤3 pBL per pocket** (e.g., 30 loose rounds or 3 pistol mags).
- No load‑bearing add‑ons in this ruleset. Extra garment pockets don’t increase pBL.

> [!abstract]+ 👝 Pockets are essential
> ![[(Art)  Pockets are really useful.png]]

---

## E) 💰 Currencies & BL Behavior (LEV • PLUG • ST/SC)

**10 gr = 1 rd = 1 LEV; 10 rd = 1 gd.**
- **Sparkplugs (PLUG)** — soul‑fuel canisters; **TNY (1 pBL)** in pockets, **1 BL** outside pockets. Story trades only; no public **LEV↔PLUG** market.
- **Spin‑Time (ST)** — **daily tokens**; **intangible**; **expire at the next Long Rest**; **no chips by default**. Used for Lv‑3 scans & authored compute jobs.
- **Spin Chips (SC)** — **only when a module explicitly mints them** from today’s ST. If minted, treat each SC as **TNY (1 pBL)**; otherwise **ignore SC**.

> [!rule] 🔁 **Handling recap**
> **On‑person money = 1 BL** (flat). **PLUG**/**SC** follow **TNY/pBL** rules and don’t fold into the **1 BL** money slot. **ST are not items** (no BL).

> [!example]+ 💼 Currency handling diagram (placeholder)
> ![[(Diagram) The types of currency we carry with us and where do we store them.png]]

---

## F) 🔫 Ammo (optional; OFF by default)

> [!setting] 🎯 **Ammo Tracking**
> Default: **OFF** (cinematic). If **ON**: use the table; pocket ammo still obeys **≤3 pBL/pocket**.

| Item | Tag | Pocketable | Cost (pBL / BL) | Notes |
|---|---|---:|---:|---|
| Handful of rounds (10 small‑arms) | TNY | Yes | **1 pBL** | Loose, pocketed. |
| Loaded pistol mag (≤15) | TNY | Yes | **1 pBL** |  |
| Loaded rifle mag (≤30) | MED | No | **1 BL** | Not pocketable by default. |
| Ammo box (50 small‑arms) | MED | No | **1 BL** | Bulk transport; open to pocket handfuls. |
| Shotgun shells (10) | TNY | Yes | **1 pBL** |  |
| Arrows/bolts (quiver 20) | MED | No | **1 BL** | Quiver; not pocketable. |

---

## G) 🪢 Salvage Integration (RGG)

- **Stow checks** from **[[Skills & Postures#^rigging|Rigging (RGG) — Capacity & Stow]]** gate **BUL/HVY/MSV/TIT**.  
- Transferring salvage requires the recipient to pass their own stow check.

---

## H) 💀 Death & Printing

- On death, **all gear (including LEV/PLUG and any module‑minted SC)** drops at the site (or nearest safe spill). **ST are not items and don’t drop.**  
- **Printing starts naked** with **basic clothing only**. **Printing time isn’t a rest**. See **[[Revival — Lucifer & Quantum Print]]**.

> [!example] 🎒 **Quick Packs** (ready to copy)
> - **Scout (R0):** Dagger, pistol, rope, bedroll, lantern, medkit (**6 BL**); pockets: 3 vials + **2 data chips** (**5 pBL**).
> - **Frontliner (R1):** Longsword, shield (**2 BL BUL**), armor (2), pistol (1), toolkit (1), bedroll (1) (**8 BL**); pockets: **2 plugs** (**2 pBL**). → **12 BL cap OK**.
> - **Tech (R2):** Pistol, repair kit, data book, battery, lantern, bedroll (**6 BL**); pockets: **2 plugs**, **2 vials**, **1 data chip** (**5 pBL**).

---

## ✅ Acceptance checks

- **Money weight:** A character with **LEV on‑person** and **no other items** shows **1 BL** used; **stashed LEV** uses **0 BL**.
- **Plug handling:** A **Sparkplug** occupies **1 pBL** in a pocket; in a pack it costs **1 BL**.
- **ST tokens:** After a **Long Rest**, your party gains **5 ST** (in stash). Unused tokens **expire** at the next Long Rest; **no chips** by default.
- **Access cost:** Retrieving a **BUL** item from your pack is an **Action** (rummage included).
- **Overages:** At **+3 BL** over capacity, your speed is **halved** and you **can’t Dash** until you drop or stow.
- **Ammo lever:** In **Hardcore Mode**, the table tracks ammo; in **Round‑Trip**, ammo is abstracted.

---

## Changelog

- **v1.8 (2025‑11‑17)** — Properties scrubbed (clean YAML), stable Skills anchor, and currency ratios aligned to Money (**10 gr = 1 rd = 1 LEV; 10 rd = 1 gd**).
- **v1.6 (2025‑11‑16)** — Unified header/properties; normalized currency handling and cross‑refs; added **Mode** callout for ammo; expanded **Acceptance checks**; terminology synced with **Roll State Priority** (no mechanical changes).
- **v1.5 (2025‑08‑31)** — Prior publication.
