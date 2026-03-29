---
created: 2025-08-28
schema: apex-docs-v1
code: RUL-BAS-TCS-5
title: "Triad Codes — House 37,36 (default) + Strict 7064 (optional)"
type: rule
audience: author
status: final
version: 2.3
updated: 2025-11-17
tier: core
tags: [rule/codes, system/ids, obsidian]
aliases:
  - "Triad Codes Standard"
  - "Triad Codes"
summary: "🏷️ One ID to tag everything: `DDD-CCC-EEE-C` with a base‑36 check. 🧮 Default **House 37,36** (matches the vault); 🔒 optional **Strict 7064** if you migrate. 🧭 Focus codes use `XXX`. 🚫 Avoid `I/O/Q`. 🧰 Templater/Dataview validators included."
---

# Triad Codes
^top

> [!summary]+ 🧭 On this page
> [[#^format|1️⃣ Format & Validation]] · [[#^domains|2️⃣ Domains]] · [[#^collections|3️⃣ Collections]] · [[#^examples|4️⃣ Examples]] · [[#^howto|5️⃣ How‑Tos]] · [[#^validators|6️⃣ Validators]] · [[#^guardrails|7️⃣ Guardrails]] · [[#^accept|✅ Acceptance]] · [[#^changes|🔄 Changelog]]

> [!tldr] 💎 **TL;DR — What this rule does**
> **Triad Codes** are the **single ID** for rules, scenes, items, NPCs, locations, clocks, and tables.  
> **Shape:** `DDD-CCC-EEE-C` → three 3‑char segments + **1‑char check**.  
> **Check (default):** **House 37,36** (**matches existing codes in the vault**).  
> **Optional:** **Strict ISO/IEC 7064 MOD 37,36** (only with a full‑vault migration).  
> **Focus/index pages:** Use **`XXX`** placeholders (inactive tiers only).  
> **Style:** Choose **one** `EEE` style per collection (**Alpha** `AAA`… *or* **Numeric** `001`…); **don’t mix**.  
> **Copy style:** Always **hyphens** (`-`). You *may* render middle dots (`·`) in print/PDF.

---

## 1) Format & Validation ^format

### A) Code shape
- `DDD` = **Domain** (3 alnum; e.g., `SCN`, `RUL`)  
- `CCC` = **Collection** (3 alnum; e.g., `PRL`, `BAS`)  
- `EEE` = **Element** (3 alnum; e.g., `001`, `AAA`)  
- `C`   = **Check** (1 alnum)  
- **Uppercase** only; separator is **hyphen** `-`. *(Print may show `DDD·CCC·EEE·C`; copy/paste should keep hyphens.)*

### B) Validation flow (always the same)
1) Take `DDD-CCC-EEE`, **strip hyphens**, uppercase → e.g., `SCNPRL001`.  
2) Compute the **check char** using your selected mode.  
3) Append `-C` and compare. Match → **valid**; mismatch → **invalid**.

### C) Check modes (pick one)
- **House 37,36 (default; matches vault):**  
  Start `p = 36`. For each char value `v ∈ {0..35}`, `p = ((p + v) * 2) % 37`.  
  Final `c = (37 - p) % 37` (map `36 → 0`).  
- **Strict 7064 (optional):**  
  Start `p = 36`. For each `v`, `p = (2 * p + v) % 37`.  
  Final `c = (37 - p) % 37` (map `36 → 0`).  
  *Strict produces **different** checks; adopt only with a full migration.*

> [!warning] **Guardrails**
> `XXX` is **reserved** for inactive tiers on **index/focus pages** only.  
> Prefer to **avoid `I`, `O`, `Q`** in `DDD/CCC/EEE` (legibility). The **check** may be any `0–9 A–Z`.

---

## 2) Domains ^domains

**Use on index/folder cards.** Each shows its **focus code** (`DDD-XXX-XXX-C`). All checks below are **precomputed under House 37,36**.

| Domain | Purpose | **Focus Code** |
|---|---|---|
| **RUL** | Rules library (modules, packs) | **RUL-XXX-XXX-N** |
| **CAN** | Canvases (importable docs) | **CAN-XXX-XXX-O** |
| **SCN** | Scenes (playable runtime) | **SCN-XXX-XXX-F** |
| **ACT** | Acts / adventure arcs | **ACT-XXX-XXX-R** |
| **ENC** | Encounters (combat / social / chase) | **ENC-XXX-XXX-3** |
| **LOC** | Locations | **LOC-XXX-XXX-B** |
| **NPC** | Characters | **NPC-XXX-XXX-Q** |
| **FCT** | Factions | **FCT-XXX-XXX-K** |
| **ITM** | Items & boons | **ITM-XXX-XXX-N** |
| **CLK** | Clocks | **CLK-XXX-XXX-Y** |
| **TBL** | Random tables | **TBL-XXX-XXX-F** |
| **HND** | Handouts | **HND-XXX-XXX-4** |
| **NDX** | Indices & registries | **NDX-XXX-XXX-3** |
| **REF** | Reference docs & guides | **REF-XXX-XXX-3** |
| **PKG** | Rule packs / presets | **PKG-XXX-XXX-T** |
| **VTT** | VTT integrations | **VTT-XXX-XXX-J** |
| **SND** | Audio assets | **SND-XXX-XXX-X** |
| **ART** | Art & visual assets | **ART-XXX-XXX-Z** |
| **SYS** | System/ops (configs, pipelines) | **SYS-XXX-XXX-X** |

