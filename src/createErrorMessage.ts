import { InjectedErrorObjects, HttpError } from './types'

/**
 * Returns user facing error if it exists in error code map, displays default
 * error otherwise
 *
 * @remarks
 * This function requires corresponding `errorcodes` and `errormetamap` variables
 * set on the `globalObject` parameter in order to run properly
 *
 * @param globalObject - your project's global JS object
 * @param error - the error response object thrown by (axios, fetch, etc.)
 * @returns the appropriate error message
 */
export default function(
  globalObject: InjectedErrorObjects,
  error: HttpError | undefined,
  type: 'default' | 'debug' | 'admin' = 'default'
): string | string[] {
  const { errorcodes, errormetamap } = globalObject as InjectedErrorObjects
  const defaultMessage = errormetamap[errorcodes.UNKNOWN_ERROR].message

  if (!error || !error.response || !error.response.data) {
    return defaultMessage
  }

  const {
    response: {
      data: { errorcode, message, debug, adminmsg },
    },
  } = error

  // some error messages are generated with content dynamically, so a simple
  // code lookup wont suffice. Highest specificity first
  if (type === 'debug') {
    if (debug) {
      return debug
    }
  }
  if (type === 'admin' || type === 'debug') {
    if (adminmsg) {
      return adminmsg
    }
  }
  if (message) {
    return message
  }

  // code lookup fallback if message isn't provided
  if (errormetamap[errorcode]) {
    if (type === 'debug') {
      if (errormetamap[errorcode].debug) {
        return errormetamap[errorcode].debug
      }
    }
    if (type === 'admin' || type === 'debug') {
      if (errormetamap[errorcode].adminmsg) {
        return errormetamap[errorcode].adminmsg
      }
    }
    return errormetamap[errorcode].message || defaultMessage
  }

  return defaultMessage
}
