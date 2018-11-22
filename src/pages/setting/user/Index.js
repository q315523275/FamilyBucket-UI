import api from '../../../api/setting' // eslint-disable-line
import Base from '../../Base/index'

export default class extends Base {
  async search () {
    const filter = this.vm.filters
    const res = await api.QueryUserList(filter)
    if (res) {
      this.vm.dataList = res.Data
    }
  }

  async editInit () {
    const res = await api.QueryRoles('', { load: false })
    if (res) {
      res.Data.forEach(x => {
        this.vm.roleList.push({ Id: x.Id, Name: x.PlatformKey + '/' + x.Name })
      })
    }
  }

  add () {
    this.vm.editModel = {
      Name: null,
      Key: null,
      Icon: null,
      Author: null,
      Developer: null,
      SortId: 0,
      Remark: null,
      IsDel: false
    }
    this.vm.showEdit = true
  }

  editSubmit () {
    this.vm.$refs.modelForm.validate(async (valid) => {
      if (valid) {
        const op = { loadID: 'edit' }
        const res = await api.SetUserInfo(this.vm.modelForm, op)
        if (res) {
          this.vm.show = false
          this.vm.$emit('addSuccess')
          this.vm.$notify({
            title: '成功',
            message: '操作成功',
            type: 'success'
          })
        }
      } else {
        return false
      }
    })
  }
}
