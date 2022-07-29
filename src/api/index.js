/*
与后台交互模块
 */
import ajax from './ajax'

const BASE_URL = '/api'
/**
 * 获取地址信息(根据经纬度串)
 */
export const reqAddress = geohash => ajax(`${BASE_URL}/position/${geohash}`)

/**
 * 获取msite页面食品分类列表
 */
export const reqCategories = () => ajax(`${BASE_URL}/index_category`)

/**
 * 获取msite商铺列表(根据经纬度)
 */
export const reqShops = ({latitude, longitude}) => ajax(`${BASE_URL}/shops`, {latitude, longitude})

/**
 * 根据关键字获取商家列表
 */
export const reqSearchShops = (geohash, keyword) => ajax(`${BASE_URL}/search_shops`, {geohash, keyword})

/**
 * 获取图片验证码
 */
export const reqCaptchas = () => ajax(`${BASE_URL}/captcha`)

/**
 * 账号密码登录
 */
export const reqPwdLogin = ({name, pwd, captcha}) => ajax(`${BASE_URL}/login_pwd`, {
  name,
  pwd,
  captcha
}, 'POST')

/**
 * 发送短信验证码
 */
export const reqSendCode = phone => ajax(`${BASE_URL}/sendcode`, {phone})

/**
 * 手机号验证码登录
 */
export const reqSmsLogin = (phone, code) => ajax(`${BASE_URL}/login_sms`, {phone, code}, 'POST')

/**
 * 获取用户信息(根据会话)
 */
export const reqUserInfo = () => ajax(`${BASE_URL}/userinfo`)

/**
 * 请求登出
 */
export const reqLogout = () => ajax(`${BASE_URL}/logout`)

/**
 * 获取商家信息
 */
export const reqShopInfo = () => ajax('/shop_info')

/**
 * 获取商家评价数组
 */
export const reqShopRatings = () => ajax('/shop_ratings')

/**
 * 获取商家商品数组
 */
export const reqShopGoods = () => ajax('/shop_goods')
