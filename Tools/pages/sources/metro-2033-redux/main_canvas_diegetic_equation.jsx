import { Fragment, useEffect, useMemo, useState } from 'react';

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
        <InspectFit />
        <HeroContext />
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

function BackgroundField() {
  return <div className="scr-bg" aria-hidden="true" />;
}

function Hud({ progress }) {
  return (
    <div className="scr-hud">
      <div className="scr-hud-inner">
        <div className="scr-hud-title"><span className="scr-pulse" />ALERTED // Review Engine</div>
        <nav className="scr-hud-links" aria-label="Report navigation">
          <a href="../../../">Project</a>
          <a className="hot" href="../../">Reports</a>
          <a href="https://github.com/Kenessy/Kenessy">GitHub</a>
        </nav>
        <div className="scr-progress"><span>{String(Math.round(progress * 100)).padStart(2, '0')}%</span><div><i style={{ transform: `scaleX(${progress})` }} /></div></div>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="scr-hero">
      <div className="scr-hero-grid">
        <div className="scr-hero-copy">
          <div className="scr-kicker">Field Report · {REVIEW.framework}</div>
          <h1>Metro <span>2033 Redux</span></h1>
          <p className="scr-identity">{REVIEW.oneLineIdentity}</p>
        </div>
        <DiegeticVerdict />
      </div>
    </section>
  );
}

function HeroContext() {
  return (
    <section className="scr-hero-context" aria-label="Report context">
      <HeroMetaRail />
      <HeroVerdictStrip />
      <AlertLegend />
    </section>
  );
}

function HeroMetaRail() {
  const meta = [
    ['Status', REVIEW.reviewStatus],
    ['Evidence', REVIEW.evidenceBase],
    ['Confidence', REVIEW.confidence],
    ['Spoilers', REVIEW.spoilerPolicy],
    ['Risk', REVIEW.verdictRisk],
  ];

  return (
    <div className="scr-meta-rail">
      {meta.map(([label, value]) => <div key={label}><small>{label}</small><b>{value}</b></div>)}
    </div>
  );
}

function HeroVerdictStrip() {
  const items = [
    { label: 'Action', value: REVIEW.action, tone: COLORS.loopAmber },
    { label: 'Confidence', value: `${REVIEW.confidence} · ${REVIEW.confidenceScore}/100`, tone: COLORS.retroMint },
    { label: 'Main pull', value: REVIEW.mainPull, tone: COLORS.atmosphereIndigo },
    { label: 'Main drag', value: REVIEW.mainDrag, tone: COLORS.lime },
    { label: 'Risk', value: REVIEW.mainRisk, tone: COLORS.danger },
    { label: 'Next test', value: REVIEW.nextTest, tone: COLORS.technicalBlue },
  ];

  return (
    <div className="scr-hero-verdict-strip">
      {items.map((item) => (
        <Fragment key={item.label}>
          <div style={{ '--tone': item.tone }}>
            <small>{item.label}</small>
            {' '}
            <b>{item.value}</b>
          </div>
          {' '}
        </Fragment>
      ))}
    </div>
  );
}

function AlertLegend() {
  return (
    <details className="scr-legend">
      <summary>Open ALERTED tutorial - what the axes and modifiers measure</summary>
      <div>
        {ALERT_DEFINITIONS.map((item) => (
          <article key={`${item.letter}-${item.name}`}>
            <b style={{ color: item.color }}>{item.letter}</b>
            <h3>{item.name}</h3>
            <small style={{ color: item.color }}>{item.micro}</small>
            <p>{item.definition}</p>
          </article>
        ))}
      </div>
    </details>
  );
}

function DiegeticVerdict() {
  const activeRows = Math.max(0, Math.min(20, Math.round((REVIEW.score / 100) * 20)));

  return (
    <aside className="scr-verdict scr-verdict-simple">
      <div className="scr-score-panel scr-score-panel-meter scr-score-panel-simple" style={{ '--tone': COLORS.amber }}>
        <div className="scr-main-score-title">Final Score</div>
        <SignalMeterBlock className="scr-main-score-meter" value={REVIEW.score} color={COLORS.amber} activeRows={activeRows} grade={REVIEW.rank} />
      </div>
    </aside>
  );
}

function InspectFit() {
  return (
    <section className="scr-inspect-section">
      <SectionHead
        num="01"
        kicker="Taste Inspect"
        title="INSPECT"
        emphasis="Player Fit"
        desc="Not a score. This is the taste profile: immersion, narrative, systems, performance, exploration, comfort, and teamplay."
      />
      <div className="scr-inspect-metrics" aria-label="INSPECT player fit metrics">
        {INSPECT_FIT.map((row) => <InspectFitMetric key={row.name} row={row} />)}
      </div>
    </section>
  );
}

function InspectFitMetric({ row }) {
  const activeRows = Math.max(0, Math.min(20, Math.round(row.score * 2)));

  return (
    <article className="scr-inspect-metric" style={{ '--tone': row.color }}>
      <div className="scr-inspect-headline">
        <div className="scr-inspect-letter">{row.letter}</div>
        <div className="scr-inspect-name">{row.name}</div>
      </div>
      <SignalMeterBlock className="scr-inspect-meter" value={row.score} color={row.color} activeRows={activeRows} />
    </article>
  );
}

function AudienceFit() {
  return (
    <section>
      <SectionHead num="02" kicker="Audience Fit" title="Who the" emphasis="86" desc="The score is not universal. Match the player type first, then read the verdict." />
      <div className="scr-fit-grid">
        {FIT_VERDICTS.map((item) => <article key={item.label} className="scr-fit-card" style={{ '--tone': item.tone }}><small>{item.label}</small><h3>{item.value}</h3><p>{item.text}</p></article>)}
      </div>
      <div className="scr-thesis"><small>Core Thesis</small><p>{REVIEW.thesis}</p></div>
    </section>
  );
}

function ScoreAnatomy({ dataChecks }) {
  return (
    <section>
      <SectionHead num="03" kicker="Score Anatomy" title="ALERTED" emphasis="Score Strip" desc="Five main axes score the core review. Extra handles fit limits. Danger keeps concrete risks visible." />
      <div className="scr-score-strip">
        {AXES.map((axis) => <ScoreTile key={axis.name} item={axis} mode="positive" />)}
        {MODIFIERS.map((mod) => <ScoreTile key={mod.name} item={mod} mode="negative" />)}
      </div>
      <DiegeticEquation dataChecks={dataChecks} />
    </section>
  );
}

function ScoreTile({ item, mode }) {
  const negative = mode === 'negative';
  const value = negative ? Math.abs(item.value) : item.score;
  const activeRows = Math.max(0, Math.min(20, Math.round(value)));

  return (
    <article className="scr-score-tile" style={{ '--tone': item.color, '--off': inactiveMeterRow(item.color, item.name === 'Danger') }}>
      <ScoreTileHeader item={item} />
      <SignalMeterBlock value={item.score ?? item.value} color={item.color} activeRows={activeRows} fillFrom={negative ? 'top' : 'bottom'} danger={item.name === 'Danger'} />
      <ScoreTileGrade item={item} />
    </article>
  );
}

function SignalMeterBlock({ value, color, activeRows = 20, fillFrom = 'bottom', danger = false, label, note, grade, className = '' }) {
  const negative = fillFrom === 'top';
  const boundary = getMeterBoundaryPercent({ fillFrom, activeRows });
  const tonePair = getMeterTonePair(color, danger);
  const brightClip = negative ? `inset(0 0 ${100 - boundary}% 0)` : `inset(${boundary}% 0 0 0)`;
  const darkClip = negative ? `inset(${boundary}% 0 0 0)` : `inset(0 0 ${100 - boundary}% 0)`;
  const classes = `${className} scr-score-meter-box scr-signal-block`.trim();

  return (
    <div className={classes} style={{ '--tone': color }}>
      <MeterRows color={color} activeRows={activeRows} fillFrom={fillFrom} danger={danger} />
      <div className="scr-tile-edge top" />
      <div className="scr-tile-edge bottom" />
      {label ? <span className="scr-signal-kicker">{label}</span> : null}
      <ScoreTileNumber value={value} style={{ clipPath: darkClip, ...meterTextStyle(tonePair, 'dark') }} />
      <ScoreTileNumber value={value} style={{ clipPath: brightClip, ...meterTextStyle(tonePair, 'bright') }} />
      {grade ? <div className="scr-main-score-rank">{grade}</div> : null}
      {note ? <small className="scr-signal-note">{note}</small> : null}
    </div>
  );
}

function ScoreTileHeader({ item }) {
  return <div className="scr-tile-outside-head" style={{ color: item.color }}><div className="scr-tile-letter">{item.letter}</div><div className="scr-tile-name">{item.name}</div><div className="scr-tile-desc">{item.descriptor}</div></div>;
}

function ScoreTileNumber({ value, style }) {
  return <div className="scr-tile-number-layer" style={style}><div className="scr-tile-value">{value}</div></div>;
}

function ScoreTileGrade({ item }) {
  return <div className="scr-tile-outside-grade" style={{ color: item.color }}>{item.grade ?? (item.name === 'Extra' ? 'Design limit' : 'Traceable')}</div>;
}

function MeterRows({ color, activeRows, fillFrom, danger }) {
  const percent = `${Math.max(0, Math.min(100, (activeRows / 20) * 100))}%`;
  const activeColor = danger ? COLORS.danger : color;
  const inactiveColor = inactiveMeterRow(color, danger);

  return (
    <div
      className="scr-meter-screen"
      style={{ '--meter-fill': percent, '--meter-color': activeColor, '--meter-off': inactiveColor }}
    >
      <div className={`scr-solid-meter-fill ${fillFrom === 'top' ? 'from-top' : 'from-bottom'}`} />
    </div>
  );
}

function DiegeticEquation({ dataChecks }) {
  const deduction = Math.abs(dataChecks.correctionTotal);
  return (
    <div className="scr-score-terminal">
      <div className="scr-terminal-head"><b>Score Calculator</b><span>LCD equation · {dataChecks.mathPass ? 'LOCKED' : 'CHECK'}</span></div>
      <div className="scr-lcd">
        <LCDPixelBackdrop />
        <div className="scr-lcd-top"><span>ALERTED SUM BUS</span><span>{dataChecks.rawTotal} - {deduction} = {REVIEW.score}</span></div>
        <div className="scr-lcd-equation"><LCDNumber value={dataChecks.rawTotal} color={COLORS.atmosphereIndigo} /><LCDOperator symbol="−" color={COLORS.danger} /><LCDNumber value={deduction} color={COLORS.danger} /><LCDOperator symbol="=" color={COLORS.loopAmber} /><LCDNumber value={REVIEW.score} color={COLORS.loopAmber} large /></div>
        <div className="scr-lcd-foot"><div><span style={{ color: COLORS.atmosphereIndigo }}>{dataChecks.rawTotal}</span> axis subtotal</div><div><span style={{ color: COLORS.danger }}>{deduction}</span> ED deduction</div><div><span style={{ color: COLORS.loopAmber }}>{REVIEW.score}</span> final public score</div></div>
      </div>
    </div>
  );
}

