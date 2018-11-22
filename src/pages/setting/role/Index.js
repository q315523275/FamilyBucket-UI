import api from '../../../api/setting'
import Base from '../../Base/index'

function createMenusByJsonData2 (jsonData) {
  let menus = []
  jsonData.forEach(x => {
    if (x.ParentId === 0 && x.State === 1) {
      menus.push({
        label: x.Name,
        id: x.Id,
        children: []
      })
    }
  })
  jsonData = jsonData.filter(x => {
    return x.ParentId !== 0 || x.State !== 1
  })
  menus.forEach(x => {
    jsonData.forEach(y => {
      if (x.id === y.ParentId && y.State === 1) {
        x.children.push({
          id: y.Id,
          label: y.Name,
          parent: y.ParentId
        })
      }
    })
  })
  return menus
}

export default class extends Base {
  async init () {
    const res = await this.vm.$api.xHttp.all([
      api.QueryPlatforms({ load: false }),
      api.QueryAllMenus('', { load: false })
    ])
    if (res) {
      this.vm.platformList = res[0].Data
      this.vm.menusList = createMenusByJsonData2(res[1].Data)
    }
  }

  async search () {
    const filter = this.vm.filters
    const res = await api.QueryAllRoles(filter)
    if (res) {
      this.vm.dataList = res.Data
    }
  }

  add () {
    this.vm.editModel = {
      RealName: null,
      UserName: null,
      Mobile: null,
      Email: null,
      State: 0
    }
    this.vm.showEdit = true
  }

  async editInit () {
    if (this.vm.modelForm.Id) {
      // 获取角色对应菜单
      const res = await api.QueryRoleInfo({ RoleId: this.vm.modelForm.Id }, { load: false })
      if (res) {
        // 排除1级菜单
        let menus = res.Data.MenuList.filter(x => {
          return !this.vm.menusList.find(y => {
            return y.id === x.MenuId && y.children.length !== 0
          })
        })
        this.vm.$refs.menusTree.setCheckedNodes(menus.map(x => {
          return { id: x.MenuId }
        }))
        // 接口初始化check
        let apiCheck = []
        res.Data.ApiList.forEach(x => {
          apiCheck.push(x.ApiId)
        })
        this.vm.apiTreeCheck = apiCheck
      }
    }
    // 初始化接口权限列表
    this.searchApiList()
  }

  async searchApiList () {
    const filter = { PageSize: 10000 }
    const res = await api.QueryApiList(filter, { load: false })
    if (res) {
      const apilist = []
      res.Data.forEach(x => {
        // 2只显示需要验证权限的接口信息
        if (x.AllowScope === 2) {
          apilist.push({
            label: x.ProjectName + '/' + x.Controller + '/' + x.Message,
            id: x.Id,
            children: []
          })
        }
      })
      this.vm.apiTreeList = apilist
    }
  }

  editSubmit () {
    this.vm.$refs.modelForm.validate(async (valid) => {
      if (valid) {
        const op = { loadID: 'edit' }
        // 选中菜单
        let allNavs = []
        this.vm.$refs.menusTree.getCheckedNodes(false).forEach(x => {
          allNavs.push(x.id)
          if (x.parent) {
            if (!allNavs.includes(x.parent)) {
              allNavs.push(x.parent)
            }
          }
        })
        // 选中接口
        let allApi = this.vm.$refs.apiTree.getCheckedKeys()
        let res = await api.SetRoleInfo({
          ...this.vm.modelForm,
          MenuIdList: allNavs.filter(x => !isNaN(x)),
          ApiIdList: allApi
        }, op)
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
