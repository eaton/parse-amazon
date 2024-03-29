import { JsonTemplateObject } from "cheerio-json-mapper";
import { z } from 'zod';
import { optionalTrimmedString } from "../util.js";

const template = [{
  $: '#prodDetails tr',
  label: 'th',
  value: 'td:nth-child(2)',
}] satisfies JsonTemplateObject[];

const schema = z.array(z.object({
  label: optionalTrimmedString,
  value: optionalTrimmedString,
}));

export const productDetails = { template, schema }