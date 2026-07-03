# INV-DEC-003 — Recover Marit to the Lander

Source session: S01 rescue / lander extraction  
Spoiler level: spoiler-marked  
Raw sources: `raw-capture.md`, Raw Intake 012 and Raw Intake 013

## Context

Yasna finds Dr. Marit too late to save her, then finds Koval alive but unresponsive. A lander is sent down and Koval is brought aboard. Daniel then chooses to go back for Marit and later reports that Marit was placed into the lander too.

## Decision record

```yaml
decision_id: INV-DEC-003
where: landing / rescue-recovery route
choice_prompt_type: action / recovery / values / roleplay
daniel_action: returned for Marit and placed her in the lander
reason_given: implied refusal to leave her behind
predicted_consequence: Marit is recovered with the rest of the crew rather than left in the field
actual_consequence_observed: Marit is placed in the lander
delayed_consequence_possible: true
agency_felt_0_4: 3
choice_pressure_0_4: 2
clarity_0_4: 4
ai_value_tags:
  - agency-perception
  - roleplay-values
  - recovery-choice
  - consequence-watch
review_axis_delta:
  Agency: +1
  Trust: +0.25
  NarrativePull: +0.5
```

## Interpretation

This is the first clear values-expressive decision in the run. It may or may not create mechanical consequence, but it expresses Daniel's chosen stance: do not leave Marit behind.

## Follow-up questions

- Does anyone acknowledge that Marit was recovered?
- Does the comic/codex change based on this action?
- Is there an achievement, ending flag, or dialogue consequence?
- Does the game later distinguish between saved, recovered, and abandoned crew states?
