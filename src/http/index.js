import xHttp from './xHttp'

export default {
  install (Vue) {
    Vue.prototype.$api = { xHttp }
    Vue.$api = { xHttp }
  },
  $api: { xHttp }
}
