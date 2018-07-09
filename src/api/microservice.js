import Vue from 'vue'

export default {
  // 查询服务列表
  QueryServiceList (param, op = {}) {
    var qs = require('qs')
    return Vue.$api.xHttp.get(`/Platform/Microservice/QueryServiceList?` + qs.stringify(param), op)
  },
  SetServiceInfo (body, op = {}) {
    return Vue.$api.xHttp.post(`/Platform/Microservice/SetServiceInfo`, body, op)
  },
  DeleteService (body, op = {}) {
    return Vue.$api.xHttp.post(`/Platform/Microservice/DeleteService`, body, op)
  },
  QueryRouteList (url, op = {}) {
    return Vue.$api.xHttp.get(url, op)
  },
  EditRoute (url, body, op = {}) {
    return Vue.$api.xHttp.post(url, body, op)
  }
}
