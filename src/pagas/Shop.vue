<template>
    <div class="shop" >
      <shop-header :shopdata="roomdata"></shop-header>
      <shop-main :shopmess="roommessage" :shopping="roommessages" :assert="score" :taggs="tags"></shop-main>
      <!--<div v-for="dat in $route.params.data">{{ dat }}</div>-->
      <!--{{roomdata}} <br><br>-->
      <!--{{roommessages}}   星级评价-->


    </div>
</template>
<script>
//  https://h5.ele.me/shop/#geohash=ww0vsd0h80y3&id=1224236
  //https://h5.ele.me/shop/#geohash=ww0vsd0h80y3&id=2364573
//https://mainsite-restapi.ele.me/shopping/v2/menu?restaurant_id=805645   获取热销榜

import Geohash from '../js/geohash'
import bus from '../bus'
import ShopHeader from '../components/ShopHead'
import ShopMain from "../components/ShopMain"
    export default{
      data(){
        return {
          latitude: 34.72856,
          longitude: 113.75245,
          geo:'ww0vsd0h80y3',
          roomdata:[],
          roommessage:[],
          roommessages:[],
          score:[],
          tags:[]
        }

      },
      components: {
        ShopHeader,ShopMain
      },
      mounted:function () {
        this.getShop()
        this.getmess()
        this.getmessag()
        this.getsrcs()
        this.getsrcB()

//        var contentHeight = document.body.scrollHeight
//        var scrollTop =  document.body.scrollTop || document.documentElement.scrollTop
//        var windowH = window.innerHeight
//        if(scrollTop + windowH >= contentHeight){
//          this.getmessag()
//        }

//        console.log(this.$route.params.data)
      },
      methods:{
        getShop:function () {
          var that = this

              this.$http.get("/ele/shopping/restaurant/" + that.$route.params.id ,{
                  params: {
                    extras: ["activities", "album", "license", "identification", "statistics"],
                    latitude: 34.72856,
                    longitude: 113.75245
                  }
                  }).then(function (res) {
                if(res.status == 200 && res.statusText == "OK"){
              that.roomdata = res.data
            }else{
              alert("获取商铺信息失败")
            }
          })
        },
        getmess:function () {
          var that = this
          this.$http.get("/ele/shopping/v2/menu",{
              params:{
                restaurant_id:that.$route.params.id
              }
          }).then(function (res) {
//            console.log(res.data)
            if(res.status == 200 && res.statusText == "OK"){
              that.roommessage = res.data
            }else{
              alert("获取详情信息失败")
            }
          })
        },
        getmessag:function () {
          var that = this
          this.$http.get("/ele/ugc/v2/restaurants/" + that.$route.params.id + "/ratings",{
            params:{
              'has_content':true,
              offset:0,
              limit:10
            }
          }).then(function (res) {
            if(res.status == 200 && res.statusText == "OK"){
              that.roommessages = res.data
            }else{
              alert("获取评论信息失败")
            }
          })
        },
        getsrcs:function () {
          var that = this
          this.$http.get("/ele/ugc/v2/restaurants/" + that.$route.params.id + "/ratings/scores").then(function (res) {
//            console.log(res)
            if(res.status == 200 && res.statusText == "OK"){
              that.score = res.data
            }else{
              alert("获取评论信息失败")
            }
          })
        },
        getsrcB:function () {
          var that = this
//          ugc/v2/restaurants/700287/ratings/tags
          this.$http.get("/ele/ugc/v2/restaurants/" + that.$route.params.id + "/ratings/tags").then(function (res) {
//            console.log(res)
            if(res.status == 200 && res.statusText == "OK"){
              that.tags = res.data
            }else{
              alert("获取评论信息失败")
            }
          })
        }
      }
    }
</script>
<style scoped>
.shop{
  width: 100%;
  height: 100vh;
  overflow-x: hidden;
}
</style>
