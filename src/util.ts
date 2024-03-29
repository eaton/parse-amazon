import { z } from 'zod';

export const optionalTrimmedString = z.string()
.transform(s => s?.replace('‏', '')?.replace('‎', '').trim())
.transform(s => s.length ? s : undefined)
  .optional();

export const keyValueList = z.array(z.object({
  key: z.string(),
  label: optionalTrimmedString,
  value: optionalTrimmedString,
}))
.transform(items =>
  Object.fromEntries(items.map(item => [item.key, { label: item.label, value: item.value }]))
);
