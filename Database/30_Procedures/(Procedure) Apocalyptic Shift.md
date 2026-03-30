---
created: 2025-11-17
schema: apex-docs-v1
code: RUL-SYS-ASH-Z
title: "Apocalyptic Shift (ASH) — Scene Snap v2.1"
type: procedure
audience: table
status: final
version: 2.1
updated: 2025-11-17
tier: core
player_facing: true
tags: [procedure, ash, chaos, scene, dnd5e, apex]
aliases:
  - "ASH"
  - "Apocalyptic Shift"
  - "Ambient Shift"
  - "Scene Snap"
imports: []
summary: "Trigger a quick, IAZ-wide condition snap (d4) anchored to each party cluster. The IAZ itself never ends; only the ASH **effect window** clears per cluster. Uses **Awareness** (not Perception). Spells/features win. Coexists with Convergence Front. If ASH came from Chaos Row 10, apply that row’s Modifier as an **Offset** to the triggering check."
---
^top
# 🌪️ Apocalyptic Shift (ASH) — Scene Snap

> [!tldr] 💎 **TL;DR — What ASH is**
> **ASH is a fast, IAZ‑wide condition snap** that the table calls when prompted (often by **Chaos Row 10**). It **affects the Immediate Action Zone around each party cluster** as a **vertical prism** and **moves with the players**. The **IAZ never ends**; **ASH clears per cluster** using a **clearing snapshot envelope** (see **Effect windows**).  
> **You’ll roll a d4** to set: **1 Grayout** • **2 Gridlock** • **3 Starklight** • **4 Dissonance Field**. **Spells/features win**. **One ASH per cluster**; a new ASH **replaces** the old one for that cluster. **Convergence Front coexists**.

> [!summary] 🧭 On this page *(internal anchors only)*
> [[#^concept|Concept]] · [[#^flow|Table flow]] · [[#^results|d4 Results]] · [[#^skins|Skins (indoor/outdoor)]] · [[#^windows|Effect windows & clearing]] · [[#^interact|Interactions & precedence]] · [[#^concurrency|Concurrency & coexistence]] · [[#^rollfit|Roll‑state fit]] · [[#^accept|Acceptance checks]]

---

^concept
## Concept — a scene snap anchored to the IAZ
**ASH** is a **scene condition** that applies to the **current IAZ** around the party **cluster** that triggered it. Treat the IAZ as a **vertical prism**: if your plan‑view **overlaps**, you are **inside**. ASH **doesn’t create or end** an IAZ; it **rides on it**.

---

^flow
## Table flow — how to run ASH
1) **Confirm the IAZ** style/dial is known (indoors/outdoors/moving; outside dial **60/120/240**).  
2) **Roll d4** *(or choose for fiction)* and **announce the result**.  
3) **Apply it to the entire IAZ** for the **involved cluster** **and capture the clearing snapshot envelope** (a **stationary** copy of that IAZ footprint for clearing tests only).  
4) **Re‑evaluate on fiction changes** (cluster splits/merges, vehicles uncouple/re‑couple); **do not** “end” the IAZ—**the effect window** handles clearing (below).

> [!tip] 🧭 Keep it light
> You don’t need to re‑declare the IAZ each time; it **follows the action**. Only **effects** clear.

---

^results
## 🎲 d4 Results — rules text (IAZ‑wide, instant)

|  d4   | Effect               | Rules text                                                                                                                                                                                         |
| :---: | -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **1** | **Grayout**          | The area becomes **lightly obscured**. Creatures relying on sight have **disadvantage on Wisdom (Awareness) checks**, and **passive Awareness −5** while in the IAZ.                               |
| **2** | **Gridlock**         | The ground is **difficult terrain**. Each foot of movement **costs 1 extra foot** while in the IAZ. Difficult terrain from multiple sources **doesn’t stack**. **Flying movement is unaffected.**  |
| **3** | **Starklight**       | The area is **bright light**. Creatures have **+5 to passive Awareness** and **disadvantage on Dexterity (Stealth) checks to hide** while in the IAZ.                                              |
| **4** | **Dissonance Field** | Creatures have **disadvantage on Constitution saving throws to maintain concentration** while in the IAZ.                                                                                          |

> [!note] 🔎 Scope
> These are **scene modifiers**. They **never** change Advantage/Disadvantage on the **declared test** except as written above, and they **never** move/clamp spell areas.

---

