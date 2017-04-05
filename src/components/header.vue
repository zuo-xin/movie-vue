<template>
  <div id="TalionNav">
    <header class="TalionNav">
      <div class="TalionNav-primary">
        <nav>
          <ul>
            <li><a href="#/movies" style="color:#2384E8">电影</a></li>
          </ul>
          <span class="search"></span>
        </nav>
      </div>
    </header>
    <div class="search">
      <input type="text" class="search-input" v-model.trim="query" @keyup.enter="search()" name="search" placeholder="请输入搜索内容">
      <img src="../assets/search-btn.png" class="search-btn" @click="search()" alt=""/>
    </div>
  </div>

</template>

<script></script>

<style scoped lang="scss">
  .serch{
    background:#fff;
    margin-top:47px;
    position:relative;
    .search-input{
      -webkit-appearance:none;
      border:0;
      outline:0;
      background:#f5f5f5;
      padding:10px 5px;
      width:100%;
    }
    .search-btn{
      width:20px;
      position:absolute;
      right:5px;
      top:9px;
    }
  }
  .TalionNav{
    position:fixed;
    left:0;
    right:0;
    top: 0;
    z-index: 9999;
    background: #fff;
    a{
      text-decoration: none;
    }
    .TalionNav-primary{
      border-bottom: 1px solid #f3f3f3;
      -webkit-box-pack:justify;
      -ms-flex-pack: justify;
      justify-content: space-between;
      align-items: center;
      padding:0 18px;
      background: #fff;
      height: 47px;
      box-sizing: border-box;
      display: -webkit-box;display: -ms-flexbox;display: flex;

    }
  }
</style>
