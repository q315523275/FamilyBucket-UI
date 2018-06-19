import Vue from 'vue'
import { encrypt } from './utils'

export default {
  data1 (op = {}) {
    return Vue.$api.xHttp.post(`/sameOriginApi/datas/data1`, {}, op)
  },
  data2 (body, op = {}) {
    return Vue.$api.xHttp.post(`/sameOriginApi/datas/data2`, encrypt(body), op)
  },
  getconfig (op = {}) {
    return Vue.$api.xHttp.post(`/sameOriginApi/sysaction/getconfig`, {}, op)
  },
  setconfig (body, op = {}) {
    return Vue.$api.xHttp.post(`/sameOriginApi/sysaction/setconfig`, encrypt(body), op)
  },
  getsyslog (body, op = {}) {
    return Vue.$api.xHttp.post(`/sameOriginApi/sysaction/getsyslog`, encrypt(body), op)
  },
  getbslog (body, op = {}) {
    return Vue.$api.xHttp.post(`/sameOriginApi/sysaction/getbslog`, encrypt(body), op)
  },
  getapply (body, op = {}) {
    return Vue.$api.xHttp.post(`/sameOriginApi/sysaction/getapply`, encrypt(body), op)
  },
  getsmscodelog (body, op = {}) {
    return Vue.$api.xHttp.post(`/sameOriginApi/sysaction/getsmscodelog`, encrypt(body), op)
  },
  getmanagerlog (body, op = {}) {
    return Vue.$api.xHttp.post(`/sameOriginApi/sysaction/getmanagerlog`, encrypt(body), op)
  }
}
