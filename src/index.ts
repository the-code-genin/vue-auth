import Vue from 'vue'
import { VueConstructor } from 'vue/types/umd'
import { Route } from 'vue-router'
import StoreModule from './store'
import PluginOptions from './lib/plugin-options';


class Plugin<T extends Object> {
    install(vue: VueConstructor, options: PluginOptions<T>): void {
        // Get the store module name
        let storeModuleName = options.storeModuleName != null ? options.storeModuleName : 'Auth';

        // Register the store module
        options.store.registerModule(storeModuleName, StoreModule);


        // Add the mixin to return the currently logged in user in any vue instance
        vue.mixin(Vue.extend({
            computed: {
                authUser(): T|null {
                    if (!options.store) return null;
                    return options.store.getters[`${storeModuleName}/user`];
                }
            }
        }));


        // Register a before middleware for all routes
        options.router.beforeEach(async (to: Route, from: Route, next: Function): Promise<void> => {
            // Try to get the currently logged in user object.
            let user: T|null = null;
            try {
                user = await options.getUser();
                options.store.commit(`${storeModuleName}/setUser`, user);
            } catch(e) {
                // Empty
            }


            if (to.matched.some(route => route.meta.auth == true)) { // Check if route is auth protected.
                if (user != null) { // If user is logged in.
                    if (options.verified != null) { // Check if user must be verified to access the route.
                        if (to.matched.some(route => route.meta.verified == true) && !options.verified(user)) next(options.redirects.verifyAccount);
                        else next();
                    } else next();
                } else next(options.redirects.login);
            } else if(to.matched.some(route => route.meta.guest == true)) { // Check if only guests can visit a page.
                if (user == null) next();
                else next(options.redirects.dashboard);
            } else { // A regular route.
                next();
            }
        });


        // Register logout route.
        options.router.addRoutes([{
            name: options.logoutRoute.name,
            path: options.logoutRoute.path,

            beforeEnter: async (to: Route, from: Route, next: Function) => {
                try {
                    await options.logout();
                } catch(e) {
                    // Empty
                } finally {
                    options.store.commit(`${storeModuleName}/setUser`, null);
                    next(options.redirects.login);
                }
            }
        }]);
    }
}

export default Plugin;