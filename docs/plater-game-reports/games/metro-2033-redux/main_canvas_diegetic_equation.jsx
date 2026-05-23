// Metro 2033 Redux · ALERTED Field Report
// Source snapshot from ChatGPT canvas: Main Canvas Diegetic Equation
// NOTE: This file is the React source template. The public HTML page can be generated from it in a later pass.

import { useEffect, useMemo, useState } from 'react';

const COLORS = {
  bg: '#05060a',
  panel: '#0d1117',
  panel2: '#11161f',
  line: '#1e2733',
  line2: '#2a3444',
  bone: '#d9c9a3',
  bone2: '#b8a982',
  ink: '#e7ecf3',
  muted: '#8592a5',
  dim: '#5a6678',
  amber: '#ff8a1f',
  loopAmber: '#FFB000',
  amber2: '#ffb347',
  red2: '#ff6a5a',
  engagementPink: '#ff005d',
  danger: '#ff2d1f',
  cyan: '#5ddcff',
  atmosphereIndigo: '#7C6DFF',
  green: '#7cff6b',
  retroMint: '#11FACB',
  technicalBlue: '#2B7FFF',
  violet: '#c056ff',
  lime: '#b6f505',
};

const REVIEW = {
  game: 'Metro 2033 Redux',
  framework: 'Cinematic Action-Horror FPS',
  lens: 'ALERTED Field Report',
  score: 86,
  scoreVerdict: 'Strong · Caveated Buy',
  reviewStatus: 'Complete',
  evidenceBase: 'Full run / veteran memory',
  confidence: 'High, caveated',
  spoilerPolicy: 'Layered policy',
  verdictRisk: 'Ending reconstructed',
  rawScore: 90,
  friction: -4,
  rank: 'A',
  action: 'Buy if atmosphere-first survival FPS fits you',
  confidenceScore: 88,
  mainPull: 'Atmosphere / world pressure',
  mainDrag: 'Limited agency',
  mainRisk: 'Old-FPS monster friction',
  nextTest: 'Clean Tower capture / alternate ending route',
  evidenceProtocol: 'Full run · veteran memory · 9 evidence arcs · ending reconstructed · friction disclosed',
  snapshotNote: 'Lens-specific review: cinematic survival-horror FPS, not a universal sandbox verdict',
  oneLineIdentity:
    'Metro 2033 Redux is a linear survival-horror FPS about crossing a living underground world, built around resource pressure and authored escalation, best for atmosphere-first players, but limited by bounded agency and old-FPS monster friction.',
  thesis:
    'Dense, authored, atmosphere-first action horror. Metro is not about escaping darkness into truth. It is about learning that darkness is uncertainty, light is exposure, and seeing more does not always mean understanding more.',
};

const FIT_VERDICTS = [
  { label: 'Buy if', value: 'Atmosphere-first survival FPS', text: 'You want authored pressure, dense world texture, horror pacing, and resource tension.', tone: COLORS.green },
  { label: 'Works if', value: 'Linear narrative-FPS player', text: 'You accept bounded agency because pacing, cohesion, and survival pressure matter more than open-ended route authorship.', tone: COLORS.cyan },
  { label: 'Skip if', value: 'Sandbox / RPG-agency first', text: 'You need open systems, build freedom, broad route authorship, or player-made solutions as the main reward.', tone: COLORS.amber },
];

const INSPECT_FIT = [
  { letter: 'I', name: 'Immersion', score: 10, color: COLORS.atmosphereIndigo, hint: 'World presence' },
  { letter: 'N', name: 'Narrative', score: 8, color: COLORS.engagementPink, hint: 'Story pull' },
  { letter: 'S', name: 'Systems', score: 2, color: COLORS.lime, hint: 'Buildcraft' },
  { letter: 'P', name: 'Performance', score: 5, color: COLORS.technicalBlue, hint: 'Skill play' },
  { letter: 'E', name: 'Exploration', score: 6, color: COLORS.retroMint, hint: 'Route curiosity' },
  { letter: 'C', name: 'Comfort', score: 4, color: COLORS.loopAmber, hint: 'Low friction' },
  { letter: 'T', name: 'Teamplay', score: 1, color: COLORS.danger, hint: 'Social layer' },
];

