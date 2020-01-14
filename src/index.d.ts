/* interface MyWindow extends Window {
  [propName: string]: InjectedErrorObjects &
    InjectedInfoObjects &
    InjectedNonceVariables
} */

export interface InjectedErrorObjects {
  readonly errorcodes: ErrorCodes
  readonly errormetamap: ErrorMetaMap
}

export interface InjectedNonceVariables {
  readonly nonceKey?: string
  readonly ajaxNamespace?: string
  readonly nonce?: string
}

export interface InjectedInfoObjects {
  readonly infocodes: { [key: string]: number }
  readonly infometamap: { [key: number]: { message: string } }
}

export interface ErrorCodes {
  readonly UNKNOWN_ERROR: number
  [key: string]: number
}

export interface ErrorMetaMap {
  readonly [key: number]: { message: string }
}

export interface ErrorResponse {
  readonly code?: number
  readonly message: string
}

export interface GenericErrorResponse {
  readonly response: { data: ErrorResponse; status: number }
}
