<template>
  <div>
    <ShopHeader></ShopHeader>
    <div class="tab">
      <div class="tab-item">
        <router-link to="/shop/goods" replace>点餐</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/shop/ratings" replace>评价</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/shop/info" replace>商家</router-link>
      </div>
    </div>
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
  import ShopHeader from '../../components/ShopHeader/ShopHeader'
  /*import ShopGoods from './ShopGoods/ShopGoods'
  import ShopRatings from './ShopRatings/ShopRatings'
  import ShopInfo from './ShopInfo/ShopInfo'*/
  export default {
    components: {
      ShopHeader,
      /*ShopGoods,
      ShopRatings,
      ShopInfo*/
    },
    mounted () {
      this.$store.dispatch('getShopInfo')
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .tab
    height 40px
    line-height 40px
    bottom-border-1px(rgba(7, 17, 27, 0.1))
    background-color: #fff;

    .tab-item
      float left
      width: 33.33333%
      text-align center
      font-size 14px
      color rgb(77, 85, 93)

      a
        display block

        &.router-link-active
          color #02a774
</style>