> [!tip] 🧭 **Focus codes (`XXX`)**
> Use **only** on index/focus pages to stand in for real collections/elements.

---

## 3) Core Collections ^collections

**Use on collection cards.** Each shows `DDD-CCC-XXX-C` and a default Element style so lists sort cleanly.

| **Collection Focus** | Domain → Collection | Default `EEE` | Use |
|---|---|---:|---|
| **RUL-BAS-XXX-R** | Rules → Basic Core | Alpha | Baseline reusable rules. |
| **RUL-ZER-XXX-7** | Rules → Zero‑Sheet | Alpha | Session‑zero onboarding. |
| **RUL-ADV-XXX-L** | Rules → Advanced | Alpha | Optional systems (stress/sanity). |
| **RUL-ALT-XXX-J** | Rules → Alternative | Alpha | Variants/house rules. |
| **RUL-TMP-XXX-J** | Rules → Templates | Alpha | Check/clock authoring patterns. |
| **CAN-BAS-XXX-S** | Canvases → Basic | Alpha | “Rules Canvas — Basic Core.” |
| **CAN-WRD-XXX-8** | Canvases → World | Alpha | World bible (lore/tone/themes). |
| **CAN-SYS-XXX-M** | Canvases → System | Alpha | SRD / mechanics quick‑ref. |
| **CAN-UIK-XXX-G** | Canvases → UI Kit | Alpha | Tokens, chips, layout parts. |
| **SCN-PRL-XXX-N** | Scenes → Prologue | Numeric | Prologue beats. |
| **SCN-A01-XXX-L** | Scenes → Act 01 | Numeric | Act 01 beats (ordered). |
| **SCN-A02-XXX-5** | Scenes → Act 02 | Numeric | Act 02 beats. |
| **SCN-A03-XXX-Q** | Scenes → Act 03 | Numeric | Act 03 beats. |
| **SCN-INT-XXX-R** | Scenes → Interludes | Numeric | Vignettes / montage beats. |
| **ACT-A01-XXX-X** | Acts → Act 01 | — | Act 01 overview/structure. |
| **ACT-A02-XXX-H** | Acts → Act 02 | — | Act 02 overview/structure. |
| **ACT-A03-XXX-1** | Acts → Act 03 | — | Act 03 overview/structure. |
| **ENC-PRL-XXX-B** | Encounters → Prologue | Numeric | Onboarding encounters. |
| **ENC-YRD-XXX-7** | Encounters → Yard | Numeric | Yard/platform conflicts. |
| **ENC-TRN-XXX-J** | Encounters → Train | Numeric | On‑train encounters. |
| **ENC-BRD-XXX-0** | Encounters → Boarding | Numeric | Boarding windows. |
| **ENC-SKM-XXX-R** | Encounters → Skirmish | Numeric | Quick conflicts. |
| **ENC-SOC-XXX-M** | Encounters → Social | Numeric | Social set‑pieces. |
| **ENC-CHS-XXX-F** | Encounters → Chase | Numeric | Chases/pursuits. |
| **LOC-STN-XXX-R** | Locations → Station | Numeric | Halls, platforms, cages. |
| **LOC-YRD-XXX-F** | Locations → Yard | Numeric | Sidings, cranes, bays. |
| **LOC-ENG-XXX-6** | Locations → Engine | Numeric | Engine rooms, cabs. |
| **LOC-CAB-XXX-1** | Locations → Cab | Numeric | Control cabins. |
| **NPC-CRE-XXX-G** | Characters → Crew | Alpha | Allies, porters, marshals. |
| **NPC-VIL-XXX-C** | Characters → Villains | Alpha | Antagonists. |
| **NPC-CNT-XXX-F** | Characters → Contacts | Alpha | Fixers, fences, informants. |
| **FCT-INF-XXX-Y** | Factions → Infernal | Alpha | Infernal Bureau & assets. |
| **FCT-RIV-XXX-S** | Factions → Rivals | Alpha | Rival crews/factions. |
| **FCT-REB-XXX-W** | Factions → Rebels | Alpha | Resistance cells. |
| **FCT-AUT-XXX-O** | Factions → Authority | Alpha | Marshals, magistrates. |
| **ITM-ART-XXX-C** | Items → Artifacts | Numeric | Artifacts / relics. |
| **ITM-GEA-XXX-F** | Items → Gear | Numeric | Gear & kits. |
| **ITM-BOO-XXX-D** | Items → Boons | Numeric | One‑use favors/edges. |
| **CLK-CAT-XXX-W** | Clocks → Catalog | Numeric | Reusable clock templates. |
| **CLK-SCB-XXX-9** | Clocks → Scene‑bound | Numeric | Clocks tied to scenes. |
| **CLK-TMP-XXX-U** | Clocks → Templates | Numeric | Clock authoring scaffolds. |
| **TBL-LUT-XXX-I** | Tables → Loot | Numeric | Loot tables. |
| **TBL-RUM-XXX-5** | Tables → Rumors | Numeric | Rumor/clue seeds. |
| **TBL-NAM-XXX-D** | Tables → Names | Numeric | Names by culture. |
| **HND-MAP-XXX-I** | Handouts → Maps | Alpha | Player maps/diagrams. |
| **HND-LTR-XXX-Y** | Handouts → Letters | Alpha | Diegetic letters/notes. |
| **HND-NTE-XXX-3** | Handouts → Notes | Alpha | GM notes / printable slips. |
| **NDX-FXR-XXX-U** | Indices → Effects | Alpha | Effect verbs & payloads. |
| **NDX-CLU-XXX-3** | Indices → Clues | Alpha | Breadcrumb index. |
| **REF-HOW-XXX-0** | Reference → How‑To | Alpha | GM craft & usage guides. |
| **REF-GDE-XXX-0** | Reference → Guides | Alpha | Campaign overviews. |
| **REF-SRD-XXX-L** | Reference → SRD | Alpha | Rules excerpts. |
| **PKG-BAS-XXX-X** | Packs → Basic | Alpha | Import Basic defaults. |
| **PKG-GRY-XXX-Z** | Packs → Gritty | Alpha | Gritty realism settings. |
| **PKG-NAR-XXX-L** | Packs → Narrative | Alpha | Narrative‑first settings. |
| **VTT-FND-XXX-Z** | VTT → Foundry | Alpha | Modules/macros. |
| **VTT-R20-XXX-0** | VTT → Roll20 | Alpha | Sheets/scripts. |
| **VTT-OBR-XXX-Q** | VTT → Owlbear | Alpha | Assets/workflows. |
| **SND-MUS-XXX-P** | Audio → Music | Alpha | Music cues by mood. |
| **SND-SFX-XXX-4** | Audio → SFX | Alpha | One‑shots/loops. |
| **SND-AMB-XXX-Q** | Audio → Ambience | Alpha | Ambient loops. |
| **ART-STY-XXX-N** | Art → Style | Alpha | Style guide/palette. |
| **ART-ICO-XXX-Z** | Art → Icons | Alpha | Iconography/tokens. |
| **ART-ILL-XXX-H** | Art → Illustrations | Alpha | Illustrations/frames. |
| **SYS-CFG-XXX-5** | System → Config | Alpha | Pipelines/configs. |
| **SYS-OPS-XXX-K** | System → Ops | Alpha | Ops runbooks. |

