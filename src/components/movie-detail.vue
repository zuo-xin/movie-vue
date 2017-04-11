<template>
  <div class="movie-detail">
    <h2 class="movie-title">{{movie.title}}</h2>
    <div class="comment"><p  class="comment-mark">评分：<span>{{movie.mark}}</span>/10</p><p class="comment-num">{{movie.comment}}人评价</p></div>
    <img :src="movie.img" class="movie-img" alt="">

    <div class="introduce">{{movie.introduce}}</div>

    <div class="btn-box"><div class="btn want-num">想看</div><div class="btn watched-num">看过</div></div>
    <p class="drama-title">{{movie.title}}的剧情介绍</p>
    <p class="drama-content">{{movie.drama_content}}</p>
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
      loading:false,
      id:'',
      movie:{
        title:"",
        mark:'',
        comment:'',
        img:'',
        introduce:'',
        drama_content:''
      }
    }
  },
  created(){
    this.id = this.$route.params.id;
    var that = this;
    this.loading = true;
    this.$http.post('/api/movie/subject/'+this.id)
    .then(function(response) {
      var data = response.data,
          act=[];
      that.movie.title = data.title;
      that.movie.mark = data.rating.average;
      that.movie.comment = data.comments_count;
      if(data.casts.length>0){
        for(let i = 0;i<data.casts.length;i++){
          act.push(data.casts[i].name)
        }
      }
      that.movie.introduce = data.countries.join(' / ') + ' / '+data.genres.join(' / ') + ' / '+data.directors[0].name +'(导演) / ' + act.join(' / ');
      that.movie.img = data.images.large;
      that.movie.drama_content = data.summary;
      that.loading = false;
    })
    .catch(function(error) {
      console.log(error);
      that.loading = false;
    });
  }
}
</script>
<style scoped>
  .movie-detail{
    padding: 90px 4% 20px 4%;
  }
  .movie-title{
    font-size: 24px;
    line-height: 40px;
  }
  .comment{
    display: flex;
    padding:6px 0;
    align-items: center;
    font-size: 14px;
  }
  .comment-mark{
    text-align: center;
    color: #494949;
    margin-right: 20px;
  }
  .comment-mark>span{
    color: #ff4c2e;
  }
  .comment-num{
    color: #aaa;
  }
  .movie-img{
    display: block;
    width:100%;
    margin: 12px auto;
  }
  .introduce{
    color: #494949;
    margin-top: 14px;
    padding-right: 24px;
    font-size: 14px;
    line-height: 1.6;
    text-align: justify;
  }
  .btn-box{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content:space-between;
    margin: 20px 0;
  }
  .btn-box .btn{
    width: 48%;
    padding:6px 10px;
    border:1px solid #ffb712;
    text-align: center;
    border-radius: 6px;
    color: #ffb712;
  }
  .drama-title{
    color: #aaa;
    margin-bottom:14px;
    font-size: 14px;
    text-align: justify;
  }
  .drama-content{
    font-size: 15px;
    color: #494949;
    line-height: 22px;
    text-align: justify;
  }
</style>
