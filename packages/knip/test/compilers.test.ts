import { test } from 'bun:test';
import assert from 'node:assert/strict';
import { main } from '../src/index.js';
import { join, resolve } from '../src/util/path.js';
import baseArguments from './helpers/baseArguments.js';
import baseCounters from './helpers/baseCounters.js';

const cwd = resolve('fixtures/compilers');

test('Support compiler functions in config', async () => {
  const { issues, counters } = await main({
    ...baseArguments,
    cwd,
  });

  assert(issues.files.has(join(cwd, 'unused.css')));
  assert(issues.files.has(join(cwd, 'unused.md')));
  assert(issues.files.has(join(cwd, 'package.json')));
  assert(issues.files.has(join(cwd, 'tsconfig.json')));

  assert.deepEqual(counters, {
    ...baseCounters,
    files: 4,
    processed: 14,
    total: 14,
  });
});
