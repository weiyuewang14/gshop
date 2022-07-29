# day01
## 1. 项目开发准备
    项目描述
        -- 项目是做什么的？前后端分离的移动端外卖项目）
        -- 有哪些功能模块？
        -- 用到什么技术？axios网络请求，
        -- 开发模式：模块化，组件化，工程化
    技术选型
        -- 主要用的哪些技术？前后端交互（ajax）
    API接口
        -- 接口包含请求链接、请求方式、请求参数的格式和响应数据的格式
        -- 接口文档，需要先测试，然后查看是否一致
    你能从此项目中学到什么?
        -- 开发方式
        -- 使用的库

## 2. 开启项目开发
    使用脚手架创建项目
    安装所有依赖/指定依赖
    开发环境运行
    生产环境打包与发布

## 3. 搭建项目整体界面结构
    stylus的理解和使用
        结构化, 变量, 函数/minxin(混合)
    vue-router的理解和使用
        router-view/router-link
        $router: 路由器对象, 包含一些操作路由的功能函数, 来实现编程式导航(跳转路由)
        $route: 当前路由对象, 一些当前路由信息数据的容器, path/meta/query/params
    项目路由拆分
    底部导航组件: FooterGuide
    导航路由组件: Msite/Search/Order/Profile

## 4. 抽取组件
    头部组件: HeaderTop, 通过slot来实现组件通信标签结构
    商家列表组件: ShopList

## 5. 登陆路由组件
     静态组件
     FooterGuide的显示/隐藏: 通过路由的meta

# day02
## 1. 完成功能
	运行后台项目(启动mongodb服务), 使用postman测试后台接口
	封装ajax:
		promise+axios封装ajax请求的函数
		封装每个接口对应的请求函数(能根据接口定义ajax请求函数)
		解决ajax的跨越域问题: 配置代理, 对代理的理解
	vuex编码
		创建所有相关的模块: store/index|state|mutations|actions|getters|mutation-types
		设计state: 从后台获取的数据
		实现actions:
			定义异步action: async/await
			流程:　发ajax获取数据, commit给mutation
		实现mutations: 给状态赋值
		实现index: 创建store对象
		    Vue.use(Vuex)
            export default new Vuex.Store({
              state,
              mutations,
              actions,
              getters
            })
		main.js: 配置store
	组件异步显示数据
		在mounted()通过$store.dispatch('actionName')来异步获取后台数据到state中
		mapState(['xxx'])读取state中数据到组件中
		在模板中显示xxx的数据
	模板中显示数据的来源
		data: 自身的数据(内部改变)
		props: 外部传入的数据(外部改变)
		computed(计算属性): 根据data/props/别的compute/state/getters
	ShopList组件/Star组件


## 1. 重要问题
    1). 如何查看你的应用是否发送某个ajax请求?
        浏览器的network
    2). 发ajax请求404
        请求的路径的对
        代理是否生效(配置和重启)
        服务器应用是否运行
    3). 后台返回了数据, 但页面没有显示?
        vuex中是否有
        组件中是否读取

## 2. 异步显示轮播图:
    1). 通过vuex获取foodTypes数组(发请求, 读取)
    2). 对数据进行整合计算(一维变为特定的二维数组)
    3). 使用Swiper显示轮播, 如何在界面更新之后创建Swiper对象?
        1). 使用回调+$nextTick()
        2). 使用watch+$nextTick()

## 3. 登录组件
    1). 获取验证码样式变化
        -- 正则
    2). 倒计时效果
        -- 循环定时器
    3). 密码显示隐藏的切换
    4). 验证码图片效果

# day03
## 1. 功能
	登录/注册组件
	搭建商家整体界面
	模拟(mock)数据/接口
	开发ShopHeader组件

## 2. 登陆/注册
    1). 2种方式
        手机号/短信验证码登陆
        用户名/密码/图片验证码登陆
    2). 登录的基本流程
        表单前台验证, 如果不通过, 提示（自定义组件）
        发送ajax请求, 得到返回的结果
        -- 成功：返回用户信息，保存至vuex中的state中
        根据结果的标识(code)来判断登陆请求是否成功
            1: 不成功, 显示提示
            0. 成功, 保存用户信息, 返回到上次路由
        -- 自动登录，发送请求
    3). vue自定义事件
        绑定监听: @eventName="fn"  function fn (data) {// 处理}
        分发事件: this.$emit('eventName', data)
    4). 注意:
        使用network查看请求(路径/参数/响应数据)
        使用vue的chrome插件查看vuex中的state和组件中的数据
        使用“debugger”语句调用代码
        实参类型与形参类型的匹配问题
        变量名

