<template>
    <div>
      <swiper auto height="260px" dots-position="center">
        <swiper-item class="black">
          <div class="title fadeInUp animated">
            <section v-for="data in fdata2">
              <img :src="'//fuss10.elemecdn.com/' + data.image_url" alt="小图">
              <p>{{data.title}}</p>
            </section>
          </div>
        </swiper-item>
        <swiper-item class="black">
          <div class="title fadeInUp animated">
            <section  v-for="data1 in fdata1">
              <img :src="'//fuss10.elemecdn.com/' + data1.image_url" alt="小图">
              <p>{{data1.title}}</p>
            </section>
          </div>
        </swiper-item>
      </swiper>
    </div>
</template>
<script>
  import { Swiper, SwiperItem } from 'vux'
    export default{
      components:{
        Swiper,SwiperItem
      },
        props:["fdata1","fdata2"]
    }
</script>
<style scoped>
  *{
    box-sizing: border-box;
  }
  .black {
    background-color:#fff;
  }
  .title{
    text-align: left;
  }
  .title p{
    text-align: center;
    font-size: 1.1rem;
    color: #444;
  }
  .animated {
    animation-duration: 1s;
    animation-fill-mode: both;
  }
  section{
    width: 25%;
    padding: 8px;
    display: inline-block;
    text-align: center;
  }
  section img{
    width: 65px;
    height: 65px;
  }
  div.vux-indicator-right{
    right:50vw;
  }

  @-webkit-keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translate3d(0, 100%, 0);
    }
    100% {
      opacity: 1;
      transform: none;
    }
  }
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translate3d(0, 100%, 0);
    }
    100% {
      opacity: 1;
      transform: none;
    }
  }
  .fadeInUp {
    animation-name: fadeInUp;
  }
</style>
