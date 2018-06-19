import api from '../../../api/setting' // eslint-disable-line
import Base from '../../Base/index'

export default class extends Base {
  async search () {
    const res = await api.QueryProjectList()
    if (res) {
      this.vm.dataList = res.Data
    }
  }
}
