import Vue from 'vue'
import Vuex from 'vuex'
import {get } from "@/utils/http"
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        row: {},
        isFromDetail: false,
        role: ""
    },
    getters: {},
    mutations: {
        setRow(state, payload) {
            state.row = payload
        },
        clearRow(state) {
            state.row = {}
        },
        changeIsFromDetail(state, payload) {
            state.isFromDetail = payload
        },
        setRole(state, payload) {
            state.role = payload
        }
    },
    actions: {
        //异步的
        async getRole({ commit }) {
            let { role } = await get("/getRole");
            commit("setRole", role)
        }
    },
    modules: {}
})