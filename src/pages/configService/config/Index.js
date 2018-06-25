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

  async searchProejct () {
    const res = await api.QueryProjectList('AppId=' + this.vm.filters.AppId, {
      load: false
    })
    if (res) {
      res.Data.forEach(x => {
        this.vm.nameSpaceList.push({ Id: x.Id, Name: x.Name })
      })
    }
  }

  async search (body) {
    const filter = this.vm.filters
    const res = await api.QueryConfigList(filter)
    if (res) {
      this.vm.dataList = res.Data
    }
  }

  add () {
    this.vm.editModel = {
      ConfigAppId: null,
      ConfigNamespaceName: null,
      ConfigKey: null,
      ConfigValue: null,
      Remark: null,
      IsDeleted: false
    }
    this.vm.showEdit = true
  }

  editSubmit () {
    this.vm.$refs.modelForm.validate(async (valid) => {
      if (valid) {
        const op = { loadID: 'edit' }
        const res = await api.SetConfigInfo(this.vm.modelForm, op)
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