const ALERT_DEFINITIONS = [
  { letter: 'A', name: 'Atmosphere', micro: 'World pressure', color: COLORS.atmosphereIndigo, definition: 'Mood, sensory density, world texture, environmental pressure, and emotional pull.' },
  { letter: 'L', name: 'Loop', micro: 'Play engine', color: COLORS.loopAmber, definition: 'The repeated play pattern and whether those actions stay satisfying.' },
  { letter: 'E', name: 'Engagement', micro: 'Forward pull', color: COLORS.engagementPink, definition: 'Motivation, pacing, variety, progression, fatigue resistance, and desire to continue.' },
  { letter: 'R', name: 'Readability', micro: 'Fair clarity', color: COLORS.retroMint, definition: 'Fairness, clarity, feedback, telegraphing, route legibility, and rule communication.' },
  { letter: 'T', name: 'Technical', micro: 'Product state', color: COLORS.technicalBlue, definition: 'Stability, performance, settings, platform support, setup friction, and modern play condition.' },
  { letter: 'E', name: 'Extra', micro: 'Lens modifier', color: COLORS.lime, definition: 'A contextual modifier for important fit limits that should affect score without becoming a universal main axis.' },
  { letter: 'D', name: 'Danger', micro: 'Risk pool', color: COLORS.danger, definition: 'Concrete problems, edge cases, roughness, and warning items that stay visible instead of hidden inside broad praise.' },
];

const AXES = [
  { name: 'Atmosphere', letter: 'A', score: 20, grade: 'Phenomenal', color: COLORS.atmosphereIndigo, descriptor: 'World pressure', text: 'Lived-in stations, gunfire-lit frontlines, lighter-lit stealth routes, ghost-haunted tunnels, surface exposure, and industrial decay make Metro feel dense, hostile, and inhabited. Light rarely means safety; it usually means exposure, and the only thing scarier than an abandoned station is one that is not abandoned.' },
  { name: 'Loop', letter: 'L', score: 17, grade: 'Excellent', color: COLORS.loopAmber, descriptor: 'Play engine', text: "Metro's loop is curated survival economy rather than a loot treadmill: scavenge bullets, filters, pneumatic pressure, hidden stashes, and route knowledge, then spend those advantages pushing through firefights, stealth routes, surface air, and mutant pressure." },
  { name: 'Engagement', letter: 'E', score: 17, grade: 'Excellent', color: COLORS.engagementPink, descriptor: 'Forward pull', text: 'Metro stays engaging not by offering endless paths, but by making each authored space feel worth crossing. Quiet station life, tunnel runs, surface exposure, stealth routes, faction fronts, horror gates, dead machinery, and the final climb keep changing the kind of pressure.' },
  { name: 'Readability', letter: 'R', score: 17, grade: 'Excellent', color: COLORS.retroMint, descriptor: 'Fair clarity', text: 'Metro is readable where its human and survival layers are strongest: headshots, stealth routes, filters, masks, light exposure, and resource pressure usually communicate their rules clearly. The ceiling drops around monsters and retrofitted stealth systems.' },
  { name: 'Technical', letter: 'T', score: 19, grade: 'Excellent+', color: COLORS.technicalBlue, descriptor: 'Product state', text: 'Redux is the right way to play Metro 2033: stable, complete, modernized, and rebuilt away from the rougher original release. The local Tower/FOV capture issue is small, but it belongs inside the technical score rather than being hidden in the friction ledger.' },
];

const MODIFIERS = [
  { name: 'Extra', letter: 'E', value: -3, maxLoss: 10, label: 'Limited Agency', descriptor: 'Agency modifier', color: COLORS.lime, type: 'Context modifier', text: 'Strong direction, but limited route authorship and systemic freedom. Not a bug, this is a player-fit ceiling: negative for sandbox authorship seekers, neutral or positive for players who want authored pressure.' },
  { name: 'Danger', letter: 'D', value: -1, maxLoss: 10, label: 'Residual Friction', descriptor: 'Risk/friction pool', color: COLORS.danger, type: 'Risk pool', text: 'Four small, evidence-backed roughness deductions remain after the main axis scores. Each item below sums into this subtotal.' },
];

const FRICTION_ITEMS = [
  { name: 'Librarian Pathing Ambiguity', value: -0.25, severity: 'Minor issue', evidence: 'Behavior-rule inconsistency', color: COLORS.amber2, text: 'The stare-and-retreat rule exists, but pathing can still send a non-hostile Librarian toward the player and make the rule look mechanically inconsistent.' },
  { name: 'Demon Grab / Drop Weirdness', value: -0.25, severity: 'Minor issue', evidence: 'Aerial pathing edge case', color: COLORS.amber, text: 'Demon attacks can feel unclear when grab-and-drop behavior interacts with inaccessible rooftops or awkward movement zones.' },
  { name: 'Retrofitted Stealth Affordances', value: -0.25, severity: 'Minor roughness', evidence: 'Redux retrofit roughness', color: COLORS.amber, text: 'Bulbs, fires, and electrical boxes improve stealth readability, but they feel less foundational and less consistently authored than in Last Light.' },
  { name: 'Point-Blank Hit Evasion', value: -0.25, severity: 'Minor issue', evidence: 'Monster hit-response oddity', color: COLORS.red2, text: 'Close-range mutants, especially Nosalises, can appear to sidestep or slip past point-blank shots in ways that make shotgun and close combat feedback feel mechanically unreliable.' },
];

