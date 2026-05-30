import { createServer } from 'node:http';
import { mkdir, readFile, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDir, '../..');
const docsRoot = path.join(repoRoot, 'docs');
const outputDir = path.join(repoRoot, '.cache/pages-stress-qa');
const mode = process.argv.includes('--live') ? 'live' : 'local';
const liveBase = 'https://kenessy.github.io/Kenessy/';
const reportPath = 'plater-game-reports/games/metro-2033-redux/';
const quantumBreakPath = 'plater-game-reports/games/quantum-break/';
const quantumBreakJourneyPath = 'plater-game-reports/games/quantum-break/journey/';

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
  console.log(`[qa:pages:stress:${mode}] ${item.at} ${message}`);
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

async function fetchText(targetUrl, expectedStatus = 200) {
  const response = await fetch(targetUrl, { cache: 'no-store' });
  const text = await response.text();
  assert(response.status === expectedStatus, `${targetUrl} returned ${response.status}, expected ${expectedStatus}`);
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

async function auditHttp(base) {
  await checkpoint('checking versioned HTTP entrypoints');
  const root = await fetchText(url(base));
  const buildId = extractBuildId(root.text);
  assert(root.text.includes('class="home-root"'), 'root is not the portfolio homepage');
  assert(root.text.includes('What This Is') && root.text.includes('Play It Together'), 'portfolio homepage about/journal sections are missing');
  assert(root.text.includes('id="work"') && root.text.includes('16:9 panel'), 'portfolio homepage work or journal image guidance is missing');
  assert(root.text.includes(`${reportPath}?v=${buildId}`), 'portfolio homepage does not link current Metro build id');
  assert(root.text.includes(quantumBreakPath), 'portfolio homepage does not link Quantum Break');
  assert(root.text.includes('apocalypse-express/'), 'portfolio homepage does not link Apocalypse Express');
  assert(root.text.includes('triad-validation-flow.png'), 'portfolio homepage visual missing');
  assert(root.text.includes('metro-2033-redux-review-splash.png'), 'portfolio homepage Metro review splash missing');
  assert(root.text.includes('quantum-break-review-journey-splash.svg'), 'portfolio homepage Quantum Break splash missing');
  assert(!/http-equiv="refresh"|window\.location\.replace/.test(root.text), 'portfolio homepage still redirects');
  const report = await fetchText(url(base, `${reportPath}?v=${buildId}`));
  assert(report.text.includes(`main_canvas_diegetic_equation.bundle.js?v=${buildId}`), 'report bundle URL is not versioned with current build id');
  assert(report.text.includes('<link rel="canonical"'), 'report canonical metadata missing');
  assert(report.text.includes('property="og:title"'), 'report Open Graph title missing');
  assert(report.text.includes('name="twitter:card"'), 'report Twitter card metadata missing');
  assert(!report.text.includes('https://esm.sh/'), 'report references esm.sh');
  const quantumBreak = await fetchText(url(base, quantumBreakPath));
  assert(quantumBreak.text.includes('ALERTED field report draft') && quantumBreak.text.includes('Open Journey'), 'Quantum Break report shell missing journey link');
  assert(quantumBreak.text.includes('Replay Notes So Far') && quantumBreak.text.includes('Project Promenade'), 'Quantum Break report live evidence section missing');
  assert(!quantumBreak.text.includes('[This becomes') && !quantumBreak.text.includes('[Evidence'), 'Quantum Break report still exposes bracketed placeholders');
  const quantumBreakJourney = await fetchText(url(base, quantumBreakJourneyPath));
  assert(quantumBreakJourney.text.includes('Page 01') && quantumBreakJourney.text.includes('Review-canon route selected'), 'Quantum Break journey missing page 01 route lock');
  assert(quantumBreakJourney.text.includes('Panel Contract') && quantumBreakJourney.text.includes('Image-ready comic page'), 'Quantum Break journey comic panel contract missing');
  assert(quantumBreakJourney.text.includes('Generation Brief') && quantumBreakJourney.text.includes('qb-page-01-a-university-exterior.png'), 'Quantum Break journey generation brief missing');
  assert((quantumBreakJourney.text.match(/data-image-ratio="16:9"/g) || []).length >= 7, 'Quantum Break journey does not expose enough 16:9 panel frames');
  assert(quantumBreakJourney.text.includes('16:9 landscape panels'), 'Quantum Break journey does not state 16:9 image workflow');
  await checkpoint(`HTTP entrypoints ok build=${buildId}`);
  return buildId;
}

async function auditHomeViewport(browser, base, buildId, viewport) {
  await checkpoint(`homepage viewport ${viewport.name} start`, viewport);
  const baseOrigin = new URL(base).origin;
  const context = await browser.newContext({
    viewport: { width: viewport.width, height: viewport.height },
    deviceScaleFactor: viewport.deviceScaleFactor || 1,
    isMobile: Boolean(viewport.isMobile),
    hasTouch: Boolean(viewport.isMobile),
    reducedMotion: 'reduce'
  });
  const page = await context.newPage();
  const consoleErrors = [];
  const pageErrors = [];
  const failedRequests = [];
  const badResponses = [];
  const loadedOrigins = new Set();

  page.on('console', (msg) => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });
  page.on('pageerror', (error) => pageErrors.push(error.message));
  page.on('requestfailed', (request) => failedRequests.push(`${request.url()} ${request.failure()?.errorText || ''}`));
  page.on('response', (response) => {
    const responseUrl = response.url();
    loadedOrigins.add(new URL(responseUrl).origin);
    if (response.status() >= 400) badResponses.push(`${response.status()} ${responseUrl}`);
  });

  const response = await page.goto(`${url(base)}?stress-home=${viewport.name}`, { waitUntil: 'load', timeout: 30000 });
  await page.waitForTimeout(900);
  assert(response?.status() === 200, `${viewport.name} homepage returned ${response?.status()}`);

  const initial = await collectHomeMetrics(page, buildId);
  assert(initial.hasHomeRoot, `${viewport.name} homepage root missing`);
  assert(initial.h1 === 'I find the hidden failure before it becomes obvious.', `${viewport.name} homepage h1 mismatch ${initial.h1}`);
  assert(initial.buildId === buildId, `${viewport.name} homepage build mismatch ${initial.buildId}`);
  assert(initial.sectionTitles.join('|') === 'What This Is|Signal Stack|Proof Surface|Field Work|Game Reviews|Play It Together|Why This Profile', `${viewport.name} homepage section order mismatch ${JSON.stringify(initial.sectionTitles)}`);
  assert(initial.hasReportLink && initial.hasQuantumBreakLink && initial.hasReportsLink && initial.hasApocalypseLink, `${viewport.name} homepage primary links missing ${JSON.stringify(initial)}`);
  assert(initial.imageComplete, `${viewport.name} homepage visual did not load`);
  assert(initial.reviewSplashComplete, `${viewport.name} homepage Metro splash did not load`);
  assert(initial.quantumSplashComplete, `${viewport.name} homepage Quantum Break splash did not load`);
  assert(initial.linkCount >= 7, `${viewport.name} homepage expected links`);
  assert(initial.smallInteractive.length === 0, `${viewport.name} homepage small tap targets ${JSON.stringify(initial.smallInteractive)}`);
  assert(!initial.badText, `${viewport.name} homepage bad placeholder text ${initial.badText}`);
  await auditInternalLinks(base, initial.hrefs);

  const scrollHeight = await page.evaluate(() => document.documentElement.scrollHeight);
  const step = Math.max(240, Math.floor(viewport.height * 0.82));
  const positions = [];
  for (let y = 0; y < scrollHeight; y += step) positions.push(y);
  positions.push(Math.max(0, scrollHeight - viewport.height));
  const uniquePositions = [...new Set(positions)].sort((a, b) => a - b);

  for (const [index, y] of uniquePositions.entries()) {
    await page.evaluate((nextY) => window.scrollTo(0, nextY), y);
    await page.waitForTimeout(70);
    const metrics = await collectHomeMetrics(page, buildId);
    runState.viewports.push({ viewport: `home-${viewport.name}`, scrollIndex: index, y, metrics });
    assert(!metrics.horizontalOverflow, `${viewport.name} homepage y=${y} horizontal overflow ${metrics.scrollWidth}/${metrics.clientWidth}`);
    assert(metrics.meaningfulOverflow.length === 0, `${viewport.name} homepage y=${y} offscreen elements ${JSON.stringify(metrics.meaningfulOverflow)}`);
    assert(!metrics.badText, `${viewport.name} homepage y=${y} bad placeholder text ${metrics.badText}`);
    await checkpoint(`homepage viewport ${viewport.name} scroll ${index + 1}/${uniquePositions.length}`, {
      y,
      scrollHeight,
      overflow: metrics.horizontalOverflow
    });
  }

  await page.screenshot({
    path: path.join(outputDir, `${mode}-homepage-${viewport.name}-full.png`),
    fullPage: true
  });

  const unexpectedOrigins = [...loadedOrigins].filter((origin) => origin !== baseOrigin);
  assert(unexpectedOrigins.length === 0, `${viewport.name} homepage loaded unexpected origins ${unexpectedOrigins.join(', ')}`);
  assert(badResponses.length === 0, `${viewport.name} homepage HTTP error responses ${badResponses.join(' | ')}`);
  assert(consoleErrors.length === 0, `${viewport.name} homepage console errors ${consoleErrors.join(' | ')}`);
  assert(pageErrors.length === 0, `${viewport.name} homepage page errors ${pageErrors.join(' | ')}`);
  assert(failedRequests.length === 0, `${viewport.name} homepage failed requests ${failedRequests.join(' | ')}`);

  await context.close();
  await checkpoint(`homepage viewport ${viewport.name} ok`, { scrollChecks: uniquePositions.length });
}

