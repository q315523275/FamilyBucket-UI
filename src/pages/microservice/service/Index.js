import api from '../../../api/microservice' // eslint-disable-line
import Base from '../../Base/index'

export default class extends Base {
  async search () {
    const res = await api.QueryServiceList()
    if (res) {
      this.vm.dataList = res.Data
    }
  }
}