const INSIGHTS = [
  { title: 'Darkness as Possibility', label: 'Spoiler-light thesis', color: COLORS.atmosphereIndigo, text: "Metro's darkness is not just danger. It is a superposition of threat, shelter, reward, story, and nothing at all." },
  { title: 'Light as Exposure', label: 'Spoiler-light thesis', color: COLORS.amber, text: 'Light in Metro does not simply reveal the world. It collapses uncertainty. Visibility becomes exposure, exposure demands a reaction, and that reaction is often violence.' },
  { title: 'Sight Is Not Understanding', label: 'Spoiler-light thesis', color: COLORS.retroMint, text: 'Visibility in Metro is both gameplay and story logic. Shadows are not only where danger hides, they are also a protective curtain that lets separate worlds exist beside each other.' },
  { title: 'The Final Climb', label: 'Spoiler-light thesis', color: COLORS.violet, text: 'The final climb completes Metro’s visibility arc without turning it into simple enlightenment. Artyom moves upward from tunnels into a vantage point where he can finally judge.' },
];

const AUDIT_CHECKS = [
  { label: 'Lens Honesty', title: 'Actual use-case is named', tone: COLORS.retroMint, text: 'The report judges Metro as cinematic survival-horror FPS, not sandbox RPG, MMO, or buildcraft game.' },
  { label: 'Comfort Bias', title: 'Atmosphere does not erase friction', tone: COLORS.loopAmber, text: 'The strongest axis is allowed to shine, but E and D still remove points from the final score.' },
  { label: 'Friction Blindness', title: 'Problems stay itemized', tone: COLORS.danger, text: 'Monster feedback, pathing ambiguity, retrofit stealth roughness, and local capture caveats remain visible.' },
  { label: 'Audience Confusion', title: 'Fit is separated from quality', tone: COLORS.cyan, text: 'The buy advice explicitly separates players who want authored pressure from players who need open systems.' },
  { label: 'Sampling Bias', title: 'Full-route evidence base', tone: COLORS.atmosphereIndigo, text: 'The verdict is based on a full remembered route, not a single unusually strong early segment.' },
  { label: 'Falsifier', title: 'What would move the score', tone: COLORS.engagementPink, text: 'Cleaner monster readability, stronger route authorship, or repeated technical problems would move the final score.' },
  { label: 'Spectacle Bias', title: 'Mood is not treated as enough', tone: COLORS.violet, text: 'The report separates atmospheric power from loop, readability, and agency so the mood does not hide shallow or rough parts.' },
  { label: 'Patch Volatility', title: 'Stable old build, low volatility', tone: COLORS.technicalBlue, text: 'Metro 2033 Redux is not a live-service target, so patch volatility is low, but local PC capture quirks are still disclosed.' },
];

