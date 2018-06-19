import codes from '../codes/apiResultCodes'
import { Notification } from 'element-ui'

export default {
  ErrorMsgNotification (code, msg) {
    if (window.$globalHub.$route.path !== '/' && window.$globalHub.$route.path !== '/login' && codes.AUTH_ERROR.some(x => x === code)) {
      window.$globalHub.$store.commit('ADMIN_LOGIN', true)
    } else {
      Notification.error({ title: '错误', message: msg || '传输异常，请稍后再试！' })
    }
  }
}
