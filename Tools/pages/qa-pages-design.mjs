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

  const response = await page.goto(`${url(base)}?design=${viewport.name}`, { waitUntil: 'load', timeout: 30000 });
  await page.waitForTimeout(1200);
  assert(response?.status() === 200, `${viewport.name} root returned ${response?.status()}`);

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
    const textSignalLabelStyles = textSignals.map((el) => getComputedStyle(el.querySelector('small')));
    const fitSignals = [...document.querySelectorAll('.scr-fit-grid .scr-fit-signal')];
    const fitSignalRects = fitSignals.map(rectFor);
    const fitSignalStyles = fitSignals.map((el) => getComputedStyle(el));
    const fitSignalBeforeStyles = fitSignals.map((el) => getComputedStyle(el, '::before'));
    const fitSignalAfterStyles = fitSignals.map((el) => getComputedStyle(el, '::after'));
    const fitSignalLabelStyles = fitSignals.map((el) => getComputedStyle(el.querySelector('small')));
    const metaChips = [...document.querySelectorAll('.scr-meta-rail .scr-meta-chip')];
    const metaChipRects = metaChips.map(rectFor);
    const metaChipStyles = metaChips.map((el) => getComputedStyle(el));
    const metaChipLabelStyles = metaChips.map((el) => getComputedStyle(el.querySelector('small')));
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
    const signalBlocks = {
      main: document.querySelectorAll('.scr-main-score-meter.scr-score-meter-box.scr-signal-block').length,
      score: document.querySelectorAll('.scr-score-strip .scr-score-meter-box.scr-signal-block').length,
      axis: document.querySelectorAll('.scr-d20-wrap.scr-score-meter-box.scr-signal-block').length,
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
        labelHasBottomRule: textSignalLabelStyles.every((style) => Number.parseFloat(style.borderBottomWidth) >= 1),
        hasFill: textSignals.some((el) => Boolean(el.querySelector('.scr-text-signal-fill'))),
        hasGradient: textSignalStyles.every((style) => style.backgroundImage.includes('gradient')),
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
        labelHasBottomRule: fitSignalLabelStyles.every((style) => Number.parseFloat(style.borderBottomWidth) >= 1),
        hasFill: fitSignals.some((el) => Boolean(el.querySelector('.scr-text-signal-fill'))),
        hasGradient: fitSignalStyles.every((style) => style.backgroundImage.includes('gradient')),
        maxGlareOpacity: fitSignalBeforeStyles.reduce((max, style) => Math.max(max, Number.parseFloat(style.opacity) || 0), 0),
        staleCards: document.querySelectorAll('.scr-fit-card').length
      },
      metaChips: {
        count: metaChips.length,
        labels: metaChips.map((el) => (el.querySelector('small')?.textContent || '').trim()).join('|'),
        values: metaChips.map((el) => (el.querySelector('b')?.textContent || '').trim()).join('|'),
        minHeight: metaChipRects.reduce((min, rect) => Math.min(min, rect.height), Infinity),
        maxRight: metaChipRects.reduce((max, rect) => Math.max(max, rect.right), 0),
        maxLeftOverflow: metaChipRects.reduce((min, rect) => Math.min(min, rect.left), Infinity),
        hasCapsuleRadius: metaChipStyles.every((style) => Number.parseFloat(style.borderTopLeftRadius) >= 18),
        hasGlassGradient: metaChipStyles.every((style) => style.backgroundImage.includes('gradient')),
        hasToneBorder: metaChipStyles.every((style) => Number.parseFloat(style.borderTopWidth) >= 1),
        labelMinSize: metaChipLabelStyles.reduce((min, style) => Math.min(min, Number.parseFloat(style.fontSize) || Infinity), Infinity),
        labelHasCapsule: metaChipLabelStyles.every((style) => Number.parseFloat(style.borderTopLeftRadius) >= 10 && Number.parseFloat(style.borderTopWidth) >= 1)
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
  assert(!/(ActionBuy|youConfidence|100Main|pressureMain|agencyRisk|frictionNext)/.test(metrics.verdictStripText), `${viewport.name} verdict strip text is visually/semantically concatenated`);
  assert(metrics.textSignals.count === 6 && metrics.textSignals.labels === 'Action|Confidence|Main pull|Main drag|Risk|Next test' && metrics.textSignals.values.includes('Buy if atmosphere-first survival FPS fits you'), `${viewport.name} hero text signal content mismatch ${JSON.stringify(metrics.textSignals)}`);
  assert(metrics.textSignals.minHeight >= 90 && metrics.textSignals.hasBorder && !metrics.textSignals.hasAccent && !metrics.textSignals.hasInnerFrame && !metrics.textSignals.labelHasFrame && metrics.textSignals.labelMinSize >= 11 && metrics.textSignals.labelMinWeight >= 900 && metrics.textSignals.labelHasBottomRule && !metrics.textSignals.hasFill && metrics.textSignals.hasGradient && metrics.textSignals.maxGlareOpacity <= 0.4 && metrics.textSignals.maxRight <= viewport.width + 1, `${viewport.name} hero text signal layout mismatch ${JSON.stringify(metrics.textSignals)}`);
  assert(metrics.fitSignals.count === 3 && metrics.fitSignals.labels === 'Buy if|Works if|Skip if' && metrics.fitSignals.values.includes('Atmosphere-first survival FPS') && metrics.fitSignals.copy.includes('authored pressure'), `${viewport.name} audience fit signal content mismatch ${JSON.stringify(metrics.fitSignals)}`);
  assert(!/(FPSYou|playerYou|firstYou)/.test(metrics.fitSignals.text), `${viewport.name} audience fit signal text is semantically concatenated ${JSON.stringify(metrics.fitSignals)}`);
  assert(metrics.fitSignals.minHeight >= 180 && metrics.fitSignals.hasBorder && !metrics.fitSignals.hasAccent && !metrics.fitSignals.hasInnerFrame && !metrics.fitSignals.labelHasFrame && metrics.fitSignals.labelMinSize >= 11 && metrics.fitSignals.labelMinWeight >= 900 && metrics.fitSignals.labelHasBottomRule && !metrics.fitSignals.hasFill && metrics.fitSignals.hasGradient && metrics.fitSignals.maxGlareOpacity <= 0.4 && metrics.fitSignals.staleCards === 0 && metrics.fitSignals.maxRight <= viewport.width + 1, `${viewport.name} audience fit signal layout mismatch ${JSON.stringify(metrics.fitSignals)}`);
  assert(metrics.metaChips.count === 5 && metrics.metaChips.labels === 'Status|Evidence|Confidence|Spoilers|Risk' && metrics.metaChips.values === 'Complete|Full run / veteran memory|High, caveated|Layered policy|Ending reconstructed', `${viewport.name} meta chip content mismatch ${JSON.stringify(metrics.metaChips)}`);
  assert(metrics.metaChips.minHeight >= 38 && metrics.metaChips.hasCapsuleRadius && metrics.metaChips.hasGlassGradient && metrics.metaChips.hasToneBorder && metrics.metaChips.labelMinSize >= 10 && metrics.metaChips.labelHasCapsule && metrics.metaChips.maxLeftOverflow >= -1 && metrics.metaChips.maxRight <= viewport.width + 1, `${viewport.name} meta chip layout mismatch ${JSON.stringify(metrics.metaChips)}`);
  assert(metrics.inspectHeader.kicker === '01 · Player Fit Check' && metrics.inspectHeader.title === 'Is This Game For You?' && metrics.inspectHeader.desc.includes('player-match read') && metrics.inspectHeader.descSize >= 16.5 && metrics.inspectHeader.descColor !== 'rgb(133, 146, 165)', `${viewport.name} INSPECT header copy/style mismatch ${JSON.stringify(metrics.inspectHeader)}`);
  assert(metrics.signalBlocks.main === 1 && metrics.signalBlocks.score === 7 && metrics.signalBlocks.axis === 5 && metrics.signalBlocks.arc === 9 && metrics.signalBlocks.inspectMetrics === 7 && metrics.signalBlocks.inspectMeters === 7 && metrics.signalBlocks.inspectPlayers === 7 && metrics.signalBlocks.inspectPanels === 0 && metrics.signalBlocks.inspectHeroRows === 0 && metrics.signalBlocks.inspectInScorePanel === 0 && metrics.signalBlocks.inspectInCopy === 0 && metrics.signalBlocks.inspectAfterHero && metrics.signalBlocks.scoreGrade === 0 && metrics.signalBlocks.scoreHeader === 0 && metrics.signalBlocks.scoreFoot === 0 && metrics.signalBlocks.mainScoreTitle === 'Final Score' && metrics.signalBlocks.mainScoreRank === 'A' && metrics.signalBlocks.mainScoreKicker === 0 && metrics.signalBlocks.mainScoreNote === 0 && metrics.signalBlocks.meterScreens === 29, `${viewport.name} score-screen signal block coverage mismatch ${JSON.stringify(metrics.signalBlocks)}`);
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
