# AE Sim Dashboard

## Scenario: Campaign Start Snapshot v2 (THAW_AGE + Chronoshear)
- Goal: campaign-start state using patchy thaw (local elapsed time) + east chronoshear edge.
- THAW_AGE target: affected=100k years; non-affected=100 years; feather≈100m (represented as 1-cell band at this grid resolution).
- Notes:
  - Reservoir water is treated as affected (100k) except a small safe pocket adjacent to the dam.
  - Dam structure cells are forced to non-affected (100y) to keep the structure intact.

## District Plan (v1) — campaign-facing
- WHITE: Start / train stop (below dam). Safe onboarding pocket. THAW≈100y.
- GREEN: Civilians/traders hub. Habitable marsh basin (boardwalks/levees; low electronics due to EMP storms). THAW≈100y.
- RED: Dam assault. Sabre-controlled; rough but standing; patched over decades. Dam pocket THAW≈50–100y.
- BLUE: Synth tech district (SE). “Stormglass Flats”: surge/EMP, ozone, glassed silt; synth-friendly, human-hostile. THAW≈10k. Contains a “Datascape” access point (Fade-like digital layer) via compute mesh.
- PURPLE: Temple / Orb excavation (NE). Underground boss site + surface dig; comparatively insulated from surface time effects.
- GOLD (Optional DLC): Solar Survey Spire + heliostat/dish field (mid‑east). Local sunvector-lock (permanent golden-hour angle). Main dish/tower frozen mid-fall (~45°) → mis-aimed reflection causes “Sunscar” hot bowl (tropical microclimate + molten glass/slag patch). Cyborg enclave. Reward: A‑tech archive confirms reservoir began as a meteor crater lake later dammed.
- Separators: west stasis curtain; east chronoshear escarpment+rift wall; interior thin seams (surge swales / methane mats / local chronoshear scars) instead of “dungeon rooms”.

## Encoding Rules (canonical)
- Coords: A–P + 1–9
- Layers store data as: default + rect assignments + optional row encoding + single-cell overrides
- Rendered emoji grids are views only, not authoritative

## Palette
- PASS: 0=LAND | 1=WATER
- BIOME_*: 0=PLAINS | 1=MIXED_FOREST | 2=DENSE_FOREST | 3=FARMLAND | 4=SCRUB/WETLAND | 5=RUINS | 6=INDUSTRIAL | 7=ROCKY_SLOPE | 8=ASH_DEADGROUND | 9=ANOMALY_SUBSTRATE
- THAW_AGE_BIN: 0..9 (local elapsed normal-time since Stop; bins)
  - map: [0, 1, 10, 100, 1000, 10000, 100000, 1000000, 10000000, 100000000] years
- CHRONO_SHEAR: 0=NONE | 1=TOE (approach) | 2=FACE (cliff) | 9=RIFT_WALL

## Canonical Layers

LAYER PASS (cat)
- default: 0
- rects: A1–K1=1; A2–J2=1; A3–I3=1; A4–G4=1; C5–E5=1

LAYER ANOM_SE (cat)
- domain: 0..9
- encoding: ROWS_16
rows:
1 6676676676689999
2 6766766766689957
3 7667667665682229
4 5565562222222229
5 2355222222222229
6 3112222522222229
7 4122156667822299
8 4111166778999999
9 5566677789999999

LAYER THAW_AGE_BIN (cat)
- domain: 0..9
- baseline: 3 (100y)
- affected: 6 (100k) [reservoir + high anomaly]
- feather: 4 (1k) [1-cell band adjacent to affected]
- dam_struct override: set to 3 (100y) to preserve the dam
- encoding: ROWS_16
rows:
1 6666666666666666
2 6666666666466644
3 6666666664464446
4 6666633333343346
5 4466333333333346
6 3344433333433346
7 3333333334644466
8 3333333346666666
9 3333333466666666

LAYER CHRONO_SHEAR (derived, saved)
- domain: 0,1,2,9
- rule:
  - 9 if ANOM_SE==9
  - 1/2 if land-land neighbor crosses THAW_AGE_BIN {3/4} <-> 6 AND max(ANOM_SE)>=8
- encoding: ROWS_16
rows:
1 0000000000009999
2 0000000000129911
3 0000000000121119
4 0000000000010019
5 0000000000000019
6 0000000000100019
7 0000000001211199
8 0000000012999999
9 0000000129999999

## Derived State (snapshot, saved)

LAYER BIOME_CURRENT (derived, saved)
- domain: 0..9 (water cells ignored)
- encoding: ROWS_16
rows:
1 0000000000099999
2 0000000000799977
3 0000000001797779
4 0000000474277479
5 1100044744444479
6 4111141444744479
7 2244441447977799
8 2121441479999999
9 1444414799999999

LAYER VEG_STAGE (derived, saved)
- domain: 0..5 (water cells set to 0)
- encoding: ROWS_16
rows:
1 0000000000050000
2 0000000000150011
3 0000000004151110
4 0000000444413210
5 4400044444444210
6 4444444444144210
7 4444444441511100
8 3344444415000000
9 3333344150000000

LAYER FAUNA_PRESSURE (derived, saved)
- domain: 0..3 (water forced to 3; rift wall forced to 0)
- encoding: ROWS_16
rows:
1 3333333333330000
2 3333333333130011
3 3333333332131110
4 3333333222211110
5 2233322222222110
6 2222222222122110
7 2222222221311100
8 1122222213000000
9 1111122130000000
