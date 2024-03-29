import test from 'ava';
import { parse } from '../src/index.js';
import fs from 'node:fs';

const html = fs.readFileSync(new URL('./html/kindle.html', import.meta.url)).toString();

test('kindle parses', async t => {
  const results = await parse(html);
  const data = results.success ? results.data : undefined;

  if (!results.success) console.log(results.error); 
  t.is(results.success, true);
});