function LCDPixelBackdrop() {
  return <div className="scr-lcd-bg">{Array.from({ length: 12 }, (_, i) => <i key={i} />)}</div>;
}

function LCDNumber({ value, color, large = false }) {
  return <div className={`scr-lcd-number ${large ? 'large' : ''}`} style={{ '--tone': color }}><span>{value}</span></div>;
}

function LCDOperator({ symbol, color }) {
  return <div className="scr-lcd-operator" style={{ '--tone': color }}>{symbol}</div>;
}

function FieldNote() {
  const applies = ['Atmospheric', 'Survival FPS', 'Story-rich', 'Novel-rooted', 'Curated exploration', 'Resource pressure', 'Memorable companions', 'Cohesive world'];
  const rejects = ['MMO', 'Sandbox', 'Open-world RPG', 'Buildcraft', 'Power fantasy', 'Loot treadmill', 'Checklist exploration', 'Comfort stealth'];

  return (
    <section>
      <SectionHead num="04" kicker="Reviewer Note" title="Short" emphasis="Human Verdict" desc="What the numbers do not say: why Metro stays with you long after you put it down." />
      <div className="scr-note-grid">
        <div className="scr-paper-wrap"><article className="scr-paper"><i className="scr-paper-staple" /><div className="scr-paper-head"><div><small>Recovered Field Note</small><h3>Human Verdict</h3></div><div className="scr-paper-stamp">Metro 2033 Redux<br />ALERTED / 03</div></div><div className="scr-paper-body"><p><span className="scr-dropcap">M</span>etro does not rely on any single ingredient being exceptional on its own. It works because the final stew has a bitter, smoky, nostalgic taste that none of those ingredients could create alone.</p><p>The world shifts around Artyom as he moves through it: warmly lit inhabited stations, half-abandoned service tunnels, sudden muzzle flashes cutting through the dark, and the bright surface with its poisonous air and irradiated ruins.</p><p>What stays with you is all of it together: a tale about human fear, the unknown, and the ascent from the deepest dark of the Metro to the roof of the world.</p></div></article></div>
        <KeywordPanel applies={applies} rejects={rejects} />
      </div>
    </section>
  );
}

function KeywordPanel({ applies, rejects }) {
  return (
    <aside className="scr-keyword-panel">
      <div className="scr-keyword-glow" />
      <div className="scr-keyword-head"><small>Reader Keywords</small><h3>Quick Fit Tags</h3><p>Fast public scan: what this review says the game is, and what it is not.</p></div>
      <div className="scr-keyword-hero"><span>Primary flavor</span><b>Atmospheric Survival FPS</b></div>
      <KeywordGroup title="Applies" tags={applies} tone={COLORS.green} />
      <KeywordGroup title="Does not apply" tags={rejects} tone={COLORS.red2} negative />
    </aside>
  );
}

function KeywordGroup({ title, tags, tone, negative = false }) {
  return <div className="scr-keyword-group" style={{ '--tone': tone }}><div className="scr-keyword-group-title"><h4>{title}</h4><span>{tags.length} tags</span></div><div className="scr-keyword-cloud">{tags.map((tag, index) => <KeywordPill key={tag} tag={tag} negative={negative} featured={!negative && index < 3} />)}</div></div>;
}

function KeywordPill({ tag, negative, featured }) {
  const className = `${negative ? 'negative' : ''} ${featured ? 'featured' : ''}`.trim();
  return <span className={className}>{negative ? '×' : '✓'} {tag}</span>;
}

function AxisDiagnosis() {
  return <section><SectionHead num="05" kicker="Tier 1" title="ALERT" emphasis="Axis Diagnosis" desc="Five diagnosis rows. Each axis gets its own d20 roll, segment bar, and written reasoning." /><div className="scr-axis-list">{AXES.map((axis) => <AxisRow key={axis.name} axis={axis} />)}</div></section>;
}

function AxisRow({ axis }) {
  return <article className="scr-axis-row" style={{ '--tone': axis.color }}><div className="scr-axis-title"><small>ALERT Axis</small><h3>{axis.name}</h3><span>{axis.grade} · {axis.score}/20</span></div><div className="scr-axis-body"><SegmentBar value={axis.score} color={axis.color} /><p>{axis.text}</p></div><SignalMeterBlock className="scr-d20-wrap" value={axis.score} color={axis.color} activeRows={axis.score} label="Axis" note="/20" /></article>;
}

function SegmentBar({ value, color }) {
  return <div className="scr-segments">{Array.from({ length: 20 }, (_, i) => <i key={i} style={i < value ? { backgroundColor: color, boxShadow: `0 0 8px ${color}99` } : {}} />)}</div>;
}

