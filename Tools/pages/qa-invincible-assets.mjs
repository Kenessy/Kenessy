import { mkdir, readdir, readFile, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDir, '../..');
const sourceManifestPath = path.join(scriptDir, 'sources/invincible/assets/panel-manifest.json');
const publicManifestPath = path.join(repoRoot, 'docs/assets/img/invincible/panel-manifest.json');
const publicReadmePath = path.join(repoRoot, 'docs/assets/img/invincible/README.md');
const assetDir = path.join(repoRoot, 'docs/assets/img/invincible');
const journeyIndexPath = path.join(repoRoot, 'docs/plater-game-reports/games/invincible/journey/index.html');
const outputDir = path.join(repoRoot, '.cache/invincible-asset-qa');
const ratioTolerance = 0.04;
const minWidth = 960;
const minHeight = 540;
const expectedSlotIds = [
  'hero-regis',
  'page-01-wake-regis',
  'page-02-locator-map',
  'page-03-sandstorm-ringed-moon',
  'page-04-camp-krauta',
  'page-05-aquarium-probe-fear',
  'page-06-relay-repair'
];
const expectedVisibleSlotIds = expectedSlotIds.filter((id) => id !== 'hero-regis');
const expectedFilenames = [
  'invincible-hero-regis.png',
  'invincible-page-01-wake-regis.png',
  'invincible-page-02-locator-map.png',
  'invincible-page-03-sandstorm-ringed-moon.png',
  'invincible-page-04-camp-krauta.png',
  'invincible-page-05-aquarium-probe-fear.png',
  'invincible-page-06-relay-repair.png'
];

const runState = {
  startedAt: new Date().toISOString(),
  checkpoints: [],
  slots: []
};

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

async function checkpoint(message, extra = {}) {
  const item = { at: new Date().toISOString(), message, ...extra };
  runState.checkpoints.push(item);
  console.log(`[qa:invincible-assets] ${item.at} ${message}`);
  await mkdir(outputDir, { recursive: true });
  await writeFile(path.join(outputDir, 'latest.json'), JSON.stringify(runState, null, 2), 'utf8');
}

async function fileExists(filePath) {
  try {
    await stat(filePath);
    return true;
  } catch {
    return false;
  }
}

async function readJson(filePath) {
  return JSON.parse(await readFile(filePath, 'utf8'));
}

function isPlainFilename(filename) {
  return filename === path.basename(filename) && !filename.includes('/') && !filename.includes('\\');
}

function parsePngDimensions(buffer, filename) {
  const signature = '89504e470d0a1a0a';
  assert(buffer.length >= 24, `${filename} is too small to be a PNG`);
  assert(buffer.subarray(0, 8).toString('hex') === signature, `${filename} is not a PNG file`);
  assert(buffer.subarray(12, 16).toString('ascii') === 'IHDR', `${filename} PNG header is missing IHDR`);
  return {
    width: buffer.readUInt32BE(16),
    height: buffer.readUInt32BE(20)
  };
}

function validateManifest(manifest) {
  assert(manifest.game === 'The Invincible', 'manifest game must be The Invincible');
  assert(manifest.status === 'replay-in-progress-illustrated-playthrough', 'manifest status mismatch');
  assert(manifest.promptVersion === 'invincible-illustrated-playthrough-v2', 'manifest promptVersion mismatch');
  assert(manifest.defaultAspectRatio === '16:9', 'manifest defaultAspectRatio must be 16:9');
  assert(manifest.assetBase === 'docs/assets/img/invincible/', 'manifest assetBase mismatch');
  assert(typeof manifest.sharedPrompt === 'string' && /active replay evidence/i.test(manifest.sharedPrompt) && /atompunk/i.test(manifest.sharedPrompt), 'manifest sharedPrompt missing active replay and atompunk direction');
  assert(typeof manifest.negativePrompt === 'string' && /fake UI text/i.test(manifest.negativePrompt), 'manifest negativePrompt missing fake UI text guardrail');
  assert(Array.isArray(manifest.styleRules) && manifest.styleRules.length >= 5, 'manifest needs at least five styleRules');
  assert(manifest.styleRules.some((rule) => /16:9 PNGs/i.test(rule)), 'manifest styleRules must preserve 16:9 PNG contract');
  assert(manifest.styleRules.some((rule) => /Missing images remain listed in the art queue/i.test(rule)), 'manifest styleRules must preserve missing-image art queue behavior');
  assert(Array.isArray(manifest.slots) && manifest.slots.length === expectedSlotIds.length, 'manifest slot count mismatch');

  const ids = new Set();
  const filenames = new Set();
  for (const slot of manifest.slots) {
    assert(slot.id && !ids.has(slot.id), `duplicate or missing slot id ${slot.id}`);
    assert(slot.filename && !filenames.has(slot.filename), `duplicate or missing filename ${slot.filename}`);
    assert(isPlainFilename(slot.filename), `filename must not include paths: ${slot.filename}`);
    assert(slot.filename.endsWith('.png'), `slot must target PNG: ${slot.filename}`);
    assert(slot.aspectRatio === '16:9', `slot ${slot.id} must use 16:9`);
    if (slot.id === 'hero-regis') {
      assert(slot.visibleInJourney === false, 'hero-regis should not render as a journey placeholder');
    } else {
      assert(slot.visibleInJourney !== false, `slot ${slot.id} should be visible in the playthrough`);
    }
    assert(slot.brief && slot.brief.length >= 24, `slot ${slot.id} brief is too short`);
    assert(slot.prompt && slot.prompt.length >= 48, `slot ${slot.id} prompt is too short`);
    assert(slot.composition && slot.composition.length >= 48, `slot ${slot.id} composition is too short`);
    assert(slot.avoid && slot.avoid.length >= 42, `slot ${slot.id} avoid guardrail is too short`);
    ids.add(slot.id);
    filenames.add(slot.filename);
  }

  assert(expectedSlotIds.every((id) => ids.has(id)), 'manifest slot ids do not match The Invincible contract');
  assert(expectedFilenames.every((filename) => filenames.has(filename)), 'manifest filenames do not match The Invincible contract');
  return { ids, filenames };
}

