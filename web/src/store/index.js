import Vue from 'vue'
import Vuex from 'vuex'
import folder from './modules/folder'


Vue.use(Vuex);

export default new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    modules: {
        folder: folder
    }
})
