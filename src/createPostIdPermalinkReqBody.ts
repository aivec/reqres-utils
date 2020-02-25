import { merge } from 'lodash'
import { stringify } from 'qs'

/**
 * Creates POST body for any AJAX request
 *
 * @remarks
 * This builder function expects all keys from the array returned by `getScriptInjectionVariables()`
 * in the PHP package `wordpress-router` to be defined on the `window` object for the namespace
 * provided to this function.
 *
 * - function getScriptInjectionVariables() {@link https://github.com/aivec/wordpress-router/tree/master/src/PostIdRouter.php}
 * - {@link https://github.com/ljharb/qs}
 * - {@link https://github.com/axios/axios#using-applicationx-www-form-urlencoded-format}
 *
 * @param namespace - `window` object key of your global JS object
 * @param route - the API route name
 * @param payload - the request body object
 * @param formPayload - extra form fields to be merged with the final FormData object
 * @param routeNamespace - namespace string key for route name
 * @param raw - true: returns raw params object. false: returns qs stringified params
 * @returns raw request body object or stringified version
 */
export default function(
  namespace: string,
  route: string,
  payload: object,
  formPayload: object = {},
  routeNamespace = 'default',
  raw = false
): object | string {
  const { nonceKey, ajaxNamespace, nonce } = (window as any)[namespace]
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
