---
apex-docs: v1
status: DRAFT
last-updated: 2026-03-29
---

# Apocalypse Express — Campaign Draft Notebook

> **How to read this file**
> - **Front layer** — player-facing text, read-alouds, choice text. Immersive, final-ish wording.
> - **Back layer** — DM notes, block logic, wiring, flags, skip conditions. Nothing important omitted.
> - Each scene = a set of **blocks**. Each block = one `JSON`-ready node + full annotation.
> - Block IDs are canonical — the game engine uses these as `goto` targets.

---

# ═══════════════════════════════
# SCENE A1 — The Null Meridian
# ═══════════════════════════════

> **Type:** Talk / Explore
> **Length:** Medium (15–25 min)
> **Danger:** None — System OFF
> **Purpose:** Campaign intro, tone-setting
> **Teaching:** "You are dead. This is not yet the world."

## Scene-level DM Notes

- Runs **before** character sheets, classes, or any mechanical explanation.
- No HP, no rolls, no resources. Any dice rolled here are **flavour only**.
- Goal: each player speaks in character at least once, and at least one Null rule is demonstrated at the table.
- Transition out: when the **Obelisk** is noticed → jump to Scene A2.
- The Null Meridian is **scheduled space** — something is watching and counting, but it won't reveal itself yet.

---

## Block A1.1 — Wake on the Platform

```json
{
  "id": "A1_1_wake",
  "type": "scene",
  "title": "The Null Meridian",
  "image": "scenes/null_meridian.jpg",
  "text": "Cold nothing gives way to stone under your hands.\n\nA circular platform hangs in open dark, its edge traced by a dull red glow. Around you, a few blurred shapes shudder and drag themselves upright — bodies half-formed, as if something is still deciding what you're all supposed to be.",
  "speaker": null,
  "choices": [
    { "text": "Look at yourself", "goto": "A1_3_self" },
    { "text": "Walk toward the edge", "goto": "A1_3_edge" },
    { "text": "Call out into the dark", "goto": "A1_3_call" },
    { "text": "Try to remember", "goto": "A1_3_memory" }
  ],
  "auto": null,
  "flags_set": [],
  "flags_require": []
}
```

> **DM — After read-aloud:**
> Ask: *"What's the first thing you do or notice?"*
> This opens free exploration — use blocks A1.3.x as lookup table responses.
> Don't read all the senses at once; surface them as players ask.

---

## Block A1.2 — Senses Lookup Table

> *(Not a player-facing node — DM reference only. Pull from this when players ask what they perceive.)*

```json
{
  "id": "A1_2_senses",
  "type": "dm_reference",
  "title": null,
  "text": null,
  "dm_only": true
}
```

**SIGHT**
- Rough stone/concrete platform, no railings, floating in featureless black.
- A thin steady **red line** traces the rim — doesn't behave like light or metal.
- Each PC = a **shifting shadow-body**: mostly humanoid, edges blurring between possible shapes.
- Other silhouettes stay dim and inert (promote to NPC/extra PC later if needed).

**SOUND**
- Movements slightly **muffled** — padded room, heavy fog feeling.
- Voices carry **too clearly**; words echo back from no locatable direction.
- Underneath: a slow distant **mechanical rhythm** — clack / heartbeat / engine, not yet resolved.

**FEEL**
- Gravity normal; they have balance and weight.
- **No breath, no heartbeat, no skin sensation.**
- Floor solid and cool.
- Reaching toward the rim or into the dark feels like a **glass wall** — wrong before contact.

---

## Block A1.3.1 — "What do I look like?"

```json
{
  "id": "A1_3_self",
  "type": "outcome",
  "title": null,
  "text": "Your outline flickers — two, three versions of you layered on each other, none fully committed. When you reach for what you want to be, the form leans that way for a heartbeat. Then blurs back to shadow.",
  "speaker": null,
  "choices": [
    { "text": "Try to hold the shape", "goto": "A1_3_self" },
    { "text": "Touch another soul", "goto": "A1_3_touch" },
    { "text": "Look around instead", "goto": "A1_1_wake" }
  ],
  "auto": null
}
```

> **DM note:** Touching another soul = *cold, thick air — resistance without skin.*
> **Takeaway:** Identity is still in flux. They are souls, not finished bodies.

---

## Block A1.3.2 — "I go to the edge / I jump"

```json
{
  "id": "A1_3_edge",
  "type": "outcome",
  "title": null,
  "text": "Each step toward the rim pushes back — invisible resistance, distance that won't close. You step off.\n\nA lurch of cold dark. Your foot hits stone again exactly where you started. From across the platform, you simply blinked.",
  "speaker": null,
  "choices": [
    { "text": "Try again, harder", "goto": "A1_3_edge" },
    { "text": "Give up and return to the others", "goto": "A1_1_wake" }
  ],
  "auto": null
}
```

> **DM note:** Space is looped. No matter how they try — run, jump, throw an object — it returns to start or blinks back. Object thrown = disappears, reappears at thrower's feet.
> **Takeaway:** They cannot leave. The platform is a cell without walls.

---

## Block A1.3.3 — "I attack / try to break something"

```json
{
  "id": "A1_3_violence",
  "type": "outcome",
  "title": null,
  "text": "Limbs pass through like smoke. Reality skips a frame — a brief tear in the scene, then everything snaps back untouched. The target feels a cold tug of intent. Nothing changes.",
  "speaker": null,
  "choices": [
    { "text": "Accept it", "goto": "A1_1_wake" }
  ],
  "auto": null
}
```

