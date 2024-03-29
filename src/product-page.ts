import { JsonTemplateObject } from 'cheerio-json-mapper';
import { z } from 'zod';
import {
  carousel,
  creator,
  detailBullets,
  expander,
  productDetails,
  productOverview
} from './page-components/index.js'

export const template: JsonTemplateObject = {
  // If we detect that we've been blocked, dial everything back.
  // Amazon limits requests to around 120/hour.
  blocked: '#g > div > a | attr:href',
  notfound: 'img#d | attr:alt',

  asin: 'input[name=asin],input[name=ASIN] | attr:value',
  url: 'link[rel=canonical] | attr:href',
  title: '#productTitle',
  creator: creator.template,

  format: 'div#formats div.selected span.slot-title > span, #tmmSwatches li.selected a > span:nth-child(1)', 
  series: '#seriesBulletWidget_feature_div',
  section: '#nav-search-dropdown-card option[selected]',

  image: {
    $: 'div.imgTagWrapper img',
    alt: '| attr:alt',
    src: '| attr:src',
    hires: '| attr:data-old-hires',
  },

  carousel: carousel.template,
  detailBullets: detailBullets.template,
  expander: expander.template,
  productDetails: productDetails.template,
  productOverview: productOverview.template
};

export const schema = z.object({
  blocked: z.string().optional().transform(b => !!b),
  notfound: z.string().optional().transform(b => !!b),

  asin: z.string().optional(),
  url: z.string().optional(),
  title: z.string().optional(),
  creator: creator.schema.optional(),

  format: z.string().optional(),
  series: z.string().optional(),
  section: z.string().optional(),

  image: z.object({
    alt: z.string().optional(),
    src: z.string().transform(s => s.replace(/._[A-Z0-9_]+_.jpg/, '.jpg')).optional(),
    hires: z.string().transform(s => s.replace(/._[A-Z0-9_]+_.jpg/, '.jpg')).optional(),
  }).optional(),

  carousel: carousel.schema.optional(),
  detailBullets: detailBullets.schema.optional(),
  expander: expander.schema.optional(),
  productDetails: productDetails.schema.optional(),
  productOverview: productOverview.schema.optional()
});

export const productPage = { template, schema };