function CorrectionLedger({ dataChecks }) {
  const extra = MODIFIERS.find((item) => item.name === 'Extra');
  const danger = MODIFIERS.find((item) => item.name === 'Danger');

  return (
    <section>
      <SectionHead
        num="06"
        kicker="Correction Ledger"
        title="Modifier"
        emphasis="Risk Split"
        desc="Extra is a contextual fit modifier. Danger is the concrete friction pool. They both subtract, but they do not mean the same thing."
      />
      <div className="scr-correction-split">
        <article className="scr-extra-panel" style={{ '--tone': extra.color }}>
          <div className="scr-extra-panel-top">
            <div><small>E · Extra Modifier</small><h3>{extra.name}</h3></div>
            <b>{formatSigned(extra.value)}</b>
          </div>
          <div className="scr-extra-main">
            <span>{extra.label}</span>
            <p>{extra.text}</p>
          </div>
          <div className="scr-extra-footer">
            <strong>Context cap</strong>
            <em>Not a bug · not danger · audience-fit deduction</em>
          </div>
        </article>

        <div className="scr-danger-panel">
          <div className="scr-ledger">
            <div className="scr-ledger-head">
              <div><small>D · Danger Pool</small><h3>Danger Total</h3></div>
              <b>{formatSigned(danger.value)}</b>
            </div>
            <LedgerRow item={{ ...danger, id: 'MOD · 02 · DANGER POOL' }} />
            {FRICTION_ITEMS.map((item, i) => (
              <LedgerRow key={item.name} item={{ ...item, id: `FRICTION · 0${i + 1}`, label: `${item.severity} · ${item.evidence}` }} small />
            ))}
            <div className="scr-ledger-check">Row check: {dataChecks.residualPass ? 'pass' : 'mismatch'} · residual subtotal {formatSigned(danger.value)}</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function LedgerRow({ item, small = false }) {
  const className = `scr-ledger-row ${small ? 'scr-ledger-subrow' : item.name === 'Danger' ? 'scr-ledger-parent' : ''}`.trim();
  return (
    <article className={className} style={{ '--tone': item.color }}>
      <div className="scr-ledger-title"><small>{item.id}</small><h4>{item.name}</h4><span>{item.label}</span></div>
      <p>{item.text}</p>
      <div className="scr-ledger-value"><b>{formatSigned(item.value)}</b><small>{small ? 'Sub-component' : item.name === 'Extra' ? 'Limit' : 'Parent total'}</small></div>
    </article>
  );
}

function InsightModule() {
  return <section><SectionHead num="07" kicker="Unique Insight Module" title="Light," emphasis="Exposure, Judgment" desc="Spoiler-light theses. Metro’s darkness is not only danger, it is a superposition of possibilities that light collapses." /><div className="scr-insight-grid">{INSIGHTS.map((row) => <article key={row.title} className="scr-insight" style={{ '--tone': row.color }}><small>{row.label}</small><h3>{row.title}</h3><p>{row.text}</p></article>)}</div></section>;
}

function AdversarialAudit() {
  return <section><SectionHead num="08" kicker="Adversarial Audit" title="Trust" emphasis="Layer" desc="Public-facing stress tests that keep the verdict honest, lens-specific, and falsifiable." /><div className="scr-audit-grid">{AUDIT_CHECKS.map((check) => <article key={check.title} className="scr-audit-card" style={{ '--tone': check.tone }}><small>{check.label}</small><h3>{check.title}</h3><p>{check.text}</p></article>)}</div></section>;
}

function EvidenceBoard() {
  return (
    <section>
      <SectionHead
        num="09"
        kicker="Evidence Board"
        title="Dossier"
        emphasis="Arc Rail"
        desc="Reconstructed playthrough archive. Each arc separates observation, interpretation, caveat, and axis impact without hiding the structure in accordions."
      />
      <div className="scr-evidence-board">
        {EVIDENCE_ARCS.map((arc) => <EvidenceCard key={arc.id} arc={arc} />)}
      </div>
      <EvidenceProtocol />
    </section>
  );
}

function EvidenceProtocol() {
  const protocol = [
    { label: 'Evidence', value: REVIEW.evidenceProtocol, tone: COLORS.retroMint },
    { label: 'Snapshot note', value: REVIEW.snapshotNote, tone: COLORS.loopAmber },
    { label: 'Known caveat', value: REVIEW.verdictRisk, tone: COLORS.danger },
    { label: 'Falsifier', value: 'Cleaner monsters, stronger route authorship, or repeated technical issues would move the score.', tone: COLORS.engagementPink },
  ];

  return (
    <div className="scr-evidence-protocol">
      <div className="scr-evidence-protocol-head">
        <small>Evidence Protocol</small>
        <b>Trust footer</b>
      </div>
      <div className="scr-evidence-protocol-grid">
        {protocol.map((item) => (
          <div key={item.label} style={{ '--tone': item.tone }}>
            <small>{item.label}</small>
            <p>{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function EvidenceCard({ arc }) {
  const spoilerClass = arc.spoiler === 'heavy' ? 'scr-spoiler-heavy' : arc.spoiler === 'medium' ? 'scr-spoiler-medium' : '';
  return <article className="scr-evidence-card" style={{ '--tone': arc.color }}><SignalMeterBlock className="scr-evidence-marker" value={arc.id} color={arc.color} activeRows={20} label="ARC" note="Dossier" /><div><div className="scr-evidence-title-row"><h3>{arc.title}</h3><span className={`scr-spoiler ${spoilerClass}`}>Spoiler-{arc.spoiler}</span></div><div className="scr-evidence-cells"><EvidenceCell label="Clean observation" text={arc.observation} /><EvidenceCell label="What it proves" text={arc.proof} /><EvidenceCell label="Caveat" text={arc.caveat} muted /></div><div className="scr-evidence-impact">▸ Axis impact · {arc.impact}</div></div></article>;
}

function EvidenceCell({ label, text, muted = false }) {
  return <div className={muted ? 'muted' : ''}><small>{label}</small><p>{text}</p></div>;
}

function DeveloperDiagnostics({ tests }) {
  const passCount = tests.filter((test) => test.pass).length;
  return <section className="scr-dev-section"><details className="scr-dev-details"><summary><span>Developer diagnostics</span><b>{passCount}/{tests.length} checks passing</b></summary><p className="scr-dev-note">Internal checks stay collapsed by default so the public report remains clean.</p><div className="scr-dev-grid">{tests.map((test) => <article key={test.name} className={test.pass ? '' : 'fail'}><small>{test.pass ? 'PASS' : 'FAIL'}</small><h3>{test.name}</h3><p>{test.detail}</p></article>)}</div></details></section>;
}

function SectionHead({ num, kicker, title, emphasis, desc }) {
  return <div className="scr-section-head"><div><small>{num} · {kicker}</small><h2>{title} <span>{emphasis}</span></h2></div><p>{desc}</p></div>;
}

function runStaticReviewChecks() {
  const rawTotal = AXES.reduce((sum, axis) => sum + axis.score, 0);
  const correctionTotal = MODIFIERS.reduce((sum, item) => sum + item.value, 0);
  const residualTotal = FRICTION_ITEMS.reduce((sum, item) => sum + item.value, 0);

  return {
    rawTotal,
    correctionTotal,
    residualTotal,
    mathPass: rawTotal + correctionTotal === REVIEW.score && rawTotal === REVIEW.rawScore && correctionTotal === REVIEW.friction,
    residualPass: Math.abs(residualTotal - MODIFIERS[1].value) < 0.001,
    arcCountPass: EVIDENCE_ARCS.length === 9,
    alertDefinitionPass: ALERT_DEFINITIONS.length === 7,
    acronymPass: ALERT_DEFINITIONS.map((item) => item.letter).join('') === 'ALERTED',
    modifierPass: MODIFIERS.map((item) => item.name).join('|') === 'Extra|Danger',
    modifierSeparationPass: Boolean(MODIFIERS.find((item) => item.name === 'Extra')) && Boolean(MODIFIERS.find((item) => item.name === 'Danger')),
    scoreRangePass: AXES.every((axis) => axis.score >= 0 && axis.score <= 20),
    solidMeterPass: AXES.length + MODIFIERS.length === 7,
    inspectFitPass: INSPECT_FIT.length === 7 && INSPECT_FIT.map((item) => item.letter).join('') === 'INSPECT',
    scoreTileHeaderPass: AXES.every((axis) => Boolean(axis.descriptor && axis.letter && axis.grade)),
    equationDisplayPass: REVIEW.rawScore === 90 && Math.abs(REVIEW.friction) === 4 && REVIEW.score === 86,
    publicVerdictFieldsPass: Boolean(REVIEW.action && REVIEW.mainPull && REVIEW.mainDrag && REVIEW.mainRisk && REVIEW.nextTest),
    auditCoveragePass: ['Lens Honesty', 'Comfort Bias', 'Sampling Bias', 'Spectacle Bias', 'Friction Blindness', 'Patch Volatility', 'Audience Confusion', 'Falsifier'].every((label) => AUDIT_CHECKS.some((check) => check.label === label)),
    evidenceProtocolPass: Boolean(REVIEW.evidenceProtocol && REVIEW.snapshotNote && REVIEW.verdictRisk),
  };
}

function runDeveloperSmokeTests(d) {
  return [
    { name: 'Score math', pass: d.mathPass, detail: `${d.rawTotal} - ${Math.abs(d.correctionTotal)} = 86` },
    { name: 'Public verdict fields', pass: d.publicVerdictFieldsPass, detail: 'Expected action, confidence, pull, drag, risk, and next test' },
    { name: 'Adversarial audit coverage', pass: d.auditCoveragePass, detail: 'Expected 8 public stress checks' },
    { name: 'Evidence protocol footer', pass: d.evidenceProtocolPass, detail: 'Expected evidence protocol and snapshot note' },
    { name: 'D residual subtotal', pass: d.residualPass, detail: `${d.residualTotal} matches Danger` },
    { name: 'Evidence arc count', pass: d.arcCountPass, detail: 'Expected 9 evidence arcs' },
    { name: 'ALERTED definition count', pass: d.alertDefinitionPass, detail: 'Expected 7 definitions' },
    { name: 'ALERTED acronym', pass: d.acronymPass, detail: 'Expected A/L/E/R/T/E/D' },
    { name: 'Modifier naming', pass: d.modifierPass, detail: 'Expected Extra and Danger' },
    { name: 'Modifier separation', pass: d.modifierSeparationPass, detail: 'Expected Extra and Danger to render as separate concepts' },
    { name: 'Axis score range', pass: d.scoreRangePass, detail: 'All main axes must be 0 to 20' },
    { name: 'Solid loading meter coverage', pass: d.solidMeterPass, detail: 'Expected 7 ALERTED score tiles using solid loading bars' },
    { name: 'Score tile label split', pass: d.scoreTileHeaderPass, detail: 'Expected top label / center number / bottom grade layout' },
    { name: 'INSPECT fit profile', pass: d.inspectFitPass, detail: 'Expected I/N/S/P/E/C/T taste profile metrics' },
    { name: 'Diegetic equation display', pass: d.equationDisplayPass, detail: 'Expected 90 - 4 = 86 display values' },
  ];
}

function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const update = () => {
      const root = document.documentElement;
      const max = root.scrollHeight - root.clientHeight;
      setProgress(max > 0 ? Math.min(1, Math.max(0, root.scrollTop / max)) : 0);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);
  return progress;
}

function getMeterBoundaryPercent({ fillFrom, activeRows }) {
  const rows = Math.max(0, Math.min(20, Math.round(activeRows)));
  return fillFrom === 'top' ? (rows / 20) * 100 : ((20 - rows) / 20) * 100;
}

function meterTextStyle(pair, zone) {
  if (zone === 'bright') {
    return { color: pair.onBright, WebkitTextStroke: `.5px ${pair.lightEdge}`, textShadow: `0 1px 0 ${pair.lightEdge}, 0 0 5px rgba(255,255,255,.10)` };
  }
  return { color: pair.onDark, WebkitTextStroke: `.5px ${pair.darkEdge}`, textShadow: `0 2px 0 #000, 0 0 8px ${pair.glow}` };
}

function getMeterTonePair(color, danger = false) {
  if (danger) return { onBright: '#3a0506', onDark: '#ff6a5a', lightEdge: 'rgba(255,190,175,.20)', darkEdge: 'rgba(60,0,0,.78)', glow: 'rgba(255,45,31,.48)' };
  if (color === COLORS.amber) return { onBright: '#321600', onDark: '#ffd18a', lightEdge: 'rgba(255,218,160,.22)', darkEdge: 'rgba(58,29,0,.76)', glow: 'rgba(255,138,31,.42)' };
  if (color === COLORS.atmosphereIndigo) return { onBright: '#151036', onDark: '#DDD8FF', lightEdge: 'rgba(232,228,255,.18)', darkEdge: 'rgba(17,12,54,.82)', glow: 'rgba(124,109,255,.38)' };
  if (color === COLORS.retroMint) return { onBright: '#05342F', onDark: '#C6FFF2', lightEdge: 'rgba(220,255,247,.18)', darkEdge: 'rgba(0,40,36,.78)', glow: 'rgba(17,250,203,.38)' };
  if (color === COLORS.loopAmber) return { onBright: '#332000', onDark: '#FFE3A1', lightEdge: 'rgba(255,228,170,.20)', darkEdge: 'rgba(51,32,0,.82)', glow: 'rgba(255,176,0,.38)' };
  if (color === COLORS.technicalBlue) return { onBright: '#08204A', onDark: '#D7E5FF', lightEdge: 'rgba(220,232,255,.18)', darkEdge: 'rgba(4,18,58,.78)', glow: 'rgba(43,127,255,.38)' };
  if (color === COLORS.engagementPink) return { onBright: '#3A0015', onDark: '#FFC2D8', lightEdge: 'rgba(255,210,226,.18)', darkEdge: 'rgba(58,0,21,.82)', glow: 'rgba(255,0,93,.42)' };
  if (color === COLORS.lime) return { onBright: '#232f00', onDark: '#edff8a', lightEdge: 'rgba(245,255,170,.20)', darkEdge: 'rgba(28,38,0,.82)', glow: 'rgba(182,245,5,.38)' };
  return { onBright: '#071019', onDark: '#e7ecf3', lightEdge: 'rgba(255,255,255,.16)', darkEdge: 'rgba(0,0,0,.78)', glow: 'rgba(231,236,243,.30)' };
}

function inactiveMeterRow(color, danger) {
  if (danger) return '#210304';
  if (color === COLORS.amber) return '#3A2304';
  if (color === COLORS.atmosphereIndigo) return '#17143A';
  if (color === COLORS.retroMint) return '#0A4A43';
  if (color === COLORS.loopAmber) return '#3A2304';
  if (color === COLORS.technicalBlue) return '#0B234D';
  if (color === COLORS.engagementPink) return '#3A041A';
  if (color === COLORS.lime) return '#263300';
  return '#101621';
}

function formatSigned(value) {
  return Number.isInteger(value) ? String(value) : Number(value).toFixed(2);
}

const TEMPLATE_CSS = `
.scr-root{min-height:100vh;overflow-x:hidden;max-width:100vw;background:#05060a;color:#e7ecf3;font-family:Inter,ui-sans-serif,system-ui,Segoe UI,sans-serif;--scr-type-micro:.62rem;--scr-type-caption:.68rem;--scr-type-label:.75rem;--scr-type-label-strong:.82rem;--scr-type-panel:.86rem;--scr-type-body-xs:.84rem;--scr-type-body-sm:.9rem;--scr-type-body:.98rem;--scr-type-tile-label:.64rem;--scr-type-tile-hint:.56rem;--scr-type-main-score-title:.86rem;--scr-type-main-score-rank:3.25rem;--scr-weight-label:1000;--scr-weight-panel:1000}.scr-root *{box-sizing:border-box}.scr-root p,.scr-root h1,.scr-root h2,.scr-root h3,.scr-root h4,.scr-root small,.scr-root b,.scr-root span,.scr-root div{overflow-wrap:break-word}.scr-bg{pointer-events:none;position:fixed;inset:0;z-index:-1;background:radial-gradient(1200px 600px at 15% -10%,rgba(255,138,31,.12),transparent 60%),radial-gradient(1000px 700px at 110% 20%,rgba(93,220,255,.08),transparent 60%),linear-gradient(180deg,#05060a,#060810 50%,#05060a)}.scr-shell{width:min(1400px,calc(100% - 24px));margin:0 auto;display:grid;gap:1.5rem;padding:1rem 0 2.5rem}.scr-hud{position:sticky;top:0;z-index:50;border-bottom:1px solid #1e2733;background:rgba(5,6,10,.82);backdrop-filter:blur(16px)}.scr-hud-inner{width:min(1400px,calc(100% - 24px));margin:0 auto;display:flex;flex-wrap:wrap;align-items:center;gap:1rem;padding:.55rem 0;color:#8592a5;font-size:var(--scr-type-micro);font-weight:var(--scr-weight-label);text-transform:uppercase;letter-spacing:0}.scr-hud-title{display:flex;align-items:center;gap:.75rem;color:#d9c9a3}.scr-pulse{width:.65rem;height:.65rem;border-radius:999px;background:#ff2d1f;box-shadow:0 0 12px #ff2d1f;animation:scrPulse 1.2s infinite}.scr-hud-links{display:flex;gap:.5rem;flex-wrap:wrap;align-items:center;order:3;width:100%}.scr-hud-links a{display:inline-flex;align-items:center;justify-content:center;min-height:2rem;border:1px solid #2a3444;background:rgba(255,255,255,.02);padding:.35rem .55rem;color:#8592a5;text-decoration:none}.scr-hud-links .hot{color:#ffb347;border-color:#ff8a1f}.scr-progress{margin-left:auto;display:none;align-items:center;gap:.7rem;min-width:220px}.scr-progress div{height:3px;flex:1;overflow:hidden;background:#1e2733}.scr-progress i{display:block;height:100%;transform-origin:left;background:linear-gradient(90deg,#ff8a1f,#ff2d1f);transition:transform .15s}.scr-hero{position:relative;min-height:560px;overflow:hidden;border:1px solid #1e2733;background:#000}.scr-hero::before{content:"";position:absolute;inset:0;background:radial-gradient(900px 500px at 55% 40%,rgba(255,138,31,.18),transparent 60%),radial-gradient(800px 450px at 20% 75%,rgba(93,220,255,.16),transparent 55%),linear-gradient(115deg,rgba(5,6,10,.92),rgba(5,6,10,.72) 42%,rgba(5,6,10,.95))}.scr-hero::after{content:"";position:absolute;inset:0;opacity:.15;background-image:linear-gradient(90deg,rgba(255,255,255,.08) 1px,transparent 1px),linear-gradient(0deg,rgba(255,255,255,.06) 1px,transparent 1px);background-size:80px 80px}.scr-hero-grid{position:relative;z-index:1;display:grid;align-items:start;gap:1.2rem clamp(1.25rem,4vw,3rem);padding:clamp(1.25rem,4vw,2rem);min-width:0}.scr-hero-copy{min-width:0}.scr-hero-context{display:grid;gap:1rem;overflow:hidden;background:linear-gradient(180deg,rgba(13,17,23,.92),rgba(8,12,18,.92))}.scr-kicker{display:flex;align-items:center;gap:.75rem;color:#ffb347;font-size:var(--scr-type-label);font-weight:900;text-transform:uppercase;letter-spacing:0}.scr-kicker::before{content:"";height:1px;width:42px;background:#ff8a1f}.scr-hero h1{margin:1.5rem 0 0;color:#d9c9a3;font-size:7.4rem;line-height:.80;text-transform:uppercase;letter-spacing:0;font-weight:1000;-webkit-text-stroke:1px rgba(217,201,163,.20);text-shadow:5px 5px 0 #000,0 0 34px rgba(255,138,31,.16),0 8px 48px rgba(0,0,0,.92)}.scr-hero h1 span{display:block;color:#ff8a1f;-webkit-text-stroke:1px rgba(255,179,71,.18);text-shadow:5px 5px 0 #000,0 0 30px rgba(255,138,31,.24),0 8px 48px rgba(0,0,0,.92)}.scr-identity{margin-top:1.1rem;max-width:660px;color:#b8a982;font-size:.98rem;line-height:1.62}.scr-meta-rail{margin-top:0;display:grid;min-width:0;border-top:1px solid rgba(255,255,255,.10);border-bottom:1px solid rgba(255,255,255,.10)}.scr-meta-rail div{padding:.8rem .9rem;border-bottom:1px solid rgba(255,255,255,.10);min-width:0}.scr-meta-rail small{display:block;color:#8592a5;font-size:var(--scr-type-caption);font-weight:var(--scr-weight-label);text-transform:uppercase;letter-spacing:0}.scr-meta-rail b{display:block;margin-top:.35rem;color:#d9c9a3;font-size:var(--scr-type-label-strong)}.scr-hero-verdict-strip{display:grid;gap:.6rem;min-width:0}.scr-hero-verdict-strip>div{min-width:0;border-left:3px solid var(--tone);background:rgba(255,255,255,.025);padding:.62rem .75rem}.scr-hero-verdict-strip small{display:block;color:var(--tone);font-family:ui-monospace,Menlo,monospace;font-size:var(--scr-type-caption);font-weight:var(--scr-weight-label);text-transform:uppercase;letter-spacing:0}.scr-hero-verdict-strip b{display:block;margin-top:.18rem;color:#d9c9a3;font-size:var(--scr-type-panel);line-height:1.25}.scr-legend{margin-top:0;border:1px dashed #2a3444;background:rgba(255,255,255,.015);padding:1rem}.scr-legend summary{cursor:pointer;display:flex;align-items:center;min-height:2.75rem;padding:.25rem 0;line-height:1.2;list-style:none;color:#5ddcff;font-size:var(--scr-type-label);font-weight:var(--scr-weight-label);text-transform:uppercase;letter-spacing:0}.scr-legend summary::-webkit-details-marker{display:none}.scr-legend>div{margin-top:1rem;display:grid;gap:.75rem;min-width:0}.scr-legend article{border:1px solid #1e2733;background:#0d1117;padding:.8rem;min-width:0}.scr-legend b{display:block;font-size:2.35rem;line-height:1}.scr-legend h3{margin:.25rem 0 0;color:#d9c9a3;font-size:.7rem;text-transform:uppercase;letter-spacing:0}.scr-legend small{display:block;margin-top:.25rem;font-family:ui-monospace,Menlo,monospace;font-size:.62rem;text-transform:uppercase;letter-spacing:0}.scr-legend p{margin:.5rem 0 0;color:#8592a5;font-size:.84rem;line-height:1.55}.scr-shell>section{overflow:hidden;border:1px solid #1e2733;background:#0d1117;padding:clamp(1.25rem,3vw,1.75rem)}.scr-section-head{display:flex;flex-wrap:wrap;justify-content:space-between;align-items:flex-end;gap:1.5rem;border-bottom:1px solid #1e2733;padding-bottom:1.1rem;margin-bottom:1.5rem}.scr-section-head small{display:block;color:#ff8a1f;font-size:var(--scr-type-label-strong);font-weight:var(--scr-weight-label);text-transform:uppercase;letter-spacing:0}.scr-section-head h2{margin:.25rem 0 0;color:#d9c9a3;font-size:2.35rem;line-height:1;text-transform:uppercase}.scr-section-head h2 span{color:#ff8a1f}.scr-section-head p{margin:0;max-width:580px;color:#8592a5;font-size:.9rem;line-height:1.55}.scr-verdict-simple{display:grid;place-items:start center;min-height:0}.scr-score-panel{position:relative;isolation:isolate;width:min(330px,100%);min-height:520px;overflow:hidden;border:1px solid rgba(255,179,71,.78);background:linear-gradient(145deg,#ffb347 0%,#ff8a1f 26%,#ff6b0b 58%,#8f2d08 100%);box-shadow:0 0 0 1px rgba(255,138,31,.18),0 28px 80px rgba(0,0,0,.62),0 0 60px rgba(255,122,0,.18),inset 0 0 0 1px rgba(255,255,255,.18),inset 0 -70px 110px rgba(54,12,0,.34);display:flex;flex-direction:column;justify-content:space-between;padding:1.05rem;text-align:center}.scr-score-panel::before{content:"";pointer-events:none;position:absolute;inset:0;z-index:-1;background:linear-gradient(90deg,rgba(0,0,0,.18) 1px,transparent 1px),linear-gradient(0deg,rgba(255,255,255,.10) 1px,transparent 1px);background-size:28px 100%,100% 26px;opacity:.18}.scr-score-panel::after{content:"";pointer-events:none;position:absolute;inset:.65rem;border:1px solid rgba(42,14,2,.42);box-shadow:inset 0 0 0 1px rgba(255,225,170,.14)}.scr-score-panel-glare{pointer-events:none;position:absolute;inset:-18%;background:linear-gradient(118deg,transparent 0 28%,rgba(255,255,255,.28) 38%,rgba(255,255,255,.08) 46%,transparent 61%);opacity:.48;mix-blend-mode:screen}.scr-score-panel-head{position:relative;z-index:1;display:flex;align-items:center;justify-content:space-between;gap:1rem;border-bottom:1px solid rgba(43,13,0,.34);padding-bottom:.9rem}.scr-score-panel-head span{color:#321100;font-family:ui-monospace,Menlo,monospace;font-size:.62rem;font-weight:1000;text-transform:uppercase;letter-spacing:0}.scr-score-panel-head b{border:1px solid rgba(54,18,0,.42);background:rgba(255,255,255,.10);color:#2b0d00;padding:.32rem .5rem;font-size:.58rem;font-weight:1000;text-transform:uppercase;letter-spacing:0}.scr-score-panel-main{position:relative;z-index:1;display:grid;place-items:center;gap:.25rem}.scr-score-panel-number{color:#170700;font-size:9.2rem;font-weight:1000;line-height:.76;letter-spacing:0;text-shadow:0 1px 0 rgba(255,230,180,.22),0 10px 34px rgba(0,0,0,.30)}.scr-score-panel-grade{color:#2a0d00;font-size:3.35rem;font-weight:1000;line-height:.85;letter-spacing:0;text-transform:uppercase;text-shadow:0 1px 0 rgba(255,230,180,.20)}.scr-score-panel-foot{position:relative;z-index:1;border-top:1px solid rgba(43,13,0,.34);padding-top:.9rem}.scr-score-panel-foot span{display:block;color:#2b0d00;font-size:.82rem;font-weight:1000;text-transform:uppercase;letter-spacing:0}.scr-score-panel-foot small{display:block;margin-top:.38rem;color:rgba(43,13,0,.76);font-family:ui-monospace,Menlo,monospace;font-size:.62rem;font-weight:1000;text-transform:uppercase;letter-spacing:0}.scr-score-panel.scr-score-panel-meter{border:1px solid color-mix(in srgb,var(--tone) 58%,#1e2733);background:radial-gradient(220px 160px at 50% 34%,color-mix(in srgb,var(--tone) 17%,transparent),transparent 72%),linear-gradient(180deg,#0d1117,#070a0f 58%,#05060a);box-shadow:0 0 0 1px color-mix(in srgb,var(--tone) 18%,transparent),0 28px 80px rgba(0,0,0,.62),0 0 48px color-mix(in srgb,var(--tone) 14%,transparent),inset 0 0 0 1px rgba(255,255,255,.045),inset 0 -48px 92px rgba(0,0,0,.44)}.scr-score-panel-meter::before{background:repeating-linear-gradient(0deg,rgba(255,255,255,.035) 0 1px,transparent 1px 11px),linear-gradient(90deg,rgba(255,255,255,.04) 1px,transparent 1px);background-size:100% 11px,28px 100%;opacity:.55}.scr-score-panel-meter::after{border-color:color-mix(in srgb,var(--tone) 35%,transparent);box-shadow:inset 0 0 0 1px rgba(255,255,255,.04)}.scr-score-panel-meter .scr-score-panel-head{border-bottom:1px solid #1e2733}.scr-score-panel-meter .scr-score-panel-head span{color:#ffb347}.scr-score-panel-meter .scr-score-panel-head b{border-color:color-mix(in srgb,var(--tone) 52%,#2a3444);background:color-mix(in srgb,var(--tone) 8%,transparent);color:#ffb347}.scr-score-panel-meter .scr-score-panel-foot{border-top:1px solid #1e2733}.scr-score-panel-meter .scr-score-panel-foot span{color:#d9c9a3}.scr-score-panel-meter .scr-score-panel-foot small{color:#8592a5}.scr-main-score-meter{min-height:172px}.scr-main-score-meter .scr-tile-value{font-size:5.65rem}.scr-score-panel.scr-score-panel-meter.scr-score-panel-simple{border:0;background:transparent;box-shadow:none;padding:0;overflow:visible;justify-content:flex-start;gap:.48rem;min-height:320px}.scr-score-panel.scr-score-panel-simple::before,.scr-score-panel.scr-score-panel-simple::after{display:none}.scr-main-score-title{color:#ffb347;font-family:ui-monospace,Menlo,monospace;font-size:var(--scr-type-main-score-title);font-weight:var(--scr-weight-panel);line-height:1;text-align:center;text-transform:uppercase;letter-spacing:0;text-shadow:0 1px 0 #000,0 0 10px rgba(255,179,71,.36)}.scr-score-panel-simple .scr-main-score-meter{width:100%;min-height:0;flex:1 1 auto}.scr-main-score-meter .scr-tile-value{top:43%}.scr-main-score-rank{pointer-events:none;position:absolute;z-index:4;left:.55rem;right:.55rem;top:calc(50% + 3.05rem);color:#071018;font-size:var(--scr-type-main-score-rank);font-weight:1000;line-height:.8;text-align:center;text-transform:uppercase;letter-spacing:0;text-shadow:0 1px 0 rgba(255,224,170,.28),0 0 18px rgba(255,179,71,.28)}.scr-score-panel-simple .scr-main-score-meter .scr-tile-value{font-size:6rem}.scr-fit-grid{display:grid;min-width:0;border:1px solid #1e2733;background:#0d1117}.scr-fit-card{position:relative;border-bottom:1px solid #1e2733;border-left:3px solid var(--tone);padding:1.25rem;min-width:0}.scr-fit-card:last-child{border-bottom:0}.scr-fit-card small{color:var(--tone);font-size:.62rem;font-weight:1000;text-transform:uppercase;letter-spacing:0}.scr-fit-card h3{margin:.5rem 0 0;color:#d9c9a3;font-size:1.4rem;line-height:1.12;text-transform:uppercase}.scr-fit-card p{color:#8592a5;font-size:.9rem;line-height:1.55}.scr-thesis{margin-top:1.25rem;border-left:4px solid #ff8a1f;background:linear-gradient(90deg,rgba(255,138,31,.10),transparent);padding:1.5rem}.scr-thesis small{color:#ffb347;font-size:.62rem;font-weight:1000;text-transform:uppercase;letter-spacing:0}.scr-thesis p{margin:.75rem 0 0;color:#d9c9a3;font-size:1.35rem;line-height:1.35;text-transform:uppercase;font-weight:700}.scr-score-strip{display:grid;min-width:0;border:1px solid #1e2733;background:#0d1117}.scr-score-tile{position:relative;isolation:isolate;min-height:250px;overflow:hidden;border-bottom:1px solid #1e2733;background:#0d1117;text-align:center;box-shadow:inset 0 0 0 1px color-mix(in srgb,var(--tone) 20%,transparent),inset 0 0 26px color-mix(in srgb,var(--tone) 8%,transparent);display:flex;flex-direction:column;gap:.65rem;padding:.85rem}.scr-signal-block{border:1px solid color-mix(in srgb,var(--tone) 46%,#1e2733);background:radial-gradient(120px 90px at 50% 36%,color-mix(in srgb,var(--tone) 20%,transparent),transparent 70%),repeating-linear-gradient(0deg,rgba(255,255,255,.05) 0 1px,transparent 1px 11px),linear-gradient(180deg,color-mix(in srgb,var(--tone) 13%,#071018),#05070b 58%,color-mix(in srgb,var(--tone) 8%,#05060a));box-shadow:inset 0 0 0 1px rgba(255,255,255,.035),inset 0 -24px 44px rgba(0,0,0,.34),0 0 18px color-mix(in srgb,var(--tone) 13%,transparent)}.scr-signal-kicker{display:block;color:color-mix(in srgb,var(--tone) 78%,#8592a5);font-family:ui-monospace,Menlo,monospace;font-size:var(--scr-type-micro);font-weight:var(--scr-weight-label);line-height:1;text-transform:uppercase;letter-spacing:0}.scr-signal-value{display:block;color:var(--tone);font-size:3rem;line-height:.86;font-weight:1000;letter-spacing:0;text-shadow:0 2px 0 #000,0 0 18px color-mix(in srgb,var(--tone) 34%,transparent)}.scr-signal-note{display:block;color:color-mix(in srgb,var(--tone) 58%,#8592a5);font-family:ui-monospace,Menlo,monospace;font-size:var(--scr-type-micro);font-weight:var(--scr-weight-label);line-height:1;text-transform:uppercase;letter-spacing:0}.scr-score-meter-box .scr-signal-kicker{position:absolute;z-index:4;left:.55rem;right:.55rem;top:.65rem;text-align:center}.scr-score-meter-box .scr-signal-note{position:absolute;z-index:4;left:.55rem;right:.55rem;bottom:.65rem;text-align:center}.scr-d20-wrap .scr-tile-value,.scr-evidence-marker .scr-tile-value{font-size:3.25rem}.scr-evidence-marker .scr-tile-value{font-size:3.05rem}.scr-score-meter-box{position:relative;flex:1;min-height:142px;overflow:hidden}.scr-meter-screen{position:absolute;inset:0;z-index:0;background:linear-gradient(180deg,color-mix(in srgb,var(--meter-off) 72%,#05060a),#05060a);box-shadow:inset 0 0 24px color-mix(in srgb,var(--tone) 8%,transparent);overflow:hidden}.scr-meter-screen::before{content:"";position:absolute;inset:0;z-index:1;pointer-events:none;background:linear-gradient(118deg,transparent 0 32%,rgba(255,255,255,.12) 43%,rgba(255,255,255,.035) 52%,transparent 66%),linear-gradient(0deg,rgba(255,255,255,.035) 1px,transparent 1px);background-size:100% 100%,100% 14px;opacity:.7}.scr-meter-screen::after{content:"";position:absolute;inset:0;z-index:1;pointer-events:none;box-shadow:inset 0 0 0 1px rgba(255,255,255,.035),inset 0 0 34px rgba(0,0,0,.52)}.scr-solid-meter-fill{position:absolute;left:0;right:0;z-index:0;height:var(--meter-fill);background:linear-gradient(180deg,color-mix(in srgb,var(--meter-color) 74%,#ffffff),var(--meter-color) 42%,color-mix(in srgb,var(--meter-color) 72%,#05060a));box-shadow:0 0 22px color-mix(in srgb,var(--meter-color) 38%,transparent),inset 0 1px 0 rgba(255,255,255,.20),inset 0 -18px 32px rgba(0,0,0,.22)}.scr-solid-meter-fill.from-bottom{bottom:0}.scr-solid-meter-fill.from-top{top:0}.scr-tile-edge{position:absolute;left:.75rem;right:.75rem;height:1px;z-index:1;background:linear-gradient(90deg,transparent,color-mix(in srgb,var(--tone) 58%,transparent),transparent)}.scr-tile-edge.top{top:.75rem}.scr-tile-edge.bottom{bottom:.75rem}.scr-tile-number-layer{pointer-events:none;position:absolute;inset:0;z-index:2;text-align:center}.scr-tile-outside-head{position:relative;z-index:4;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:.18rem;min-height:3.55rem;text-align:center;line-height:1.06;opacity:.92;filter:saturate(.86) brightness(1.04)}.scr-tile-outside-grade{position:relative;z-index:4;min-height:1.35rem;text-align:center;font-size:.68rem;font-weight:1000;text-transform:uppercase;letter-spacing:0;opacity:.78;filter:saturate(.86) brightness(1.04);white-space:normal;text-wrap:balance}.scr-tile-fixed-head,.scr-tile-fixed-grade{display:none}.scr-tile-letter{font-size:2rem;line-height:1;font-weight:1000;opacity:.98}.scr-tile-name{max-width:100%;font-size:var(--scr-type-tile-label);font-weight:var(--scr-weight-label);text-transform:uppercase;letter-spacing:0;white-space:normal;text-wrap:balance;opacity:.92}.scr-tile-desc{max-width:100%;font-family:ui-monospace,Menlo,monospace;font-size:var(--scr-type-tile-hint);font-weight:1000;text-transform:uppercase;letter-spacing:0;white-space:normal;text-wrap:balance;opacity:.68}.scr-tile-value{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);font-size:3.7rem;line-height:1;font-weight:1000;letter-spacing:0}.scr-score-terminal{position:relative;margin-top:1.25rem;overflow:hidden;border:1px solid #6b3d22;background:#090c11;padding:1rem;box-shadow:0 22px 60px rgba(0,0,0,.55);clip-path:polygon(0 0,100% 0,100% calc(100% - 18px),calc(100% - 18px) 100%,0 100%)}.scr-score-terminal::before{content:"";position:absolute;inset:0;opacity:.35;background:radial-gradient(900px 220px at 14% 0%,rgba(255,176,0,.12),transparent 62%),radial-gradient(700px 260px at 88% 100%,rgba(124,109,255,.10),transparent 62%)}.scr-terminal-head{position:relative;z-index:1;display:flex;align-items:center;justify-content:space-between;gap:.75rem;border-bottom:1px solid #2a3444;padding-bottom:.75rem}.scr-terminal-head b{color:#ffb347;font-size:.64rem;font-weight:1000;text-transform:uppercase;letter-spacing:0}.scr-terminal-head span{color:#8592a5;font-family:ui-monospace,Menlo,monospace;font-size:.58rem;font-weight:1000;text-transform:uppercase;letter-spacing:0}.scr-lcd{position:relative;z-index:1;margin-top:.75rem;overflow:hidden;border:1px solid #31404a;background:#081015;padding:.75rem;box-shadow:inset 0 0 0 1px rgba(255,255,255,.035),inset 0 0 38px rgba(0,0,0,.75)}.scr-lcd::after{content:"";position:absolute;inset:0;pointer-events:none;background:radial-gradient(ellipse at center,rgba(17,250,203,.08),transparent 54%),linear-gradient(180deg,rgba(255,255,255,.03),transparent 42%,rgba(0,0,0,.24))}.scr-lcd-bg{pointer-events:none;position:absolute;inset:0;z-index:0;display:grid;gap:2px;grid-template-rows:repeat(12,1fr);padding:6px;opacity:.55}.scr-lcd-bg i{background:#0b1a1f;box-shadow:inset 0 1px 0 rgba(255,255,255,.025)}.scr-lcd-top{position:relative;z-index:1;display:flex;flex-direction:column;gap:.35rem;border-bottom:1px solid #24323b;padding-bottom:.5rem;color:#6f7f87;font-family:ui-monospace,Menlo,monospace;font-size:.58rem;font-weight:1000;text-transform:uppercase;letter-spacing:0}.scr-lcd-equation{position:relative;z-index:1;display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:clamp(.35rem,1.2vw,.8rem);min-height:92px;margin:1rem 0}.scr-lcd-number,.scr-lcd-operator{position:relative;display:grid;place-items:center;border:1px solid #26343c;background:rgba(2,7,10,.70);color:var(--tone);font-family:ui-monospace,Menlo,monospace;font-weight:1000;line-height:1;box-shadow:inset 0 0 18px color-mix(in srgb,var(--tone) 8%,transparent),0 0 22px color-mix(in srgb,var(--tone) 8%,transparent);text-shadow:0 0 14px color-mix(in srgb,var(--tone) 53%,transparent),3px 3px 0 #000}.scr-lcd-number{min-width:auto;padding:.5rem .75rem;font-size:3.4rem;letter-spacing:0}.scr-lcd-number.large{font-size:3.8rem}.scr-lcd-number::before{content:"";position:absolute;inset:4px;opacity:.20;background-image:linear-gradient(0deg,currentColor 1px,transparent 1px);background-size:100% 8px}.scr-lcd-number span{position:relative;z-index:1}.scr-lcd-operator{width:3rem;height:3rem;font-size:2.2rem}.scr-lcd-foot{position:relative;z-index:1;display:grid;gap:.5rem;border-top:1px solid #24323b;padding-top:.55rem;color:#8592a5;font-family:ui-monospace,Menlo,monospace;font-size:.58rem;font-weight:1000;text-transform:uppercase;letter-spacing:0}.scr-note-grid{display:grid;align-items:stretch;min-width:0;border:1px solid #1e2733;overflow:hidden}.scr-paper-wrap{position:relative;display:flex;align-items:stretch;padding:0;background:radial-gradient(circle at 18% 16%,rgba(255,255,255,.20),transparent 18%),radial-gradient(circle at 86% 78%,rgba(90,49,20,.09),transparent 24%),linear-gradient(180deg,#e8d5ad,#d7bd88)}.scr-paper-wrap::before{content:"";pointer-events:none;position:absolute;inset:0;opacity:.16;background-image:linear-gradient(0deg,rgba(67,40,18,.22) 1px,transparent 1px);background-size:100% 28px}.scr-paper{position:relative;flex:1;width:100%;max-width:none;margin:0;transform:none;overflow:hidden;border:0;padding:clamp(1.25rem,4vw,2rem);color:#23170d;background:radial-gradient(circle at 18% 16%,rgba(255,255,255,.14),transparent 18%),radial-gradient(circle at 86% 78%,rgba(90,49,20,.07),transparent 24%),linear-gradient(180deg,#e8d5ad,#d7bd88);box-shadow:inset 0 0 0 1px rgba(255,255,255,.14),inset 0 0 42px rgba(70,38,14,.10)}.scr-paper::before{content:"";pointer-events:none;position:absolute;inset:0;opacity:.12;background-image:linear-gradient(0deg,rgba(67,40,18,.22) 1px,transparent 1px);background-size:100% 28px}.scr-paper-staple{position:absolute;left:0;top:2.5rem;width:.5rem;height:2.2rem;background:rgba(108,39,27,.80);box-shadow:0 0 12px rgba(255,45,31,.18)}.scr-paper-head{position:relative;display:flex;justify-content:space-between;gap:1rem;align-items:flex-start;min-width:0;border-bottom:1px solid rgba(123,103,72,.55);padding-bottom:1rem;margin-bottom:1.2rem}.scr-paper small{color:#6b2e1e;font-family:ui-monospace,Menlo,monospace;font-size:.62rem;font-weight:1000;text-transform:uppercase;letter-spacing:0}.scr-paper h3{margin:.3rem 0 0;color:#2b1a0c;font-size:1.85rem;line-height:1;text-transform:uppercase}.scr-paper-stamp{flex:0 0 auto;border:1px solid rgba(123,103,72,.50);background:rgba(234,217,184,.55);color:#6b4a2a;padding:.5rem .75rem;text-align:right;font-family:ui-monospace,Menlo,monospace;font-size:.58rem;font-weight:1000;text-transform:uppercase;letter-spacing:0}.scr-paper-body{position:relative}.scr-paper p{margin:0 0 1rem;color:#2e2113;font-size:1rem;line-height:1.8}.scr-dropcap{float:left;padding:.25rem .45rem 0 0;color:#ff8a1f;font-size:3.2rem;font-weight:1000;line-height:.8}.scr-keyword-panel{position:relative;overflow:hidden;background:linear-gradient(180deg,#0a1118,#070b10);padding:clamp(1rem,3vw,1.35rem);border-left:1px solid #1e2733;box-shadow:inset 0 0 0 1px rgba(255,255,255,.025)}.scr-keyword-glow{pointer-events:none;position:absolute;inset:-20%;background:radial-gradient(440px 240px at 12% 8%,rgba(17,250,203,.12),transparent 64%),radial-gradient(360px 260px at 94% 90%,rgba(255,106,90,.10),transparent 66%)}.scr-keyword-head{position:relative;border-bottom:1px solid #1e2733;padding-bottom:1rem}.scr-keyword-head small{display:block;color:#11facb;font-family:ui-monospace,Menlo,monospace;font-size:.62rem;font-weight:1000;text-transform:uppercase;letter-spacing:0}.scr-keyword-head h3{margin:.25rem 0 0;color:#d9c9a3;font-size:1.7rem;line-height:1;text-transform:uppercase}.scr-keyword-head p{margin:.65rem 0 0;color:#8592a5;font-size:.84rem;line-height:1.5}.scr-keyword-hero{position:relative;margin-top:1rem;border:1px solid rgba(255,176,0,.34);background:linear-gradient(135deg,rgba(255,176,0,.10),rgba(255,138,31,.035));padding:.95rem;box-shadow:inset 0 0 24px rgba(255,176,0,.04)}.scr-keyword-hero span{display:block;color:#ffb347;font-family:ui-monospace,Menlo,monospace;font-size:.58rem;font-weight:1000;text-transform:uppercase;letter-spacing:0}.scr-keyword-hero b{display:block;margin-top:.3rem;color:#d9c9a3;font-size:1.08rem;line-height:1.12;text-transform:uppercase}.scr-keyword-group{position:relative;margin-top:1rem;border:1px solid color-mix(in srgb,var(--tone) 42%,#1e2733);background:rgba(0,0,0,.22);padding:.9rem}.scr-keyword-group-title{display:flex;align-items:center;justify-content:space-between;gap:.75rem;margin-bottom:.75rem}.scr-keyword-group-title h4{margin:0;color:var(--tone);font-size:.72rem;font-weight:1000;text-transform:uppercase;letter-spacing:0}.scr-keyword-group-title span{color:#5a6678;font-family:ui-monospace,Menlo,monospace;font-size:.55rem;font-weight:1000;text-transform:uppercase;letter-spacing:0}.scr-keyword-cloud{display:flex;flex-wrap:wrap;gap:.45rem}.scr-keyword-cloud span{border:1px solid color-mix(in srgb,var(--tone) 70%,transparent);background:color-mix(in srgb,var(--tone) 8%,transparent);color:var(--tone);padding:.34rem .5rem;font-family:ui-monospace,Menlo,monospace;font-size:.6rem;font-weight:850;line-height:1.2;text-transform:uppercase;letter-spacing:0;box-shadow:0 0 12px color-mix(in srgb,var(--tone) 10%,transparent);transition:transform .16s,background .16s}.scr-keyword-cloud span:hover{transform:translateY(-1px);background:color-mix(in srgb,var(--tone) 13%,transparent)}.scr-keyword-cloud span.featured{background:color-mix(in srgb,var(--tone) 15%,transparent);box-shadow:0 0 16px color-mix(in srgb,var(--tone) 18%,transparent)}.scr-keyword-cloud span.negative{text-decoration:line-through;opacity:.78}.scr-axis-list{display:grid;gap:.8rem}.scr-axis-row{display:grid;min-width:0;border:1px solid #1e2733;background:#0d1117;transition:background .16s,transform .16s}.scr-axis-row:hover{background:#11161f;transform:translateY(-1px)}.scr-axis-title{position:relative;border-bottom:1px solid #1e2733;padding:1.35rem}.scr-axis-title::before{content:"";position:absolute;left:0;top:0;bottom:0;width:3px;background:var(--tone)}.scr-axis-title small{color:#8592a5;font-size:.64rem;font-weight:1000;text-transform:uppercase;letter-spacing:0}.scr-axis-title h3{margin:.55rem 0 0;color:var(--tone);font-size:1.75rem;line-height:1;text-transform:uppercase;white-space:nowrap;letter-spacing:0}.scr-axis-title span{display:block;margin-top:.65rem;color:#b8a982;font-family:ui-monospace,Menlo,monospace;font-size:.7rem;text-transform:uppercase;white-space:nowrap}.scr-axis-body{padding:1.35rem;min-width:0}.scr-axis-body p{margin:1rem 0 0;color:#b8a982;font-size:.92rem;line-height:1.75;max-width:78ch}.scr-segments{display:grid;grid-template-columns:repeat(20,minmax(0,1fr));gap:3px}.scr-segments i{height:6px;background:#1e2733}.scr-d20-wrap{position:relative;overflow:hidden;display:grid;place-items:center;align-content:center;gap:.28rem;border-top:1px solid #1e2733;padding:.8rem;min-width:0;text-align:center}.scr-d20-wrap::before{content:"";position:absolute;inset:.55rem;border:1px solid color-mix(in srgb,var(--tone) 28%,transparent);pointer-events:none}.scr-d20{position:relative;z-index:1;width:100%;height:auto;min-height:auto;display:block;background:transparent;border:0;box-shadow:none;clip-path:none;font-size:3rem}.scr-d20::after{display:none}.scr-ledger{border:1px solid #ff2d1f;background:#0d1117}.scr-ledger-head{display:flex;justify-content:space-between;align-items:center;gap:1rem;border-bottom:1px solid #1e2733;background:linear-gradient(90deg,rgba(255,45,31,.10),transparent);padding:1.35rem}.scr-ledger-head small{color:#ff6a5a;font-size:.64rem;font-weight:1000;text-transform:uppercase;letter-spacing:0}.scr-ledger-head h3{margin:.35rem 0 0;color:#d9c9a3;font-size:1.9rem;text-transform:uppercase}.scr-ledger-head b{color:#ff6a5a;font-size:3rem;line-height:1}.scr-ledger-row{display:grid;min-width:0;border-top:1px solid #1e2733}.scr-ledger-title{position:relative;border-bottom:1px solid #1e2733;padding:1.15rem}.scr-ledger-title::before{content:"";position:absolute;left:0;top:0;bottom:0;width:3px;background:var(--tone)}.scr-ledger-title small{color:#5a6678;font-family:ui-monospace,Menlo,monospace;font-size:.62rem;text-transform:uppercase}.scr-ledger-title h4{margin:.45rem 0 0;color:var(--tone);font-size:1.35rem;line-height:1.1;text-transform:uppercase}.scr-ledger-title span{display:block;margin-top:.5rem;color:#8592a5;font-size:.68rem;font-weight:1000;text-transform:uppercase;letter-spacing:0}.scr-ledger-row p{margin:0;padding:1.15rem;color:#b8a982;font-size:.92rem;line-height:1.7}.scr-ledger-value{display:grid;place-items:center;gap:.25rem;border-top:1px solid #1e2733;background:rgba(0,0,0,.30);padding:1rem;text-align:center}.scr-ledger-value b{color:#ff6a5a;font-size:2.2rem;line-height:1}.scr-ledger-value small{color:#8592a5;font-size:.58rem;font-weight:1000;text-transform:uppercase;letter-spacing:0}.scr-ledger-check{border-top:1px solid #1e2733;padding:.85rem 1rem;color:#7cff6b;font-family:ui-monospace,Menlo,monospace;font-size:.68rem;text-transform:uppercase;letter-spacing:0}.scr-insight-grid,.scr-audit-grid{display:grid;min-width:0;gap:.9rem}.scr-insight,.scr-audit-card{position:relative;overflow:hidden;min-width:0;min-height:100%;border:1px solid var(--tone);background:#0d1117;padding:1.35rem}.scr-insight::before,.scr-audit-card::before{content:"";position:absolute;right:-2.2rem;top:-2.2rem;width:8rem;height:8rem;border-radius:999px;background:var(--tone);opacity:.08}.scr-insight small,.scr-audit-card small{position:relative;color:var(--tone);font-family:ui-monospace,Menlo,monospace;font-size:.62rem;text-transform:uppercase;letter-spacing:0}.scr-insight h3,.scr-audit-card h3{position:relative;margin:.7rem 0 0;color:#d9c9a3;font-size:1.55rem;line-height:1.05;text-transform:uppercase}.scr-audit-card h3{color:var(--tone);font-size:1.15rem}.scr-insight p,.scr-audit-card p{position:relative;margin:.85rem 0 0;color:#b8a982;font-size:.92rem;line-height:1.7}.scr-evidence-board{position:relative;display:grid;gap:1rem}.scr-evidence-card{position:relative;display:grid;min-width:0;gap:.75rem;border:1px solid #1e2733;background:linear-gradient(180deg,rgba(13,17,23,.98),rgba(5,9,15,.98));padding:1rem;box-shadow:inset 0 0 0 1px color-mix(in srgb,var(--tone) 12%,transparent);grid-template-columns:minmax(92px,120px) 1fr}.scr-evidence-card::before{content:"";position:absolute;left:0;top:0;bottom:0;width:3px;background:var(--tone)}.scr-evidence-marker{position:relative;isolation:isolate;display:grid;place-items:center;align-content:center;gap:.28rem;min-height:100%;padding:.9rem;text-align:center}.scr-evidence-marker::before{content:"";position:absolute;inset:.55rem;border:1px solid color-mix(in srgb,var(--tone) 28%,transparent);pointer-events:none}.scr-evidence-marker .scr-signal-kicker{font-size:.58rem;writing-mode:horizontal-tb!important;transform:none!important}.scr-evidence-marker .scr-signal-value{font-size:3.35rem}.scr-evidence-title-row{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:.75rem}.scr-evidence-title-row h3{margin:0;min-width:0;flex:1 1 280px;color:#d9c9a3;font-size:1.45rem;line-height:1.1;text-transform:uppercase}.scr-spoiler{flex:0 0 auto;border:1px solid #2a3444;color:#8592a5;padding:.25rem .45rem;font-family:ui-monospace,Menlo,monospace;font-size:.58rem;font-weight:1000;text-transform:uppercase;letter-spacing:0}.scr-spoiler-medium{border-color:#ff8a1f;color:#ffb347}.scr-spoiler-heavy{border-color:#ff2d1f;color:#ff6a5a}.scr-evidence-cells{margin-top:.8rem;display:grid;align-items:stretch;min-width:0;gap:.75rem}.scr-evidence-cells>div{min-width:0;border:1px solid #1e2733;background:rgba(0,0,0,.24);padding:.95rem}.scr-evidence-cells>div.muted{background:rgba(255,255,255,.018)}.scr-evidence-cells small{color:var(--tone);font-size:.58rem;font-weight:1000;text-transform:uppercase;letter-spacing:0}.scr-evidence-cells p{margin:.5rem 0 0;color:#b8a982;font-size:.9rem;line-height:1.6}.scr-evidence-impact{margin-top:.75rem;border-top:1px dashed #1e2733;padding-top:.65rem;color:#ff8a1f;font-family:ui-monospace,Menlo,monospace;font-size:.68rem;letter-spacing:0}.scr-evidence-protocol{margin-top:1rem;border:1px solid #2a3444;background:linear-gradient(180deg,rgba(13,17,23,.94),rgba(5,9,15,.94));padding:1rem;box-shadow:inset 0 0 0 1px rgba(255,255,255,.025)}.scr-evidence-protocol-head{display:flex;align-items:flex-end;justify-content:space-between;gap:1rem;border-bottom:1px solid #1e2733;padding-bottom:.75rem}.scr-evidence-protocol-head small{display:block;color:#11facb;font-family:ui-monospace,Menlo,monospace;font-size:.62rem;font-weight:1000;text-transform:uppercase;letter-spacing:0}.scr-evidence-protocol-head b{color:#d9c9a3;font-size:.82rem;text-transform:uppercase;letter-spacing:0}.scr-evidence-protocol-grid{display:grid;gap:.75rem;margin-top:.85rem}.scr-evidence-protocol-grid div{border:1px solid color-mix(in srgb,var(--tone) 38%,#1e2733);background:color-mix(in srgb,var(--tone) 6%,transparent);padding:.8rem}.scr-evidence-protocol-grid small{display:block;color:var(--tone);font-family:ui-monospace,Menlo,monospace;font-size:.56rem;font-weight:1000;text-transform:uppercase;letter-spacing:0}.scr-evidence-protocol-grid p{margin:.38rem 0 0;color:#b8a982;font-size:.84rem;line-height:1.55}.scr-dev-section{padding:0!important;background:transparent!important;border:0!important}.scr-dev-details{border:1px dashed #2a3444;background:rgba(13,17,23,.72);padding:1rem}.scr-dev-details summary{cursor:pointer;display:flex;align-items:center;justify-content:space-between;gap:1rem;min-height:2.75rem;padding:.25rem 0;line-height:1.2;color:#8592a5;font-size:.72rem;font-weight:1000;text-transform:uppercase;letter-spacing:0}.scr-dev-details summary b{color:#7cff6b}.scr-dev-note{color:#8592a5;font-size:.85rem}.scr-dev-grid{display:grid;min-width:0;gap:.75rem;margin-top:1rem}.scr-dev-grid article{min-width:0;border:1px solid #1e2733;background:rgba(0,0,0,.25);padding:.9rem}.scr-dev-grid article small{color:#7cff6b;font-size:.68rem;font-weight:1000;text-transform:uppercase;letter-spacing:0}.scr-dev-grid article.fail small{color:#ff6a5a}.scr-dev-grid h3{margin:.45rem 0 0;color:#d9c9a3;font-size:1rem;text-transform:uppercase}.scr-dev-grid p{color:#8592a5;font-family:ui-monospace,Menlo,monospace;font-size:.84rem;text-transform:uppercase;line-height:1.45}.scr-footer{overflow-wrap:anywhere;border-top:1px solid #1e2733;padding:2rem 1rem;text-align:center;color:#5a6678;font-size:.68rem;font-weight:1000;text-transform:uppercase;letter-spacing:0}@keyframes scrPulse{0%,100%{opacity:.55;transform:scale(.96)}50%{opacity:1;transform:scale(1.08)}}@media (min-width:560px){.scr-shell{width:min(1400px,calc(100% - 32px));padding-top:1.5rem;gap:.7rem}.scr-meta-rail{grid-template-columns:repeat(5,1fr)}.scr-meta-rail div{border-bottom:0;border-right:1px solid rgba(255,255,255,.10)}.scr-meta-rail div:last-child{border-right:0}.scr-lcd-top,.scr-lcd-foot{grid-template-columns:repeat(3,1fr)}.scr-lcd-top{flex-direction:row;justify-content:space-between}.scr-dev-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}@media (min-width:760px){.scr-hud-links{order:0;width:auto}.scr-progress{display:flex}.scr-fit-grid{grid-template-columns:repeat(3,1fr)}.scr-fit-card{border-bottom:0;border-right:1px solid #1e2733}.scr-fit-card:last-child{border-right:0}.scr-score-strip{grid-template-columns:repeat(2,1fr)}.scr-score-tile:nth-child(odd){border-right:1px solid #1e2733}.scr-note-grid{grid-template-columns:1.35fr .85fr}.scr-paper-wrap{border-right:1px solid #1e2733}.scr-keyword-panel{border-left:0}.scr-axis-row,.scr-ledger-row{grid-template-columns:minmax(300px,340px) minmax(0,1fr) minmax(96px,118px)}.scr-axis-title,.scr-ledger-title{border-right:1px solid #1e2733;border-bottom:0}.scr-d20-wrap,.scr-ledger-value{border-top:0;border-left:1px solid #1e2733}.scr-insight-grid,.scr-audit-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.scr-evidence-card{grid-template-columns:minmax(118px,150px) 1fr}.scr-evidence-marker{min-height:100%}.scr-evidence-cells{grid-template-columns:repeat(3,1fr)}.scr-hero-verdict-strip{grid-template-columns:repeat(3,minmax(0,1fr))}.scr-evidence-protocol-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}@media (min-width:980px){.scr-correction-split{grid-template-columns:minmax(280px,.72fr) minmax(0,1.28fr)}.scr-extra-panel{min-height:100%}}@media (min-width:1120px){.scr-hero-grid{min-height:560px;grid-template-columns:minmax(0,1fr) minmax(300px,330px);grid-template-areas:"copy verdict";align-items:start;row-gap:.9rem;padding:.5rem 2rem .85rem}.scr-hero-copy{grid-area:copy}.scr-verdict{grid-area:verdict;align-self:start;margin-top:0}.scr-hero .scr-score-panel{min-height:335px;padding:.85rem}.scr-hero .scr-score-panel-simple{padding:0}.scr-hero .scr-score-panel-simple .scr-main-score-meter{min-height:312px}.scr-hero .scr-score-panel-simple .scr-main-score-meter .scr-tile-value{font-size:5.55rem}.scr-hero .scr-main-score-rank{font-size:3.05rem;top:calc(50% + 2.82rem)}.scr-hero .scr-main-score-meter{min-height:168px}.scr-hero .scr-main-score-meter .scr-tile-value{font-size:5.35rem}.scr-hero .scr-score-panel-head{padding-bottom:.6rem}.scr-hero .scr-score-panel-foot{padding-top:.6rem}.scr-score-strip{grid-template-columns:repeat(7,1fr)}.scr-score-tile{min-height:290px;border-bottom:0;border-right:1px solid #1e2733}.scr-score-tile:last-child{border-right:0}.scr-score-meter-box{min-height:158px}.scr-audit-grid{grid-template-columns:repeat(4,minmax(0,1fr))}.scr-dev-grid{grid-template-columns:repeat(3,minmax(0,1fr))}.scr-evidence-cells>div{display:flex;flex-direction:column}.scr-evidence-cells p{flex:1}.scr-evidence-protocol-grid{grid-template-columns:repeat(4,minmax(0,1fr))}}@media (min-width:1120px) and (max-width:1399px){.scr-hero h1{margin-top:1rem;font-size:6.35rem}.scr-identity{margin-top:.85rem;max-width:620px;font-size:.92rem;line-height:1.48}.scr-hero .scr-score-panel{min-height:320px}.scr-hero .scr-score-panel-simple{padding:0}.scr-hero .scr-score-panel-simple .scr-main-score-meter{min-height:297px}.scr-hero .scr-score-panel-simple .scr-main-score-meter .scr-tile-value{font-size:5.25rem}.scr-hero .scr-main-score-rank{font-size:2.82rem;top:calc(50% + 2.64rem)}.scr-hero .scr-main-score-meter{min-height:154px}.scr-hero .scr-main-score-meter .scr-tile-value{font-size:5rem}}@media (max-width:1119px){.scr-hero-grid{gap:.7rem}.scr-hero .scr-score-panel{min-height:360px}.scr-hero .scr-score-panel-simple{padding:0}.scr-hero .scr-score-panel-simple .scr-main-score-meter{min-height:336px}.scr-hero .scr-score-panel-simple .scr-main-score-meter .scr-tile-value{font-size:5.65rem}.scr-hero .scr-main-score-rank{font-size:3rem;top:calc(50% + 2.88rem)}.scr-hero .scr-main-score-meter{min-height:178px}.scr-hero .scr-main-score-meter .scr-tile-value{font-size:5.4rem}}@media (max-width:760px){.scr-shell{width:min(100% - 18px,1400px);gap:1.15rem}.scr-shell>section{padding:1rem}.scr-hud-inner{font-size:.55rem}.scr-hero{min-height:auto}.scr-hero-grid{padding:1.1rem;gap:1rem}.scr-hero h1{font-size:3.55rem}.scr-identity{font-size:.9rem;line-height:1.55}.scr-meta-rail div{padding:.7rem}.scr-hero-verdict-strip{grid-template-columns:1fr}.scr-hero-verdict-strip b{font-size:.68rem}.scr-verdict-simple{min-height:auto}.scr-score-panel{min-height:360px;padding:.9rem}.scr-score-panel-number{font-size:7.15rem}.scr-score-panel-grade{font-size:2.65rem}.scr-section-head{gap:.9rem}.scr-section-head h2{font-size:2.15rem}.scr-section-head p{font-size:.84rem}.scr-score-tile{min-height:245px;padding:.7rem}.scr-score-meter-box{min-height:128px}.scr-tile-letter{font-size:1.55rem}.scr-tile-value{font-size:3.35rem}.scr-tile-outside-head{min-height:3.2rem}.scr-lcd-number{font-size:2.75rem;padding:.42rem .55rem}.scr-lcd-number.large{font-size:3.1rem}.scr-lcd-operator{width:2.45rem;height:2.45rem;font-size:1.8rem}.scr-lcd-foot{font-size:.54rem}.scr-paper-wrap{border-right:0}.scr-paper{padding:clamp(1.2rem,5vw,1.6rem)}.scr-paper-head{display:grid}.scr-paper-stamp{justify-self:start;text-align:left}.scr-keyword-panel{border-left:0;border-top:1px solid #1e2733}.scr-keyword-cloud span{font-size:.55rem}.scr-keyword-hero b{font-size:.95rem}.scr-axis-title h3{white-space:normal;letter-spacing:0;font-size:1.65rem}.scr-axis-title span{white-space:normal}.scr-d20-wrap{min-height:72px}.scr-d20{width:100%;min-height:auto;font-size:2.4rem}.scr-extra-panel-top h3{font-size:1.65rem}.scr-extra-panel-top b{font-size:2.4rem}.scr-danger-panel .scr-ledger-parent::before{position:static;display:block;padding:.65rem 1rem 0}.scr-danger-panel .scr-ledger-subrow{margin-left:.5rem}.scr-danger-panel .scr-ledger-subrow::before{left:-.5rem;width:.5rem}.scr-danger-panel .scr-ledger-check{margin-left:.5rem}.scr-evidence-card{grid-template-columns:1fr;padding:.9rem}.scr-evidence-marker{display:flex;justify-content:flex-start;min-height:auto;padding:.75rem}.scr-evidence-marker .scr-signal-value{font-size:2rem}.scr-evidence-marker .scr-signal-kicker{font-size:.58rem}.scr-evidence-title-row{align-items:flex-start}.scr-spoiler{font-size:.52rem}.scr-evidence-protocol-head{display:grid}.scr-dev-details summary{display:grid;gap:.4rem}}@media (max-width:390px){.scr-paper-stamp{display:none}.scr-tile-value{font-size:3.7rem}}
.scr-root{--scr-type-main-score-rank:5.05rem}
.scr-hero{min-height:0}
.scr-identity{position:relative;max-width:720px;padding-left:1.1rem;color:#cdbc92;font-size:1.08rem;line-height:1.58}
.scr-identity::before{content:"";position:absolute;left:0;top:.1rem;bottom:.1rem;width:3px;background:linear-gradient(180deg,#ffb347,#ff8a1f);box-shadow:0 0 14px rgba(255,138,31,.28)}
.scr-identity::after{content:"FIELD NOTE";position:absolute;left:-.52rem;top:.1rem;writing-mode:vertical-rl;transform:translateX(-100%) rotate(180deg);color:rgba(255,179,71,.68);font-family:ui-monospace,Menlo,monospace;font-size:.55rem;font-weight:1000;line-height:1;text-transform:uppercase;letter-spacing:0}
.scr-main-score-meter.scr-signal-block{background:radial-gradient(150px 118px at 50% 36%,rgba(255,179,71,.20),transparent 72%),repeating-linear-gradient(0deg,rgba(255,230,170,.055) 0 1px,transparent 1px 11px),linear-gradient(180deg,#3a2304,#241504 54%,#170d02)}
.scr-main-score-meter .scr-meter-screen{background:linear-gradient(180deg,color-mix(in srgb,var(--meter-off) 86%,#120a02),#140b02)}
.scr-main-score-meter .scr-meter-screen::after{box-shadow:inset 0 0 0 1px rgba(255,208,128,.055),inset 0 0 34px rgba(73,38,0,.48)}
.scr-main-score-rank{top:calc(50% + 2.2rem);color:#2d1600;text-shadow:0 1px 0 rgba(255,224,170,.26),0 0 16px rgba(255,179,71,.26)}
.scr-inspect-metrics{display:grid;grid-template-columns:repeat(7,minmax(0,1fr));gap:.65rem;min-width:0}
.scr-inspect-metric{min-width:0;display:grid;align-content:start;justify-items:stretch;gap:.42rem;border:0;background:transparent;box-shadow:none;padding:.25rem;text-align:center;color:var(--tone)}
.scr-inspect-headline{display:grid;align-content:end;justify-items:center;gap:.12rem;min-height:2.75rem}
.scr-inspect-letter{font-size:1.95rem;font-weight:1000;line-height:1;color:var(--tone);text-shadow:0 0 12px color-mix(in srgb,var(--tone) 42%,transparent)}
.scr-inspect-name{max-width:100%;color:var(--tone);font-size:var(--scr-type-tile-label);font-weight:1000;line-height:1;text-transform:uppercase;letter-spacing:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.scr-inspect-meter{width:100%;min-height:134px;flex:none}
.scr-inspect-meter .scr-tile-value{font-size:3.3rem}
@media (min-width:1120px){.scr-hero-grid{min-height:335px;grid-template-areas:"copy verdict";row-gap:0;padding:.5rem 2rem .75rem}.scr-hero .scr-score-panel{min-height:326px}.scr-hero .scr-score-panel-simple .scr-main-score-meter{min-height:304px}.scr-hero .scr-main-score-rank{font-size:5.05rem;top:calc(50% + 2.18rem)}}
@media (min-width:1120px) and (max-width:1399px){.scr-identity{max-width:690px;font-size:1.04rem;line-height:1.54}.scr-hero-grid{min-height:316px;padding:.35rem 2rem .62rem}.scr-hero .scr-score-panel{min-height:306px}.scr-hero .scr-score-panel-simple .scr-main-score-meter{min-height:284px}.scr-hero .scr-main-score-rank{font-size:4.85rem;top:calc(50% + 2.05rem)}}
@media (max-width:1119px){.scr-hero-grid{padding-bottom:.65rem}.scr-hero .scr-main-score-rank{font-size:5rem;top:calc(50% + 2.25rem)}.scr-inspect-metrics{grid-template-columns:repeat(4,minmax(0,1fr))}}
@media (max-width:760px){.scr-identity{font-size:.98rem;line-height:1.56;padding-left:.95rem}.scr-identity::after{display:none}.scr-hero .scr-main-score-rank{font-size:4.65rem;top:calc(50% + 2.1rem)}.scr-inspect-metrics{grid-template-columns:repeat(2,minmax(0,1fr));gap:.55rem .35rem}.scr-inspect-metric{padding:.25rem}.scr-inspect-headline{min-height:2.35rem}.scr-inspect-meter{min-height:116px}.scr-inspect-meter .scr-tile-value{font-size:2.9rem}.scr-inspect-letter{font-size:1.45rem}}
`;
