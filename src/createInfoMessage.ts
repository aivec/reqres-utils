import { InjectedInfoObjects } from './types'

/**
 * Returns user facing info message returned by API call
 *
 * @remarks
 * This function requires corresponding `infocodes` and `infometamap` variables
 * set on the `globalObject` parameter if a message is not returned directly
 * by an API call. When a message is not returned, a lookup with the returned code
 * will return the corresponding message. If a code is not returned (ie. nothing),
 * an empty string will be returned. Note that an empty string should ideally never
 * be returned.
 *
 * @param globalObject - your project's global JS object
 * @param data - the response object returned by axios destructed via `const { data } = axios.method`
 * @returns the appropriate info message
 */
export default function(
  globalObject: InjectedInfoObjects,
  { code, message }: { code?: string | number; message?: string }
): string {
  const { infocodes, infometamap } = globalObject
  if (message) {
    if (message.length > 0) {
      return message
    }
  }

  if (code) {
    if (infocodes[code]) {
      return infometamap[infocodes[code]].message
        ? infometamap[infocodes[code]].message
        : ''
    }
  }

  return ''
}