const EVIDENCE_ARCS = [
  { id: '01', title: 'Exhibition → Riga → Bourbon Deal', spoiler: 'light', color: COLORS.atmosphereIndigo, observation: 'Exhibition opens not as a safe home, but as a home under siege. Lamps, beds, workers, sick rooms, and Hunter’s return make the station feel lived-in before the threat breaks through.', proof: 'The first tunnel performs Metro’s core trick: human noise fades into dripping water, distant howls, warning lights, black shadows, anomaly logic, and Dark One vision.', caveat: 'The route is guided, the early economy is shallow, and replay knowledge softens discovery.', impact: 'Atmosphere · Engagement · Readability' },
  { id: '02', title: 'Bourbon / Lost Tunnels / Bridge', spoiler: 'light', color: COLORS.loopAmber, observation: 'Bourbon is a strange, damaged guide who tries to stay fair while remaining self-interested and compromised.', proof: 'The Bourbon arc proves that Metro’s exploration is curated rather than empty. Side paths hide real rewards and almost every detour has purpose.', caveat: 'Normal difficulty softens attrition, and Khan’s arrival can feel convenient until later arcs justify him.', impact: 'Loop · Atmosphere · Readability' },
  { id: '03', title: 'Market → Dead City → Khan', spoiler: 'light', color: COLORS.retroMint, observation: 'Market makes the surface feel like an expedition before the gate opens. Dead City turns open sky into exposure, poison air, demons, traps, hidden rooms, and memory.', proof: 'The surface is not freedom. It is exposure, preparation, vertical threat, and memory. Bourbon’s capture closes his role through consequence.', caveat: 'Dead City navigation can be ambiguous, and demon pressure can annoy.', impact: 'Atmosphere · Engagement · Unique Insight' },
  { id: '04', title: 'Khan’s Rules → Cursed Station', spoiler: 'light', color: COLORS.violet, observation: 'Khan turns the unseen layer into something readable. He recognizes the dead, prays to let them pass, and warns Artyom not to touch silhouettes.', proof: 'Darkness is not only danger, it is hidden rule-space. The right answer can be to wait, listen, stay still, or let a neutral force pass.', caveat: 'Some ritual logic remains abstract, and Cursed Station’s mutant waves can feel spammy.', impact: 'Unique Insight · Readability · Atmosphere' },
  { id: '05', title: 'Armory → Frontline', spoiler: 'light', color: COLORS.engagementPink, observation: 'Armory moves quickly into human surveillance. The station warns that the Reds are watching, then turns Artyom into a fugitive.', proof: 'Frontline proves linearity does not mean empty agency. Interrogation, pipes, traps, lower routes, gas-mask pressure, and night vision all matter.', caveat: 'Andrew’s rescue is convenient, and the VSV buy is veteran optimization rather than required identity shift.', impact: 'Agency Limit · Readability · Engagement' },
  { id: '06', title: 'Depot → Defense → Outpost → Black Station', spoiler: 'light', color: COLORS.cyan, observation: 'This midgame stretch rotates pressure formats without letting the route feel empty.', proof: 'Outpost gives the surface a purpose, Black Station mirrors Frontline with cleaner stealth, and Defense re-compresses threat into station life.', caveat: 'The ally sacrifice has limited weight because the character is introduced briefly.', impact: 'Engagement · Loop · Readability' },
  { id: '07', title: 'Polis → Library → Archives', spoiler: 'medium', color: COLORS.technicalBlue, observation: 'Polis lands as a bright, wealthy, prestigious capital, which makes institutional refusal sharper.', proof: 'The Library turns political failure into physical trial. The Librarian rule is memorable: do not fight, do not run, keep watching.', caveat: 'Polis is more grand set-piece than explorable capital, and Librarian pathing can produce awkward edge cases.', impact: 'Readability · D Friction · Atmosphere' },
  { id: '08', title: 'Sparta → D6', spoiler: 'medium', color: COLORS.lime, observation: 'Sparta functions as true final staging. The Rangers turn the route into an operation.', proof: 'D6 turns myth into a hidden Pandora’s box. Generators, doors, flamethrowers, anomalies, reactors, biomass, and buried hardware make solution feel earned.', caveat: 'Sending Artyom forward repeatedly is half player logic and half strange story logic.', impact: 'Engagement · Atmosphere · Technical' },
  { id: '09', title: 'Tower → Ending Reconstruction', spoiler: 'heavy', color: COLORS.danger, observation: 'Tower closes the route as a vertical push above the world that shaped him.', proof: 'The final act completes the visibility thesis. Artyom can act decisively against something he still does not fully understand.', caveat: 'The direct Ethereal/Tower vision capture was blocked by local FOV/config/render issues, so the interpretation is disclosed as reconstructed.', impact: 'Unique Insight · Engagement · Atmosphere' },
];

export default function AlertedMetroReviewTemplate() {
  const progress = useScrollProgress();
  const dataChecks = useMemo(() => runStaticReviewChecks(), []);
  const smokeTests = useMemo(() => runDeveloperSmokeTests(dataChecks), [dataChecks]);

  return (
    <main className="scr-root">
      <TemplateCSS />
      <BackgroundField />
      <Hud progress={progress} />
      <div className="scr-shell">
        <Hero />
        <AudienceFit />
        <ScoreAnatomy dataChecks={dataChecks} />
        <FieldNote />
        <AxisDiagnosis />
        <CorrectionLedger dataChecks={dataChecks} />
        <InsightModule />
        <AdversarialAudit />
        <EvidenceBoard />
        <DeveloperDiagnostics tests={smokeTests} />
        <footer className="scr-footer">ALERTED Review Engine · Metro 2033 Redux · Release Candidate Template · 2026</footer>
      </div>
    </main>
  );
}

function TemplateCSS() {
  return <style>{TEMPLATE_CSS}</style>;
}

// CSS intentionally omitted in this source snapshot to keep this GitHub source artifact lightweight.
// The active canvas contains the full TEMPLATE_CSS block and remains the canonical visual preview state.
const TEMPLATE_CSS = `
.scr-root{min-height:100vh;background:#05060a;color:#e7ecf3;font-family:Inter,ui-sans-serif,system-ui,Segoe UI,sans-serif}
`;
