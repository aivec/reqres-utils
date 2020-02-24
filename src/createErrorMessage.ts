import { ErrorCodes, ErrorMetaMap, GenericErrorResponse } from './index.d'

const makeDefaultError = (
  errorcodes: ErrorCodes,
  errormetamap: ErrorMetaMap
): GenericErrorResponse => {
  const { message } = errormetamap[errorcodes.UNKNOWN_ERROR]
  return {
    response: {
      data: { code: 500, message },
      status: 500,
    },
  }
}

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
): string {
  const { errorcodes, errormetamap } = (window as any)[namespace]
  let m = errormetamap[errorcodes.UNKNOWN_ERROR].message
  const defaultError = makeDefaultError(errorcodes, errormetamap)
  let err = error
  if (!err) {
    err = defaultError
  } else if (!err.response) {
    err = defaultError
  } else if (!err.response.data) {
    err = defaultError
  }
  const {
    response: {
      data: { code, message },
      status,
    },
  } = err
  // some error messages are generated with content dynamically, so a simple
  // code lookup wont suffice. Highest specificity first
  if (message) {
    m = message
    // code lookup fallback if message isn't provided
  } else if (errormetamap[code || 500]) {
    m = errormetamap[code || 500].message
    // for convenience, some low-level errors like 504s share the same code as
    // our custom error map, so we check here as a fallback
  } else if (errormetamap[status]) {
    m = errormetamap[status].message
  }

  return m
}
