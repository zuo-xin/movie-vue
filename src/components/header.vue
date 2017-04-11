<template>
  <div class="header">
    <div class="item">
      <a class="logo" href="/"></a>
      <div class="menu-box"><a class="menu" href="/movies">电影</a></div>
    </div>
  <div class="item search">
    <input v-model.trim="query" type="text" class="inp" @keyup.enter="search()" placeholder="请输入搜索内容">
    <img src="../assets/search.png" class="search-btn" @click="search()"/>
    </div>
  </div>
</template>
<script>
  export default{
    data(){
      return{
        query:"",
        path:"/movie/search"
      }
    },
    methods:{
      search(){
        if(this.query.length){
          this.$router.push({path:this.path,query:{query:this.query}});
          this.query="";
        }else{
          alert("请输入搜索内容");
        }

      }
    }
  }
</script>
<style scoped>
  .header{
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid #f3f3f3;
    position: fixed;
    width: 100%;
    z-index: 10;
  }
  .header .item{
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 42px;
    justify-content: space-between;
    padding: 6px 3%;
    background: #fff;
  }
  .logo{
    width: 42px;
    height: 22px;
    background: url(../assets/logo.png) no-repeat center;
    background-size: contain;
  }
  .menu{
    color: rgb(35, 132, 232);
    font-size: 14px;
  }
  .header .search{
    background: #f5f5f5;
  }
  .inp{
    border: none;
    outline: none;
    width: 100%;
    height: 100%;
    background: #f5f5f5;
  }
  .search-btn{
    width: 18px;
  }
</style>