function expectedSections() {
  return [
    'Is This Game For You?',
    'Who Is This 86 For?',
    'ALERTED Score Strip',
    'Short Human Verdict',
    'ALERT Axis Diagnosis',
    'Modifier Ledger',
    'Light / Exposure / Judgment',
    'Trust Layer',
    'Dossier Arc Rail'
  ];
}

async function auditInternalLinks(base, hrefs) {
  const baseOrigin = new URL(base).origin;
  const internal = [...new Set(hrefs)]
    .map((href) => new URL(href, base))
    .filter((href) => href.origin === baseOrigin)
    .map((href) => href.toString());
  for (const href of internal) {
    const response = await fetch(href, { method: 'GET', cache: 'no-store' });
    assert(response.status < 400, `internal link ${href} returned ${response.status}`);
  }
  await checkpoint('internal links ok', { count: internal.length });
}

async function auditViewport(browser, base, buildId, viewport) {
  await checkpoint(`viewport ${viewport.name} start`, viewport);
  const baseOrigin = new URL(base).origin;
  const context = await browser.newContext({
    viewport: { width: viewport.width, height: viewport.height },
    deviceScaleFactor: viewport.deviceScaleFactor || 1,
    isMobile: Boolean(viewport.isMobile),
    hasTouch: Boolean(viewport.isMobile),
    reducedMotion: 'reduce'
  });
  const page = await context.newPage();
  const consoleErrors = [];
  const pageErrors = [];
  const failedRequests = [];
  const badResponses = [];
  const loadedOrigins = new Set();

  page.on('console', (msg) => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });
  page.on('pageerror', (error) => pageErrors.push(error.message));
  page.on('requestfailed', (request) => failedRequests.push(`${request.url()} ${request.failure()?.errorText || ''}`));
  page.on('response', (response) => {
    const responseUrl = response.url();
    loadedOrigins.add(new URL(responseUrl).origin);
    if (response.status() >= 400) badResponses.push(`${response.status()} ${responseUrl}`);
  });

  const response = await page.goto(`${metroReportUrl(base, buildId)}&stress=${viewport.name}`, { waitUntil: 'load', timeout: 30000 });
  await page.waitForTimeout(1000);
  assert(response?.status() === 200, `${viewport.name} report returned ${response?.status()}`);

  const initial = await collectMetrics(page, buildId);
  assert(initial.finalUrl.includes(`${reportPath}?v=${buildId}`), `${viewport.name} did not land on versioned report`);
  assert(initial.hasRoot && initial.diagnostics, `${viewport.name} root/diagnostics missing ${JSON.stringify(initial)}`);
  assert(initial.sectionTitles.join('|') === expectedSections().join('|'), `${viewport.name} section order mismatch ${JSON.stringify(initial.sectionTitles)}`);
  assert(initial.headingCount === expectedSections().length, `${viewport.name} unexpected h2 count ${initial.headingCount}`);
  assert(initial.footerText.includes('ALERTED Review Engine'), `${viewport.name} footer missing`);
  assert(initial.bodyPrefix && !initial.bodyPrefix.startsWith('.scr-root'), `${viewport.name} body starts with raw CSS`);
  assert(!initial.badText, `${viewport.name} contains bad placeholder text ${initial.badText}`);
  assert(initial.linkCount >= 3, `${viewport.name} expected HUD links`);
  assert(initial.smallInteractive.length === 0, `${viewport.name} small tap targets ${JSON.stringify(initial.smallInteractive)}`);
  await auditInternalLinks(base, initial.hrefs);

  const scrollHeight = await page.evaluate(() => document.documentElement.scrollHeight);
  const step = Math.max(240, Math.floor(viewport.height * 0.82));
  const positions = [];
  for (let y = 0; y < scrollHeight; y += step) positions.push(y);
  positions.push(Math.max(0, scrollHeight - viewport.height));
  const uniquePositions = [...new Set(positions)].sort((a, b) => a - b);

  for (const [index, y] of uniquePositions.entries()) {
    await page.evaluate((nextY) => window.scrollTo(0, nextY), y);
    await page.waitForTimeout(80);
    const metrics = await collectMetrics(page, buildId);
    runState.viewports.push({ viewport: viewport.name, scrollIndex: index, y, metrics });
    assert(!metrics.horizontalOverflow, `${viewport.name} y=${y} horizontal overflow ${metrics.scrollWidth}/${metrics.clientWidth}`);
    assert(metrics.meaningfulOverflow.length === 0, `${viewport.name} y=${y} offscreen elements ${JSON.stringify(metrics.meaningfulOverflow)}`);
    assert(metrics.fixedOverlap.length === 0, `${viewport.name} y=${y} fixed HUD overlaps content ${JSON.stringify(metrics.fixedOverlap)}`);
    assert(!metrics.badText, `${viewport.name} y=${y} bad placeholder text ${metrics.badText}`);
    await checkpoint(`viewport ${viewport.name} scroll ${index + 1}/${uniquePositions.length}`, {
      y,
      scrollHeight,
      overflow: metrics.horizontalOverflow
    });
  }

  await page.screenshot({
    path: path.join(outputDir, `${mode}-${viewport.name}-full.png`),
    fullPage: true
  });

  const unexpectedOrigins = [...loadedOrigins].filter((origin) => origin !== baseOrigin);
  assert(unexpectedOrigins.length === 0, `${viewport.name} loaded unexpected origins ${unexpectedOrigins.join(', ')}`);
  assert(badResponses.length === 0, `${viewport.name} HTTP error responses ${badResponses.join(' | ')}`);
  assert(consoleErrors.length === 0, `${viewport.name} console errors ${consoleErrors.join(' | ')}`);
  assert(pageErrors.length === 0, `${viewport.name} page errors ${pageErrors.join(' | ')}`);
  assert(failedRequests.length === 0, `${viewport.name} failed requests ${failedRequests.join(' | ')}`);

  await context.close();
  await checkpoint(`viewport ${viewport.name} ok`, { scrollChecks: uniquePositions.length });
}

