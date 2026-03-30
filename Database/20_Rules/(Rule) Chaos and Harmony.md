---
created: 2025-11-17
schema: apex-docs-v1
code: RUL-SYS-CHU-0
title: "Chaos & Harmony — Unified Rules"
type: rule
audience: table
status: final
version: 2.9
updated: 2025-11-17
tier: core
player_facing: true
tags: [rule/chaos, rule/harmony, rule/cdr, rule/ash, player-facing]
aliases:
  - "Chaos & Harmony — Unified Rules (Player)"
  - "Chaos and Harmony — Unified Rules"
links: []
imports: []
summary: "🌀 Roll Chaos to a single Master Table (rows 2–22) and apply the Modifier as an **Offset** (or equal DC shift). ⚖️ Harmony grants Seals, Minor‑tier choices, and site **Harmony Unlocks (HU‑1/3/5/7/9)**. 🃏 **Devil’s Mercy**: **1×/chapter** per holder **and** **1×/long rest** per party to reroll the Chaos‑table row **after seeing it**, before effects; keep the new result. Beltline: **Gate → Hard → Soft → d20 → Offsets → Bands**. Uses **Awareness (WIS)** language and the **IAZ v1.8** effect‑window model for ASH."
---
^top
# Chaos & Harmony — Unified Rules

