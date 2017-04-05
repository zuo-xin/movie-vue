// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import Vue from 'vue'
import axios from 'axios'
import App from './App'
//import routes from './router/router.js'
import store from './store/store.js'


/* eslint-disable no-new */
Vue.use(VueRouter)

/*const router = new VueRouter({
  routes
});*/

new Vue({
 /*router,*/
  store,
  axios,
  render:h=>h(App)
}).$mount('#app');