async function auditStaticPageViewport(browser, base, pageSpec, viewport) {
  await checkpoint(`${pageSpec.slug} viewport ${viewport.name} start`, viewport);
  const baseOrigin = new URL(base).origin;
  const context = await browser.newContext({
    viewport: { width: viewport.width, height: viewport.height },
    deviceScaleFactor: viewport.deviceScaleFactor || 1,
    isMobile: Boolean(viewport.isMobile),
    hasTouch: Boolean(viewport.isMobile),
    reducedMotion: 'reduce'
  });
  const page = await context.newPage();
  const consoleErrors = [];
  const pageErrors = [];
  const failedRequests = [];
  const badResponses = [];
  const loadedOrigins = new Set();

  page.on('console', (msg) => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });
  page.on('pageerror', (error) => pageErrors.push(error.message));
  page.on('requestfailed', (request) => failedRequests.push(`${request.url()} ${request.failure()?.errorText || ''}`));
  page.on('response', (response) => {
    const responseUrl = response.url();
    loadedOrigins.add(new URL(responseUrl).origin);
    if (response.status() >= 400) badResponses.push(`${response.status()} ${responseUrl}`);
  });

  const response = await page.goto(`${url(base, pageSpec.path)}?stress=${viewport.name}`, { waitUntil: 'load', timeout: 30000 });
  await page.waitForTimeout(900);
  assert(response?.status() === 200, `${pageSpec.slug} ${viewport.name} returned ${response?.status()}`);

  const initial = await collectStaticPageMetrics(page);
  assert(/Quantum\s*Break/i.test(initial.title), `${pageSpec.slug} ${viewport.name} title mismatch ${initial.title}`);
  assert(/Quantum\s*Break/i.test(initial.h1), `${pageSpec.slug} ${viewport.name} h1 mismatch ${initial.h1}`);
  assert(initial.bodyText.includes(pageSpec.expectedText), `${pageSpec.slug} ${viewport.name} missing expected text ${pageSpec.expectedText}`);
  for (const requiredText of pageSpec.requiredTexts || []) {
    assert(initial.bodyText.includes(requiredText), `${pageSpec.slug} ${viewport.name} missing required text ${requiredText}`);
  }
  assert(initial.linkCount >= pageSpec.minLinks, `${pageSpec.slug} ${viewport.name} expected links ${initial.linkCount}`);
  assert(initial.bodyPrefix && !initial.bodyPrefix.startsWith(':root') && !initial.bodyPrefix.startsWith('.'), `${pageSpec.slug} ${viewport.name} body starts with raw CSS`);
  assert(!initial.badText, `${pageSpec.slug} ${viewport.name} bad placeholder text ${initial.badText}`);
  if (pageSpec.minImageFrames) {
    assert(initial.imageFrameCount >= pageSpec.minImageFrames, `${pageSpec.slug} ${viewport.name} expected at least ${pageSpec.minImageFrames} 16:9 frames, found ${initial.imageFrameCount}`);
    assert(initial.badImageFrameRatios.length === 0, `${pageSpec.slug} ${viewport.name} image frames are not 16:9 ${JSON.stringify(initial.badImageFrameRatios)}`);
  }
  await auditInternalLinks(base, initial.hrefs);

  const scrollHeight = await page.evaluate(() => document.documentElement.scrollHeight);
  const step = Math.max(240, Math.floor(viewport.height * 0.82));
  const positions = [];
  for (let y = 0; y < scrollHeight; y += step) positions.push(y);
  positions.push(Math.max(0, scrollHeight - viewport.height));
  const uniquePositions = [...new Set(positions)].sort((a, b) => a - b);

  for (const [index, y] of uniquePositions.entries()) {
    await page.evaluate((nextY) => window.scrollTo(0, nextY), y);
    await page.waitForTimeout(70);
    const metrics = await collectStaticPageMetrics(page);
    runState.viewports.push({ viewport: `${pageSpec.slug}-${viewport.name}`, scrollIndex: index, y, metrics });
    assert(!metrics.horizontalOverflow, `${pageSpec.slug} ${viewport.name} y=${y} horizontal overflow ${metrics.scrollWidth}/${metrics.clientWidth}`);
    assert(metrics.meaningfulOverflow.length === 0, `${pageSpec.slug} ${viewport.name} y=${y} offscreen elements ${JSON.stringify(metrics.meaningfulOverflow)}`);
    assert(!metrics.badText, `${pageSpec.slug} ${viewport.name} y=${y} bad placeholder text ${metrics.badText}`);
    await checkpoint(`${pageSpec.slug} viewport ${viewport.name} scroll ${index + 1}/${uniquePositions.length}`, {
      y,
      scrollHeight,
      overflow: metrics.horizontalOverflow
    });
  }

  await page.screenshot({
    path: path.join(outputDir, `${mode}-${pageSpec.slug}-${viewport.name}-full.png`),
    fullPage: true
  });

  const unexpectedOrigins = [...loadedOrigins].filter((origin) => origin !== baseOrigin);
  assert(unexpectedOrigins.length === 0, `${pageSpec.slug} ${viewport.name} loaded unexpected origins ${unexpectedOrigins.join(', ')}`);
  assert(badResponses.length === 0, `${pageSpec.slug} ${viewport.name} HTTP error responses ${badResponses.join(' | ')}`);
  assert(consoleErrors.length === 0, `${pageSpec.slug} ${viewport.name} console errors ${consoleErrors.join(' | ')}`);
  assert(pageErrors.length === 0, `${pageSpec.slug} ${viewport.name} page errors ${pageErrors.join(' | ')}`);
  assert(failedRequests.length === 0, `${pageSpec.slug} ${viewport.name} failed requests ${failedRequests.join(' | ')}`);

  await context.close();
  await checkpoint(`${pageSpec.slug} viewport ${viewport.name} ok`, { scrollChecks: uniquePositions.length });
}

