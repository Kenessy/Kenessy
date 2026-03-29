// ============================================
// Scene A1 — Null Meridian Prelude
// Apocalypse Express — Single Player Adaptation
// ============================================

VAR examined_self = false
VAR saw_rim = false
VAR tried_violence = false
VAR called_out = false
VAR probed_memory = false
VAR tried_magic = false
VAR scanned_void = false
VAR actions_taken = 0
VAR null_rule_demonstrated = false
VAR emotional_residue = ""

=== A1_start ===
# SCENE_START: A1
# TAG: atmosphere_null
# TAG: music_null_ambient

Cold nothing gives way to stone under your hands.

A circular platform hangs in open dark, its edge traced by a dull red glow. You shudder and drag yourself upright — your body half-formed, as if something is still deciding what you're supposed to be. #slow

You are not alone. Other blurred shapes stir around you, shadow-figures pulling themselves together in the dim red light. None of them look finished. Neither do you.

The air — if it is air — is utterly still. Somewhere beneath everything, a slow mechanical rhythm pulses. Not a heartbeat. Not an engine. Something in between. #atmospheric

-> A1_hub

=== A1_hub ===

{actions_taken == 0:
    You stand on the platform, a dead soul in a place that shouldn't exist. What do you do first?
}
{actions_taken > 0 and actions_taken < 3:
    The platform waits. The red rim glows. The rhythm below continues its patient count.
}
{actions_taken >= 3 and null_rule_demonstrated:
    -> A1_transition_check
}

+ {not examined_self} [Look at yourself — study your hands, your body]
    -> examine_self
+ {not saw_rim} [Walk toward the edge of the platform]
    -> approach_rim
+ {not tried_violence} [Try to break something — hit the ground, strike a shadow]
    -> try_violence
+ {not called_out} [Call out into the darkness]
    -> call_out
+ {not probed_memory} [Try to remember — who were you?]
    -> probe_memory
+ {not tried_magic} [Reach for something inside — a power, a prayer, a word]
    -> try_magic
+ {not scanned_void} [Stand still and study the void carefully]
    -> scan_void
+ {actions_taken >= 2 and null_rule_demonstrated} [Something is changing in the darkness...]
    -> A1_transition_check

=== examine_self ===
~ examined_self = true
~ actions_taken++
# TAG: discovery

You raise your hands. They're there — sort of. Translucent, dark smoke given the shape of fingers. You can almost see through them.

Your outline flickers, as if the universe is cycling through drafts. For a heartbeat you see something sharper — broader shoulders, or thinner wrists, or hands scarred in ways you can't quite place — then it blurs back to generic shadow.

You have no face you recognise. No scars, no tattoos, no skin. Just the suggestion of a person, waiting to be finalised. #slow

The other shapes on the platform are the same: sketches of people, not people yet.

-> A1_hub

=== approach_rim ===
~ saw_rim = true
~ actions_taken++
~ null_rule_demonstrated = true
# TAG: null_rule

You walk toward the edge. Each step feels normal at first, then subtly wrong — like pushing through invisible resistance. The red line at the rim pulses gently as you approach.

Beyond it: nothing. Not darkness, not space. The absence of anything at all.

+ [Step over the edge]
    -> step_off_edge
+ [Crouch down and examine the red line]
    -> examine_rim_line
+ [Step back]
    You back away. The platform feels more solid at its centre. The edge feels like a suggestion you shouldn't follow.
    -> A1_hub

= step_off_edge
You step out. One foot goes over —

A lurch. Cold rushes up. Your stomach drops into nothing.

Then stone under your feet. You're standing where you started, at the centre of the platform. The other shadows around you don't react, as if nothing happened. #dramatic

*Space loops here. You cannot leave.* #rule_reveal

-> A1_hub

= examine_rim_line
You crouch. The red line doesn't behave like light or paint or metal. It's more like a boundary made visible — the universe drawing a margin around what's allowed to exist here.

Up close, it hums. Not with sound — with pressure. As if it's holding something in. Or holding the void out.

-> A1_hub

=== try_violence ===
~ tried_violence = true
~ actions_taken++
~ null_rule_demonstrated = true
# TAG: null_rule

You swing. A fist, a kick, a stomp at the ground — whatever feels right.

Your hand passes through the other shadow like smoke. No resistance. No impact. No pain. #dramatic

You try the platform. Your fist connects with stone — but leaves no mark. No crack, no ache in your knuckles. Reality seems to skip a frame: a brief tear in the scene, then everything snaps back untouched.

*Nothing can be damaged here. You're already as dead as you're going to get.* #rule_reveal

-> A1_hub

=== call_out ===
~ called_out = true
~ actions_taken++
# TAG: atmosphere

+ [Shout into the void: "Hello? Anyone?"]
    -> call_generic
+ [Speak to the other shadows directly]
    -> call_shadows
+ [Pray — to whatever might listen]
    -> call_pray

= call_generic
Your voice rings out — too clearly. Every syllable hangs in the stillness, then returns as a soft, delayed echo from no direction you can point to.

No answer. Just the echo, and underneath it, that slow mechanical rhythm. It tightens for a moment after you call, as if acknowledging you. Then settles back to its patient count.

