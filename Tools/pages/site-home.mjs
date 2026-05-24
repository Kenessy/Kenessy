function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function portfolioHomeHtml({
  buildId,
  siteBase,
  reportPath,
  reportsPath,
  apocalypsePath,
  githubUrl
}) {
  const title = 'Kenessy - Portfolio, Projects, Game Reviews';
  const description = 'Kenessy portfolio hub for systems design, Apocalypse Express, adversarial QA tooling, game reviews, and creative experiments.';
  const metroHref = `${reportPath}?v=${buildId}`;
  const reportsHref = reportsPath;
  const apocalypseHref = apocalypsePath;
  const graphHref = 'assets/img/triad-validation-flow.png';
  const canonical = siteBase;

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHtml(title)}</title>
<link rel="icon" href="data:,">
<link rel="canonical" href="${canonical}">
<meta name="description" content="${escapeHtml(description)}">
<meta name="theme-color" content="#07090d">
<meta name="build-id" content="${buildId}">
<meta property="og:type" content="website">
<meta property="og:title" content="${escapeHtml(title)}">
<meta property="og:description" content="${escapeHtml(description)}">
<meta property="og:url" content="${canonical}">
<meta name="twitter:card" content="summary">
<meta name="twitter:title" content="${escapeHtml(title)}">
<meta name="twitter:description" content="${escapeHtml(description)}">
<style>
:root{
  --bg:#07090d;
  --panel:#0d1218;
  --panel-2:#121822;
  --line:#26313e;
  --line-soft:rgba(218,229,241,.12);
  --text:#edf4f6;
  --bone:#dec99d;
  --muted:#98a8b8;
  --amber:#ff8a1f;
  --cyan:#13d4e8;
  --green:#35e07b;
  --red:#ff4a3d;
  --violet:#8d78ff;
  --max:1180px;
}
*{box-sizing:border-box}
html{scroll-behavior:smooth}
body{
  margin:0;
  min-height:100vh;
  overflow-x:hidden;
  color:var(--text);
  background:
    linear-gradient(90deg,rgba(19,212,232,.04) 1px,transparent 1px),
    linear-gradient(180deg,rgba(255,138,31,.05) 0,transparent 360px),
    linear-gradient(180deg,#07090d 0,#0a0d12 48%,#07090d 100%);
  background-size:86px 100%,100% 100%,100% 100%;
  font-family:Inter,ui-sans-serif,system-ui,Segoe UI,Arial,sans-serif;
}
a{color:inherit;text-decoration:none}
img{display:block;max-width:100%;height:auto}
.home-root{min-height:100vh}
.wrap{width:min(calc(100% - 36px),var(--max));margin:0 auto}
.site-nav{
  position:sticky;
  top:0;
  z-index:20;
  border-bottom:1px solid rgba(218,229,241,.10);
  background:rgba(7,9,13,.88);
  backdrop-filter:blur(14px);
}
.site-nav .wrap{display:flex;align-items:center;justify-content:space-between;gap:18px;min-height:62px}
.brand{min-height:36px;display:inline-flex;align-items:center;font-size:15px;font-weight:1000;text-transform:uppercase;color:var(--bone)}
.nav-links{display:flex;align-items:center;gap:6px;flex-wrap:wrap;justify-content:flex-end}
.nav-links a{
  min-height:36px;
  display:inline-flex;
  align-items:center;
  padding:8px 10px;
  border:1px solid transparent;
  color:var(--muted);
  font-size:12px;
  font-weight:900;
  text-transform:uppercase;
}
.nav-links a:hover,.nav-links a:focus-visible{border-color:var(--line);color:var(--text);outline:0}
.hero{padding:68px 0 42px;border-bottom:1px solid var(--line-soft)}
.hero-grid{display:grid;grid-template-columns:minmax(0,1.05fr) minmax(340px,.95fr);gap:34px;align-items:center}
.eyebrow{margin:0 0 14px;color:var(--cyan);font-size:12px;font-weight:1000;text-transform:uppercase}
h1,h2,h3,p{margin:0}
h1{
  color:var(--bone);
  font-size:64px;
  line-height:.92;
  font-weight:1000;
  text-transform:uppercase;
  max-width:760px;
}
.hero-lede{
  margin-top:20px;
  max-width:690px;
  color:#c8b98e;
  font-size:19px;
  line-height:1.55;
  font-weight:760;
}
.hero-actions{display:flex;flex-wrap:wrap;gap:10px;margin-top:24px}
.button{
  min-height:44px;
  display:inline-flex;
  align-items:center;
  justify-content:center;
  border:1px solid var(--line);
  background:linear-gradient(135deg,rgba(255,138,31,.20),rgba(19,212,232,.05) 62%,rgba(13,18,24,.92));
  padding:11px 14px;
  color:var(--text);
  font-size:12px;
  font-weight:1000;
  text-transform:uppercase;
}
.button.secondary{background:rgba(13,18,24,.75);color:var(--muted)}
.hero-panel{
  border:1px solid var(--line);
  background:linear-gradient(145deg,rgba(18,24,34,.96),rgba(8,11,15,.96));
  overflow:hidden;
  box-shadow:0 26px 80px rgba(0,0,0,.34);
}
.hero-panel img{
  width:100%;
  aspect-ratio:16/10;
  object-fit:cover;
  background:#0b1017;
  border-bottom:1px solid var(--line);
}
.panel-caption{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:14px;align-items:end;padding:16px}
.panel-caption small{color:var(--cyan);font-size:11px;font-weight:1000;text-transform:uppercase}
.panel-caption strong{display:block;margin-top:5px;color:var(--bone);font-size:17px}
.build-chip{border:1px solid rgba(255,138,31,.42);color:#ffb347;padding:7px 9px;font-size:11px;font-weight:1000;text-transform:uppercase;white-space:nowrap}
.section{padding:38px 0;border-bottom:1px solid var(--line-soft)}
.section-head{display:grid;grid-template-columns:minmax(0,.9fr) minmax(280px,.75fr);gap:28px;align-items:end;margin-bottom:20px}
.kicker{color:var(--amber);font-size:12px;font-weight:1000;text-transform:uppercase}
h2{margin-top:6px;color:var(--bone);font-size:38px;line-height:.98;font-weight:1000;text-transform:uppercase}
.section-head p{color:#b7c4d1;font-size:16px;line-height:1.55;font-weight:680}
.signal-row{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px}
.signal{
  min-height:118px;
  border:1px solid var(--line);
  background:linear-gradient(145deg,rgba(18,24,34,.96),rgba(8,11,15,.98));
  padding:15px;
}
.signal b{display:block;color:var(--cyan);font-size:12px;text-transform:uppercase}
.signal span{display:block;margin-top:16px;color:var(--text);font-size:22px;line-height:1.08;font-weight:1000}
.signal small{display:block;margin-top:10px;color:var(--muted);line-height:1.45;font-weight:720}
.project-grid{display:grid;grid-template-columns:1.1fr .9fr;gap:14px}
.project-card,.review-card,.interest-card{
  border:1px solid var(--line);
  background:linear-gradient(145deg,rgba(18,24,34,.92),rgba(9,12,17,.96));
  padding:18px;
}
.project-card.featured{display:grid;grid-template-columns:minmax(0,1fr) 178px;gap:18px;align-items:stretch}
.project-card h3,.review-copy h3,.interest-card h3{
  color:var(--text);
  font-size:25px;
  line-height:1.05;
  font-weight:1000;
  text-transform:uppercase;
}
.project-card p,.review-copy p,.interest-card p{margin-top:10px;color:var(--muted);font-size:15px;line-height:1.55;font-weight:650}
.tag-row{display:flex;flex-wrap:wrap;gap:8px;margin-top:16px}
.tag{
  border:1px solid var(--line);
  background:rgba(7,9,13,.58);
  padding:7px 9px;
  color:#c9d7e5;
  font-size:11px;
  font-weight:1000;
  text-transform:uppercase;
}
.tag.green{border-color:rgba(53,224,123,.38);color:#7df0a7}
.tag.amber{border-color:rgba(255,138,31,.42);color:#ffb347}
.tag.cyan{border-color:rgba(19,212,232,.38);color:#7fe9f3}
.project-stat{
  border:1px solid rgba(19,212,232,.34);
  background:linear-gradient(145deg,rgba(19,212,232,.10),rgba(141,120,255,.06));
  display:grid;
  align-content:center;
  justify-items:start;
  padding:14px;
  min-width:0;
}
.project-stat strong{color:var(--cyan);font-size:38px;line-height:.9;font-weight:1000}
.project-stat span{margin-top:8px;color:var(--muted);font-size:11px;font-weight:1000;text-transform:uppercase}
.review-card{
  display:grid;
  grid-template-columns:minmax(0,1fr) 144px;
  gap:20px;
  align-items:stretch;
}
.score-box{
  border:1px solid rgba(255,138,31,.46);
  background:linear-gradient(145deg,rgba(255,138,31,.16),rgba(7,9,13,.88));
  min-height:144px;
  display:grid;
  place-items:center;
  color:var(--bone);
}
.score-box span{display:block;text-align:center;color:var(--amber);font-size:58px;line-height:.86;font-weight:1000}
.score-box small{display:block;margin-top:9px;color:var(--bone);font-size:34px;line-height:1;font-weight:1000}
.review-link{margin-top:18px}
.review-link a{color:#ffb347;font-size:12px;font-weight:1000;text-transform:uppercase}
.interest-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px}
.footer{padding:28px 0 38px;color:var(--muted);font-size:13px}
.footer .wrap{display:flex;justify-content:space-between;gap:16px;flex-wrap:wrap}
.footer a{min-height:32px;display:inline-flex;align-items:center;color:#ffb347;font-weight:900}
@media(max-width:860px){
  .site-nav .wrap{align-items:flex-start;flex-direction:column;padding:12px 0}
  .nav-links{justify-content:flex-start}
  .hero{padding-top:42px}
  .hero-grid,.section-head,.project-grid,.project-card.featured,.review-card{grid-template-columns:1fr}
  .signal-row{grid-template-columns:repeat(2,minmax(0,1fr))}
  .interest-grid{grid-template-columns:1fr}
  h1{font-size:48px}
  h2{font-size:32px}
  .score-box{justify-self:start;width:168px}
}
@media(max-width:480px){
  .wrap{width:min(calc(100% - 28px),var(--max))}
  h1{font-size:38px}
  .hero-lede{font-size:17px}
  .signal-row{grid-template-columns:1fr}
  .panel-caption{grid-template-columns:1fr}
  .build-chip{justify-self:start}
}
</style>
</head>
<body>
<header class="site-nav">
  <div class="wrap">
    <a class="brand" href="./">Kenessy</a>
    <nav class="nav-links" aria-label="Primary navigation">
      <a href="#work">Work</a>
      <a href="#reviews">Reviews</a>
      <a href="#interests">Interests</a>
      <a href="${githubUrl}">GitHub</a>
    </nav>
  </div>
</header>
<main class="home-root">
  <section class="hero" id="top">
    <div class="wrap hero-grid">
      <div>
        <p class="eyebrow">Portfolio hub / systems, stories, reviews</p>
        <h1>Kenessy builds weird systems until they become readable.</h1>
        <p class="hero-lede">A personal index for game critique, tabletop RPG design, visual systems, adversarial QA loops, AI-assisted tooling, and creative experiments that need both taste and pressure-testing.</p>
        <div class="hero-actions">
          <a class="button" href="#reviews">Open game reviews</a>
          <a class="button secondary" href="${apocalypseHref}">View Apocalypse Express</a>
          <a class="button secondary" href="${githubUrl}">GitHub repository</a>
        </div>
      </div>
      <figure class="hero-panel">
        <img src="${graphHref}" alt="Triad validation flow diagram from the Apocalypse Express design vault">
        <figcaption class="panel-caption">
          <span><small>Current source of truth</small><strong>Design vault, reports, and public Pages builds in one repository.</strong></span>
          <span class="build-chip">Build ${buildId}</span>
        </figcaption>
      </figure>
    </div>
  </section>

  <section class="section" id="work">
    <div class="wrap">
      <div class="section-head">
        <div><p class="kicker">What lives here</p><h2>Workbench</h2></div>
        <p>The homepage is the front door. Individual projects can stay opinionated, but this page keeps the map simple: what I make, what I test, and where the public artifacts are.</p>
      </div>
      <div class="signal-row">
        <div class="signal"><b>01 / Design</b><span>RPG systems</span><small>Rules, procedures, scene structure, and playable constraints.</small></div>
        <div class="signal"><b>02 / Critique</b><span>Game reviews</span><small>Verdicts backed by score anatomy, player-fit notes, and evidence rails.</small></div>
        <div class="signal"><b>03 / QA</b><span>Adversarial checks</span><small>Local and live tests that try to falsify the page before publishing.</small></div>
        <div class="signal"><b>04 / Tools</b><span>AI workflows</span><small>Canvas-to-site builds, repo automation, and polished visual interfaces.</small></div>
      </div>
    </div>
  </section>

  <section class="section" id="projects">
    <div class="wrap">
      <div class="section-head">
        <div><p class="kicker">Main creative track</p><h2>Projects</h2></div>
        <p>Long-form creative systems with enough structure to survive iteration. This section will grow as the portfolio expands.</p>
      </div>
      <div class="project-grid">
        <a class="project-card featured" href="${apocalypseHref}">
          <div>
            <div class="tag-row"><span class="tag amber">Tabletop RPG</span><span class="tag cyan">Industrial arcane</span></div>
            <h3>Apocalypse Express</h3>
            <p>A cinematic D&D-based narrative RPG about dead souls, infernal railways, frozen time, and a second life bought under pressure.</p>
            <div class="tag-row"><span class="tag">Triad Codes</span><span class="tag">Chaos Drift</span><span class="tag">Revival</span><span class="tag">Soul indices</span></div>
          </div>
          <div class="project-stat"><strong>AE</strong><span>Setting, rules, scenes, procedures</span></div>
        </a>
        <a class="project-card" href="${reportsHref}">
          <div class="tag-row"><span class="tag green">Public artifacts</span><span class="tag">Reports</span></div>
          <h3>Plater Game Reports</h3>
          <p>A review format for games where taste-fit, score logic, caveats, and trust evidence are shown instead of hidden behind a single number.</p>
          <div class="tag-row"><span class="tag cyan">ALERTED axes</span><span class="tag amber">Evidence rails</span></div>
        </a>
      </div>
    </div>
  </section>

  <section class="section" id="reviews">
    <div class="wrap">
      <div class="section-head">
        <div><p class="kicker">Review section</p><h2>Game reviews</h2></div>
        <p>This is where the Metro Redux report lives now, and where future reviews can slot in without turning the homepage into a redirect.</p>
      </div>
      <a class="review-card" href="${metroHref}">
        <div class="review-copy">
          <div class="tag-row"><span class="tag cyan">ALERTED report</span><span class="tag green">Published</span></div>
          <h3>Metro 2033 Redux</h3>
          <p>Atmosphere-first survival FPS verdict with player-fit lanes, score strip, correction ledger, spoiler-light judgment, trust layer, and dossier evidence arc.</p>
          <div class="tag-row"><span class="tag">Atmosphere</span><span class="tag">Linear FPS</span><span class="tag">Survival horror</span><span class="tag amber">Caveated buy</span></div>
          <div class="review-link"><span>Open current build</span></div>
        </div>
        <div class="score-box" aria-label="Metro 2033 Redux score 86 rank A"><span>86</span><small>A</small></div>
      </a>
    </div>
  </section>

  <section class="section" id="interests">
    <div class="wrap">
      <div class="section-head">
        <div><p class="kicker">Personal gravity</p><h2>Interests</h2></div>
        <p>Not a resume wall. More like the useful coordinates: the recurring themes that explain why the projects look the way they do.</p>
      </div>
      <div class="interest-grid">
        <div class="interest-card"><h3>Systems that teach themselves</h3><p>Rules, interfaces, and review formats where the structure reveals the reasoning without needing a manual next to it.</p></div>
        <div class="interest-card"><h3>Atmosphere with mechanics</h3><p>Games and worlds where mood is not just dressing, but pressure, friction, pacing, and player behavior.</p></div>
        <div class="interest-card"><h3>Adversarial polish</h3><p>Iterating with tests that actively look for bad states: overflow, weak fallbacks, unclear evidence, and broken public builds.</p></div>
      </div>
    </div>
  </section>
</main>
<footer class="footer">
  <div class="wrap">
    <span>Kenessy Pages / Portfolio build ${buildId}</span>
    <span><a href="${reportsHref}">Reports</a> / <a href="${apocalypseHref}">Apocalypse Express</a> / <a href="${githubUrl}">GitHub</a></span>
  </div>
</footer>
</body>
</html>
`;
}
