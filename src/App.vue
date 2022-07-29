<template>
  <div id="app">
    <router-view></router-view>
    <FooterGuide v-if="$route.meta.showFooter"></FooterGuide>
  </div>
</template>

<script>
  import {mapActions} from 'vuex'
  import FooterGuide from './components/FooterGuide/FooterGuide.vue'

  export default {
    created () {
      // 异步获取address
      this.$store.dispatch('getAddress')
      // 异步获取登陆用户信息
      this.$store.dispatch('getUserInfo')
    },

    mounted () {
      this.$store.dispatch('getAddress')
    },
    components: {
      FooterGuide
    },

  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .app
    width: 100%
    height: 100%
    background: #f5f5f5;

</style>
