<template>
  <div class="movie-search" @scroll="loadMore" ref="searchList">
    <h2 class="title">{{searchList.title}}</h2>

    <div class="list-box" v-if="searchList.subject.length>0">
       <router-link class="item" :to="{name:'movie-detail',params:{id:item.id}}" v-for="item in searchList.subject">
        <img class="img" :src="item.img" alt="">
        <p class="info">{{item.title}}</p>
        <p class="mark">评分：<span>{{item.mark}}</span>/10</p>
      </router-link>
    </div>
    <div class="nodata" v-else>没有找到"{{query}}"相关的内容</div>
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
        query:"",
        isScroll:false,
        searchList:{
          title:"",
          total:'',
          subject:[]
        }
      }
    },
    created(){
      this.getData()
    },
    watch: {
      '$route': 'getData'
    },
    methods:{
      getData(){
        this.loading = true;
        this.searchList.subject=[];
        this.query = this.$route.query.query;
        let start = 0,
            count=20,
            that=this;
        this.$http.post('/api/movie/search',{
            q:that.query,
            start: start,
            count:count
        })
        .then(function(response) {
          var data = response.data;
          that.searchList.title = data.title;
          that.searchList.total = data.total;
          for (var i = 0; i < data.subjects.length; i++) {
            var obj = {};
            obj.id = data.subjects[i].id;
            obj.title = data.subjects[i].title;
            obj.img = data.subjects[i].images.medium;
            obj.mark = data.subjects[i].rating.average;
            that.searchList.subject.push(obj);
          }
          that.loading = false;
        })
        .catch(function(error) {
          console.log(error);
          that.loading = false;
        });
      },
      loadMore() {
        if ((this.$refs.searchList.scrollTop + this.$refs.searchList.clientHeight >= this.$refs.searchList.scrollHeight) && (this.searchList.total > this.searchList.subject.length) && (!this.isScroll)) {
            this.isScroll=true;
            this.loading = true;
            let start = this.searchList.subject.length,
                count=20,
                that = this;
            this.$http.post('/api/movie/search',{
                q:that.query,
                start: start,
                count:count
            })
            .then(function(response) {
              var data = response.data;
              for (var i = 0; i < data.subjects.length; i++) {
                var obj = {};
                obj.id = data.subjects[i].id;
                obj.title = data.subjects[i].title;
                obj.img = data.subjects[i].images.medium;
                obj.mark = data.subjects[i].rating.average;
                that.searchList.subject.push(obj);
              }
              that.loading = false;
              that.isScroll = false;

            })
            .catch(function(error) {
              console.log(error);
              that.loading = false;
              that.isScroll=false;
            });
        }
      }
    }
  }
</script>
<style scoped>
  .movie-search{
    position: fixed;
      top: 90px;
      overflow-y: auto;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 0 3% 20px 3%;
      -webkit-overflow-scrolling: touch;
  }
  .movie-search .title{
    font-size: 14px;
    font-weight: normal;
    box-sizing: border-box;
    max-width: 660px;
    margin: 15px auto;
    padding: 0 4%;
    color: #8e8e8e;
  }
  .nodata{
    font-size: 14px;
    font-weight: normal;
    box-sizing: border-box;
    max-width: 660px;
    margin: 15px auto;
    padding: 0 4%;
    color: #8e8e8e;
  }
  .list-box{
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    -ms-flex-direction: row;
    flex-direction: row;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    justify-content: flex-start;
    -webkit-box-align:stretch;
    -ms-flex-align:stretch;
    align-items:stretch;
  }
  .item{
    width: 33.3%;
    padding-bottom: 20px;
  }
  .item .img{
    display: block;
    width: 92%;
    height: 150px;
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
</style>
