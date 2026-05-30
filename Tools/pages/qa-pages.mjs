import { createServer } from 'node:http';
import { execFileSync } from 'node:child_process';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDir, '../..');
const docsRoot = path.join(repoRoot, 'docs');
const mode = process.argv.includes('--live') ? 'live' : 'local';
const liveBase = 'https://kenessy.github.io/Kenessy/';
const reportPath = 'plater-game-reports/games/metro-2033-redux/';
const quantumBreakPath = 'plater-game-reports/games/quantum-break/';
const quantumBreakJourneyPath = 'plater-game-reports/games/quantum-break/journey/';
const quantumBreakPanelManifestPath = 'assets/img/quantum-break/panel-manifest.json';
const bundleName = 'main_canvas_diegetic_equation.bundle.js';
const sourceName = 'main_canvas_diegetic_equation.jsx';
const expectedLiveReportUrl = new URL(reportPath, liveBase).toString();
const expectedLiveQuantumBreakUrl = new URL(quantumBreakPath, liveBase).toString();
const expectedLiveQuantumBreakJourneyUrl = new URL(quantumBreakJourneyPath, liveBase).toString();

function checkpoint(message) {
  console.log(`[qa:pages:${mode}] ${new Date().toISOString()} ${message}`);
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function gitStatus() {
  return execFileSync('git', ['-C', repoRoot, 'status', '--porcelain'], { encoding: 'utf8' });
}

function contentType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (ext === '.html') return 'text/html; charset=utf-8';
  if (ext === '.js') return 'application/javascript; charset=utf-8';
  if (ext === '.xml') return 'application/xml; charset=utf-8';
  if (ext === '.txt') return 'text/plain; charset=utf-8';
  if (ext === '.json') return 'application/json; charset=utf-8';
  if (ext === '.svg') return 'image/svg+xml';
  if (ext === '.png') return 'image/png';
  return 'application/octet-stream';
}

async function fileExists(filePath) {
  try {
    await stat(filePath);
    return true;
  } catch {
    return false;
  }
}

