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
  assert(report.text.includes('.scr-hero-verdict-strip>div'), 'hero verdict strip is missing base cell styling');
  assert(report.text.includes('.scr-signal-block'), 'shared signal block styling is missing');
  assert(report.text.includes('--scr-type-main-score-title'), 'report CSS is missing shared type size presets');
  assert(report.text.includes('font-size:var(--scr-type-main-score-title)'), 'main score title is not using the shared type preset');
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
    const mainScoreTitle = document.querySelector('.scr-main-score-title');
    const mainScoreTitleStyle = mainScoreTitle ? getComputedStyle(mainScoreTitle) : null;
    const signalBlocks = {
      main: document.querySelectorAll('.scr-main-score-meter.scr-score-meter-box.scr-signal-block').length,
      score: document.querySelectorAll('.scr-score-strip .scr-score-meter-box.scr-signal-block').length,
      axis: document.querySelectorAll('.scr-d20-wrap.scr-score-meter-box.scr-signal-block').length,
      arc: document.querySelectorAll('.scr-evidence-marker.scr-score-meter-box.scr-signal-block').length,
      inspect: document.querySelectorAll('.scr-inspect-meter.scr-score-meter-box.scr-signal-block').length,
      inspectInScorePanel: document.querySelectorAll('.scr-score-panel .scr-inspect-panel').length,
      inspectInCopy: document.querySelectorAll('.scr-hero-copy .scr-inspect-panel').length,
      inspectFullRow: Boolean(document.querySelector('.scr-hero-grid > .scr-hero-inspect-row .scr-inspect-panel')),
      scoreGrade: document.querySelectorAll('.scr-score-panel-grade').length,
      scoreHeader: document.querySelectorAll('.scr-score-panel-head').length,
      scoreFoot: document.querySelectorAll('.scr-score-panel-foot').length,
      mainScoreTitle: (document.querySelector('.scr-main-score-title')?.textContent || '').trim(),
      mainScoreTitleSize: mainScoreTitleStyle ? Number.parseFloat(mainScoreTitleStyle.fontSize) : 0,
      mainScoreTitleWeight: mainScoreTitleStyle ? Number.parseInt(mainScoreTitleStyle.fontWeight, 10) : 0,
      mainScoreKicker: document.querySelectorAll('.scr-main-score-meter .scr-signal-kicker').length,
      mainScoreNote: document.querySelectorAll('.scr-main-score-meter .scr-signal-note').length,
      meterScreens: document.querySelectorAll('.scr-score-meter-box.scr-signal-block .scr-meter-screen').length
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
  assert(metrics.signalBlocks.main === 1 && metrics.signalBlocks.score === 7 && metrics.signalBlocks.axis === 5 && metrics.signalBlocks.arc === 9 && metrics.signalBlocks.inspect === 7 && metrics.signalBlocks.inspectInScorePanel === 0 && metrics.signalBlocks.inspectInCopy === 0 && metrics.signalBlocks.inspectFullRow && metrics.signalBlocks.scoreGrade === 0 && metrics.signalBlocks.scoreHeader === 0 && metrics.signalBlocks.scoreFoot === 0 && metrics.signalBlocks.mainScoreTitle === 'Final Score' && metrics.signalBlocks.mainScoreKicker === 0 && metrics.signalBlocks.mainScoreNote === 0 && metrics.signalBlocks.meterScreens === 29, `${viewport.name} score-screen signal block coverage mismatch ${JSON.stringify(metrics.signalBlocks)}`);
  assert(metrics.signalBlocks.mainScoreTitleSize >= 13 && metrics.signalBlocks.mainScoreTitleWeight >= 900, `${viewport.name} main score title is too small/light ${JSON.stringify(metrics.signalBlocks)}`);
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
