import test from 'ava';
import { parse } from '../src/index.js';
import fs from 'node:fs';

const html = fs.readFileSync(new URL('./html/movie.html', import.meta.url)).toString();

test('movie parse', async t => {
  const data = await parse(html);
  t.is(data.blocked, false);
  t.is(data.format, '4K')
});