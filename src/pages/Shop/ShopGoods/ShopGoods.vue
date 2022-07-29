<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper">
        <ul>
          <li class="menu-item"
              :class="{current: index === currentIndex}"
              v-for="(good, index) in goods" :key="index"
              @click="clickMenuItem(index)"
          >
            <img class="icon" :src="good.icon" v-if="good.icon">
            <span class="text bottom-border-1px">{{good.name}}</span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper">
        <ul ref="foodsUl">
          <li class="food-list-hook" v-for="(good,index) in goods" :key="index">
            <h1 class="title">{{good.name}}</h1>
            <ul>
              <li class="food-item bottom-border-1px"
                  v-for="(food, index) in good.foods" :key="index"
                  @click="showFood(food)">
                <div class="icon">
                  <img width="57" height="57"
                       :src="food.icon">
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售{{food.sellCount}}份</span>
                    <span>好评率{{food.rating}}%</span></div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span>
                    <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <CartControl :food="food"></CartControl>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <ShopCart></ShopCart>
    </div>
    <Food :food="food" ref="food"></Food>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import BScroll from 'better-scroll'
  import CartControl from '../../../components/CartControl/CartControl'
  import Food from '../../../components/Food/Food'
  import ShopCart from '../../../components/ShopCart/ShopCart'

  export default {
    name: 'ShopGoods',
    components: {
      CartControl,
      Food,
      ShopCart
    },
    data () {
      return {
        scrollY: 0, // 右侧滑动的的Y轴坐标
        tops: [], // 右侧分类的每个li的top值数组
        food: {}, // 需要显示的food
      }
    },
    mounted () {
      this.$store.dispatch('getShopGoods', () => {
        this.$nextTick(() => { //数据更新显示后执行
          this._initScroll()
          this._initTops()
        })
      })

    },
    computed: {
      ...mapState(['goods']),
      //计算得到当前分类的下标
      currentIndex () {
        // 得到条件数据
        const {scrollY, tops} = this
        // 根据条件计算得到一个结果
        const curIndex = tops.findIndex((top, index) => {

          return scrollY >= top && scrollY < tops[index + 1]
        })

        return curIndex
      },
    },
    methods: {
      //初始化滚动条
      _initScroll () {
        //列表显示之后创建
        new BScroll('.menu-wrapper', {
          click: true,
        })
        this.foodsScroll = new BScroll('.foods-wrapper', {
          probeType: 2,
          click: true, // 开启click事件。BScroll是默认关闭点击事件的。
        })

        //给右侧绑定scroll监听
        this.foodsScroll.on('scroll', ({x, y}) => {
          this.scrollY = Math.abs(y)
        })

        // 给右侧绑定滚动结束的监听
        this.foodsScroll.on('scrollEnd', ({x, y}) => {
          this.scrollY = Math.abs(y)
        })
      },

      //初始化tops
      _initTops () {
        //初始化tops
        const tops = []
        //记录当前li的值
        let top = 0
        tops.push(top)
        // 找到所有分类的li
        const lis = this.$refs.foodsUl.children
        Array.prototype.slice.call(lis).forEach(li => {
          top += li.clientHeight
          tops.push(top)
        })
        this.tops = tops
      },

      //给左侧栏添加点击事件
      clickMenuItem (index) {
        //根据左侧列表中的索引值，找到右侧top的值
        const scrollY = this.tops[index]
        this.scrollY = scrollY
        // 平滑滚动右侧列表
        this.foodsScroll.scrollTo(0, -scrollY, 300)
      },

      //展示food详情
      showFood (food) {
        // 设置food
        this.food = food
        // 显示food详情(父调用子，子传父)
        this.$refs.food.toggleShow()
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/mixins.styl"

  .goods
    display: flex
    position: absolute
    top: 275px
    bottom: 46px
    width: 100%
    background: #fff;
    overflow: hidden

    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7

      .menu-item
        display: table
        height: 54px
        width: 56px
        padding: 0 12px
        line-height: 14px

        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          color: $green
          font-weight: 700

          .text
            border-none()

        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat

        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          bottom-border-1px(rgba(7, 17, 27, 0.1))
          font-size: 12px

    .foods-wrapper
      flex: 1

      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7

      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        bottom-border-1px(rgba(7, 17, 27, 0.1))

        &:last-child
          border-none()
          margin-bottom: 0

        .icon
          flex: 0 0 57px
          margin-right: 10px

        .content
          flex: 1

          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)

          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)

          .desc
            line-height: 12px
            margin-bottom: 8px

          .extra
            .count
              margin-right: 12px

          .price
            font-weight: 700
            line-height: 24px

            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240, 20, 20)

            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147, 153, 159)

          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 12px
</style>


