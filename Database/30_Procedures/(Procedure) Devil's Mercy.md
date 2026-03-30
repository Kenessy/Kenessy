---
schema: apex-docs-v1
code: PROC-META-DM-0
title: "Devil’s Mercy — Procedure"
type: procedure
audience: table
status: final
version: 1.4
updated: 2025-11-17
tier: core
player_facing: true
tags: [procedure/chaos, talent/harmony, meta, reroll, player-facing]
aliases:
  - "Devil’s Mercy"
  - "Devils Mercy"
imports: []
summary: "🃏 Reroll the Chaos table **row** after seeing it and before effects; keep the new row. Limits: **1×/chapter per holder** + **1×/long rest per party** (Row 22 long rest doesn’t refresh the party cap). Sits between **Row revealed** and **Apply Offsets** in the beltline."
---

^top
# 🃏 Devil’s Mercy — Procedure

> [!summary]+ 🧭 On this page *(internal anchors only)*
> [[#^tldr|TL;DR]] · [[#^unlock|Unlock & Ownership]] · [[#^beltline|Timing & Beltline Fit]] · [[#^does|Does / Never does]] · [[#^edge|Edge Cases & Compatibility]] · [[#^group|Group & Hidden Rows]] · [[#^accept|Acceptance checks]] · [[#^examples|Examples]] · [[#^modes|Mode variants]] · [[#^changes|Changelog]]

^tldr
> [!tldr] 💎 **TL;DR (player‑facing)**
> **What:** **Reroll the Chaos selection dice (the row)**.  
> **When:** **After seeing the row** and **before** any **Modifier** or **Effect** from that row is applied.  
> **Result:** **Keep the new row**. *(No choosing between old/new.)*  
> **Limits:** **1×/chapter per holder** **and** **1×/long rest per party**. *(A long rest from **Row 22** **doesn’t** refresh the party cap.)*  
> **Beltline fit:** **Gate → HARD → SOFT → d20 → Offsets → Bands** — Mercy sits **between “Row revealed” and “Apply Offsets.”**

---

^unlock
## 1) 🔓 Unlock & Ownership
- **Unlock:** Any PC who picks the **Minor Tier “Devil’s Mercy”** gains this ability **for themselves**.  
- **Per‑holder charge:** **1 per chapter** (refreshes at chapter start; not bankable).  
- **Party cap:** **1 per long rest** across **all holders**.  
- **Anti‑loop:** A **long rest from Row 22** **does not refresh** the party cap. The next **normal** long rest does.  
- **Who can call it:** A **holder** may target **their own** just‑revealed row **or** an **ally’s** (if they become aware in time). The **roller** has final say to accept/decline; declined → **no charge spent**.

> [!note] Why two limits?
> The **per‑holder** charge preserves personal agency for those who invest in the tier; the **party cap** prevents burst‑chaining between long rests.

---

^beltline
## 2) 🧩 Timing & Beltline Fit
> **Truth:** **Gate → Hard Override → Soft Override → d20 → Offsets → Bands.**  
> **Mercy window:** **After the Chaos row is revealed** and **before** its **Modifier** is applied as an **Offset** (or DC shift) **and before any effects start**.

**Procedure**
1. A Chaos roll selects a **row** for the current check/trigger. **Reveal** the row.  
2. A **holder** declares **Devil’s Mercy** (targeting that row).  
3. **Reroll** the **selection dice**; **replace** the row; proceed with the beltline.  
4. Resolve **HARD/SOFT**, roll the **d20**, apply **Offsets** (including any Chaos **Modifier**, if present), then read **Bands**.

---

^does
## 3) ✅ Does / 🚫 Never does
**Does**
- **Reroll the row** (the selection dice), **replacing** the previous row entirely.  
- Works on **effect‑only rows** (e.g., **ASH d4**, **±CDR**) **if called before any consequence begins**.

**Never does**
- **Never** rerolls the declared check’s **d20**.  
- **Never** changes **HARD/SOFT** states; those resolve normally later.  
- **Never** partially applies a row; if any effect/clock/meter move has begun, the window is **closed**.

---

^edge
## 4) 🧪 Edge Cases & Compatibility
- **Row 10 (ASH d4).** Mercy **rerolls the row**, not the **ASH d4**. If the new row is still **#10**, then roll the **ASH d4** once.  
- **Row 22 (Instant long rest).** Using Mercy to reach **#22** grants that long rest, but it **doesn’t refresh** the **party cap** you just spent.  
- **CDR rows (Zone‑only).** Valid **only before** you move the **Focus Zone** meter or place a **Front** clock. If already moved/placed → **too late**.  
- **Hellstatic (HS).** HS is a **Hard Override**. Mercy **doesn’t** prevent HS checks or cancel HARD states; it only swaps the **row**.  
- **Still Soul (HL10).** Still Souls **don’t roll Chaos**. They **may** spend **their own** per‑chapter charge to replace **another character’s** row (awareness required), but **not** their own.  
- **Lucky / Portent / similar.** Those features alter **d20** tests; they **don’t** touch the Chaos row. Both can appear in the same scene without conflict.

---

^group
## 5) 👥 Group & Hidden Rows
- **Group checks:** If one Chaos row governs a **group** resolution, **one** holder may spend **their** charge to replace **that single row** (applies to the whole group).  
- **Hidden rows:** Mercy requires **awareness**. If the GM keeps a row **secret by design**, **Mercy isn’t available** for that roll until revealed (if ever).  
- **Awareness timing:** Table discipline matters — call **immediately** after the row is shown; once any effect begins, it’s **past the window**.

---

^accept
## 6) ✅ Acceptance checks (adversarial quick‑tests)
- **Party cap vs holders:** Two PCs hold Mercy. They still get **only one** Mercy **between long rests** (party cap), but **each** keeps **1×/chapter** to spend when the party cap is available.  
- **Row 22 anti‑loop:** You use Mercy to land **#22** (Instant long rest). The rest **does not** refresh the **party cap**; a later **normal** long rest **will**.  
- **Group row:** A group Stealth resolves from **one row**; **one** holder’s Mercy **replaces** that row for **all participants**.  
- **Hidden row gate:** The GM keeps a row secret; no one can call Mercy until it’s revealed. If it remains secret, Mercy **can’t** be used.  
- **ASH nuance:** Row **10** appears; a holder calls Mercy **before** any **ASH d4** is rolled. New row **11** lands → **no ASH** occurs.  
- **HARD/SOFT isolation:** You have **Help** (Soft Advantage) and HS **procs** (HARD Disadvantage). Calling Mercy **doesn’t** change those states; you still roll at **Disadvantage**, then apply Offsets.

---

^examples
## 7) 🧪 Examples
> [!example] ✅ **Swap a nasty regional hit**
> You reveal **Row 4 (+12 CDR, Zone‑only)**. Before moving the meter, **Talan** (a holder) calls Mercy on your row. Reroll → **Row 13 (+1, Glass Favor)**. Apply **Row 13** and continue.

> [!example] ❌ **Too late — clock already placed**
> You reveal **Row 5 (Convergence Front, 4‑seg)** and immediately place the clock. Now **Lydia** offers Mercy. **Too late**; consequences have begun.

> [!example] ✅ **Effect‑only row**
> You reveal **Row 10 (ASH d4)**. **Rook** calls Mercy **immediately**. Reroll → **Row 11 (Spark of Inspiration)**. Apply **Row 11**; **no ASH** is rolled.

---

^modes
## 8) 🎛️ Mode variants (table options)
> **Recommended defaults:** **1×/chapter per holder** **and** **1×/long rest per party** (this card).  
> **Hardcore variant (optional):** **1×/chapter per party** *(tighter)* **or** **OFF**.

> [!warning] No stacking/banking
> You **can’t** bank, split, or chain multiple Mercies on the **same** row.

---

^changes
## 🔄 Changelog
- **v1.4 (2025‑11‑17)** — Added **anchors & nav**, **Acceptance checks**, and clarified **awareness**, **group rows**, **Row 22 anti‑loop**, and **Row 10 (ASH)** handling. Editorial polish; unified properties header.  
- **v1.3 (2025‑11‑16)** — Limits set to **1×/chapter per holder + 1×/long rest per party**; Row 22 anti‑loop; copy polish.  
- **v1.2–v1.0** — Prior publications.
