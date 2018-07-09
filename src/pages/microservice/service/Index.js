import api from '../../../api/microservice' // eslint-disable-line
import Base from '../../Base/index'

export default class extends Base {
  async search () {
    const filter = this.vm.filters
    const res = await api.QueryServiceList(filter)
    if (res) {
      this.vm.dataList = res.Data
    }
  }
  add () {
    this.vm.editModel = {
      Name: null,
      Version: null,
      Tags: [],
      HostAndPort: {
        Host: null,
        Port: 80
      }
    }
    this.vm.showEdit = true
  }

  editSubmit () {
    this.vm.$refs.modelForm.validate(async (valid) => {
      if (valid) {
        const op = { loadID: 'edit' }
        const res = await api.SetServiceInfo(this.vm.modelForm, op)
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

  delete (id) {
    let tit = '此操作将删除' + id + '服务节点, 是否继续?'
    this.vm.$confirm(tit, '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(async () => {
      const op = { loadID: 'delete' }
      const res = await api.DeleteService({ ServiceId: id }, op)
      if (res) {
        this.vm.show = false
        this.vm.$emit('addSuccess')
        this.vm.$notify({
          title: '成功',
          message: '操作成功',
          type: 'success'
        })
      }
    })
  }
}
