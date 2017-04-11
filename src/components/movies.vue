<template>
  <div class="movie">
    <section class="section in-theatre">
      <h1>
        <span>{{inTheatre.title}}</span>
        <router-link  :to="{name: 'movie-list', query: {type: inTheatre.type}}" class="more">更多>
        </router-link>
      </h1>
      <div class="box">
        <router-link class="item" :to="{name:'movie-detail',params:{id:item.id}}" v-for="item in inTheatre.subject">
          <img class="img" :src="item.img" alt="">
          <p class="info">{{item.title}}</p>
          <p class="mark">评分：<span>{{item.mark}}</span>/10</p>
        </router-link>
      </div>
    </section>

    <section class="section coming">
      <h1>
        <span>{{coming.title}}</span>
        <router-link :to="{name: 'movie-list', query: {type:coming.type}}" class="more">更多>
        </router-link>
      </h1>
      <div class="box">
        <router-link class="item" :to="{name:'movie-detail',params:{id:item.id}}" v-for="item in coming.subject">
          <img class="img" :src="item.img" alt="">
          <p class="info">{{item.title}}</p>
          <p class="mark">评分：<span>{{item.mark}}</span>/10</p>
        </router-link>
      </div>
    </section>
    <section class="section newM">
      <h1>
        <span>{{newM.title}}</span>
        <router-link :to="{name: 'movie-list', query: {type:newM.type}}" class="more">更多>
        </router-link>
      </h1>
      <div class="box">
        <router-link class="item" :to="{name:'movie-detail',params:{id:item.id}}" v-for="item in newM.subject">
          <img class="img" :src="item.img" alt="">
          <p class="info">{{item.title}}</p>
          <p class="mark">评分：<span>{{item.mark}}</span>/10</p>
        </router-link>
      </div>
    </section>
    <v-loading :show="loading"></v-loading>
  </div>
</template>

<script>
  import vLoading from './loading.vue'
  export default{
    components:{
      vLoading
    },
    data(){
      return{
        loading:true,
        title4:"000",
        inTheatre:{
          title:"",
          type:"in_theaters",
          subject:[]
        },
        coming:{
          title:"",
          type:"coming_soon",
          subject:[]
        },
        newM:{
          title:"",
          type:"top250",
          subject:[]
        }
      }
    },
    created:function(){
      var start = 0,count=8,that=this;

      function getIntheater(){
        return that.$http.post('/api/movie/in_theaters', {
          start: start,
          count:count
        })
      }
      function getComing(){
        return that.$http.post('/api/movie/coming_soon', {
          start: start,
          count:count
        })
      }
      function getTop(){
        return that.$http.post('/api/movie/top250', {
          start: start,
          count:count
        })
      }

      that.$http.all([getIntheater(), getComing(),getTop()])
      .then(that.$http.spread(function (a, b,c) {
        var inTheatreData = a.data,
            comingData = b.data,
            top250Data = c.data;

        that.inTheatre.title = inTheatreData.title;
        that.coming.title = comingData.title;
        that.newM.title = top250Data.title;

        for(var i = 0;i<8;i++){
          var obj1 = {},obj2={},obj3={};
          obj1.id=inTheatreData.subjects[i].id;
          obj1.title = inTheatreData.subjects[i].title;
          obj1.img = inTheatreData.subjects[i].images.medium;
          obj1.mark = inTheatreData.subjects[i].rating.average;


          obj2.id=comingData.subjects[i].id;
          obj2.title = comingData.subjects[i].title;
          obj2.img = comingData.subjects[i].images.medium;
          obj2.mark = comingData.subjects[i].rating.average;


          obj3.title=top250Data.subjects[i].id;
          obj3.id=top250Data.subjects[i].id;
          obj3.img = top250Data.subjects[i].images.medium;
          obj3.mark = top250Data.subjects[i].rating.average;

          that.coming.subject.push(obj2);
          that.inTheatre.subject.push(obj1);
          that.newM.subject.push(obj3)

        }
        that.loading=false;
      }))
      .catch(function(error) {
        console.log(error);
      });;
    }

  }
</script>
<style scoped>
  .movie{
    padding: 90px 3% 20px 3%;
  }
  .section{
    padding-bottom: 20px;
  }
  .section h1{
    padding: 20px 0;
    display: flex;
    justify-content: space-between;
  }
  .section h1>span{
    font-size: 16px;
    color: #111;
  }
  .section h1>a{
    font-size: 14px;
    color: #42bd56;
    text-decoration: none;
  }
  .box{
    position: relative;
    width: 100%;
    white-space: nowrap;
    overflow-x:scroll;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    overflow-y: hidden;
  }
  ::-webkit-scrollbar{
    width: 0;
    height: 0;
    display: none;
    background: transparent;
  }
  .item{
    width: 100px;
    display: inline-block;
    margin-right: 16px;
  }
  .item .img{
    display: block;
    width: 100px;
    height: 142px;
    margin: 0 auto;
  }
  .item .info{
    text-align: center;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-wrap: normal;
    font-size: 14px;
    padding-top: 10px;
    color: #111;
  }
  .item .mark{
    font-size: 12px;
    text-align: center;
    line-height: 22px;
    color: #111;
  }
  .item .mark>span{
    color: #ff4c2e;
  }
  .good-item{
    margin: 0 0 20px 0;
  }
  .good-item>a{
    display: inline-block;
    padding: 6px 10px;
    color: red;
    border: 1px solid red;
    margin-right: 20px;
  }
</style>
