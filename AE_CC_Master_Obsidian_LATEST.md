# Apocalypse Express — Character Creation (Master Doc)

> **Purpose:** A single, table-facing procedure for building an Apocalypse Express character that feels like **5e (2014-era)** while honoring AE’s core constraints.  
> **Status:** WORKING. Only sections explicitly labeled **LOCKED** are final.

---

## 🔒 Locked Decisions (so far)

- **Rules engine:** D&D 5e (2014) baseline (SRD 5.1 as reference).  
- **Classes:** **All 12 classic 5e classes** are allowed (spellcasters included; AE policies prevent bypass picks).  
- **Subclasses:** **Any official WotC 5e subclass** is allowed (**DM approves**). Use **2014 versions** by default if multiple versions exist. Blocked features/spells **auto‑swap** (see §4.2 + §0.4).  
- **Skill training:** **Class uniques + 2 “General Training” picks** at Level 1 (the 5e background-skill equivalent). **No 5e skill mapping** at the table.  
- **Game mode:** **Round‑Trip (Core)** by default; **End of the Line (Hardcore)** is an optional **table‑wide** difficulty overlay (niche).  
- **Starting level:** **Level 1**.  
- **Leveling:** **Milestones** — target **~+1 level per chapter/canto**, with **Chapter 1 accelerating to Level 3**.  
- **Ability scores:** **Standard Array (default)** with **optional Point Buy** (27 points). **Rolled stats OFF**.  
- **Hit Points (HP):** Level 1 = **max Hit Die + CON**; Levels 2+ = **fixed average + CON** (no HP rolling).  
- **Death reversal:** **TRAIN‑ONLY RESURRECTION** (Train print only; resurrection magic unavailable).  
- **Teleportation:** **TACTICAL ONLY** (no travel/zone bypass).  
- **Rests:** **No conjured safe‑rest bubbles**. Long rests require **(1) safety** + **(2) 100 Camp Supplies (CS)**.  
- **Resource creation:** Conjured food/water/shelter **does not create CS** and **cannot be converted to CS**.  
- **Summoning:** **NO SWARM LOAD** — each PC may control **1 Combat Ally** max. **PAVNN is exempt** (party asset; doesn’t consume the cap).  
- **Body Tags:** only **[FLESH]** and **[STEEL]**; these are **mechanical tags** used across systems (access, DCs, gear limits, bonuses).  
- **Soul Indices:** Boiler / Crown / Maw / Mirror are the **ancestry slot** (package locked in the v2 ancestry note).  
- **Maw passive override:** **+1 extra pocket (5 pBL)**.  
- **Backgrounds:** **Curated list only** (no freeform). Each background grants **exactly one** benefit: **(a) a micro‑boost** *or* **(b) a Discipline license** (rare) (see §2.3).  
- **Starting gear:** **Background Kits** (from your chosen Background) stack on top of **Class Loadout gear**. No level‑1 shopping; limited swaps only (see §6).  
- **Class Loadouts:** **2 curated loadouts per class** (pick 1 at character creation) (see §6.2).  
- **Disciplines (licenses):** **Not granted by default.** Only **select specialized backgrounds** grant **one Discipline** (**[MED] / [EOD] / [RCP]**) **instead of** a background micro‑boost (see §2.3 / §5.4).

---

## 0) Campaign Setup (DM locks once for the table)

### 0.1 Rules baseline — **LOCKED**
- **D&D 5e (2014) baseline** (SRD 5.1 reference).

### 0.2 Content scope (“how close to D&D?”) — **LOCKED**
- Use broad, familiar 5e-style character options **but** apply AE’s **ban/modify policy** where needed (see §0.4 and §7).

### 0.3 Allowed class pack — **LOCKED (All 12 classic classes)**
All 12 classic 5e classes are allowed:
- Barbarian  
- Bard  
- Cleric  
- Druid  
- Fighter  
- Monk  
- Paladin  
- Ranger  
- Rogue  
- Sorcerer  
- Warlock  
- Wizard  

> [!note] **Spell/feature safety**
> Spellcasting is in-play. The campaign relies on the policy module below to prevent “bypass buttons” from breaking AE pillars.

### 0.4 Spell/Feature Policy Module — **LOCKED (current scope)**
This module exists because spellcasting exists.

