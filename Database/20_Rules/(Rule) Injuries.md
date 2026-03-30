---
created: 2025-08-31
schema: apex-docs-v1
code: RUL-BAS-INJ-U
title: "Injuries — Minor/Major & Caps"
type: rule
audience: table
status: final
version: 1.8
updated: 2025-11-17
tier: core
tags: [rule, injuries, apex, dnd5e]
player_facing: true
aliases: ["Injuries"]
links:
  - "[[Roll State Priority — Hard Override / Soft Override / Offsets]]"
  - "[[Revival — Lucifer & Quantum Print]]"
  - "[[Chaos & Harmony — Unified Rules]]"
  - "[[Modes — Core vs Hardcore (Switch)]]"
summary: "Two severities by lane (Minor/Major). **Injury dice are Offsets** rolled **after** the d20 (**Minor = L2d4**, **Major = H2d8**; only the largest matching die applies). **3 Minors merge → 1 Major**; **max 3 Majors** total. At **3 Majors** you run **Hellstatic** as a **Hard Override**. Printing adds injuries (Sparkplug: **1d4−1 Minors**; Reserve: **+1 Major**). **Mode levers:** **Mercy Swap** (party reaction) and **Deeper Wounds** (duplicate Major escalation)."
---

# 🩸 Injuries — Minor/Major & Caps
^top

