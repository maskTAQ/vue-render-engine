import Vue from 'vue'
import Router from 'vue-router'

import auditBranch from '@/view/auditBranch/index.vue'

import h5 from '@/h5.vue'
import canvas from '@/view/index.vue'
import approval from '@/view/approval-set.vue'
import approvalflow from "@/view/Process.vue";

Vue.use(Router)

export default new Router({
    routes: [
        { path: '/', component: canvas },
        { path: '/h5', component: h5 },
        { path: '/auditBranch', component: auditBranch },
        { path: '/approval', component: approval },
        { path: '/approvalflow', component: approvalflow },
        
        
    ]
}
)