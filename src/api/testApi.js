import Vue from 'vue'

export default {
  // 获取用户列表
  GetUserList (body, op = {}) {
    return Vue.$api.xHttp.post(`/prodApi/api/User/GetUserList`, body, op)
  },
  // 获取菜单列表
  GetNavList (body, op = {}) {
    return Vue.$api.xHttp.post(`/prodApi/api/Navigation/GetNavList`, body, op)
  }
}
