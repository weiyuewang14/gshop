<template>
  <div class="ratings" ref="ratings">
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{info.score}}</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{info.rankRate}}%</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <Stars :score="info.serviceScore" :size="36"/>
            <span class="score">{{info.serviceScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评分</span>
            <Stars :score="info.foodScore" :size="36"/>
            <span class="score">{{info.foodScore}}</span></div>
          <div class="delivery-wrapper">
            <span class="title">送达时间</span>
            <span class="delivery">{{info.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>

      <Split></Split>

      <RatingSelect
        :descs="{all: '全部', positive:'满意', negative: '不满意'}"
        :ratings="ratings"
        :selectType="selectType"
        :onlyContent="onlyContent"
        @toggleOnlyContent="toggleOnlyContent"
        @setSelectType="setSelectType"/>

      <div class="rating-wrapper">
        <ul>
          <li class="rating-item" v-for="(rating, index) in filterRatings" :key="index">
            <div class="avatar">
              <img width="28" height="28" :src="rating.avatar">
            </div>
            <div class="content">
              <h1 class="name">{{rating.username}}</h1>
              <div class="star-wrapper">
                <Stars :score="rating.score" :size="24"/>
                <span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}</span>
              </div>
              <p class="text">{{rating.text}}</p>
              <div class="recommend">
                <span class="iconfont" :class="rating.rateType === 0 ? 'icon-thumb_up' : ' icon-thumb_down'"></span>
                <span class="item" v-for="(rec, index) in rating.recommend" :key="index">{{rec}}</span>
              </div>
              <div class="time">{{rating.rateTime | dateString}}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import BScroll from 'better-scroll'
  import Stars from '../../../components/Stars/Stars'
  import Split from '../../../components/Split/Split'
  import RatingSelect from '../../../components/RatingSelect/RatingSelect'
  import {ratingsMixin} from '../../../common/utils/mixins'

  export default {
    name: 'ShopRatings',
    mixins:[ratingsMixin],
    components: {
      Stars,
      Split,
      RatingSelect
    },
    data () {
      return {
        onlyContent: true, // 是否只显示带内容的评价，默认为true
        selectType: 2, // 显示哪种评价，0：满意，1：不满意，2：全部
      }
    },
    mounted () {
      this.$store.dispatch('getShopRatings', () => {
        this.$nextTick(() => {
          this.scroll = new BScroll(this.$refs.ratings, {
            click: true
          })
        })
      })
    },
    computed: {
      ...mapState(['info', 'ratings']),
      /*filterRatings () {
        const ratings = this.ratings
        if (!ratings) {
          return []
        }
        const {selectType, onlyContent} = this
        return ratings.filter(rating => {
          const {rateType, text} = rating
          /!*
          selectType: 2, //全部         // rating.rateType(0/1)
          onlyContent: true // 是否只看有内容的  //rating.text
           *!/
          /!*
          selectType: 0/1/2   如果是0/1需要判断是否与rating.rateType相等, 如果是2就不需要
          onlyContent: true/false  如果为true需要判断rating.text必须有值, 如果是false就不需要
           *!/
          if (selectType === 2) {
            return !onlyContent || rating.text.length > 0
          } else {
            return selectType === rateType && (!onlyContent || rating.text.length > 0)
          }
        })
      }*/
    },
    /*methods: {
      setSelectType (selectType) {
        this.selectType = selectType
        this.$nextTick(() => {
          this.scroll.refresh()
        })
      },
      toggleOnlyContent () {
        this.onlyContent = !this.onlyContent
        this.$nextTick(() => {
          this.scroll.refresh()
        })
      }
    },*/
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/mixins.styl"

  .ratings
    position: absolute
    top: 275px
    bottom: 0
    left: 0
    width: 100%
    overflow: hidden

    .overview
      display: flex
      margin-bottom: 10px
      padding: 18px 0
      background-color: #fff;

      .overview-left
        flex: 0 0 137px
        padding: 6px 0
        width: 137px
        border-right: 1px solid rgba(7, 17, 27, 0.1)
        text-align: center
        @media only screen and (max-width: 320px)
          flex: 0 0 120px
          width: 120px

        .score
          margin-bottom: 6px
          line-height: 28px
          font-size: 24px
          color: rgb(255, 153, 0)

        .title
          margin-bottom: 8px
          line-height: 12px
          font-size: 12px
          color: rgb(7, 17, 27)

        .rank
          line-height: 10px
          font-size: 10px
          color: rgb(147, 153, 159)

      .overview-right
        flex: 1
        padding: 6px 0 6px 24px
        @media only screen and (max-width: 320px)
          padding-left: 6px

        .score-wrapper
          margin-bottom: 8px
          font-size: 0

          .title
            display: inline-block
            line-height: 18px
            vertical-align: top
            font-size: 12px
            color: rgb(7, 17, 27)

          .star
            display: inline-block
            margin: 0 12px
            vertical-align: top

          .score
            display: inline-block
            line-height: 18px
            vertical-align: top
            font-size: 12px
            color: rgb(255, 153, 0)

        .delivery-wrapper
          font-size: 0

          .title
            line-height: 18px
            font-size: 12px
            color: rgb(7, 17, 27)

          .delivery
            margin-left: 12px
            font-size: 12px
            color: rgb(147, 153, 159)

    .rating-wrapper
      padding: 0 18px
      background-color: #fff;

      .rating-item
        display: flex
        padding: 18px 0
        bottom-border-1px(rgba(7, 17, 27, 0.1))

        .avatar
          flex: 0 0 28px
          width: 28px
          margin-right: 12px

          img
            border-radius: 50%

        .content
          position: relative
          flex: 1

          .name
            margin-bottom: 4px
            line-height: 12px
            font-size: 10px
            color: rgb(7, 17, 27)

          .star-wrapper
            margin-bottom: 6px
            font-size: 0

            .star
              display: inline-block
              margin-right: 6px
              vertical-align: top

            .delivery
              display: inline-block
              vertical-align: top
              line-height: 12px
              font-size: 10px
              color: rgb(147, 153, 159)

          .text
            margin-bottom: 8px
            line-height: 18px
            color: rgb(7, 17, 27)
            font-size: 12px

          .recommend
            line-height: 16px
            font-size: 0

            .icon-thumb_up, .icon-thumb_down, .item
              display: inline-block
              margin: 0 8px 4px 0
              font-size: 9px

            .icon-thumb_up
              color: $yellow

            .icon-thumb_down
              color: rgb(147, 153, 159)

            .item
              padding: 0 6px
              border: 1px solid rgba(7, 17, 27, 0.1)
              border-radius: 1px
              color: rgb(147, 153, 159)
              background: #fff

          .time
            position: absolute
            top: 0
            right: 0
            line-height: 12px
            font-size: 10px
            color: rgb(147, 153, 159)
</style>


