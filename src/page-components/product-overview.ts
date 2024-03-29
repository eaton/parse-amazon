import { JsonTemplateObject } from "cheerio-json-mapper";
import { keyValueList } from "../util.js";

const template = [{
  $: '#productOverview_feature_div tr',
  key: '| attr:class | split: | index:1',
  label: 'th',
  value: 'td:nth-child(2)',
}] satisfies JsonTemplateObject[];

const schema = keyValueList

export const productOverview = { template, schema }