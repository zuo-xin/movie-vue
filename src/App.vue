<template>
  <div id="app">
      <v-header></v-header>
      <router-view></router-view>
  </div>
</template>

<script>
import './assets/reset.css'
import vHeader from './components/header.vue'
import vMovies from './components/movies.vue'
import movieDetail from './components/movie-detail.vue'
import movieList from './components/movie-list.vue'
import movieSearch from './components/movie-search.vue'

export default {
  name: 'app',
  components:{
    vHeader,
    vMovies,
    movieDetail,
    movieList,
    movieSearch
  }
}
</script>

<style>

</style>