> [!important] **Global “No Trap Picks” policy**
> If a spell/feature/item is blocked by this module, it is treated as **unavailable** (can’t be learned/prepared/cast/crafted/purchased).  
> If something would grant it anyway, the player **auto‑swaps** immediately to another valid option of the same type (spell‑for‑spell, feature‑for‑feature), with DM approval.

- **LOCKED:** Teleportation policy = **tactical teleport only** (see §0.4.1).  
- **LOCKED:** Rest bypass policy = **no safe‑rest bubbles** (see §0.4.2).  
- **LOCKED:** Long rest gate = **safe venue + 100 CS** (see §0.4.3).  
- **LOCKED:** Resource creation can’t bypass CS (see §0.4.3).  
- **LOCKED:** Summons policy = **No Swarm Load (1 Combat Ally cap)** + **PAVNN exempt** (see §0.4.4).  
- **LOCKED:** Death reversal / resurrection handling = **Train-only resurrection** (see §7).  

### 0.4.1 Teleportation & Travel Bypass — **LOCKED (Tactical teleport only)**

> [!rule] **Tactical Teleportation Only**
> Teleportation is allowed **only as short‑range repositioning inside the current scene**.  
> Anything that **skips travel / exits a Zone / returns to the Train / jumps to a distant known place** is **not available** to PCs.

**Allowed (tactical use):**
- Teleport effects that end **within the same current scene** (the same party cluster’s immediate play-space).
- Use this for: reaching a catwalk, getting behind cover, crossing a gap, hitting a lever, escaping a melee pocket.

**Not allowed (travel bypass):**
- Any teleport that ends **outside the current scene**, moves you between **Zones**, jumps to a **known distant location**, returns you to the **Train**, or otherwise **bypasses travel challenges**.

**“Sealed barrier” clause (keeps it fair):**
- Tactical teleportation **cannot** cross a **sealed barrier** the scene treats as a hard boundary (locked vault partition, sealed bulkhead, isolated car segment, warded containment).

### 0.4.2 Safe‑Rest Bubbles & Rest Bypass — **LOCKED (No safe‑rest bubbles)**

> [!rule] **No Conjured Safe Rests**
> PCs cannot use spells/features/items to create a **guaranteed safe shelter** that makes resting “automatic” in hostile territory.  
> **Default rest venues** are the **Train**, a **Harmony sanctuary**, or a **cleared/secured node** the party has made safe.

**Premium rest protocol (recommended, low‑friction):**
1) **Declare the venue:** Train / Sanctuary / Cleared Node.  
2) **Confirm you’re not “Under Threat/Alarm.”** If there’s active pursuit, combat, or lockdown, resting is off the table.  
3) **Set a watch (if not on the Train):** pick who watches first/second (simple rotation).  
4) **One camp action each (optional):** *Sleep* (default), *Watch*, *Treat*, *Repair*, *Plan*, *Forage*.  
   - If you **leave the node to hunt/forage**, you’re **not resting** — you traded recovery for resources.

### 0.4.3 Camp Supplies (CS) & Long Rest Gate — **LOCKED (100 CS)**

> [!rule] **Camp Supplies (CS)**
> **Camp Supplies** are an abstract party resource gained from loot/items/roll tables (example: **Chocolate = +5 CS**).  
> To begin a **Long Rest**, the party must have **100 CS** available and **spend 100 CS** when the long rest starts.

**Defaults:**
- **CS is party-owned** (not “per character”).
- **Short rests cost 0 CS.**
- If the long rest is **interrupted**, CS is **not refunded**.

**Magic interaction (prevents bypass):**
- Conjured food/water/shelter **does not generate CS** and **cannot be converted into CS**.
- Long rests still require a **safe venue** (Train / sanctuary / cleared node).

### 0.4.4 Mass Summoning & Swarm Load — **LOCKED (No Swarm Load)**

> [!rule] **No Swarm Load (Reduced Summons)**
> This realm is **overcrowded with souls**. Summoning magic can only pull through a **single Reduced** manifestation at a time.  
> **Each PC may control at most 1 Combat Ally** in a scene.

**Combat Ally cap (LOCKED):**
- A **Combat Ally** is any additional creature/object/effect you control that takes meaningful actions in combat (attacks, forced saves, grapples, Help, etc.).
- **You can have 1 Combat Ally max.** If you already have one (companion, summon, animated object, controlled undead, etc.), you can’t create another.

**What this means for spells/features:**
- If an effect can be used to create **one** ally OR **many**, you must use the **one‑ally** option.
- If an effect always creates **many** allies and can’t be reduced to one, it is **unavailable** to PCs (auto‑swap applies).

