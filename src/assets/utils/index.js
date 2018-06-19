import Common from './common.js'
import Date from './date.js'
import LocalStorage from './localStorage.js'
import Validate from './validate.js'
import UserAgent from './useragent'
import Excel from './excel'

export default function (Vue) {
  if (!Vue.$utils) {
    Vue.$utils = {
      Common,
      Date,
      LocalStorage,
      Validate,
      UserAgent,
      Excel
    }
  } else {
    Vue.$utils = {
      Common,
      Date,
      LocalStorage,
      Validate,
      UserAgent,
      Excel
    }
  }
  
  Vue.mixin({
    created() {
      this.$utils = {
        Common,
        Date,
        LocalStorage,
        Validate,
        UserAgent,
        Excel
      }
    }
  })
}