> [!info] **Element style rule**  
> Pick **one** `EEE` style per collection (Alpha *or* Numeric). Don’t mix under the same `DDD‑CCC`.

---

## 4) Element examples ^examples

*(Precomputed under **House 37,36** to match the live vault.)*

| Example code | Meaning |
|---|---|
| **SCN-PRL-001-2** | Prologue scene, beat **001** (numeric order). |
| **SCN-A01-001-0** | Act 01 scene, beat **001**. |
| **RUL-BAS-AAA-G** | Basic rules, module **AAA** (alpha style). |
| **RUL-BAS-AAB-E** | Basic rules, module **AAB**. |
| **ITM-ART-001-S** | Artifacts catalog, item **#001**. |
| **LOC-YRD-002-T** | Yard location, entry **#002**. |
| **NPC-VIL-AAA-1** | Villains roster, entry **AAA**. |
| **CLK-CAT-001-B** | Clock catalog, template **#001**. |
| **RUL-BAS-TCS-5** | **This rule** — Triad Codes. |

---

## 5) Quick How‑Tos ^howto

> [!example] 🗂️ **Create a Domain index card**  
> Title: `Scenes — Index`  
> Header code: **`SCN-XXX-XXX-F`**  
> Body: links to collections (e.g., **`SCN-PRL-XXX-N`**, **`SCN-A01-XXX-L`**).

> [!example] 🎬 **Create a Scene beat**  
> Header: `SCN-PRL-001-2 — Waking on the Between Platform`  
> Footer chips: `domain=scn • collection=prl • element=001 • check=2`

