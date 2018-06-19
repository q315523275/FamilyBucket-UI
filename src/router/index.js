/* eslint-disable no-undef */
import Vue from 'vue'
import Router from 'vue-router'
import config from '../../config/index'
import routes from './routes'

Vue.use(Router)
export default new Router({
  mode: 'history', // 后端支持可开
  base: config.build.assetsPublicPath,
  routes
})
