import Vue from 'vue'

export default {
  // 查询服务列表
  QueryServiceList (op = {}) {
    return Vue.$api.xHttp.get(`/Platform/Microservice/QueryServiceList`, op)
  },
  QueryRouteList (url, op = {}) {
    return Vue.$api.xHttp.get(url, op)
  }
}
