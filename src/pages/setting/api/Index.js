import api from '../../../api/setting' // eslint-disable-line
import Base from '../../Base/index'

export default class extends Base {
  async init () {
    const res = await api.QueryProjectList()
    if (res) {
      this.vm.projectList = res.Data
    }
  }
  async search () {
    const filter = this.vm.filters
    const params = this.vm.$utils.Common.parseParam(filter).substr(1)
    const res = await api.QueryApiList(params)
    if (res) {
      this.vm.dataList = res.Data
    }
  }
}
