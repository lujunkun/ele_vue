// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import App from './App'
import router from "./router/Router"
import {AjaxPlugin} from 'vux'
import "./assets/font-awesome-4.7.0/css/font-awesome.min.css"
// import "./assets/animate/animate.min.css"
// import $ from "./js/jquery-3.1.1.min"
Vue.filter("toJpgs",function ( val ) {
  // console.log(val)
    return '//fuss10.elemecdn.com/' + val.substr(0,1) + '/' + val.substr(1,2) + '/' + val.substr(3) + '.' + val.substr(32)
})


Vue.use(AjaxPlugin)
FastClick.attach(document.body)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
