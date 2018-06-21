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