## 3. 搭建商家整体界面
    1). 拆分界面路由
    2). 路由的定义/配置|使用

## 4. 模拟(mock)数据/接口
    1). 前后台分离的理解
        -- (前后端独立开发)
    2). mockjs的理解和使用
        -- (模拟后端传来的数据，当后台没写好时，可以代替使用)
    3). json数据的理解和设计
        -- 结构
        -- 名称

## 5. 开发ShopHeader组件
    1). 异步显示数据效果的编码流程
        ajax
          ajax请求函数
          接口请求函数
          -- （未请求接口，不需要代理）
        vuex
          state
          mutation-types
          actions
          mutations
        组件
          dispatch(): 异步获取后台数据到vuex的state
          mapState(): 从vuex的state中读取对应的数据
          模板中显示

    2). 初始显示异常
        情况1: Cannot read property 'xxx' of undefined"
        原因: 初始值是空对象, 内部没有数据, 而模块中直接显示3层表达式
        解决: 使用v-if指令

        情况2: Cannot read property 'avatar' of null"
        原因: 初始值是null, 而模块中直接显示2层表达式
        解决: 初始值为{}
    3). vue transition动画

# day04
## 1. 功能
    ShopGoods组件
    CartControl组件
    ShopCart组件

## 2. 相关问题
    1. 创建好BScroll对象, 样式都生成了, 就是不能滑动
      原因: 创建BScroll对象时, 列表没有显示(状态已经更新, 但列表更新是异步的)
      解决: 在列表更新之后才创建BScroll对象: this.$nextTick(() => {创建BScroll对象})
    2. 更新状态数据, 对应的界面不变化
      原因: 一般方法给一个已有绑定的对象中添加一个新的属性, 这个属性没有数据绑定
      解决: this.$set(obj, 'xxx', value)才有数据绑定
          Vue.set(obj, 'xxx', value)才有数据绑定
    3. 点击添加购物项, 会1次添加多个
      原因: 创建了多个BScroll对象来管理同一个DOM元素
      解决: 只创建一个BScroll对象
      扩展: 单例对象:
        创建前, 先判断是否已经存在, 只有不存在才创建
        创建后, 保存创建的对象

## 2. ShopGoods组件
    1). 动态展现列表数据
    2). 基本滑动:
        使用better-scroll
        理解其基本原理
        -- 包裹的div是固定的，滚动的是可能超过包裹的大小
        创建BScroll对象的时机
        -- 要在列表显示之后创建
            -- watch + $nextTick()
            -- callback + $nextTick()
    3). 滑动右侧列表, 左侧同步更新
        better-scroll禁用了原生的dom事件, 使用的是自定义事件,默认关闭了click
        绑定监听: scroll/scrollEnd
        滚动监听的类型: probeType
        列表滑动的3种类型
            手指触摸
            惯性
            编码
    4). 点击左侧列表项, 右侧滑动到对应位置

## 3. CartControl组件
    使用vuex管理购物车状态: shopCart
    1). 问题：更新状态数据，对应的界面不变化
        原因：给已有绑定的对象中新添加一个属性，而且这个属性还未进行数据绑定
        解决：
            Vue.set(obj, "proName", value)
            this.$set(obj, "proName", value)

## 4. ShopCart组件
    1). 使用vuex管理购物车数据：cartFoods
    2). 解决几个功能性bug

## 5. Food组件
    1). 父子组件：
        子组件调用父组件：通过props将方法传递给子组件
        父组件调用子组件：通过ref找到子组件标签对象

*****
    发现的bug
    -- 商家ShopGoods页面，当刷新路由时，加入购物车的数量会消失，整个购物车里的食物列表也会消失
    -- 同样的页面，当加入购物车后，访问其他页面（评价或商家），
       购物车里的数据还存在，但是食物列表中已加入的食品数量会消失--（使用keep-alive标签包住Shop组件中的整个router-view解决）
    -- 从ShopGoods页面返回到ShopList后，再回到当前商家页面，购物车数据还在，已加入购物车的食品数量会消失
    -- 评价页，当配送时间不存在时，会破坏布局。评价时间格式未写--（时间格式使用自定义过滤器filter解决）


## 自己的总结

### 做了哪些工作？
    * 首先考虑如何划分区块，如何使用路由（一级还是二级？）
        首先是头部（HeaderTop）和底部导航（FooterGuide）
### 都用到了哪些工具？
### 布局的思路
