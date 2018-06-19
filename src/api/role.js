import Vue from 'vue'
import { encrypt } from './utils'

export default {
  // 获取角色列表
  GetRoleList (body, op = {}) {
    return Vue.$api.xHttp.post(`/sameOriginApi/auths/Role/QueryRoleList`, encrypt(body), op)
  },
  // 创建角色
  AddRole (body, op = {}) {
    return Vue.$api.xHttp.post(`/sameOriginApi/auths/Role/AddRole`, encrypt(body), op)
  },
  // 删除角色
  DeleteRole (body, op = {}) {
    return Vue.$api.xHttp.post(`/sameOriginApi/auths/Role/DeleteRole`, encrypt(body), op)
  },
  // 设置角色对应导航
  SetRoleNav (body, op = {}) {
    return Vue.$api.xHttp.post(`/sameOriginApi/auths/Role/SetRoleNav`, encrypt(body), op)
  },
  // 获取角色对应菜单
  GetRoleNavList (body, op = {}) {
    return Vue.$api.xHttp.post(`/sameOriginApi/auths/Role/GetRoleNavList`, encrypt(body), op)
  }
}
