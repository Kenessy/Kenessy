import { mkdir, readdir, readFile, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDir, '../..');
const sourceManifestPath = path.join(scriptDir, 'sources/prey/assets/flight-recorder-manifest.json');
const publicManifestPath = path.join(repoRoot, 'docs/assets/img/prey/flight-recorder-manifest.json');
const publicReadmePath = path.join(repoRoot, 'docs/assets/img/prey/README.md');
const assetDir = path.join(repoRoot, 'docs/assets/img/prey');
const journeyIndexPath = path.join(repoRoot, 'docs/plater-game-reports/games/prey/journey/index.html');
const outputDir = path.join(repoRoot, '.cache/prey-asset-qa');
const expectedRatio = 16 / 9;
const ratioTolerance = 0.04;
const minWidth = 960;
const minHeight = 540;
const expectedSlotIds = [
  'page-02-a-rooftop-helicopter',
  'page-03-a-mimic-paranoia',
  'page-03-b-crew-terminal-trace'
];
const expectedFilenames = [
  'prey-page-02-a-rooftop-helicopter.png',
  'prey-page-03-a-mimic-paranoia.png',
  'prey-page-03-b-crew-terminal-trace.png'
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
  console.log(`[qa:prey-assets] ${item.at} ${message}`);
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
  assert(manifest.game === 'Prey', 'manifest game must be Prey');
  assert(manifest.status === 'illustrated-journal-session-01-partial-assets', 'manifest status mismatch');
  assert(manifest.promptVersion === 'prey-illustrated-journal-v1', 'manifest promptVersion mismatch');
  assert(manifest.defaultAspectRatio === '16:9', 'manifest defaultAspectRatio must be 16:9');
  assert(manifest.assetBase === 'docs/assets/img/prey/', 'manifest assetBase mismatch');
  assert(typeof manifest.sharedPrompt === 'string' && /illustrated evidence image/i.test(manifest.sharedPrompt), 'manifest sharedPrompt missing illustrated evidence base');
  assert(typeof manifest.negativePrompt === 'string' && /fake UI text/i.test(manifest.negativePrompt), 'manifest negativePrompt missing fake UI text guardrail');
  assert(Array.isArray(manifest.styleRules) && manifest.styleRules.length >= 4, 'manifest needs at least four styleRules');
  assert(manifest.styleRules.some((rule) => /16:9 PNGs only/i.test(rule)), 'manifest styleRules must preserve 16:9 PNG contract');
  assert(manifest.styleRules.some((rule) => /Missing images remain placeholders/i.test(rule)), 'manifest styleRules must preserve missing-image placeholder behavior');
  assert(manifest.styleRules.some((rule) => /illustrated field journal/i.test(rule)), 'manifest styleRules must preserve journal art direction');
  assert(Array.isArray(manifest.slots) && manifest.slots.length === 3, 'manifest must contain exactly three photo evidence entries');

  const ids = new Set();
  const filenames = new Set();
  for (const slot of manifest.slots) {
    assert(slot.id && !ids.has(slot.id), `duplicate or missing slot id ${slot.id}`);
    assert(slot.filename && !filenames.has(slot.filename), `duplicate or missing filename ${slot.filename}`);
    assert(isPlainFilename(slot.filename), `filename must not include paths: ${slot.filename}`);
    assert(slot.filename.endsWith('.png'), `slot must target PNG: ${slot.filename}`);
    assert(slot.aspectRatio === '16:9', `slot ${slot.id} must use 16:9`);
    assert(slot.visibleInJourney !== false, `slot ${slot.id} should be visible in the Prey illustrated journal v1`);
    assert(slot.brief && slot.brief.length >= 24, `slot ${slot.id} brief is too short`);
    assert(slot.prompt && slot.prompt.length >= 48, `slot ${slot.id} prompt is too short`);
    assert(slot.composition && slot.composition.length >= 48, `slot ${slot.id} composition is too short`);
    assert(slot.avoid && slot.avoid.length >= 42, `slot ${slot.id} avoid guardrail is too short`);
    ids.add(slot.id);
    filenames.add(slot.filename);
  }

  assert(expectedSlotIds.every((id) => ids.has(id)), 'manifest slot ids do not match Prey journal contract');
  assert(expectedFilenames.every((filename) => filenames.has(filename)), 'manifest filenames do not match Prey journal contract');
  return { ids, filenames };
}