^skins
## 🎨 Skins — quick prompts (pick 1 that fits the scene)

| d4 | Indoor prompts | Outdoor prompts |
|:--:|---|---|
| **1 — Grayout** | smoke wisps • condensation mist • dust motes • steam bloom • lamp glare/flicker | thin mist • fine drizzle • pollen drift • dust veil • low ground fog |
| **2 — Gridlock** | oil/solvent spill • loose rubble • scattered papers/marbles • glass grit • pooling water | sudden downpour • fresh mud/scree • drifted debris • cracked tiles |
| **3 — Starklight** | arc floods thrum • mirror‑bar glare • witch‑fire chandeliers • phosphor strips surge | searchlights sweep • cloudbreak beam • auroral ribbon • glass dunes gleam |
| **4 — Dissonance** | subsonic thrum • edge‑of‑vision strobe • ozone tang • beam resonance | distant thunder • wind in cables • heat‑haze shimmer • geomagnetic tingle |

---

^windows
## ⏱️ Effect windows & clearing — **per cluster**
**ASH latches to the cluster’s current IAZ** by creating a **clearing snapshot envelope** — a **stationary** copy of the IAZ footprint **captured at the moment ASH applies**. Use it **only** to test clearing. While active, ASH’s rules text **applies to the cluster’s current (moving) IAZ**.

- **Persist (by snapshot):** ASH **persists** while **any PC** remains **inside the clearing snapshot envelope**.  
- **Clear (6s outside snapshot):** If **no PCs remain inside the snapshot envelope for one full round (6 seconds)**, **clear ASH** for that cluster.  
- **Replace:** If the same cluster **triggers ASH again**, **replace** the prior ASH for **that cluster** immediately and **capture a new snapshot envelope**, refreshing the window.

> [!warning] 🚫 Don’t end/transfer the IAZ
> You never “end” or “transfer” the IAZ to clear ASH. The **IAZ is continuous** and follows play; the **snapshot envelope** is **clearing‑only**.

---

^interact
## ⚖️ Interactions & precedence (compatibility)
- **Spells/features win.** If a spell or feature sets **visibility/light/movement/concentration**, it **overrides** ASH while it lasts (e.g., *darkness* overrides **Starklight**).  
- **Areas of effect:** ASH **does not clip or move** AoEs. AoEs **attached** to a creature/object move with that anchor; **point‑centered** AoEs stay world‑fixed. Resolve in **true 3D**; **total cover** blocks from the origin.  
- **Membership:** A creature is affected while **any part of its space overlaps** the IAZ’s plan‑view (vertical prism); hovering over a roof edge still counts **inside**.

---

^concurrency
## 🔁 Concurrency & coexistence
- **One ASH per cluster.** A cluster can have **exactly one** ASH at a time; a new ASH **replaces** the old one for **that cluster**.  
- **Coexists with Convergence Front.** Regional **Front clocks**/CDR changes may run **simultaneously**; ASH is a **scene modifier**, not a global slot.  
- **Multiple clusters.** If the party splits into distinct clusters, each cluster can hold **its own** ASH with its **own** window.

---

^rollfit
## 🧩 Roll‑state fit (beltline)
> **Truth:** **Gate → Hard Override → Soft Override → d20 → Offsets → Bands**.  
> **Chaos Modifiers** (including Row 10’s **−1**) are **Offsets** to a check’s Roll **or** equal DC shifts—**never** state changes. ASH’s **scene text** applies in parallel.

---

^accept
## ✅ Acceptance checks (adversarial quick‑tests)
- **Cluster clear via snapshot.** ASH is active on the **depot cluster**. All depot PCs step **outside the clearing snapshot envelope** for **6 seconds** → **ASH clears for depot only**; the **alley cluster** keeps its own ASH (if any).  
- **Spell precedence.** Under **Starklight**, a *darkness* spell is cast over part of the IAZ → that region follows **darkness** while it lasts; when it ends, **Starklight** applies again.  
- **AoE geometry.** A **point‑fixed wall of fire** on a rear train car stays with that car’s space after uncoupling; ASH follows the cluster’s IAZ and does **not** move the wall.  
- **Replace in place.** You roll **ASH** again for the same cluster; the new result **replaces** the old one and the window **refreshes**.  
- **Vertical prism.** A flyer skimming **over** a roofline **is inside**; **Gridlock** doesn’t affect flying movement, but **Starklight** still imposes **Stealth (hide) disadvantage** there.

---
