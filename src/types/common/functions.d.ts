// Declare functions

export interface GetUserFunction<T extends Object> {
    (): Promise<T>
}

export interface LogoutFunction {
    (): Promise<void>
}

export interface VerifiedFunction<T extends Object> {
    (user: T): Boolean
}
