import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../pagas/HomeIndex'
import Shop from '../pagas/Shop'

Vue.use(VueRouter)

export default new VueRouter({
  routes:[
    {
    path: '/',
    component: Home
  },
    {
      path: '/shop/:id',
      component: Shop
    }
  ]
})
