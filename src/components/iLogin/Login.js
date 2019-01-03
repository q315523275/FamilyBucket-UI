import accountApi from '../../api/account'
import config from '../../../config'
import { createMenusByJsonData } from '../../layout/components/Sidebar/Sidebar'

// region private methods
function guid () {
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4()
}

function s4 () {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1)
}

// endregion
export default class {
  constructor (vm) {
    this.vm = vm
    if (process.env.NODE_ENV === 'development') {
      this.vm.loginModel.phone = 'admin'
      this.vm.loginModel.pwd = ''
    }
  }

  errMsg () {
    // if (!this.vm.$utils.Validate.chkFormat(this.vm.loginModel.phone, 'phone')) {
    //   return '请输入正确的手机号'
    // }
    return null
  }

  disabled () {
    if (!this.vm.loginModel.phone) {
      return '请输入账号'
    } else if (!this.vm.loginModel.pwd) {
      return '请输入密码'
    } else if (!this.vm.loginModel.imgCode) {
      return '请输入图文验证码'
    } else if (this.vm.loginModel.imgCode.length !== 4) {
      return '请完整输入图文验证码'
    }
    return null
  }

  // 点击刷新图形验证码
  async refreshImgCode () {
    this.vm.uid = this.CREATED_GUID()
    this.vm.imgCodeText = await this.GET_VERIFYIMAGE_URL(this.vm.uid)
  }

  // 生成GUID
  CREATED_GUID () {
    return guid()
  }

  // 平台登录
  async login () {
    if (this.disabled() || this.errMsg()) {
      this.vm.$message.error(this.disabled() || this.errMsg())
      return
    }
    const res = await accountApi.Login({
      UserName: this.vm.loginModel.phone,
      Password: this.vm.loginModel.pwd,
      ImgCode: this.vm.loginModel.imgCode,
      Guid: this.vm.uid
    })
    if (res) {
      // 关闭登录框
      if (window.$globalHub.$store.state.login.loginDialogIsShow) {
        window.$globalHub.$store.commit('ADMIN_LOGIN', false)
      }
      // 保存auth信息
      window.$globalHub.$store.commit('SET_AUTH', res.Data)
      // 使用poc配置菜单
      if (!config.dev.useLocalSidebar) {
        // 菜单权限设置
        const res = await accountApi.QueryUserMenus()
        if (res) {
          let permissions = res.Data.Menu
          window.$globalHub.$store.commit('SET_PERMISSIONS', permissions)
          permissions = createMenusByJsonData(permissions)
          window.$globalHub.$store.commit('SET_USER_NAV_LIST', permissions)
          // 清除tagView标签缓存
          window.$globalHub.$store.commit('DEL_ALL_VIEWS')
        }
      }
      // 获取用户对应菜单
      if (this.vm.showMask) {
        window.location.reload()
      } else {
        this.vm.$emit('login-success')
      }
    } else {
      this.vm.loginModel.imgCode = ''
      this.refreshImgCode()
    }
  }

  // 获取图形验证码地址
  async GET_VERIFYIMAGE_URL (uid) {
    const res = await accountApi.getVerifyImageUrl(uid)
    return res
  }
}
