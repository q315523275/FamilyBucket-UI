import Vue from 'vue'
// import { encrypt } from './utils'

export default {
  // 查询平台列表
  QueryPlatforms (op = {}) {
    return Vue.$api.xHttp.get(`/Platform/Platform/QueryPlatforms`, op)
  },
  // 平台设置
  SetPlatformInfo (body, op = {}) {
    return Vue.$api.xHttp.post(`/Platform/Platform/SetPlatform`, body, op)
  },
  // 获取导航列表
  QueryAllMenus (param, op = {}) {
    param = (param ? '?' + param : '')
    return Vue.$api.xHttp.get(`/Platform/Menu/QueryAllMenus` + param, op)
  },
  // 设置导航
  SetPlatformMenu (body, op = {}) {
    return Vue.$api.xHttp.post(`/Platform/Menu/SetPlatform`, body, op)
  },
  // 获取接口列表
  QueryApiList (param, op = {}) {
    param = (param ? '?' + param : '')
    return Vue.$api.xHttp.get(`/Platform/Api/QueryApiList` + param, op)
  },
  // 设置接口信息
  SetApiInfo (body, op = {}) {
    return Vue.$api.xHttp.post(`/Platform/Api/SetApi`, body, op)
  },
  // 查询项目列表
  QueryProjectList (op = {}) {
    return Vue.$api.xHttp.get(`/Platform/Project/QueryProject`, op)
  },
  // 获取角色列表
  QueryAllRoles (param, op = {}) {
    param = (param ? '?' + param : '')
    return Vue.$api.xHttp.get(`/Platform/Role/QueryAllRoles` + param, op)
  },
  // 设置角色
  QueryRoleInfo (param, op = {}) {
    param = (param ? '?' + param : '')
    return Vue.$api.xHttp.get(`/Platform/Role/QueryRoleInfo` + param, op)
  },
  // 设置角色
  SetRoleInfo (body, op = {}) {
    return Vue.$api.xHttp.post(`/Platform/Role/SetRole`, body, op)
  },
  // 查询用户列表
  QueryUserList (param, op = {}) {
    param = (param ? '?' + param : '')
    return Vue.$api.xHttp.get(`/Platform/User/QueryUsers` + param, op)
  },
  // 设置用户
  SetUserInfo (body, op = {}) {
    return Vue.$api.xHttp.post(`/Platform/User/SetUser`, body, op)
  },
  // 设置密码
  SetPassword (body, op = {}) {
    return Vue.$api.xHttp.post(`/sameOriginApi/auths/User/SetPassword`, body, op)
  }
}
