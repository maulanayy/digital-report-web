import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

export default new Vuex.Store({
    modules: {

    },
    state: {
        userdata: null,
    },
    getters: {

    },
    mutations: {
        set_login(state, payload) {
            state.userdata = payload
        },
    },
    actions: {

    }
})