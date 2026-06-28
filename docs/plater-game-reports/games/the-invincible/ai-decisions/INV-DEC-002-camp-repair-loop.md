# INV-DEC-002 — Camp Repair Loop

Source session: S01 camp investigation  
Spoiler level: spoiler-marked  
Raw source: `raw-capture.md`, Raw Intake 010

## Context

At the camp, Yasna finds Dr. Krauta in an unresponsive state and an android that is not working correctly. Communication with Base / Novik is restored through Krauta's cable or radio setup. The mission log then gives clearer objectives and environmental clues. Novik cannot restart the android remotely, so Yasna inspects the local hardware, finds a damaged relay antenna, searches crates for a replacement, and brings the android back online so it can watch over Krauta.

## Action record

```yaml
decision_id: INV-DEC-002
where: camp / Krauta tent / android relay
choice_prompt_type: action / repair / investigation / tool-use
daniel_action: restored communication, found the mission log, identified the damaged relay, found a replacement, and rebooted the android
reason_given: progress the camp objective and make the android useful for Krauta
predicted_consequence: android becomes operational again
actual_consequence_observed: android comes back online and is assigned to watch Krauta
agency_felt_0_4: 2
choice_pressure_0_4: 2
clarity_0_4: 4
ai_value_tags:
  - agency-perception
  - repair-chain
  - tool-use
  - causal-reasoning
  - mission-objective-extraction
  - anomaly-detection
review_axis_delta:
  Agency: +0.75
  Trust: +0.5
  NarrativePull: +0.5
```

## Interpretation

This is the first stronger agency/action sequence in the run. It is still authored and likely mandatory, but the player performs a meaningful chain: restore communication, recover mission info, infer hardware failure, find a replacement part, and restore a useful machine.

## Follow-up questions

- Does the rebooted android matter later?
- Was relay replacement a single obvious interaction or a small search/inference task?
- Does the damaged relay connect to Krauta, blackouts, fish/probe fear, or the marked structures?
- Is this the start of a more active investigation loop, or a one-off camp tutorial?
