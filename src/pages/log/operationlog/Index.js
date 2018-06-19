import api from '../../../api/index' // eslint-disable-line
import Base from '../../Base/index'

export default class extends Base {
  constructor (vm) {
    super(vm)
    let nowTimeDate = new Date()
    nowTimeDate.setHours(0, 0, 0, 0)
    this.vm.time = [Math.round(nowTimeDate.getTime()), Math.round(new Date().getTime())]
  }

  disabled () {
    if (!this.vm.time) {
      return '请选择查询时间'
    }
    return null
  }

  async init () {
    if (this.disabled()) {
      this.$message.error(this.disabled())
      return
    }
    const res = await api.getmanagerlog({ stime: this.vm.time[0], etime: this.vm.time[1] })
    if (res) {
      this.vm.dataList = res.Data
    }
  }
}
