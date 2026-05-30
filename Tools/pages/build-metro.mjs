import { build } from 'esbuild';
import { portfolioHomeHtml } from './site-home.mjs';
import { createHash } from 'node:crypto';
import { access, mkdtemp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDir, '../..');
const sourcePath = path.join(scriptDir, 'sources/metro-2033-redux/main_canvas_diegetic_equation.jsx');
const siteHomeSourcePath = path.join(scriptDir, 'site-home.mjs');
const reportDir = path.join(repoRoot, 'docs/plater-game-reports/games/metro-2033-redux');
const quantumBreakReportDir = path.join(repoRoot, 'docs/plater-game-reports/games/quantum-break');
const quantumBreakJourneyDir = path.join(quantumBreakReportDir, 'journey');
const preyReportDir = path.join(repoRoot, 'docs/plater-game-reports/games/prey');
const preyJourneyDir = path.join(preyReportDir, 'journey');
const bundleName = 'main_canvas_diegetic_equation.bundle.js';
const bundlePath = path.join(reportDir, bundleName);
const reportIndexPath = path.join(reportDir, 'index.html');
const quantumBreakReportIndexPath = path.join(quantumBreakReportDir, 'index.html');
const quantumBreakJourneyIndexPath = path.join(quantumBreakJourneyDir, 'index.html');
const preyReportIndexPath = path.join(preyReportDir, 'index.html');
const preyJourneyIndexPath = path.join(preyJourneyDir, 'index.html');
const quantumBreakReportSourcePath = path.join(scriptDir, 'sources/quantum-break/report.html');
const quantumBreakJourneySourcePath = path.join(scriptDir, 'sources/quantum-break/journey.html');
const quantumBreakAssetManifestSourcePath = path.join(scriptDir, 'sources/quantum-break/assets/panel-manifest.json');
const quantumBreakAssetReadmeSourcePath = path.join(scriptDir, 'sources/quantum-break/assets/README.md');
const preyReportSourcePath = path.join(scriptDir, 'sources/prey/report.html');
const preyJourneySourcePath = path.join(scriptDir, 'sources/prey/journey.html');
const preyAssetManifestSourcePath = path.join(scriptDir, 'sources/prey/assets/flight-recorder-manifest.json');
const preyAssetReadmeSourcePath = path.join(scriptDir, 'sources/prey/assets/README.md');
const preySplashSourcePath = path.join(scriptDir, 'sources/prey/prey-review-splash.png');
const quantumBreakAssetPublicDir = path.join(repoRoot, 'docs/assets/img/quantum-break');
const quantumBreakAssetManifestPublicPath = path.join(quantumBreakAssetPublicDir, 'panel-manifest.json');
const quantumBreakAssetReadmePublicPath = path.join(quantumBreakAssetPublicDir, 'README.md');
const preyAssetPublicDir = path.join(repoRoot, 'docs/assets/img/prey');
const preyAssetManifestPublicPath = path.join(preyAssetPublicDir, 'flight-recorder-manifest.json');
const preyAssetReadmePublicPath = path.join(preyAssetPublicDir, 'README.md');
const preySplashPublicPath = path.join(repoRoot, 'docs/assets/img/prey-review-splash.png');
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
const preyReportPath = 'plater-game-reports/games/prey/';
const preyJourneyPath = 'plater-game-reports/games/prey/journey/';
const reportUrl = new URL(reportPath, siteBase).toString();
const quantumBreakReportUrl = new URL(quantumBreakReportPath, siteBase).toString();
const quantumBreakJourneyUrl = new URL(quantumBreakJourneyPath, siteBase).toString();
const preyReportUrl = new URL(preyReportPath, siteBase).toString();
const preyJourneyUrl = new URL(preyJourneyPath, siteBase).toString();
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

async function fileExists(filePath) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
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

function quantumBreakImageAlt(slot) {
  return `Quantum Break journal photo evidence: ${slot.brief}`;
}

