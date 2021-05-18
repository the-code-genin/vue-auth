import VueRouter, { RouteConfig } from "vue-router";
import { Store } from "vuex";

export interface GetUserFunction<T extends Object> {
    (): Promise<T>
}

export interface LogoutFunction {
    (): Promise<void>
}

export interface VerifiedFunction<T extends Object> {
    (user: T): Boolean
}

export default interface PluginOptions<T extends Object> {
    router: VueRouter,
    store: Store<{}>,
    storeModuleName: string|null,

    redirects: {
        login: RouteConfig,
        dashboard: RouteConfig,
        verifyAccount: RouteConfig,
        home: RouteConfig
    },

    logoutRoute: {
        name: string,
        path: string
    },

    getUser: GetUserFunction<T>,
    logout: LogoutFunction,
    verified: VerifiedFunction<T>|null
}