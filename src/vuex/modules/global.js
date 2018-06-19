import Cookies from 'js-cookie'
// 该模块的初始状态
const state = {
  direction: 'forward',
  showTopSpace: true,
  showFoot: false,
  showMask: false,
  btnLoadingStr: null,
  btnLoadingID: null,
  seq: 0,
  route: null,
  sidebar: {
    opened: !+Cookies.get('sidebarStatus')
  },
  tags: true
}
// getters
const getters = {
  sidebar: state => state.sidebar,
  tags: state => state.tags,
  seq: state => {
    return state.seq
  },
  route: state => {
    return state.route
  },
  btnLoading: state => {
    return {
      id: state.btnLoadingID,
      str: state.btnLoadingStr
    }
  }
}
// 相关的 mutations
const mutations = {
  TOGGLE_SIDEBAR: state => {
    if (state.sidebar.opened) {
      Cookies.set('sidebarStatus', 1)
    } else {
      Cookies.set('sidebarStatus', 0)
    }
    state.sidebar.opened = !state.sidebar.opened
  },
  UPDATE_DIRECTION (state, direction) {
    state.direction = direction
  },
  SHOW_TOP_SPACE (state, showTopSpace) {
    state.showTopSpace = showTopSpace
  },
  SHOW_FOOT (state, showFoot) {
    state.showFoot = showFoot
  },
  SHOW_MASK (state, showMask) {
    state.showMask = showMask
  },
  UPDATE_BTNLOADINGSTR (state, load) {
    if (load) {
      state.btnLoadingStr = load.str
      state.btnLoadingID = load.id
      state.showMask = !!load.str
    } else {
      state.btnLoadingStr = null
      state.btnLoadingID = null
      state.showMask = false
    }
  },
  INIT_SEQ (state) {
    state.seq = 0
  },
  ADD_SEQ (state) {
    state.seq = state.seq + 1
  },
  SET_ROUTE (state, route) {
    state.route = route
  },
  SET_TAGS (state, tags) {
    state.tags = tags
  }
}
const actions = {
  ToggleSideBar: ({ commit }) => {
    commit('TOGGLE_SIDEBAR')
  }
}
export default {
  state,
  mutations,
  getters,
  actions
}
