<template>
    <div class="header">
    <!--<div class="header" :style="{background: headerColor}">-->
          <p><span class="fa fa-angle-left fa-3x" @click="backs"></span></p>
      <div @click="showP">
        <div class="header_left" v-if="shopdata.image_path"><img :src="shopdata.image_path | toJpgs" alt=""></div>
        <div class="header_moddle">
          <h2>{{shopdata.name}}</h2>
          <!--{{shopdata}}-->
          <p>
            <span v-if="shopdata.delivery_mode">{{ shopdata.delivery_mode.text}} </span>
            <span v-else>商家配送 / </span> <span>{{shopdata.order_lead_time}}分钟送达 / </span>
            <span>配送费￥{{shopdata.float_delivery_fee}}</span></p>
          <p style="width: 50px;text-overflow: ellipsis;white-space: nowrap;">公告:{{shopdata.promotion_info}}</p>
        </div>
        <span class="fa fa-angle-right fa-2x"></span>
      </div>
      <p v-if="shopdata.activities"><span style="color: white;background-color: green;border-radius: 3px;padding: 0 3px ;">{{shopdata.activities[0].icon_name}}</span> <span>{{shopdata.activities[0].description}}</span> <span class="head_r">{{shopdata.activities.length}}个活动</span></p>
      <transition name="slide">
        <shop-side :data="shopdata" v-show="isshow" @show="isshow = false"></shop-side>
      </transition>

    </div>
</template>
<script>
  import ShopSide from "./ShopSide"
    export default{
        props:["shopdata","shopmess"],
      data:function(){
            return {
                istrue:false,
                colo:this.shopdata,
                isshow:false
            }
      },
      components:{
        ShopSide
      },
      mounted:function () {
        this.changeCol()
      },
      methods:{
          backs:function () {
            window.history.go( -1 )
          },
          showP:function () {
            this.isshow = !this.isshow
          },
        changeCol:function () {
          console.log(this.shopdata)
          
        }
      },
      computed:{
      	headerColor:function(){    		
      		var arr = ""
      		console.log(this.shopdata)
      		for(var i = 0;i < this.shopdata.supports.length;i++){
      			arr += ",#" + this.shopdata.supports.icon_color
      		}
      		arr = arr.substr(1)
      		console.log(arr)
      		var html = "linear-gradient(" + arr + ")" 
      		return html
//          return "linear-gradient(#999999,#999999)"
      	}
      }
    }
</script>
<style scoped>
  *{
    box-sizing: border-box;
  }
  .slide-enter, .slide-leave-active {
    opacity: 0;
    transform: translate(100%);
  }
  .slide-enter-active, .slide-leave-active {
    transition: all .7s
  }
  .header{
    /*background: linear-gradient(blue,blue);*/
    padding: 8px 8px 15px 8px;
    color: white;
    background-color: blueviolet;
    box-shadow: 1px 1px 2px blueviolet;
    width: 100%;
  }
  .header_left,.header_moddle{
    display: inline-block;
  }
  .header_left img{
    width: 94px;
    height: 94px;
    margin-right: 8px;
    border-radius: 5px;
  }
  .fa-angle-left{
    margin-left: 8px;
  }
  .fa-angle-right{
    display: block;
    float: right;
    position: relative;
    top:25px;
  }
  .head_r{
    float: right;
  }
  p{
    font-size: 1rem;
  }
</style>
