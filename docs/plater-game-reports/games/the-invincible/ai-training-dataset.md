# The Invincible — AI Training / Decision Dataset Scaffold

Purpose: capture story-state, decisions, uncertainty, and perceived agency from Daniel's playthrough in a reusable analysis format.

This is not a raw transcript dataset. It should **paraphrase story context** and avoid long copyrighted dialogue reproduction.

## Dataset goals

Useful for:

- story-state compression;
- decision modeling;
- belief tracking under incomplete information;
- perceived agency vs actual consequence;
- uncertainty reasoning;
- alien-system interpretation;
- human/tool/environment trust;
- narrative UX: when does a player feel like a participant rather than a passenger?

Not useful for:

- mechanical optimization;
- combat mastery modeling;
- buildcraft;
- high-frequency reinforcement learning;
- resource economy analysis.

## Story-state snapshot schema

```yaml
snapshot_id: INV-SNAP-000
source_session: S00
spoiler_level: spoiler-light | spoiler-marked | spoiler-full
chapter_or_location: unknown
observed_facts:
  - fact Daniel currently believes is true
unknowns:
  - question Daniel is carrying
hypotheses:
  - hypothesis: "..."
    confidence_0_4: ?
    evidence_for: []
    evidence_against: []
entities:
  - name_or_role: "..."
    current_model: "what Daniel thinks this person/system is"
player_state:
  cognitive_load_0_4: ?
  curiosity_0_4: ?
  fatigue_0_4: ?
notes_ref: raw-capture.md#...
```

## Decision-point schema

```yaml
decision_id: INV-DEC-000
source_session: S00
spoiler_level: spoiler-light | spoiler-marked | spoiler-full
where: "chapter / location / scene"
context_summary: "short paraphrase of the situation"
choice_prompt_type: dialogue | action | interaction | route | silence | moral | tool-use | ending
options_presented:
  - "option A paraphrase"
  - "option B paraphrase"
daniel_choice: "what Daniel picked"
reason_given: "Daniel's reason, if provided"
predicted_consequence: "what Daniel expected"
actual_consequence_observed: "what happened, if known"
delayed_consequence_possible: true | false | unknown
agency_felt_0_4: ?
choice_pressure_0_4: ?
clarity_0_4: ?
regret_or_confidence: "regret / confident / indifferent / unsure"
ai_value_tags:
  - agency-perception
  - uncertainty
  - story-state
  - belief-update
review_axis_delta:
  Agency: +0 / +1 / -1
  Trust: +0 / +1 / -1
  NarrativePull: +0 / +1 / -1
raw_ref: raw-capture.md#...
processed_ref: processed-playthrough.md#...
```

## Running decision ledger

| ID | Session | Context | Daniel choice | Agency felt | Consequence known? | AI value |
|---|---|---|---|---:|---|---|
| INV-DEC-000 | S00 | Pre-run | None yet | ? | No | Lens setup only |

## Belief graph starter

| Node | Current model | Confidence 0-4 | Evidence |
|---|---|---:|---|
| Yasna | Player character / scientist | 1 | Store description and pre-run framing; no play evidence yet. |
| Regis III | Unknown planet / investigation site | 1 | Pre-run framing only. |
| Missing crew | Primary story pull | 1 | Pre-run framing only. |
| Unknown threat/system | Expected sci-fi uncertainty source | 1 | Pre-run framing only. |
| Analogue tools | Expected interaction layer | 1 | Pre-run framing only. |

## AI-value scoring rubric

| Score | Meaning |
|---:|---|
| 0 | No useful data. |
| 1-2 | Basic story summary only. |
| 3-4 | Some decisions or uncertainty but weak consequence tracking. |
| 5-6 | Usable story-state + choice records across several sessions. |
| 7-8 | Strong belief updates, decision rationales, perceived agency, and actual consequences. |
| 9-10 | Excellent structured dataset: multiple meaningful choices, clear hypotheses, delayed consequences, and publishable analysis. |

## Minimum viable dataset for this game

```text
[ ] 5+ decision points
[ ] 5+ story-state snapshots
[ ] 3+ hypothesis updates
[ ] 2+ moments where Daniel misread or correctly inferred the system
[ ] 1+ ending/consequence reconstruction
[ ] 1+ comparison of perceived agency vs actual branch/ending structure
```

## First hypothesis before play

```text
The Invincible will likely be more valuable for AI training as an agency-perception and uncertainty-tracking sample than as a decision-tree optimization sample.
```
