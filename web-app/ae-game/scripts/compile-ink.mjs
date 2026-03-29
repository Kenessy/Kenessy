#!/usr/bin/env node
// Compile .ink files to .json using inkjs Compiler
import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join, basename } from 'path';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { Compiler } = require('inkjs/compiler/Compiler');

const INK_DIR = join(process.cwd(), 'src', 'ink');

const inkFiles = readdirSync(INK_DIR).filter((f) => f.endsWith('.ink'));

if (inkFiles.length === 0) {
  console.log('No .ink files found in', INK_DIR);
  process.exit(0);
}

for (const file of inkFiles) {
  const inputPath = join(INK_DIR, file);
  const outputPath = join(INK_DIR, basename(file, '.ink') + '.json');

  console.log(`Compiling ${file}...`);
  const source = readFileSync(inputPath, 'utf-8');

  try {
    const story = new Compiler(source).Compile();
    const json = story.ToJson();
    writeFileSync(outputPath, json);
    console.log(`  → ${basename(outputPath)} ✓`);
  } catch (err) {
    console.error(`  ✗ Error compiling ${file}:`, err.message);
    process.exit(1);
  }
}

console.log('All ink files compiled successfully.');