async function main() {
  await checkpoint('start');
  const sourceManifest = await readJson(sourceManifestPath);
  validateManifest(sourceManifest);
  await checkpoint('source manifest ok', { slots: sourceManifest.slots.length });

  assert(await fileExists(publicManifestPath), 'public The Invincible panel manifest missing; run npm run build:metro');
  const publicManifest = await readJson(publicManifestPath);
  assert(JSON.stringify(publicManifest) === JSON.stringify(sourceManifest), 'public The Invincible panel manifest is stale; run npm run build:metro');
  const { filenames } = validateManifest(publicManifest);
  await checkpoint('public manifest mirrors source');

  assert(await fileExists(publicReadmePath), 'public The Invincible asset README missing; run npm run build:metro');
  const readme = await readFile(publicReadmePath, 'utf8');
  assert(readme.includes('The Invincible Illustrated Playthrough Assets'), 'The Invincible README title missing');
  assert(readme.includes('npm run qa:invincible-assets'), 'The Invincible README does not document asset QA');
  assert(expectedFilenames.every((filename) => readme.includes(filename)), 'The Invincible README missing expected filenames');
  await checkpoint('public README ok');

  assert(await fileExists(journeyIndexPath), 'public The Invincible playthrough missing; run npm run build:metro');
  const journeyHtml = await readFile(journeyIndexPath, 'utf8');
  assert(journeyHtml.includes('.comic-frame-ready .slot-placeholder{display:none}'), 'playthrough missing ready comic-frame image CSS');
  assert(journeyHtml.includes('The build auto-wires any matching image file into its comic panel slot.'), 'playthrough missing auto-wire contract');
  assert(expectedVisibleSlotIds.every((id) => journeyHtml.includes(`data-invincible-slot="${id}"`)), 'playthrough missing one or more visible The Invincible data slot markers');
  assert(!journeyHtml.includes('data-invincible-slot="hero-regis"'), 'hero-regis should not render as a visible journey data slot');
  await checkpoint('playthrough page loaded for wiring audit');

  const entries = await readdir(assetDir, { withFileTypes: true });
  const allowedSupportFiles = new Set(['README.md', 'panel-manifest.json']);
  const unexpectedFiles = entries
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name)
    .filter((name) => !allowedSupportFiles.has(name) && !filenames.has(name));
  assert(unexpectedFiles.length === 0, `unexpected files in ${path.relative(repoRoot, assetDir)}: ${unexpectedFiles.join(', ')}`);

  let presentCount = 0;
  for (const slot of publicManifest.slots) {
    const filePath = path.join(assetDir, slot.filename);
    assert(await fileExists(filePath), `required generated image missing: ${slot.filename}`);
    const imageSrc = `../../../../assets/img/invincible/${slot.filename}`;
    const visibleInJourney = slot.visibleInJourney !== false;
    if (visibleInJourney) {
      assert(journeyHtml.includes(`data-image-file="${slot.filename}"`), `present image ${slot.filename} is not wired in playthrough; run npm run build:metro`);
      assert(journeyHtml.includes(imageSrc), `present image ${slot.filename} src missing from playthrough; run npm run build:metro`);
    } else {
      assert(!journeyHtml.includes(`data-image-file="${slot.filename}"`), `hidden image ${slot.filename} should not be wired as a visible playthrough slot`);
    }

    const buffer = await readFile(filePath);
    const { width, height } = parsePngDimensions(buffer, slot.filename);
    const ratio = width / height;
    const ratioError = Math.abs(ratio - 16 / 9);
    assert(ratioError <= ratioTolerance, `${slot.filename} is not close enough to 16:9: ${width}x${height}`);
    assert(width >= minWidth && height >= minHeight, `${slot.filename} is too small: ${width}x${height}, expected at least ${minWidth}x${minHeight}`);
    presentCount += 1;
    const slotResult = { id: slot.id, filename: slot.filename, visibleInJourney, width, height, ratio: Number(ratio.toFixed(4)), ratioError: Number(ratioError.toFixed(4)) };
    runState.slots.push(slotResult);
    await checkpoint(`validated ${slot.filename}`, slotResult);
  }

  await checkpoint('complete', { presentCount });
}

main().catch(async (error) => {
  await checkpoint(`failed: ${error.message}`);
  console.error(`[qa:invincible-assets] failed: ${error.stack || error.message}`);
  process.exit(1);
});
