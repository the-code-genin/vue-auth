import { StateInterface } from "./types/common/interfaces";

let state: StateInterface = {
    user: null
};


export default {
    namespaced: true,

    state,

    getters: {
        /**
         * Get the current loggd in user object.
         */
        user(state: StateInterface) {
            return state.user;
        }
    },

    mutations: {
        /**
         * Set the current logged in user object.
         */
        setUser(state: StateInterface, user: object|null) {
            state.user = user;
        }
    },

    actions: {
        // empty
    }
}