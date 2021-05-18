// Don't declare types in this file
import VueRouter from 'vue-router'
import { Route } from 'vue-router'
import { Store } from 'vuex'


export interface GetUserFunction<T extends Object> {
    (): Promise<T>
}

export interface LogoutFunction {
    (): Promise<void>
}

export interface VerifiedFunction<T extends Object> {
    (user: T): Boolean
}

export interface StateInterface {
    user: object|null
}

export interface PluginOptions<T extends Object> {
    router: VueRouter,
    store: Store<{}>,
    storeModuleName: string|null,

    redirects: {
        login: Route,
        dashboard: Route,
        verifyAccount: Route,
        home: Route
    },

    logoutRoute: {
        name: string,
        path: string
    },

    getUser: GetUserFunction<T>,
    logout: LogoutFunction,
    verified: VerifiedFunction<T>|null
}
