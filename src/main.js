// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import 'normalize.css/normalize.css'// A modern alternative to CSS resets
import App from './App'
import router from './router'
import routes from './router/routes'
import store from './vuex/store'
import { sync } from 'vuex-router-sync'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './styles/index.scss' // global css
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'// progress bar style
import UtilsPlugin from './assets/utils'
import HttpPlugin from './http'
// import VueParticles from 'vue-particles' // 粒子酷炫效果
import 'echarts/lib/chart/bar'

Vue.config.productionTip = false
Vue.use(ElementUI)
// echarts
require('echarts/lib/chart/line')
require('echarts/lib/component/title')
require('echarts/lib/component/tooltip')
require('echarts/lib/component/grid')
require('echarts/lib/component/legend')
require('echarts/lib/component/toolbox')
// plugins
Vue.use(UtilsPlugin)
Vue.use(HttpPlugin)
// Vue.use(VueParticles)
router.beforeEach((to, from, next) => {
  if (to.path !== '/frame') {
    if (to.path === '/' || to.path === '/login' || to.path === '/401' || to.path === '/setpassword' || to.path === '/dashboard') {
      setTimeout(next, 0)
    } else {
      NProgress.start() // start progress bar
      const menus = routes.slice(2, routes.length)
      let find = false
      // console.log('routes[2]:', menus)
      if (routes[2].children.find((x) => x.path === to.path || x.name === to.name)) {
        find = true
      } else {
        menus.forEach(x => {
          if (x.children && x.children.some(y => y.name === to.name)) {
            find = true
          }
        })
      }
      if (find) {
        // 判断菜单访问权限
        if (store.state.menus.permissions.find(x => x.LinkUrl && (x.LinkUrl === to.fullPath || x.LinkUrl + '/index' === to.fullPath))) {
          let name = to.name
          store.commit('ADD_MENU', { name, path: to.fullPath })
          setTimeout(next, 0)
        } else {
          NProgress.done()
          setTimeout(() => next({ name: '401' }), 0)
        }
      } else {
        NProgress.done()
        setTimeout(() => next({ name: '404' }), 0)
      }
    }
  }
})
router.afterEach((to) => {
  NProgress.done() // finish progress bar
})
sync(store, router)
/* eslint-disable no-new */
// global
window.$globalHub = new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
