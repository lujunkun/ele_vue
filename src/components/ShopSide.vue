<template>
    <div class="side">
        <header>
          <h2><span class="fa fa-angle-left fa-2x" @click="back"></span> 商家详情</h2>
        </header>
      <section class="att">
        <h3>活动与属性</h3>
        <p v-for="datas in data.activities" >
           <span style="background-color: blue;color: white">{{datas.icon_name}}</span>
          <span>{{datas.description}}</span>
        </p>
      </section>
      <section>
        <h3>商家信息</h3>
        <p >{{data.promotion_info}}</p>
        <p >地址:{{data.address}}</p>
        <p >营业时间:{{data.opening_hours}}</p>
        <p >营业执照</p>
        <p >就餐许可证</p>
      </section>
    </div>
</template>
<script>
  import bus from "../bus"
    export default{
      props:["data"],
        methods:{
            back:function () {
              this.$emit("show")
            }
        }
    }
</script>
<style scoped>
  .fa-angle-left{
    display: block;
    float: left;
  }
  .att p:nth-of-type(1) span:nth-of-type(1){
    background-color: green !important;
  }
  .side{
    width: 100%;
    height: 100vh;
    position: fixed;
    z-index: 5;
    background-color: #999;
    top: 0;
    left: 0;
    overflow: hidden;
  }
  header{
    padding: 15px 8px;
    background-color: blue;
    width: 100%;
    color: white;
  }
   header h2{
     text-align: center;
   }
  section{
    padding: 8px;
    margin-top: 9px;
    background-color: white;
    color: #666666;
    margin: 21px 0;
  }
  section p{
    padding: 18px 0 ;
    font-size: 1.2rem;
    border-top: 1px solid #999;
  }
  h3{
    margin: 18px 0;
    font-size: 1.6rem;
    color: black;
  }
</style>