> [!summary]+ 🧭 On this page
> [[#^tldr|TL;DR]] · [[#^what|What an injury is]] · [[#^dice|Dice & timing]] · [[#^assign|Assigning injuries]] · [[#^merge|Merge → Major]] · [[#^engine|Roll‑state fit]] · [[#^sources|Where injuries come from]] · [[#^death|Death & printing]] · [[#^care|Recovery & care]] · [[#^edges|Interactions & edge cases]] · [[#^examples|Examples]] · [[#^dm|DM Guidelines]] · [[#^math|Appendix A — Dice math]] · [[#^accept|Acceptance checks]] · [[#^changes|Changelog]]

^tldr
> [!tldr] **TL;DR**
> - **Two severities by lane:** **Minor** and **Major**; every injury **lives on a skill lane** (e.g., ACR, RGG).
> - **Injury dice (Offsets, post‑d20):** **Minor = L2d4**; **Major = H2d8**. **Only one** injury die can apply—use the **single largest** that matches the lane you rolled.
> - **Merge:** **3 Minors → 1 Major** immediately. **Cap:** **max 3 Majors** across your sheet.
> - **At 3 Majors:** **Hellstatic (HS)** is **Active** (Hard Override): before each declared test, roll **HS d20**; if **≤ effective HS**, your test is at **HARD Disadvantage**. **HS 20 ⇒ constant**; **−3 HS per Long Rest**.
> - **Printing:** **Sparkplug print** adds **1d4−1 Minors (0–3)**; **Reserve print** adds **+1 Major**. **Printing isn’t a rest.**
> - **Mode levers:** **Mercy Swap** *(party reaction)* is **ON** in **Round‑Trip**, **OFF** in **Hardcore**. **Deeper Wounds** *(duplicate Major escalates: H2d8 → H2d10 → H2d12)* is **OFF** in **Round‑Trip**, **ON** in **Hardcore**.

^what
## 1) What an injury is (and when it bites)

- An injury **lives on a specific skill lane**. When you roll **that lane**, also roll its **injury die** and **subtract** the result from your total as an **Offset** (post‑d20; never changes Advantage/Disadvantage).
- **Only one** injury die can apply to a roll. If multiple injuries could apply, use **the single largest** one that matches the rolled lane.

> [!tip] **Roll‑state order (truth)**
> **Gate → Hard Override → Soft Override → d20 → Offsets → Bands.**  
> Injuries are **Offsets**; they **never** alter roll state.

^dice
## 2) Dice & timing

- **Minor:** **L2d4** *(roll 2d4, keep lower)*, subtract.
- **Major:** **H2d8** *(roll 2d8, keep higher)*, subtract.
- Roll the injury die **whenever** you roll the injured lane—no extra trigger.

> [!note] **Edge‑only Optimization (optional; OFF by default)**  
> **Roll an injury die only if it can still change the outcome.** Compute your **post‑fix‑offset margin** (after applying all **fixed** Offsets except the injury die itself):  
> • **Minor** — roll the die **only if** that margin is within **4** of any band edge.  
> • **Major** — roll the die **only if** within **8**.  
> If outside those windows, **skip** the injury die—**the outcome cannot change**.

> [!tip] **Rerolls and variable Offsets**  
> If a feature **rerolls the same test’s d20**, the chosen **HARD/SOFT** state **persists**; **variable Offsets** like injury dice are **rolled again** with the reroll.

> [!mode] **Hardcore option (ON in Hardcore Mode)**  
> **Deeper Wounds (duplicate Major escalation):** `H2d8 → H2d10 → H2d12` (cap). Only duplicates of the **same named Major on the same lane** escalate.

^assign
## 3) Assigning which skill gets hurt

**Default policy — GM offers two → player picks.**  
The GM names **two plausible lanes** by fiction (often the event’s lane and its paired lane, or the two tied to the relevant ability). The **player chooses one**. *Five‑second pick rule:* undecided → flip a **d2**.

**Eligibility guards (always on)**  
- A **Minor** must land on a lane with **no Minor and no Major** (no stacked Minors).  
- A **Major** must land on a lane with **no Major**.  
- **Cap:** max **3 Majors** across the sheet. A generic effect that would add a **4th Major** has **no effect** *(see Chaos exception under §9)*.

**Optional fairness for hazards (No‑Double‑Down).**  
When a **hazard** (not a roll) causes an injury, avoid hitting the **same ability family** twice in a row **if** a legal alternative exists. Ability families (two lanes each): **STR:** PRY/RGG · **DEX:** TNK/ACR · **CON:** RES/SLG · **INT:** SYS/STL · **WIS:** GDS/RDL · **CHA:** IFC/GIL.

**Optional direct‑lane on failed checks.**  
If the injury **comes from failing a skill roll**, you may assign it directly to **that skill’s lane**. Use the default method if fiction points elsewhere.

^merge
## 4) Merging to a Major (Harmony control)

When you gain your **3rd Minor**, immediately **merge**: remove **all** Minors and gain **1 Major**.

**Candidate lanes.** The **three lanes** that held those Minors (skip any ineligible lane).

**Default assignment — Two‑Card Cut → player picks.**  
GM reveals **any two** of the Candidate 3. Player picks one to receive the Major. *Five‑second pick → **d2***.

**Spend‑to‑steer (ST Express Step).**  
Spend **1 Spin‑Time** to step up control by one tier (cap **+1 step/merge**): from a random method to **Two‑Card**, or from **Two‑Card** to **Sovereign among the Candidate 3** (you choose).

**Mercy Swap (party reaction; Mode‑gated).**  
A nearby ally may **take the Major instead** as a **reaction**; then assign it using the same method. *(Round‑Trip ON; Hardcore OFF.)*

**Eligibility recap.** The Major **can’t** land on a lane that already has a Major; **cap 3** still applies.

> [!mode] **Gritty preset (optional)**  
> Use **Bound Roll** (random among the Candidate 3) as your default. **ST Express Step** still allows one step up per merge.

^engine
## 5) Rolling with injuries (engine fit)

- **Order:** **Gate → Hard Override → Soft Override → d20 → Offsets** *(injury & DC shifts)* → **Bands**.  
- **States:** Injuries are numbers. They **never** change Advantage/Disadvantage.

**Hellstatic (HS) — at 3 Majors**  
While you have **3 Major Injuries**, **Hellstatic** is **Active**. For each test you declare: **roll an HS d20**; if the roll is **≤ effective HS**, your test is at **Hard Disadvantage**. At **HS 20**, the Disadvantage is **constant**; skip the check. HS **does not** cancel with Soft Advantage. HS **gains/decays** per its rule (e.g., **+3 on death at 3 Majors; −3 per Long Rest**).

^sources
## 6) Where injuries come from

- **Skill consequences** (e.g., “gain 1 Minor Injury” on **F/CF**).  
- **Attacks & hazards** (assign per §3).  
- **Chaos results** (e.g., **Take the Scar**, **Chaos Burn**) — apply via this card’s assignment rules; observe the **row‑cap exception** below.  
- **Printing:** **Sparkplug** print adds **1d4−1 Minors**; **Reserve** print adds **+1 Major**. **Printing is not a rest.**

^death
## 7) Death, decanting & gear

- On death, **all gear drops** at the site (or nearest safe spill).  
- You decant with **basic clothing only**; re‑equip from field/stores.  
- **Printing time isn’t a rest** for the printed body.

^care
## 8) Recovery & care

- **Field care — short rest (Trueflow):** One **Minor** may be **treated** with a quick check. On success, mark it **Treated** (same lane; it **doesn’t roll** for the **next scene**).  
- **Long rest (Trueflow):** **Clear 1 Minor** or **upgrade 1 Treated Minor → Cleared**. If no Minors remain, you may **downgrade 1 Major → 2 Minor counters** on the **same lane**.  
- **Clinic / med car:** A practitioner may attempt to **clear 1 Major** (materials + a treatment slot; ~**1 hour**). On failure, it persists but becomes **Treated** for the **session**.

**Minor counters (for downgrades only).**  
When you **downgrade 1 Major → 2 Minors** on the same lane, place **two Minor counters** there. These **count** for merge and care, but **only one** Minor die ever applies to a roll. You **can’t** assign additional Minors to that lane while both counters remain.

**Re‑aggravation.**  
If you **critically fail** a check using a **Treated** lane (e.g., natural 1 or fail by 5+), it flips back **Active** after the roll resolves.

> [!venue] **Care venues & Harmony**
> **HU‑5** sites can host **field care** during a short rest (≥1 hour, safe). **HU‑9** sanctuaries are ideal for **long‑rest** recovery and may grant a small kicker on completion (site text).

^edges
## 9) Interactions & edge cases

- **Chaos injection & cures:** The Master Chaos Table can **add/clear** injuries. Apply them using **this card’s assignment rules**.  
- **Row‑cap exception:** If a Chaos result would add a **4th Major** while you are at cap, **shift that result one step toward neutral** instead.  
- **Still Soul (capstone):** You still **suffer injuries** from hazards/attacks and **others’** Chaos rolls.  
- **Environmental Chaos Check (ECC):** Zone‑only consequences (e.g., **±CDR**, **Convergence Front**) still occur even when a **Still Soul** leads the action; the GM rolls Chaos as an **environmental** check.  
- **Multiple injuries at once:** Assign **one at a time** (update eligibility each time), then **merge** if you reach 3 Minors.  
- **Duplicate to an ineligible lane:** Retarget to the **first eligible** lane using §3.  
- **At Major cap (3):** Generic sources do **nothing**; Minors still assign but **don’t convert** while capped (Row‑cap exception above).  
- **Group checks:** Apply states and Offsets **per roller**, then evaluate the group rule.

^examples
## 10) Examples (quick)

- **“My ACR lane has a Major; I leap a gap.”** Resolve states → roll → apply **H2d8** as an Offset because you rolled **ACR**.  
- **“I just gained my 3rd Minor (on IFC, RDL, SYS).”** Remove all Minors → GM reveals **two** of those lanes → you pick one; or spend **1 ST** to take **Sovereign** among the Candidate 3.  
- **“At 3 Majors with HS; I try a Systems hack.”** Resolve HS first; on a proc, roll at **Hard Disadvantage**. After the d20, apply the **SYS** injury die if present.

^dm
## 11) DM Guidelines — Creating & Pacing Injuries

> [!tldr] **Design intent**
> **Minors** are **meaningful friction**; **Majors** are **serious, story‑visible setbacks**. Injuries should telegraph risk, reward prep, and push repositioning—**not** soft‑TPK the party.

### A) **When to inflict an injury**
Use **one** of these hooks (pick the smallest that fits the moment):
- **On checks:**  
  - **CF (Critical Failure)** → **1 Minor** *(telegraph if a fall/impact was plausible)*.  
  - **F (small margin)** → **soft cost** (HP, time, position). Reserve **Minors** for **CF** or **explicit stakes**.  
  - **Staked risk** (framed before the roll) → follow through (Minor/Major per stake).
- **On hazards & attacks:**  
  - **Heavy impact / machinery / falls** → **Minor** on a **glancing hit**, **Major** on a **full force** or **crit + bad fiction**.  
  - **Ongoing environments** (steam, glass, ash) → use **Minors** to tax repeated bad positioning; **merge** handles escalation.
- **On fiction beats:**  
  - **“Take the Scar”** moments on hard bargains, rushing, or ignoring warnings → **1 Minor** on a fitting lane.

### B) **How often (baseline targets)**
Numbers below are **party‑level** for a **3–4 hour session**. Adjust by **Mode** and **Zone pressure** (CDR band).
- **Exploration‑heavy session:** **2–4 Minors** total; **0–1 Majors**.  
- **Mixed stakes (combat + hazards):** **3–6 Minors**; **1–2 Majors**.  
- **High‑risk chapter climax:** **5–8 Minors**; **2–3 Majors** *(cap/merge will throttle further)*.

**Per room/site:** place **0–1 injury hooks** that are easy to see and avoid with care. Stack a second hook only if the site screams danger **and** you’ve telegraphed it.

### C) **Knobs & multipliers**
- **Mode:**  
  - **Round‑Trip (Standard):** use baselines above.  
  - **End of the Line (Hardcore):** **+25–50%** frequency **or** bump one severity step on 1–2 headline beats per session. **Mercy Swap OFF; Deeper Wounds ON.**
- **CDR band (Zone pressure):**  
  - **🟢 Baseline (0–35):** baseline.  
  - **🟠 Strain (36–75):** **+1 Minor/session** and allow **one** extra **merge** opportunity.  
  - **🔴 Crisis (76–99):** another **+1–2 Minors/session**; upgrade **one** marquee beat from **Minor → Major** if fiction supports it.  
  - **⛔ Break (100):** cadence follows the **new map/state**; **don’t** immediately spike beyond your Major cap.
- **Party size:** For **5+ PCs**, increase totals by **+1 Minor** per extra PC across the session.

### D) **Assignment best‑practice**
- **Name two lanes**; let the **player pick** in **5 seconds**.  
- **Keep the fiction honest:** if a roll failed on **ACR**, it’s **ACR** unless a better lane is justified.  
- **Don’t double‑down** the same **ability family** twice in a row for **ambient hazards** unless sharply justified.  
- **Show/telegraph** what **care** is available nearby (field care, clinic, sanctuary).

### E) **Author checklist (fast)**
- [ ] Which **beats** in this scene can **cause injuries**?  
- [ ] What **lane pairs** make sense for each hook?  
- [ ] Where can players **see it coming** (signs, sounds, warnings)?  
- [ ] Where is **care** (short‑rest field care, clinic, sanctuary)?  
- [ ] If in Hardcore, do any **duplicate Majors** reasonably **escalate**?

^math
## Appendix A — Dice at a glance (for DMs)

- **Minor (L2d4):** EV **1.875**; **P(≥3) = 25%**.  
- **Major (H2d8):** EV **5.8125**; **P(7–8) = 43.75%**; **P(≥5) = 75%**.  
- **Escalation (Hardcore):** **H2d10 EV ≈ 7.15**; **H2d12 EV ≈ 8.49** (very punishing; use sparingly).

^accept
## ✅ Acceptance checks

- **State order:** Table resolves **Gate → Hard Override → Soft Override → d20 → Offsets → Bands** (injuries live in Offsets).  
- **Largest die only:** If you have a Minor and a Major on the same lane, you **roll only the Major** on that lane.  
- **Merge & cap:** 3 Minors **merge** to 1 Major; **max 3 Majors** total. A generic source that would add a 4th Major **does nothing** (Chaos exception shifts a row toward neutral).  
- **Hellstatic:** At **3 Majors**, HS is Active: **HS d20 ≤ effective HS** → **Hard Disadvantage** on your declared test; **HS 20 ⇒ constant**. **−3 HS** per Long Rest.  
- **Printing:** Sparkplug print adds **1d4−1 Minors**; Reserve print adds **+1 Major**; **printing isn’t a rest**.  
- **Mode levers:** Round‑Trip: **Mercy Swap ON; Deeper Wounds OFF.** Hardcore: **Mercy Swap OFF; Deeper Wounds ON** (duplicate Major escalates up to **H2d12**).

^changes
## 🔄 Changelog

- **v1.8 (2025‑11‑17)** — Added **On this page** nav, anchors, and editorial polish; clarified Chaos integration in **§6/§9**; no mechanical changes.  
- **v1.7 (2025‑11‑16)** — Unified header; synced **Edge‑only Optimization** wording; added **HS comparator/constant‑at‑20**; clarified **variable OFS reroll**; expanded acceptance checks.