> [!note] **Campaign Exemption — PAVNN**
> **PAVNN** is a Train system/crew asset, not a summoned soul.  
> It can be **controlled by any player** (pass the baton as needed) and **does not count** toward any PC’s 1‑Combat‑Ally cap.

### 0.5 Game mode — **LOCKED (Core default; Hardcore optional)**
- **Default:** **Round‑Trip (Core)** — standard/cinematic play.
- **Optional (niche difficulty toggle):** **End of the Line (Hardcore)** — gritty/survival overlay.

> [!tldr] **Mode rule**
> Modes are chosen at Session Zero (**table‑wide**). Only rules explicitly marked with a mode switch change.

### 0.6 Starting level + leveling — **LOCKED (Start at Level 1; Milestones)**
- **Starting level:** **Level 1**
- **Leveling method:** **Milestone leveling** (by chapter/canto beats)

> [!tldr] **Cadence (design target)**
> - **Typical:** ~**+1 level per chapter/canto**.
> - **Onboarding fast track:** In **Chapter 1**, characters advance to **Level 3** (two milestone level-ups: **1→2** early, **2→3** by chapter end).

**When does a level-up apply? (table rule)**
- A level-up is awarded when the DM declares a milestone.
- Apply the new level’s features **at the next safe downtime** (usually on the **Train** or at a **cleared node**). If a milestone hits at session end, level-up happens **between sessions**.


### 0.7 Hit Points (HP) — **LOCKED (Fixed Average)**

> [!rule] **HP progression (no rolling)**
> - **Level 1:** take your class **maximum Hit Die** + your **CON modifier**.  
> - **Levels 2+:** add your class **fixed average** HP each level + your **CON modifier**.  
> - **No HP rolling** at level-ups.

**Fixed averages by Hit Die:**
- **d6 → 4**  
- **d8 → 5**  
- **d10 → 6**  
- **d12 → 7**

**Class Hit Dice (reference):**
| Class | Hit Die | Fixed avg/level (2+) |
|---|---:|---:|
| Barbarian | d12 | 7 |
| Fighter / Paladin / Ranger | d10 | 6 |
| Bard / Cleric / Druid / Monk / Rogue / Warlock | d8 | 5 |
| Sorcerer / Wizard | d6 | 4 |



---

## 1) Player Character Creation Steps (A → Z) — WORKING ORDER

Use this order at the table. Steps marked **LOCKED** are ready; others will be filled in as we finalize.

1) Pick **Soul Index** (Boiler / Crown / Maw / Mirror) — **LOCKED package** (see §2.1)  
2) Pick **Body Tag** — **LOCKED:** **[FLESH]** or **[STEEL]** (see §2.2)  
3) Pick **Background** — **LOCKED:** choose from curated list (see §2.3). Backgrounds grant either (a) a micro‑boost, or (b) a Discipline license (rare).
4) Pick **Class** — **LOCKED roster:** any of the 12 classic 5e classes (see §4)  
5) Choose **Ability scores** — **LOCKED:** Standard Array default; optional Point Buy (see §3)  
6) Pick **trained skills** — **LOCKED method:** class‑unique AE picks **+ 2 General Training picks** (see §5)  
7) Choose **1 of your class’s 2 Class Loadouts** + your **Background Kit**, then apply **Simple Inventory (BL)** — **PARTIALLY LOCKED** (method locked; loadout/kit contents TBD)  
8) Calculate **derived stats** (HP is **LOCKED**; AC/saves/PB/etc. TBD) — see §0.7 for HP  
9) Set **AE trackers** — TBD (Soul Debt start value is in the Revival rules)  
10) Finalize **identity hooks** (why you’re on the Train) — TBD  

---

## 2) Ancestry Layer — **LOCKED (Soul Index + Body Tag + Curated Backgrounds)**

### 2.1 Soul Indices — **LOCKED package**
You choose **one** Soul Index: **Boiler / Crown / Maw / Mirror**.

- The full Soul Index text is in: **[[Ancestry Layer - Soul Indices + Body Tags v2]]**  
- **Maw passive override (campaign):** replace “Hidden Pocket (0 BL stash item)” with **+1 extra pocket (5 pBL)**.

> [!note] **Why Soul Index is its own layer**
> Soul Index is separate from class and separate from Body Tags. It defines your “soul pattern” and grants themed skills/actives/drawbacks.

