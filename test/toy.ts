import test from 'ava';
import { parse } from '../src/index.js';
import fs from 'node:fs';

const html = fs.readFileSync(new URL('./html/toy.html', import.meta.url)).toString();

test('movie details', async t => {
  const results = await parse(html);
  const data = results.success ? results.data : undefined;

  t.is(results.success, true);
});