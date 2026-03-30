---
created: 2025-08-29
formerly: []
supersedes: ""
export: { player: true, gm: true }
cover: ""
license: ""
attribution: ""
schema: apex-docs-v1
tier: core
links:
  - "[[Money — Leverage, Sparkplugs, Spin Time (Player)#^scan_costs|Scan costs (Money)]]"
depends_on: []
imports: []
reliability: canonical
spoiler_tier: 0
aliases:
  - "Chaos Drift (CDR) — Focus‑Zone Hazard Meter"
  - "Chaos Drift (CDR) - Focus-Zone Hazard Meter"
code: RUL-BAS-CDR-S
title: "Chaos Drift (CDR) — Focus‑Zone Hazard Meter"
type: rule
status: final
version: 1.3
updated: "2025-11-17"
audience: table
player_facing: true
tags:
  - rules
  - pacing
  - hazard
  - chapter
  - meter
summary: "🧭 **CDR** is a 0–100 meter attached to a **Zone**. It turns **ON** on first entry and stays **ON** until that Zone’s hazard is **fixed** (then it’s **locked OFF at 0**). Rests **inside** the Zone and authored triggers raise it. **Irreversible band floors:** once a threshold **triggers**, the meter **can’t drop below that band’s floor** until the Zone is **fixed**. At **100** the Zone **Breaks (Soft Loss)**; play continues under a changed map/state. Read via **Drone Scans** (Lv‑1..4; **Lv‑3 = 1 ST**, **Lv‑4 = 1 PLUG**)."
---

# Chaos Drift (CDR) — Focus‑Zone Hazard Meter
^top

> [!summary]+ 🧭 On this page (internal anchors only)
> [[#^tldr|TL;DR]] · [[#^movement|How CDR moves]] · [[#^floors|Activation & Band Floors]] · [[#^bands|Bands & author intent]] · [[#^scans|Drone Scans]] · [[#^gmpace|GM Pace Control]] · [[#^author|Authoring prompts]] · [[#^example|Example — Dam Complex]] · [[#^accept|Acceptance checks]] · [[#^changes|Changelog]]

## 💎 TL;DR — What this rule does
^tldr

**Name & scope.** **Chaos Drift — CDR**, a **per‑Zone 0–100 meter**. Most chapters designate **one Focus Zone** (the primary objective whose meter gates the **Exit/Climax Zone**).  

**ON/OFF.** **OFF** until the party **first enters** that Zone. Then **ON** and it **stays ON** until the Zone’s hazard is **fixed** (on **fix**, set to **0** and **lock OFF**; no further changes). Leaving the Zone **doesn’t** turn it off.  

**How it rises.**
- 💤 **Short Rest (inside this Zone)** → **+5 CDR**
- 🛏️ **Long Rest (inside this Zone)** → **+15 CDR**
- 🧨 **Authored Triggers** → each **names its target meter** (default **Focus Zone** if unspecified). If the **target Zone hasn’t been entered**, **bank** the value as that meter’s **start** (banks **stack**).
-  **Instant rests from Chaos (#19/#22)** do **not** move CDR (no time passes).


**Irreversible band floors.** When your CDR **crosses** a Zone’s **band threshold** and that stage’s fiction **triggers**, you **set a floor** at that band’s **lower bound**. From then on, **decreases can’t push below that floor** until you **fix** the Zone. Crossing into a **higher** band **raises the floor** to that band’s lower bound. (**Break** at **100** effectively floors at **100** until a special fix is completed, if any.)

**Consequences.**
- **0–35 — 🟢 Baseline**: zone behaves as mapped.
- **36–75 — 🟠 Strain**: first major environmental shift.
- **76–99 — 🔴 Crisis**: second major shift.
- **100 — ⛔ Break (Soft Loss)**: hazard completes; **permanent map/state change** until repaired by a story resolution (if possible).

**Reading it.** **Drone Scans (Lv‑1..4)** trade time/resources for accuracy (see **Scans**; **Lv‑3 = 1 ST**, **Lv‑4 = 1 PLUG**).

---

## ⏱️ How Chaos Drift moves
^movement

- **Rests while inside:** **SR +5**, **LR +15** to **this Zone’s** meter only.  
-  **Instant rests (Chaos rows 19 & 22):** Do **not** move CDR. They are **not** “rests inside this Zone” for CDR purposes (no time passes).
- **Authored Triggers:** Each trigger **targets a specific meter** (e.g., “Dam‑Main CDR +8”). If the **target is OFF** (Zone not yet entered), **bank** and apply as the **start value on first entry** (banks **stack**).  
- **Clamping:** Always clamp to **0–100**.  
- **Stage crossings:** Apply each stage’s effects the **moment** you cross its threshold.  
- **Decreases:** Any decrease (Chaos rows, mercy nudges, authored relief) **can’t** lower the meter **below the current floor** (see **Floors**). Before any floor is established, decreases may reach **0**.

> [!example] 🔁 **Banking before entry**
> Two authored triggers (+5 and +8) are earned **before** the party enters **Dam‑Main**. On first entry, **CDR starts at 13**. If that crosses a band in that Zone’s authored thresholds, apply **Floors** immediately.

---

## 🧱 Activation & Band Floors — **irreversible until fixed**
^floors

> **Why floors?** A cracked dam doesn’t **un‑crack** because you stopped pushing; fictionally irreversible events **persist** until repaired.

**Definitions**
- **Thresholds:** By default **0/36/76/100** (🟢/🟠/🔴/⛔). A Zone may **author different breakpoints** (write them on the Zone card).
- **Floor:** The **lowest value** the meter may reach **after** a band has **triggered**.

**Floor rules (algorithm)**
1) **Initial state:** Floor = **0** while **no** band has **triggered** (you may dip back to **0**).  
2) **Trigger & set:** When you first **cross** a band’s threshold and its **stage effect triggers**, set **Floor = that band’s lower bound** (e.g., **36** by default).  
3) **Raise only:** If you later **enter a higher band**, **raise** Floor to that band’s lower bound (**76** by default).  
4) **Clamp decreases:** When any effect would **decrease** CDR, apply it then **max(value, Floor)**.  
5) **Break (100):** On reaching **100**, the Zone **Breaks**. Treat as **Floor = 100** until a **special fix** explicitly lowers it.  
6) **Fix:** On **fixing** the Zone’s hazard, set **CDR = 0**, **lock OFF**, and **remove** Floors for that Zone (it can’t change again unless a new story re‑arms it).

