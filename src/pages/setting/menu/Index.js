import api from '../../../api/setting'
import Base from '../../Base/index'
// region private methods
function sort (jsonData) {
  let menus = []
  jsonData.forEach(x => {
    if (x.ParentId === 0) {
      menus.push({
        ...x,
        sub: []
      })
    }
  })
  menus.sort((x1, x2) => {
    return x1.SortId - x2.SortId
  })
  jsonData = jsonData.filter(x => {
    return x.ParentId !== 0
  })
  menus.forEach(x => {
    jsonData.forEach(y => {
      if (x.Id === y.ParentId) {
        x.sub.push(y)
        x.sub.sort((x1, x2) => {
          return x1.SortId - x2.SortId
        })
      }
    })
  })
  let result = []
  menus.forEach(x => {
    result.push(x)
    x.sub.forEach(y => {
      result.push(y)
    })
  })
  return result
}
// endregion
export default class extends Base {
  async init () {
    const res = await api.QueryPlatforms({ load: false })
    if (res) {
      this.vm.platformList = res.Data
    }
  }

  async search () {
    const filter = this.vm.filters
    const res = await api.QueryAllMenus(filter)
    if (res) {
      this.vm.dataList = sort(res.Data)
    }
  }
  add () {
    this.vm.editModel = {
      PlatformId: null,
      ParentId: 0,
      LinkUrl: null,
      Icon: 'el-icon-menu',
      SortId: 1,
      switchState: true,
      level: 0,
      parents: this.vm.dataList.filter(x => {
        return x.ParentId === 0
      })
    }
    this.vm.showEdit = true
  }
  editSubmit () {
    this.vm.$refs.modelForm.validate(async (valid) => {
      if (valid) {
        let postData = {
          ...this.vm.modelForm,
          State: this.vm.modelForm.switchState ? 1 : 0,
          Icon: this.vm.modelForm.level === 0 ? this.vm.modelForm.Icon : null
        }
        delete postData.parents
        const op = { loadID: 'edit' }
        let res = await api.SetPlatformMenu(postData, op)
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
