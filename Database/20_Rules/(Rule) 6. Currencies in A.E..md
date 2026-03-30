---
created: '2025-08-29'
formerly: []
supersedes: ""
export: { player: true, gm: true }
cover: ""
license: ""
attribution: ""
schema: apex-docs-v1
player_facing: true
depends_on: []
reliability: canonical
spoiler_tier: 0
code: RUL-BAS-MNY-5
title: "Money — Leverage, Sparkplugs, Spin Time (Rule + Truth Codex)"
type: rule
audience: table
status: final
version: 2.4
updated: '2025-11-17'
tier: core
tags:
  - rule/currency
  - codex/lore
  - economy
  - player-facing
aliases:
  - "Money — Leverage, Sparkplugs, Spin Time (Player)"
links:
  - "[[Simple Inventory (BL) — Ballast + Pockets]]"
  - "[[Revival — Lucifer & Quantum Print]]"
  - "[[Chaos Drift (CDR) — Focus‑Zone Hazard Meter]]"
imports: []
summary: "🎟️ **LEV** is the unit; **Red (rd)** is **another name for 1 LEV**. Denominations follow a clean **10:1 ladder**: **10 gr = 1 rd = 1 LEV; 10 rd = 1 gd**. 🔌 **PLUG** (Sparkplugs) are items (👖 **1 pBL** in pockets; **1 BL** outside). ⏱️ **ST** are **daily tokens** (5 per LR; expire); no chips by default. 📡 **CDR scans:** **Lv‑3 = 1 ST**, **Lv‑4 = 1 PLUG**. 💀 On death, gear drops; **printing isn’t a rest**."
---

# 💰 Money — Leverage, Sparkplugs, Spin Time
^top