> [!warning] 🚫 No back‑pedal exploits
> Short‑term exits, toe‑taps, or Chaos decreases **don’t** revert a triggered stage. Only a **fix** (the objective) resets the meter.

---

## 🌡️ Bands & author intent (write specifics per Zone)
^bands

| Band | Default Range | Nameplate | What to author (examples) |
|:--:|:--:|:--|---|
| 🟢 | **0–35** | **Baseline** | Normal routes; default DCs; systems nominal. |
| 🟠 | **36–75** | **Strain** | **One major shift** that **re‑routes play**: partial flood; rolling brownouts; debris checks; +2 DC to affected tasks; some shortcuts close, new hazards open alt paths. |
| 🔴 | **76–99** | **Crisis** | **Second major shift**; compounding penalties: broad flood/blackouts; forced checks on pushes; time‑gated doors; terrain taxes; one‑way sections or gear‑gated detours. |
| ⛔ | **100** | **Break (Soft Loss)** | Hazard completes; **permanent map/state**; mark blocked routes, new boat/rope lines, moved POIs; salvage hooks remain. |

> [!tip] ✍️ **Custom thresholds**
> Zones may set **custom breakpoints** (e.g., **25/60/90/100**). Floors follow **those** authored numbers.

---

## 🛰️ Reading the meter — **Drone Scans (Observation Suite)**
^scans

Any PC at the **Quantum Core Carriage** *(or by radio uplink)* can call a scan. Higher levels **replace** lower ones.

|     **Lvl**     | 🎯 What you learn                        |   ⏳ Time   |  💱 Cost   | 📜 Flavor |
| :-------------: | ---------------------------------------- | :--------: | :--------: | --- |
|  **1 — Band**   | Which **band** you’re in (🟢/🟠/🔴/⛔)    | **5 min**  |     —      | Single scout drone **quick sweep**; rough & ready, long recharge. |
| **2 — Rounded** | **Nearest 10** (e.g., 57 → **60**)       | **15 min** |     —      | Two drones + mini‑array **split coverage**; “better than nothing.” |
|  **3 — Exact**  | **Exact CDR** (e.g., **57/100**)         | **60 min** |  **1 ST**  | A‑grade drone + **3D LiDAR** & aSYNC stabilization; bulk data **crunched** on the Train. |
| **4 — Insight** | **Exact + forensic snapshot + forecast** | **15 min** | **1 PLUG** | Experimental probes: hardened sensors; report includes **what changed last interval** and **likely next shift** (“one more LR safe; failure likely after two”). |

