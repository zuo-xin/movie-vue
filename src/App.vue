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

export default {
  name: 'app',
  components:{
    vHeader,
    vMovies
  }
}
</script>

<style>

</style>
