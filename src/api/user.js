import Vue from 'vue'
import { encrypt } from './utils'

export default {
  // 设置密码
  SetPassword (body, op = {}) {
    return Vue.$api.xHttp.post(`/sameOriginApi/auths/User/SetPassword`, encrypt(body), op)
  },
  // 获取用户对应菜单
  GetUserNavList (op = {}) {
    return Vue.$api.xHttp.get(`/Platform/Menu/QueryUserMenus`, op)
  },
  // 获取用户列表
  GetUserList (body, op = {}) {
    return Vue.$api.xHttp.post(`/sameOriginApi/auths/User/GetUserList`, encrypt(body), op)
  },
  // 新增或修改用户信息
  SetUserInfo (body, op = {}) {
    return Vue.$api.xHttp.post(`/sameOriginApi/auths/User/SetUserInfo`, encrypt(body), op)
  },
  // 查询用户详情
  GetUserInfo (body, op = {}) {
    return Vue.$api.xHttp.post(`/sameOriginApi/auths/User/GetUserInfo`, encrypt(body), op)
  }
}
