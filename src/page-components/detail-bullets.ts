import { JsonTemplateObject } from "cheerio-json-mapper";
import { z } from 'zod';
import { optionalTrimmedString } from "../util.js";

const template = [{
  $: '#detailBullets_feature_div > ul > li span.a-list-item',
  label: 'span:nth-child(1) | split:\: | first | trim',
  value: 'span:nth-child(2)',
}] satisfies JsonTemplateObject[];

const schema = z.array(z.object({
  label: optionalTrimmedString,
  value: optionalTrimmedString,
}));

export const detailBullets = { template, schema }