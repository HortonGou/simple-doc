import Vue from 'vue'
import Router from 'vue-router'

import Home from './components/Home'
import Doc from './components/Doc'

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/doc/:folderName',
            name: 'doc',
            component: Doc,
            props: true
        },
        {
            path: '*',
            name: 'home',
            component: Home
        }
    ]
})
