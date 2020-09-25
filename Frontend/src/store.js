import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        token: null,
        // tokenId: null
    },
    mutations: {
        storeToken (state, token) {
            state.token = token
        },
        storeUser (state, user) {
            state.user = user
        },
        // storeTokenId (state, tokenId) {
        //     state.tokenId = tokenId
        // },
        clearToken (state) {
            state.token = null
        },
        // clearTokenId (state) {
        //     state.tokenId = null
        // }
    },
    actions: {
        storeToken (context, data) {

            context.commit('storeToken', data)
            // context.commit('storeTokenId', data.token_id)
        },
        clearToken (context) {
            context.commit('clearToken')
            // context.commit('clearTokenId')
        },
        storeUser (context, data) {
            context.commit('storeUser', data)
            // context.commit('storeTokenId', data.token_id)
        }
    },
    plugins: [createPersistedState()]
})
