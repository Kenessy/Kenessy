import { build } from 'esbuild';
import { portfolioHomeHtml } from './site-home.mjs';
import { createHash } from 'node:crypto';
import { mkdtemp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDir, '../..');
const sourcePath = path.join(scriptDir, 'sources/metro-2033-redux/main_canvas_diegetic_equation.jsx');
const reportDir = path.join(repoRoot, 'docs/plater-game-reports/games/metro-2033-redux');
const quantumBreakReportDir = path.join(repoRoot, 'docs/plater-game-reports/games/quantum-break');
const quantumBreakJourneyDir = path.join(quantumBreakReportDir, 'journey');
const bundleName = 'main_canvas_diegetic_equation.bundle.js';
const bundlePath = path.join(reportDir, bundleName);
const reportIndexPath = path.join(reportDir, 'index.html');
const quantumBreakReportIndexPath = path.join(quantumBreakReportDir, 'index.html');
const quantumBreakJourneyIndexPath = path.join(quantumBreakJourneyDir, 'index.html');
const quantumBreakReportSourcePath = path.join(scriptDir, 'sources/quantum-break/report.html');
const quantumBreakJourneySourcePath = path.join(scriptDir, 'sources/quantum-break/journey.html');
const rootIndexPath = path.join(repoRoot, 'docs/index.html');
const reportsIndexPath = path.join(repoRoot, 'docs/plater-game-reports/index.html');
const robotsPath = path.join(repoRoot, 'docs/robots.txt');
const sitemapPath = path.join(repoRoot, 'docs/sitemap.xml');
const notFoundPath = path.join(repoRoot, 'docs/404.html');
const publicSourcePath = path.join(reportDir, 'main_canvas_diegetic_equation.jsx');

const siteBase = 'https://kenessy.github.io/Kenessy/';
const reportPath = 'plater-game-reports/games/metro-2033-redux/';
const quantumBreakReportPath = 'plater-game-reports/games/quantum-break/';
const quantumBreakJourneyPath = 'plater-game-reports/games/quantum-break/journey/';
const reportUrl = new URL(reportPath, siteBase).toString();
const quantumBreakReportUrl = new URL(quantumBreakReportPath, siteBase).toString();
const quantumBreakJourneyUrl = new URL(quantumBreakJourneyPath, siteBase).toString();
const reportsUrl = new URL('plater-game-reports/', siteBase).toString();
const apocalypseUrl = new URL('apocalypse-express/', siteBase).toString();
const githubUrl = 'https://github.com/Kenessy/Kenessy';

