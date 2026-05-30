import { createServer } from 'node:http';
import { mkdir, readFile, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDir, '../..');
const docsRoot = path.join(repoRoot, 'docs');
const outputDir = path.join(repoRoot, '.cache/pages-design-qa');
const mode = process.argv.includes('--live') ? 'live' : 'local';
const liveBase = 'https://kenessy.github.io/Kenessy/';
const reportPath = 'plater-game-reports/games/metro-2033-redux/';

const runState = {
  mode,
  startedAt: new Date().toISOString(),
  checkpoints: [],
  viewports: []
};

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

async function checkpoint(message, extra = {}) {
  const item = { at: new Date().toISOString(), message, ...extra };
  runState.checkpoints.push(item);
  console.log(`[qa:pages:design:${mode}] ${item.at} ${message}`);
  await mkdir(outputDir, { recursive: true });
  await writeFile(path.join(outputDir, `latest-${mode}.json`), JSON.stringify(runState, null, 2), 'utf8');
}

function contentType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (ext === '.html') return 'text/html; charset=utf-8';
  if (ext === '.js') return 'application/javascript; charset=utf-8';
  if (ext === '.xml') return 'application/xml; charset=utf-8';
  if (ext === '.txt') return 'text/plain; charset=utf-8';
  if (ext === '.png') return 'image/png';
  if (ext === '.svg') return 'image/svg+xml';
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
      res.writeHead(404, { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store' });
      res.end(await readFile(path.join(docsRoot, '404.html')));
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

async function auditDesignArtifacts(base) {
  await checkpoint('checking design artifact CSS');
  const root = await fetchText(url(base));
  const buildId = extractBuildId(root.text);
  assert(root.text.includes('.home-root'), 'portfolio homepage CSS is missing');
  assert(root.text.includes('.operator-panel'), 'portfolio homepage operator panel styling is missing');
  assert(root.text.includes('.hire-read'), 'portfolio homepage hiring signal grid styling is missing');
  assert(root.text.includes('.about-grid'), 'portfolio homepage about section styling is missing');
  assert(root.text.includes('.review-card'), 'portfolio homepage review section styling is missing');
  assert(root.text.includes('.review-media'), 'portfolio homepage review splash styling is missing');
  assert(root.text.includes('.qb-card'), 'portfolio homepage Quantum Break card styling is missing');
  assert(root.text.includes('.journal-card') && root.text.includes('.journal-slot'), 'portfolio homepage journal styling is missing');
  assert(root.text.includes('.proof-grid'), 'portfolio homepage proof surface styling is missing');
  assert(root.text.includes('triad-validation-flow.png'), 'portfolio homepage visual asset is missing');
  assert(root.text.includes('metro-2033-redux-review-splash.png'), 'portfolio homepage Metro splash asset is missing');
  assert(root.text.includes('quantum-break-review-journey-splash.svg'), 'portfolio homepage Quantum Break splash asset is missing');
  assert(!/font-size:clamp\([^)]*vw/i.test(root.text), 'homepage CSS uses viewport-scaled font sizing');
  assert(!/letter-spacing:-/i.test(root.text), 'homepage CSS has negative letter spacing');
  assert(!/http-equiv="refresh"|window\.location\.replace/.test(root.text), 'homepage still contains redirect behavior');
  const report = await fetchText(url(base, `${reportPath}?v=${buildId}`));
  assert(!/font-size:clamp\([^)]*vw/i.test(report.text), 'report CSS still uses viewport-scaled font sizing');
  assert(!/letter-spacing:-/i.test(report.text), 'report CSS still has negative letter spacing');
  assert(!/\.site-links\{position:fixed/i.test(report.text), 'report still has floating nav overlay CSS');
  assert(report.text.includes('.scr-hud-links a'), 'report CSS is missing HUD link styling');
  assert(!report.text.includes('.scr-hero-verdict-strip>div'), 'hero verdict strip still has stale div-cell styling');
  assert(report.text.includes('.scr-text-signal'), 'hero text signal block styling is missing');
  assert(!report.text.includes('.scr-text-signal-accent'), 'text signals still use a separate accent line');
  assert(!report.text.includes('.scr-text-signal::after'), 'text signals still have an inner frame pseudo-layer');
  assert(report.text.includes('padding-box') && report.text.includes('border-box'), 'text signal border gradient is missing');
  assert(!report.text.includes('.scr-text-signal-fill'), 'text signals still use the numeric meter fill layer');
  assert(!report.text.includes('height:var(--fill)'), 'text signals still use rising fill sizing');
  assert(report.text.includes('.scr-fit-signal'), 'audience fit text signal preset is missing');
  assert(report.text.includes('.scr-text-signal-copy'), 'audience fit signal copy styling is missing');
  assert(report.text.includes('.scr-inspect-section .scr-section-head p'), 'INSPECT header paragraph emphasis styling is missing');
  assert(report.text.includes('.scr-signal-block'), 'shared signal block styling is missing');
  assert(report.text.includes('--scr-type-main-score-title'), 'report CSS is missing shared type size presets');
  assert(report.text.includes('--scr-type-main-score-rank'), 'report CSS is missing main score rank size preset');
  assert(report.text.includes('font-size:var(--scr-type-main-score-title)'), 'main score title is not using the shared type preset');
  assert(report.text.includes('FIELD NOTE'), 'hero identity rail label is missing');
  assert(report.text.includes('.scr-inspect-metrics'), 'flat INSPECT metrics CSS is missing');
  assert(report.text.includes('.scr-inspect-meter'), 'INSPECT meter lane CSS is missing');
  assert(report.text.includes('.scr-inspect-player'), 'INSPECT player type copy CSS is missing');
  assert(report.text.includes('.scr-score-anatomy .scr-section-head p'), 'score anatomy header paragraph emphasis styling is missing');
  assert(report.text.includes('.scr-alerted-word'), 'colored ALERTED wordmark styling is missing');
  assert(report.text.includes('.scr-score-anatomy .scr-score-strip{border:0'), 'score strip outer border removal is missing');
  assert(report.text.includes('.scr-score-calculator'), 'simplified score calculator styling is missing');
  assert(report.text.includes('.scr-score-calc-equation'), 'simplified score calculator equation styling is missing');
  assert(report.text.includes('.scr-reviewer-note .scr-section-head p'), 'reviewer note header paragraph emphasis styling is missing');
  assert(report.text.includes('.scr-keyword-primary'), 'reviewer keyword primary tag styling is missing');
  assert(report.text.includes('.scr-reviewer-note .scr-keyword-cloud span'), 'reviewer keyword capsule styling is missing');
  assert(report.text.includes('.scr-correction-ledger .scr-section-head p'), 'correction ledger header paragraph emphasis styling is missing');
  assert(report.text.includes('.scr-correction-ledger .scr-modifier-card'), 'correction modifier card styling is missing');
  assert(report.text.includes('.scr-ledger-index'), 'correction ledger index styling is missing');
  assert(report.text.includes('.scr-insight-module .scr-section-head p'), 'insight module header paragraph emphasis styling is missing');
  assert(report.text.includes('.scr-insight-board'), 'insight module board styling is missing');
  assert(report.text.includes('.scr-insight-index'), 'insight module index styling is missing');
  assert(report.text.includes('.scr-insight-badge'), 'insight module bottom badge styling is missing');
  assert(report.text.includes('.scr-trust-layer .scr-section-head p'), 'trust layer header paragraph emphasis styling is missing');
  assert(report.text.includes('.scr-trust-grid'), 'trust layer grid styling is missing');
  assert(report.text.includes('.scr-trust-badge'), 'trust layer bottom badge styling is missing');
  assert(report.text.includes('.scr-dossier-rail .scr-evidence-card'), 'dossier arc rail card styling is missing');
  assert(report.text.includes('.scr-dossier-rail .scr-evidence-impact b'), 'dossier arc rail impact tag styling is missing');
  assert(report.text.includes('.scr-evidence-protocol-card'), 'dossier protocol card styling is missing');
  await checkpoint(`design artifacts ok build=${buildId}`);
  return buildId;
}

async function auditViewport(browser, base, buildId, viewport) {
  await checkpoint(`viewport ${viewport.name}`);
  const context = await browser.newContext({ viewport: { width: viewport.width, height: viewport.height }, deviceScaleFactor: 1 });
  const page = await context.newPage();
  const consoleErrors = [];
  const failedRequests = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });
  page.on('requestfailed', (request) => failedRequests.push(`${request.url()} ${request.failure()?.errorText || ''}`));

  const response = await page.goto(`${metroReportUrl(base, buildId)}&design=${viewport.name}`, { waitUntil: 'load', timeout: 30000 });
  await page.waitForTimeout(1200);
  assert(response?.status() === 200, `${viewport.name} report returned ${response?.status()}`);

  const screenshotPath = path.join(outputDir, `${mode}-${viewport.name}.png`);
  await page.screenshot({ path: screenshotPath, fullPage: false });

  const metrics = await page.evaluate(() => {
    const isVisible = (el) => {
      const rect = el.getBoundingClientRect();
      const style = getComputedStyle(el);
      return rect.width > 0 && rect.height > 0 && style.display !== 'none' && style.visibility !== 'hidden';
    };
    const rectFor = (el) => {
      const rect = el.getBoundingClientRect();
      return { left: rect.left, right: rect.right, top: rect.top, bottom: rect.bottom, width: rect.width, height: rect.height };
    };
    const visibleInteractive = [...document.querySelectorAll('a,button,summary')].filter(isVisible);
    const smallInteractive = visibleInteractive
      .filter((el) => {
        const rect = el.getBoundingClientRect();
        return rect.width < 32 || rect.height < 28;
      })
      .map((el) => ({ tag: el.tagName, text: (el.textContent || '').trim().slice(0, 80), rect: rectFor(el) }));
    const negativeTracking = [...document.querySelectorAll('*')]
      .filter(isVisible)
      .filter((el) => Number.parseFloat(getComputedStyle(el).letterSpacing) < -0.01)
      .slice(0, 5)
      .map((el) => ({ tag: el.tagName, className: String(el.className), text: (el.textContent || '').trim().slice(0, 60) }));
    const hudLinks = [...document.querySelectorAll('.scr-hud-links a')].filter(isVisible).map((el) => rectFor(el));
    const score = document.querySelector('.scr-score-panel');
    const scoreRect = score ? rectFor(score) : null;
    const hero = document.querySelector('.scr-hero');
    const heroRect = hero ? rectFor(hero) : null;
    const firstContentSection = document.querySelector('.scr-shell > section:nth-of-type(2)');
    const firstContentRect = firstContentSection ? rectFor(firstContentSection) : null;
    const h1 = document.querySelector('.scr-hero h1');
    const h1Rect = h1 ? rectFor(h1) : null;
    const verdictStrip = document.querySelector('.scr-hero-verdict-strip');
    const verdictStripRect = verdictStrip ? rectFor(verdictStrip) : null;
    const verdictStripText = (verdictStrip?.textContent || '').replace(/\s+/g, ' ').trim();
    const textSignals = [...document.querySelectorAll('.scr-hero-verdict-strip .scr-text-signal')];
    const textSignalRects = textSignals.map(rectFor);
    const textSignalStyles = textSignals.map((el) => getComputedStyle(el));
    const textSignalBeforeStyles = textSignals.map((el) => getComputedStyle(el, '::before'));
    const textSignalAfterStyles = textSignals.map((el) => getComputedStyle(el, '::after'));
    const textSignalLabels = textSignals.map((el) => el.querySelector('small')).filter(Boolean);
    const textSignalMains = textSignals.map((el) => el.querySelector('.scr-text-signal-main')).filter(Boolean);
    const textSignalLabelStyles = textSignalLabels.map((el) => getComputedStyle(el));
    const textSignalLabelRects = textSignalLabels.map(rectFor);
    const textSignalMainRects = textSignalMains.map(rectFor);
    const fitSignals = [...document.querySelectorAll('.scr-fit-grid .scr-fit-signal')];
    const fitSignalRects = fitSignals.map(rectFor);
    const fitSignalStyles = fitSignals.map((el) => getComputedStyle(el));
    const fitSignalBeforeStyles = fitSignals.map((el) => getComputedStyle(el, '::before'));
    const fitSignalAfterStyles = fitSignals.map((el) => getComputedStyle(el, '::after'));
    const fitSignalLabels = fitSignals.map((el) => el.querySelector('small')).filter(Boolean);
    const fitSignalMains = fitSignals.map((el) => el.querySelector('.scr-text-signal-main')).filter(Boolean);
    const fitSignalLabelStyles = fitSignalLabels.map((el) => getComputedStyle(el));
    const fitSignalLabelRects = fitSignalLabels.map(rectFor);
    const fitSignalMainRects = fitSignalMains.map(rectFor);
    const audienceSection = document.querySelector('.scr-audience-fit');
    const audienceHead = audienceSection?.querySelector('.scr-section-head');
    const audienceHeadDesc = audienceHead?.querySelector('p');
    const audienceHeadDescStyle = audienceHeadDesc ? getComputedStyle(audienceHeadDesc) : null;
    const audienceThesis = audienceSection?.querySelector('.scr-fit-thesis');
    const audienceThesisStyle = audienceThesis ? getComputedStyle(audienceThesis) : null;
    const audienceThesisText = audienceThesis?.querySelector('p');
    const audienceThesisTextStyle = audienceThesisText ? getComputedStyle(audienceThesisText) : null;
    const metaChips = [...document.querySelectorAll('.scr-meta-rail .scr-meta-chip')];
    const metaChipRects = metaChips.map(rectFor);
    const metaChipStyles = metaChips.map((el) => getComputedStyle(el));
    const metaChipLabelStyles = metaChips.map((el) => getComputedStyle(el.querySelector('small')));
    const metaChipValueStyles = metaChips.map((el) => getComputedStyle(el.querySelector('b')));
    const mainScoreTitle = document.querySelector('.scr-main-score-title');
    const mainScoreTitleStyle = mainScoreTitle ? getComputedStyle(mainScoreTitle) : null;
    const mainScoreRank = document.querySelector('.scr-main-score-rank');
    const mainScoreRankStyle = mainScoreRank ? getComputedStyle(mainScoreRank) : null;
    const mainScoreValue = document.querySelector('.scr-main-score-meter .scr-tile-value');
    const mainScoreValueStyle = mainScoreValue ? getComputedStyle(mainScoreValue) : null;
    const identity = document.querySelector('.scr-identity');
    const identityStyle = identity ? getComputedStyle(identity) : null;
    const identityRailStyle = identity ? getComputedStyle(identity, '::before') : null;
    const identityLabelStyle = identity ? getComputedStyle(identity, '::after') : null;
    const scoreAnatomySection = document.querySelector('.scr-score-anatomy');
    const scoreAnatomyHead = scoreAnatomySection?.querySelector('.scr-section-head');
    const scoreAnatomyHeadDesc = scoreAnatomyHead?.querySelector('p');
    const scoreAnatomyHeadDescStyle = scoreAnatomyHeadDesc ? getComputedStyle(scoreAnatomyHeadDesc) : null;
    const alertedLetters = [...document.querySelectorAll('.scr-score-anatomy .scr-alerted-letter')];
    const alertedLetterStyles = alertedLetters.map((el) => getComputedStyle(el));
    const scoreStrip = document.querySelector('.scr-score-anatomy .scr-score-strip');
    const scoreStripStyle = scoreStrip ? getComputedStyle(scoreStrip) : null;
    const scoreTiles = [...document.querySelectorAll('.scr-score-anatomy .scr-score-tile')];
    const scoreTileRects = scoreTiles.map(rectFor);
    const scoreTileStyles = scoreTiles.map((el) => getComputedStyle(el));
    const scoreCalculator = document.querySelector('.scr-score-calculator');
    const scoreCalculatorStyle = scoreCalculator ? getComputedStyle(scoreCalculator) : null;
    const scoreCalculatorBeforeStyle = scoreCalculator ? getComputedStyle(scoreCalculator, '::before') : null;
    const scoreCalcHead = scoreCalculator?.querySelector('.scr-score-calc-head');
    const scoreCalcTerms = [...document.querySelectorAll('.scr-score-calculator .scr-score-calc-term')];
    const scoreCalcTermRects = scoreCalcTerms.map(rectFor);
    const scoreCalcLabels = scoreCalcTerms.map((el) => el.querySelector('.scr-score-calc-label')).filter(Boolean);
    const scoreCalcValues = scoreCalcTerms.map((el) => el.querySelector('.scr-score-calc-value')).filter(Boolean);
    const scoreCalcLabelStyles = scoreCalcLabels.map((el) => getComputedStyle(el));
    const scoreCalcValueStyles = scoreCalcValues.map((el) => getComputedStyle(el));
    const scoreCalcNote = scoreCalculator?.querySelector('.scr-score-calc-note');
    const scoreCalcNoteStyle = scoreCalcNote ? getComputedStyle(scoreCalcNote) : null;
    const reviewerNote = document.querySelector('.scr-reviewer-note');
    const reviewerHead = reviewerNote?.querySelector('.scr-section-head');
    const reviewerDesc = reviewerHead?.querySelector('p');
    const reviewerDescStyle = reviewerDesc ? getComputedStyle(reviewerDesc) : null;
    const keywordPanel = reviewerNote?.querySelector('.scr-keyword-panel');
    const keywordPanelRect = keywordPanel ? rectFor(keywordPanel) : null;
    const keywordHead = keywordPanel?.querySelector('.scr-keyword-head');
    const keywordHeadDesc = keywordHead?.querySelector('p');
    const keywordHeadDescStyle = keywordHeadDesc ? getComputedStyle(keywordHeadDesc) : null;
    const keywordPrimary = keywordPanel?.querySelector('.scr-keyword-primary');
    const keywordPrimaryStyle = keywordPrimary ? getComputedStyle(keywordPrimary) : null;
    const keywordGroups = [...(keywordPanel?.querySelectorAll('.scr-keyword-group') || [])];
    const keywordPills = [...(keywordPanel?.querySelectorAll('.scr-keyword-cloud span') || [])];
    const keywordPillRects = keywordPills.map(rectFor);
    const keywordPillStyles = keywordPills.map((el) => getComputedStyle(el));
    const keywordPositivePills = keywordPills.filter((el) => !el.classList.contains('negative'));
    const keywordNegativePills = keywordPills.filter((el) => el.classList.contains('negative'));
    const scoreStripBorderMax = scoreStripStyle ? Math.max(
      Number.parseFloat(scoreStripStyle.borderTopWidth) || 0,
      Number.parseFloat(scoreStripStyle.borderRightWidth) || 0,
      Number.parseFloat(scoreStripStyle.borderBottomWidth) || 0,
      Number.parseFloat(scoreStripStyle.borderLeftWidth) || 0
    ) : Infinity;
    const scoreTileBorderMax = scoreTileStyles.reduce((max, style) => Math.max(
      max,
      Number.parseFloat(style.borderTopWidth) || 0,
      Number.parseFloat(style.borderRightWidth) || 0,
      Number.parseFloat(style.borderBottomWidth) || 0,
      Number.parseFloat(style.borderLeftWidth) || 0
    ), 0);
    const shellSections = [...document.querySelectorAll('.scr-shell > section')];
    const inspectSection = document.querySelector('.scr-inspect-section');
    const inspectHead = inspectSection?.querySelector('.scr-section-head');
    const inspectHeadDesc = inspectHead?.querySelector('p');
    const inspectHeadDescStyle = inspectHeadDesc ? getComputedStyle(inspectHeadDesc) : null;
    const inspectMetrics = [...document.querySelectorAll('.scr-inspect-metric')];
    const inspectMetricStyles = inspectMetrics.map((el) => getComputedStyle(el));
    const inspectMetricRects = inspectMetrics.map(rectFor);
    const inspectMeters = [...document.querySelectorAll('.scr-inspect-meter.scr-score-meter-box.scr-signal-block')];
    const inspectMeterRects = inspectMeters.map(rectFor);
    const inspectMeterValues = inspectMeters.map((el) => el.querySelector('.scr-tile-value')).filter(Boolean);
    const inspectMeterValueStyles = inspectMeterValues.map((el) => getComputedStyle(el));
    const inspectNames = inspectMetrics.map((el) => el.querySelector('.scr-inspect-name')).filter(Boolean);
    const inspectPlayers = [...document.querySelectorAll('.scr-inspect-player')];
    const inspectPlayerRects = inspectPlayers.map(rectFor);
    const inspectPlayerStyles = inspectPlayers.map((el) => getComputedStyle(el));
    const inspectPlayerLines = inspectPlayers.map((el, index) => {
      const lineHeight = Number.parseFloat(inspectPlayerStyles[index]?.lineHeight) || Number.parseFloat(inspectPlayerStyles[index]?.fontSize) || 1;
      return inspectPlayerRects[index] ? inspectPlayerRects[index].height / lineHeight : 0;
    });
    const inspectMetricBorderWidth = inspectMetricStyles.reduce((max, style) => Math.max(
      max,
      Number.parseFloat(style.borderTopWidth) || 0,
      Number.parseFloat(style.borderRightWidth) || 0,
      Number.parseFloat(style.borderBottomWidth) || 0,
      Number.parseFloat(style.borderLeftWidth) || 0
    ), 0);
    const axisSection = document.querySelector('.scr-axis-diagnosis');
    const axisHead = axisSection?.querySelector('.scr-section-head');
    const axisHeadDesc = axisHead?.querySelector('p');
    const axisHeadDescStyle = axisHeadDesc ? getComputedStyle(axisHeadDesc) : null;
    const axisRows = [...document.querySelectorAll('.scr-axis-diagnosis .scr-axis-row')];
    const axisRowStyles = axisRows.map((el) => getComputedStyle(el));
    const axisRowRects = axisRows.map(rectFor);
    const axisTitleLabels = axisRows.map((el) => (el.querySelector('.scr-axis-title small')?.textContent || '').trim());
    const axisTitleNames = axisRows.map((el) => (el.querySelector('.scr-axis-title h3')?.textContent || '').trim());
    const axisTitleGrades = axisRows.map((el) => (el.querySelector('.scr-axis-title span')?.textContent || '').trim());
    const axisTitleNameStyles = axisRows.map((el) => getComputedStyle(el.querySelector('.scr-axis-title h3')));
    const axisBodyText = axisRows.map((el) => el.querySelector('.scr-axis-body p')).filter(Boolean);
    const axisBodyTextStyles = axisBodyText.map((el) => getComputedStyle(el));
    const axisSegmentCells = [...document.querySelectorAll('.scr-axis-diagnosis .scr-segments i')];
    const axisSegmentCellStyles = axisSegmentCells.map((el) => getComputedStyle(el));
    const axisMeters = [...document.querySelectorAll('.scr-axis-diagnosis .scr-d20-wrap.scr-score-meter-box.scr-signal-block')];
    const axisMeterRects = axisMeters.map(rectFor);
    const axisMeterValues = axisMeters.map((el) => (el.querySelector('.scr-tile-value')?.textContent || '').trim());
    const correctionSection = document.querySelector('.scr-correction-ledger');
    const correctionHead = correctionSection?.querySelector('.scr-section-head');
    const correctionHeadDesc = correctionHead?.querySelector('p');
    const correctionHeadDescStyle = correctionHeadDesc ? getComputedStyle(correctionHeadDesc) : null;
    const modifierCards = [...document.querySelectorAll('.scr-correction-ledger .scr-modifier-card')];
    const modifierCardStyles = modifierCards.map((el) => getComputedStyle(el));
    const modifierCardRects = modifierCards.map(rectFor);
    const modifierNames = modifierCards.map((el) => (el.querySelector('.scr-modifier-copy h3')?.textContent || '').trim());
    const modifierLabels = modifierCards.map((el) => (el.querySelector('.scr-modifier-copy span')?.textContent || '').trim());
    const modifierChipText = [...document.querySelectorAll('.scr-correction-ledger .scr-modifier-chips b')].map((el) => (el.textContent || '').trim()).join('|');
    const modifierMeters = [...document.querySelectorAll('.scr-correction-ledger .scr-modifier-meter.scr-score-meter-box.scr-signal-block')];
    const modifierMeterRects = modifierMeters.map(rectFor);
    const modifierMeterValues = modifierMeters.map((el) => (el.querySelector('.scr-tile-value')?.textContent || '').trim());
    const ledgerRows = [...document.querySelectorAll('.scr-correction-ledger .scr-ledger-row')];
    const ledgerRowStyles = ledgerRows.map((el) => getComputedStyle(el));
    const ledgerRowRects = ledgerRows.map(rectFor);
    const ledgerNames = ledgerRows.map((el) => (el.querySelector('.scr-ledger-title h4')?.textContent || '').trim());
    const ledgerLabels = ledgerRows.map((el) => (el.querySelector('.scr-ledger-title small')?.textContent || '').trim());
    const ledgerValues = ledgerRows.map((el) => (el.querySelector('.scr-ledger-value b')?.textContent || '').trim());
    const ledgerValueStyles = ledgerRows.map((el) => getComputedStyle(el.querySelector('.scr-ledger-value b')));
    const ledgerCheck = correctionSection?.querySelector('.scr-ledger-check');
    const ledgerHead = correctionSection?.querySelector('.scr-ledger-head');
    const insightSection = document.querySelector('.scr-insight-module');
    const insightHead = insightSection?.querySelector('.scr-section-head');
    const insightHeadDesc = insightHead?.querySelector('p');
    const insightHeadDescStyle = insightHeadDesc ? getComputedStyle(insightHeadDesc) : null;
    const insightBoard = insightSection?.querySelector('.scr-insight-board');
    const insightCards = [...document.querySelectorAll('.scr-insight-module .scr-insight')];
    const insightCardStyles = insightCards.map((el) => getComputedStyle(el));
    const insightCardBeforeStyles = insightCards.map((el) => getComputedStyle(el, '::before'));
    const insightCardRects = insightCards.map(rectFor);
    const insightIndices = insightCards.map((el) => (el.querySelector('.scr-insight-index')?.textContent || '').trim());
    const insightLabels = insightCards.map((el) => (el.querySelector('.scr-insight-badge')?.textContent || '').trim());
    const insightTitles = insightCards.map((el) => (el.querySelector('h3')?.textContent || '').trim());
    const insightHeadRects = insightCards.map((el) => rectFor(el.querySelector('.scr-insight-head')));
    const insightTitleStyles = insightCards.map((el) => getComputedStyle(el.querySelector('h3')));
    const insightBodyStyles = insightCards.map((el) => getComputedStyle(el.querySelector('p')));
    const insightTitleRects = insightCards.map((el) => rectFor(el.querySelector('h3')));
    const insightBodyRects = insightCards.map((el) => rectFor(el.querySelector('p')));
    const insightIndexRects = insightCards.map((el) => rectFor(el.querySelector('.scr-insight-index')));
    const insightBadgeRects = insightCards.map((el) => rectFor(el.querySelector('.scr-insight-badge')));
    const insightBadgeStyles = insightCards.map((el) => getComputedStyle(el.querySelector('.scr-insight-badge')));
    const trustSection = document.querySelector('.scr-trust-layer');
    const trustHead = trustSection?.querySelector('.scr-section-head');
    const trustHeadDesc = trustHead?.querySelector('p');
    const trustHeadDescStyle = trustHeadDesc ? getComputedStyle(trustHeadDesc) : null;
    const trustGrid = trustSection?.querySelector('.scr-trust-grid');
    const trustCards = [...document.querySelectorAll('.scr-trust-layer .scr-trust-card')];
    const trustCardStyles = trustCards.map((el) => getComputedStyle(el));
    const trustCardBeforeStyles = trustCards.map((el) => getComputedStyle(el, '::before'));
    const trustCardRects = trustCards.map(rectFor);
    const trustTitles = trustCards.map((el) => (el.querySelector('h3')?.textContent || '').trim());
    const trustLabels = trustCards.map((el) => (el.querySelector('.scr-trust-badge')?.textContent || '').trim());
    const trustTitleStyles = trustCards.map((el) => getComputedStyle(el.querySelector('h3')));
    const trustBodyStyles = trustCards.map((el) => getComputedStyle(el.querySelector('p')));
    const trustBadgeStyles = trustCards.map((el) => getComputedStyle(el.querySelector('.scr-trust-badge')));
    const trustTitleRects = trustCards.map((el) => rectFor(el.querySelector('h3')));
    const trustCopyRects = trustCards.map((el) => rectFor(el.querySelector('.scr-trust-copy')));
    const trustBodyRects = trustCards.map((el) => rectFor(el.querySelector('p')));
    const trustBadgeRects = trustCards.map((el) => rectFor(el.querySelector('.scr-trust-badge')));
    const dossierSection = document.querySelector('.scr-dossier-rail');
    const dossierHead = dossierSection?.querySelector('.scr-section-head');
    const dossierHeadDesc = dossierHead?.querySelector('p');
    const dossierHeadDescStyle = dossierHeadDesc ? getComputedStyle(dossierHeadDesc) : null;
    const dossierCards = [...document.querySelectorAll('.scr-dossier-rail .scr-evidence-card')];
    const dossierCardStyles = dossierCards.map((el) => getComputedStyle(el));
    const dossierCardBeforeStyles = dossierCards.map((el) => getComputedStyle(el, '::before'));
    const dossierCardRects = dossierCards.map(rectFor);
    const dossierMarkers = [...document.querySelectorAll('.scr-dossier-rail .scr-evidence-marker.scr-score-meter-box.scr-signal-block')];
    const dossierMarkerRects = dossierMarkers.map(rectFor);
    const dossierMarkerValues = dossierMarkers.map((el) => (el.querySelector('.scr-tile-value')?.textContent || '').trim());
    const dossierTitles = dossierCards.map((el) => (el.querySelector('.scr-evidence-title-row h3')?.textContent || '').trim());
    const dossierTitleStyles = dossierCards.map((el) => getComputedStyle(el.querySelector('.scr-evidence-title-row h3')));
    const dossierSpoilers = dossierCards.map((el) => (el.querySelector('.scr-spoiler')?.textContent || '').trim());
    const dossierCells = [...document.querySelectorAll('.scr-dossier-rail .scr-evidence-cell')];
    const dossierCellStyles = dossierCells.map((el) => getComputedStyle(el));
    const dossierCellLabelStyles = dossierCells.map((el) => getComputedStyle(el.querySelector('small')));
    const dossierCellBodyStyles = dossierCells.map((el) => getComputedStyle(el.querySelector('p')));
    const dossierCellLabels = dossierCells.map((el) => (el.querySelector('small')?.textContent || '').trim());
    const dossierImpactRows = [...document.querySelectorAll('.scr-dossier-rail .scr-evidence-impact')];
    const dossierImpactTags = [...document.querySelectorAll('.scr-dossier-rail .scr-evidence-impact b')];
    const dossierImpactStyles = dossierImpactTags.map((el) => getComputedStyle(el));
    const dossierProtocol = dossierSection?.querySelector('.scr-evidence-protocol');
    const dossierProtocolCards = [...document.querySelectorAll('.scr-dossier-rail .scr-evidence-protocol-card')];
    const dossierProtocolCardStyles = dossierProtocolCards.map((el) => getComputedStyle(el));
    const dossierProtocolLabels = dossierProtocolCards.map((el) => (el.querySelector('small')?.textContent || '').trim());
    const signalBlocks = {
      main: document.querySelectorAll('.scr-main-score-meter.scr-score-meter-box.scr-signal-block').length,
      score: document.querySelectorAll('.scr-score-strip .scr-score-meter-box.scr-signal-block').length,
      axis: document.querySelectorAll('.scr-d20-wrap.scr-score-meter-box.scr-signal-block').length,
      correctionMeters: modifierMeters.length,
      arc: document.querySelectorAll('.scr-evidence-marker.scr-score-meter-box.scr-signal-block').length,
      inspectMetrics: inspectMetrics.length,
      inspectMeters: inspectMeters.length,
      inspectPanels: document.querySelectorAll('.scr-inspect-panel').length,
      inspectHeroRows: document.querySelectorAll('.scr-hero-inspect-row').length,
      inspectInScorePanel: document.querySelectorAll('.scr-score-panel .scr-inspect-panel').length,
      inspectInCopy: document.querySelectorAll('.scr-hero-copy .scr-inspect-panel').length,
      inspectAfterHero: shellSections[0]?.classList.contains('scr-hero') && shellSections[1] === inspectSection,
      inspectMetricNames: inspectMetrics.map((el) => (el.querySelector('.scr-inspect-name')?.textContent || '').trim()).join('|'),
      inspectMeterValues: inspectMeters.map((el) => (el.querySelector('.scr-tile-value')?.textContent || '').trim()).join('|'),
      inspectMeterMinHeight: inspectMeterRects.reduce((min, rect) => Math.min(min, rect.height), Infinity),
      inspectMeterValueColors: inspectMeterValueStyles.map((style) => style.color).join('|'),
      inspectPlayers: inspectPlayers.length,
      inspectPlayerText: inspectPlayers.map((el) => (el.textContent || '').trim()).join('|'),
      inspectPlayerMaxLines: inspectPlayerLines.reduce((max, lines) => Math.max(max, lines), 0),
      inspectPlayerMinHeight: inspectPlayerRects.reduce((min, rect) => Math.min(min, rect.height), Infinity),
      inspectNameClipped: inspectNames.some((el) => el.scrollWidth > el.clientWidth + 1 || el.scrollHeight > el.clientHeight + 1),
      inspectMetricBorderWidth,
      inspectMetricBoxShadow: inspectMetricStyles.some((style) => style.boxShadow && style.boxShadow !== 'none'),
      inspectMetricMaxRight: inspectMetricRects.reduce((max, rect) => Math.max(max, rect.right), 0),
      scoreGrade: document.querySelectorAll('.scr-score-panel-grade').length,
      scoreHeader: document.querySelectorAll('.scr-score-panel-head').length,
      scoreFoot: document.querySelectorAll('.scr-score-panel-foot').length,
      mainScoreTitle: (document.querySelector('.scr-main-score-title')?.textContent || '').trim(),
      mainScoreTitleSize: mainScoreTitleStyle ? Number.parseFloat(mainScoreTitleStyle.fontSize) : 0,
      mainScoreTitleWeight: mainScoreTitleStyle ? Number.parseInt(mainScoreTitleStyle.fontWeight, 10) : 0,
      mainScoreRank: (mainScoreRank?.textContent || '').trim(),
      mainScoreRankSize: mainScoreRankStyle ? Number.parseFloat(mainScoreRankStyle.fontSize) : 0,
      mainScoreValueSize: mainScoreValueStyle ? Number.parseFloat(mainScoreValueStyle.fontSize) : 0,
      mainScoreKicker: document.querySelectorAll('.scr-main-score-meter .scr-signal-kicker').length,
      mainScoreNote: document.querySelectorAll('.scr-main-score-meter .scr-signal-note').length,
      meterScreens: document.querySelectorAll('.scr-score-meter-box.scr-signal-block .scr-meter-screen').length,
      identitySize: identityStyle ? Number.parseFloat(identityStyle.fontSize) : 0,
      identityRailWidth: identityRailStyle ? Number.parseFloat(identityRailStyle.width) : 0,
      identityLabel: identityLabelStyle ? String(identityLabelStyle.content || '').replaceAll('"', '') : ''
    };
    const siteLinks = document.querySelector('.site-links');
    const floatingSiteLinks = siteLinks ? getComputedStyle(siteLinks).position === 'fixed' && isVisible(siteLinks) : false;
    const scoreNavOverlap = scoreRect ? hudLinks.some((rect) => {
      const width = Math.max(0, Math.min(rect.right, scoreRect.right) - Math.max(rect.left, scoreRect.left));
      const height = Math.max(0, Math.min(rect.bottom, scoreRect.bottom) - Math.max(rect.top, scoreRect.top));
      return width * height > 4;
    }) : false;
    const minParagraphSize = Math.min(...[...document.querySelectorAll('p')]
      .filter(isVisible)
      .map((el) => Number.parseFloat(getComputedStyle(el).fontSize))
      .filter(Number.isFinite));
    return {
      finalUrl: location.href,
      title: document.title,
      buildId: document.querySelector('meta[name="build-id"]')?.content || null,
      h1: document.querySelector('h1')?.textContent.trim(),
      diagnostics: document.body.textContent.includes('15/15 checks passing'),
      horizontalOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
      hudLinkCount: hudLinks.length,
      smallInteractive,
      negativeTracking,
      floatingSiteLinks,
      scoreNavOverlap,
      scoreFullyVisible: scoreRect ? scoreRect.top >= 0 && scoreRect.bottom <= window.innerHeight : false,
      scoreStartsBeforeFold: scoreRect ? scoreRect.top < window.innerHeight * 0.86 : false,
      nextSectionHint: firstContentRect ? firstContentRect.top <= window.innerHeight - 16 : false,
      scoreRect,
      heroRect,
      firstContentRect,
      h1Rect,
      verdictStripRect,
      verdictStripText,
      textSignals: {
        count: textSignals.length,
        labels: textSignals.map((el) => (el.querySelector('small')?.textContent || '').trim()).join('|'),
        values: textSignals.map((el) => (el.querySelector('b')?.textContent || '').trim()).join('|'),
        minHeight: textSignalRects.reduce((min, rect) => Math.min(min, rect.height), Infinity),
        maxRight: textSignalRects.reduce((max, rect) => Math.max(max, rect.right), 0),
        hasBorder: textSignalStyles.every((style) => Number.parseFloat(style.borderTopWidth) >= 1),
        hasAccent: textSignals.some((el) => Boolean(el.querySelector('.scr-text-signal-accent'))),
        hasInnerFrame: textSignalAfterStyles.some((style) => style.content && style.content !== 'none' && Number.parseFloat(style.borderTopWidth) > 0),
        labelHasFrame: textSignalLabelStyles.some((style) => Number.parseFloat(style.borderTopWidth) > 0),
        labelMinSize: textSignalLabelStyles.reduce((min, style) => Math.min(min, Number.parseFloat(style.fontSize) || Infinity), Infinity),
        labelMinWeight: textSignalLabelStyles.reduce((min, style) => Math.min(min, Number.parseInt(style.fontWeight, 10) || Infinity), Infinity),
        labelMaxBorder: textSignalLabelStyles.reduce((max, style) => Math.max(max, Number.parseFloat(style.borderTopWidth) || 0, Number.parseFloat(style.borderRightWidth) || 0, Number.parseFloat(style.borderBottomWidth) || 0, Number.parseFloat(style.borderLeftWidth) || 0), 0),
        labelTopLeft: textSignalLabelRects.every((rect, index) => rect.top - textSignalRects[index].top <= 24 && rect.left - textSignalRects[index].left <= 24),
        mainCentered: textSignalMainRects.every((rect, index) => Math.abs((rect.left + rect.width / 2) - (textSignalRects[index].left + textSignalRects[index].width / 2)) <= 14 && Math.abs((rect.top + rect.height / 2) - (textSignalRects[index].top + textSignalRects[index].height / 2)) <= 18),
        hasFill: textSignals.some((el) => Boolean(el.querySelector('.scr-text-signal-fill'))),
        hasGradient: textSignalStyles.every((style) => style.backgroundImage.includes('gradient')),
        hasOpposingGradient: textSignalStyles.every((style) => style.backgroundImage.includes('315deg')),
        maxGlareOpacity: textSignalBeforeStyles.reduce((max, style) => Math.max(max, Number.parseFloat(style.opacity) || 0), 0)
      },
      fitSignals: {
        count: fitSignals.length,
        labels: fitSignals.map((el) => (el.querySelector('small')?.textContent || '').trim()).join('|'),
        values: fitSignals.map((el) => (el.querySelector('b')?.textContent || '').trim()).join('|'),
        copy: fitSignals.map((el) => (el.querySelector('.scr-text-signal-copy')?.textContent || '').trim()).join('|'),
        text: fitSignals.map((el) => (el.textContent || '').replace(/\s+/g, ' ').trim()).join('|'),
        minHeight: fitSignalRects.reduce((min, rect) => Math.min(min, rect.height), Infinity),
        maxRight: fitSignalRects.reduce((max, rect) => Math.max(max, rect.right), 0),
        hasBorder: fitSignalStyles.every((style) => Number.parseFloat(style.borderTopWidth) >= 1),
        hasAccent: fitSignals.some((el) => Boolean(el.querySelector('.scr-text-signal-accent'))),
        hasInnerFrame: fitSignalAfterStyles.some((style) => style.content && style.content !== 'none' && Number.parseFloat(style.borderTopWidth) > 0),
        labelHasFrame: fitSignalLabelStyles.some((style) => Number.parseFloat(style.borderTopWidth) > 0),
        labelMinSize: fitSignalLabelStyles.reduce((min, style) => Math.min(min, Number.parseFloat(style.fontSize) || Infinity), Infinity),
        labelMinWeight: fitSignalLabelStyles.reduce((min, style) => Math.min(min, Number.parseInt(style.fontWeight, 10) || Infinity), Infinity),
        labelMaxBorder: fitSignalLabelStyles.reduce((max, style) => Math.max(max, Number.parseFloat(style.borderTopWidth) || 0, Number.parseFloat(style.borderRightWidth) || 0, Number.parseFloat(style.borderBottomWidth) || 0, Number.parseFloat(style.borderLeftWidth) || 0), 0),
        labelTopLeft: fitSignalLabelRects.every((rect, index) => rect.top - fitSignalRects[index].top <= 24 && rect.left - fitSignalRects[index].left <= 24),
        mainCentered: fitSignalMainRects.every((rect, index) => Math.abs((rect.left + rect.width / 2) - (fitSignalRects[index].left + fitSignalRects[index].width / 2)) <= 14 && Math.abs((rect.top + rect.height / 2) - (fitSignalRects[index].top + fitSignalRects[index].height / 2)) <= 22),
        hasFill: fitSignals.some((el) => Boolean(el.querySelector('.scr-text-signal-fill'))),
        hasGradient: fitSignalStyles.every((style) => style.backgroundImage.includes('gradient')),
        hasOpposingGradient: fitSignalStyles.every((style) => style.backgroundImage.includes('315deg')),
        maxGlareOpacity: fitSignalBeforeStyles.reduce((max, style) => Math.max(max, Number.parseFloat(style.opacity) || 0), 0),
        staleCards: document.querySelectorAll('.scr-fit-card').length
      },
      audienceFit: {
        exists: Boolean(audienceSection),
        kicker: (audienceHead?.querySelector('small')?.textContent || '').trim(),
        title: (audienceHead?.querySelector('h2')?.textContent || '').replace(/\s+/g, ' ').trim(),
        desc: (audienceHeadDesc?.textContent || '').replace(/\s+/g, ' ').trim(),
        descSize: audienceHeadDescStyle ? Number.parseFloat(audienceHeadDescStyle.fontSize) : 0,
        descColor: audienceHeadDescStyle?.color || '',
        staleWho86: Boolean((audienceSection?.textContent || '').includes('Who the 86')),
        staleCoreThesis: Boolean((audienceSection?.textContent || '').includes('Core Thesis')),
        thesisLabel: (audienceThesis?.querySelector('small')?.textContent || '').trim(),
        thesisText: (audienceThesisText?.textContent || '').replace(/\s+/g, ' ').trim(),
        thesisTransform: audienceThesisTextStyle?.textTransform || '',
        thesisSize: audienceThesisTextStyle ? Number.parseFloat(audienceThesisTextStyle.fontSize) : 0,
        thesisLineHeight: audienceThesisTextStyle ? Number.parseFloat(audienceThesisTextStyle.lineHeight) : 0,
        thesisBorderLeft: audienceThesisStyle ? Number.parseFloat(audienceThesisStyle.borderLeftWidth) : 0,
        thesisHasGradient: audienceThesisStyle ? audienceThesisStyle.backgroundImage.includes('gradient') : false
      },
      scoreAnatomy: {
        exists: Boolean(scoreAnatomySection),
        kicker: (scoreAnatomyHead?.querySelector('small')?.textContent || '').trim(),
        title: (scoreAnatomyHead?.querySelector('h2')?.textContent || '').replace(/\s+/g, ' ').trim(),
        desc: (scoreAnatomyHeadDesc?.textContent || '').replace(/\s+/g, ' ').trim(),
        descSize: scoreAnatomyHeadDescStyle ? Number.parseFloat(scoreAnatomyHeadDescStyle.fontSize) : 0,
        descColor: scoreAnatomyHeadDescStyle?.color || '',
        alertedText: alertedLetters.map((el) => (el.textContent || '').trim()).join(''),
        alertedCount: alertedLetters.length,
        alertedColors: alertedLetterStyles.map((style) => style.color).join('|'),
        alertedUniqueColors: new Set(alertedLetterStyles.map((style) => style.color)).size,
        stripBorderMax: scoreStripBorderMax,
        stripBackgroundColor: scoreStripStyle?.backgroundColor || '',
        stripBackgroundImage: scoreStripStyle?.backgroundImage || '',
        stripGap: scoreStripStyle ? Number.parseFloat(scoreStripStyle.gap) : 0,
        tileCount: scoreTiles.length,
        tileBorderMax: scoreTileBorderMax,
        tileHasBoxShadow: scoreTileStyles.some((style) => style.boxShadow && style.boxShadow !== 'none'),
        tileBackgroundsTransparent: scoreTileStyles.every((style) => style.backgroundColor === 'rgba(0, 0, 0, 0)' || style.backgroundColor === 'transparent'),
        tileMaxRight: scoreTileRects.reduce((max, rect) => Math.max(max, rect.right), 0)
      },
      scoreCalculator: {
        exists: Boolean(scoreCalculator),
        title: (scoreCalcHead?.textContent || '').replace(/\s+/g, ' ').trim(),
        text: (scoreCalculator?.textContent || '').replace(/\s+/g, ' ').trim(),
        oldLcdNodes: document.querySelectorAll('.scr-score-calculator .scr-lcd, .scr-score-calculator .scr-lcd-bg, .scr-score-calculator .scr-lcd-top, .scr-score-calculator .scr-lcd-foot, .scr-score-calculator .scr-lcd-number, .scr-score-calculator .scr-lcd-operator').length,
        staleText: /(LCD equation|ALERTED SUM BUS|axis subtotal|ED deduction|final public score)/i.test(scoreCalculator?.textContent || ''),
        termCount: scoreCalcTerms.length,
        labels: scoreCalcLabels.map((el) => (el.textContent || '').trim()).join('|'),
        values: scoreCalcValues.map((el) => (el.textContent || '').trim()).join('|'),
        operators: [...document.querySelectorAll('.scr-score-calculator .scr-score-calc-op')].map((el) => (el.textContent || '').trim()).join('|'),
        labelMinSize: scoreCalcLabelStyles.reduce((min, style) => Math.min(min, Number.parseFloat(style.fontSize) || Infinity), Infinity),
        valueMinSize: scoreCalcValueStyles.reduce((min, style) => Math.min(min, Number.parseFloat(style.fontSize) || Infinity), Infinity),
        noteText: (scoreCalcNote?.textContent || '').replace(/\s+/g, ' ').trim(),
        noteSize: scoreCalcNoteStyle ? Number.parseFloat(scoreCalcNoteStyle.fontSize) : 0,
        clipPath: scoreCalculatorStyle?.clipPath || '',
        boxShadow: scoreCalculatorStyle?.boxShadow || '',
        beforeDisplay: scoreCalculatorBeforeStyle?.display || '',
        maxRight: Math.max(rectFor(scoreCalculator).right, scoreCalcTermRects.reduce((max, rect) => Math.max(max, rect.right), 0))
      },
      reviewerNote: {
        exists: Boolean(reviewerNote),
        kicker: (reviewerHead?.querySelector('small')?.textContent || '').trim(),
        title: (reviewerHead?.querySelector('h2')?.textContent || '').replace(/\s+/g, ' ').trim(),
        desc: (reviewerDesc?.textContent || '').replace(/\s+/g, ' ').trim(),
        descSize: reviewerDescStyle ? Number.parseFloat(reviewerDescStyle.fontSize) : 0,
        descColor: reviewerDescStyle?.color || '',
        keywordTitle: (keywordHead?.querySelector('h3')?.textContent || '').trim(),
        keywordDesc: (keywordHeadDesc?.textContent || '').replace(/\s+/g, ' ').trim(),
        keywordDescSize: keywordHeadDescStyle ? Number.parseFloat(keywordHeadDescStyle.fontSize) : 0,
        primaryText: (keywordPrimary?.textContent || '').replace(/\s+/g, ' ').trim(),
        primaryHasGradient: keywordPrimaryStyle ? keywordPrimaryStyle.backgroundImage.includes('gradient') : false,
        groupTitles: keywordGroups.map((el) => (el.querySelector('h4')?.textContent || '').trim()).join('|'),
        oldDecorNodes: keywordPanel?.querySelectorAll('.scr-keyword-glow, .scr-keyword-hero, .scr-keyword-group-title span').length || 0,
        staleCountText: /\b\d+\s+tags\b/i.test(keywordPanel?.textContent || ''),
        pillCount: keywordPills.length,
        positiveCount: keywordPositivePills.length,
        negativeCount: keywordNegativePills.length,
        pillText: keywordPills.map((el) => (el.textContent || '').trim()).join('|'),
        pillMinHeight: keywordPillRects.reduce((min, rect) => Math.min(min, rect.height), Infinity),
        pillMinFont: keywordPillStyles.reduce((min, style) => Math.min(min, Number.parseFloat(style.fontSize) || Infinity), Infinity),
        pillMinRadius: keywordPillStyles.reduce((min, style) => Math.min(min, Number.parseFloat(style.borderTopLeftRadius) || Infinity), Infinity),
        pillHasGradient: keywordPillStyles.every((style) => style.backgroundImage.includes('gradient')),
        pillHasLineThrough: keywordPillStyles.some((style) => style.textDecorationLine.includes('line-through')),
        maxRight: Math.max(keywordPanelRect?.right || 0, keywordPillRects.reduce((max, rect) => Math.max(max, rect.right), 0))
      },
      axisDiagnosis: {
        exists: Boolean(axisSection),
        kicker: (axisHead?.querySelector('small')?.textContent || '').trim(),
        title: (axisHead?.querySelector('h2')?.textContent || '').replace(/\s+/g, ' ').trim(),
        desc: (axisHeadDesc?.textContent || '').replace(/\s+/g, ' ').trim(),
        descSize: axisHeadDescStyle ? Number.parseFloat(axisHeadDescStyle.fontSize) : 0,
        descColor: axisHeadDescStyle?.color || '',
        rowCount: axisRows.length,
        labels: axisTitleLabels.join('|'),
        names: axisTitleNames.join('|'),
        grades: axisTitleGrades.join('|'),
        rowHasGradient: axisRowStyles.every((style) => style.backgroundImage.includes('gradient')),
        titleMinSize: axisTitleNameStyles.reduce((min, style) => Math.min(min, Number.parseFloat(style.fontSize) || Infinity), Infinity),
        bodyMinSize: axisBodyTextStyles.reduce((min, style) => Math.min(min, Number.parseFloat(style.fontSize) || Infinity), Infinity),
        bodyMinWeight: axisBodyTextStyles.reduce((min, style) => Math.min(min, Number.parseInt(style.fontWeight, 10) || Infinity), Infinity),
        segmentMinHeight: axisSegmentCellStyles.reduce((min, style) => Math.min(min, Number.parseFloat(style.height) || Infinity), Infinity),
        segmentMinRadius: axisSegmentCellStyles.reduce((min, style) => Math.min(min, Number.parseFloat(style.borderTopLeftRadius) || Infinity), Infinity),
        meterCount: axisMeters.length,
        meterValues: axisMeterValues.join('|'),
        meterKickers: document.querySelectorAll('.scr-axis-diagnosis .scr-d20-wrap .scr-signal-kicker').length,
        meterNotes: document.querySelectorAll('.scr-axis-diagnosis .scr-d20-wrap .scr-signal-note').length,
        meterText: axisMeters.map((el) => (el.textContent || '').replace(/\s+/g, ' ').trim()).join('|'),
        maxRight: Math.max(axisRowRects.reduce((max, rect) => Math.max(max, rect.right), 0), axisMeterRects.reduce((max, rect) => Math.max(max, rect.right), 0))
      },
      correctionLedger: {
        exists: Boolean(correctionSection),
        kicker: (correctionHead?.querySelector('small')?.textContent || '').trim(),
        title: (correctionHead?.querySelector('h2')?.textContent || '').replace(/\s+/g, ' ').trim(),
        desc: (correctionHeadDesc?.textContent || '').replace(/\s+/g, ' ').trim(),
        descSize: correctionHeadDescStyle ? Number.parseFloat(correctionHeadDescStyle.fontSize) : 0,
        descColor: correctionHeadDescStyle?.color || '',
        modifierCount: modifierCards.length,
        modifierNames: modifierNames.join('|'),
        modifierLabels: modifierLabels.join('|'),
        modifierValues: modifierMeterValues.join('|'),
        modifierChipText,
        modifierCardHasGradient: modifierCardStyles.every((style) => style.backgroundImage.includes('gradient')),
        modifierCardMinHeight: modifierCardRects.reduce((min, rect) => Math.min(min, rect.height), Infinity),
        modifierMeterCount: modifierMeters.length,
        modifierMeterMinHeight: modifierMeterRects.reduce((min, rect) => Math.min(min, rect.height), Infinity),
        ledgerHeadTitle: (ledgerHead?.querySelector('h3')?.textContent || '').trim(),
        ledgerHeadSummary: (ledgerHead?.querySelector('span')?.textContent || '').replace(/\s+/g, ' ').trim(),
        rowCount: ledgerRows.length,
        rowNames: ledgerNames.join('|'),
        rowLabels: ledgerLabels.join('|'),
        rowValues: ledgerValues.join('|'),
        rowHasGradient: ledgerRowStyles.every((style) => style.backgroundImage.includes('gradient')),
        rowValueMinSize: ledgerValueStyles.reduce((min, style) => Math.min(min, Number.parseFloat(style.fontSize) || Infinity), Infinity),
        checkLabel: (ledgerCheck?.querySelector('span')?.textContent || '').trim(),
        checkValue: (ledgerCheck?.querySelector('b')?.textContent || '').trim(),
        staleText: /(Row check|Danger Total|Parent total|Sub-component|MOD · 02)/i.test(correctionSection?.textContent || ''),
        oldNodes: correctionSection?.querySelectorAll('.scr-extra-panel-top, .scr-extra-main, .scr-extra-footer, .scr-ledger-parent, .scr-ledger-subrow').length || 0,
        maxRight: Math.max(
          modifierCardRects.reduce((max, rect) => Math.max(max, rect.right), 0),
          modifierMeterRects.reduce((max, rect) => Math.max(max, rect.right), 0),
          ledgerRowRects.reduce((max, rect) => Math.max(max, rect.right), 0)
        )
      },
      insightModule: {
        exists: Boolean(insightSection),
        kicker: (insightHead?.querySelector('small')?.textContent || '').trim(),
        title: (insightHead?.querySelector('h2')?.textContent || '').replace(/\s+/g, ' ').trim(),
        desc: (insightHeadDesc?.textContent || '').replace(/\s+/g, ' ').trim(),
        descSize: insightHeadDescStyle ? Number.parseFloat(insightHeadDescStyle.fontSize) : 0,
        descColor: insightHeadDescStyle?.color || '',
        boardExists: Boolean(insightBoard),
        oldGridCount: document.querySelectorAll('.scr-insight-grid').length,
        cardCount: insightCards.length,
        indices: insightIndices.join('|'),
        labels: insightLabels.join('|'),
        titles: insightTitles.join('|'),
        cardHasGradient: insightCardStyles.every((style) => style.backgroundImage.includes('gradient')),
        cardMinHeight: insightCardRects.reduce((min, rect) => Math.min(min, rect.height), Infinity),
        pseudoOrbHidden: insightCardBeforeStyles.every((style) => style.display === 'none'),
        badgeCount: insightBadgeRects.filter((rect) => rect.width > 0 && rect.height > 0).length,
        badgeHasGradient: insightBadgeStyles.every((style) => style.backgroundImage.includes('gradient') && style.borderTopWidth === '1px'),
        indexInTopRight: insightIndexRects.every((rect, index) => rect.top <= insightCardRects[index].top + 24 && insightCardRects[index].right - rect.right <= 24),
        indexSharesTitleHeader: insightIndexRects.every((rect, index) => Math.abs(rect.top - insightTitleRects[index].top) <= 4 && Math.abs(rect.top - insightHeadRects[index].top) <= 4),
        bodyUsesFullCardWidth: insightBodyRects.every((rect, index) => rect.right >= insightCardRects[index].right - 24),
        badgeAfterBody: insightBadgeRects.every((rect, index) => rect.top >= insightBodyRects[index].bottom - 1),
        badgeNearBottom: insightBadgeRects.every((rect, index) => insightCardRects[index].bottom - rect.bottom <= 24),
        titleMinSize: insightTitleStyles.reduce((min, style) => Math.min(min, Number.parseFloat(style.fontSize) || Infinity), Infinity),
        titleMaxHeight: insightTitleRects.reduce((max, rect) => Math.max(max, rect.height), 0),
        bodyMinSize: insightBodyStyles.reduce((min, style) => Math.min(min, Number.parseFloat(style.fontSize) || Infinity), Infinity),
        bodyMinWeight: insightBodyStyles.reduce((min, style) => Math.min(min, Number.parseInt(style.fontWeight, 10) || Infinity), Infinity),
        maxRight: insightCardRects.reduce((max, rect) => Math.max(max, rect.right), 0)
      },
      trustLayer: {
        exists: Boolean(trustSection),
        kicker: (trustHead?.querySelector('small')?.textContent || '').trim(),
        title: (trustHead?.querySelector('h2')?.textContent || '').replace(/\s+/g, ' ').trim(),
        desc: (trustHeadDesc?.textContent || '').replace(/\s+/g, ' ').trim(),
        descSize: trustHeadDescStyle ? Number.parseFloat(trustHeadDescStyle.fontSize) : 0,
        descColor: trustHeadDescStyle?.color || '',
        gridExists: Boolean(trustGrid),
        oldGridCount: document.querySelectorAll('.scr-audit-grid').length,
        oldCardCount: document.querySelectorAll('.scr-audit-card').length,
        cardCount: trustCards.length,
        labels: trustLabels.join('|'),
        titles: trustTitles.join('|'),
        cardHasGradient: trustCardStyles.every((style) => style.backgroundImage.includes('gradient')),
        cardMinHeight: trustCardRects.reduce((min, rect) => Math.min(min, rect.height), Infinity),
        topRailVisible: trustCardBeforeStyles.every((style) => style.display !== 'none' && Number.parseFloat(style.height) >= 2),
        badgeCount: trustBadgeRects.filter((rect) => rect.width > 0 && rect.height > 0).length,
        badgeHasGradient: trustBadgeStyles.every((style) => style.backgroundImage.includes('gradient') && style.borderTopWidth === '1px'),
        titleTopAligned: trustTitleRects.every((rect, index) => rect.top <= trustCardRects[index].top + 26),
        copyBetweenTitleAndBadge: trustCopyRects.every((rect, index) => rect.top >= trustTitleRects[index].bottom - 1 && rect.bottom <= trustBadgeRects[index].top + 1),
        bodyInsideCopy: trustBodyRects.every((rect, index) => rect.top >= trustCopyRects[index].top - 1 && rect.bottom <= trustCopyRects[index].bottom + 1),
        badgeAfterBody: trustBadgeRects.every((rect, index) => rect.top >= trustBodyRects[index].bottom - 1),
        badgeNearBottom: trustBadgeRects.every((rect, index) => trustCardRects[index].bottom - rect.bottom <= 24),
        titleMinSize: trustTitleStyles.reduce((min, style) => Math.min(min, Number.parseFloat(style.fontSize) || Infinity), Infinity),
        titleMaxHeight: trustTitleRects.reduce((max, rect) => Math.max(max, rect.height), 0),
        bodyMinSize: trustBodyStyles.reduce((min, style) => Math.min(min, Number.parseFloat(style.fontSize) || Infinity), Infinity),
        bodyMinWeight: trustBodyStyles.reduce((min, style) => Math.min(min, Number.parseInt(style.fontWeight, 10) || Infinity), Infinity),
        maxRight: trustCardRects.reduce((max, rect) => Math.max(max, rect.right), 0)
      },
      dossierRail: {
        exists: Boolean(dossierSection),
        kicker: (dossierHead?.querySelector('small')?.textContent || '').trim(),
        title: (dossierHead?.querySelector('h2')?.textContent || '').replace(/\s+/g, ' ').trim(),
        desc: (dossierHeadDesc?.textContent || '').replace(/\s+/g, ' ').trim(),
        descSize: dossierHeadDescStyle ? Number.parseFloat(dossierHeadDescStyle.fontSize) : 0,
        descColor: dossierHeadDescStyle?.color || '',
        cardCount: dossierCards.length,
        markerCount: dossierMarkers.length,
        markerValues: dossierMarkerValues.join('|'),
        markerMinHeight: dossierMarkerRects.reduce((min, rect) => Math.min(min, rect.height), Infinity),
        titles: dossierTitles.join('|'),
        spoilers: dossierSpoilers.join('|'),
        cardHasGradient: dossierCardStyles.every((style) => style.backgroundImage.includes('gradient')),
        railVisible: dossierCardBeforeStyles.every((style) => style.display !== 'none' && Number.parseFloat(style.width) >= 2),
        cellCount: dossierCells.length,
        cellLabels: dossierCellLabels.slice(0, 3).join('|'),
        everyCellLabelSet: dossierCards.every((card) => [...card.querySelectorAll('.scr-evidence-cell small')].map((el) => (el.textContent || '').trim()).join('|') === 'Observation|Proof|Caveat'),
        cellHasGradient: dossierCellStyles.every((style) => style.backgroundImage.includes('gradient')),
        cellLabelMinSize: dossierCellLabelStyles.reduce((min, style) => Math.min(min, Number.parseFloat(style.fontSize) || Infinity), Infinity),
        cellBodyMinSize: dossierCellBodyStyles.reduce((min, style) => Math.min(min, Number.parseFloat(style.fontSize) || Infinity), Infinity),
        cellBodyMinWeight: dossierCellBodyStyles.reduce((min, style) => Math.min(min, Number.parseInt(style.fontWeight, 10) || Infinity), Infinity),
        titleMinSize: dossierTitleStyles.reduce((min, style) => Math.min(min, Number.parseFloat(style.fontSize) || Infinity), Infinity),
        impactRowCount: dossierImpactRows.length,
        impactTagCount: dossierImpactTags.length,
        impactHasGradient: dossierImpactStyles.every((style) => style.backgroundImage.includes('gradient') && style.borderTopWidth === '1px'),
        protocolExists: Boolean(dossierProtocol),
        protocolCardCount: dossierProtocolCards.length,
        protocolLabels: dossierProtocolLabels.join('|'),
        protocolCardHasGradient: dossierProtocolCardStyles.every((style) => style.backgroundImage.includes('gradient')),
        staleRawText: /(▸ Axis impact|Clean observation|What it proves|Trust footer)/.test(dossierSection?.textContent || ''),
        maxRight: Math.max(
          dossierCardRects.reduce((max, rect) => Math.max(max, rect.right), 0),
          dossierMarkerRects.reduce((max, rect) => Math.max(max, rect.right), 0)
        )
      },
      metaChips: {
        count: metaChips.length,
        labels: metaChips.map((el) => (el.querySelector('small')?.textContent || '').trim()).join('|'),
        values: metaChips.map((el) => (el.querySelector('b')?.textContent || '').trim()).join('|'),
        labelOverlapWithSignals: metaChips
          .map((el) => (el.querySelector('small')?.textContent || '').trim())
          .filter((label) => textSignals.some((signal) => (signal.querySelector('small')?.textContent || '').trim() === label))
          .join('|'),
        minHeight: metaChipRects.reduce((min, rect) => Math.min(min, rect.height), Infinity),
        maxRight: metaChipRects.reduce((max, rect) => Math.max(max, rect.right), 0),
        maxLeftOverflow: metaChipRects.reduce((min, rect) => Math.min(min, rect.left), Infinity),
        hasCapsuleRadius: metaChipStyles.every((style) => Number.parseFloat(style.borderTopLeftRadius) >= 18),
        hasGlassGradient: metaChipStyles.every((style) => style.backgroundImage.includes('gradient')),
        hasToneBorder: metaChipStyles.every((style) => Number.parseFloat(style.borderTopWidth) >= 1),
        labelMinSize: metaChipLabelStyles.reduce((min, style) => Math.min(min, Number.parseFloat(style.fontSize) || Infinity), Infinity),
        labelMaxBorder: metaChipLabelStyles.reduce((max, style) => Math.max(max, Number.parseFloat(style.borderTopWidth) || 0, Number.parseFloat(style.borderRightWidth) || 0, Number.parseFloat(style.borderBottomWidth) || 0, Number.parseFloat(style.borderLeftWidth) || 0), 0),
        labelMaxRadius: metaChipLabelStyles.reduce((max, style) => Math.max(max, Number.parseFloat(style.borderTopLeftRadius) || 0, Number.parseFloat(style.borderTopRightRadius) || 0, Number.parseFloat(style.borderBottomRightRadius) || 0, Number.parseFloat(style.borderBottomLeftRadius) || 0), 0),
        labelHasAccentGradient: metaChipLabelStyles.every((style) => style.backgroundImage.includes('gradient')),
        valueHasNoFill: metaChipValueStyles.every((style) => !style.backgroundColor || style.backgroundColor === 'rgba(0, 0, 0, 0)' || style.backgroundColor === 'transparent')
      },
      inspectHeader: {
        kicker: (inspectHead?.querySelector('small')?.textContent || '').trim(),
        title: (inspectHead?.querySelector('h2')?.textContent || '').replace(/\s+/g, ' ').trim(),
        desc: (inspectHeadDesc?.textContent || '').replace(/\s+/g, ' ').trim(),
        descSize: inspectHeadDescStyle ? Number.parseFloat(inspectHeadDescStyle.fontSize) : 0,
        descColor: inspectHeadDescStyle?.color || ''
      },
      signalBlocks,
      minParagraphSize,
      screenshotPath: null
    };
  });
  metrics.screenshotPath = screenshotPath;
  runState.viewports.push({ viewport, metrics });
  await checkpoint(`viewport ${viewport.name} metrics`, { metrics });

  assert(metrics.finalUrl.includes(`${reportPath}?v=${buildId}`), `${viewport.name} did not land on versioned report`);
  assert(metrics.buildId === buildId, `${viewport.name} build id mismatch`);
  assert(metrics.diagnostics, `${viewport.name} missing 15/15 diagnostics`);
  assert(metrics.h1 === 'Metro 2033 Redux', `${viewport.name} unexpected h1 ${metrics.h1}`);
  assert(!metrics.horizontalOverflow, `${viewport.name} has horizontal overflow`);
  assert(metrics.hudLinkCount >= 3, `${viewport.name} expected visible HUD navigation links`);
  assert(metrics.smallInteractive.length === 0, `${viewport.name} has small tap targets ${JSON.stringify(metrics.smallInteractive)}`);
  assert(metrics.negativeTracking.length === 0, `${viewport.name} has negative tracking ${JSON.stringify(metrics.negativeTracking)}`);
  assert(!metrics.floatingSiteLinks, `${viewport.name} still has floating site links`);
  assert(!metrics.scoreNavOverlap, `${viewport.name} navigation overlaps score panel`);
  assert(!metrics.h1Rect || (metrics.h1Rect.left >= -1 && metrics.h1Rect.right <= viewport.width + 1), `${viewport.name} hero heading is clipped`);
  assert(!/(ActionBuy|youConfidence|100Main|pressureMain|agencyRisk|frictionReview)/.test(metrics.verdictStripText), `${viewport.name} verdict strip text is visually/semantically concatenated`);
  assert(metrics.textSignals.count === 6 && metrics.textSignals.labels === 'Action|Confidence|Main pull|Main drag|Risk|Review state' && metrics.textSignals.values.includes('Buy if atmosphere-first survival FPS fits you') && metrics.textSignals.values.includes('Max / replay-verified · 100/100') && metrics.textSignals.values.includes('Finalized / no active test'), `${viewport.name} hero text signal content mismatch ${JSON.stringify(metrics.textSignals)}`);
  assert(metrics.textSignals.minHeight >= 100 && metrics.textSignals.hasBorder && !metrics.textSignals.hasAccent && !metrics.textSignals.hasInnerFrame && !metrics.textSignals.labelHasFrame && metrics.textSignals.labelMinSize >= 13 && metrics.textSignals.labelMinWeight >= 900 && metrics.textSignals.labelMaxBorder === 0 && metrics.textSignals.labelTopLeft && metrics.textSignals.mainCentered && !metrics.textSignals.hasFill && metrics.textSignals.hasGradient && metrics.textSignals.hasOpposingGradient && metrics.textSignals.maxGlareOpacity <= 0.4 && metrics.textSignals.maxRight <= viewport.width + 1, `${viewport.name} hero text signal layout mismatch ${JSON.stringify(metrics.textSignals)}`);
  assert(metrics.fitSignals.count === 3 && metrics.fitSignals.labels === 'Buy if|Works if|Skip if' && metrics.fitSignals.values.includes('Atmosphere first survival FPS') && metrics.fitSignals.values.includes('Sandbox agency first') && metrics.fitSignals.copy.includes('authored pressure') && metrics.fitSignals.copy.includes('co-op'), `${viewport.name} audience fit signal content mismatch ${JSON.stringify(metrics.fitSignals)}`);
  assert(!/(FPSYou|playerYou|firstYou)/.test(metrics.fitSignals.text), `${viewport.name} audience fit signal text is semantically concatenated ${JSON.stringify(metrics.fitSignals)}`);
  assert(metrics.fitSignals.minHeight >= 180 && metrics.fitSignals.hasBorder && !metrics.fitSignals.hasAccent && !metrics.fitSignals.hasInnerFrame && !metrics.fitSignals.labelHasFrame && metrics.fitSignals.labelMinSize >= 13 && metrics.fitSignals.labelMinWeight >= 900 && metrics.fitSignals.labelMaxBorder === 0 && metrics.fitSignals.labelTopLeft && metrics.fitSignals.mainCentered && !metrics.fitSignals.hasFill && metrics.fitSignals.hasGradient && metrics.fitSignals.hasOpposingGradient && metrics.fitSignals.maxGlareOpacity <= 0.4 && metrics.fitSignals.staleCards === 0 && metrics.fitSignals.maxRight <= viewport.width + 1, `${viewport.name} audience fit signal layout mismatch ${JSON.stringify(metrics.fitSignals)}`);
  assert(metrics.audienceFit.exists && metrics.audienceFit.kicker === '02 · Audience Fit' && metrics.audienceFit.title === 'Who Is This 86 For?' && metrics.audienceFit.desc.includes('fit filter') && metrics.audienceFit.descSize >= 15.5 && metrics.audienceFit.descColor !== 'rgb(133, 146, 165)' && !metrics.audienceFit.staleWho86, `${viewport.name} audience fit heading/copy mismatch ${JSON.stringify(metrics.audienceFit)}`);
  assert(metrics.audienceFit.thesisLabel === 'Verdict Thesis' && metrics.audienceFit.thesisText.includes('atmosphere-first players') && metrics.audienceFit.thesisText.includes('not a sandbox or co-op promise') && !metrics.audienceFit.staleCoreThesis && metrics.audienceFit.thesisTransform === 'none' && metrics.audienceFit.thesisSize >= 15 && metrics.audienceFit.thesisLineHeight >= 22 && metrics.audienceFit.thesisBorderLeft === 0 && metrics.audienceFit.thesisHasGradient, `${viewport.name} audience fit thesis mismatch ${JSON.stringify(metrics.audienceFit)}`);
  assert(metrics.scoreAnatomy.exists && metrics.scoreAnatomy.kicker === '03 · Score Anatomy' && metrics.scoreAnatomy.title === 'ALERTED Score Strip' && metrics.scoreAnatomy.desc.includes('Five main axes') && metrics.scoreAnatomy.descSize >= 15.5 && metrics.scoreAnatomy.descColor !== 'rgb(133, 146, 165)', `${viewport.name} score anatomy heading/copy mismatch ${JSON.stringify(metrics.scoreAnatomy)}`);
  assert(metrics.scoreAnatomy.alertedText === 'ALERTED' && metrics.scoreAnatomy.alertedCount === 7 && metrics.scoreAnatomy.alertedUniqueColors >= 6 && /rgb\(124,\s*109,\s*255\)/.test(metrics.scoreAnatomy.alertedColors) && /rgb\(255,\s*176,\s*0\)/.test(metrics.scoreAnatomy.alertedColors) && /rgb\(255,\s*45,\s*31\)/.test(metrics.scoreAnatomy.alertedColors), `${viewport.name} ALERTED wordmark color mismatch ${JSON.stringify(metrics.scoreAnatomy)}`);
  assert(metrics.scoreAnatomy.tileCount === 7 && metrics.scoreAnatomy.stripBorderMax === 0 && metrics.scoreAnatomy.stripBackgroundColor === 'rgba(0, 0, 0, 0)' && metrics.scoreAnatomy.stripBackgroundImage === 'none' && metrics.scoreAnatomy.stripGap >= 10 && metrics.scoreAnatomy.tileBorderMax === 0 && !metrics.scoreAnatomy.tileHasBoxShadow && metrics.scoreAnatomy.tileBackgroundsTransparent && metrics.scoreAnatomy.tileMaxRight <= viewport.width + 1, `${viewport.name} score strip still has secondary wrapper/card chrome ${JSON.stringify(metrics.scoreAnatomy)}`);
  assert(metrics.scoreCalculator.exists && metrics.scoreCalculator.title === 'Score Calculator' && metrics.scoreCalculator.termCount === 3 && metrics.scoreCalculator.labels === 'Axes|Fit / Risk|Final Score' && metrics.scoreCalculator.values === '90|4|86' && metrics.scoreCalculator.operators === '−|=' && metrics.scoreCalculator.noteText.includes('five core axes') && metrics.scoreCalculator.noteText.includes('public score is 86'), `${viewport.name} simplified score calculator content mismatch ${JSON.stringify(metrics.scoreCalculator)}`);
  assert(metrics.scoreCalculator.oldLcdNodes === 0 && !metrics.scoreCalculator.staleText && metrics.scoreCalculator.labelMinSize >= 11 && metrics.scoreCalculator.valueMinSize >= 54 && metrics.scoreCalculator.noteSize >= 14 && metrics.scoreCalculator.clipPath === 'none' && metrics.scoreCalculator.boxShadow === 'none' && metrics.scoreCalculator.beforeDisplay === 'none' && metrics.scoreCalculator.maxRight <= viewport.width + 1, `${viewport.name} score calculator still has LCD/decor clutter or overflow ${JSON.stringify(metrics.scoreCalculator)}`);
  assert(metrics.reviewerNote.exists && metrics.reviewerNote.kicker === '04 · Reviewer Note' && metrics.reviewerNote.title === 'Short Human Verdict' && metrics.reviewerNote.desc.includes('beyond the math') && metrics.reviewerNote.descSize >= 15.5 && metrics.reviewerNote.descColor !== 'rgb(133, 146, 165)', `${viewport.name} reviewer note heading/copy mismatch ${JSON.stringify(metrics.reviewerNote)}`);
  assert(metrics.reviewerNote.keywordTitle === 'Fit Tags' && metrics.reviewerNote.keywordDesc.includes('score is not promising') && metrics.reviewerNote.keywordDescSize >= 14.5 && metrics.reviewerNote.primaryText === 'Primary Fit Atmospheric Survival FPS' && metrics.reviewerNote.primaryHasGradient && metrics.reviewerNote.groupTitles === 'Matches|Not the pitch', `${viewport.name} reviewer keyword panel content mismatch ${JSON.stringify(metrics.reviewerNote)}`);
  assert(metrics.reviewerNote.oldDecorNodes === 0 && !metrics.reviewerNote.staleCountText && metrics.reviewerNote.pillCount === 16 && metrics.reviewerNote.positiveCount === 8 && metrics.reviewerNote.negativeCount === 8 && !/[✓×]/.test(metrics.reviewerNote.pillText) && metrics.reviewerNote.pillText.includes('Story rich') && metrics.reviewerNote.pillText.includes('Open world RPG'), `${viewport.name} reviewer keyword capsule content mismatch ${JSON.stringify(metrics.reviewerNote)}`);
  assert(metrics.reviewerNote.pillMinHeight >= 30 && metrics.reviewerNote.pillMinFont >= 12 && metrics.reviewerNote.pillMinRadius >= 16 && metrics.reviewerNote.pillHasGradient && !metrics.reviewerNote.pillHasLineThrough && metrics.reviewerNote.maxRight <= viewport.width + 1, `${viewport.name} reviewer keyword capsules are too small/old-style/overflowing ${JSON.stringify(metrics.reviewerNote)}`);
  assert(metrics.axisDiagnosis.exists && metrics.axisDiagnosis.kicker === '05 · Tier 1' && metrics.axisDiagnosis.title === 'ALERT Axis Diagnosis' && metrics.axisDiagnosis.desc.includes('readable proof') && metrics.axisDiagnosis.descSize >= 15.5 && metrics.axisDiagnosis.descColor !== 'rgb(133, 146, 165)', `${viewport.name} axis diagnosis heading/copy mismatch ${JSON.stringify(metrics.axisDiagnosis)}`);
  assert(metrics.axisDiagnosis.rowCount === 5 && metrics.axisDiagnosis.labels === 'A · World pressure|L · Play engine|E · Forward pull|R · Fair clarity|T · Product state' && metrics.axisDiagnosis.names === 'Atmosphere|Loop|Engagement|Readability|Technical' && metrics.axisDiagnosis.grades === 'Phenomenal|Excellent|Excellent|Excellent|Excellent+', `${viewport.name} axis diagnosis row content mismatch ${JSON.stringify(metrics.axisDiagnosis)}`);
  assert(metrics.axisDiagnosis.rowHasGradient && metrics.axisDiagnosis.titleMinSize >= 26 && metrics.axisDiagnosis.bodyMinSize >= 14.5 && metrics.axisDiagnosis.bodyMinWeight >= 600 && metrics.axisDiagnosis.segmentMinHeight >= 8 && metrics.axisDiagnosis.segmentMinRadius >= 4, `${viewport.name} axis diagnosis row polish mismatch ${JSON.stringify(metrics.axisDiagnosis)}`);
  assert(metrics.axisDiagnosis.meterCount === 5 && metrics.axisDiagnosis.meterValues === '20|17|17|17|19' && metrics.axisDiagnosis.meterKickers === 0 && metrics.axisDiagnosis.meterNotes === 0 && !/(Axis|\/20)/i.test(metrics.axisDiagnosis.meterText) && metrics.axisDiagnosis.maxRight <= viewport.width + 1, `${viewport.name} axis diagnosis meter clutter/overflow mismatch ${JSON.stringify(metrics.axisDiagnosis)}`);
  assert(metrics.correctionLedger.exists && metrics.correctionLedger.kicker === '06 · Score Correction' && metrics.correctionLedger.title === 'Modifier Ledger' && metrics.correctionLedger.desc.includes('90-axis score becomes 86') && metrics.correctionLedger.descSize >= 15.5 && metrics.correctionLedger.descColor !== 'rgb(133, 146, 165)', `${viewport.name} correction ledger heading/copy mismatch ${JSON.stringify(metrics.correctionLedger)}`);
  assert(metrics.correctionLedger.modifierCount === 2 && metrics.correctionLedger.modifierNames === 'Extra|Danger' && metrics.correctionLedger.modifierLabels === 'Limited Agency|Residual Friction' && metrics.correctionLedger.modifierValues === '-3|-1' && metrics.correctionLedger.modifierChipText.includes('Audience fit ceiling') && metrics.correctionLedger.modifierChipText.includes('Traceable rows'), `${viewport.name} correction modifier card content mismatch ${JSON.stringify(metrics.correctionLedger)}`);
  assert(metrics.correctionLedger.modifierCardHasGradient && metrics.correctionLedger.modifierCardMinHeight >= 132 && metrics.correctionLedger.modifierMeterCount === 2 && metrics.correctionLedger.modifierMeterMinHeight >= 128, `${viewport.name} correction modifier card layout mismatch ${JSON.stringify(metrics.correctionLedger)}`);
  assert(metrics.correctionLedger.ledgerHeadTitle === 'Residual Pool' && metrics.correctionLedger.ledgerHeadSummary === '4 rows sum to -1' && metrics.correctionLedger.rowCount === 4 && metrics.correctionLedger.rowNames === 'Librarian Pathing Ambiguity|Demon Grab / Drop Weirdness|Retrofitted Stealth Affordances|Point-Blank Hit Evasion' && metrics.correctionLedger.rowValues === '-0.25|-0.25|-0.25|-0.25', `${viewport.name} correction friction ledger content mismatch ${JSON.stringify(metrics.correctionLedger)}`);
  assert(metrics.correctionLedger.rowLabels.includes('Behavior-rule inconsistency') && metrics.correctionLedger.rowHasGradient && metrics.correctionLedger.rowValueMinSize >= 20 && metrics.correctionLedger.checkLabel === 'Ledger balanced' && metrics.correctionLedger.checkValue === 'Residual subtotal -1' && !metrics.correctionLedger.staleText && metrics.correctionLedger.oldNodes === 0 && metrics.correctionLedger.maxRight <= viewport.width + 1, `${viewport.name} correction friction ledger polish/overflow mismatch ${JSON.stringify(metrics.correctionLedger)}`);
  assert(metrics.insightModule.exists && metrics.insightModule.kicker === '07 · Interpretive Lens' && metrics.insightModule.title === 'Light / Exposure / Judgment' && metrics.insightModule.desc.includes('darkness holds possibility') && metrics.insightModule.descSize >= 15.5 && metrics.insightModule.descColor !== 'rgb(133, 146, 165)', `${viewport.name} insight module heading/copy mismatch ${JSON.stringify(metrics.insightModule)}`);
  assert(metrics.insightModule.boardExists && metrics.insightModule.oldGridCount === 0 && metrics.insightModule.cardCount === 4 && metrics.insightModule.indices === '01|02|03|04' && metrics.insightModule.labels === 'Spoiler-light thesis|Spoiler-light thesis|Spoiler-light thesis|Spoiler-light thesis', `${viewport.name} insight module structure mismatch ${JSON.stringify(metrics.insightModule)}`);
  assert(metrics.insightModule.titles === 'Darkness as Possibility|Light as Exposure|Sight Is Not Understanding|The Final Climb' && metrics.insightModule.cardHasGradient && metrics.insightModule.cardMinHeight >= 150 && metrics.insightModule.pseudoOrbHidden && metrics.insightModule.badgeCount === 4 && metrics.insightModule.badgeHasGradient && metrics.insightModule.indexInTopRight && metrics.insightModule.indexSharesTitleHeader && metrics.insightModule.bodyUsesFullCardWidth && metrics.insightModule.badgeAfterBody && metrics.insightModule.badgeNearBottom && metrics.insightModule.titleMinSize >= 24 && metrics.insightModule.titleMaxHeight <= 62 && metrics.insightModule.bodyMinSize >= 14.3 && metrics.insightModule.bodyMinWeight >= 600 && metrics.insightModule.maxRight <= viewport.width + 1, `${viewport.name} insight module card polish/overflow mismatch ${JSON.stringify(metrics.insightModule)}`);
  assert(metrics.trustLayer.exists && metrics.trustLayer.kicker === '08 · Adversarial Audit' && metrics.trustLayer.title === 'Trust Layer' && metrics.trustLayer.desc.includes('stress tests') && metrics.trustLayer.descSize >= 15.5 && metrics.trustLayer.descColor !== 'rgb(133, 146, 165)', `${viewport.name} trust layer heading/copy mismatch ${JSON.stringify(metrics.trustLayer)}`);
  assert(metrics.trustLayer.gridExists && metrics.trustLayer.oldGridCount === 0 && metrics.trustLayer.oldCardCount === 0 && metrics.trustLayer.cardCount === 8 && metrics.trustLayer.labels === 'Lens Honesty|Comfort Bias|Friction Blindness|Audience Confusion|Sampling Bias|Falsifier|Spectacle Bias|Patch Volatility', `${viewport.name} trust layer structure mismatch ${JSON.stringify(metrics.trustLayer)}`);
  assert(metrics.trustLayer.titles === 'Actual use-case is named|Atmosphere does not erase friction|Problems stay itemized|Fit is separated from quality|Full-route evidence base|What would move the score|Mood is not treated as enough|Stable old build, low volatility', `${viewport.name} trust layer title content mismatch ${JSON.stringify(metrics.trustLayer)}`);
  assert(metrics.trustLayer.cardHasGradient && metrics.trustLayer.cardMinHeight >= 150 && metrics.trustLayer.topRailVisible && metrics.trustLayer.badgeCount === 8 && metrics.trustLayer.badgeHasGradient && metrics.trustLayer.titleTopAligned && metrics.trustLayer.copyBetweenTitleAndBadge && metrics.trustLayer.bodyInsideCopy && metrics.trustLayer.badgeAfterBody && metrics.trustLayer.badgeNearBottom && metrics.trustLayer.titleMinSize >= 18 && metrics.trustLayer.titleMaxHeight <= 62 && metrics.trustLayer.bodyMinSize >= 14 && metrics.trustLayer.bodyMinWeight >= 600 && metrics.trustLayer.maxRight <= viewport.width + 1, `${viewport.name} trust layer card polish/overflow mismatch ${JSON.stringify(metrics.trustLayer)}`);
  assert(metrics.dossierRail.exists && metrics.dossierRail.kicker === '09 · Evidence Board' && metrics.dossierRail.title === 'Dossier Arc Rail' && metrics.dossierRail.desc.includes('Reconstructed playthrough archive') && metrics.dossierRail.descSize >= 15.5 && metrics.dossierRail.descColor !== 'rgb(133, 146, 165)', `${viewport.name} dossier rail heading/copy mismatch ${JSON.stringify(metrics.dossierRail)}`);
  assert(metrics.dossierRail.cardCount === 9 && metrics.dossierRail.markerCount === 9 && metrics.dossierRail.markerValues === '01|02|03|04|05|06|07|08|09', `${viewport.name} dossier rail card/marker count mismatch ${JSON.stringify(metrics.dossierRail)}`);
  assert(metrics.dossierRail.titles === 'Exhibition → Riga → Bourbon Deal|Bourbon / Lost Tunnels / Bridge|Market → Dead City → Khan|Khan’s Rules → Cursed Station|Armory → Frontline|Depot → Defense → Outpost → Black Station|Polis → Library → Archives|Sparta → D6|Tower → Ending Reconstruction', `${viewport.name} dossier rail title order mismatch ${JSON.stringify(metrics.dossierRail)}`);
  assert(metrics.dossierRail.spoilers === 'Spoiler-light|Spoiler-light|Spoiler-light|Spoiler-light|Spoiler-light|Spoiler-light|Spoiler-medium|Spoiler-medium|Spoiler-heavy' && metrics.dossierRail.cellCount === 27 && metrics.dossierRail.cellLabels === 'Observation|Proof|Caveat' && metrics.dossierRail.everyCellLabelSet, `${viewport.name} dossier rail labels/spoilers mismatch ${JSON.stringify(metrics.dossierRail)}`);
  assert(metrics.dossierRail.cardHasGradient && metrics.dossierRail.railVisible && metrics.dossierRail.markerMinHeight >= 80 && metrics.dossierRail.cellHasGradient && metrics.dossierRail.cellLabelMinSize >= 10 && metrics.dossierRail.cellBodyMinSize >= 13.5 && metrics.dossierRail.cellBodyMinWeight >= 600 && metrics.dossierRail.titleMinSize >= 17.5 && metrics.dossierRail.impactRowCount === 9 && metrics.dossierRail.impactTagCount === 27 && metrics.dossierRail.impactHasGradient && metrics.dossierRail.protocolExists && metrics.dossierRail.protocolCardCount === 4 && metrics.dossierRail.protocolLabels === 'Evidence|Snapshot note|Known caveat|Falsifier' && metrics.dossierRail.protocolCardHasGradient && !metrics.dossierRail.staleRawText && metrics.dossierRail.maxRight <= viewport.width + 1, `${viewport.name} dossier rail polish/overflow mismatch ${JSON.stringify(metrics.dossierRail)}`);
  assert(metrics.metaChips.count === 4 && metrics.metaChips.labels === 'Status|Evidence|Spoilers|Ending caveat' && metrics.metaChips.values === 'Complete|Full run / veteran memory|Layered policy|Ending reconstructed' && metrics.metaChips.labelOverlapWithSignals === '', `${viewport.name} meta chip content/redundancy mismatch ${JSON.stringify(metrics.metaChips)}`);
  assert(metrics.metaChips.minHeight >= 38 && metrics.metaChips.hasCapsuleRadius && metrics.metaChips.hasGlassGradient && metrics.metaChips.hasToneBorder && metrics.metaChips.labelMinSize >= 10 && metrics.metaChips.labelMaxBorder === 0 && metrics.metaChips.labelMaxRadius === 0 && metrics.metaChips.labelHasAccentGradient && metrics.metaChips.valueHasNoFill && metrics.metaChips.maxLeftOverflow >= -1 && metrics.metaChips.maxRight <= viewport.width + 1, `${viewport.name} meta chip layout mismatch ${JSON.stringify(metrics.metaChips)}`);
  assert(metrics.inspectHeader.kicker === '01 · Player Fit Check' && metrics.inspectHeader.title === 'Is This Game For You?' && metrics.inspectHeader.desc.includes('player-match read') && metrics.inspectHeader.descSize >= 16.5 && metrics.inspectHeader.descColor !== 'rgb(133, 146, 165)', `${viewport.name} INSPECT header copy/style mismatch ${JSON.stringify(metrics.inspectHeader)}`);
  assert(metrics.signalBlocks.main === 1 && metrics.signalBlocks.score === 7 && metrics.signalBlocks.axis === 5 && metrics.signalBlocks.correctionMeters === 2 && metrics.signalBlocks.arc === 9 && metrics.signalBlocks.inspectMetrics === 7 && metrics.signalBlocks.inspectMeters === 7 && metrics.signalBlocks.inspectPlayers === 7 && metrics.signalBlocks.inspectPanels === 0 && metrics.signalBlocks.inspectHeroRows === 0 && metrics.signalBlocks.inspectInScorePanel === 0 && metrics.signalBlocks.inspectInCopy === 0 && metrics.signalBlocks.inspectAfterHero && metrics.signalBlocks.scoreGrade === 0 && metrics.signalBlocks.scoreHeader === 0 && metrics.signalBlocks.scoreFoot === 0 && metrics.signalBlocks.mainScoreTitle === 'Final Score' && metrics.signalBlocks.mainScoreRank === 'A' && metrics.signalBlocks.mainScoreKicker === 0 && metrics.signalBlocks.mainScoreNote === 0 && metrics.signalBlocks.meterScreens === 31, `${viewport.name} score-screen signal block coverage mismatch ${JSON.stringify(metrics.signalBlocks)}`);
  assert(metrics.signalBlocks.inspectMetricNames === 'Immersion|Narrative|Systems|Performance|Exploration|Comfort|Teamplay', `${viewport.name} INSPECT metric order mismatch ${JSON.stringify(metrics.signalBlocks)}`);
  const expectedInspectMeterHeight = viewport.width < 760 ? 124 : viewport.width < 1120 ? 144 : 154;
  const inspectValueColors = metrics.signalBlocks.inspectMeterValueColors.split('|');
  assert(metrics.signalBlocks.inspectMeterValues === '10|8|2|5|6|4|1' && metrics.signalBlocks.inspectMeterMinHeight >= expectedInspectMeterHeight, `${viewport.name} INSPECT meter lanes too cramped/missing ${JSON.stringify(metrics.signalBlocks)}`);
  assert(/rgb\(255,\s*(45|106),\s*(31|90)\)/.test(inspectValueColors[6] || ''), `${viewport.name} Teamplay INSPECT value is not danger-red ${JSON.stringify(metrics.signalBlocks)}`);
  assert(metrics.signalBlocks.inspectPlayerText === 'Wants to feel inside a hostile place.|Likes dialogue, scenes, and authored stakes.|Needs builds, loot depth, or sandbox knobs.|Chases crisp combat mastery and clean input.|Checks corners, side paths, and hidden supplies.|Wants smooth pacing and low old-FPS friction.|Looks for co-op, PvP, or shared-session play.', `${viewport.name} INSPECT player type copy mismatch ${JSON.stringify(metrics.signalBlocks)}`);
  assert(!metrics.signalBlocks.inspectNameClipped && metrics.signalBlocks.inspectPlayerMaxLines <= 4.25 && metrics.signalBlocks.inspectPlayerMinHeight >= 44, `${viewport.name} INSPECT labels/player copy are clipped or over-compressed ${JSON.stringify(metrics.signalBlocks)}`);
  assert(metrics.signalBlocks.inspectMetricBorderWidth === 0 && !metrics.signalBlocks.inspectMetricBoxShadow, `${viewport.name} INSPECT metrics still look like cards ${JSON.stringify(metrics.signalBlocks)}`);
  assert(metrics.signalBlocks.inspectMetricMaxRight <= viewport.width + 1, `${viewport.name} INSPECT metrics overflow viewport ${JSON.stringify(metrics.signalBlocks)}`);
  assert(metrics.signalBlocks.mainScoreTitleSize >= 13 && metrics.signalBlocks.mainScoreTitleWeight >= 900, `${viewport.name} main score title is too small/light ${JSON.stringify(metrics.signalBlocks)}`);
  assert(metrics.signalBlocks.mainScoreRankSize >= metrics.signalBlocks.mainScoreValueSize * 0.82, `${viewport.name} main score rank is too small next to the value ${JSON.stringify(metrics.signalBlocks)}`);
  assert(metrics.signalBlocks.identitySize >= 15.5 && metrics.signalBlocks.identityRailWidth >= 3, `${viewport.name} identity quote rail/text sizing mismatch ${JSON.stringify(metrics.signalBlocks)}`);
  assert(metrics.scoreStartsBeforeFold, `${viewport.name} score panel starts too late in the first viewport`);
  assert(viewport.width < 1120 || metrics.scoreFullyVisible, `${viewport.name} score panel is not fully framed in first viewport`);
  assert(viewport.width < 1120 || metrics.nextSectionHint, `${viewport.name} does not show the next section cue in the first viewport`);
  assert(metrics.minParagraphSize >= 13, `${viewport.name} paragraph text too small: ${metrics.minParagraphSize}`);
  assert(consoleErrors.length === 0, `${viewport.name} console errors: ${consoleErrors.join(' | ')}`);
  assert(failedRequests.length === 0, `${viewport.name} failed requests: ${failedRequests.join(' | ')}`);

  await context.close();
}

async function main() {
  await checkpoint('start');
  let serverHandle;
  let base = liveBase;
  if (mode === 'local') {
    serverHandle = await startServer();
    base = serverHandle.base;
    await checkpoint(`local server ${base}`);
  }

  try {
    const buildId = await auditDesignArtifacts(base);
    const browser = await launchBrowser();
    try {
      const viewports = [
        { name: 'mobile-360', width: 360, height: 740 },
        { name: 'mobile-390', width: 390, height: 844 },
        { name: 'tablet-768', width: 768, height: 1024 },
        { name: 'desktop-1280', width: 1280, height: 720 },
        { name: 'desktop-1920', width: 1920, height: 1080 }
      ];
      for (const viewport of viewports) {
        await auditViewport(browser, base, buildId, viewport);
      }
    } finally {
      await browser.close();
    }
    await checkpoint('all design checks passed');
  } finally {
    if (serverHandle) {
      await new Promise((resolve) => serverHandle.server.close(resolve));
      await checkpoint('local server stopped');
    }
  }
}

main().catch(async (error) => {
  await checkpoint(`failed: ${error.message}`);
  console.error(`[qa:pages:design:${mode}] failed: ${error.stack || error.message}`);
  process.exit(1);
});
