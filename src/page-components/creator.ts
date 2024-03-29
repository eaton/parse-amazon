import { JsonTemplateObject } from "cheerio-json-mapper";
import { z } from 'zod';

const optionalString = z.string().trim().transform(s => s.length ? s : undefined).optional()

const template = [{
  $: '#bylineInfo span.author',
  name: 'a',
  url: 'a | attr:href',
  role: '.contribution'
}] satisfies JsonTemplateObject[];

const schema = z.array(z.object({
  name: z.string(),
  role: optionalString.transform(r => r?.replace(/[\(\)]/g, '').toLocaleLowerCase()),
  url: optionalString.transform(u => u ? 'https://www.amazon.com' + u : undefined),
}));

export const creator = { template, schema }