async function collectHomeMetrics(page, buildId) {
  return page.evaluate((expectedBuildId) => {
    const rectFor = (el) => {
      const rect = el.getBoundingClientRect();
      return { left: rect.left, right: rect.right, top: rect.top, bottom: rect.bottom, width: rect.width, height: rect.height };
    };
    const isVisible = (el) => {
      const rect = el.getBoundingClientRect();
      const style = getComputedStyle(el);
      return rect.width > 0 && rect.height > 0 && style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0';
    };
    const visible = [...document.querySelectorAll('*')].filter(isVisible);
    const meaningfulOverflow = visible
      .filter((el) => {
        const rect = el.getBoundingClientRect();
        return rect.right > window.innerWidth + 1 || rect.left < -1;
      })
      .slice(0, 8)
      .map((el) => ({ tag: el.tagName, className: String(el.className), text: (el.textContent || '').trim().slice(0, 80), rect: rectFor(el) }));
    const bodyText = document.body.textContent.replace(/\s+/g, ' ').trim();
    const badTextMatch = bodyText.match(/\b(undefined|NaN|\[object Object\])\b/i);
    const interactive = [...document.querySelectorAll('a,button,summary')].filter(isVisible);
    const smallInteractive = interactive
      .filter((el) => {
        const rect = el.getBoundingClientRect();
        return rect.width < 32 || rect.height < 28;
      })
      .map((el) => ({ tag: el.tagName, text: (el.textContent || '').trim().slice(0, 80), rect: rectFor(el) }));
    const proofImage = document.querySelector('.proof-card img');
    const reviewSplash = document.querySelector('.review-media img');
    const quantumSplash = document.querySelector('.qb-card .review-media img');
    const hrefs = [...document.querySelectorAll('a[href]')].map((el) => el.href);
    return {
      finalUrl: location.href,
      buildId: document.querySelector('meta[name="build-id"]')?.content || '',
      expectedBuildId,
      hasHomeRoot: Boolean(document.querySelector('.home-root')),
      h1: document.querySelector('h1')?.textContent.trim() || '',
      sectionTitles: [...document.querySelectorAll('.section h2')].map((el) => el.textContent.replace(/\s+/g, ' ').trim()),
      hasReportLink: hrefs.some((href) => href.includes('plater-game-reports/games/metro-2033-redux/')),
      hasQuantumBreakLink: hrefs.some((href) => href.includes('plater-game-reports/games/quantum-break/')),
      hasReportsLink: hrefs.some((href) => href.includes('plater-game-reports/')),
      hasApocalypseLink: hrefs.some((href) => href.includes('apocalypse-express/')),
      imageComplete: Boolean(proofImage && proofImage.complete && proofImage.naturalWidth > 0),
      reviewSplashComplete: Boolean(reviewSplash && reviewSplash.complete && reviewSplash.naturalWidth > 0),
      quantumSplashComplete: Boolean(quantumSplash && quantumSplash.complete && quantumSplash.naturalWidth > 0),
      horizontalOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
      meaningfulOverflow,
      bodyPrefix: bodyText.slice(0, 140),
      badText: badTextMatch ? badTextMatch[0] : '',
      linkCount: document.querySelectorAll('a').length,
      hrefs,
      smallInteractive
    };
  }, buildId);
}

