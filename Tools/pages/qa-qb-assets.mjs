import { mkdir, readdir, readFile, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDir, '../..');
const sourceManifestPath = path.join(scriptDir, 'sources/quantum-break/assets/panel-manifest.json');
const publicManifestPath = path.join(repoRoot, 'docs/assets/img/quantum-break/panel-manifest.json');
const assetDir = path.join(repoRoot, 'docs/assets/img/quantum-break');
const journeyIndexPath = path.join(repoRoot, 'docs/plater-game-reports/games/quantum-break/journey/index.html');
const outputDir = path.join(repoRoot, '.cache/qb-asset-qa');
const requireCurrentPage = process.argv.includes('--require-current') || process.argv.includes('--strict');
const requireAll = process.argv.includes('--require-all');
const expectedRatio = 16 / 9;
const ratioTolerance = 0.04;
const minWidth = 960;
const minHeight = 540;

const runState = {
  startedAt: new Date().toISOString(),
  requireCurrentPage,
  requireAll,
  checkpoints: [],
  slots: []
};

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

async function checkpoint(message, extra = {}) {
  const item = { at: new Date().toISOString(), message, ...extra };
  runState.checkpoints.push(item);
  console.log(`[qa:qb-assets] ${item.at} ${message}`);
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
  assert(manifest.game === 'Quantum Break', 'manifest game must be Quantum Break');
  assert(manifest.defaultAspectRatio === '16:9', 'manifest defaultAspectRatio must be 16:9');
  assert(manifest.assetBase === 'docs/assets/img/quantum-break/', 'manifest assetBase mismatch');
  assert(Array.isArray(manifest.styleRules) && manifest.styleRules.length >= 4, 'manifest needs at least four styleRules');
  assert(manifest.styleRules.some((rule) => /16:9 landscape PNGs/i.test(rule)), 'manifest styleRules must preserve 16:9 PNG contract');
  assert(manifest.styleRules.some((rule) => /coherent cinematic sci-fi comic style/i.test(rule)), 'manifest styleRules must preserve coherent art direction');
  assert(manifest.styleRules.some((rule) => /Avoid large non-diegetic typography/i.test(rule)), 'manifest styleRules must guard against fake text overlays');
  assert(Array.isArray(manifest.slots) && manifest.slots.length >= 6, 'manifest needs at least six slots');
  const ids = new Set();
  const filenames = new Set();
  let currentRequired = 0;
  for (const slot of manifest.slots) {
    assert(slot.id && !ids.has(slot.id), `duplicate or missing slot id ${slot.id}`);
    assert(slot.filename && !filenames.has(slot.filename), `duplicate or missing filename ${slot.filename}`);
    assert(isPlainFilename(slot.filename), `filename must not include paths: ${slot.filename}`);
    assert(slot.filename.endsWith('.png'), `slot must target PNG: ${slot.filename}`);
    assert(slot.aspectRatio === '16:9', `slot ${slot.id} must use 16:9`);
    assert(slot.brief && slot.brief.length >= 24, `slot ${slot.id} brief is too short`);
    if (slot.requiredForCurrentPage) currentRequired += 1;
    ids.add(slot.id);
    filenames.add(slot.filename);
  }
  assert(currentRequired === 4, `expected four current-page required slots, got ${currentRequired}`);
  return { ids, filenames };
}

async function main() {
  await checkpoint('start');
  const sourceManifest = await readJson(sourceManifestPath);
  validateManifest(sourceManifest);
  await checkpoint('source manifest ok', { slots: sourceManifest.slots.length });

  assert(await fileExists(publicManifestPath), 'public panel manifest missing; run npm run build:metro');
  const publicManifest = await readJson(publicManifestPath);
  assert(JSON.stringify(publicManifest) === JSON.stringify(sourceManifest), 'public panel manifest is stale; run npm run build:metro');
  const { filenames } = validateManifest(publicManifest);
  await checkpoint('public manifest mirrors source');

  assert(await fileExists(journeyIndexPath), 'public Quantum Break journey missing; run npm run build:metro');
  const journeyHtml = await readFile(journeyIndexPath, 'utf8');
  assert(journeyHtml.includes('.panel-frame-ready:before,.panel-frame-ready:after{display:none}'), 'journey is missing ready-frame image CSS');
  assert(journeyHtml.includes('The build auto-wires any matching image file into its manifest slot.'), 'journey is missing auto-wiring handoff text');
  await checkpoint('journey page loaded for wiring audit');

  const entries = await readdir(assetDir, { withFileTypes: true });
  const allowedSupportFiles = new Set(['README.md', 'panel-manifest.json']);
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
    const imageSrc = `../../../../assets/img/quantum-break/${slot.filename}`;
    assert(journeyHtml.includes(`data-qb-slot="${slot.id}"`), `journey missing data slot ${slot.id}`);
    const slotResult = {
      id: slot.id,
      filename: slot.filename,
      requiredForCurrentPage: Boolean(slot.requiredForCurrentPage),
      exists
    };
    if (!exists) {
      assert(!journeyHtml.includes(`data-image-file="${slot.filename}"`), `missing image ${slot.filename} is still wired in journey`);
      assert(!journeyHtml.includes(imageSrc), `missing image ${slot.filename} still has a journey src`);
      missingCount += 1;
      runState.slots.push(slotResult);
      await checkpoint(`missing ${slot.filename}`, { requiredForCurrentPage: slot.requiredForCurrentPage });
      if (requireAll || (requireCurrentPage && slot.requiredForCurrentPage)) {
        throw new Error(`required image missing: ${slot.filename}`);
      }
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
  console.error(`[qa:qb-assets] failed: ${error.stack || error.message}`);
  process.exit(1);
});
