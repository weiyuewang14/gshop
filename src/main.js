import Vue from 'vue'
import app from './app'
import router from './router'
import store from './store'
import './mock/mockServer'
import './filters' //加载过滤器
import {Button} from 'mint-ui'
// import VueLazyload from 'vue-lazyload'
import Split from './components/Split/Split'

//注册全局组件标签
Vue.component(Button.name, Button)
Vue.component('Split', Split)
/*Vue.use(VueLazyload,{//内部自定义一个属性：v-lazy
  loading
})*/

new Vue({
  el: '#app',
  render: h => h(app),
  router,
  store
})
