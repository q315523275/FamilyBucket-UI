import { deepCopy } from '../../assets/utils/util'

// initial state
const state = {
  authInfo: {}
}

const defaultValue = deepCopy(state)

// getters
const getters = {}

// actions
const actions = {}

// mutations
const mutations = {
  AUTH_INIT (state) {
    window.$globalHub.$store.state.auth = defaultValue
  },
  SET_AUTH (state, auth) {
    state.authInfo = {...state.authInfo, ...auth}
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
