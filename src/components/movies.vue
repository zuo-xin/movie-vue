<template>
  <div class="movie">
    <section class="secion in-theatre">
      <h1>
        <span>{{title1}}</span>
        <!-- <router-link tag="span" :to="{name: 'movie-list', query: {type: type1}}" class="more">更多>
        </router-link> -->
      </h1>
      <div class="box"></div>
    </section>

    <section class="secion comming">
      <h1>
        <span>{{title2}}</span>
        <!-- <router-link tag="span" :to="{name: 'movie-list', query: {type:type2}}" class="more">更多>
        </router-link> -->
      </h1>
      <div class="box">
        <div class="aaa"></div>
        <div class="bbb"></div>
        <div class="ccc"></div>
      </div>
    </section>
  </div>
</template>

<script>
  export default{
    data(){
      return{
        "title1":"新片上映",
        "title2":"新片上映"
      }
    }
  }
</script>
<style>
  .movie{
    padding: 90px 3% 20px 3%;
  }
  .box{
    width: 100%;
    white-space: nowrap;
    overflow-x: auto;

  }
  .aaa{
    display: inline-block;
    width: 300px;
    height: 50px;
    background: red;
  }
  .bbb{
    display: inline-block;
    width: 300px;
    height: 50px;
    background: blue;
  }
  .ccc{
    display: inline-block;
    width: 300px;
    height: 50px;
    background: yellow;
  }
</style>