async function collectStaticPageMetrics(page) {
  return page.evaluate(() => {
    const rectFor = (el) => {
      const rect = el.getBoundingClientRect();
      return { left: rect.left, right: rect.right, top: rect.top, bottom: rect.bottom, width: rect.width, height: rect.height };
    };
    const isVisible = (el) => {
      const rect = el.getBoundingClientRect();
      const style = getComputedStyle(el);
      return rect.width > 0 && rect.height > 0 && style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0';
    };
    const visible = [...document.querySelectorAll('*')].filter(isVisible);
    const meaningfulOverflow = visible
      .filter((el) => {
        const rect = el.getBoundingClientRect();
        return rect.right > window.innerWidth + 1 || rect.left < -1;
      })
      .slice(0, 8)
      .map((el) => ({ tag: el.tagName, className: String(el.className), text: (el.textContent || '').trim().slice(0, 80), rect: rectFor(el) }));
    const bodyText = document.body.textContent.replace(/\s+/g, ' ').trim();
    const badTextMatch = bodyText.match(/\b(undefined|NaN|\[object Object\])\b/i);
    const imageFrames = [...document.querySelectorAll('[data-image-ratio="16:9"]')].filter(isVisible);
    const badImageFrameRatios = imageFrames
      .map((el) => ({ text: (el.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 80), rect: rectFor(el) }))
      .filter((item) => item.rect.height > 0 && Math.abs((item.rect.width / item.rect.height) - (16 / 9)) > 0.08);
    return {
      finalUrl: location.href,
      title: document.title,
      h1: document.querySelector('h1')?.textContent.replace(/\s+/g, ' ').trim() || '',
      bodyText,
      bodyPrefix: bodyText.slice(0, 140),
      horizontalOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
      meaningfulOverflow,
      badText: badTextMatch ? badTextMatch[0] : '',
      linkCount: document.querySelectorAll('a').length,
      hrefs: [...document.querySelectorAll('a[href]')].map((el) => el.href),
      imageFrameCount: imageFrames.length,
      badImageFrameRatios
    };
  });
}