> **DM note:** No cost, no pain, no mark. Not "you missed" — the concept of damage doesn't apply here.
> **Takeaway:** They are already as dead as they're going to get.

---

## Block A1.3.4 — "I call out / pray / curse"

```json
{
  "id": "A1_3_call",
  "type": "outcome",
  "title": null,
  "text": "Your words come back — a soft delayed echo from no direction you can point to. Too clean. Every syllable rings in the emptiness.\n\nAfter a few calls, the slow mechanical rhythm beneath everything tightens slightly. Not an answer. Just... acknowledgement.",
  "speaker": null,
  "choices": [
    { "text": "Listen to the rhythm", "goto": "A1_3_scan" },
    { "text": "Speak to the others", "goto": "A1_1_wake" }
  ],
  "auto": null
}
```

> **DM note:** The void is one-way. Calls go out, echoes come back. The rhythm reacting = foreshadow of the Train. Don't reveal that yet.
> **Takeaway:** Contact with void is one-way. Contact with each other is real.

---

## Block A1.3.5 — "What do I remember?"

```json
{
  "id": "A1_3_memory",
  "type": "outcome",
  "title": null,
  "text": "Names and faces are fogged out — text rubbed off a page. Concrete events are gone.\n\nWhat remains is feeling. The residue of your end: anger, exhaustion, guilt, relief. Not how. Just what it cost you.",
  "speaker": null,
  "choices": [
    { "text": "Sit with the feeling", "goto": "A1_3_memory_prompt" },
    { "text": "Look for the others", "goto": "A1_1_wake" }
  ],
  "auto": null
}
```

```json
{
  "id": "A1_3_memory_prompt",
  "type": "dialogue",
  "speaker": "DM",
  "text": "At the end, you remember feeling mostly — angry, exhausted, resigned, or hopeful. Which one feels right?",
  "choices": [
    { "text": "[Player answers freely]", "goto": "A1_1_wake" }
  ]
}
```

> **DM note:** This is a roleplay prompt, not a mechanical check. Their answer seeds how they play their character's emotional starting point. Note it down.
> **Takeaway:** Past-life detail is locked. This beat is about *present emotion*, not biography.

---

## Block A1.3.6 — "I cast a spell / use a class feature"

```json
{
  "id": "A1_3_ability",
  "type": "outcome",
  "title": null,
  "text": "Power starts to gather — words, sigils, muscle memory. Then fizzles. A faint outline of the effect flickers for a heartbeat — glow, sparks, spectral weapon — then collapses back into your shadow.\n\nNo cost. No backlash. Whatever fuels that isn't connected here.",
  "speaker": null,
  "choices": [
    { "text": "Accept it and move on", "goto": "A1_1_wake" }
  ],
  "auto": null
}
```

> **DM note:** This is *before* character sheets. The cosmetic flicker validates their class identity without creating a rules exception.
> **Takeaway:** Class kits are dormant in the Null.

---

## Block A1.3.7 — "I look/listen harder" / scanning

```json
{
  "id": "A1_3_scan",
  "type": "outcome",
  "title": null,
  "text": "The void stays mostly blank. On a long stare you almost see twin red lines in the distance — like rails — then lose them when you blink.\n\nThe mechanical rhythm sharpens just enough to feel like something counting. Something turning. Time feels off. You can't tell if seconds or minutes are passing.",
  "speaker": null,
  "choices": [
    { "text": "Tell the others what you saw", "goto": "A1_1_wake" },
    { "text": "Wait and watch", "goto": "A1_3_scan" }
  ],
  "auto": null
}
```

> **DM note:** The twin red lines = the Train's tracks. Plant this early, don't name it. If they ask "what are those?" — *"You don't know. You forget them the moment you blink."*
> **Takeaway:** There is structure out there. It's not reachable yet.

---

## Scene A1 — Exit Condition

```json
{
  "id": "A1_exit",
  "type": "dm_reference",
  "dm_only": true,
  "exit_to": "A2_1_obelisk_appears",
  "conditions": [
    "Each player has spoken or acted in character at least once",
    "At least one core Null rule demonstrated (no escape / no harm / time is wrong)"
  ]
}
```

> **DM note:** Don't rush this. When the conditions are met, say:
> *"The rhythm shifts. Something breaks the sameness of the dark."*
> Then introduce the Obelisk and transition to A2.
>
> **You do NOT need to run every A1.3.x block.** Use only what players reach for. The table determines which sub-blocks fire.

---

# ═══════════════════════════════
# SCENE A2 — Obelisk, Clock & Postcards
# ═══════════════════════════════

> *(Coming next — stub placeholder)*

```json
{
  "id": "A2_1_obelisk_appears",
  "type": "scene",
  "title": "Something in the Dark",
  "image": "scenes/obelisk.jpg",
  "text": "[ Scene A2 content — to be drafted ]",
  "choices": [],
  "auto": null
}
```

---

> **Notebook status:**
> - ✅ A1 — Full block encoding complete
> - 🔲 A2 — Stub only
> - 🔲 A3 — Not started
> - 🔲 A4 — Not started
> - 🔲 A5 — Not started
> - 🔲 B1 — Not started
> - 🔲 B2 — Not started
