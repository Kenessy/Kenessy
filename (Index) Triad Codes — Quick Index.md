---
created: 2025-08-25
formerly: []
supersedes: ""
export: { player: true, gm: true }
cover: ""
license: ""
attribution: ""
schema: apex-docs-v1
audience: table
tier: core
aliases: []
links: []
depends_on: []
summary: ""
reliability: canonical
spoiler_tier: 0
code: NDX-TCS-CAT-L
title: "Triad Codes — Quick Index"
type: index
status: active
version: 1.1
updated: 2025-08-25
player_facing: true
tags:
  - index
  - codes
  - obsidian
imports: []
---> [!summary] **Purpose**
> A compact lookup table for **ready codes**—what they mean and where they point.  
> **Format:** `DDD-CCC-EEE-C` (Triad + 1‑char checksum). **Uppercase only.**  
> **Inactive tiers:** use `XXX` on focus/index pages only; never assign `XXX` to real entries.

---

## How to add entries
1. Use a **short, self‑evident title**.  
2. Mint the **Triad** (`DDD-CCC-EEE`), then compute the checksum (ISO/IEC 7064 **MOD 37,36**).  
3. Add a row with **Code**, **Title**, **Type**, **Segments**, **Description**, and a **wiki‑link**.

> [!tip] **Segments**
> `DDD` = Domain · `CCC` = Collection · `EEE` = Element.  
> Keep one `EEE` style per collection (e.g., `001…` for ordered scenes; `AAA…` for modular catalogs).

---

## Index — Entries

| **Code**          | **Title**                               | **Type**             | **Segments**                  | **Description**                                                                                                                               | **Link**                                   |
| ----------------- | --------------------------------------- | -------------------- | ----------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ |
| **CAN-BAS-HDR-Q** | Rules Canvas — Basic                    | Canvas (import)      | `DDD=CAN · CCC=BAS · EEE=HDR` | Main **baseline rules canvas** you can import into scenes; holds the Basic Core rule modules.                                                 | [[Rules Canvas — Basic]]                   |
| **REF-GDE-TCS-F** | Triad Codes — Master Reference          | Reference (guide)    | `DDD=REF · CCC=GDE · EEE=TCS` | Full **spec & guidance** for Triad Codes (format, validation, guardrails, snippets).                                                          | [[(Reference) Triad Codes Master]]         |
| **REF-SRD-5E1-F** | 5e Baseline (SRD 5.1)                   | Reference (SRD)      | `DDD=REF · CCC=SRD · EEE=5E1` | **D&D 5e SRD 5.1** baseline rules reference for compatibility and quick lookups.                                                              | [[(Reference) 5e Baseline (SRD 5.1)]]      |
| **NDX-TCS-CAT-L** | Triad Codes — Quick Index               | Index (codes)        | `DDD=NDX · CCC=TCS · EEE=CAT` | This note: quick lookup table for ready Triad codes (**self‑reference row**).                                                                 | [[(Index) Triad Codes Index]]              |
| **RUL-ALT-REV-0** | (Rule) Revival: Lucifer & Quantum Print | Rule (player-facing) | `DDD=RUL · CCC=ALT · EEE=REV` | Disables 5e resurrection magic; Lucifer revives via Train’s Quantum Core (body “printing”); Hellstatic can override normal adv/disadv cancel. | [[(Rule) Revival - Lucifer & Quantum Print]] |

---

## Copy‑ready headers (for new notes)

```md
# Rules Canvas — Basic
Code: CAN-BAS-HDR-Q
```

```md
# Triad Codes — Master Reference
Code: REF-GDE-TCS-F
```

```md
# 5e Baseline (SRD 5.1)
Code: REF-SRD-5E1-F
```

```md
# HR — Revival: Lucifer & Quantum Print
Code: RUL-ALT-REV-0
```

---

## Optional — checksum helper (Templater)

```js
// Input: triad core like "SCN-PRL-001" (no checksum)
// Output: "SCN-PRL-001-2"
const ALPH = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const clean = (s) => (s || "").toUpperCase().replace(/[^A-Z0-9]/g, "");

function mod3736Check(core) {
  let p = 36;
  for (const ch of clean(core)) {
    p = ((p + ALPH.indexOf(ch)) * 2) % 37;
  }
  let c = (37 - p) % 37;
  if (c === 36) c = 0;
  return `${core}-${ALPH[c]}`;
}
```

---

## Conventions (quick)
- **Uppercase** segments; **hyphens** as separators; checksum last.  
- Avoid **I, O, Q** in segments for legibility; checksum may be any `0–9 A–Z`.  
- `XXX` is **reserved for inactive tiers** on focus/index pages.  
- If a code ever must change, mark `formerly: OLD-CODE` in the body and **never reuse** retired codes.


