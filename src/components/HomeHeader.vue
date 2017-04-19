<template>
    <div class="headerN">
      <div class="map">
           <i class="fa fa-map-marker"></i>
          <span> {{geodata.name}}</span>
          <i class="fa fa-sort-desc"></i>
      </div>
      <div class="weather">
        <div class="tem">
          <strong>{{weath.temperature}}<sup>o</sup></strong>
          <span>{{weath.description}}</span>
        </div>
          <div class="weaIm">
            <img :src="weath.image_hash" alt="天气">
          </div>
      </div>
      <input type="search" id="mySearch" placeholder="搜索商家,商品">
    </div>
</template>
<script>
  import { Search } from 'vux'
    export default{
     props:["geodata","weath"]
    }
</script>
<style scoped>
  *{
    box-sizing: border-box;
  }
.headerN{
  width: 100%;
  color: white;
  background-color: #0096ff;
  padding: 11px;
  position: relative;
}
.map{
  width: 80%;
}
.map span{
  font-size: 1.6rem;
  font-weight: bold;
}
  .fa-map-marker{
    font-size: 1.6rem;
    margin-left: 11px;
  }
.fa-sort-desc{
  position: relative;
  top:-8px;
}
  .weather{
    position: absolute;
    right: 11px;
    top:12px;
  }
  .tem {
    float: left;

  }
.tem span{
  display: block;
  font-size: 0.8rem;
}
.weaIm{
  float: left;
}
.weaIm img{
  margin-left: 6px;
  width: 40px;
  }
  #mySearch{
    display: block;
    font-size: 1.3rem;
    width: 97%;
    margin: 20px auto;
    border-radius: 1.6rem;
    text-align: center;
    padding: 11px;
    border:none;
  }
</style>
