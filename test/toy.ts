import test from 'ava';
import { parse } from '../src/index.js';
import fs from 'node:fs';

const html = fs.readFileSync(new URL('./html/toy.html', import.meta.url)).toString();

test('toy parsing', async t => {
  const data = await parse(html);
  t.is(data.blocked, false);
});