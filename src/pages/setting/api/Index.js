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

  async fetch (params) {
    const res = await api.QueryApiList(params)
    if (res) {
      this.vm.dataList = res.Data
      this.vm.pagination.total = res.Total
    }
  }

  add () {
    this.vm.editModel = {
      ProjectName: null,
      Message: null,
      Url: null,
      Method: 'GET',
      Disabled: false,
      AllowScope: null
    }
    this.vm.showEdit = true
  }
  editSubmit () {
    this.vm.$refs.modelForm.validate(async (valid) => {
      if (valid) {
        const op = { loadID: 'edit' }
        const res = await api.SetApiInfo(this.vm.modelForm, op)
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
