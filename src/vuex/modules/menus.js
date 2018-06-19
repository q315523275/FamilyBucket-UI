import { deepCopy } from '../../assets/utils/util'
// initial state
const state = {
  menuList: [],
  userNavList: [],
  permissions: [],
  open: true
}
const defaultValue = deepCopy(state)
// getters
const getters = {}
// actions
const actions = {}
// mutations
const mutations = {
  MENU_INIT (state) {
    window.$globalHub.$store.state.menus = defaultValue
  },
  SET_USER_NAV_LIST (state, data) {
    state.userNavList = data
  },
  SET_PERMISSIONS (state, data) {
    state.permissions = data
  },
  ADD_MENU (state, data) {
    let find = false
    if (!state.menuList.find(x => x.path === data.path)) {
      state.userNavList.forEach(y => {
        let item = y.sub.find(z => z.link === data.path)
        if (item && !find) {
          state.menuList.push({ name: item.name, path: item.link })
          find = true
        }
      })
      if (!find) {
        state.menuList.push(data)
      }
    }
  },
  REMOVE_MENU (state, path) {
    state.menuList = state.menuList.filter(x => x.path !== path)
  },
  CLEAR_MENU (state) {
    state.menuList = []
  },
  SETMENUOPEN (state, open) {
    state.open = open
  }
}
export default {
  state,
  getters,
  actions,
  mutations
}
