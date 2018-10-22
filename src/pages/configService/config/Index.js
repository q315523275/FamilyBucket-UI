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

  async fetch (params) {
    const res = await api.QueryConfigList(params)
    if (res) {
      this.vm.dataList = res.Data
      this.vm.pagination.total = res.Total
    }
  }

  async search () {
    this.vm.currentIndex = 1
    this.fetch({
      PageIndex: this.vm.currentIndex,
      PageSize: this.vm.pagination.size,
      ...this.vm.filters
    })
  }

  handleTableChange (pagination) {
    this.vm.currentIndex = pagination.current
    this.fetch({
      PageIndex: pagination.current,
      PageSize: pagination.pageSize,
      ...this.vm.filters
    })
  }

  add () {
    this.vm.editModel = {
      ConfigAppId: null,
      ConfigNamespaceName: null,
      ConfigKey: null,
      ConfigValue: null,
      Remark: null,
      IsDeleted: false,
      Environment: this.vm.filters.Environment
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
