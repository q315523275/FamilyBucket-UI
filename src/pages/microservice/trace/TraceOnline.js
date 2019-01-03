import Base from '../../Base/index'
import api from '../../../api/microservice'

let ws
let tableData = []
export default class extends Base {
  initWebSocket () {
    ws = new WebSocket('ws://10.10.188.136:17071/skrTrace?' + window.$globalHub.$store.state.auth.authInfo.Id)
    const that = this
    ws.onopen = function (evt) {
      console.log('Connection open ...')
      that.vm.$message({
        message: 'WebSocket连接已建立，正在等待数据...',
        type: 'success'
      })
      that.vm.initWebSocketBtnDisabled = true
      that.vm.closeWebSocketBtnDisabled = false
      that.vm.addListenerBtnDisabled = false
      that.vm.ListenerInputBtnDisabled = false
    }
    ws.onmessage = function (evt) {
      const json = JSON.parse(evt.data)
      console.log('Received Message: ', json.MessageType, json.Data)
      if (json.MessageType === 0) {
        console.log(tableData.length)
        tableData.push(JSON.parse(json.Data))
        that.vm.dataList = tableData.sort((x, y) => x.StartTime - y.StartTime)
      }
    }
    ws.onclose = function (evt) {
      // _this.vm.$router.push('/ok')
      console.log('Connection closed.')
      that.vm.$message({
        message: 'WebSocket和服务器断开连接...',
        type: 'success'
      })
      that.vm.initWebSocketBtnDisabled = false
      that.vm.closeWebSocketBtnDisabled = true
      that.vm.addListenerBtnDisabled = true
      that.vm.removeListenerDisabled = true
      that.vm.ListenerInputBtnDisabled = true
    }
  }

  closeWebSocket () {
    ws && ws.close()
  }

  async addListener () {
    this.vm.$refs.filters.validate(async (valid) => {
      if (valid) {
        const queryString = '?groupId=' + this.vm.filters.Identity + '&socketId=' + window.$globalHub.$store.state.auth.authInfo.Id
        const res = await api.AddListener(queryString)
        if (res) {
          this.vm.$message({
            message: '信息监听建立成功',
            type: 'success'
          })
          this.vm.addListenerBtnDisabled = true
          this.vm.removeListenerDisabled = false
          this.vm.ListenerInputBtnDisabled = true
        }
      } else {
        return false
      }
    })
  }

  async removeListener () {
    this.vm.$refs.filters.validate(async (valid) => {
      if (valid) {
        const queryString = '?groupId=' + this.vm.filters.Identity + '&socketId=' + window.$globalHub.$store.state.auth.authInfo.Id
        const res = await api.RemoveListener(queryString)
        if (res) {
          this.vm.$message({
            message: '信息监听取消成功',
            type: 'success'
          })
          this.vm.addListenerBtnDisabled = false
          this.vm.removeListenerDisabled = true
          this.vm.ListenerInputBtnDisabled = false
          this.vm.filters.Identity = null
        }
      } else {
        return false
      }
    })
  }

  async clear () {
    this.vm.dataList = []
    tableData = []
  }
}
