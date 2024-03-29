import test from 'ava';
import { parse } from '../src/index.js';
import fs from 'node:fs';

const html = fs.readFileSync(new URL('./html/kindle.html', import.meta.url)).toString();

test('kindle parses', async t => {
  const data = await parse(html);
  t.is(data.blocked, false);
});