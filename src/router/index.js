import Vue from 'vue'
import Router from 'vue-router'
import App from '../App'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      component:App.components.vMovies,
      name:'index'
    },
    {
      path:'/movie',
      component:App.components.vMovies,
      name:'movie'
    }
  ]
})