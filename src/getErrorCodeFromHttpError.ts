import { HttpError } from './types'

/**
 * Returns error code of the HTTP error if it contains a `GenericError` object
 *
 * @param error - the error response object thrown by (axios, fetch, etc.)
 * @returns the error code
 */
export default function(error: HttpError | undefined): string | number | null {
  if (
    error &&
    error.response &&
    error.response.data &&
    error.response.data.errorcode
  ) {
    return error.response.data.errorcode
  }

  return null
}