async function collectMetrics(page, buildId) {
  return page.evaluate((expectedBuildId) => {
    const rectFor = (el) => {
      const rect = el.getBoundingClientRect();
      return { left: rect.left, right: rect.right, top: rect.top, bottom: rect.bottom, width: rect.width, height: rect.height };
    };
    const isVisible = (el) => {
      const rect = el.getBoundingClientRect();
      const style = getComputedStyle(el);
      return rect.width > 0 && rect.height > 0 && style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0';
    };
    const visible = [...document.querySelectorAll('*')].filter(isVisible);
    const ignoreOverflow = /scr-bg|scr-keyword-glow|scr-score-panel-glare|scr-meter-screen|scr-solid-meter-fill/;
    const meaningfulOverflow = visible
      .filter((el) => {
        const rect = el.getBoundingClientRect();
        const className = String(el.className);
        if (ignoreOverflow.test(className)) return false;
        return rect.right > window.innerWidth + 1 || rect.left < -1;
      })
      .slice(0, 8)
      .map((el) => ({ tag: el.tagName, className: String(el.className), text: (el.textContent || '').trim().slice(0, 80), rect: rectFor(el) }));
    const hud = document.querySelector('.scr-hud');
    const hudRect = hud ? rectFor(hud) : null;
    const fixedOverlap = hudRect ? [...document.querySelectorAll('.scr-shell > section')]
      .filter(isVisible)
      .filter((section) => {
        const rect = section.getBoundingClientRect();
        const overlapX = Math.max(0, Math.min(rect.right, hudRect.right) - Math.max(rect.left, hudRect.left));
        const overlapY = Math.max(0, Math.min(rect.bottom, hudRect.bottom) - Math.max(rect.top, hudRect.top));
        return overlapX * overlapY > 12 && rect.top > 0;
      })
      .slice(0, 3)
      .map((section) => ({ className: String(section.className), heading: section.querySelector('h2,h1')?.textContent.trim() || '', rect: rectFor(section) }))
      : [];
    const bodyText = document.body.textContent.replace(/\s+/g, ' ').trim();
    const badTextMatch = bodyText.match(/\b(undefined|NaN|\[object Object\])\b/i);
    const interactive = [...document.querySelectorAll('a,button,summary')].filter(isVisible);
    const smallInteractive = interactive
      .filter((el) => {
        const rect = el.getBoundingClientRect();
        return rect.width < 32 || rect.height < 28;
      })
      .map((el) => ({ tag: el.tagName, text: (el.textContent || '').trim().slice(0, 80), rect: rectFor(el) }));
    return {
      finalUrl: location.href,
      buildId: document.querySelector('meta[name="build-id"]')?.content || '',
      expectedBuildId,
      hasRoot: Boolean(document.querySelector('.scr-root')),
      diagnostics: document.body.textContent.includes('15/15 checks passing'),
      horizontalOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
      meaningfulOverflow,
      fixedOverlap,
      sectionTitles: [...document.querySelectorAll('.scr-shell > section h2')].map((el) => el.textContent.replace(/\s+/g, ' ').trim()),
      headingCount: document.querySelectorAll('.scr-shell > section h2').length,
      footerText: document.querySelector('.scr-footer')?.textContent || '',
      bodyPrefix: bodyText.slice(0, 140),
      badText: badTextMatch ? badTextMatch[0] : '',
      linkCount: document.querySelectorAll('a').length,
      hrefs: [...document.querySelectorAll('a[href]')].map((el) => el.href),
      smallInteractive
    };
  }, buildId);
}

