export interface InjectedErrorObjects {
  readonly errorcodes: ErrorCodes
  readonly errormetamap: ErrorMetaMap
}

export interface InjectedRouterVariables {
  readonly nonce: string
  readonly nonceKey: string
  readonly nonceField: string
  readonly endpoint: string
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
