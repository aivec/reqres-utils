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
  readonly infocodes: { [key: string]: number | string }
  readonly infometamap: { [key: number]: { message: string } }
}

export interface GenericError {
  readonly debug: string | string[]
  readonly message: string | string[]
  readonly adminmsg: string | string[]
  readonly errorcode: string | number
  readonly errorname: string
  readonly data?: any
}

export interface ErrorCodes {
  readonly UNKNOWN_ERROR: number | string
  readonly INTERNAL_SERVER_ERROR: number | string
  readonly [key: string]: number | string
}

export interface ErrorMetaMap {
  readonly [key: string]: GenericError
}

export interface GenericErrorResponse {
  readonly response: { data: GenericError; status: number }
}
