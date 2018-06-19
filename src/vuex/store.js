// vuex/store.js
import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import config from '../../config/index'
import localStorage from '../assets/utils/localStorage'
// 导入各个模块的初始状态和 mutations
import auth from './modules/auth'
import menus from './modules/menus'
import login from './modules/login'
import global from './modules/global'
import log from './modules/log'
import tagsView from './modules/tagsView'

Vue.use(Vuex)
export default new Vuex.Store({
  // 组合各个模块
  modules: {
    global,
    menus,
    login,
    auth,
    log,
    tagsView
  },
  // 插件
  plugins: [createPersistedState({
    key: config.build.assetsPublicPath + 'vuex',
    paths: ['menus', 'auth', 'log'], // 只缓存service里的state
    getState: (key) => localStorage.get(key),
    setState: (key, state) => localStorage.set(key, state)
  })]
})
