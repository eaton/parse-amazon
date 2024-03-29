import test from 'ava';
import { parse } from '../src/index.js';
import fs from 'node:fs';

test('product not found', async t => {
  const html = fs.readFileSync(new URL('./html/404.html', import.meta.url)).toString();
  const data = await parse(html);

  t.is(data.notfound, true)
});

test('scraper blocked', async t => {
  const html = fs.readFileSync(new URL('./html/blocked.html', import.meta.url)).toString();
  const data = await parse(html);

  t.is(data.blocked, true)
});