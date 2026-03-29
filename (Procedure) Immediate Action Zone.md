---
created: 2025-10-06
schema: apex-docs-v1
code: RUL-BAS-IAZ-D
title: "Immediate Action Zone (IAZ) — Spec v1.9"
type: procedure
audience: table
status: final
version: 1.9
updated: 2025-11-17
tier: core
player_facing: true
tags: [procedure, iaz, rules, scene, dnd5e, apex]
aliases:
  - "Immediate Action Zone (IAZ)"
  - "IAZ"
imports: []
summary: "IAZ is a moving, cluster‑based play‑space around the party. You pick a footprint style (indoors/outdoors/moving), treat it as a vertical prism, and it simply follows the characters. Spells/features win; IAZ only gates scene modifiers (e.g., Apocalyptic Shift). Effects that key to the IAZ track their own persistence; the IAZ itself never ends or transfers."
---

^top
# 🧭 Immediate Action Zone (IAZ)

> [!tldr] 💎 **TL;DR — What the IAZ is**
> **The IAZ is simply the area around the party (or each separated party cluster).** We use it to anchor scene‑wide effects—**weather, surge‑storms, danger areas**, and similar. The rules below just nail down **what counts as “in” or “out.”**  
> **Not a room you end.** At any moment, the IAZ is **the current play‑space around each party cluster**, shaped as a **vertical prism**. It **moves with the characters**.  
> • **Indoors:** contiguous building (all floors/roof/basements) **+30 ft** buffer.  
> • **Outdoors:** **120 ft** default radius (**dials 60/120/240**), clip at real barriers (streets, walls, rivers).  
> • **Moving:** it moves with **contiguously‑coupled** structures (bolted/hitched/fused).  
> **Priority:** **spells/features win**; IAZ only gates **scene modifiers** like **Apocalyptic Shift (ASH)**.  
> **Persistence:** The **IAZ itself never ends or transfers**. **Effects** that reference the IAZ have their **own** stop tests (see **Effect windows**).

> [!summary] 🧭 On this page
> [[#^concept|Concept]] · [[#^flow|Table flow]] · [[#^footprint|Footprint]] · [[#^clusters|Clusters]] · [[#^membership|Membership & Effect windows]] · [[#^interactions|Interactions & AoE]] · [[#^moving|Moving structures]] · [[#^toggles|Toggles]] · [[#^accept|Acceptance checks]] · [[#^pitfalls|Pitfalls & rulings]] · [[#^examples|Examples]] · [[#^changes|Changelog]]

---

^concept
## Concept — the moving battle‑space (not a room)
At any time, **the IAZ encircles the party**. If the party splits, **each distinct party cluster** is encircled by **its own IAZ**. You do **not** “end” or “transfer” the IAZ; you **keep pace with the fiction** and **re‑evaluate** who is inside.

---

^flow
## Table flow — how to run it
1) **Pick a footprint style** once (indoors / outdoors / moving) and a dial (**60/120/240** outside). Treat each IAZ as a **vertical prism**.  
2) **Run play.** Spells/features follow their rules; **scene modifiers** obey IAZ membership.  
3) **Re‑evaluate when fiction changes** (e.g., the group splits across barriers or vehicles uncouple). You don’t end anything—you **update** who’s in which cluster.

> [!tip] 🧮 Keep it silent
> You do not need to call out every re‑centering. Use the chosen style/dial and let the IAZ follow the action.

---

^footprint
## Footprint — what counts as “inside”?
- **Indoors (contiguous building):** All enclosed floors/roof/basements **plus 30 ft** outside (porches, steps, curb, loading bay).  
  **Skybridges:** **Enclosed** bridges **merge** buildings; **open‑air** bridges **don’t**.  
  *Operational test:* enclosed = four walls/roof (doors/windows ok).

- **Outdoors/compounds:** **120‑ft** circle or rounded rectangle centered on the action; **clip** at meaningful barriers (streets, fences, walls, rivers, cliffs).  
  Walled compounds may use interior up to **240 ft**. If interior exceeds 240 ft, **split** into multiple clusters (below).

- **Vertical extent:** Treat as a **vertical prism** through the space. If your **plan‑view overlaps** the prism, you’re **inside** (hovering over a roof edge still counts).

- **Membership test (creatures):** A creature is **inside** while **any part of its space overlaps** the IAZ. Mounted creatures use the **mount’s space**.

---

^clusters
## Clusters — when you have more than one IAZ
Create a **separate IAZ per party cluster** when either condition is met:
- **Separation by barrier:** the party is split by **closed, meaningful barriers** (e.g., separate buildings, sealed doors/bulkheads, different train segments after uncoupling).  
- **Separation by distance:** sub‑groups are **> 240 ft** apart **or** operating in **distinct map regions** with different obstacles.

Each cluster has its **own** IAZ using the same style/dial. If clusters later rejoin, you’re back to **one** IAZ.

> [!tip] 🧲 Quick cluster call
> If you can draw **one 120‑ft circle** (or your chosen dial) that reasonably covers all active PCs **without crossing sealed barriers**, treat it as **one** IAZ. Otherwise, **split**.

---

^membership
## Membership & effect windows — the IAZ never ends
**The IAZ is continuous.** What “ends” are **effects keyed to the IAZ** (for example, **ASH**). Track those **per cluster**:

- **Start:** When an effect says it applies in the IAZ, **apply it to that cluster’s current IAZ** and immediately **capture a clearing snapshot envelope** of that IAZ (a **stationary** copy of its footprint at the moment the effect latched).
- **Persist while occupied (by snapshot):** The effect **persists** while **any PC** remains **inside that snapshot envelope**. The **IAZ itself continues to move** with the characters, and the effect’s rules text continues to apply to **the current IAZ**.
- **Clear (6s outside the snapshot):** If **no PCs remain inside the snapshot envelope for one full round (6 seconds)**, **clear the effect** for that cluster.  
  *This clears the effect, not the IAZ.*