async function startServer() {
  const server = createServer(async (req, res) => {
    try {
      const requestUrl = new URL(req.url || '/', 'http://127.0.0.1');
      let pathname = decodeURIComponent(requestUrl.pathname);
      if (pathname.endsWith('/')) pathname += 'index.html';
      const candidate = path.resolve(docsRoot, `.${pathname}`);
      const relativeCandidate = path.relative(docsRoot, candidate);
      if (relativeCandidate.startsWith('..') || path.isAbsolute(relativeCandidate)) {
        res.writeHead(403);
        res.end('Forbidden');
        return;
      }
      if (await fileExists(candidate)) {
        res.writeHead(200, { 'content-type': contentType(candidate), 'cache-control': 'no-store' });
        res.end(await readFile(candidate));
        return;
      }
      const notFound = path.join(docsRoot, '404.html');
      res.writeHead(404, { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store' });
      res.end(await readFile(notFound));
    } catch (error) {
      res.writeHead(500, { 'content-type': 'text/plain; charset=utf-8' });
      res.end(error.stack || error.message);
    }
  });
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const address = server.address();
  return { server, base: `http://127.0.0.1:${address.port}/` };
}

async function fetchText(url, expectedStatus = 200) {
  const response = await fetch(url, { cache: 'no-store' });
  const text = await response.text();
  assert(response.status === expectedStatus, `${url} returned ${response.status}, expected ${expectedStatus}`);
  return { response, text };
}

function url(base, relativePath = '') {
  return new URL(relativePath, base).toString();
}

function metroReportUrl(base, buildId) {
  return url(base, `${reportPath}?v=${buildId}`);
}

function extractBuildId(html) {
  const match = html.match(/name="build-id" content="([^"]+)"/);
  assert(match, 'build-id meta tag missing');
  return match[1];
}

async function launchBrowser() {
  const attempts = [
    { headless: true },
    { headless: true, channel: 'msedge' },
    { headless: true, channel: 'chrome' }
  ];
  let lastError;
  for (const options of attempts) {
    try {
      return await chromium.launch(options);
    } catch (error) {
      lastError = error;
    }
  }
  throw lastError;
}

async function auditHttpSurface(base) {
  checkpoint('checking HTTP surface');
  const root = await fetchText(url(base));
  const buildId = extractBuildId(root.text);
  assert(root.text.includes('class="home-root"'), 'root is not the portfolio homepage');
  assert(root.text.includes('I find the hidden failure before it becomes obvious.'), 'root homepage hero copy missing');
  assert(root.text.includes('Operator readout'), 'root homepage operator panel missing');
  assert(root.text.includes('What This Is'), 'root homepage about section missing');
  assert(root.text.includes('id="lanes"') && root.text.includes('Active Lanes'), 'root homepage active lanes map missing');
  assert(root.text.includes('id="work"'), 'root homepage work section missing');
  assert(root.text.includes('Why This Profile'), 'root homepage hiring readout missing');
  assert(root.text.includes('Play It Together'), 'root homepage journal section missing');
  assert(root.text.includes('fullscreen dossier scrapbook pages') && root.text.includes('attached photos'), 'root homepage journal scrapbook guidance missing');
  assert(root.text.includes('Page 02 logged') && root.text.includes('class="journal-contract"') && root.text.includes('Dossier scrapbook pages') && root.text.includes('2 photos wired'), 'root homepage journal photo-evidence contract missing');
  assert(root.text.includes('class="journal-file-queue"') && root.text.includes('qb-page-02-a-airlock-threshold.png') && root.text.includes('qb-page-02-c-core-detonation.png') && root.text.includes('qb-page-02-d-frozen-will.png'), 'root homepage journal photo evidence filenames missing');
  assert(root.text.includes('Photo evidence ready') && root.text.includes('Photo manifest'), 'root homepage Quantum Break photo handoff links missing');
  assert(root.text.includes('assets/img/quantum-break/panel-manifest.json') && root.text.includes('assets/img/quantum-break/README.md'), 'root homepage Quantum Break handoff asset links missing');
  assert(root.text.includes('.review-status') && root.text.includes('.journal-note'), 'root homepage review/journal polish styling missing');
  assert(root.text.includes('State</b> Live draft') && root.text.includes('exact 16:9 filenames auto-wire into visible photo evidence slots'), 'root homepage Quantum Break review/journal state copy missing');
  assert(root.text.includes(`${reportPath}?v=${buildId}`), 'root homepage does not link current Metro build id');
  assert(root.text.includes('apocalypse-express/'), 'root homepage does not link Apocalypse Express');
  assert(root.text.includes(quantumBreakPath), 'root homepage does not link Quantum Break');
  assert(root.text.includes('Quantum Break'), 'root homepage Quantum Break card missing');
  assert(root.text.includes('LOCKED') && root.text.includes('4 gates open'), 'root homepage Quantum Break evidence gate card missing');
  assert(!/>--</.test(root.text), 'root homepage still exposes raw dash placeholders');
  assert(root.text.includes('assets/img/triad-validation-flow.png'), 'root homepage project visual missing');
  assert(root.text.includes('assets/img/metro-2033-redux-review-splash.png'), 'root homepage Metro review splash missing');
  assert(root.text.includes('assets/img/quantum-break-review-journey-splash.svg'), 'root homepage Quantum Break splash missing');
  assert(!/\.site-nav\{[^}]*position:sticky/i.test(root.text), 'root homepage nav is sticky and can contaminate full-page captures');
  assert(root.text.includes('<link rel="canonical" href="https://kenessy.github.io/Kenessy/">'), 'root canonical metadata missing');
  assert(!/http-equiv="refresh"|window\.location\.replace/.test(root.text), 'root still contains redirect behavior');
  await fetchText(url(base, 'assets/img/triad-validation-flow.png'));
  await fetchText(url(base, 'assets/img/metro-2033-redux-review-splash.png'));
  await fetchText(url(base, 'assets/img/quantum-break-review-journey-splash.svg'));

  const reports = await fetchText(url(base, 'plater-game-reports/'));
  assert(reports.text.includes(`games/metro-2033-redux/?v=${buildId}`), 'reports index does not link current build id');
  assert(reports.text.includes('games/quantum-break/'), 'reports index does not link Quantum Break');
  assert(reports.text.includes('games/quantum-break/journey/'), 'reports index does not link Quantum Break journey');
  assert(reports.text.includes('../'), 'reports index does not link back to homepage');
  assert(reports.text.includes('LOCKED') && reports.text.includes('Draft'), 'reports index Quantum Break evidence gate missing');
  assert(!/>--</.test(reports.text), 'reports index still exposes raw dash placeholders');

  const quantumBreak = await fetchText(url(base, quantumBreakPath));
  assert(quantumBreak.text.includes('ALERTED field report draft'), 'Quantum Break report shell missing');
  assert(quantumBreak.text.includes('Open Journey'), 'Quantum Break report does not link journey');
  assert(quantumBreak.text.includes(quantumBreakPanelManifestPath), 'Quantum Break report does not link panel manifest');
  assert(quantumBreak.text.includes('assets/img/quantum-break/README.md') && quantumBreak.text.includes('Prompt README'), 'Quantum Break report does not link prompt README');
  assert(quantumBreak.text.includes('Photo evidence ready') && quantumBreak.text.includes('class="thesis journey-handoff"') && quantumBreak.text.includes('.handoff-grid'), 'Quantum Break report photo handoff block missing');
  assert(quantumBreak.text.includes('Score locked') && quantumBreak.text.includes('Evidence Gate'), 'Quantum Break score lock missing');
  assert(quantumBreak.text.includes('Quantum Break score unlock gates') && quantumBreak.text.includes('<b>Final act</b>'), 'Quantum Break hero score gate rail missing');
  assert(quantumBreak.text.includes('.hud{position:relative;top:auto;z-index:auto}'), 'Quantum Break report nav full-page capture override missing');
  assert(quantumBreak.text.includes('.status:before') && quantumBreak.text.includes('#diagnosis .diag:before') && quantumBreak.text.includes('.risk-ledger .aud:before'), 'Quantum Break report lower-section polish styling missing');
  assert(quantumBreak.text.includes('.evidence-ledger .aud:before') && quantumBreak.text.includes('.review-note-section .field-note:before') && quantumBreak.text.includes('.reader-tags:before'), 'Quantum Break report evidence/reviewer polish styling missing');
  assert(quantumBreak.text.includes('class="section live-evidence-section"') && quantumBreak.text.includes('class="section review-note-section"'), 'Quantum Break report polished evidence/reviewer section classing missing');
  assert(quantumBreak.text.includes('Replay Notes So Far'), 'Quantum Break report live evidence section missing');
  assert(quantumBreak.text.includes('Project Promenade') && quantumBreak.text.includes('First Stutter'), 'Quantum Break report does not surface Page 01/02 evidence');
  assert(quantumBreak.text.includes('two-minute proof') && quantumBreak.text.includes('apparent self-detonation') && quantumBreak.text.includes('causality clarity'), 'Quantum Break report Page 02 evidence is stale');
  assert(quantumBreak.text.includes('Replay Gate Matrix') && quantumBreak.text.includes('Combat feel') && quantumBreak.text.includes('Episode flow') && quantumBreak.text.includes('PC state') && quantumBreak.text.includes('Final act'), 'Quantum Break report gate matrix missing');
  assert(!/>--</.test(quantumBreak.text), 'Quantum Break report still exposes raw dash placeholders');
  assert(!quantumBreak.text.includes('[This becomes'), 'Quantum Break report still exposes raw verdict placeholder text');
  assert(!quantumBreak.text.includes('[Evidence'), 'Quantum Break report still exposes bracketed evidence placeholders');

  const quantumBreakJourney = await fetchText(url(base, quantumBreakJourneyPath));
  assert(quantumBreakJourney.text.includes('Fullscreen Journal') && quantumBreakJourney.text.includes('Play-it-together scrapbook reader'), 'Quantum Break journey fullscreen scrapbook reader copy missing');
  assert(quantumBreakJourney.text.includes('.reader-track') && quantumBreakJourney.text.includes('.journal-page') && quantumBreakJourney.text.includes('scroll-snap-type:x mandatory'), 'Quantum Break journey fullscreen reader styling missing');
  assert(quantumBreakJourney.text.includes('.dossier-page') && quantumBreakJourney.text.includes('.scrapbook-board') && quantumBreakJourney.text.includes('.photo-card'), 'Quantum Break journey dossier scrapbook layout missing');
  assert(!quantumBreakJourney.text.includes('.comic-spread') && !quantumBreakJourney.text.includes('.spread-grid') && !quantumBreakJourney.text.includes('grid-template-areas'), 'Quantum Break journey still contains old comic grid layout');
  assert(quantumBreakJourney.text.includes('.page-shell{width:100%;height:100%;') && !quantumBreakJourney.text.includes('.page-shell{width:min'), 'Quantum Break journey still uses centered page-shell sizing');
  assert(quantumBreakJourney.text.includes('Scroll sideways') && quantumBreakJourney.text.includes('fullscreen journal pages'), 'Quantum Break journey sideways reader navigation missing');
  assert(quantumBreakJourney.text.includes('Review-canon route selected'), 'Quantum Break journey route lock missing');
  assert(quantumBreakJourney.text.includes('Page 01'), 'Quantum Break journey page 01 missing');
  assert(quantumBreakJourney.text.includes('The Machine Breaks') && quantumBreakJourney.text.includes('First Stutter'), 'Quantum Break journey page 02 machine-break note missing');
  assert(quantumBreakJourney.text.includes('two minutes') && quantumBreakJourney.text.includes('five-minute forward jump') && quantumBreakJourney.text.includes('self-detonating machine core') && quantumBreakJourney.text.includes('touching him awake'), 'Quantum Break journey Page 02 replay note is stale');
  assert(quantumBreakJourney.text.includes('Scrapbook contract') && quantumBreakJourney.text.includes('Field Notes First'), 'Quantum Break journey scrapbook contract missing');
  assert(quantumBreakJourney.text.includes('.photo-slot') && quantumBreakJourney.text.includes('.photo-slot-ready .photo-placeholder{display:none}') && quantumBreakJourney.text.includes('.photo-paper'), 'Quantum Break journey photo evidence frame styling missing');
  assert(!quantumBreakJourney.text.includes('Panel Contract') && !quantumBreakJourney.text.includes('Image-ready comic page') && !quantumBreakJourney.text.includes('<b>4</b> image slots'), 'Quantum Break journey still exposes old comic slot copy');
  assert(quantumBreakJourney.text.includes('Generation Brief'), 'Quantum Break journey image generation brief missing');
  assert(quantumBreakJourney.text.includes(quantumBreakPanelManifestPath), 'Quantum Break journey does not link panel manifest');
  assert(quantumBreakJourney.text.includes('qb-page-02-a-airlock-threshold.png') && quantumBreakJourney.text.includes('qb-page-02-c-core-detonation.png') && quantumBreakJourney.text.includes('qb-page-02-d-frozen-will.png'), 'Quantum Break journey photo evidence filenames missing');
  assert(quantumBreakJourney.text.includes('Shared style contract') && quantumBreakJourney.text.includes('Dossier photo language'), 'Quantum Break journey prompt style contract missing');
  assert(quantumBreakJourney.text.includes('No logos') && quantumBreakJourney.text.includes('No fake text'), 'Quantum Break journey prompt guardrails missing');
  assert((quantumBreakJourney.text.match(/data-image-ratio="16:9"/g) || []).length === 2, 'Quantum Break journey should expose exactly two visible 16:9 photo frames');
  assert(quantumBreakJourney.text.includes('data-qb-slot="page-02-a"') && quantumBreakJourney.text.includes('data-qb-slot="page-02-c"') && !quantumBreakJourney.text.includes('data-qb-slot="page-02-d"'), 'Quantum Break journey visible photo slot markers mismatch');
  assert(!quantumBreakJourney.text.includes('data-qb-slot="page-01-a"') && !quantumBreakJourney.text.includes('data-qb-slot="page-02-b"'), 'Quantum Break journey still includes removed visible slot markers');
  assert(!quantumBreakJourney.text.includes('.panel-frame') && !quantumBreakJourney.text.includes('IMAGE SLOT'), 'Quantum Break journey still contains old panel-frame slot styling');
  assert(quantumBreakJourney.text.includes('The build auto-wires any matching image file into its photo evidence slot.'), 'Quantum Break journey auto-wiring contract missing');
  const panelManifest = await fetchText(url(base, quantumBreakPanelManifestPath));
  const panelManifestJson = JSON.parse(panelManifest.text);
  assert(panelManifestJson.defaultAspectRatio === '16:9', 'Quantum Break panel manifest default aspect ratio is not 16:9');
  assert(panelManifestJson.status === 'scrapbook-redesign-photo-evidence', 'Quantum Break panel manifest status mismatch');
  assert(panelManifestJson.promptVersion === 'qb-scrapbook-photo-evidence-v1', 'Quantum Break panel manifest promptVersion mismatch');
  assert(typeof panelManifestJson.sharedPrompt === 'string' && panelManifestJson.sharedPrompt.includes('16:9 cinematic sci-fi dossier photo'), 'Quantum Break panel manifest sharedPrompt missing');
  assert(typeof panelManifestJson.negativePrompt === 'string' && panelManifestJson.negativePrompt.includes('fake UI overlays'), 'Quantum Break panel manifest negativePrompt missing');
  assert(Array.isArray(panelManifestJson.styleRules) && panelManifestJson.styleRules.length >= 4, 'Quantum Break panel manifest styleRules missing');
  assert(Array.isArray(panelManifestJson.slots) && panelManifestJson.slots.length === 3, 'Quantum Break panel manifest photo evidence slots mismatch');
  assert(panelManifestJson.slots.filter((slot) => slot.visibleInJourney !== false).length === 2, 'Quantum Break panel manifest visible journey slots mismatch');
  assert(panelManifestJson.slots.filter((slot) => slot.requiredForCurrentPage).length === 2, 'Quantum Break panel manifest current-page required slots mismatch');
  assert(panelManifestJson.slots.every((slot) => slot.prompt && slot.composition && slot.avoid), 'Quantum Break panel manifest slot prompt fields missing');
  assert(panelManifest.text.includes('qb-page-02-a-airlock-threshold.png') && panelManifest.text.includes('qb-page-02-c-core-detonation.png') && panelManifest.text.includes('qb-page-02-d-frozen-will.png'), 'Quantum Break panel manifest missing expected photo evidence slots');
  assert(panelManifest.text.includes('Will frozen inside a time stutter') && panelManifest.text.includes('hand-contact focal point') && panelManifest.text.includes('no fake text'), 'Quantum Break panel manifest next missing prompt details are stale');
  const panelReadme = await fetchText(url(base, 'assets/img/quantum-break/README.md'));
  assert(panelReadme.text.includes('npm run qa:qb-assets') && panelReadme.text.includes('npm run qa:qb-assets:all'), 'Quantum Break asset README missing QA workflow commands');
  assert(panelReadme.text.includes('Scrapbook Photo Evidence') && panelReadme.text.includes('Next missing image') && panelReadme.text.includes('qb-page-02-c-core-detonation.png'), 'Quantum Break asset README prompt workflow missing');

  const report = await fetchText(url(base, `${reportPath}?v=${buildId}`));
  assert(report.text.includes(`${bundleName}?v=${buildId}`), 'report HTML does not load versioned bundle');
  assert(report.text.includes('<noscript>'), 'report HTML is missing noscript fallback');
  assert(/atmosphere-first survival FPS/i.test(report.text), 'report fallback summary is missing meaningful content');
  assert(!report.text.includes('https://esm.sh/'), 'report still depends on esm.sh import map');
  assert(!report.text.includes('type="importmap"'), 'report still includes an import map');

  const bundle = await fetchText(url(base, `${reportPath}${bundleName}?v=${buildId}`));
  assert(bundle.text.includes('createRoot'), 'bundle does not include React render entry');
  assert(bundle.text.includes('Metro 2033 Redux') && bundle.text.includes('Developer diagnostics'), 'bundle does not include Metro report content');
  assert(!/\bfrom\s*["']react/.test(bundle.text), 'bundle still imports React externally');
  assert(!bundle.text.includes('https://esm.sh/'), 'bundle still references esm.sh');

  const robots = await fetchText(url(base, 'robots.txt'));
  assert(robots.text.includes('Sitemap:'), 'robots.txt missing sitemap reference');

  const sitemap = await fetchText(url(base, 'sitemap.xml'));
  assert(sitemap.text.includes(expectedLiveReportUrl), 'sitemap missing live report URL');
  assert(sitemap.text.includes(expectedLiveQuantumBreakUrl), 'sitemap missing Quantum Break report URL');
  assert(sitemap.text.includes(expectedLiveQuantumBreakJourneyUrl), 'sitemap missing Quantum Break journey URL');

  await fetchText(url(base, 'missing-page-for-qa.html'), 404);
  await fetchText(url(base, `${reportPath}${sourceName}`), 404);
  checkpoint(`HTTP surface ok build=${buildId}`);
  return buildId;
}

async function auditViewports(browser, base, buildId) {
  checkpoint('checking browser viewports');
  const viewports = [
    { name: 'mobile-360', width: 360, height: 740 },
    { name: 'mobile-390', width: 390, height: 844 },
    { name: 'tablet-768', width: 768, height: 1024 },
    { name: 'desktop-1280', width: 1280, height: 720 },
    { name: 'desktop-1920', width: 1920, height: 1080 }
  ];

  for (const viewport of viewports) {
    checkpoint(`viewport ${viewport.name}`);
    const context = await browser.newContext({ viewport: { width: viewport.width, height: viewport.height }, deviceScaleFactor: 1 });
    const page = await context.newPage();
    const consoleErrors = [];
    const pageErrors = [];
    const failedRequests = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });
    page.on('pageerror', (error) => pageErrors.push(error.message));
    page.on('requestfailed', (request) => failedRequests.push(`${request.url()} ${request.failure()?.errorText || ''}`));
    const homeResponse = await page.goto(`${url(base)}?qa-home=${viewport.name}`, { waitUntil: 'load', timeout: 30000 });
    await page.waitForTimeout(700);
    assert(homeResponse?.status() === 200, `${viewport.name} homepage returned ${homeResponse?.status()}`);
    const homeMetrics = await page.evaluate((currentReportPath) => {
      const root = document.documentElement;
      const visible = [...document.querySelectorAll('a,button,summary')].filter((el) => {
        const rect = el.getBoundingClientRect();
        const style = getComputedStyle(el);
        return rect.width > 0 && rect.height > 0 && style.display !== 'none' && style.visibility !== 'hidden';
      });
      const smallInteractive = visible
        .filter((el) => {
          const rect = el.getBoundingClientRect();
          return rect.width < 32 || rect.height < 28;
        })
        .map((el) => ({ tag: el.tagName, text: (el.textContent || '').trim().slice(0, 60) }));
      const bodyText = document.body.textContent.replace(/\s+/g, ' ').trim();
      const proofImage = document.querySelector('.proof-card img');
      const reviewSplash = document.querySelector('.review-media img');
      const quantumSplash = document.querySelector('.qb-card .review-media img');
      return {
        title: document.title,
        hasHomeRoot: Boolean(document.querySelector('.home-root')),
        h1: document.querySelector('h1')?.textContent.trim(),
        hasReportLink: [...document.querySelectorAll('a[href]')].some((el) => el.getAttribute('href')?.includes(currentReportPath)),
        hasQuantumBreakLink: [...document.querySelectorAll('a[href]')].some((el) => el.getAttribute('href')?.includes('plater-game-reports/games/quantum-break/')),
        hasApocalypseLink: [...document.querySelectorAll('a[href]')].some((el) => el.getAttribute('href')?.includes('apocalypse-express/')),
        imageComplete: Boolean(proofImage && proofImage.complete && proofImage.naturalWidth > 0),
        reviewSplashComplete: Boolean(reviewSplash && reviewSplash.complete && reviewSplash.naturalWidth > 0),
        quantumSplashComplete: Boolean(quantumSplash && quantumSplash.complete && quantumSplash.naturalWidth > 0),
        horizontalOverflow: root.scrollWidth > root.clientWidth + 1,
        rootWidth: root.scrollWidth,
        clientWidth: root.clientWidth,
        linkCount: document.querySelectorAll('a').length,
        badText: /\b(undefined|NaN|\[object Object\])\b/i.test(bodyText),
        smallInteractive
      };
    }, reportPath);
    assert(homeMetrics.title.includes('Kenessy'), `${viewport.name} homepage title missing Kenessy`);
    assert(homeMetrics.hasHomeRoot, `${viewport.name} homepage root missing`);
    assert(homeMetrics.h1 === 'I find the hidden failure before it becomes obvious.', `${viewport.name} unexpected homepage h1 ${homeMetrics.h1}`);
    assert(homeMetrics.hasReportLink, `${viewport.name} homepage missing Metro report link`);
    assert(homeMetrics.hasQuantumBreakLink, `${viewport.name} homepage missing Quantum Break link`);
    assert(homeMetrics.hasApocalypseLink, `${viewport.name} homepage missing Apocalypse Express link`);
    assert(homeMetrics.imageComplete, `${viewport.name} homepage hero image did not load`);
    assert(homeMetrics.reviewSplashComplete, `${viewport.name} homepage Metro review splash did not load`);
    assert(homeMetrics.quantumSplashComplete, `${viewport.name} homepage Quantum Break splash did not load`);
    assert(!homeMetrics.horizontalOverflow, `${viewport.name} homepage overflow ${homeMetrics.rootWidth}/${homeMetrics.clientWidth}`);
    assert(homeMetrics.linkCount >= 7, `${viewport.name} homepage expected navigation links`);
    assert(!homeMetrics.badText, `${viewport.name} homepage has placeholder text`);
    assert(homeMetrics.smallInteractive.length === 0, `${viewport.name} homepage small tap targets ${JSON.stringify(homeMetrics.smallInteractive)}`);

    const response = await page.goto(`${metroReportUrl(base, buildId)}&qa=${viewport.name}`, { waitUntil: 'load', timeout: 30000 });
    await page.waitForTimeout(1200);
    assert(response?.status() === 200, `${viewport.name} report returned ${response?.status()}`);
    const metrics = await page.evaluate(() => {
      const root = document.documentElement;
      const visible = [...document.querySelectorAll('*')].filter((el) => {
        const rect = el.getBoundingClientRect();
        const style = getComputedStyle(el);
        return rect.width > 0 && rect.height > 0 && style.display !== 'none' && style.visibility !== 'hidden';
      });
      const meaningfulOverflow = visible.filter((el) => {
        const rect = el.getBoundingClientRect();
        const className = String(el.className);
        if (/scr-keyword-glow|scr-score-panel-glare/.test(className)) return false;
        return rect.right > window.innerWidth + 1 || rect.left < -1;
      }).slice(0, 5).map((el) => ({ tag: el.tagName, className: String(el.className), text: (el.textContent || '').trim().slice(0, 80) }));
      return {
        finalUrl: location.href,
        title: document.title,
        hasRoot: Boolean(document.querySelector('.scr-root')),
        diagnostics: document.body.textContent.includes('15/15 checks passing'),
        h1: document.querySelector('h1')?.textContent.trim(),
        horizontalOverflow: root.scrollWidth > root.clientWidth + 1,
        rootWidth: root.scrollWidth,
        clientWidth: root.clientWidth,
        meaningfulOverflow,
        summaryCount: document.querySelectorAll('summary').length,
        links: document.querySelectorAll('a').length,
        bodyPrefix: document.body.textContent.trim().replace(/\s+/g, ' ').slice(0, 120)
      };
    });
    assert(metrics.finalUrl.includes(`${reportPath}?v=${buildId}`), `${viewport.name} did not load versioned report`);
    assert(metrics.hasRoot, `${viewport.name} did not render React root`);
    assert(metrics.diagnostics, `${viewport.name} missing 15/15 diagnostics`);
    assert(metrics.h1 === 'Metro 2033 Redux', `${viewport.name} unexpected h1 ${metrics.h1}`);
    assert(!metrics.horizontalOverflow, `${viewport.name} has horizontal overflow ${metrics.rootWidth}/${metrics.clientWidth}`);
    assert(metrics.meaningfulOverflow.length === 0, `${viewport.name} has meaningful offscreen elements ${JSON.stringify(metrics.meaningfulOverflow)}`);
    assert(metrics.summaryCount >= 2, `${viewport.name} expected details summaries`);
    assert(metrics.links >= 3, `${viewport.name} expected visible navigation links`);
    assert(!metrics.bodyPrefix.startsWith('.scr-root'), `${viewport.name} body text starts with runtime CSS`);
    assert(consoleErrors.length === 0, `${viewport.name} console errors: ${consoleErrors.join(' | ')}`);
    assert(pageErrors.length === 0, `${viewport.name} page errors: ${pageErrors.join(' | ')}`);
    assert(failedRequests.length === 0, `${viewport.name} failed requests: ${failedRequests.join(' | ')}`);

    const summaryCount = await page.locator('summary').count();
    assert(summaryCount >= 2, `${viewport.name} expected summaries to be clickable`);
    await page.locator('summary').first().click();
    await page.waitForTimeout(200);
    const openDetails = await page.evaluate(() => [...document.querySelectorAll('details')].filter((detail) => detail.open).length);
    assert(openDetails >= 1, `${viewport.name} details did not open`);
    await context.close();
  }
  checkpoint('browser viewports ok');
}

async function auditFailureModes(browser, base, buildId) {
  checkpoint('checking failure modes');
  const reportUrl = url(base, `${reportPath}?v=${buildId}`);

  const noJsContext = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  const noJsPage = await noJsContext.newPage();
  const noJsResponse = await noJsPage.goto(`${reportUrl}&qa=nojs`, { waitUntil: 'load', timeout: 30000 });
  assert(noJsResponse?.status() === 200, `no-JS page returned ${noJsResponse?.status()}`);
  const noJs = await noJsPage.evaluate(() => ({
    hasNoscript: Boolean(document.querySelector('noscript')),
    hasReportContent: /Atmosphere-first survival FPS|Static fallback|Strong, caveated buy/.test(document.body.textContent),
    text: document.body.textContent.trim().replace(/\s+/g, ' ').slice(0, 200)
  }));
  assert(noJs.hasNoscript, 'no-JS mode missing noscript element');
  assert(noJs.hasReportContent, `no-JS mode lacks meaningful fallback: ${noJs.text}`);
  await noJsContext.close();

  const blockedContext = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const blockedPage = await blockedContext.newPage();
  const errors = [];
  blockedPage.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(msg.text());
  });
  await blockedPage.route('https://esm.sh/**', (route) => route.abort());
  const blockedResponse = await blockedPage.goto(`${reportUrl}&qa=cdn-block`, { waitUntil: 'load', timeout: 30000 });
  await blockedPage.waitForTimeout(1000);
  assert(blockedResponse?.status() === 200, `CDN-block page returned ${blockedResponse?.status()}`);
  const blocked = await blockedPage.evaluate(() => ({
    hasRoot: Boolean(document.querySelector('.scr-root')),
    diagnostics: document.body.textContent.includes('15/15 checks passing')
  }));
  assert(blocked.hasRoot && blocked.diagnostics, 'blocking esm.sh should not affect local runtime bundle');
  assert(errors.length === 0, `CDN-block mode produced console errors: ${errors.join(' | ')}`);
  await blockedContext.close();

  checkpoint('failure modes ok');
}

async function main() {
  checkpoint('start');
  const beforeStatus = gitStatus();
  let serverHandle;
  let base = liveBase;
  if (mode === 'local') {
    serverHandle = await startServer();
    base = serverHandle.base;
    checkpoint(`local server ${base}`);
  }

  try {
    const buildId = await auditHttpSurface(base);
    const browser = await launchBrowser();
    try {
      await auditViewports(browser, base, buildId);
      await auditFailureModes(browser, base, buildId);
    } finally {
      await browser.close();
    }

    const afterStatus = gitStatus();
    assert(afterStatus === beforeStatus, 'QA changed git working tree state');
    checkpoint('all checks passed');
  } finally {
    if (serverHandle) {
      await new Promise((resolve) => serverHandle.server.close(resolve));
      checkpoint('local server stopped');
    }
  }
}

main().catch((error) => {
  console.error(`[qa:pages:${mode}] failed: ${error.stack || error.message}`);
  process.exit(1);
});
