# Apocalypse Express — Scene Tag System

Use this file as a reference when creating or reading scene blocks in Obsidian.

Every scene uses **five tag categories**:

- **TYPE** – what players mainly do in the scene  
- **LENGTH** – how big the scene is at the table  
- **DANGER** – how much it can hurt them / special safety states  
- **PURPOSE** – what job the scene does in the story  
- **TEACHING** – how much rules load / onboarding it carries  

You can assign **multiple tags per category** where it makes sense (e.g. `TYPE: Talk, Explore`), with the exception that **LENGTH is usually a single tag**.

In scene headers, use this pattern:

> [!summary] **SCENE A# — Title**  
> TYPE: Talk, Explore  
> LENGTH: Short  
> DANGER: Safe  
> PURPOSE: Intro  
> TEACHING: Tutorial


---

## 1. TYPE — What players mainly do

Use TYPE to describe the dominant activities in the scene.  
Pick **1–3** tags from this list:

1. **Talk**  
   Social interaction: conversations, negotiations, interrogation, Lucifer, politics, etc.

2. **Explore**  
   Investigation and environment interaction: searching, examining, trying things, exploring spaces, “what does this do?”.

3. **Fight**  
   Combat and direct physical conflict: weapons out, attacks, tactical positioning, chases treated as combat.

4. **Travel**  
   Movement is the focus: journeys, travel montages, crossing hostile terrain or weird space (including some train segments).

5. **Puzzle**  
   The main challenge is solving something non-obvious: logic puzzles, ritual sequences, mechanical contraptions, structured social puzzles.

**Examples**

- Null wake-up: `TYPE: Talk, Explore`  
- Dam core battle: `TYPE: Fight`  
- Orb mechanism chamber: `TYPE: Explore, Puzzle`  
- Long train ride montage with RP: `TYPE: Travel, Talk`


---

## 2. LENGTH — How big the scene is

Use LENGTH to indicate expected table time / complexity.  
Pick **exactly one** tag:

1. **Very Short**  
   - 1 quick beat or vignette  
   - Roughly 5–10 minutes

2. **Short**  
   - Small scene with one clear interaction or micro-challenge  
   - Roughly 10–20 minutes

3. **Medium**  
   - Standard scene with several blocks  
   - Roughly 20–45 minutes

4. **Long**  
   - Major scene, often anchoring a good chunk of a session  
   - Roughly 45–90 minutes

5. **Very Long**  
   - Multi-phase or multi-session set-piece  
   - Can easily run 90+ minutes if fully played


---

## 3. DANGER — How bad it can get (and special safe states)

Use DANGER to show how much real risk the PCs face, and to mark special "side states" like Homebase or Timed.

Pick **1–2** tags from this list:

1. **Safe**  
   - No lasting mechanical harm  
   - No real HP loss, Injuries, or campaign-warping consequences  
   - Tension is purely narrative/mood

2. **Risky**  
   - Real setbacks are possible: HP loss, minor Injuries, bad flags, resource drain  
   - Generally recoverable with time, healing, or smart play

3. **Deadly**  
   - PCs can die or suffer major, hard-to-reverse consequences  
   - Boss fights, catastrophic failures, key mission-loss moments

4. **Homebase**  
   - Functional hub or safe haven for now: healing, planning, shopping, social hub  
   - Typically combined with **Safe** or sometimes **Risky**  
   - Example: `DANGER: Safe, Homebase` for the train bar when nothing is attacking

5. **Timed**  
   - There is an active timer, countdown, or chase pressure in the fiction  
   - Combine with Risky/Deadly, e.g. `DANGER: Risky, Timed` or `Deadly, Timed`

**Examples**

- Gossip Car: `DANGER: Safe, Homebase`  
- Dam interior fight (no timer): `DANGER: Risky`  
- Orb cradle meltdown with countdown: `DANGER: Deadly, Timed`


---

## 4. PURPOSE — What job the scene does in the story

Use PURPOSE to describe the narrative role of the scene within a canto or arc.

Pick **1–2** tags from this list:

1. **Intro**  
   - First contact with a place, concept, NPC, or act  
   - Hooks and framing

2. **Setup**  
   - Prepares a major action: briefings, planning, travel, soft foreshadowing, positioning the PCs

3. **Core**  
   - Main “doing the job” scenes: operations, missions, dungeons, major investigations, key combats

4. **Climax**  
   - Peak confrontation or turning point of the arc  
   - Bosses, critical choices, pivotal switches, major pacts

5. **Aftermath**  
   - Fallout and processing: debrief, downtime, recovery, loot, consequences  
   - Often leads into the next Intro/Setup

**Examples**

- Null wake-up: `PURPOSE: Intro`  
- Gossip Car (tickets): `PURPOSE: Setup`  
- Station seize: `PURPOSE: Core`  
- Orb battle: `PURPOSE: Core, Climax`  
- Post-Dam train debrief: `PURPOSE: Aftermath, Setup`


---

## 5. TEACHING — How much rules load this scene carries

Use TEACHING to show how much *rules learning* happens in this scene.  
This is about **mechanics**, not lore.

Pick **1–2** tags:

1. **None**  
   - Uses only systems the table already knows  
   - No rules explanation needed

2. **Reminder**  
   - Briefly reminds the table of an existing subsystem  
   - “Same CDR rules as before, remember X and Y.”

3. **Light**  
   - Introduces a small twist or new rule element  
   - One extra roll type, a simple new procedure, or a minor variation

4. **Tutorial**  
   - First time a **major new system or procedure** is taught step-by-step  
   - Example: Revival, Chaos/Drift/Harmony, Injuries, Soul Siphon, new currencies

5. **Complex**  
   - Heavy mechanical scene: multiple systems interact or procedures are dense  
   - Not necessarily new rules, but high GM/rules load

**Examples**

- Null wake-up: `TEACHING: Tutorial` (Null physics, System OFF)  
- Obelisk & Postcards: `TEACHING: Tutorial` (Postcard, countdown behaviour)  
- Gossip Car & Tickets: `TEACHING: Light` (ticket procedure)  
- First full combat with CDR + Injuries: `TEACHING: Tutorial, Complex`  
- Late-campaign boss using many known systems: `TEACHING: Complex`


---

## 6. Example: Scene Header with Tags

Example for **Scene A4 — Gossip Car & Golden Tickets**:

```markdown
> [!summary] **SCENE A4 — Gossip Car & Golden Tickets**  
> TYPE: Talk, Explore, Downtime  
> LENGTH: Medium  
> DANGER: Safe, Homebase  
> PURPOSE: Setup  
> TEACHING: Light
```

You can reuse this pattern for every scene in Apocalypse Express so a GM sees, at a glance:

- What players mainly do (TYPE)  
- How big the scene is (LENGTH)  
- How dangerous or safe it is (DANGER)  
- What its narrative job is (PURPOSE)  
- How much rules explanation it needs (TEACHING)
