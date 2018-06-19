import Vue from 'vue'
import { encrypt } from './utils'

export default {
  // 获取导航列表
  GetUserNavList (op = {}) {
    return Vue.$api.xHttp.post(`/sameOriginApi/auths/Navigation/GetNavList`, encrypt({ GetAll: 1 }), op)
  },
  // 新增导航
  AddNav (body, op = {}) {
    return Vue.$api.xHttp.post(`/sameOriginApi/auths/Navigation/AddNav`, encrypt(body), op)
  },
  // 修改导航
  UpdateNav (body, op = {}) {
    return Vue.$api.xHttp.post(`/sameOriginApi/auths/Navigation/UpdateNav`, encrypt(body), op)
  }
}
