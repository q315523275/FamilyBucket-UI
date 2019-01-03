import Vue from 'vue'
// import { encrypt } from './utils'

export default {
  // 查询项目组
  QueryAppList (op = {}) {
    return Vue.$api.xHttp.get(`/Platform/Config/QueryAppList`, op)
  },
  SetAppInfo (body, op = {}) {
    return Vue.$api.xHttp.post(`/Platform/Config/SetAppInfo`, body, op)
  },
  QueryProjectList (param, op = {}) {
    var qs = require('qs')
    return Vue.$api.xHttp.get(`/Platform/Config/QueryAppProjectList?` + qs.stringify(param), op)
  },
  SetProjectInfo (body, op = {}) {
    return Vue.$api.xHttp.post(`/Platform/Config/SetAppProjectInfo`, body, op)
  },
  QueryConfigList (param, op = {}) {
    var qs = require('qs')
    return Vue.$api.xHttp.get(`/Platform/Config/QueryAppConfigList?` + qs.stringify(param), op)
  },
  SetConfigInfo (body, op = {}) {
    return Vue.$api.xHttp.post(`/Platform/Config/SetAppConfigInfo`, body, op)
  },
  PublishCommand (body, op = {}) {
    return Vue.$api.xHttp.post(`/Platform/Config/PublishCommand`, body, op)
  }
}
