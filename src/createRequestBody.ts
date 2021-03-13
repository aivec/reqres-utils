import { merge } from 'lodash'
import { stringify } from 'qs'
import { InjectedRouterVariables } from './types'

/**
 * Creates POST body for any AJAX request
 *
 * @remarks
 * This builder function expects all keys from the array returned by `getScriptInjectionVariables()`
 * in the PHP package `wordpress-router` to be defined on the window object for the namespace
 * provided to this function.
 *
 * - function getScriptInjectionVariables() {@link https://github.com/aivec/wordpress-router/tree/master/src/Router.php}
 * - {@link https://github.com/ljharb/qs}
 * - {@link https://github.com/axios/axios#using-applicationx-www-form-urlencoded-format}
 *
 * @param namespace - window object key of your global JS object
 * @param payload - the request body object
 * @param formPayload - extra form fields to be merged with the final FormData object
 * @param raw - true: returns raw params object. false: returns qs stringified params
 * @returns raw request body object or stringified version
 */
export default function(
  namespace: string,
  payload: object = {},
  formPayload: object = {},
  raw = false
): Record<string, unknown> | string {
  const { nonceKey, nonce } = (window as any)[
    namespace
  ] as InjectedRouterVariables
  const params = {
    [nonceKey]: nonce,
    payload: payload ? JSON.stringify(payload) : null,
  }
  merge(params, formPayload)

  return raw === true ? params : stringify(params)
}
