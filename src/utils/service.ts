export enum ResponseStatus {
    BAD_REQUEST = 'BAD_REQUEST',
    NOT_FOUND = 'NOT_FOUND',
    INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
    UNAUTHORIZED = 'UNAUTHORIZED',
    OK = 'OK',
}

export interface IResponse {
    status: ResponseStatus
    data?: any[] | any
    message?: string
    errors?: string[]
    totalRegisters?: number
}