const CryptoJS = require('crypto-js')
const storage = window.localStorage
const key = CryptoJS.enc.Utf8.parse('7e^V9FLMatcyX0kA').toString()
const iv = CryptoJS.enc.Utf8.parse('kr6V%xV&tQj8kH13').toString()

export default {
  set (name, value) {
    if (typeof(value) === 'object') {
      value = JSON.stringify(value)
    } else {
      value = JSON.stringify({'myCacheValue': value})
    }
    // Triple DES 加密
    let encrypted = CryptoJS.TripleDES.encrypt(value.toString(), key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    }).toString()
    storage.setItem(name, encrypted)
  },
  get (name) {
    let temp = storage.getItem(name)
    if (temp === null) {
      return null
    }
    // Triple DES 解密
    let decrypted = CryptoJS.TripleDES.decrypt(temp, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    })
    // 转换为 utf8 字符串
    decrypted = CryptoJS.enc.Utf8.stringify(decrypted) || temp
    let obj = JSON.parse(decrypted)
    if (obj.myCacheValue) {
      return obj.myCacheValue
    }
    return obj
  },
  clear(name) {
    if (name) {
      storage.removeItem(name)
    }
    else {
      storage.clear()
    }
  },
  clearExcept(array){
    if (!array) {
      this.clear()
    } else {
      let temp = []
      for (let i = 0; i < array.length; i++) {
        let val = this.get(array[i])
        if (val) {
          temp.push({name: array[i], val: val})
        }
      }
      this.clear()
      
      for (let i = 0; i < temp.length; i++) {
        this.set(temp[i].name, temp[i].val)
      }
    }
  }
}
