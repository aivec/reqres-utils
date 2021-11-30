import { InjectedErrorObjects, HttpError } from './types'
import createErrorMessage from './createErrorMessage'

/**
 * Returns admin facing error if it exists in error code map, displays debug, user, or default
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
  error: HttpError | undefined
): string | string[] {
  return createErrorMessage(globalObject, error, 'admin')
}
