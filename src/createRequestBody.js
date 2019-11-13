import { merge } from 'lodash'

/**
 * Creates POST body for any AJAX request
 *
 * This builder function expects all keys from the array returned by getScriptInjectionVariables()
 * in the PHP package 'wordpress-router' to be defined on the window object for the namespace
 * provided to this function.
 * 
 * @auther Evan D Shaw <evandanielshaw@gmail.com>
 * @see https://github.com/aivec/wordpress-router/tree/master/Router.php {function getScriptInjectionVariables()}
 * @export
 * @param {object} payload
 * @param {string} route
 * @param {string} namespace window object namespace
 * @param {object} formPayload extra form fields to be merged with the final FormData object
 * @returns {FormData}
 */
export default function (payload, route, namespace, formPayload = {}) {
  const { nonceKey, ajaxNamespace, nonce } = window[namespace]
  const params = {
    [nonceKey]: nonce,
    [ajaxNamespace]: 1,
    route,
    payload: payload ? JSON.stringify(payload) : null,
  }
  merge(params, formPayload)
  const formData = new FormData()
  Object.keys(params).forEach((key) => formData.append(key, params[key]))

  return formData
}