> [!summary]+ 🧭 On this page
> [[#🎟️-a-leverage-lev--writs-of-balance|🎟️ Leverage (LEV)]] · [[#-b-sparkplugs-plug--exotic-fuel--second-chances|🔌 Sparkplugs (PLUG)]] · [[#⏱️-c-spin-time-st--daily-tokens|⏱️ Spin‑Time (ST)]] · [[#📋-sheet-tickers-quick-ref|📋 Sheet tickers]] · [[#✅-acceptance-checks|✅ Checks]] · [[#🔄-change‑log|🔄 Changelog]]

> [!tldr] 💎 **Table TL;DR**
> 🎟️ **Unit & ratios:** **LEV** is the accounting unit. **Red (rd)** is **another name for 1 LEV**. **10 gr = 1 rd = 1 LEV; 10 rd = 1 gd.**  
> 🪨 **Carry weight:** **LEV on‑person = 1 BL** (flat, any mix of gr/rd/gd). **Stashed LEV = 0 BL**.  
> 🔌 **Sparkplugs (PLUG):** **👖 1 pBL** in pockets; **1 BL** outside. **No public LEV↔PLUG market**.  
> ⏱️ **Daily compute:** Each **Long Rest → 5 ST** in the Party Stash. **ST expire next LR** (**no carry‑over; no chips**).  
> 📡 **CDR scans:** **Lv‑3 = 1 ST**, **Lv‑4 = 1 PLUG**.  
> 🗣️ **Influence nudge:** Present a credible ticket to claim **one −2 DC Angle** (once/target/scene; clamp **−4..+4**).  
> 💀 **On death:** All gear drops; **printing isn’t a rest**.

> [!tip] 🔎 Icon key
> 🪨 **BL** = Ballast · 👖 **pBL** = pocket‑Ballast · **ST** = Spin‑Time token · **PLUG** = Sparkplug · **LEV**/**rd** = ticket unit

---

# 🎟️ A) Leverage (LEV) — Writs of Balance
^lev

> [!abstract]+ 📖 **Lore — The Tickets That Made Time Keep Its Word**
> When the **Halt** tore time into pockets, **money died with it**. **Paper** powdered, **coins** bloomed with rust, and every **Surgefront** unstitched metal and flesh alike. Settlements fell back to **barter**. New mints failed—**metal rotted between trades**, **polymer chits were easy to fake**—and markets stalled.  
>  
> Then the **tickets** appeared: cheap **rail‑stock slips** in impossible inks—**gray** for small change, **red** as the workhorse of trade, and whispered **gold** for fortunes no one sane ever sees. People **found them** already in their **wallets and lockboxes**, tucked behind mirrors and under floorboards, as if they had always been there. **Surgefronts couldn’t scar them. Fire wouldn’t char them.** Under a lens, the **glyphwork crawled** and recomposed like thought, **micro‑script** forever re‑resolving to match some unseen ledger.  
>  
> At first, curiosities. Then **caravans** from distant pockets arrived spending the **same slips**, reporting the **same spontaneous appearances**. Trade rekindled around them. They bought grain, passage—**and silence**. The name arrived as naturally as hunger: **Leverage**.  
>  
> With the name came **superstitions of debt**. A fortress‑lord who refused to settle his **Leverage** **vanished** from a locked keep—no breach, no blood. Priests damned the tickets as infernal machinery until a holy man dreamt that **God approved**; by morning some collection plates were **tickets‑only**. Resistance collapsed as markets do: **not with conviction, but with convenience**.  
>  
> The riddle remains: **no mint, no issuer, no seal**—only **route‑lines** and **punch‑stubs** that counters began keeping, as if the stub were a **receipt that remembers**. You can boil the face, rip it, smear it; the **entry is what sticks—somewhere**. Some speak of an unseen **Auditor** balancing a ledger we can’t read; others insist the tickets are **smuggled moments—time that doesn’t rot**. Almost everyone agrees on this much: the **more you hold, the more you need**. One becomes two; two, ten—**a choir you can’t quite shut out**.  
>  
> Whatever they are, they **move markets**. And **markets move the world**.

## A1) Table‑facing rules
- **Buys:** bunk & meal, yard time, minor repairs, escorts, passage, waivers, standard bribes.  
- **Negotiation nudge:** **Present** a credible ticket to claim **one −2 DC Angle** in that exchange (**once per target/scene**; clamp **−4..+4**). Discipline/keys still gate attempts.

### Denominations (color ladder) ^denoms

> [!info] **Naming & unit**
> **LEV** is the unit. **Red (rd)** is **another name for 1 LEV** (street: “leverage”). Prices post in **LEV** or **gr/rd/gd** — **5 LEV** = **5 rd**.

| Color   | Name                     |  Code  |                   Ratio (to LEV) |
| ------- | ------------------------ | :----: | --------------------------------: |
| ⚫️ Gray | Gray Ticket              | **gr** |                  **10 gr = 1 LEV** |
| 🟥 Red  | Red Ticket *(workhorse)* | **rd** |                        **1 LEV** |
| 🟨 Gold | Gold Ticket              | **gd** |                 **1 gd = 10 LEV** |

### A2) Etiquette, Frauds & Superstitions
- **Stubs:** **Counters keep stubs**; the face travels; settlements accept the face **because the stub exists**.  
- **Quarantine, not refusal:** A priory or safehouse can **quarantine** a suspicious ticket for investigation but **can’t refuse** a clean one outright.  
- **Counterfeits:** You can forge the **look**, not the **balance**. Fakes sometimes “work” until they **don’t**—and when they fail, they **trace** whoever holds the stub.  
- **Gold manners:** **Golds buy silence** and attract attention—don’t announce counts in public.

---

# 🔌 B) Sparkplugs (PLUG) — *Exotic Fuel & Second Chances*
^plug

> [!example]+ PLUG — Sparkplug icon  
> ![[(Icon) PLUG - Sparkplug.png|360]]

> [!abstract]+ ⚙️ **Lore — What the engineers tried to bottle**
> **Before the Halt**, a handful of labs chased a quiet, shared question: **how do you contain energy that pushes** instead of pulls—*negative energy*, a repulsive pressure that standard models resist. Batteries were too tame; capacitors too honest. They needed a container that could hold **an absence with teeth**. The codename was **SPARKPLUG**.  
>  
> The device that emerged was precise and cold: a hand‑held cylinder of **semi‑transparent alloy**, caged in **electromagnets** and threaded with **experimental anti‑grav rings**. Through the shielding, **pale arcs** crawled like lightning trapped in glass. Engineers reported **wobbling mass readouts**—at times oddly light, at others unexpectedly heavy. It was named for what it did to engines that shouldn’t run: **Sparkplug**.  
>  
> Then **the Halt tore time**. Plans burned. Servers died. Teams vanished between one heartbeat and the next. Yet the Sparkplug—**the seed already viable**—endured.  
>  
> The world that followed revealed a grim symmetry: **Hellfire burns souls**. Sparkplugs can be **charged by what lingers after death**, pressed into the canister’s repulsive field until the pocket stabilizes. The result is portable, obedient energy—**distilled from what used to be someone**.  
>  
> To most, a Sparkplug is **worthless**—a museum of grief no one wants to touch. To a few, it is **beyond price**. One canister will **wake a Hellfire boiler** and shove a steam train through purple haze; it can **flood dead relays**, **steady warped clocks**, and paint a camp in **wrong, clean light**. Yard talk claims it can drive **weapons that erase blocks** without flame—**rumor, not rule**. For those who bargain with themselves, a charged plug can **shoulder a soul off the downward slope**, pushing it **back toward flesh** after fatality. The **debt isn’t waived**, and the **memory of payment** rarely survives intact.  
>  
> As the dust settled, a shadowed patron—**Lucifer**, by rumor—took an interest through a unit calling itself **aSYNC** (often styled **α‑SYNC**). Schematics traded hands in sealed rooms. Witnesses reported **nosebleeds mid‑briefing** and left with headaches—and **holes where facts should be**. When security tallied the leaks, the auditors **remembered nothing at all**.  
>  
> What remains is the device. **Old hands swear** it sometimes **hums when a soul is near**. It grows **lighter as it fills**, then oddly **heavy**, as if **meaning had weight**. People call them *moon‑jars* and *ghost batteries*, but the codename stuck. **It sounds like hope. It works like hunger.**  
>  
> A crew with a Sparkplug can **buy motion** when the land says “no,” cut the night with **a jar of borrowed day**, and—**so long as they can pay the cost**—**pay back the debt of life**. Whether that is **mercy** or **arithmetic** is a question for later. The train is leaving.

## B1) Table‑facing rules
- **Uses:** **Revival — Sparkplug print** (**8 h**/body, **parallel**, Train **normal ops**); powers **Hellfire** and authored overclocks/upgrades.  
- **Fallback without plugs:** **Reserve print** **8 h + 2d4**; Train **Low‑Energy**; **sequential 1×1**; **+1 Major**; **printing isn’t a rest**.  
- **Revival cost (per PC):** **plugs = max(0, Death# − 1)**.  
- **Weight:** **TNY** (**👖 1 pBL** in pockets); **1 BL** outside.  
- **Market stance:** **Not legal tender**. No public **LEV↔PLUG** market; treat storage/sale as **story flags**.

---

# ⏱️ C) Spin‑Time (ST) — *Daily Tokens*
^st

> [!example]+ ST — Spin‑Time icon  
> ![[(Icon) ST - Spin Time.png|360]]

> [!abstract]+ 🧠 **Lore — The Train That Thinks In Windows**
> The **Quantum Core Carriage** is a chorus of cold‑iron minds. It runs on **windows**, not wishes: **today’s five hands of hours**, issued like **ration cards for thinking**. Markets learned to buy **windows**, not **capacity**—a yardmaster doesn’t want “minutes,” she wants **her job** on the **board today**.

## C1) Daily model (simple & final)
- **Refresh:** **Each Long Rest → 5 tokens** into the **Party Stash**. Tokens **= time**; **expire** at the **next Long Rest** (**no carry‑over; no chips**).  
- **Spend tokens on:** **Lv‑3 CDR scan (1 ST)**; decryptions; mapping merges; client compute; upgrades that list **ST**. **Lv‑4 CDR scans = 1 PLUG**.  
- **Selling compute (no chips):** To sell compute, **schedule the buyer’s job today** and pay with **today’s tokens**. After you rest, **unused tokens vanish**. *(Market size/prices are story‑gated by Zone.)*  
- **Throughput (pacing dial):** The carriage can **process up to 10 ST per chapter**; extra work **queues** to next chapter. *(GM may tune **8–12**.)*

### C2) CDR scan costs (for transclusion)
^scan_costs

**Lv‑3 (Exact)** → **1 ST** · **Lv‑4 (Insight)** → **1 PLUG**

### C3) Examples
- **Daily use:** Rest → **5 tokens**. Spend **1** (Lv‑3 scan) + **3** (decrypt) = **4**; **1** expires at next rest.  
- **Upgrade (12 ST):** **5 + 5 + 2** across three days. If the chapter already used **10 ST**, remaining work **queues**.  
- **Sell compute:** Yardmaster needs **2 ST**; you schedule it **today** and take **LEV**. If you rest first, those **2** **vanish**.

---

## 📋 Sheet tickers (quick ref)
**LEV/rd** (tickets) · **PLUG** (sparkplugs) · **ST** (tokens) · **gr/rd/gd** (gray/red/gold) · **BL/pBL** (Ballast / pocket‑Ballast)

---

## ✅ Acceptance checks
- **Ratios:** **10 gr = 1 rd = 1 LEV**; **10 rd = 1 gd**. A price of **5 LEV** equals **5 rd**; **23 gr** equals **2 rd + 3 gr**.  
- **Weight:** Carrying **any mix** of tickets on‑person uses **1 BL** total; **stashed** tickets use **0 BL**.  
- **Scan costs:** **Lv‑3 = 1 ST**, **Lv‑4 = 1 PLUG**.  
- **Inventory fit:** A **PLUG** is **TNY** (**1 pBL** in pockets; **1 BL** outside). **ST** are **intangible** (no BL).  
- **Death/print:** All gear drops on death; **printing isn’t a rest**.

---

> [!changes]+ 🔄 Change‑log
> **v2.4 (2025‑11‑17):** **Ratios corrected & simplified** — **rd ≡ LEV** (synonyms); **10 gr = 1 LEV; 10 LEV = 1 gd**. Refined TL;DR, acceptance checks, and copy; preserved ST/PLUG rules and cross‑doc anchors.  
> **v2.3 (2025‑08‑31):** Emoji TL;DR polish; standardized anchors; reiterated carry weights & scan costs; daily tokens model retained.
