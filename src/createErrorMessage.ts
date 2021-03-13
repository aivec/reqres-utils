import { InjectedErrorObjects, GenericErrorResponse } from './types'

/**
 * Returns user facing error if it exists in error code map, displays default
 * error otherwise
 *
 * @remarks
 * This function requires corresponding `errorcodes` and `errormetamap` variables
 * set on the `window` object for the given namespace in order to run properly
 *
 * @param error - the error response object thrown by (axios, fetch, etc.)
 * @param namespace - `window` object key which contains your project's global JS object
 * @returns the appropriate error message
 */
export default function(
  error: GenericErrorResponse | undefined,
  namespace: string
): string | string[] {
  const { errorcodes, errormetamap } = (window as any)[
    namespace
  ] as InjectedErrorObjects
  const defaultMessage = errormetamap[errorcodes.UNKNOWN_ERROR].message

  if (!error || !error.response || !error.response.data) {
    return defaultMessage
  }

  const {
    response: {
      data: { errorcode, message },
    },
  } = error

  // some error messages are generated with content dynamically, so a simple
  // code lookup wont suffice. Highest specificity first
  if (message) {
    return message
  }

  // code lookup fallback if message isn't provided
  if (errormetamap[errorcode]) {
    return errormetamap[errorcode].message || defaultMessage
  }

  return defaultMessage
}
