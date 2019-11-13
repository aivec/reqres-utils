import { merge } from 'lodash'
import { stringify } from 'qs'

/**
 * Creates POST body for any AJAX request
 *
 * This builder function expects all keys from the array returned by getScriptInjectionVariables()
 * in the PHP package 'wordpress-router' to be defined on the window object for the namespace
 * provided to this function.
 *
 * @auther Evan D Shaw <evandanielshaw@gmail.com>
 * @see https://github.com/aivec/wordpress-router/tree/master/Router.php {function getScriptInjectionVariables()}
 * @see https://github.com/ljharb/qs
 * @see https://github.com/axios/axios#using-applicationx-www-form-urlencoded-format
 * @export
 * @param {Object} payload
 * @param {String} route
 * @param {String} namespace window object namespace
 * @param {Object} formPayload extra form fields to be merged with the final FormData object
 * @param {String} routeNamespace
 * @param {Boolean} raw true: returns raw params object. false: returns qs stringified params
 * @returns {String|Object}
 */
export default function(
  payload,
  route,
  namespace,
  formPayload = {},
  routeNamespace = 'default',
  raw = false
) {
  const { nonceKey, ajaxNamespace, nonce } = window[namespace]
  const params = {
    [nonceKey]: nonce,
    [ajaxNamespace]: 1,
    namespace: routeNamespace,
    route,
    payload: payload ? JSON.stringify(payload) : null,
  }
  merge(params, formPayload)

  return raw === true ? params : stringify(params)
}
