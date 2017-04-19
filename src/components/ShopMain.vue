<template>
  <div class="mains">
    <nav>
      <div class="nav-l" @click="ischoise = true"><span :class="{on:ischoise}">商品</span></div>
      <div class="nav-r" @click="ischoise = false"><span :class="{on:!ischoise}">评价</span></div>
    </nav>
    <div v-show="ischoise">

      <div class="main_l">
        <a v-for="(list,index) in shopmess" @click="showMeau(index)">
          <span v-if="list.icon_url"><img :src="list.icon_url | toJpgs" style="width: 13px;height: 13px;display: inline-block"></span>
          {{list.name}}
        </a>
      </div>

      <div class="main_r">
        <div v-for="lists in shopmess" class="blocks">
          <p class="main_r-t">
            <span>{{lists.name}}</span> <span v-if="lists.description">{{lists.description}}</span>
            <i class="fa fa-ellipsis-h fa-1x" v-if="lists.description " :title="lists.description"></i>
          </p>
          <section v-for="food in lists.foods">
            <img :src="food.image_path | toJpgs" alt="商铺" v-if="food.image_path">
            <img src="../assets/logo.png" v-else>
            <div>
              <h3>{{food.name}}</h3>
              <p class="decr"><span v-if="food.description">{{food.description}}</span></p>
              <p>{{food.tips}}</p>
            </div>
            <p class="sec-bot"><span>$</span>{{food.specfoods[0].price}}</p>
          </section>
        </div>
      </div>

    </div>
    <div class="shopping" v-show="!ischoise">
      <div class="assess-t">
        <div class="assess-t-l">
          <p v-if="assert.food_score">{{assert.food_score | tofix}} </p>
          <p>综合评价</p>
          <p v-if="assert.compare_rating">高于周边商家{{assert.compare_rating | tobai}}</p>
        </div>
        <div class="assess-t-r">
          <p>服务态度
            <rater slot="value" :value="assert.service_score" disabled></rater>
            {{assert.service_score | tofix}}
          </p>
          <p>菜品评价
            <rater slot="value" :value="assert.overall_score" disabled></rater>
            {{assert.overall_score | tofix}}
          </p>
          <p>送达时间 <span v-if="assert.deliver_time">{{assert.deliver_time}}分钟</span></p>
        </div>
      </div>
      <div class="assess-m">
        <div class="assess-nav">
          <!--{{taggs}}-->
          <span v-for="tag in taggs">{{tag.name}}( {{tag.count}}   )</span>
        </div>
        <div class="assess" v-for="ass in shopping">
          <img :src="ass.avatar | toJpgs" v-if="ass.avatar">
          <img src="../assets/index1.png" v-else>
          <div>
            <p>{{ass.username}}<span class="times">{{ass.rated_at}}</span></p>
            <p>
              <rater slot="value" :value="ass.rating_star" disabled></rater>
              <span v-if="ass.time_spent_desc">{{ass.time_spent_desc}}</span>
            </p>
            <p v-if="ass.rating_text">{{ass.rating_text}}</p>
            <p v-if="ass.reply_text">店家回复:{{ass.reply_text}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import Vue from "vue"
  import {Rater, Group, Cell, Range} from 'vux'
  //  import $ from "../js/jquery-3.1.1.min"
  Vue.filter("tofix", function (val) {
    return val.toFixed(2)
  })
  Vue.filter("tobai", function (val) {
    return (val * 100).toFixed(2) + "%"
  })

  export default{
    methods: {
      showMeau: function (index) {
        var as = document.querySelectorAll(".main_l a")
        var len = as.length
        for (var i = 0; i < len; i++) {
          as[i].className = ""
        }
        as[index].className = "foc"
        var offTop = document.querySelectorAll(".blocks")[index].offsetTop
        var scTop = document.querySelector(".main_r").scrollTop
        var arr = []
        var num = (offTop - scTop) / 700
        for (var i = 0; i <= 700; i++) {
          arr.push(scTop + num * i)
        }
        for (var i = 0; i < arr.length; i++) {
          var a = 0
          setTimeout(function () {
            document.querySelector("div.main_r").scrollTop = arr.shift()
          }, a++)
        }
      },
      change: function () {
        document.querySelector(".main_l a").className = "foc"
        document.querySelector("div.main_r").onscroll = function (){
          var ass = document.querySelectorAll(".main_l a")
          var divss = document.querySelectorAll(".blocks")
          var scTops = document.querySelector("div.main_r").scrollTop
          for (var j = 0; j < ass.length - 1; j++) {
            if (scTops >= divss[j].offsetTop && scTops < divss[j + 1].offsetTop) {
              for (var i = 0; i < ass.length; i++) {
                ass[i].className = ""
              }
              ass[j].className = "foc"
            }
            if (scTops >= divss[ass.length - 1].offsetTop) {
              for (var i = 0; i < ass.length; i++) {
                ass[i].className = ""
              }
              ass[ass.length - 1].className = "foc"
            }
          }
        }
        document.querySelector("div.shopping").onscroll = function () {

        }

      }
      },
      updated: function () {
        this.change()
    },
    components: {
      Rater,
      Group,
      Cell,
      Range
    },
    props: ["shopmess", "shopping", "assert", "taggs"],
    data(){
      return {
        ischoise: true
      }
    }
  }
</script>
<style scoped>
  * {
    box-sizing: border-box;
  }

  .mains {
    width: 100%;
    position: relative;
  }

  h3 {
    color: #444;
  }

  .main_l {
    width: 140px;
    height: calc(100vh - 260px);
    overflow-y: scroll;
    overflow-x: hidden;
    position: absolute;
    left: 0;
    top: 59px;
    z-index: 2;
  }

  .decr {
    font-size: 0.7rem;
  }

  .main_r {
    position: absolute;
    width: 100%;
    top: 59px;
    padding: 0 0 0 150px;
    background-color: whitesmoke;
    height: calc(100vh - 260px);
    overflow-y: scroll;
    overflow-x: hidden;
  }

  .shopping {
    width: 100%;
    /*padding: 8px;*/
    background-color: whitesmoke;
    height: calc(100vh - 260px);
    overflow-y: scroll;
    overflow-x: hidden;
  }

  nav {
    width: 100%;
    background-color: white;
    padding: 14px;
  }

  .nav-l, .nav-r {
    width: 49%;
    display: inline-block;
    text-align: center;
    font-size: 1.2rem;
  }

  .nav-l span, .nav-r span {
    padding: 8px 0;
    border-bottom: 3px solid white;
  }

  span.on {
    border-bottom: 3px solid cornflowerblue;
    color: cornflowerblue;
  }

  .main_l a.foc {
    font-weight: bold;
    border-left: 3px solid cornflowerblue;
    font-size: 1.4rem;
    background-color: whitesmoke;
  }

  .main_l a {
    display: block;
    width: 100%;
    padding: 18px 14px;
    font-size: 1.3rem;
    margin: 0;
    text-decoration: none;
    color: #666;
    border-bottom: 1px solid #555;
    background-color: #aaa;
  }

  .main_r-t {
    background-color: aliceblue;
    padding: 15px;
    margin: 0;
  }

  .main_r-t span:nth-of-type(1) {
    font-size: 1.4rem;
    font-weight: bold;
    color: #444;
  }

  .main_r-t span:nth-of-type(2) {
    font-size: 0.8rem;
  }

  .main_r-t .fa-ellipsis-h {
    float: right;
    position: relative;
    top: 8px;
  }

  .main_r section {
    padding: 28px 8px;
    /*height: 180px;*/
    overflow: hidden;
    position: relative;
    border-bottom: 1px solid #aaaaaa;
  }

  .main_r section img {
    float: left;
    width: 20vw;
    height: 20vw;
    border-radius: 5px;
    margin-right: 15px;
  }

  .main_r section h3 {
    margin: 0;
  }

  .main_r section > div {
    position: relative;
    padding-left: 22vw;
    /*height: 180px;*/
  }

  .main_r section p {
    margin: 0;
    padding: 5px 0;
    font-size: 1.2rem;
  }

  .main_r section p span {
    font-size: 1rem;
  }

  .sec-bot {
    position: absolute;
    bottom: 6px;
    left: 23vw;
    color: orangered;
    font-size: 1.1rem;
  }

  .shopping {
    color: #444;
    background-color: #666;
  }

  .shopping p {
    margin: 0;
    padding: 0;
  }

  .assess-t {
    padding: 13px;
    background-color: white;
  }

  .assess-t-l {
    display: inline-block;
    text-align: center;
    width: 140px;
    border-right: 1px solid #666;
  }

  .assess-t-l P:nth-of-type(1) {
    font-size: 1.8rem;
    color: coral;
  }

  .assess-t-l P:nth-of-type(2) {
    font-size: 1.2rem;
  }

  .assess-t-l P:nth-of-type(3) {
    font-size: 0.8rem;
  }

  .assess-t-r {
    display: inline-block;
    padding-left: 5%;
  }

  .assess-t-r p {
    font-size: 1.2rem;
  }

  .assess-m {
    margin-top: 8px;
    padding: 11px;
    background-color: white;
  }

  .assess-nav {
    padding: 13px;
    border-bottom: 1px solid #666;
  }

  .assess-nav span {
    display: inline-block;
    background-color: cornflowerblue;
    padding: 8px;
    border-radius: 5px;
    margin: 0 10px 10px 0;
  }

  .assess {
    border-bottom: 1px solid #666;
    padding: 15px 0;
  }

  .assess img {
    display: block;
    width: 55px;
    height: 55px;
    float: left;
    border-radius: 50%;

  }

  .assess > div {
    padding-left: 60px;
  }

  .assess > div > p {
    padding: 9px 0;
  }

  .times {
    float: right;
  }
</style>
