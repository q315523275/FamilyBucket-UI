const CryptoJS = require('crypto-js')
const key = CryptoJS.enc.Utf8.parse('7e^V9FLMatcyX0kA').toString()
const iv = CryptoJS.enc.Utf8.parse('kr6V%xV&tQj8kH13').toString()

function encrypt (value) {
  console.info('request:', value)
  value = JSON.stringify(value)
  // Triple DES 加密
  let encrypted = CryptoJS.TripleDES.encrypt(value.toString(), key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  }).toString()
  return { val: encrypted }
}

export { encrypt }
