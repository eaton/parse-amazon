import { productPage } from './product-page.js';
import { pipeFns } from './pipes.js';
import { cheerioJsonMapper, JsonTemplateObject } from 'cheerio-json-mapper';
import { z } from 'zod';

export * from './product-page.js';

/**
 * Uses cheerio to extract structured data from markup
 */
export async function parse(
  input: string | Buffer,
  template: JsonTemplateObject = productPage.template,
  schema: z.AnyZodObject = productPage.schema,
): Promise<z.SafeParseReturnType<z.infer<typeof schema>,z.infer<typeof schema>>> {
  return cheerioJsonMapper(input.toString(), template, { pipeFns })
    .then(results => schema.safeParse(results))
}
