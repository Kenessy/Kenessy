schema: apex-docs-v1
code: RUL-BAS-RSP-0
title: "Roll State Priority — Hard Override / Soft Override / Offsets"
type: rule
audience: table
player_facing: true
status: final
version: 1.11
updated: 2025-11-17
tier: core
tags: [rule/roll-states, rule/advantage, rule/hellstatic, apex, dnd5e]
aliases:
  - "Roll State Priority"
  - "Roll States — HARD / SOFT / OFS"
summary: "Resolve every contested test in one invariant pipeline: Gate → Hard Override → Soft Override → d20 → Offsets → Bands. Offsets (incl. Injury dice) are numbers only; they never change Advantage/Disadvantage. Variable Offsets re‑roll each time you re‑roll the same test’s d20."
---

^top
# Roll State Priority — Hard Override / Soft Override / Offsets

> [!summary]+ 🧭 On this page
> [[#^tldr|💎 TL;DR (beltline)]] · [[#^gate|0) Gate]] · [[#^hard|1) Hard Override]] · [[#^soft|2) Soft Override]] · [[#^roll|3) Roll the d20]] · [[#^ofs|4) Offsets (OFS)]] · [[#^bands|5) Bands]] · [[#^work|🧪 Worked examples]] · [[#^accept|✅ Acceptance checks]] · [[#^quick|🧭 Quick rulings]] · [[#^changes|🔄 Changelog]]

^tldr
> [!tldr] **Resolve in this exact order (the beltline)**
> **⛔ Gate** → **🔒 Hard Override (HARD)** → **⚖️ Soft Override (SOFT)** → **🎲 d20** → **🔢 Offsets (OFS)** → **📊 Bands**.  
> • **HARD beats SOFT. HARD vs HARD = Normal**, then check **SOFT**.  
> • **SOFT keeps one** state per side. **Adv + Dis = Normal** (per side).  
> • **Offsets are numbers only** (to the **Roll** or to the **DC**). They **never** change Advantage/Disadvantage.  
> • **Variable Offsets** (e.g., **Injury dice**) **re‑roll** each time you **re‑roll that same test’s d20**.

---

^gate
## 0) Gate the attempt 🛂
- **🔒 Keyed R#** — You **must** have the listed rank to **attempt**. **Help cannot make you eligible**.  
- **◇ Open R#** — Anyone can try. **At/over rung → SOFT Advantage**. **Under rung → SOFT Disadvantage**.

> [!tip] **Why gate first?**  
> Gating prevents illegal attempts from generating roll states at all. If the attempt isn’t eligible, it doesn’t enter the pipeline.

---

^hard
## 1) Hard Override (HARD) — hard states 🔒
A **Hard** state **sets** Advantage/Disadvantage **regardless of any Soft sources**. Multiple **HARD** on the **same side** never stack.

- **Collision rule:** **HARD vs HARD → Normal**. After that, evaluate **SOFT**.  
- **Rarity:** **HARD Advantage** is rare; it must be **explicitly** named in a feature/procedure.

> [!example] **Hellstatic (HARD Disadvantage)**  
> While **Hellstatic** is **Active** (you have **3 Major Injuries**), before each **declared** test roll **HS d20**; if the roll is **≤ effective HS**, that test is at **HARD Disadvantage**. At **HS 20**, the Disadvantage is **constant** (skip the HS roll). The **HARD** state does **not** cancel Soft Advantage; it ignores it. *(See HS on the Revival/Injuries cards for gain/decay.)*

---

^soft
## 2) Soft Override (SOFT) — soft states ⚖️
Standard sources (Help, Open over/under rung, conditions, situational rulings).

- **Keep exactly one** SOFT state on a side: **one Advantage** **or** **one Disadvantage**.  
- If both are present on the same side, they **cancel → Normal**.  
- *(With Advantage roll **2d20** and use the higher; with Disadvantage roll **2d20** and use the lower.)*

---

^roll
## 3) Roll the d20 🎲
- The chosen **HARD/SOFT** state **persists** for any **re‑roll that replaces this test’s d20** (same declared test).  
- A **new attempt = new assessment**: on a **new** check/attack/save, reassess **Gate → HARD → SOFT**.  
- **Variable Offsets** (e.g., Injury dice) **re‑roll** whenever you **re‑roll** the **same** test’s d20.

---

^ofs
## 4) Offsets (OFS) — numbers only 🔢
Apply **after** the d20. Offsets never change the roll state.

**Targeting.** Tag each Offset to **(Roll)** or **(DC)** — e.g., **OFS +2 (R)**, **OFS +3 (DC)**.  
**Summation.** Offsets **sum**; Offsets never cancel states or each other.  
**Chaos equivalence.** A Chaos **Modifier** may be applied as **OFS (R)** **or** equivalently as **OFS (DC)** on the GM side — **same math**.

> [!rule] **Injury dice live here**  
> **Minor = L2d4** (roll **2d4**, take the **lower**), subtract.  
> **Major = H2d8** (roll **2d8**, take the **higher**), subtract.  
> **Only the single largest matching die** can apply to a roll (by lane).

> [!note] **Edge‑only Optimization (optional; OFF by default)**  
> **Roll an injury die only if it could change the band.** Compute your **post‑fix‑offset margin** (after all fixed Offsets except the injury die):  
> • **Minor:** roll only if within **4** of **any** band edge.  
> • **Major:** roll only if within **8** of **any** band edge.  
> If outside those windows, **skip** the injury die — the outcome **cannot** change.

---

^bands
## 5) Bands 📊
| Band | Condition *(after Offsets)* |
|---|---|
| **CF** | total ≤ **DC − 5** |
| **F**  | **DC − 4 … DC − 1** |
| **S**  | **DC … DC + 4** |
| **CS** | total ≥ **DC + 5** |

> [!tip] **Adaptive Bands (optional)**  
> Margin **m = round(25% of DC)**, clamped **4–8**. Replace ±5 with ±**m** if your table wants DC‑relative bands.

---

^work
## 🧪 Worked examples (numeric sanity)

> [!example] **E1 — HARD beats SOFT, then Offsets**  
> You attempt a **Systems** check vs **DC 16**. You have **Help** (**SOFT Adv**). **Hellstatic** procs (**HARD Dis**).  
> **State:** HARD Dis overrides Soft Adv → **Disadvantage**.  
> **Roll:** You roll **2d20**, take the lower → **12**.  
> **Offsets:** Tool bonus **+2 (R)**; environmental penalty **+1 (DC)**. New DC **17**. Total = **12 + 2 = 14** vs **17** → **F**.

> [!example] **E2 — Edge‑only skip (Minor)**  
> **DC 15**; after fixed Offsets (no injury die yet) your total is **8** (margin **−7**). A **Minor** die (**L2d4**, at most −4) cannot move you above **DC−5**. **Skip** the die (still **CF**).

> [!example] **E3 — Re‑rolls & variable Offsets**  
> A feature lets you **re‑roll the same test’s d20**. Your **HARD/SOFT** state **persists**. **Re‑roll** any **variable Offsets** (e.g., your lane’s **H2d8** Major injury). Fixed Offsets stay fixed.

> [!example] **E4 — Chaos as DC shift**  
> A Chaos result gives **Modifier +2** on your check. You can take **OFS +2 (R)** **or** the GM can apply **OFS −2 (DC)**. If you rolled **13**, tool **+1 (R)**, and GM applies **−2 (DC)** to **DC 15** → compare **14** vs **13** (same math either way).

---

^accept
## ✅ Acceptance checks
- **Pipeline invariance:** All tests resolve **Gate → HARD → SOFT → d20 → OFS → Bands**.  
- **State isolation:** **OFS never change** Advantage/Disadvantage; swapping **±DC** vs **±Roll** yields identical totals on the same test.  
- **Variable OFS:** Injury dice **re‑roll** on **re‑rolls of the same test**; they **re‑roll again** on new tests.  
- **Gate lock:** **Help cannot** make a **Keyed** attempt eligible.  
- **Collision:** **HARD vs HARD = Normal**; then apply **SOFT** (keep one; cancel to **Normal** if both).

---

^quick
## 🧭 Quick rulings
- **HARD Dis** beats any **SOFT Adv**.  
- **HARD Adv** vs **HARD Dis** → **Normal**; then evaluate **SOFT**.  
- **SOFT** on both sides **cancel** to **Normal**.  
- Apply **all** Offsets after the d20; write them as **OFS +X (R|DC)**.  
- **Offsets add**; they **never negate** states or other Offsets.  
- Group checks: apply states and Offsets **per roller**, then evaluate the group rule.

---

^changes
## 🔄 Changelog
- **v1.11 (2025-11-17)** — **Triad code corrected** to **RUL-BAS-RSP-0** under **House 37,36** (shape `DDD-CCC-EEE-C`). No mechanical changes.  
- **v1.10 (2025-11-17)** — Added **On this page** nav; clarified **Chaos DC‑shift equivalence** in examples; expanded **numeric sanity**; tightened D&D 5e phrasing; copy edits.  
- **v1.9 (2025‑11‑16)** — Unified properties header; clarified **variable OFS re‑roll on rerolls**; added explicit **Chaos DC‑shift** note; **Acceptance checks** expanded.  
- **v1.8 (2025‑11‑16)** — Prior publication with HARD/SOFT/OFS pipeline and examples.
