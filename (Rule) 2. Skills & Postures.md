---
created: 2025-08-28
schema: apex-docs-v1
code: RUL-BAS-SKL-W
title: "Skills & Postures — v1.5"
type: rule
audience: player
status: final
version: 1.5
updated: 2025-11-17
tier: core
player_facing: true
tags:
  - rule/skills
  - rule/posture
  - player-facing
aliases:
  - "Skills & Postures"
  - "Skills and Postures"
links:
  - "[[Simple Inventory (BL) — Ballast + Pockets]]"
  - "[[Revival — Lucifer & Quantum Print]]"
  - "[[Roll State Priority — Hard Override / Soft Override / Offsets]]"
  - "[[Chaos Drift (CDR) — Focus‑Zone Hazard Meter]]"
  - "[[Chaos & Harmony — Unified Rules]]"
imports: []
summary: "🧰 Skill list & postures (Stealth, Influence). 👁️ Awareness replaces Perception. 🎛️ Ability‑Flex whitelist. 🔒 Locks (Keyed vs Open). 🎯 Bands & rank gates. 🪢 Rigging ↔ Inventory. 🧩 Riddlecraft (Mindburn). 🖤 Soul Grit (1 HP)."
---

# Skills & Postures
^top

> [!summary]+ 🧭 On this page (internal anchors)
> [[#^tldr|TL;DR]] · [[#^baseline|Baseline & Awareness]] · [[#^skills|Skill List]] · [[#^locks|Locks Policy]] · [[#^flex|Ability‑Flex]] · [[#^bands|Bands & Rank Gates]] · [[#^stealth|Posture — Stealth]] · [[#^influence|Posture — Influence]] · [[#^riddle|Riddlecraft]] · [[#^rigging|Rigging ↔ Inventory]] · [[#^soulgrit|Soul Grit]] · [[#^strain|Strain]] · [[#^acro|Acrobatics]] · [[#^accept|Acceptance checks]] · [[#^changes|Changelog]]

^tldr
> [!tldr] 💎 **TL;DR**
> - **🎯 Bands:** **CS ≥ DC+5** · **S = DC..DC+4** · **F = DC−4..−1** · **CF ≤ DC−5**.  
> - **🔒 Locks:** **Keyed R#** = must meet that rank to **attempt** (**Help can’t grant eligibility**). **◇ Open R#** = anyone can try; **at/over** rung → **Soft Adv**; **under** rung → **Soft Disadv**.  
> - **👁️ Awareness (WIS)** **replaces Perception** (active & passive). Never stack both.  
> - **🕶️ Stealth:** If **watchers exist**, **contest** vs **highest Passive Awareness** (watchers effectively **Adv → +5**, **Dis → −5** to their passive). **No watchers:** **DC 12 + up to 3 dials** (Lighting/Noise/Crowd/Vigilance/Tempo). **Group:** **≥ half succeed** → success.  
> - **🗣️ Influence:** Resist with **higher of Disposition DC** vs **Passive Insight**; apply **Angles** (clamp **−4..+4**). 💸 **Credible money on the table** may grant a **one‑time −2 DC** (once/target/scene).  
> - **🪢 Rigging:** Adds **passive BL** capacity by rank (R1..R4 = **+2/+4/+6/+8**); gates **BUL/HVY/MSV/TIT** stows (Open‑by‑rung).  
> - **🧩 Riddlecraft:** Success → **Inspiration** or **Lore Focus**; Failure → **Mindburn** *(no stacking; refreshes)*.  
> - **🖤 Soul Grit:** When you’d drop to **0 HP**, test **10 + half damage** or **scene DC** (higher) to stay at **1 HP** (bands apply).  
> - **⚖️ Beltline:** **Gate → Hard → Soft → d20 → Offsets → Bands**.

^baseline
## 👁️ Baseline & Awareness
> [!tip] ℹ️ **Always‑on baseline**
> **Awareness (WIS)** is the campaign’s sense skill (replaces Perception). Map any legacy references to **Awareness**. **Never** stack Perception and Awareness.

**Passive Awareness** = `10 + WIS mod + PB (if trained) + bonuses`.

^skills
## 🧰 Skill List (codes & quick roles)

| Icon | **Skill (code)**      | Ability | Use this when…                                                                                                           |
| :--: | --------------------- | :-----: | ------------------------------------------------------------------------------------------------------------------------ |
| 🛠️  | **Pry (PRY)**         |   STR   | **Raw force & leverage**: wrench, pry, rip, brace, wedge (not fine tools or endurance hauling).                          |
|  🪢  | **Rigging (RGG)**     |   STR   | **Carry & secure heavy loads**; slings/hoists; balance under weight. Grants **passive BL** by rank; gates salvage stows. |
|  🔧  | **Tinker (TNK)**      |   DEX   | **Fine manipulation**: locks, traps, delicate repairs, micro‑tools; **[EOD]** steps when tagged.                         |
|  🤸  | **Acrobatics (ACR)**  |   DEX   | **Balance & precision**: beams, vents, controlled falls, tight spaces.                                                   |
| 🛡️  | **Resilience (RES)**  |   CON   | **Physiological tolerance**: toxins, heat/cold, pressure, disease, pain, fatigue.                                        |
|  🖤  | **Soul Grit (SLG)**   |   CON   | **Metaphysical resilience**; also powers the **1 HP** test when you’d drop.                                              |
|  💻  | **Systems (SYS)**     |   INT   | **Hardware + software ops**: hacking, vehicles, special weapons, power nets, diagnostics/repair.                         |
| 🌩️  | **Stillsense (STL)**  |   INT   | **Read the new physics**: anomalies, **Surgefronts**, soul‑siphon windows; infer world‑rule shifts.                      |
|  🔮  | **Godsight (GDS)**    |   WIS   | **Numinous layer**: rites, wards, sanctity/profanity, demonic spoor.                                                     |
|  🧩  | **Riddlecraft (RDL)** |   WIS   | **Story‑logic**: ciphers, symbols, intertext clues; connect fragments to answers.                                        |
| 🗣️  | **Influence (IFC)**   |   CHA   | **Talk & terms**: persuade, command, bargain, brief; secure compliance by conversation.                                  |
|  🎭  | **Guile (GIL)**       |   CHA   | **Misdirection & disguise**: performance, impersonation, sleight; sell the scene or swap the object.                     |

> [!note] 🧪 **Disciplines** (licenses; binary)  
> **[MED]** MedTech · **[EOD]** Demolitions · **[RCP]** Railcraft & Power. Discipline tags gate safety‑critical steps; the roll still uses the listed skill.

^locks
## 🔒 Locks Policy — **Keyed vs Open**
- **Keyed R#** — You must have **that rank** (or higher) to **attempt**. **Help cannot make you eligible**.  
- **◇ Open R#** — Anyone can try: **at/over** rung → **Soft Advantage**; **under** rung → **Soft Disadvantage**.

> [!rule] **Help (5e baseline)**
> **Helps one ally’s single roll** (no stacking). **Help never grants eligibility** on a **Keyed** attempt.

^flex
## 🎛️ Ability‑Flex (explicit whitelist)

| Skill | Default ability | Allowed flex (when…) | Redirect instead |
|---|:--:|---|---|
| **PRY** | STR | — | Tool finesse → **TNK**; load handling → **RGG** |
| **RGG** | STR | **CON** for long, endurance‑heavy carries | Precision rig → **TNK** |
| **TNK** | DEX | **INT** for pure planning/design (no hands‑on) | Heavy force → **PRY** |
| **ACR** | DEX | — | Lifting/hauling → **RGG** |
| **RES** | CON | — | Soul tenacity → **SLG** |
| **SLG** | CON | — | Never flex |
| **SYS** | INT | — | Pure hand finesse → **TNK** |
| **STL** | INT | — | Numinous layer → **GDS** |
| **GDS** | WIS | — | Technical systems → **SYS/STL** |
| **RDL** | WIS | — | Formal cryptanalysis → **SYS** |
| **IFC** | CHA | — | Hand‑trick deception → **GIL** |
| **GIL** | CHA | **DEX** when hands/timing carry it | Planning → **TNK** |

> [!rule] ↪️ **Redirects**
> If a redirect applies (e.g., **PRY → TNK**), **roll only the redirected skill**—not both.

^bands
## 🎯 Bands & Rank Gates
| Icon | Outcome | Threshold vs DC |
|:--:|---|---|
| 🟢🏆 | **Critical Success (CS)** | **DC +5** or more |
| ✅ | **Success (S)** | **DC … DC +4** |
| ⚠️ | **Failure (F)** | **DC −4 … DC −1** |
| 🔴💥 | **Critical Failure (CF)** | **DC −5** or worse |

**Rank/Act gates.** **R3** appears in **Act II**; **R4** appears only in **Act III** (optional “legend gate”).

> [!tip] **Beltline (resolution order)**  
> **Gate → Hard Override → Soft Override → d20 → Offsets → Bands**. Offsets (including injury dice) are numbers only; they never change **Adv/Dis**.

^stealth
## 🕶️ Posture — **Stealth** (contest or DC matrix)

**If watchers exist → Contest.**  
Roll against the **highest Passive Awareness** among watchers. Treat that passive **+5** if watchers effectively have **Advantage** (searching/on‑edge) or **−5** if they effectively have **Disadvantage** (distracted, sight‑blinded). **Group sneaks:** **≥ half succeed** → success.

**If no watcher → DC 12 + dials (pick ≤3).**

| Dial | Mod | Note |
|---|:--:|---|
| **Lighting** | +2/0/−2 | Ignore if watchers don’t rely on sight. |
| **Noise** | +2/0/−2 | Machinery/rain/crowd = loud. |
| **Crowd** | +2/0/−2 | Busy may impose Disadvantage on watchers instead. |
| **Vigilance** | +2/0/−2 | On‑edge may grant watcher Advantage. |
| **Tempo** | +2/0/−2 | Rushed may impose Disadvantage on the sneaker. |

**Outcomes.** **CS/S** = unnoticed · **F** = suspicion/soft cost (e.g., **Strain**) · **CF** = spotted/escalation.

^influence
## 🗣️ Posture — **Influence** (ask, angles, resist)

**Step 1 — Frame the ask.** State **ask & stakes**. Pick **1–2 Angles** (below). 💸 **Credible money‑on‑the‑table** may grant a **one‑time −2 DC nudge** (once/target/scene).

**Step 2 — Resist (GM).** Use the **higher of Passive Insight** (best NPC) **or Disposition DC**; then apply **Angles** (total clamp **−4..+4**).

| Disposition → DC | Helpful | Friendly | Indifferent | Unfriendly | Hostile |
|---|:--:|:--:|:--:|:--:|:--:|
| **DC** | 10 | 12 | 14 | 16 | 20 |

| Angles (pick ≤2) | Effect |
|---|---|
| Credible authority / shared interest | **−2 DC** |
| Familiar face / good rep | **−2 DC** |
| Contradictory order / obvious risk | **+2 DC** |
| Infamy / bad rep | **+2 DC** |

**Outcomes.** **CS** Agree + small concession · **S** Agree · **F** Stall/counteroffer · **CF** Refusal + soft complication.

> **Separation.** **Influence** = talk/terms. **Guile** = performance/impersonation/sleight (CHA; **DEX‑flex** when hands/timing carry it).

^riddle
## 🧩 Riddlecraft (RDL) — lore rewards

Per **unique lore object (per PC)**: one roll → **Inspiration**. If already inspired, gain **Lore Focus** for **10 minutes or 10 rounds** (Advantage on **RDL** and directly linked puzzles). **Further successes refresh** duration. Duplicates/forgeries don’t trigger.

| Rank | d20 target | Chance | On success | On failure |
|---|:--:|:--:|---|---|
| **R1** | **18+** | 15% | Inspiration or **Lore Focus** | **Mindburn**: 10 min/10 rounds; **RDL & linked puzzle checks +1 DC** (**no stacking; refreshes**). |
| **R2** | **17+** | 20% | same | same |
| **R3** | **16+** | 25% | same | same |
| **R4** | **15+** | 30% | same | same |

^rigging
## 🪢 Rigging (RGG) — capacity & stow (Ballast‑aligned)

> [!success] ✅ **Passive Capacity (always on)**  
> Add **+BL** by rank: **R1 +2**, **R2 +4**, **R3 +6**, **R4 +8** to your inventory capacity.

**Open‑by‑rung stow (always a roll)**
- **Eligibility:** **◇ Open R#** by load class: **R1=BUL**, **R2=HVY**, **R3=MSV**, **R4=TIT**.  
- **Advantage:** If **RGG ≥ rung**, roll with **Advantage**; if **RGG < rung**, roll with **Disadvantage**.  
- **Base DCs (stable/unstable):** **BUL 12/14 · HVY 14/16 · MSV 16/18–20 · TIT 18–20/22+**.  
- **Transfer:** The **recipient** must pass **their own** stow check vs the same DC.

> See **[[Simple Inventory (BL) — Ballast + Pockets]]** for BL/pBL rules and access costs.

^soulgrit
## 🖤 Soul Grit (SLG) — Will to Endure

**Trigger:** when you’d drop to **0 HP** (not killed outright), **no action**.  
**DC:** **10 + half the incoming damage (round down)** **or** **scene DC**, **higher**.  
**Frequency:** **R1–R3:** 1/Long Rest · **R4:** 1/Short Rest.  
**Stacking:** If another feature would keep you at **1 HP**, choose **one** effect.

| Result | Effect |
|---|---|
| **CS** | Stay at **1 HP**; **keep your action**; gain **Strain** (choose: −10 ft **or** Disadv on **PRY**) until a **Short Rest in Trueflow**. |
| **S**  | Stay at **1 HP**; **lose your bonus action** this turn; gain **Strain**. |
| **F**  | Drop to **0 HP**; gain **Strain**. |
| **CF** | As Failure **+ Exhaustion 1**. |

*If SLG succeeds, you did **not** die → no Hellstatic gain.*

^trueflow
> [!note] **Trueflow (campaign‑wide)**
> **Trueflow** = safe, uninterrupted, real time under normal causality.
> - **Short Rest in Trueflow:** ≥ **1 hour**, safe (no pursuit/Alarm).
> - **Long Rest in Trueflow:** ≥ **8 hours**, safe (same conditions).
> - **Exclusions:** **Instant short/long rests** from the **Chaos table (rows 19/22)** **do not** count as Trueflow; **printing isn’t a rest** and never counts.  
>   *(See Revival for printing semantics.)*


^strain
## 😵 Strain (default)

| Duration | Effect (choose one) |
|---|---|
| Until **Short Rest in Trueflow** | **−10 ft speed** **or** **Disadvantage on PRY** |

^acro
## 🤸 Acrobatics (ACR) — precarious crossings

| Band | Result |
|---|---|
| **CS** | Cross cleanly. |
| **S** | Cross. |
| **F** | **Lose 1d4 HP** (slips/scrapes). |
| **CF** | **Gain 1 Minor Injury** (telegraph if a fall is plausible). |

^accept
## ✅ Acceptance checks (adversarial quick‑tests)
- **Awareness replacement:** A watch post uses **Passive Awareness** to spot sneaks; **Perception** is never referenced.  
- **Keyed lock:** A task marked **Keyed R2** cannot be attempted by an **R1** character even with **Help**.  
- **Open lock:** A character **at/over** the rung gets **Soft Adv**; **under** the rung rolls at **Soft Disadv**.  
- **Stealth matrix:** No watcher → **DC 12 + dials** (≤3). With two alert guards → contest vs **highest Passive Awareness** (**+5** if they’re actively searching).  
- **Influence angles:** **Hostile (DC 20)**; show **credible authority (−2)** and **good rep (−2)** → **DC 16**; roll IFC vs 16; read bands.  
- **Rigging transfer:** Passing a **BUL** crate requires both **the lifter and the recipient** to succeed at their own stow checks.  
- **Soul Grit:** On **S**, you stay at **1 HP** and lose **only** your **bonus action** this turn.

^changes
## 🔄 Changelog
- **v1.5 (2025‑11‑17):** Unified properties header; tightened TL;DR; clarified **Locks** & **Beltline**; normalized **Awareness** phrasing; compacted **Stealth/Influence** steps; aligned **Rigging** with Inventory; added **Acceptance checks**; emoji & anchor polish.  
- **v1.4.x:** Prior versions.