function sha256(text) {
  return createHash('sha256').update(text).digest('hex');
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function logStep(message) {
  console.log(`[build:metro] ${new Date().toISOString()} ${message}`);
}

function extractTemplateCss(source) {
  const match = source.match(/const TEMPLATE_CSS = `([\s\S]*)`;\s*$/);
  if (!match) {
    throw new Error('Could not find TEMPLATE_CSS in Metro canvas source.');
  }
  return { css: match[1], cssStart: match.index };
}

function transformedSourceWithoutInlineStyle(source, cssStart) {
  return source
    .slice(0, cssStart)
    .replace(/\s*<TemplateCSS \/>\s*/m, '\n')
    .replace(/\s*function TemplateCSS\(\) {\s*return <style>{TEMPLATE_CSS}<\/style>;\s*}\s*/m, '\n');
}

function shellCss() {
  return `
:root{color-scheme:dark}
html,body,#root{min-height:100%;margin:0;background:#05060a;color:#e7ecf3;font-family:Inter,ui-sans-serif,system-ui,Segoe UI,sans-serif}
body{overflow-x:hidden}
.fallback{min-height:100vh;display:grid;place-items:center;padding:24px;background:radial-gradient(900px 500px at 20% 0,rgba(17,250,203,.10),transparent 60%),radial-gradient(900px 500px at 90% 100%,rgba(255,138,31,.10),transparent 60%),linear-gradient(180deg,#05060a,#060810 50%,#05060a)}
.fallback-card{width:min(820px,calc(100% - 32px));border:1px solid #1e2733;background:#0d1117;padding:28px;box-shadow:0 28px 80px rgba(0,0,0,.55)}
.fallback small{color:#11facb;font-size:11px;font-weight:1000;text-transform:uppercase;letter-spacing:0}
.fallback h1{margin:10px 0 0;color:#d9c9a3;font-size:3.2rem;line-height:.92;text-transform:uppercase}
.fallback p{color:#b8a982;line-height:1.7}
.fallback ul{margin:18px 0 0;padding-left:20px;color:#8592a5;line-height:1.7}
.fallback a{color:#ffb347}
`;
}

function fallbackReport(buildId) {
  return `
<main class="fallback" aria-label="Metro 2033 Redux ALERTED fallback report">
  <section class="fallback-card">
    <small>ALERTED Field Report - Static fallback - Build ${escapeHtml(buildId)}</small>
    <h1>Metro 2033 Redux</h1>
    <p><strong>86 / A - Strong, caveated buy.</strong> Metro 2033 Redux is an atmosphere-first survival FPS with dense authored pressure, strong world texture, and visible limits around agency and old-FPS monster friction.</p>
    <ul>
      <li>Buy if you want cinematic survival horror, resource pressure, and story-rich stations.</li>
      <li>Works if you accept linear route authorship in exchange for pacing and cohesion.</li>
      <li>Skip if you need sandbox systems, buildcraft, or broad open-world agency.</li>
    </ul>
    <p><a href="../../">Back to ALERT reports</a> &middot; <a href="${githubUrl}">GitHub repository</a></p>
  </section>
</main>`;
}

function reportHtml({ appCss, buildId, sourceHash, bundleHash }) {
  const title = 'Metro 2033 Redux - ALERTED Field Report';
  const description = 'Metro 2033 Redux ALERTED review: an 86/A atmosphere-first survival FPS verdict with score anatomy, audience fit, friction ledger, evidence arcs, and adversarial audit checks.';
  const versionedReportUrl = `${reportUrl}?v=${buildId}`;
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<link rel="icon" href="data:,">
<link rel="canonical" href="${reportUrl}">
<meta name="description" content="${escapeHtml(description)}">
<meta name="theme-color" content="#05060a">
<meta name="build-id" content="${buildId}">
<meta name="source-sha256" content="${sourceHash}">
<meta name="bundle-sha256" content="${bundleHash}">
<meta property="og:type" content="article">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${escapeHtml(description)}">
<meta property="og:url" content="${versionedReportUrl}">
<meta name="twitter:card" content="summary">
<meta name="twitter:title" content="${title}">
<meta name="twitter:description" content="${escapeHtml(description)}">
<style>${shellCss()}
${appCss}
</style>
</head>
<body>
<noscript><p class="fallback-card">JavaScript is disabled. A static fallback report is shown below.</p></noscript>
<div id="root">${fallbackReport(buildId)}</div>
<script type="module" src="./${bundleName}?v=${buildId}"></script>
</body>
</html>
`;
}

function rootHtml(buildId) {
  return portfolioHomeHtml({
    buildId,
    siteBase,
    reportPath,
    reportsPath: 'plater-game-reports/',
    quantumBreakPath: quantumBreakReportPath,
    quantumBreakJourneyPath,
    apocalypsePath: 'apocalypse-express/',
    githubUrl
  });
}

function reportsIndexHtml(buildId) {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>ALERT Game Reports</title>
<link rel="icon" href="data:,">
<link rel="canonical" href="${reportsUrl}">
<meta name="description" content="Canon game verdicts, ALERTED axis evidence, overlays, verdict logic, and adversarial audit files.">
<meta name="theme-color" content="#05070a">
<meta name="build-id" content="${buildId}">
<style>
:root{--bg:#05070a;--ink:#eef8ff;--muted:rgba(238,248,255,.62);--cyan:#00e5ff;--orange:#ff7a00;--green:#16ffc1;--line:rgba(238,248,255,.16)}*{box-sizing:border-box}body{margin:0;min-height:100vh;display:grid;place-items:start center;padding:30px 14px;color:var(--ink);background:repeating-linear-gradient(90deg,rgba(0,229,255,.05) 0 1px,transparent 1px 88px),linear-gradient(180deg,#030405,#070a0d 48%,#030405);font-family:Inter,system-ui,Segoe UI,sans-serif}main{width:min(100%,980px);display:grid;gap:18px}a{color:inherit;text-decoration:none}header{display:grid;gap:10px;border-bottom:3px solid rgba(238,248,255,.12);padding-bottom:18px}h1{margin:0;color:var(--orange);font-size:3.4rem;line-height:.86;font-weight:1000;text-transform:uppercase;text-shadow:6px 6px 0 #000}p{margin:0;color:var(--muted);font-size:15px;line-height:1.45;font-weight:780}.report{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:18px;align-items:end;border:5px solid var(--ink);background:#060708;box-shadow:12px 12px 0 var(--orange),-6px -6px 0 var(--cyan),0 28px 80px #000;padding:22px;color:inherit;text-decoration:none}.report.draft{border-color:rgba(238,248,255,.72);box-shadow:12px 12px 0 #26384f,-6px -6px 0 var(--cyan),0 28px 80px #000}.kicker{color:var(--cyan);font-size:11px;font-weight:1000;text-transform:uppercase}h2{margin:8px 0 10px;color:var(--ink);font-size:2.4rem;line-height:.95;font-weight:1000;text-transform:uppercase;text-shadow:4px 4px 0 #000}.score{display:grid;place-items:center;min-width:118px;min-height:118px;border:4px solid var(--cyan);background:#0006;box-shadow:6px 6px 0 var(--orange);color:var(--orange);font-size:42px;font-weight:1000;text-shadow:4px 4px 0 #000;text-transform:uppercase}.score.pending{font-size:28px;color:var(--muted);box-shadow:6px 6px 0 #26384f}.mini{display:flex;flex-wrap:wrap;gap:8px;margin-top:10px}.mini span{border:2px solid var(--cyan);padding:6px 8px;font-size:11px;font-weight:1000;text-transform:uppercase;color:var(--muted)}.mini .good{border-color:var(--green);color:var(--green)}.mini .pending{border-color:var(--orange);color:#ffcf83}.sub{display:flex;gap:8px;flex-wrap:wrap;margin-top:10px}.sub a{border:2px solid var(--line);padding:6px 8px;font-size:11px;font-weight:1000;text-transform:uppercase;color:#ffcf83}@media(max-width:680px){.report{grid-template-columns:1fr}.score{justify-self:start}}
</style>
</head>
<body>
<main>
<header><p><a href="../">Kenessy home</a></p><h1>ALERT Reports</h1><p>Canon game verdicts, ALERTED axis evidence, overlays, verdict logic, and adversarial audit files.</p></header>
<a class="report" href="games/metro-2033-redux/?v=${buildId}"><div><div class="kicker">Metro 2033 Redux</div><h2>ALERTED Field Report</h2><p>Worth playing. Atmosphere-first, linear, cohesive action horror with bounded agency and visible caveats.</p><div class="mini"><span>A Atmosphere</span><span>L Loop</span><span>E Engagement</span><span>R Readability</span><span>T Technical</span><span class="good">86 / A</span></div></div><div class="score">86</div></a>
<article class="report draft"><div><div class="kicker">Quantum Break</div><h2>Review Draft Shell</h2><p>Replay-ready structure for a Remedy cinematic sci-fi review, plus an illustrated journey page built from live narration.</p><div class="mini"><span>Promise</span><span>Loop</span><span>Agency</span><span>Trust</span><span>Readiness</span><span class="pending">Draft</span></div><div class="sub"><a href="games/quantum-break/">Open review</a><a href="games/quantum-break/journey/">Open journey</a></div></div><div class="score pending">--</div></article>
</main>
</body>
</html>
`;
}

function robotsTxt() {
  return `User-agent: *
Allow: /
Sitemap: ${new URL('sitemap.xml', siteBase).toString()}
`;
}

function sitemapXml(buildDate) {
  const urls = [siteBase, reportsUrl, reportUrl, quantumBreakReportUrl, quantumBreakJourneyUrl, apocalypseUrl];
  const items = urls.map((url) => `  <url>
    <loc>${url}</loc>
    <lastmod>${buildDate}</lastmod>
  </url>`).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${items}
</urlset>
`;
}

function notFoundHtml(buildId) {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Not Found - Kenessy Pages</title>
<link rel="icon" href="data:,">
<meta name="robots" content="noindex">
<style>
body{margin:0;min-height:100vh;display:grid;place-items:center;background:#05060a;color:#e7ecf3;font-family:Inter,system-ui,Segoe UI,sans-serif}.card{width:min(680px,calc(100% - 32px));border:1px solid #1e2733;background:#0d1117;padding:28px}h1{margin:0;color:#d9c9a3;font-size:3.2rem;text-transform:uppercase}p{color:#8592a5;line-height:1.7}a{color:#ffb347;font-weight:900}
</style>
</head>
<body>
<main class="card">
<h1>404</h1>
<p>This page does not exist. Current Metro report build: ${buildId}.</p>
<p><a href="${siteBase}">Project root</a> &middot; <a href="${reportUrl}?v=${buildId}">Metro report</a></p>
</main>
</body>
</html>
`;
}

async function main() {
  logStep(`reading source ${path.relative(repoRoot, sourcePath)}`);
  const source = await readFile(sourcePath, 'utf8');
  logStep(`reading source ${path.relative(repoRoot, quantumBreakReportSourcePath)}`);
  const quantumBreakReportHtml = await readFile(quantumBreakReportSourcePath, 'utf8');
  logStep(`reading source ${path.relative(repoRoot, quantumBreakJourneySourcePath)}`);
  const quantumBreakJourneyHtml = await readFile(quantumBreakJourneySourcePath, 'utf8');
  const sourceHash = sha256(source);
  const buildId = sourceHash.slice(0, 12);
  const { css, cssStart } = extractTemplateCss(source);
  const transformedSource = transformedSourceWithoutInlineStyle(source, cssStart);

  const tempDir = await mkdtemp(path.join(tmpdir(), 'kenessy-metro-build-'));
  try {
    const tempSourcePath = path.join(tempDir, 'metro-source.jsx');
    const tempEntryPath = path.join(tempDir, 'metro-entry.jsx');
    await writeFile(tempSourcePath, transformedSource, 'utf8');
    await writeFile(tempEntryPath, `import { createRoot } from 'react-dom/client';\nimport AlertedMetroReviewTemplate from './metro-source.jsx';\n\nconst root = document.getElementById('root');\nif (root) {\n  createRoot(root).render(<AlertedMetroReviewTemplate />);\n}\n`, 'utf8');

    logStep('bundling React runtime locally');
    await mkdir(reportDir, { recursive: true });
    await build({
      entryPoints: [tempEntryPath],
      outfile: bundlePath,
      bundle: true,
      format: 'esm',
      platform: 'browser',
      jsx: 'automatic',
      minify: true,
      sourcemap: false,
      nodePaths: [path.join(repoRoot, 'node_modules')],
      define: {
        'process.env.NODE_ENV': '"production"'
      },
      logLevel: 'silent'
    });

    const bundle = await readFile(bundlePath, 'utf8');
    const bundleHash = sha256(bundle);
    logStep(`writing Pages artifacts build=${buildId}`);
    await mkdir(quantumBreakReportDir, { recursive: true });
    await mkdir(quantumBreakJourneyDir, { recursive: true });
    await writeFile(reportIndexPath, reportHtml({ appCss: css, buildId, sourceHash, bundleHash }), 'utf8');
    await writeFile(quantumBreakReportIndexPath, quantumBreakReportHtml, 'utf8');
    await writeFile(quantumBreakJourneyIndexPath, quantumBreakJourneyHtml, 'utf8');
    await writeFile(rootIndexPath, rootHtml(buildId), 'utf8');
    await writeFile(reportsIndexPath, reportsIndexHtml(buildId), 'utf8');
    await writeFile(robotsPath, robotsTxt(), 'utf8');
    await writeFile(sitemapPath, sitemapXml(new Date().toISOString().slice(0, 10)), 'utf8');
    await writeFile(notFoundPath, notFoundHtml(buildId), 'utf8');

    await rm(publicSourcePath, { force: true });
  } finally {
    await rm(tempDir, { recursive: true, force: true });
  }
  logStep('done');
}

main().catch((error) => {
  console.error(`[build:metro] failed: ${error.stack || error.message}`);
  process.exit(1);
});
