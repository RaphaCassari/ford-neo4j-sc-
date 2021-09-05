import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        cpfUser: ''
    },
    getters: {
        getCpfUser({ cpfUser }) {
            return cpfUser;
        },
    },
    mutations: {
        setCpfUser(state, payload) {
            state.cpfUser = payload;
        },
    },
    actions: {},
    modules: {}
})