import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Blog from '../views/Blog.vue'
import BlogEdit from '../views/BlogEdit.vue'
import BlogDetail from '../views/BlogDetail.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Index',
        redirect:{name: "Blog"}
    },
    {
        path: '/blog',
        name: 'Blog',
        component: Blog
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/blog:blogId/edit',
        name: 'BlogEdit',
        component: BlogEdit
    },
    {
        path: '/blog:blogId',
        name: 'BlogDetail',
        component: BlogDetail
    },
    {
        path: '/blog/add',
        name: 'BlogAdd',
        meta: {
            requireAuth: true
          },
        component: BlogEdit
    },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
