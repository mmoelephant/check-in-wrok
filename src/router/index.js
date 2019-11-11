import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    component: Index
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login.vue')
  },
  {
    path: '/applyfor',
    name: 'applyfor',
    component: () => import('../views/apply-for.vue')
  },
  {
    path: '/applylist',
    name: 'applylist',
    component: () => import('../views/apply-records.vue')
  },
  {
    path: '/applydetail',
    name: 'applydetail',
    component: () => import('../views/apply-detail.vue')
  },
  {
    path: '/usercenter',
    name: 'usercenter',
    component: () => import('../views/user-center.vue')
  },
  {
    path: '/rules',
    name: 'rules',
    component: () => import('../views/rules.vue')
  },
  {
    path: '/aboutus',
    name: 'aboutus',
    component: () => import('../views/about-us.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  if(to.name != 'login'&& to.name != 'rules') {
    const userid = localStorage.getItem('userid')
    const user = JSON.parse(localStorage.getItem('user'))
    if(userid && user && user.username) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})
export default router
