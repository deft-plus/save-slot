import { camelCase } from 'lodash';

import hollowKnight from './presets/hollow-knight.json' with { type: 'json' };

/**
 * Array of all the available presets.
 */
export const PRESETS = [
  // All the presets are loaded from the public folder.
  camelCaseKeys<AppChecklist>(hollowKnight),
  camelCaseKeys<AppChecklist>({ ...hollowKnight, id: 'hollow-knight-2' }),
  camelCaseKeys<AppChecklist>({ ...hollowKnight, id: 'hollow-knight-3' }),
  camelCaseKeys<AppChecklist>({ ...hollowKnight, id: 'hollow-knight-4' }),
  camelCaseKeys<AppChecklist>({ ...hollowKnight, id: 'hollow-knight-5' }),
  camelCaseKeys<AppChecklist>({ ...hollowKnight, id: 'hollow-knight-6' }),
  camelCaseKeys<AppChecklist>({ ...hollowKnight, id: 'hollow-knight-7' }),
  camelCaseKeys<AppChecklist>({ ...hollowKnight, id: 'hollow-knight-8' }),
  camelCaseKeys<AppChecklist>({ ...hollowKnight, id: 'hollow-knight-9' }),
  camelCaseKeys<AppChecklist>({ ...hollowKnight, id: 'hollow-knight-10' }),
  camelCaseKeys<AppChecklist>({ ...hollowKnight, id: 'hollow-knight-11' }),
];

/**
 * Function turns all the keys from any case to camel case.
 */
function camelCaseKeys<T>(obj: unknown): T {
  // If array then map using recursion.
  if (Array.isArray(obj)) {
    return obj.map(camelCaseKeys) as T;
  }

  // If object then transform the keys and keep using recursion.
  if (obj !== null && typeof obj === 'object') {
    return Object.keys(obj).reduce(
      (acc, key) => ({ ...acc, [camelCase(key)]: camelCaseKeys(obj[key as keyof typeof obj]) }),
      {},
    ) as T;
  }

  return obj as T;
}
