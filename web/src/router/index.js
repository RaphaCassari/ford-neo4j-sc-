import Vue from 'vue'
import VueRouter from 'vue-router'
import Form from '../components/Form.vue'
import viewCandidates from '../views/ViewCandidates.vue'
import Courses from '../views/Courses.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Form',
        component: Form
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/About.vue')
    },
    {
        path: '/viewCandidates',
        name: 'viewCandidates',
        component: viewCandidates
    },
    {
        path: '/courses',
        name: 'courses',
        component: Courses
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router