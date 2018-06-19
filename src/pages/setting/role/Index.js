import api from '../../../api/setting'
import Base from '../../Base/index'

export default class extends Base {
  async search () {
    const res = await api.QueryAllRoles()
    if (res) {
      this.vm.dataList = res.Data
    }
  }
}
