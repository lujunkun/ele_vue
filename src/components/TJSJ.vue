<template>
  <div class="shangJ">

    <h2 style="padding: 8px">推荐商家</h2>
    <div v-for="list in tuijian" class="court">
      <router-link :to="'/shop/' + list.id">
        <div class="shang-main">
          <div class="fleft">
            <img :src="list.image_path | toJpgs" alt="tu">
          </div>
          <div class="moddle">
            <h2>{{list.name}}</h2>
                <rater :value="list.rating" disabled :font-size="24"></rater>
                <span>{{list.rating}}</span><span style="margin-left: 8px ">月售{{list.recent_order_num}}单</span>
                <p style="margin: 6px 0 0 0"> ￥{{list.float_minimum_order_amount}}起送 /
                  {{list.piecewise_agent_fee.tips}}
                </p>
          </div>

          <div class="fright">
            <p>
           <span v-for="zi in list.supports" class="top"
                 style="border: 1px solid #666;border-radius: 3px;margin-left: 3px;">
             {{zi.icon_name}}
           </span>
            </p>
            <p style="margin: 15px 8px 15px 3px;height: 15px;float: right;width: 300px;">
           <span v-for="zi in list.supports" class="bot"
                 style="border: 1px solid blue;border-radius: 5px;margin-left: 5px; color: blue;">
             {{zi.name}}
           </span>
              <span style="background-color: blue;color: white;margin-left: 3px;border-radius: 3px;"
                    v-for=" liss in list.delivery_mode">{{liss | mathC}}</span>
            </p>
            <p>{{list.distance | foxed}} / <span style="color: blue;">{{list.order_lead_time}}分钟</span></p>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>
<script>
  import Vue from 'vue'
  Vue.filter("foxed", function (val) {
    val = val > 1000 ? (val / 1000).toFixed(2) + "km" : val + "m"
    return val
  })
  Vue.filter("mathC", function (val) {
    var html = ""
    for (var i = 0; i < val.length; i++) {
      var cha = val.charCodeAt(i)
      if (cha > 255) {
        html += val.charAt(i)
      }
    }
    return html
  })
  import {Rater, Group, Cell, Range} from 'vux'
  export default{
    components: {
      Rater,
      Group,
      Cell,
      Range
    },
    props: ["tuijian", "dili"],
    mounted: function () {

    },
    data(){
      return {
        dat: 3
      }
    }
  }

</script>
<style scoped>
  h2 {
    color: #444;
  }

  span {
    color: #666666;
  }

  .shang-main {
    position: relative;
  }

  .court {
    position: relative;
    border-top: 1px solid #999;
    padding-top: 8px;
  }

  .shangJ {
    background-color: white;
    margin-top: 9px;
    padding: 9px;
    position: relative;
  }

  .fleft {
    position: absolute;
    left: 0;
    top: 0;
  }

  .moddle {
    padding: 8px 145px 8px 90px;
  }

  .fleft img {
    width: 85px;
    height: 85px;
    margin-top: 16px;
    margin-right: 9px;
    position: relative;
  }

  .fright {
    position: absolute;
    bottom: 8px;
    right: 0;
    text-align: right;
    width: 140px;
    overflow: hidden;
  }

  h2 {
    padding-left: 8px;
  }
</style>