async function main() {
  await checkpoint('start');
  const sourceManifest = await readJson(sourceManifestPath);
  validateManifest(sourceManifest);
  await checkpoint('source manifest ok', { slots: sourceManifest.slots.length });

  assert(await fileExists(publicManifestPath), 'public Prey flight recorder manifest missing; run npm run build:metro');
  const publicManifest = await readJson(publicManifestPath);
  assert(JSON.stringify(publicManifest) === JSON.stringify(sourceManifest), 'public Prey flight recorder manifest is stale; run npm run build:metro');
  const { filenames } = validateManifest(publicManifest);
  await checkpoint('public manifest mirrors source');

  assert(await fileExists(publicReadmePath), 'public Prey asset README missing; run npm run build:metro');
  const readme = await readFile(publicReadmePath, 'utf8');
  assert(readme.includes('npm run qa:prey-assets'), 'Prey README does not document asset QA');
  assert(expectedFilenames.every((filename) => readme.includes(filename)), 'Prey README missing expected drop-in filenames');
  assert(readme.includes('Missing images remain visible as journal placeholders'), 'Prey README missing placeholder behavior');
  await checkpoint('public README ok');

  assert(await fileExists(journeyIndexPath), 'public Prey journey missing; run npm run build:metro');
  const journeyHtml = await readFile(journeyIndexPath, 'utf8');
  assert(journeyHtml.includes('.evidence-slot-ready .slot-placeholder{display:none}'), 'journey is missing ready evidence-slot image CSS');
  assert(journeyHtml.includes('Missing images remain visible as journal placeholders until exact filenames exist.'), 'journey is missing missing-image placeholder contract');
  assert(expectedSlotIds.every((id) => journeyHtml.includes(`data-prey-slot="${id}"`)), 'journey is missing one or more Prey data slot markers');
  await checkpoint('journey page loaded for wiring audit');

  const entries = await readdir(assetDir, { withFileTypes: true });
  const allowedSupportFiles = new Set(['README.md', 'flight-recorder-manifest.json']);
  const unexpectedFiles = entries
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name)
    .filter((name) => !allowedSupportFiles.has(name) && !filenames.has(name));
  assert(unexpectedFiles.length === 0, `unexpected files in ${path.relative(repoRoot, assetDir)}: ${unexpectedFiles.join(', ')}`);

  let presentCount = 0;
  let missingCount = 0;
  for (const slot of publicManifest.slots) {
    const filePath = path.join(assetDir, slot.filename);
    const exists = await fileExists(filePath);
    const imageSrc = `../../../../assets/img/prey/${slot.filename}`;
    assert(journeyHtml.includes(`data-prey-slot="${slot.id}"`), `journey missing data slot ${slot.id}`);
    const slotResult = {
      id: slot.id,
      filename: slot.filename,
      visibleInJourney: true,
      exists
    };

    if (!exists) {
      assert(!journeyHtml.includes(`data-image-file="${slot.filename}"`), `missing image ${slot.filename} is still wired in journey`);
      assert(!journeyHtml.includes(imageSrc), `missing image ${slot.filename} still has a journey src`);
      missingCount += 1;
      runState.slots.push(slotResult);
      await checkpoint(`missing ${slot.filename}`);
      continue;
    }

    assert(journeyHtml.includes(`data-image-file="${slot.filename}"`), `present image ${slot.filename} is not wired in journey; run npm run build:metro`);
    assert(journeyHtml.includes(imageSrc), `present image ${slot.filename} src missing from journey; run npm run build:metro`);

    const buffer = await readFile(filePath);
    const { width, height } = parsePngDimensions(buffer, slot.filename);
    const ratio = width / height;
    const ratioError = Math.abs(ratio - expectedRatio);
    Object.assign(slotResult, { width, height, ratio: Number(ratio.toFixed(4)), ratioError: Number(ratioError.toFixed(4)) });
    assert(ratioError <= ratioTolerance, `${slot.filename} is not close enough to 16:9: ${width}x${height}`);
    assert(width >= minWidth && height >= minHeight, `${slot.filename} is too small: ${width}x${height}, expected at least ${minWidth}x${minHeight}`);
    presentCount += 1;
    runState.slots.push(slotResult);
    await checkpoint(`validated ${slot.filename}`, slotResult);
  }

  await checkpoint('journey wiring ok', { presentCount, missingCount });
  await checkpoint('complete', { presentCount, missingCount });
}

main().catch(async (error) => {
  await checkpoint(`failed: ${error.message}`);
  console.error(`[qa:prey-assets] failed: ${error.stack || error.message}`);
  process.exit(1);
});
