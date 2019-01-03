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
  GetApiGatewayConfiguration (op = {}) {
    return Vue.$api.xHttp.get(`/Platform/Microservice/GetApiGatewayConfiguration`, op)
  },
  SetApiGatewayConfiguration (body, op = {}) {
    return Vue.$api.xHttp.post(`/Platform/Microservice/SetApiGatewayConfiguration`, body, op)
  },
  QueryTrace (param, op = {}) {
    var qs = require('qs')
    return Vue.$api.xHttp.get(`/tracing/api/Trace?` + qs.stringify(param), op)
  },
  QueryTraceHistogram (param, op = {}) {
    var qs = require('qs')
    return Vue.$api.xHttp.get(`/tracing/api/Trace/Histogram?` + qs.stringify(param), op)
  },
  QueryTraceDetail (param, op = {}) {
    return Vue.$api.xHttp.get(`/tracing/api/TraceDetail/` + param, op)
  },
  QuerySpanDetail (param, op = {}) {
    return Vue.$api.xHttp.get(`/tracing/api/SpanDetail/` + param, op)
  },
  AddListener (param, op = {}) {
    return Vue.$api.xHttp.get(`http://10.10.188.136:17071/SocketGroup/AddToGroup` + param, op)
  },
  RemoveListener (param, op = {}) {
    return Vue.$api.xHttp.get(`http://10.10.188.136:17071/SocketGroup/RemoveFromGroup` + param, op)
  }
}
