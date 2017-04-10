<template>
  <div class="movie-detail">
    <h2 class="movie-title">{{movie.title}}</h2>
    <div class="comment"><p  class="comment-mark">评分：<span>{{movie.mark}}</span>/10</p><p class="comment-num">{{movie.comment}}人评价</p></div>
    <img src="../assets/1.jpg" class="movie-img" alt="">

    <div class="introduce">{{movie.introduce}}</div>

    <div class="btn-box"><div class="btn want-num">想看</div><div class="btn watched-num">看过</div></div>

    <p class="drama-title">{{movie.title}}的剧情介绍</p>
    <p class="drama-content">《攻壳机动队》由日本漫画家士郎正宗（Masamune Shirow）创作，故事设定在未来的日本。在未来社会，全世界被庞大信息网络连为一体，人类的各种组织器官均可被人造化。生化人、仿生人、人类共存在地球上，单凭肉眼无法识别。很多人的身体都有着与网络连接的端口（在脖子后面），身体纯粹成为了一个容纳人类灵魂的容器。在这样的背景下，犯罪活动也有了新的动向，日本国家公共安全委员会下属的秘密行动小组“攻壳机动队”就是专门为对付此类犯罪而成立的，由斯嘉丽•约翰逊饰演的主人公素子就是其中的一员。</p>
  </div>
</template>
<script>
export default{
  data(){
    return{
      loading:false,
      id:'',
      movie:{}
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
