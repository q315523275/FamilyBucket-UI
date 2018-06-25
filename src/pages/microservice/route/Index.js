import api from '../../../api/microservice' // eslint-disable-line
import Base from '../../Base/index'

export default class extends Base {
  async search () {
    if (this.vm.authModel.AccessToken) {
      const url = this.vm.authModel.GatewayURL + this.vm.authModel.SettingURL
      const res = await api.QueryRouteList(url, {
        options: {
          headers: {
            'Authorization': this.vm.authModel.AccessToken
          }
        },
        validator: (obj) => {
          return true
        },
        defEx: false
      })
      if (res) {
        this.vm.dataList = res.ReRoutes
      }
    } else {
      this.vm.$notify({
        title: '提示',
        message: '请先填写授权Token',
        type: 'warning'
      })
    }
  }
  showAuth () {
    this.vm.showAuth = true
  }
  authSubmit () {
    this.vm.$refs.modelForm.validate(async (valid) => {
      if (valid) {
        this.vm.$emit('addSuccess')
        this.vm.show = false
      } else {
        return false
      }
    })
  }
}
