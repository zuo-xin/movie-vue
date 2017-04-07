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
    },
    {
      path:'/movie/list',
      component:App.components.movieList,
      name:'movie-list'
    },
    {
      path:'/movie/search',
      component:App.components.movieSearch,
      name:'movie-search'
    },
    {
      path:'/movie/subject/:id',
      component:App.components.movieDetail,
      name:'movie-detail'
    }
  ]
})
