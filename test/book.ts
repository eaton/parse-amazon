import test from 'ava';
import { parse } from '../src/index.js';
import fs from 'node:fs';

const html = fs.readFileSync(new URL('./html/book.html', import.meta.url)).toString();

test('book parses', async t => {
  const results = await parse(html);
  const data = await parse(html);

  t.is(data.format, 'Paperback')
});