> [!summary]+ 🧭 On this page
> [[#^two-scales|1️⃣ The Two Scales]] · [[#^harmony|2️⃣ Harmony]] · [[#^chaos|3️⃣ Chaos]] · [[#^integration|4️⃣ Integration (H×C)]] · [[#^defs|5️⃣ Definitions]] · [[#^rollfit|6️⃣ Roll‑State Fit]] · [[#^accept|✅ Acceptance checks]] · [[#^changes|🔄 Changelog]]

> [!tldr] 💎 **Player TL;DR**
> **Chaos Roll.** Roll your **Chaos Level (CL)** dice, **add the printed offset**, and read that **row (2–22)** on the **Master Chaos Table**. Apply the **Modifier** to the current check as **OFS (Roll)** **or** equivalently as an equal **DC shift** on the GM side (same math).  
> **Harmony.** Your **Harmony Level (HL)** unlocks site **Harmony Unlocks (HU‑1/3/5/7/9)** and grants **Seals** with **capacity**, **Overflow**, and **Minor‑tier choices** (HL 2/4/6/8).  
> **Interlock.** **Devil’s Mercy** lets **holders** reroll the Chaos‑table row **after seeing it and before effects**. **Limits:** **1×/chapter per holder** **and** **1×/long rest per party**. **Keep the new result.**  
> **Beltline.** **Gate → Hard Override → Soft Override → d20 → Offsets → Bands**.  
> **Language.** **Awareness (WIS)** replaces Perception. **ASH** uses **effect windows per cluster**: it **persists** while any PC is **inside that cluster’s IAZ** and **clears** when **no PCs** are inside for **6 seconds**; a new ASH **replaces** the old one for that cluster.

---

## 1) The Two Scales ^two-scales

- **Harmony Level (HL 1–10).** Earned by story/milestones. Governs **Seals** (capacity, Overflow), **Minor‑tier choices**, and **Harmony Unlocks (HU)** available at cooperative sites.  
- **Chaos Level (CL 1–10).** Reflects your Lucifer cadence. Sets your **Chaos dice + offset** against the **2–22 Master Table**.

---

## 2) Harmony ^harmony

### 2.1 Level progression & capacity
**Major spikes:** HL **1 / 3 / 5 / 7 / 9**. At each major spike, gain **+1 Seal** and unlock the listed **HU** band.  
**Minor tiers:** HL **2 / 4 / 6 / 8**. Choose **1** option from the **Minor Tier Menu** (options unlock gradually).  
**Capacity:** Seal capacity becomes **2** at **HL5** and **3** at **HL9**. **HL10** is a narrative **capstone** (no Seals/refills).

| HL | Major effect at this level | Seal capacity |
|:--:|:--|:--:|
| **1** | **HU‑1 Courtesies**; on reaching HL1 you gain **+1 Seal**. | **1** |
| **2** | **Minor Tier** (①–③). | 1 |
| **3** | **HU‑3 Tokens**; on reaching HL3 you gain **+1 Seal**. | 1 |
| **4** | **Minor Tier** (①–④). | 1 |
| **5** | **HU‑5 Services**; capacity becomes **2**; on reaching HL5 you gain **+1 Seal**. | **2** |
| **6** | **Minor Tier** (①–⑤). | 2 |
| **7** | **HU‑7 Patronage**; on reaching HL7 you gain **+1 Seal**. | 2 |
| **8** | **Minor Tier** (①–⑥). | 2 |
| **9** | **HU‑9 Sanctuary**; capacity becomes **3**; on reaching HL9 you gain **+1 Seal**. | **3** |
| **10** | **Capstone: Choice of Harmony** (permanent; pick 1). | 3 |

> [!tip] **Major‑spike order**
> Apply any capacity change → grant **+1 Seal** (**Overflow** applies) → then any chapter‑start award your pacing uses.

### 2.2 Seals (earning, holding, spending)
- Hold Seals up to your **capacity**; spending Seals does **not** reduce HL.  
- **Chapter start:** If you are **below capacity**, gain **+1 Seal**. (Not giftable unless it would overflow.)  
- **In‑play awards (rare):** At most **+1** to a given PC per chapter for table awards (Order Milestone / Clean Resolution / Oath Kept). **Party max 2–3** per chapter. Target is the acting PC; gifting only via **Overflow**.

> [!warning] **Overflow**
> • **Spend 1 Seal this scene** to make room; otherwise **gift** the new Seal to a **0‑Seal** ally; otherwise it **evaporates**.  
> • If the overflow comes from a **major‑spike +1**, you may instead take a **Harmonic Surge**: +1 Seal that **ignores capacity** and **expires at the end of your next scene** (or at chapter end if awarded out of play).  
> • **Inspiration option:** Instead of a Surge, you may convert that overflow to **Inspiration** **if you don’t already have Inspiration**. If you already have Inspiration, you must **immediately spend one** (you or an ally) as part of this resolution; otherwise the overflow **defaults to a Surge**.

### 2.3 Minor tiers (HL 2/4/6/8)
- **No capacity change** and **no automatic refills** on level‑up.  
- **Trickle:** If you reach a minor tier while at **0 stored Seals** (ignore any short‑lived Surge), gain **+1 Seal** to capacity. Not giftable.  
- **Choice:** At each minor tier, choose **1** option. Unlock pattern: **HL2:** ①–③; **HL4:** ①–④; **HL6:** ①–⑤; **HL8:** ①–⑥.

#### Minor Tier Menu
1. **① Harmonic Surge.** Gain +1 Seal that **ignores capacity**. It **expires at the end of your next scene** (or at chapter end if gained out of play). If you already hold at least one Seal and prefer not to add another, gain **Harmonic Edge**: **advantage** on **one** attack roll, ability check, or saving throw **this scene**.  
2. **② Story‑Driven Inspiration.** Gain **Inspiration**. If you already have Inspiration, **immediately spend one** (you or an ally) on one attack roll, ability check, or saving throw **this scene**.  
3. **③ Reserve Channel (Temp Cap +1).** Your Seal capacity increases by **1** for **this chapter**. At chapter end, if the temp slot is still filled, that extra Seal **converts to Inspiration**; that Inspiration **expires at the end of your next scene** if not spent.  
4. **④ Harmony Attunement (license).** You can attune items that **require Harmony Attunement**. This does **not** increase your normal attunement limit.  
5. **⑤ Stillpoint (Meditation).** A rare tempo/positioning shift usable **between turns** or **pre‑initiative**.  
6. **⑥ Devil’s Mercy (meta).** **Once per chapter, per holder.** **Also:** **party cap 1×/long rest**. **After seeing the Chaos‑table row and before resolving effects**, **reroll** the selection dice and **keep the new result**.

> [!note] **Advantage stacking**
> If multiple features would grant **advantage** to the same roll (for example **Inspiration** and **Harmonic Edge**), you still roll with advantage only once; advantages do not stack.

### 2.4 Harmony Unlocks (HU)
Harmony Unlocks are **site‑based** benefits available only at **Harmony‑affined** or **Neutral** facilities that list HU support. **Chaos‑affined** sites ignore HU.

**Global rules (per party, per chapter, across all sites)**
- **Presence.** Only PCs **present on site** may benefit. If multiple PCs are present, use the **highest HL** among them to check the band.  
- **Suspension.** HU benefits are **suspended** while the party is **Under Threat** (pursuit, combat, active hostility) or the site is in **Alarm/Lockdown**.  
- **Rate limits:**  
  - **HU‑3:** up to **2 tokens total**. Tokens are **on‑premises only**, **non‑transferable**, and **expire** on departure or chapter end. No resale above paid value.  
  - **HU‑5:** **1 service total**. Must meet **short rest** timing (**≥1 hour**, safe).  
  - **HU‑7:** **1 credit/bundle total**. **Non‑transferable**; expires at chapter end; goods purchased **cannot be resold** above the effective paid amount. No blanket % discounts.  
  - **HU‑9:** **1 sanctuary total**. Must meet **long rest** timing (**≥8 hours**, safe). No cross‑site chain‑resting.  
- **Economy.** HU items/services **cannot** be transformed into profit (no resale above paid value), independent of Chaos outcomes.

**Bands**
- **HU‑1 — Courtesies.** Access to public areas, fair terms, and routine help (directions, basic information, normal queuing). No rests, no freebies or discounts, no restricted areas, no legal immunity.  
- **HU‑3 — Tokens.** Small, site‑themed **one‑shot** benefits usable **on‑premises**. (Capped; see Global Rules.)  
- **HU‑5 — Services (short rest tier).** Once per chapter, take **one** short‑rest‑equivalent service at an eligible site (**≥1 hour**, safe). If the rest completes, the site may grant a small Harmony‑flavored kicker (e.g., each resting character regains **1 additional Hit Die** when they spend at least one). HU‑5 is suspended Under Threat/Alarm.  
- **HU‑7 — Patronage.** Once per chapter, claim **one** credit/bundle for site‑themed goods/services or reasonable priority. Credits are non‑transferable and expire at chapter end; no resale profit; never a blanket % discount.  
- **HU‑9 — Sanctuary (long rest tier).** At a designated sanctuary, take **one** safe long rest per chapter. Requires full long rest timing and a stable situation; recent violence, active pursuit, or Alarm suspend Sanctuary. No chain‑rest across multiple sites in the same chapter. After completion, the site may grant a small Harmony‑flavored bonus (e.g., each resting character regains **1 additional Hit Die** or clears one plausible lingering condition).

### 2.5 HL10 — Capstone: *Choice of Harmony* (permanent; choose 1)
**Keep the Sway — Harmony Dividend.** Once per chapter, **when you finish a long rest** at a **Harmony‑affined or Neutral** facility that supports **HU**, if you are **below capacity**, you **gain 1 Seal** (not giftable; **Overflow** applies). Or take a **Dividend Payout** instead: **gain 2 Seals** that **ignore capacity** and **expire at the end of your next scene** (or at chapter end if out of play). Taking a payout **uses your once‑per‑chapter trigger**. *Long rests conjured by Chaos effects don’t count.*

**Sever the Sway — Still Soul.** You **never roll Chaos dice**.  
• **Personal triggers:** When a rule would call for you to roll on the **Master Chaos Table** as part of a check you make, **don’t roll**; instead gain **+1** to that attack roll, ability check, or saving throw. **No Chaos‑table effect** occurs from your trigger.  
• **Zone‑only triggers:** If the trigger would adjust the **Focus Zone’s CDR** because of **your action**, the **GM or another party member** rolls the Chaos selection dice to resolve the Zone’s change.  
• **Immunity:** You are **unaffected by ASH** and **Chaos‑table effects** that would apply to you personally (including beneficial ones).  
• **Loss of boons:** You **can’t** gain benefits that come **only** from Chaos results (e.g., **Spark of Inspiration**, **Instant short/long rest**, **Salve/Benediction**, **Quest Whisper**).  
• **Devil’s Mercy:** You **can’t** use Mercy on **yourself** (you never roll Chaos), **but you may spend your own per‑chapter Mercy charge to replace another character’s row**, awareness/timing permitting.

---

## 3) Chaos ^chaos

### 3.1 Using a Chaos Roll (at the table)
1) **Grab your Chaos dice** for your current **CL** (see **Level Ladder** below).  
2) **Roll and add the offset** shown for your level → this gives a **Row (2–22)**.  
3) **Look up the Row** on the **Master Chaos Table** and take the **Modifier**.  
4) **Apply the Modifier** to the current check as **OFS (Roll)**; or the GM may **shift the DC** by the **opposite amount** (**OFS (DC)**). **Same math; choose one.**  
5) **Devil’s Mercy (if available):** **After seeing the row and before resolving effects**, a **holder** may invoke **Devil’s Mercy** if they have their **per‑chapter charge** and the **party’s per‑LR cap** is unspent. **Reroll** the **selection dice** and **keep the new row**.

