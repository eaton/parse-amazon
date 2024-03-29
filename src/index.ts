import { z } from 'zod';
import { extract } from '@eatonfyi/markup';

const azTrimmedString = z.string()
  .transform(s => s?.replace('‏', '')?.replace('‎', '').trim())
  .transform(s => s.length ? s : undefined)
  .optional();

const keyValueLabelList = z.array(z.object({
  key: z.string(),
  label: azTrimmedString,
  value: azTrimmedString,
}))
.transform(items =>
  Object.fromEntries(items.map(item => [item.key, { label: item.label, value: item.value }]))
);

const keyValueList = z.array(z.object({
  label: azTrimmedString,
  value: azTrimmedString,
}))
.transform(items =>
  Object.fromEntries(items.map(item => [item.label, item.value ]))
);


export const template = {
  // If we detect that we've been blocked, dial everything back.
  // Amazon limits requests to around 120/hour.
  blocked: '#g > div > a | attr:href',
  notfound: 'img#d | attr:alt',

  asin: 'input[name=asin],input[name=ASIN] | attr:value',
  url: 'link[rel=canonical] | attr:href',
  title: '#productTitle',
  creator: [{
    $: '#bylineInfo span.author',
    name: 'a',
    url: 'a | attr:href',
    role: '.contribution'
  }],

  format: 'div#formats div.selected span.slot-title > span, #tmmSwatches li.selected a > span:nth-child(1)', 
  series: '#seriesBulletWidget_feature_div',
  section: '#nav-search-dropdown-card option[selected]',

  image: {
    $: 'div.imgTagWrapper img',
    alt: '| attr:alt',
    src: '| attr:src',
    hires: '| attr:data-old-hires',
  },

  carousel: [{
    $: "div.rpi-attribute-content",
    key: '| attr:id | split:- | last',
    label: '> .rpi-attribute-label span',
    value: '> .rpi-attribute-value | pad | text'
  }],
  detailBullets: [{
    $: '#detailBullets_feature_div > ul > li span.a-list-item',
    label: 'span:nth-child(1) | split:\: | first | trim',
    value: 'span:nth-child(2)',
  }],
  expander: [{
    $: '#poExpander tr',
    key: '| attr:class | split: | index:1',
    label: 'th',
    value: 'td:nth-child(2)',
  }],
  productDetails: [{
    $: '#prodDetails tr',
    label: 'th',
    value: 'td:nth-child(2)',
  }],
  productOverview: [{
    $: '#productOverview_feature_div tr',
    key: '| attr:class | split: | index:1',
    label: 'th',
    value: 'td:nth-child(2)',
  }]
};

export const schema = z.object({
  blocked: z.string().optional().transform(b => !!b),
  notfound: z.string().optional().transform(b => !!b),

  asin: z.string().optional(),
  url: z.string().optional(),
  title: z.string().optional(),
  creator: z.array(z.object({
    name: z.string(),
    role: azTrimmedString.transform(r => r?.replace(/[\(\)]/g, '').toLocaleLowerCase()),
    url: azTrimmedString.transform(u => u ? 'https://www.amazon.com' + u : undefined),
  })).optional(),

  format: z.string().optional(),
  series: z.string().optional(),
  section: z.string().optional(),

  image: z.object({
    alt: z.string().optional(),
    src: z.string().transform(s => s.replace(/._[A-Z0-9_]+_.jpg/, '.jpg')).optional(),
    hires: z.string().transform(s => s.replace(/._[A-Z0-9_]+_.jpg/, '.jpg')).optional(),
  }).optional(),

  carousel: keyValueLabelList.optional(),
  detailBullets: keyValueList.optional(),
  expander: keyValueLabelList.optional(),
  productDetails: keyValueList.optional(),
  productOverview: keyValueLabelList.optional()
});

export async function parse(html: string) {
  return extract(html, template, schema);
}