*Contact with the void is one-way.* #atmospheric

-> A1_hub

= call_shadows
You turn to the nearest shadow-figure. "Hey. Can you hear me?"

Your voice sounds... normal. Real, even. The shadow shifts. Doesn't answer in words, but there's a reaction — a tilt of what might be a head, a gathering of attention.

Between the souls on this platform, communication is real. You're not alone in this. #warm

-> A1_hub

= call_pray
You close your eyes — or whatever passes for eyes in this form — and reach upward. A prayer, a plea, a demand. To God, to the universe, to whoever runs this place.

Silence. The prayer goes out and never comes back. No warmth, no presence, no denial. Just the void, indifferent to faith.

But the mechanical rhythm below shifts tempo for a single beat. Something heard you. Something that isn't interested in prayers. #ominous

-> A1_hub

=== probe_memory ===
~ probed_memory = true
~ actions_taken++
# TAG: emotional

You reach inward. Who were you? What was your name? Where did you —

Fog. Names slip away like water through shadow-fingers. Faces blur into shapes. Concrete events dissolve the moment you focus on them, like text rubbed off a page.

But underneath the details, something remains. A feeling. An emotional residue from your end — strong, raw, and undeniable.

+ [Anger. White-hot, unfinished anger.]
    ~ emotional_residue = "anger"
    -> memory_result
+ [Exhaustion. You were so, so tired.]
    ~ emotional_residue = "exhaustion"
    -> memory_result
+ [Guilt. Something you didn't do. Or did.]
    ~ emotional_residue = "guilt"
    -> memory_result
+ [Duty. You were in the middle of something important.]
    ~ emotional_residue = "duty"
    -> memory_result
+ [Relief. It was finally over.]
    ~ emotional_residue = "relief"
    -> memory_result

= memory_result
{emotional_residue == "anger":
    The anger sits in you like hot metal. Something was taken, or interrupted, or left unfinished. You don't know what, but your shadow-body tenses with it.
}
{emotional_residue == "exhaustion":
    A bone-deep weariness that even death didn't cure. You fought something for too long — a battle, an illness, a burden — and at the end, you just... stopped.
}
{emotional_residue == "guilt":
    It coils in your chest like a cold knot. There's a debt unpaid, a moment you can't rewrite. The details are gone, but the weight remains.
}
{emotional_residue == "duty":
    Even now, something pulls at you. An obligation unmet, a task mid-stride. You died in harness, and your soul doesn't know how to stop.
}
{emotional_residue == "relief":
    A strange, hollow peace. Whatever it was — pain, pressure, fear — it's over. You're free of it. But freedom in this void feels like an empty room, not an open field.
}

*Past-life detail is locked. Only the emotional tone of your end remains.* #rule_reveal #slow

-> A1_hub

=== try_magic ===
~ tried_magic = true
~ actions_taken++
~ null_rule_demonstrated = true
# TAG: null_rule

You reach for it — whatever "it" is. A word of power. A muscle memory of rage. A gesture that should pull fire from nothing or shape flesh into claws.

Something starts to respond. A faint glow gathers at your fingertips. Sigils scratch themselves into the air for a heartbeat. You feel the shape of what you could do, if only —

It collapses. The glow fizzles. The sigils dissolve. Your shadow-body absorbs the attempt like smoke. #dramatic

No cost. No backlash. No resource spent. Whatever fuels that power simply isn't connected here.

*This is before everything. Powers are dormant. You are a soul, nothing more.* #rule_reveal

-> A1_hub

=== scan_void ===
~ scanned_void = true
~ actions_taken++
# TAG: foreshadow

You stand still. Stop moving, stop reaching, and just... observe.

The void is not as empty as it pretends.

On a long stare, you almost see them — two parallel lines of deep red, cutting through the distance like rails. They're far away, impossibly far, but they're there. A structure. A track. Something with direction in a place that has none. #slow

The mechanical rhythm below sharpens. For a moment it sounds like wheels on rails, or the tick of a massive clock, or the breathing of an engine waiting to wake.

Then you blink, and it's all just darkness again. But you know what you saw.

*There is something out there. It's coming.* #foreshadow #ominous

-> A1_hub

=== A1_transition_check ===
# TAG: transition

The platform shudders. #dramatic

Not an earthquake — nothing so violent. More like the floor acknowledging that its purpose is almost served. The red rim brightens, just slightly. The mechanical rhythm below shifts from patient counting to something more purposeful.

{scanned_void:
    Those twin red lines you saw in the darkness — they feel closer now.
}

Something is about to happen. The void is no longer waiting. It's preparing.

+ [Brace yourself]
    -> A1_end
+ [Watch the darkness]
    -> A1_end

=== A1_end ===
# SCENE_END: A1
# FLAG: null_meridian_complete

A new shape pushes through the void — darker than the dark, sharp-edged and massive. A pillar. An obelisk. Black glass surfaces catch the red light and throw it back in angles that shouldn't exist.

It wasn't there before. Now it is, as if it always was. Standing at the platform's edge like a signpost that appeared when the road decided you'd walked far enough.

The mechanical rhythm below has changed. It's counting down.

-> END