### 2.2 Body Tags — **LOCKED: [FLESH] & [STEEL] (Mechanical tags)**

> [!rule] **Body Tags are cross‑system tags**
> Body Tags appear on **items, hazards, doors, implants, wards, and access checks**.  
> They are not “flavor-only” — they are hooks used across the entire campaign.

**At character creation:**
- Choose **one** Body Tag: **[FLESH]** *or* **[STEEL]**.

**(Rare) Story changes:**
- A character may gain the other tag later via major story events; if so, you count as **both** tags.

**Tag grammar (for rules text):**
- **Requirement:** “Requires **[STEEL]**” → you must have [STEEL] to use/pass.
- **Modifier:** “If **[FLESH]**: +1 OFS” → apply the bonus if you have [FLESH].
- **Restriction:** “**[FLESH]-only (no [STEEL])**” → you must have [FLESH] and must not have [STEEL].

> [!note] **No hidden math**
> Body Tags do nothing by themselves unless a rule calls them out. Their power comes from **consistent tagging** across systems.

### 2.3 Backgrounds — **LOCKED (Curated list only)**

> [!tldr] **Pick 1 Background**
> Backgrounds are narrative-first. Your Background gives you:
> - **A Background Kit** (starting gear bundle; stacks with class gear), and
> - **One Background Benefit** (choose the one written on the background):
>   - **Most backgrounds:** a **micro‑boost** (Skill Focus or Scene Push).
>   - **Rare specialized backgrounds:** a **Discipline license** (**[MED] / [EOD] / [RCP]**) instead of a micro‑boost.
> 
> The **Background Benefit** is skill-check only (no attacks, damage, HP, or movement changes).

**Micro‑boost patterns (LOCKED; used by most backgrounds):**
- **Skill Focus (static):** pick a narrow trigger → gain **+1 OFS (R)** on that skill check when the trigger applies.  
- **Scene Push (spike):** pick a narrow trigger → **1× per scene**, add **+1d4 OFS (R)** to that skill check when the trigger applies.

> [!rule] **Discipline Backgrounds (licenses)**
> Some **specialized** backgrounds grant a **Discipline license** instead of a micro‑boost.
> - Choose **one** Discipline: **[MED]** MedTech, **[EOD]** Demolitions, or **[RCP]** Railcraft.
> - If your background grants a Discipline, you **do not** gain Skill Focus/Scene Push from that background.
> - These backgrounds are **rare** and must be chosen from the curated list.

**Discipline Backgrounds (TBD list)**
- **[MED]** (name TBD) — grants **[MED]** instead of a micro‑boost.
- **[EOD]** (name TBD) — grants **[EOD]** instead of a micro‑boost.
- **[RCP]** (name TBD) — grants **[RCP]** instead of a micro‑boost.

#### Curated Background List (v1)

> Use the list below. If something truly doesn’t fit a character concept, the DM may re-skin a background’s **fiction** while keeping its **exact micro‑boost**.

##### Boiler‑leaning backgrounds
1) **Engine Stoker** — you kept the heat alive.  
   - **Kit:** *Engine Stoker Kit* (TBD contents)
   - **Skill Focus:** **Pry (PRY)** when forcing jammed levers, stuck hatches, warped mechanisms, or seized machinery under pressure.

2) **Smokejumper** — you ran into danger when others ran out.  
   - **Kit:** *Smokejumper Kit* (TBD contents)
   - **Scene Push:** **Soul Grit (SLG)** when pushing through pain/fear/smoke to rescue, carry, stabilize, or keep moving in a hazard scene.

3) **Wrecker Crew** — you made doors where there were walls.  
   - **Kit:** *Wrecker Crew Kit* (TBD contents)
   - **Scene Push:** **Pry (PRY)** when breaching, clearing rubble, or creating an entry route in a time‑tight scene.

##### Crown‑leaning backgrounds
4) **Contract Clerk** — you know the rules people pretend don’t exist.  
   - **Kit:** *Contract Clerk Kit* (TBD contents)
   - **Skill Focus:** **Influence (IFC)** when citing written rules/contract terms/badges/procedure to compel cooperation.

5) **Escort Captain** — you got people through.  
   - **Kit:** *Escort Captain Kit* (TBD contents)
   - **Scene Push:** **Influence (IFC)** when directing a coordinated move (evacuation, escort, extraction) in a scene with real stakes.