> **Currencies:** **ST (Spin Time)** & **PLUG (Sparkplug)** live on the Money rules. **Lv‑3 consumes 1 ST; Lv‑4 consumes 1 PLUG**. See: **[[Money — Leverage, Sparkplugs, Spin Time (Player)#^scan_costs|Scan costs (Money)]]**.

---

## 🎚️ GM Pace Control — “Conductor’s Hand”
^gmpace

Use to **prevent stall** or **save rookies**; always **show the cause** in fiction.

- **Soft nudge:** adjust a single rest by **±5 (SR)** or **±10 (LR)**.  
- **Firm nudge (rare):** **±10 (SR)** or **±20–30 (LR)** when alarms snowball, storms spike, or braces give way.  
- **Mercy nudge:** **−5 to −10** after brave pushes or strong prep.  
- **Never** jump straight to **100**; never do invisible rug‑pulls.  
- **Floors apply to decreases:** Even with mercy, **don’t** reduce below the current **Floor**.

---

## 🔧 Authoring prompts (for homebrew adopters)
^author

> In **our** campaign, every Zone with a meter **lists** its triggers and stage effects. Use this section only when building your own content.

| Trigger idea | Suggested bump | Notes |
|---|:--:|---|
| Spin up heavy plant (burners/pumps/crushers) | **+2…+8** | Scale by duration & loudness. |
| Alarm grid left active | **+5** | One‑time per source unless re‑armed. |
| Heat load (reactors/foundries) | **+3…+6** | Higher in enclosed sectors. |
| Structural tampering (cut braces/blast) | **+5…+10** | Telegraph cost early. |
| Major mishap (spill/jam/breach) | **+10…+15** | Use at drama beats. |

---

## 🧪 Example — **Dam Complex** (with floors)
^example

- **Authored thresholds:** **25/60/90/100**.  
- **Start:** Before entry, two triggers (+5, +8) are banked → **start at 13**. No floor yet.  
- **Cross to Strain:** A **Long Rest inside** (+15) → **CDR 28** (crosses **25**) → **Strain** triggers; **Floor becomes 25**. **Low tunnels flood**; certain checks **+2 DC**.  
- **Decreases clamped:** Chaos row **20 (−5)** lowers **28 → 25**, **not** 23 (clamped to Floor **25**).  
- **Rise again:** Later mishap **+8** → **CDR 33** (still 🟠; Floor **25**).  
- **Cross to Crisis:** An alarm cascade **+30** → **CDR 63 → 93** (crosses **60** & **90**; apply **Crisis**; **Floor becomes 90**).  
- **Fix:** Completing the repair **fixes the Zone** → **CDR = 0**, **locked OFF**. Floors clear.  
- **Break path (alternate):** If instead CDR reached **100**, the dam **breaches**; treat as **Floor = 100** until an exceptional story resolution later resets the Zone.

---

## ✅ Quick acceptance checks
^accept

- **Rest bumps:** From **CDR 30**, a **Long Rest inside** → **45**; **Floor** becomes **36** (default thresholds). A later Chaos decrease **can’t** drop below **36**.  
- **Pre‑floor decreases:** At **CDR 12** (no stage triggered), Chaos row **20 (−5)** → **CDR 7** (allowed; no floor yet).  
- **Banking:** A **+8** trigger designated for **Spillway** before entry → **Spillway** begins at **8** on first entry.  
- **Crossing multiple thresholds in one jump:** From **34** with a **+15** push → **49**: apply **Strain** once, set **Floor 36**. From **70** with **+30** → **100**: **Break** applies; you don’t also get separate Strain/Crisis intermediate beats; **Floor = 100**.  
- **Fix resets & locks:** After **fix**, scans always read **0**; rests/triggers **no longer move** that Zone’s meter unless a new chapter **re‑arms** it by design.

---

> [!changes]+ 🔄 Change‑log
> **v1.3 (2025‑11‑17):** Added **Activation & Band Floors** (irreversible floors until fixed); clarified **decreases clamp to Floor**; expanded **acceptance checks** and the **Dam** example; minor copy edits and emoji polish.  
> **v1.2 (2025‑08‑31):** Prior publication — clarified **ON semantics**, banking, clamp at 100; anchors & scan‑cost cross‑link; emoji polish.  
> **v1.1–v1.0:** Initial versions.
