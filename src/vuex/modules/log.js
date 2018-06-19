function guid () {
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4()
}

function s4 () {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1)
}

// 该模块的初始状态
const state = {
  guid: null
}

// getters
const getters = {
  guid: state => {
    return state.guid
  }
}

// 相关的 mutations
const mutations = {
  // 生成GUID
  CREATED_GUID (state) {
    state.guid = guid()
  }
}

export default {
  state,
  mutations,
  getters
}
