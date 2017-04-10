<template>
  <div class="movie-list" @scroll="loadMore" ref="movieList">
    <h2>{{listObj.title}}</h2>
    <!--  -->
    <div class="movie-box">
      <router-link class="item" :to="{name:'movie-detail',params:{id:item.id}}" v-for="item in listObj.subject">
        <img class="img" :src="item.img" alt="">
        <p class="info">{{item.title}}</p>
        <p class="mark">评分：<span>{{item.mark}}</span>/10</p>
      </router-link>
    </div>
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
      type:'',
      isScroll:false,
      listObj:{
        title:'',
        total:'',
        subject:[]
      }
    }
  },
  created:function(){
    var that = this;
    this.type = this.$route.query.type;

    let start = 0,
        count=20;
    this.$http.post('/api/movie/'+this.type,{
        start: start,
        count:count
    })
    .then(function(response) {
      var data = response.data;
      that.listObj.title = data.title;
      that.listObj.total = data.total;
      for (var i = 0; i < data.subjects.length; i++) {
        var obj = {};
        obj.id = data.subjects[i].id;
        obj.title = data.subjects[i].title;
        obj.img = data.subjects[i].images.medium;
        obj.mark = data.subjects[i].rating.average;
        that.listObj.subject.push(obj);
      }
      that.loading = false;
    })
    .catch(function(error) {
      console.log(error);
      that.loading = false;
    });
  },
  methods:{
    loadMore() {
      if ((this.$refs.movieList.scrollTop + this.$refs.movieList.clientHeight >= this.$refs.movieList.scrollHeight) && (this.listObj.total > this.listObj.subject.length) && (!this.isScroll)) {
          this.isScroll=true;
          this.loading = true;
          let start = this.listObj.subject.length,
              count=20,
              that = this;
          this.$http.post('/api/movie/'+this.type,{
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
              that.listObj.subject.push(obj);
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
.movie-list{
  position: fixed;
  top: 90px;
  overflow-y: auto;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 0 3% 20px 3%;
  -webkit-overflow-scrolling: touch;
}
.movie-list  h2{
  padding: 20px 0;
  display: flex;
  justify-content: space-between;
}
.movie-box{
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