6) **Station Liaison** — you speak “civilization” fluently.  
   - **Kit:** *Station Liaison Kit* (TBD contents)
   - **Scene Push:** **Guile (GIL)** when maintaining a cover story or smoothing a negotiation by controlled deception in a social scene.

##### Maw‑leaning backgrounds
7) **Salvage Runner** — you learned to take value fast.  
   - **Kit:** *Salvage Runner Kit* (TBD contents)
   - **Scene Push:** **Tinker (TNK)** when bypassing a lock/panel/rig to extract loot or supplies in a hostile/limited‑time scene.

8) **Black‑Market Appraiser** — you can tell junk from treasure.  
   - **Kit:** *Black‑Market Appraiser Kit* (TBD contents)
   - **Skill Focus:** **Riddlecraft (RDL)** when identifying value by reading patterns: maker marks, serial codes, ward‑glyph tells, counterfeit seams, or “too perfect” fakes.

9) **Quartermaster** — you kept the crew fed and kitted.  
   - **Kit:** *Quartermaster Kit* (TBD contents)
   - **Skill Focus:** **Tinker (TNK)** when inventorying, rationing, bundling, or stretching supplies (including CS caches) without waste.

##### Mirror‑leaning backgrounds
10) **Drift Scout** — you lived by routes and angles.  
   - **Kit:** *Drift Scout Kit* (TBD contents)
   - **Skill Focus:** **Stillsense (STL)** when mapping safe paths, reading patrol loops, or moving unseen through watched space.

11) **Ward Reader** — you learned what the world is *saying* underneath.  
   - **Kit:** *Ward Reader Kit* (TBD contents)
   - **Skill Focus:** **Godsight (GDS)** when reading wards/sanctity/spoor to infer safety, traps, or the “shape” of a supernatural boundary.

12) **Identity Splitter** — you survive by being someone else.  
   - **Kit:** *Identity Splitter Kit* (TBD contents)
   - **Scene Push:** **Guile (GIL)** when impersonating, maintaining a false identity, or talking your way past scrutiny in a social scene.

---

## 3) Ability Scores — **LOCKED (Array default; optional Point Buy)**

> [!tldr] **Default**
> Use the **Standard Array**: **15, 14, 13, 12, 10, 8**.

> [!tldr] **Optional Variant (advanced)**
> If the table agrees, you may use **Point Buy (27 points)** instead of the array.

### 3.1 Standard Array (default)
Assign the numbers **15, 14, 13, 12, 10, 8** to your six abilities: **STR, DEX, CON, INT, WIS, CHA**.

### 3.2 Point Buy (optional)
- Start with all six abilities at **8**.
- You have **27 points** to spend to raise scores.
- You can’t raise a score above **15** using point buy (before any later bonuses).

**Point cost table:**
| Score | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| Cost | 0 | 1 | 2 | 3 | 4 | 5 | 7 | 9 |

### 3.3 Not used
- **Rolled stats are not used** in this campaign.

---

## 4) Class Layer — **LOCKED (12 classes; official subclasses)**

> [!tldr] **Pick 1 class.**
> All 12 classic 5e classes are allowed. Spell/feature choices are still subject to the AE policy module (§0.4 and §7).  
> If something you choose is blocked, the **No Trap Picks / Auto‑Swap** rule applies.

### 4.1 Allowed classes — **LOCKED**
- **Barbarian**  
- **Bard**  
- **Cleric**  
- **Druid**  
- **Fighter**  
- **Monk**  
- **Paladin**  
- **Ranger**  
- **Rogue**  
- **Sorcerer**  
- **Warlock**  
- **Wizard**  

### 4.2 Subclasses & sources — **LOCKED (Any official WotC 5e subclass; DM approves)**

**Allowed sources (LOCKED):**
- Any **official Wizards of the Coast** 5e subclass is allowed (PHB and official expansions).  
- **No homebrew / third‑party** subclasses by default (the DM may add later).

**Version rule (LOCKED):**
- This campaign uses a **5e (2014) baseline**. If a subclass exists in multiple versions, use the **2014‑era version** unless the DM explicitly opts into a newer rewrite.

**When do you choose your subclass? (2014 timing reference)**
You gain subclass features only when your class reaches the subclass level:

- **Level 1:** Cleric (Domain), Sorcerer (Origin), Warlock (Patron)  
- **Level 2:** Druid (Circle), Wizard (Tradition/School)  
- **Level 3:** Barbarian, Bard, Fighter, Monk, Paladin, Ranger, Rogue  

