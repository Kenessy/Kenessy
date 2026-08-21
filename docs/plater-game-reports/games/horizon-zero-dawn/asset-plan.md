# Horizon Zero Dawn — Screenshot Evidence Plan

Rule: images prove the experience; they do not exist only as decoration. Every accepted image receives an ID, spoiler lane, source session, and review purpose.

## Capture categories

| Slot group | Capture | Evidence purpose |
|---|---|---|
| First-world impression | Opening landscape and first strong machine sighting | Initial immersion and visual identity |
| Aloy / character | Character interaction or reaction with clear context | Character attachment and dialogue quality |
| Machine grammar | Scan, weak point, component removal, trap, or override | Combat readability and problem-solving |
| Mystery | Ruin, data point, environmental clue, or old-world contrast | Curiosity and reveal structure |
| Quest evidence | Meaningful side-character or quest moment | Quest quality vs checklist filler |
| Friction | Chaotic encounter, unclear climb, inventory/UI issue, map clutter | Negative evidence and accessibility |
| Difficulty | Encounter state before/after a setting or strategy change | Fairness and friction recovery |
| Frozen Wilds | Spoiler-labeled expansion environment and encounter evidence | Expansion delta |
| Completion | Hunting trial, collectible, NG+, or Ultra Hard evidence | Mastery appendix only |

## Initial slots

| ID | Needed image | Spoiler lane | Status |
|---|---|---|---|
| HZD-IMG-001 | First strong world vista | spoiler-light | missing |
| HZD-IMG-002 | First machine scan / readable component view | spoiler-light | missing |
| HZD-IMG-003 | First combat plan that works | spoiler-light | missing |
| HZD-IMG-004 | First character moment worth remembering | spoiler-marked | missing |
| HZD-IMG-005 | First old-world mystery clue | spoiler-marked | accepted from HZD-S03 |
| HZD-IMG-006 | First obvious open-world friction | spoiler-light | missing |
| HZD-IMG-007 | First multi-machine pressure test | spoiler-light | missing |
| HZD-IMG-008 | Representative Frozen Wilds image | spoiler-marked | missing |
| HZD-IMG-009 | Spoiler-light final journey image | spoiler-light | missing |
| HZD-IMG-010 | Ending evidence for private appendix | spoiler-full | missing |

Supplemental images may strengthen an existing planned slot without increasing the `1/10` initial-slot counter. This preserves the coverage plan instead of rewarding multiple screenshots of the same opening function.

## Accepted evidence

### HZD-IMG-005: Focus view in the abandoned ruin

- Source session: HZD-S03
- Preserved file: `assets/screenshots/hzd-img-005-gift-from-the-past-focus-ruin.png`
- Original source: `G:\AI\UserState\Temp\codex-clipboard-d574c372-f8e7-473e-83f9-7902dd2c09f6.png`
- Dimensions: 2560x1440 PNG
- SHA-256: `B4B3BE6CBD3D0A0BC4ED801A2B07884B27D5FD4AE7882702815F4C5F498D4B8A`
- Scene: `A Gift from the Past`, objective `Find a Way out`, Focus view active
- Spoiler lane: spoiler-marked opening evidence
- What it proves: the Focus overlays purple projected elements across an abandoned laboratory structure that has merged with rock, water, vegetation, and wildlife. It supports Daniel's positive level-design reaction without identifying the old-world displays beyond what is visible.
- Public candidate: yes, pending later caption and HUD decision
- Integrity: source and preserved-file SHA-256 matched exactly at intake
- Repository integrity correction: the first screenshot checkpoint was incorrectly processed by the repository's broad text-normalization rule and is not valid image evidence. A follow-up added `/docs/plater-game-reports/**/*.png binary`; the current committed Git blob now matches the raw working-file blob, and the preserved PNG still matches the source SHA-256 above. The intermediate checkpoint remains in history as invalid evidence rather than being hidden.

### HZD-IMG-011: Focus-guided door pattern

- Source session: HZD-S03
- Preserved file: `assets/screenshots/hzd-img-011-gift-from-the-past-focus-door-pattern.png`
- Original source: `G:\AI\UserState\Temp\codex-clipboard-67e81e36-b269-4c7a-a798-ab0c81583beb.png`
- Dimensions: 2560x1440 PNG
- SHA-256: `A09D24232A5303A49C881FBBD2D8696D08ED1DD1A4DDF4BDDFF5410D9BC3D33B`
- Scene: `A Gift from the Past`, Focus view active, displayed shape connected to the first locked door
- Spoiler lane: spoiler-marked opening evidence
- What it proves: the Focus maps the room with a purple network and displays a shape beside the connected device. It supports the claim that the Focus participates in an environmental interaction rather than functioning only as visual atmosphere.
- What it does not prove: the image does not show the door opening or the exact rotation sequence; those facts come from HZD-RAW-014.
- Public candidate: yes, pending later comparison, caption, and HUD decision
- Integrity: source and preserved-file SHA-256 matched exactly at intake
- Slot accounting: supplemental evidence for HZD-IMG-005's old-world mystery lane; planned-slot coverage remains 1/10, while accepted-file count becomes 2

## Intake template

```text
Image ID: HZD-IMG-XXX
Source session: HZD-SXX
Local source path: [path]
Scene / location: [short label]
Spoiler lane: spoiler-light / spoiler-marked / spoiler-full
What it proves: [review claim or friction]
Public candidate: yes / no / undecided
```
