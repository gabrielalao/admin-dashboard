// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'core-js/es6/promise'
import 'core-js/es6/string'
import 'core-js/es7/array'

const config = require('../config');
window.config = config;
// import cssVars from 'css-vars-ponyfill'
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import App from './App'
import router from './router'
import store from './store'
import Vuex from 'vuex'
import axios from 'axios'
import VueLoading from 'vuejs-loading-plugin'
import moment from 'moment'
// todo
// cssVars()

Vue.use(BootstrapVue)
Vue.use(Vuex)
Vue.use(VueLoading)

Vue.prototype.moment = moment

if (window.location.port === '8080' || window.location.port === '5000') {
  // This means you're running with `npm run serve` served at port 8080
  // Thus we need to connect to the backend running at port 8000
  axios.defaults.baseURL = config.LOCAL_API_LOCATION
}
else {
  axios.defaults.baseURL = config.SERVER_API_LOCATION
}

axios.defaults.headers.common['Authorization'] = 'Bearer ' + store.state.token;
axios.interceptors.response.use(response => {
  return response
}, error => {
  if (error.response.status === 401) {
    store.state.token = null
    router.push({ 'name': 'Login' })
  }
  return error
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: {
    App
  }
})
