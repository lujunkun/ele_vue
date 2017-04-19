<template>
  <div class="home">
     <home-header :geodata="geos" :dili="diLi" :weath="getWeas"></home-header>

    <fen-lei :fdata1="fldata1" :fdata2="fldata2"></fen-lei>

    <t-j-s-j :tuijian="sjdata" ></t-j-s-j>

    <div class="footer">
      <a href="#">
        <span class="fa fa-upload fa-3x" @click="backT" v-show="isshow"></span>
      </a>
      <tabbar>
        <tabbar-item selected link='/' show-dot>
          <img src="../assets/index1.png" slot="icon">
          <span slot="label">外卖</span>
        </tabbar-item> <tabbar-item>
        <img src="../assets/index2.png" slot="icon">
        <span slot="label">发现</span>
      </tabbar-item> <tabbar-item>
        <img src="../assets/index3.png" slot="icon">
        <span slot="label">订单</span>
      </tabbar-item> <tabbar-item>
        <img src="../assets/index4.png" slot="icon">
        <span slot="label">我的</span>
      </tabbar-item>
      </tabbar>

      <p style="text-align: center;margin-bottom: 26px;">loadering more ......</p>
    </div>

  </div>
</template>
<script>
  //1. https://mainsite-restapi.ele.me/v2/pois/ww0vsd0h80y3     获取路径
  //2. https://mainsite-restapi.ele.me/bgs/weather/current?latitude=34.72856&longitude=113.75245  经纬度获取天气
  //3. https://mainsite-restapi.ele.me/v2/index_entry?geohash=ww0vsd0h80y3&group_type=1&flags[]=F
  //4. https://web-ubt.ele.me/collect/log    post请求
  //5. https://mainsite-restapi.ele.me/bgs/weather/current?latitude=34.72856&longitude=113.75245
  //6. https://mainsite-restapi.ele.me/shopping/v3/hot_search_words?latitude=34.72856&longitude=113.75245
  //7. https://web-ubt.ele.me/collect/log    post请求
  //8. https://tc.koushuidang.cn/uc/iwi.htm    data:0   没用
  //9. https://tc.koushuidang.cn/uc/getUc.htm?channel=firefox-m-ksd  没用
  import { Tabbar, TabbarItem } from 'vux'
  import Geohash from '../js/geohash'
  import HomeHeader from '../components/HomeHeader'
  import FenLei from '../components/FenLei'
  import TJSJ from '../components/TJSJ'
  import bus from '../bus'
  export default{
      components:{
        HomeHeader,FenLei,Tabbar, TabbarItem,TJSJ
      },
    data(){
      return {
        latitude: 34.72856,
        longitude: 113.75245,
        geos:[],
        getWeas:[],
        fldata1:[],
        fldata2:[],
        sjdata:[],
        isshow:false,
        diLi:[ 34.72856,
          113.75245,
          0]
    }
    },
    computed: {
      geo(){
        return Geohash.encode(this.latitude, this.longitude, 12)
      }

    },
    mounted: function () {
      this.getPosi(),
        this.getWea(),
        this.getFl(),
        this.getSJ(),
        this.geosh()
    },
    methods: {
      geosh:function () {
        this.diLi = [this.latitude,this.longitude,this.geo]
      },
        backT:function () {
          this.isshow = false
        },
      getPosi: function () {
          var that = this
        this.$http.get("/ele/v2/pois/" + this.geo).then(function (res) {
//            console.log(res)
          if(res.status == 200 && res.statusText == "OK"){
            that.geos = res.data
//            console.log(that.geos.name)
          }else{
              alert("获取地址失败")
          }
        })
      },
      getWea:function () {
        var that = this
        this.$http.get("/ele/bgs/weather/current",{
            params: {
              latitude:that.latitude,
              longitude:that.longitude
            }
        }).then(function (res) {
//          console.log(res)
          if(res.status == 200 && res.statusText == "OK"){
            that.getWeas = res.data
            that.getWeas.image_hash = '//fuss10.elemecdn.com/' + that.getWeas.image_hash.substr(0,1) + '/' + that.getWeas.image_hash.substr(1,2) + '/' + that.getWeas.image_hash.substr(3) + '.' + that.getWeas.image_hash.substr(32)
//            console.log(res.data.image_hash)
          }else{
            alert("获取天气失败")
          }
        })
      },
      getFl:function () {
        var that = this
        this.$http.get("/ele/v2/index_entry",{
          params: {
            geohash:that.geo,
            groupType:1,
            flags:['Ft']
          }
        }).then(function (res) {
//          console.log(res)
          if(res.status == 200 && res.statusText == "OK"){
              var arr0 = res.data
              var arr1 = res.data
            var num = arr0.length
            that.fldata1 = arr0.splice(8,num)
            that.fldata2 = arr1.splice(0,8)
          }else{
            alert("获取商品分类失败")
          }
        })
      } ,
      getSJ:function () {
        var that = this
        this.$http.get("/ele/shopping/restaurants",{
            params:{
              latitude:that.latitude,
              longitude:that.longitude,
              offset:that.sjdata.length,
              limit:20,
              extras:['activities'],
              'terminal':'h5'
            }
        }).then(function (res) {
          if(res.status == 200 && res.statusText == "OK"){
              var arr = res.data
            that.sjdata = (that.sjdata).concat(arr)
          }else{
            alert("获取商品分类失败")
          }
        })
      },
      loadMore:function () {
        var that = this
        this.isshow = true
        var contentHeight = document.body.scrollHeight
        var scrollTop =  document.body.scrollTop || document.documentElement.scrollTop
        var windowH = window.innerHeight
        if(scrollTop == 0){
          this.isshow = false
        }
        if(scrollTop + windowH >= contentHeight ){
          this.$http.get("/ele/shopping/restaurants",{
            params:{
              latitude:that.latitude,
              longitude:that.longitude,
              offset:that.sjdata.length,
              limit:20,
              extras:['activities'],
              'terminal':'h5'
            }
          }).then(function (res) {
            if(res.status == 200 && res.statusText == "OK"){
              var arr = res.data
              that.sjdata = (that.sjdata).concat(arr)
            }else{
              alert("获取商品分类失败")
            }
          })
        }
      }
    },
    created:function () {
      window.onscroll = this.loadMore
    }
  }
</script>
<style scoped>
.footer{
  position: fixed;
  bottom: 0;
  width: 100%;
}
  .fa-upload{
    width: 69px;height: 69px;border-radius: 50%;border: 1px solid #999;padding: 10px;display: block;position: absolute;top: -85px;right: 8px;
    color: gray;text-align: center;
  }
</style>
