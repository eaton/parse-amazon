import { JsonTemplateObject } from "cheerio-json-mapper";
import { keyValueList } from "../util.js";

const template = [{
  $: "div.rpi-attribute-content",
  key: '| attr:id | split:- | last',
  label: '> .rpi-attribute-label span',
  value: '> .rpi-attribute-value | pad | text'
}] satisfies JsonTemplateObject[];

const schema = keyValueList;

export const carousel = { template, schema }