async function auditFailureModes(browser, base, buildId) {
  await checkpoint('checking adversarial failure modes');
  const reportUrl = url(base, `${reportPath}?v=${buildId}`);

  const noJsContext = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 360, height: 740 } });
  const noJsPage = await noJsContext.newPage();
  const noJsResponse = await noJsPage.goto(`${reportUrl}&stress=nojs`, { waitUntil: 'load', timeout: 30000 });
  assert(noJsResponse?.status() === 200, `no-JS page returned ${noJsResponse?.status()}`);
  const noJs = await noJsPage.evaluate(() => ({
    hasNoscript: Boolean(document.querySelector('noscript')),
    hasSummary: /Strong, caveated buy|Atmosphere-first survival FPS|Static fallback/i.test(document.body.textContent),
    startsWithCss: document.body.textContent.trim().startsWith('.scr-root')
  }));
  assert(noJs.hasNoscript && noJs.hasSummary && !noJs.startsWithCss, `no-JS fallback weak ${JSON.stringify(noJs)}`);
  await noJsContext.close();

  const blockedContext = await browser.newContext({ viewport: { width: 360, height: 740 } });
  const blockedPage = await blockedContext.newPage();
  await blockedPage.route('https://esm.sh/**', (route) => route.abort());
  await blockedPage.route('https://cdn.jsdelivr.net/**', (route) => route.abort());
  const blockedResponse = await blockedPage.goto(`${reportUrl}&stress=cdn-block`, { waitUntil: 'load', timeout: 30000 });
  await blockedPage.waitForTimeout(1000);
  assert(blockedResponse?.status() === 200, `external-block page returned ${blockedResponse?.status()}`);
  const blocked = await blockedPage.evaluate(() => ({
    hasRoot: Boolean(document.querySelector('.scr-root')),
    diagnostics: document.body.textContent.includes('15/15 checks passing')
  }));
  assert(blocked.hasRoot && blocked.diagnostics, `external-block mode failed ${JSON.stringify(blocked)}`);
  await blockedContext.close();
  await checkpoint('failure modes ok');
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
    const buildId = await auditHttp(base);
    const browser = await launchBrowser();
    try {
      const viewports = [
        { name: 'narrow-320', width: 320, height: 568, isMobile: true },
        { name: 'mobile-360', width: 360, height: 740, isMobile: true },
        { name: 'mobile-414', width: 414, height: 896, isMobile: true },
        { name: 'landscape-844', width: 844, height: 390, isMobile: true },
        { name: 'tablet-768', width: 768, height: 1024 },
        { name: 'laptop-1280', width: 1280, height: 720 },
        { name: 'desktop-1440', width: 1440, height: 900 },
        { name: 'wide-1920', width: 1920, height: 1080 }
      ];
      for (const viewport of viewports) {
        await auditHomeViewport(browser, base, buildId, viewport);
        await auditViewport(browser, base, buildId, viewport);
        await auditStaticPageViewport(browser, base, {
          slug: 'quantum-break-report',
          path: quantumBreakPath,
          expectedText: 'ALERTED field report draft',
          minLinks: 5
        }, viewport);
        await auditStaticPageViewport(browser, base, {
          slug: 'quantum-break-journey',
          path: quantumBreakJourneyPath,
          expectedText: 'Review-canon route selected',
          requiredTexts: ['Panel Contract', 'Image-ready comic page', 'Generation Brief', 'qb-page-01-a-university-exterior.png'],
          minLinks: 6,
          minImageFrames: 7
        }, viewport);
      }
      await auditFailureModes(browser, base, buildId);
    } finally {
      await browser.close();
    }
    await checkpoint('all stress checks passed');
  } catch (error) {
    await checkpoint(`failed: ${error.message}`);
    throw error;
  } finally {
    if (serverHandle) {
      await new Promise((resolve) => serverHandle.server.close(resolve));
      await checkpoint('local server stopped');
    }
  }
}

main().catch((error) => {
  console.error(`[qa:pages:stress:${mode}] failed: ${error.stack || error.message}`);
  process.exit(1);
});