> [!tip] **Implementation note**
> **Modifiers are Offsets.** They never change Advantage/Disadvantage and stack additively with other Offsets. If your engine prefers DC‑side math, use `dc_shift = -Modifier` scoped to **this attempt only**.

### 3.2 Focus Zone & CDR (Chaos Drift Rating)
Each chapter designates one **Focus Zone** (the zone with a **CDR** meter). **CDR is OFF** until the party **first enters** that Zone; then **stays ON until fixed** (on fix, set to **0** and **lock OFF**). When a table result shows **“(±X CDR, Zone‑only)”**, apply it to the **Focus Zone’s meter**. **Bank** changes earned before first entry and apply them as the **start value** on first entry (banks **stack**). **Clamp CDR at 0–100**.

**Irreversible band floors.**
- **Default thresholds:** **0/36/76/100** (🟢/**Baseline**, 🟠/**Strain**, 🔴/**Crisis**, ⛔/**Break**).  
- When you first **trigger** a band’s stage on crossing its threshold, set a **Floor** at that band’s **lower bound** (e.g., **36**).  
- **Decreases cannot go below Floor** until the Zone is **fixed**. Entering a **higher** band **raises** the Floor to that band’s lower bound.  
- At **100 (Break)**, treat Floor as **100** until a special fix explicitly reduces it.

### 3.3 Chaos Effects — Master Table (Rows 2–22)
> *The **Modifier** applies to your check only when Chaos dice are rolled **alongside** a DC check (ignore Modifier when rolling solely for Effects). Some entries are **IAZ only** and/or apply **Apocalyptic Shift (ASH)**; those states use **effect windows per cluster**: they **persist** while any PC remains **inside that cluster’s IAZ** and **clear** for that cluster when **no PCs** are inside for **6 seconds**. A **new ASH** replaces the old one for that cluster. **Spells/features win**.*

| #      | Effect                                     | Modifier | Rules text |
| ------ | ------------------------------------------ | -------: | --- |
| **2**  | **Chaos Burn**                             |       −6 | You gain **one Major Injury** (**apply the Chaos modifier to the triggering check first; lane = the triggering check’s lane**. If there’s **no lane** or it’s **ineligible**, the **DM offers two eligible lanes** and you choose. **Lane choice locks on declaration.**) **If you can’t gain a Major due to a cap**, shift this result **one row toward neutral** instead. |
| **3**  | **Exhaustive Shock**                       |       −6 | Roll **2d4** (**d1, d2**). Make a **Constitution saving throw** (DC **9 + d1 + d2**). On a failure, gain **min(d1, d2)** levels of **exhaustion**. *(Apply the Chaos modifier to the triggering check first.)* |
| **4**  | **World Quake** *(+12 CDR, Zone‑only)*     |       −5 | **Focus Zone CDR only.** Raise the Focus Zone’s **CDR by 12** (**bank if not yet entered; ceiling 100**). If this **crosses any thresholds**, **immediately update to the destination band** and **raise Floor** accordingly. If the Focus Zone is already fixed, resolve **#10 ASH d4** instead. |
| **5**  | **Convergence Front (4‑seg)**              |       −5 | **Omen now.** **Fix the Region of Roll** where you rolled. Place **one 4‑segment clock**. Tick **+1 ~ every 5 minutes** of meaningful action there; **+1** at end of **combat** or major **noise/progress**. **Max +2/scene**; if **3 scenes** pass there with no ticks, add **+1**. When full, the **Surgefront** hits that region. *(If in **sanctuary/hub** when it completes, **+3 CDR** to the **Focus Zone** — bank if OFF; narrate the outside surge. If a **Front** already exists for this region, **fill it now**; do **not** place another. If the **Region of Roll** is invalid/closed, apply the **Universal Shift Rule**: shift **one step toward neutral**.)* |
| **6**  | **Unhealthy Pulse** *(+6 CDR, Zone‑only)*  |       −5 | **Focus Zone CDR only.** Raise CDR by **6** (**bank if not yet entered; ceiling 100**). If thresholds are crossed, update to the destination band and **raise Floor** accordingly; if fixed, resolve **#10 ASH d4** instead. |
| **7**  | **Take the Scar**                          |       −4 | Gain **1 Minor Injury** (**lane = the triggering lane**; if none/ineligible, the **DM offers two**, you choose; **locks on declaration**). **Reroll duplicates** in that lane. On the **3rd Minor** in that lane, **merge → 1 Major** per Injury rules. *(Apply the Chaos modifier first.)* |
| **8**  | **Soul Twinge**                            |       −3 | **Lose 1 Hit Die** immediately (**don’t roll; no healing**). Take from your **largest pool** (your choice if tied). If you have **0 Hit Dice**, take **1d4 psychic damage**. |
| **9**  | **Winded Steps**                           |       −2 | Make a **Constitution saving throw** (DC **11 + your proficiency bonus**). **Success:** no effect. **Failure:** reduce each of your **speeds by 10 feet** (minimum 5; a speed already at 0 remains 0) for **1 hour** or **until you finish a short rest**. **Doesn’t stack**; a new failure **refreshes** the duration. *(Roller only.)* |
| **10** | **Apocalyptic Shift (ASH, d4)**            |       −1 | **IAZ only.** Roll **ASH d4** and apply: **1 Grayout** (lightly obscured; **−5 to passive Awareness**; **disadvantage on Awareness checks that rely on sight**) • **2 Gridlock** (difficult terrain) • **3 Starklight** (bright light; **+5 to passive Awareness**; **disadvantage on Dexterity (Stealth) checks to hide**) • **4 Dissonance Field** (**disadvantage on Constitution saving throws to maintain concentration**). **Effect windows (per cluster):** persists while **any PC** remains **inside that cluster’s IAZ**; **clears for that cluster** when **no PCs** are inside for **6 seconds** (DM may prevent “toe‑tap” exploits). **Applies indoors & outdoors** (use indoor equivalents). **Coexists** with **Convergence Front**. *(Spells/features may override specifics.)* |
| **11** | **Spark of Inspiration**                   |        0 | Gain **1 Inspiration**. If you already have it, give **1** to an **ally in the IAZ** who lacks it. If neither applies and this was rolled **with a DC check**, gain **soft advantage** on **that check** *(declare before you roll; Hard advantage beats soft advantage)*. Otherwise (effect‑only, no valid target), resolve **#10 ASH d4** now. *(Apply the Chaos modifier first.)* |
| **12** | **Quest Whisper**                          |        0 | **IAZ only.** A nearby **mirror‑like surface** flickers. The **roller asks one ≤10‑word question** about the **current objective here**. **Answer:** **≤10 words** giving **one immediate next step**. **Perceived by all party members in the IAZ** (not NPCs). **Once per scene.** If no clear objective exists, hint the **nearest actionable clue or hazard** in the IAZ. |
| **13** | **Glass Favor**                            |       +1 | Choose **one named NPC** you’ve **met** or who **knows of you**. Their **attitude toward the roller** shifts **one step warmer** (**Hostile → Indifferent → Friendly; cap Friendly**). **Declare now; locks.** Persists; may **stack** up to the cap. Doesn’t end combat, override magic, or break oaths or zealotry. If present, show an immediate tell; if absent, apply on **next contact**. **No eligible NPC?** Resolve **#10 ASH d4** now. |
| **14** | **Silver Postcard**                        |       +2 | Name **one already‑known location** (visited or learned in play). A **mirror‑sheen still** appears: **one silent frame from the current moment**, **DM‑framed** to the **most salient visible feature**. **No labels, motion, sound, x‑ray, or reading small text** (obvious signage only). If warded/obscured, show the **nearest unwarded threshold/exterior** instead. If no prepared art exists, give a **≤15‑word visual still**. Repeats in the same scene show a **different angle**, not deeper secrets. |
| **15** | **Soul Stitch**                            |       +2 | **Choose one:** regain **1 expended Hit Die** (choose a class pool; not above your max), **or** regain **one expended 1st‑level spell slot** (**Pact Magic** only if your pact slot level is **1st**). If neither applies, gain **temporary hit points = 1d6 + your proficiency bonus** (**don’t stack; keep the higher; last until depleted or a long rest**). |
| **16** | **Salve**                                  |       +3 | **Clear 1 Minor Injury you have** (any lane). Doesn’t affect Majors, can’t downgrade Majors. **No Minor Injuries?** Regain **2d4 + your proficiency bonus** hit points; overflow becomes **temporary hit points (up to your proficiency bonus)**. **Temporary hit points don’t stack**; keep higher; last until depleted or a long rest. |
| **17** | **Soul Reprieve**                          |       +4 | Reduce your **Soul Debt** by **1** (min 0; personal only). **If you have 0 Soul Debt,** gain **resistance to necrotic damage** **until you finish a short or long rest**. |
| **18** | **Lull in the Haze** *(−3 CDR, Zone‑only)* |       +5 | **Focus Zone CDR only.** Lower CDR by **3** (**bank if not yet entered; floor 0**). Apply **Floor** rules (decreases can’t drop below current Floor). If Focus Zone is fixed, resolve **#10 ASH d4** instead. |
| **19** | **Instant short rest**                     |       +6 | **Roller only.** You **immediately finish a short rest**—**no time passes** (**durations don’t advance; concentration isn’t broken**). **Spend Hit Dice now** and regain **short‑rest resources**; you may also use features that trigger **after** a short rest (normal limits). This **doesn’t allow activities requiring the rest’s duration** (e.g., **attuning/unattuning**, crafting, short‑rest identification). You must be **conscious** to benefit. **Effects that end “when you finish a short rest” end now.** |
| **20** | **Slackening** *(−5 CDR, Zone‑only)*       |       +8 | **Focus Zone CDR only.** Lower CDR by **5** (**bank if not yet entered; floor 0**). Apply **Floor** rules (decreases can’t drop below current Floor). If Focus Zone is fixed, resolve **#10 ASH d4** instead. |
| **21** | **Benediction**                            |       +8 | **End one Major Injury** affecting you (any lane). Doesn’t restore hit points, remove conditions, or end curses/diseases. **If you have no Majors,** instead **end up to two Minor Injuries** affecting you (any lanes). **If no Minors,** gain **temporary hit points = 2d8 + your proficiency bonus** (**don’t stack; keep higher; last until depleted or a long rest**). |
| **22** | **Instant long rest**                      |       +8 | **Roller only.** You **immediately finish a long rest**—**no time passes** (**durations don’t advance; concentration isn’t broken**). You **regain all hit points**, **recover resources that recharge on a long rest**, **regain expended Hit Dice up to half your total (min 1)**, and **reduce exhaustion by 1**, as normal. **Prepared casters** can change prepared spells now, as normal. This **doesn’t allow activities requiring the rest’s duration** (e.g., crafting, copying spells, attuning/unattuning). You must be **conscious** to benefit. **Effects that end “when you finish a long rest” end now.** **Ignores** the usual rule that you can benefit from only **one long rest per 24 hours**. |

### 3.4 Chaos Level Ladder (dice + offsets)
> **Offset centers** each dice pair on row **12** so everyone uses the same 2–22 table. **Offset = (22 − (A + B)) / 2** for **1dA + 1dB**.

- **CL1:** **2d4 + 7** → rows **9–15**  
- **CL2:** **d4 + d6 + 6** → **8–16**  
- **CL3:** **2d6 + 5** → **7–17**  
- **CL4:** **d4 + d8 + 5** → **7–17**  
- **CL5:** **d6 + d8 + 4** → **6–18**  
- **CL6:** **d4 + d10 + 4** → **6–18**  
- **CL7:** **2d8 + 3** → **5–19**  
- **CL8:** **d6 + d10 + 3** → **5–19**  
- **CL9:** **d8 + d12 + 1** → **3–21**  
- **CL10:** **d10 + d12 + 0** → **2–22**

> **Level‑1 feel:** Rows **9–15** → modifiers **−2, −1, 0, 0, +1, +2, +2**.  
> **Level‑10 feel:** Floor **−6**, ceiling **+8**; average bias ~**+0.3**.

---

## 4) Integration (Harmony × Chaos) ^integration

- **Devil’s Mercy (reroll).** **Per holder:** 1×/chapter. **Per party:** 1×/long rest. Timing: **after seeing the row, before effects**; **keep the new result**.  
- **Still Soul & Mercy.** A **Still Soul** **cannot** use Mercy on **self** (no Chaos rolls) but **may** spend **their own** per‑chapter Mercy **to replace an ally’s row** if they are aware in time.  
- **Inspiration & advantage.** Harmony’s **Overflow → Inspiration** and **Story‑Driven Inspiration** co‑exist cleanly with Chaos row **11**. If multiple sources would grant **advantage** on the same roll, you still roll with **advantage** only once.  
- **Under Threat/Alarm.** HU benefits **pause** while Under Threat/Alarm—this includes moments when **ASH** or **Convergence Front** effects are active at that site during combat/pursuit.  
- **CDR scans & currency.** **Lv‑3 CDR scan = 1 ST**, **Lv‑4 = 1 PLUG** (per Money rules).

---

## 5) Definitions ^defs

- **IAZ.** The table’s **Immediate Action Zone**; a **vertical prism** around each party **cluster** that **follows the players**. **Effects** keyed to the IAZ track their **own** persistence; the **IAZ itself never ends**.  
- **Focus Zone / CDR.** The chapter’s targeted Zone and its **Chaos Drift** meter (0–100) with **irreversible band floors** until fixed.  
- **Region of Roll (RoR).** The smallest named map region you’re acting in when a result calls for regional effects (e.g., **Convergence Front**).  
- **Scene / Chapter.** A **scene** is a single GM‑framed beat: a combat, a discrete exploration task, or a social exchange with stakes. **Downtime** is not a scene. A **chapter** is the pacing unit for awards, HU limits, and the Focus Zone.


 > [!def] **Soul Debt** (campaign hook; default OFF)
 > A **per‑character counter** some modules use to flag infernal bargains, forbidden revivals, or rites. 
> - **Default:** Not tracked in the base rules; treat as **0** unless a rule/module explicitly sets or changes it.
> - **Floor:** **min 0**; do not track negatives.
> - **Sheet:** If used, add a small “Soul Debt” line under Status.
> - **Interactions:** When a rule says “reduce Soul Debt by 1,” lower the counter (min 0). If your table **doesn’t** track Soul Debt, you’re always at **0**.




---

## 6) Roll‑State Fit (for tables using the priority model) ^rollfit

> **Beltline (truth):** **Gate → Hard Override → Soft Override → d20 → Offsets → Bands.**  
> Modifiers from Chaos are **Offsets** and never change Advantage/Disadvantage.

---

## ✅ Acceptance checks ^accept

- **Mercy limits:** A party with two holders can still use **Devil’s Mercy** only **once** between long rests; either holder may invoke it, and **each** can do so **once per chapter**. **Row 22** (Instant long rest) **does not refresh** the party cap.  
- **Row‑cap guardrail:** If you are at **3 Major Injuries** (cap) and row **2** would add another Major, **shift** the result **one row toward neutral**.  
- **CDR floors:** At **CDR 30** in the Focus Zone, a **Long Rest inside** moves to **CDR 45** (crosses into 🟠 **Strain**; set **Floor 36**). A later Chaos **row 20** lowers it to **CDR 40** (**not** below the Floor).  
- **ASH precedence & Awareness:** Under row **10**, **Starklight** gives **+5 passive Awareness** and **Stealth (hide) disadvantage** in the **IAZ**; a *darkness* spell in the same space **overrides** visibility and cancels the sight bonuses/penalties while it lasts.  
- **IAZ window (clustered):** Row **10** fires while the party is split into **two clusters**; each cluster can hold **its own** ASH with **its own** window. When **no PCs** remain in a cluster’s IAZ for **6 seconds**, **only that cluster’s** ASH clears.  
- **Beltline:** With **HARD Disadvantage** from Hellstatic and a Soft Advantage from **Help**, you roll at **Disadvantage**, then apply the Chaos **Modifier** (if any) as an **Offset**, then read **Bands**.

---

> [!changes]+ 🔄 Changelog ^changes
> **v3.1 (2025‑11‑17):** **Removed the “neutral minute” backstop** — ASH/IAZ windows **clear after 6 seconds only**. Added **CDR irreversible band floors** and **floor‑aware** text on rows **4/6/18/20**; reinforced beltline invariants and Mercy clarifications.  
> **v3.0 (2025‑11‑17):** Prior rebuild aligning Awareness, Mercy timing, ASH cluster windows, and scan costs.