> [!tip] 🔢 **Sorting**  
> Use **Numeric** `EEE` for ordered things (beats: `001…999`).  
> Use **Alpha** `EEE` for modular catalogs (rules: `AAA, AAB…`).  
> **One style per collection.**

---

## 6) Validators & Templates ^validators

### A) **Templater JS** — compute the check char (House or Strict)
```js
// Mode: "house" (default; matches the vault) or "strict"
const MODE = "house"; // "house" | "strict"
const ALPH = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const clean = s => (s||"").toUpperCase().replace(/[^A-Z0-9]/g,"");

function checkChar(core){
  let p = 36;
  for (const ch of clean(core)) {
    const v = ALPH.indexOf(ch);
    if (MODE === "house") {      // p := ((p + v) * 2) % 37
      p = ((p + v) * 2) % 37;
    } else {                     // strict ISO/IEC 7064 MOD 37,36: p := (2p + v) % 37
      p = (2 * p + v) % 37;
    }
  }
  let c = (37 - p) % 37; if (c === 36) c = 0;
  return ALPH[c];
}

function withCheck(triadCore /* e.g., "SCN-PRL-001" */){
  return triadCore + "-" + checkChar(triadCore);
}

// Example (House): "SCN-PRL-001" -> "SCN-PRL-001-2"
console.log(withCheck("SCN-PRL-001"));
```

### B) **DataviewJS** — scan current file for Triads and validate
```dataviewjs
const MODE = "house"; // "house" | "strict"
const ALPH = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const clean = s => (s||"").toUpperCase().replace(/[^A-Z0-9]/g,"");
function checkChar(core){
  let p = 36;
  for (const ch of clean(core)){
    const v = ALPH.indexOf(ch);
    if (MODE === "house") { p = ((p + v) * 2) % 37; }
    else {                  p = (2 * p + v) % 37;   }
  }
  let c = (37 - p) % 37; if (c === 36) c = 0; return ALPH[c];
}
const re = /\b[A-Z0-9]{3}-[A-Z0-9]{3}-[A-Z0-9]{3}-[0-9A-Z]\b/g;
const lines = dv.current().file.content.split("\n");
for (const [i,line] of lines.entries()){
  const matches = line.matchAll(re);
  for (const m of matches){
    const code = m[0], core = code.slice(0,-2);
    const ok = code.endsWith(checkChar(core));
    dv.el("div", (ok?"✅ ":"❌ ") + code + "  —  line " + (i+1));
  }
}
```

### C) **Regex** (quick search)
```text
\b[A-Z0-9]{3}-[A-Z0-9]{3}-[A-Z0-9]{3}-[0-9A-Z]\b
```

---

## 7) Guardrails & Conventions ^guardrails

- **Uppercase everywhere.** Normalize on paste before validating.  
- **Avoid `I`, `O`, `Q`** in **DDD/CCC/EEE** (ambiguous glyphs). The **check** may be any `0–9 A–Z`.  
- **Uniqueness:** each `DDD-CCC-EEE` must be unique campaign‑wide.  
- **Reserved:** `XXX` is **inactive only**—never a real collection or element.  
- **Moves/renames:** Codes are **stable**. If you must change one, note `formerly: OLD-CODE` and **never reuse** retired cores.  
- **Display vs copy:** Print/PDF may show `DDD·CCC·EEE·C`; **copy** should supply `DDD-CCC-EEE-C`.  
- **Obsidian safety:** Keep emoji out of anchors and code fences; callouts render safely across themes.

---

## ✅ Acceptance checks ^accept

- **House validation matches live files:**  
  `RUL-ALT-REV-0` (Revival), `RUL-BAS-INV-6` (Inventory), `RUL-BAS-MNY-5` (Money), `RUL-BAS-CDR-S` (CDR) ⟶ **pass** under **House 37,36**.  
- **Strict mode changes checks:** Running **Strict 7064** on those cores yields **different** final chars; adopt only with **full migration**.  
- **Regex sanity:** The regex finds triads but **doesn’t** validate checks—pair it with DataviewJS for ✅/❌ per line.  
- **Focus/XXX rule:** `XXX` appears **only** on index/focus cards; never as a real Collection/Element.  
- **Obsidian links:** Use **hyphens** in copy; `·` is **render‑only**.

---

> [!changes]+ 🔄 Changelog ^changes
> **v2.3 (2025‑11‑17):** Tightened TL;DR; added Obsidian safety note; minor wording trims; preserved House/Strict math & precomputed examples.  
> **v2.2 (2025‑08‑31):** Emoji TL;DR & headings; robust anchors & nav; Acceptance section; precomputed checks and validators as in prior version.  
> **v2.1 (2025‑08‑28):** Standardized YAML & headings; clarified **House 37,36** vs **Strict 7064**; dual‑mode validators; polished tables/captions.  
> **v2.0 (2025‑08‑26):** Prior version.