- **Replace:** If the same effect would be applied again (e.g., a new ASH result), **replace** the prior instance for that cluster and **capture a new snapshot envelope** at that moment.

> [!note] ⚖️ Downed & extra‑dimensional (defaults shown under **Toggles**)
> By default, **downed PCs still count** as inside (they anchor effects). **Sealed/opaque** extra‑dimensional spaces count as **inside** by default.

---

^interactions
## Interactions & Areas of Effect (compatibility clarifiers)
- **Priority:** **Spell/feature text wins** if it sets **visibility/light/movement/concentration**. The IAZ gates **scene modifiers** (like **ASH**) only; it does **not** clip or move spells.  
- **Forced movement/teleport:** Update in/out **immediately** on border crossings.  
- **AoE geometry:**  
  - **No IAZ clipping** — areas may originate outside and pass through; measure per the effect.  
  - **Anchor logic** — areas **attached to a creature/object** move with that anchor; **point‑centered** areas are **world‑fixed**.  
  - **True 3D** — resolve in **3D**; **total cover** blocks from the origin; openings allow wraps.  
  - **Single application per round** — a creature can’t take the **same area’s** damage/effect **twice** in one round due to motion; use the **first** application.

---

^moving
## Moving structures — trains, ships, convoys
- The IAZ **moves with** any **contiguously‑coupled** structure (cars bolted/hitched/fused).  
- On **uncoupling**, evaluate **clusters**: each PC group on a different segment gets **its own** IAZ. When segments recombine and clusters rejoin, you’re back to **one** IAZ.

---

^toggles
## Toggles (defaults **OFF**)
- **Downed neutral** — incapacitated/unconscious PCs **don’t anchor** effects (count neutral). *(Default: they **do** anchor.)*  
- **Extra‑dim = outside** — treat **sealed/opaque** extra‑dimensional spaces as **outside** after 1 round. *(Default: **inside**.)*  
- **Auto‑split by 2/3** — if **≥ 2/3** of PCs operate elsewhere for a round, **auto‑create** a new cluster IAZ. *(Default: GM call.)*  
- **Cap 10 min** — optional hard cap of **10 minutes** for **a single instance of an IAZ‑keyed effect** (IAZ itself is continuous).

---

^accept
## ✅ Acceptance checks (adversarial quick‑tests)
- **IAZ continuity:** The party leaves the market square. The IAZ **moves with them** into the alley; **no re‑declaration** required.  
- **Effect window clears, not IAZ:** An ASH effect is active on the depot cluster. All depot PCs step **outside the snapshot envelope** (captured when ASH latched) for **6 seconds** → the **ASH effect ends** for that cluster; the IAZ remains available as the moving space.  
- **Split train:** Cars uncouple with PCs on both segments → you now have **two cluster IAZs**. A point‑fixed **wall of fire** on the rear car stays with that car’s space.  
- **Spell precedence:** *Darkness* overrides **Starklight** in the same area while it lasts. The IAZ **does not** move/clip the spell.  
- **Hover dodge denial:** A PC hovering **over** a roofline still **counts inside** (vertical prism).

---

^pitfalls
## 🚧 Pitfalls & rulings
- **“End/transfer the IAZ?”** **No.** You **update** the moving space (clusters/footprint), you don’t end it. Effects clear on their own tests.  
- **“My moving *silence* moves the IAZ.”** **No.** The **IAZ never follows a spell**; spells follow their own anchoring rules.  
- **“Toe‑tap to break effects?”** Needs **one full round (6 seconds)** with **no PCs** inside the **snapshot envelope** to clear an IAZ‑keyed effect.
- **“Lair/regional effects are IAZ‑keyed?”** Treat **lair/regional** as **global** unless a rule marks them scene‑bound.

---

^examples
## 🧪 Examples
- **Office Block Raid.** One cluster inside the tower (all floors + 30 ft buffer). ASH fires; later, everyone exits the **snapshot envelope** for **6 seconds** → ASH **clears**; the IAZ continues as the alley cluster when they move.  
- **Market Ambush.** Outdoors **120 ft** clipped at the ring road. *Silence* is **point‑fixed**; a torch aura is **attached** and follows its carrier; the IAZ simply follows the group down the lane.  
- **Train Heist.** Coupled cars = one moving cluster IAZ. On decouple, fore and aft groups each get **their own** IAZ; when recoupled and the party rejoins, you’re back to **one**.

---

^changes
## 🔄 Changelog
- **v1.10 (2025‑11‑18):** Introduced a **clearing snapshot envelope** (stationary, clearing‑only) to reconcile clearing tests with a **continuous, moving IAZ**. No change to IAZ continuity or spell precedence; effects still apply to the **current IAZ** while active.  
- **v1.9 (2025‑11‑17):** Added a **plain‑language front line** to the TL;DR; replaced “variable/function” phrasing with **D&D‑style** language; allowed **internal anchor links** in **On this page**; reinforced that the **IAZ never ends or transfers**—only **effects** clear; tightened headings/callouts; no outward file links.  
- **v1.8 (2025‑11‑17):** Reframed the IAZ as a **moving, cluster‑based space**. **Removed “End & Transfer”** semantics; introduced **Effect windows** (clear/replace rules). Clarified **clusters**, **moving structures**, and **AoE** compatibility.  
- **v1.7 (2025‑11‑16):** Prior publication.
