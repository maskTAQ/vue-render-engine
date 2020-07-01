import Vue from 'vue'
import Router from 'vue-router'

import h5 from '@/h5.vue'
import canvas from '@/view/index.vue'


Vue.use(Router)

export default new Router({
    routes: [
        { path: '/', component: canvas },
        { path: '/h5', component: h5 },
    ]
}
)