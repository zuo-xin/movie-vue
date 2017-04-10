<template>
  <div class="loading" v-show="show">
    <div class="loading-mask"></div>
    <img class="loading-img" src="../assets/loading2.gif" alt="">
  </div>
</template>


<script>
  export default{
    props:['show']
  }
</script>
<style scoped>
  .loading{
    position: fixed;
    left: 0;
    top: 84px;
    right: 0;
    bottom: 0;
    z-index: 1000;
  }
  .loading-mask{
    position: relative;
    width: 100%;
    height: 100%;
    background: #fff;
    opacity: 0.2;
  }
  .loading-img{
    position: absolute;
    display: block;
    width: 60%;
    left: 50%;
    top: 50%;
    -webkit-transform: translate(-50%,-80%);
    transform: translate(-50%,-80%);
  }
</style>
