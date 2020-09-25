import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import axios from 'axios'

// Containers
const DefaultContainer = () => import('@/containers/DefaultContainer')

// Views
const Dashboard = () => import('@/views/Dashboard')
// Sub Views

const Login = () => import('@/views/login/Login')
const Register = () => import('@/views/login/Register')

// Users
Vue.use(Router)

const router = new Router({
  mode: 'hash', // https://router.vuejs.org/api/#mode
  linkActiveClass: 'open active',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/',
      name: 'Home',
      meta: { requiresAuth: true },
      component: DefaultContainer,
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: Dashboard
        },
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
  ]
})

router.beforeEach((to, from, next) => {
  // Insert authentication token to axios request
  if (store.state.token) {
    var authHeader = 'Bearer ' + store.state.token
    axios.defaults.headers.common['Authorization'] = authHeader
  } else {
    delete axios.defaults.headers.common['Authorization']
  }

  // Check if this route requires auth
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.state.token) {
      next()
    } else {
      router.push({ name: 'Login' })
    }
  } else {
    next()
  }
})

export default router
