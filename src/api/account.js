import Vue from 'vue'
// import { encrypt } from './utils'

export default {
  // 登录
  Login (body, op = {}) {
    return Vue.$api.xHttp.post(`/Account/Login`, body, op)
  },
  // 获取图形验证码地址
  getVerifyImageUrl (uid) {
    return Vue.$api.xHttp.getRequestUrl(`/Tool/ValidateCode?guid=${uid}&width=100&height=39`)
  },
  // 获取导航列表
  QueryUserMenus (op = {}) {
    return Vue.$api.xHttp.get(`/Menu/QueryUserMenus`, op)
  }
}