> [!note] **Fast‑track to Level 3**
> Because Chapter 1 advances to Level 3 quickly, you may **pre‑pick** your subclass at character creation for planning, but you only gain its features at the appropriate level.

**Policy interaction (LOCKED):**
- Subclass features/spells are still subject to the AE policy module (§0.4 and §7).  
- If a subclass grants a **blocked spell/feature**, you **auto‑swap** to a valid official option of the same type/level, with DM approval (No Trap Picks).


---

## 5) Skills, Awareness & Training — **LOCKED framework (class uniques)**

Use the full skill definitions and Stealth/Influence procedures in: **[[(Rule) 2. Skills & Postures]]**.

> [!rule] **Awareness replaces Perception**
> Use **Awareness (WIS)** for active and passive sensing. Never stack Perception + Awareness.

### 5.1 What “trained” means in AE (5e‑style)
- If you are **trained** in an AE skill, add your **Proficiency Bonus (PB)** to checks using that skill.  
- If you are **not trained**, you do **not** add PB.  
- **Passive Awareness** uses PB **only if you are trained in Awareness** (see Skills & Postures).  
- Soul Index **Skill Imprints** and Background micro‑boosts grant **Offsets (OFS)** and **do not** make you trained by themselves.

### 5.2 Trained skill picks by class — **LOCKED (Class Uniques)**
At Level 1, choose trained skills from your class’s AE list:

| Class | Trained Skills | Choose from… |
|---|---:|---|
| **Barbarian** | 2 | Pry (PRY), Rigging (RGG), Resilience (RES), Soul Grit (SLG), Awareness, Influence (IFC) |
| **Bard** | 3 | **Any 3** AE skills (plus Awareness) |
| **Cleric** | 2 | Godsight (GDS), Riddlecraft (RDL), Influence (IFC), Resilience (RES), Soul Grit (SLG), Awareness |
| **Druid** | 2 | Stillsense (STL), Godsight (GDS), Resilience (RES), Riddlecraft (RDL), Awareness, Rigging (RGG) |
| **Fighter** | 2 | Pry (PRY), Rigging (RGG), Acrobatics (ACR), Resilience (RES), Awareness, Systems (SYS), Influence (IFC) |
| **Monk** | 2 | Acrobatics (ACR), Resilience (RES), Soul Grit (SLG), Awareness, Godsight (GDS), Guile (GIL), Stillsense (STL) |
| **Paladin** | 2 | Influence (IFC), Godsight (GDS), Resilience (RES), Soul Grit (SLG), Pry (PRY), Awareness, Riddlecraft (RDL) |
| **Ranger** | 3 | Awareness, Stillsense (STL), Acrobatics (ACR), Resilience (RES), Tinker (TNK), Guile (GIL), Godsight (GDS), Rigging (RGG) |
| **Rogue** | 4 | Acrobatics (ACR), Tinker (TNK), Systems (SYS), Guile (GIL), Influence (IFC), Awareness, Stillsense (STL), Riddlecraft (RDL), Pry (PRY) |
| **Sorcerer** | 2 | Influence (IFC), Guile (GIL), Stillsense (STL), Riddlecraft (RDL), Godsight (GDS), Awareness |
| **Warlock** | 2 | Influence (IFC), Guile (GIL), Godsight (GDS), Riddlecraft (RDL), Systems (SYS), Stillsense (STL), Awareness |
| **Wizard** | 2 | Systems (SYS), Stillsense (STL), Riddlecraft (RDL), Godsight (GDS), Awareness, Influence (IFC) |

> [!note] **Why “class uniques”?**
> It keeps character creation clean: you pick skills that exist in AE, not 5e skills that need translation.

### 5.3 General Training (Background Skills Equivalent) — **LOCKED (+2)**
After you pick your class-trained skills, choose **2 additional AE skills** to become **trained** in.

- These represent your character’s **life skills** from before the Train.
- You may choose **any** AE skills (including Awareness).
- **No duplicates:** if you would gain a trained skill you already have, pick a different skill instead.

> [!note] **Hardcore toggle (optional)**
> If the table enables **End of the Line (Hardcore)**, you may reduce this to **+1 General Training pick** instead of +2.