async function renderQuantumBreakJourneyImages(html, manifest) {
  if (!manifest || !Array.isArray(manifest.slots)) {
    throw new Error('Quantum Break panel manifest is missing slots.');
  }

  let output = html;
  let presentCount = 0;
  let missingCount = 0;

  for (const slot of manifest.slots) {
    const id = String(slot.id || '');
    const filename = String(slot.filename || '');
    if (!id || !filename) {
      throw new Error(`Quantum Break panel manifest has an invalid slot: ${JSON.stringify(slot)}`);
    }

    const visibleInJourney = slot.visibleInJourney !== false;
    const slotMarker = `data-qb-slot="${id}"`;
    if (visibleInJourney && !output.includes(slotMarker)) {
      throw new Error(`Quantum Break journey missing slot marker ${id}`);
    }

    const filePath = path.join(quantumBreakAssetPublicDir, filename);
    if (!(await fileExists(filePath))) {
      missingCount += 1;
      continue;
    }

    if (!visibleInJourney) {
      continue;
    }

    const framePattern = new RegExp(
      `<div class="photo-slot" data-image-ratio="16:9" data-qb-slot="${escapeRegExp(id)}"><div class="photo-placeholder">([\\s\\S]*?)<\\/div><\\/div>`
    );
    if (!framePattern.test(output)) {
      throw new Error(`Quantum Break journey slot ${id} is not a scrapbook photo placeholder.`);
    }

    const imageSrc = `../../../../assets/img/quantum-break/${filename}`;
    output = output.replace(
      framePattern,
      `<div class="photo-slot photo-slot-ready" data-image-ratio="${escapeHtml(slot.aspectRatio || manifest.defaultAspectRatio || '16:9')}" data-qb-slot="${escapeHtml(id)}" data-image-file="${escapeHtml(filename)}"><img src="${escapeHtml(imageSrc)}" alt="${escapeHtml(quantumBreakImageAlt(slot))}" loading="lazy" decoding="async"></div>`
    );
    presentCount += 1;
  }

  logStep(`Quantum Break journey image wiring present=${presentCount} missing=${missingCount}`);
  return output;
}

function preyImageAlt(slot) {
  return `Prey flight recorder evidence: ${slot.brief}`;
}

