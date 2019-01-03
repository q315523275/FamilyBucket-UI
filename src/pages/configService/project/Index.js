import api from '../../../api/configservice' // eslint-disable-line
import Base from '../../Base/index'

export default class extends Base {
  async init () {
    const res = await api.QueryAppList()
    if (res) {
      res.Data.forEach(x => {
        this.vm.appList.push({ AppId: x.AppId, Name: x.Name })
      })
    }
  }

  async search (body) {
    const filter = this.vm.filters
    const res = await api.QueryProjectList(filter)
    if (res) {
      this.vm.dataList = res.Data
    }
  }

  add () {
    this.vm.editModel = {
      Name: null,
      AppId: null,
      IsPublic: false,
      Comment: null,
      IsDeleted: false
    }
    this.vm.showEdit = true
  }

  editSubmit () {
    this.vm.$refs.modelForm.validate(async (valid) => {
      if (valid) {
        const op = { loadID: 'edit' }
        const res = await api.SetProjectInfo(this.vm.modelForm, op)
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

  notifySubmit () {
    this.vm.$refs.modelForm.validate(async (valid) => {
      if (valid) {
        const op = { loadID: 'edit' }
        const res = await api.PublishCommand(this.vm.modelForm, op)
        if (res) {
          this.vm.show = false
          this.vm.$notify({
            title: '成功',
            message: '发送成功',
            type: 'success'
          })
        }
      } else {
        return false
      }
    })
  }
}