### 5.4 Disciplines (licenses) — **PARTIALLY LOCKED**
AE also uses **Disciplines** (binary licenses): **[MED]** MedTech · **[EOD]** Demolitions · **[RCP]** Railcraft.

**Locked rule (how you get them at Level 1):**
- **No one gets a Discipline by default.**
- Only **select specialized backgrounds** grant **one Discipline**, and they grant it **instead of** a background micro‑boost.

**TBD later:**
- Which backgrounds grant which Discipline.
- Whether disciplines can also be earned via training, faction contracts, gear certifications, or Train upgrades.


## 6) Inventory & Starting Gear — **PARTIALLY LOCKED (Background Kits)**

> [!tldr] **Starting Gear = 2 Kits**
> At Level 1, your equipment comes from:
> 1) your **Class Loadout** (choose **1 of 2** for your class; contents TBD), and
> 2) your **Background Kit** (life-before-the-Train gear; **LOCKED method**).
> 
> This is fast, themed, and avoids “shopping session” friction.

### 6.1 Background Kits — **LOCKED (method)**
Every curated Background includes a **Background Kit** (a short gear bundle). This kit is **always gained at character creation** and stacks with class gear.

**Design constraints (premium fairness):**
- Kits should be **roughly equal value/weight** across backgrounds.
- Kits should be **mostly utility/survival/social tools**, not best-in-slot combat upgrades.
- Kits may include small “quality of life” items (light source, rope/tape, notebook, basic tools) and a little **Camp Supplies**.

**Swap rule (player-friendly):**
- You may swap a kit item for a **close equivalent** (same tier/size) with DM approval.
- No selling the kit at Session 1 to min-max into optimal gear.

### 6.2 Class Loadouts — **LOCKED (2 per class)**
Each class has **exactly 2 curated Class Loadouts**. At character creation, pick **one**.

**What a Class Loadout contains (design intent):**
- Your primary combat gear (weapons/armor/shield OR spell focus + basic protections)
- A small “field pack” (ammo/consumables/tools appropriate to the class)
- Converted to AE **Ballast (BL)** + **pocket items (pBL)** using Simple Inventory

**Balance rules (premium fairness):**
- The two loadouts should be **sidegrades**, not “best vs worst.”
- Loadouts should avoid granting unique, campaign-defining utility (that belongs in Background Kits, story rewards, or licenses).

**Placeholder roster (items TBD):**
| Class | Loadout A | Loadout B |
|---|---|---|
| Barbarian | TBD | TBD |
| Bard | TBD | TBD |
| Cleric | TBD | TBD |
| Druid | TBD | TBD |
| Fighter | TBD | TBD |
| Monk | TBD | TBD |
| Paladin | TBD | TBD |
| Ranger | TBD | TBD |
| Rogue | TBD | TBD |
| Sorcerer | TBD | TBD |
| Warlock | TBD | TBD |
| Wizard | TBD | TBD |

### 6.3 Inventory tracking — **uses Simple Inventory**
Convert your starting gear into **Ballast (BL)** and **pocket items (pBL)** per [[(Rule) 4. Simple Inventory]].

---

## 7) Revival / Death / Printing — **LOCKED (Train-only resurrection policy)**

### 7.1 The core promise (player-facing)
- **You can go down like normal 5e:** at **0 HP** you make death saving throws until stabilized or dead.  
- **If you die, you come back via the Train.** There is **no in-field resurrection magic** in this campaign.

### 7.2 TRAIN‑ONLY RESURRECTION (hard rule)
> [!rule] **Train‑Only Resurrection**
> **Only the Train can return a dead player character to play** (Quantum Print).  
> **No spell, feature, ritual, boon, or magic item can return a dead creature to life.**

### 7.3 Enforcement method (player-friendly)
> [!important] **No trap picks**
> Resurrection effects are **unavailable** to PCs (auto‑swap applies per §0.4).

---

## 8) One‑Page Player Checklist — TBD

---

## Appendix A — Reference Links (vault)
- [[(Reference) 5e Baseline (SRD 5.1)]]  
- [[Ancestry Layer - Soul Indices + Body Tags v2]]  
- [[(Rule) 1. Revival]]  
- [[(Rule) Injuries]]  
- [[(Rule) 2. Skills & Postures]]  
- [[(Rule) 4. Simple Inventory]]  
- [[(Rule) Chaos and Harmony]]  
- [[(Rule) 8. Hardcore overlay]]  
- [[(Procedure) Immediate Action Zone]]  