<template>
  <section class="msite">
    <!--首页头部-->
    <HeaderTop :title="address.name">
      <router-link class="header_search" slot="search" to="/search">
        <i class="iconfont icon-sousuo"></i>
      </router-link>
      <router-link class="header_login" slot="login" :to="userInfo._id ? '/userinfo' : '/login'">
        <span class="header_login_text" v-if="userInfo._id">
          <i class="iconfont icon-person"></i>
        </span>
        <span class="header_login_text" v-else>
          登录|注册
        </span>
      </router-link>
    </HeaderTop>
    <!--首页导航-->
    <nav class="msite_nav">
      <div class="swiper-container" v-if="categories.length">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(categories,index) in categoriesArray" :key="index">
            <a href="javascript:" class="link_to_food" v-for="(category,index) in categories" :key="index">
              <div class="food_container">
                <!--                <img src="./images/nav/1.jpg">-->
                <img :src="imgBaseUrl + category.image_url">
              </div>
              <span>{{category.title}}</span>
            </a>
          </div>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
      </div>
      <img src="./images/msite_back.svg" alt="back" v-else>
    </nav>
    <!--首页附近商家-->
    <div class="msite_shop_list">
      <div class="shop_header">
        <i class="iconfont icon-xuanxiang"></i>
        <span class="shop_header_title">附近商家</span>
      </div>
      <ShopList></ShopList>
    </div>
  </section>
</template>


<script>
  import {mapState} from 'vuex'
  import HeaderTop from '../../components/HeaderTop/HeaderTop'
  import Swiper from 'swiper'
  import 'swiper/dist/css/swiper.min.css'
  import ShopList from '../../components/ShopList/ShopList'

  export default {
    mounted () {
      this.$store.dispatch('getCategories')
      this.$store.dispatch('getShops')
    },
    components: {
      HeaderTop,
      ShopList
    },
    data () {
      return {
        imgBaseUrl: 'https://fuss10.elemecdn.com'
      }
    },
    computed: {
      ...mapState(['address', 'categories','userInfo']),

      categoriesArray () {
        const {categories} = this
        const arr = []
        let smallArr = []
        categories.forEach(c => {
          //如果小数组装满了，需要重置为空数组
          if (smallArr.length === 8) {
            smallArr = []
          }
          // 如果小数组此时为空
          if (smallArr.length === 0) {
            //将小数组存到大数组中
            arr.push(smallArr)
          }
          //将当前分类保存到小数组中
          smallArr.push(c)

        })
        return arr
      }
    },
    watch: {
      // 监听食品分类数据的变化
      categories (value) {
        // 修改数据之后，会立即使用这个数据并等待DOM更新
        this.$nextTick(() => {
          //创建轮播图
          new Swiper('.swiper-container', {
            loop: true,
            //如果要是分页
            pagination: {
              el: '.swiper-pagination'
            }
          })
        })
      }
    }
  }
</script>


<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .msite
    width 100%

    .msite_nav
      bottom-border-1px(#e4e4e4)
      margin-top 45px
      height 200px
      background #fff

      .swiper-container
        width 100%
        height 100%

        .swiper-wrapper
          width 100%
          height 100%

          .swiper-slide
            display flex
            justify-content center
            align-items flex-start
            flex-wrap wrap

            .link_to_food
              width 25%

              .food_container
                display block
                width 100%
                text-align center
                padding-bottom 10px
                font-size 0

                img
                  display inline-block
                  width 50px
                  height 50px

              span
                display block
                width 100%
                text-align center
                font-size 13px
                color #666

        .swiper-pagination
          > span.swiper-pagination-bullet-active
            background #02a774

    .msite_shop_list
      top-border-1px(#e4e4e4)
      margin-top 10px
      background #fff

      .shop_header
        padding 10px 10px 0 10px

        .shop_icon
          margin-left 5px
          color #999

        .shop_header_title
          color #999
          font-size 14px
          line-height 20px
</style>
