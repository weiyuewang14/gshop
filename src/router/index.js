/*
路由器模块
 */
import Vue from 'vue'
import VueRouter from 'vue-router'

import Msite from '../pages/Msite/Msite.vue'
import Search from '../pages/Search/Search.vue'
import Order from '../pages/Order/Order.vue'
import Profile from '../pages/Profile/Profile.vue'
import Login from '../pages/Login/Login'

// 路由懒加载
const Shop = ()=> import( '../pages/Shop/Shop')
const ShopGoods = ()=> import( '../pages/Shop/ShopGoods/ShopGoods')
const ShopRatings = ()=> import( '../pages/Shop/ShopRatings/ShopRatings')
const ShopInfo = ()=> import( '../pages/Shop/ShopInfo/ShopInfo')


/*
import Shop from '../pages/Shop/Shop'
import ShopGoods from '../pages/Shop/ShopGoods/ShopGoods'
import ShopRatings from '../pages/Shop/ShopRatings/ShopRatings'
import ShopInfo from '../pages/Shop/ShopInfo/Shoconst
* */

// 声明使用路由
Vue.use(VueRouter)

export default new VueRouter({
  //所有的路由
  routes: [
    {
      path: '/',
      redirect: '/msite'
    },
    {
      path: '/msite',
      component: Msite,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/search',
      component: Search,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/order',
      component: Order,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/profile',
      component: Profile,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/login',
      component: Login,
    },
    {
      path: '/userinfo',
      // component: UserInfo,
    },
    {
      path: '/shop',
      component: Shop,
      children:[
        {
          path:'/shop/goods',
          component:ShopGoods,
        },
        {
          path: '/shop/ratings',
          component: ShopRatings
        },
        {
          path: '/shop/info',
          component: ShopInfo
        },
        {
          path: '',
          redirect:'/shop/goods'
        }
      ]
    }
  ]
})

