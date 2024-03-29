import test from 'ava';
import { parse } from '../src/index.js';
import fs from 'node:fs';

test('product not found', async t => {
  const html = fs.readFileSync(new URL('./html/404.html', import.meta.url)).toString();
  const results = await parse(html);
  const data = results.success ? results.data : undefined;

  t.is(results.success, true);
  t.is(data?.notfound, true)
});

test('scraper blocked', async t => {
  const html = fs.readFileSync(new URL('./html/blocked.html', import.meta.url)).toString();
  const results = await parse(html);
  const data = results.success ? results.data : undefined;

  t.is(results.success, true);
  t.is(data?.blocked, true)
});