async function renderPreyJourneyImages(html, manifest) {
  if (!manifest || !Array.isArray(manifest.slots)) {
    throw new Error('Prey flight recorder manifest is missing slots.');
  }

  let output = html;
  let presentCount = 0;
  let missingCount = 0;

  for (const slot of manifest.slots) {
    const id = String(slot.id || '');
    const filename = String(slot.filename || '');
    if (!id || !filename) {
      throw new Error(`Prey flight recorder manifest has an invalid slot: ${JSON.stringify(slot)}`);
    }

    const visibleInJourney = slot.visibleInJourney !== false;
    const slotMarker = `data-prey-slot="${id}"`;
    if (visibleInJourney && !output.includes(slotMarker)) {
      throw new Error(`Prey journey missing slot marker ${id}`);
    }

    const filePath = path.join(preyAssetPublicDir, filename);
    if (!(await fileExists(filePath))) {
      missingCount += 1;
      continue;
    }

    if (!visibleInJourney) {
      continue;
    }

    const framePattern = new RegExp(
      `<div class="evidence-slot" data-image-ratio="16:9" data-prey-slot="${escapeRegExp(id)}"><div class="slot-placeholder">([\\s\\S]*?)<\\/div><\\/div>`
    );
    if (!framePattern.test(output)) {
      throw new Error(`Prey journey slot ${id} is not a recorder evidence placeholder.`);
    }

    const imageSrc = `../../../../assets/img/prey/${filename}`;
    output = output.replace(
      framePattern,
      `<div class="evidence-slot evidence-slot-ready" data-image-ratio="${escapeHtml(slot.aspectRatio || manifest.defaultAspectRatio || '16:9')}" data-prey-slot="${escapeHtml(id)}" data-image-file="${escapeHtml(filename)}"><img src="${escapeHtml(imageSrc)}" alt="${escapeHtml(preyImageAlt(slot))}" loading="lazy" decoding="async"></div>`
    );
    presentCount += 1;
  }

  logStep(`Prey journey image wiring present=${presentCount} missing=${missingCount}`);
  return output;
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
    preyPath: preyReportPath,
    preyJourneyPath,
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
:root{--bg:#05070a;--ink:#eef8ff;--muted:rgba(238,248,255,.62);--cyan:#00e5ff;--orange:#ff7a00;--green:#16ffc1;--line:rgba(238,248,255,.16)}*{box-sizing:border-box}body{margin:0;min-height:100vh;display:grid;place-items:start center;padding:30px 14px;color:var(--ink);background:repeating-linear-gradient(90deg,rgba(0,229,255,.05) 0 1px,transparent 1px 88px),linear-gradient(180deg,#030405,#070a0d 48%,#030405);font-family:Inter,system-ui,Segoe UI,sans-serif}main{width:min(100%,980px);display:grid;gap:18px}a{color:inherit;text-decoration:none}header{display:grid;gap:10px;border-bottom:3px solid rgba(238,248,255,.12);padding-bottom:18px}h1{margin:0;color:var(--orange);font-size:3.4rem;line-height:.86;font-weight:1000;text-transform:uppercase;text-shadow:6px 6px 0 #000}p{margin:0;color:var(--muted);font-size:15px;line-height:1.45;font-weight:780}.report{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:18px;align-items:end;border:5px solid var(--ink);background:#060708;box-shadow:12px 12px 0 var(--orange),-6px -6px 0 var(--cyan),0 28px 80px #000;padding:22px;color:inherit;text-decoration:none}.report.draft{border-color:rgba(238,248,255,.72);box-shadow:12px 12px 0 #26384f,-6px -6px 0 var(--cyan),0 28px 80px #000}.kicker{color:var(--cyan);font-size:11px;font-weight:1000;text-transform:uppercase}h2{margin:8px 0 10px;color:var(--ink);font-size:2.4rem;line-height:.95;font-weight:1000;text-transform:uppercase;text-shadow:4px 4px 0 #000}.score{display:grid;place-items:center;min-width:118px;min-height:118px;border:4px solid var(--cyan);background:#0006;box-shadow:6px 6px 0 var(--orange);color:var(--orange);font-size:42px;font-weight:1000;text-shadow:4px 4px 0 #000;text-transform:uppercase}.score.pending{align-content:center;gap:4px;font-size:18px;color:#ffcf83;box-shadow:6px 6px 0 #26384f}.score.pending span,.score.pending small{display:block;text-align:center}.score.pending small{color:var(--cyan);font-size:14px}.mini{display:flex;flex-wrap:wrap;gap:8px;margin-top:10px}.mini span{border:2px solid var(--cyan);padding:6px 8px;font-size:11px;font-weight:1000;text-transform:uppercase;color:var(--muted)}.mini .good{border-color:var(--green);color:var(--green)}.mini .pending{border-color:var(--orange);color:#ffcf83}.sub{display:flex;gap:8px;flex-wrap:wrap;margin-top:10px}.sub a{border:2px solid var(--line);padding:6px 8px;font-size:11px;font-weight:1000;text-transform:uppercase;color:#ffcf83}@media(max-width:680px){.report{grid-template-columns:1fr}.score{justify-self:start}}
</style>
</head>
<body>
<main>
<header><p><a href="../">Kenessy home</a></p><h1>ALERT Reports</h1><p>Canon game verdicts, ALERTED axis evidence, overlays, verdict logic, and adversarial audit files.</p></header>
<a class="report" href="games/metro-2033-redux/?v=${buildId}"><div><div class="kicker">Metro 2033 Redux</div><h2>ALERTED Field Report</h2><p>Worth playing. Atmosphere-first, linear, cohesive action horror with bounded agency and visible caveats.</p><div class="mini"><span>A Atmosphere</span><span>L Loop</span><span>E Engagement</span><span>R Readability</span><span>T Technical</span><span class="good">86 / A</span></div></div><div class="score">86</div></a>
<article class="report draft"><div><div class="kicker">Quantum Break</div><h2>Review Draft Shell</h2><p>Replay-ready structure for a Remedy cinematic sci-fi review, plus an illustrated journey page built from live narration.</p><div class="mini"><span>Promise</span><span>Loop</span><span>Agency</span><span>Trust</span><span>Readiness</span><span class="pending">Draft</span></div><div class="sub"><a href="games/quantum-break/">Open review</a><a href="games/quantum-break/journey/">Open journey</a></div></div><div class="score pending" aria-label="Quantum Break verdict locked until replay evidence"><span>LOCKED</span><small>Draft</small></div></article>
<article class="report draft"><div><div class="kicker">Prey</div><h2>Flight Recorder</h2><p>Owned next-run candidate: a TranStar incident dossier for Talos I, mimic paranoia, immersive-sim agency, proof gates, and a pre-run black box recorder.</p><div class="mini"><span>Immersive sim</span><span>Talos I</span><span>Station horror</span><span>Systems audit</span><span class="pending">Recorder ready</span></div><div class="sub"><a href="games/prey/">Open entry</a><a href="games/prey/journey/">Open recorder</a></div></div><div class="score pending" aria-label="Prey verdict locked until first-run evidence"><span>LOCKED</span><small>Recorder</small></div></article>
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
  const urls = [siteBase, reportsUrl, reportUrl, quantumBreakReportUrl, quantumBreakJourneyUrl, preyReportUrl, preyJourneyUrl, apocalypseUrl];
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
  logStep(`reading source ${path.relative(repoRoot, siteHomeSourcePath)}`);
  const siteHomeSource = await readFile(siteHomeSourcePath, 'utf8');
  logStep(`reading source ${path.relative(repoRoot, quantumBreakReportSourcePath)}`);
  const quantumBreakReportHtml = await readFile(quantumBreakReportSourcePath, 'utf8');
  logStep(`reading source ${path.relative(repoRoot, quantumBreakJourneySourcePath)}`);
  const quantumBreakJourneyHtml = await readFile(quantumBreakJourneySourcePath, 'utf8');
  logStep(`reading source ${path.relative(repoRoot, quantumBreakAssetManifestSourcePath)}`);
  const quantumBreakAssetManifest = await readFile(quantumBreakAssetManifestSourcePath, 'utf8');
  logStep(`reading source ${path.relative(repoRoot, quantumBreakAssetReadmeSourcePath)}`);
  const quantumBreakAssetReadme = await readFile(quantumBreakAssetReadmeSourcePath, 'utf8');
  logStep(`reading source ${path.relative(repoRoot, preyReportSourcePath)}`);
  const preyReportSourceHtml = await readFile(preyReportSourcePath, 'utf8');
  logStep(`reading source ${path.relative(repoRoot, preyJourneySourcePath)}`);
  const preyJourneySourceHtml = await readFile(preyJourneySourcePath, 'utf8');
  logStep(`reading source ${path.relative(repoRoot, preyAssetManifestSourcePath)}`);
  const preyAssetManifest = await readFile(preyAssetManifestSourcePath, 'utf8');
  logStep(`reading source ${path.relative(repoRoot, preyAssetReadmeSourcePath)}`);
  const preyAssetReadme = await readFile(preyAssetReadmeSourcePath, 'utf8');
  logStep(`reading source ${path.relative(repoRoot, preySplashSourcePath)}`);
  const preySplashPng = await readFile(preySplashSourcePath);
  const quantumBreakAssetManifestJson = JSON.parse(quantumBreakAssetManifest);
  const preyAssetManifestJson = JSON.parse(preyAssetManifest);
  const wiredQuantumBreakJourneyHtml = await renderQuantumBreakJourneyImages(quantumBreakJourneyHtml, quantumBreakAssetManifestJson);
  const wiredPreyJourneyHtml = await renderPreyJourneyImages(preyJourneySourceHtml, preyAssetManifestJson);
  const sourceHash = sha256(source);
  const buildHashInput = [
    source,
    siteHomeSource,
    quantumBreakReportHtml,
    quantumBreakJourneyHtml,
    quantumBreakAssetManifest,
    quantumBreakAssetReadme,
    preyReportSourceHtml,
    preyJourneySourceHtml,
    preyAssetManifest,
    preyAssetReadme,
    preySplashPng.toString('base64')
  ].join('\n\n/* kenessy-pages-build-input */\n\n');
  const buildId = sha256(buildHashInput).slice(0, 12);
  const preyReportHtml = preyReportSourceHtml.replaceAll('__BUILD_ID__', buildId);
  const preyJourneyHtml = wiredPreyJourneyHtml.replaceAll('__BUILD_ID__', buildId);
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
    await mkdir(preyReportDir, { recursive: true });
    await mkdir(preyJourneyDir, { recursive: true });
    await mkdir(quantumBreakAssetPublicDir, { recursive: true });
    await mkdir(preyAssetPublicDir, { recursive: true });
    await writeFile(reportIndexPath, reportHtml({ appCss: css, buildId, sourceHash, bundleHash }), 'utf8');
    await writeFile(quantumBreakReportIndexPath, quantumBreakReportHtml, 'utf8');
    await writeFile(quantumBreakJourneyIndexPath, wiredQuantumBreakJourneyHtml, 'utf8');
    await writeFile(preyReportIndexPath, preyReportHtml, 'utf8');
    await writeFile(preyJourneyIndexPath, preyJourneyHtml, 'utf8');
    await writeFile(quantumBreakAssetManifestPublicPath, quantumBreakAssetManifest, 'utf8');
    await writeFile(quantumBreakAssetReadmePublicPath, quantumBreakAssetReadme, 'utf8');
    await writeFile(preyAssetManifestPublicPath, preyAssetManifest, 'utf8');
    await writeFile(preyAssetReadmePublicPath, preyAssetReadme, 'utf8');
    await writeFile(preySplashPublicPath, preySplashPng);
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
