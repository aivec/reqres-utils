/**
 * Returns user facing info message returned by API call
 *
 * @remarks
 * This function requires corresponding `infocodes` and `infometamap` variables
 * set on the `window` object for the given namespace if a message is not returned
 * by an API call. When a message is not returned, a lookup with the returned code
 * will return the corresponding message. If a code is not returned (ie. nothing),
 * an empty string will be returned. Note that an empty string should ideally never
 * be returned.
 *
 * @param data - the response object returned by axios destructed via `const { data } = axios.method`
 * @param namespace - `window` object key which contains your project's global JS object
 * @returns the appropriate info message
 */
export default function(
  { code, message }: { code?: string; message?: string },
  namespace: string
): string {
  const { infocodes, infometamap } = (window as any)[namespace]
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
