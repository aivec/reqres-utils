const makeDefaultError = (errorcodes, errormetamap) => {
  const m = errormetamap[errorcodes.UNKNOWN_ERROR].message
  return {
    response: {
      data: { code: 500, m },
      status: 500,
    },
  }
}

/**
 * Returns user facing error if it exists in error code map, displays default
 * error otherwise
 *
 * This function requires corresponding 'errorcodes' and 'errormetamap' variables
 * set on the window object for the given namespace to run properly
 *
 * @author Evan D Shaw <evandanielshaw@gmail.com>
 * @export
 * @param {Object} error
 * @param {String} namespace window object namespace
 * @returns {String}
 */
export default function (error, namespace) {
  const { errorcodes, errormetamap } = window[namespace]
  let m = errormetamap[errorcodes.UNKNOWN_ERROR].message
  const defaultError = makeDefaultError(errorcodes, errormetamap)
  let err = error
  if (!error) {
    err = defaultError
  } else if (!error.response) {
    err = defaultError
  } else if (!error.response.data) {
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
  } else if (errormetamap[code]) {
    m = errormetamap[code].message
    // for convenience, some low-level errors like 504s share the same code as
    // our custom error map, so we check here as a fallback
  } else if (errormetamap[status]) {
    m = errormetamap[status].message
  }
  return m
}
