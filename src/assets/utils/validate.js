var Regexs = {
  email: (/^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i),//邮箱
  code: (/^\d{6}$/),//验证码
  number: (/^\d*$/),//全数字
  name: (/[\u4e00-\u9fa5]{1,20}|[a-zA-Z\.\s]{1,20}/),//姓名
  chinaName: (/^[\u4E00-\u9FA5]{2,6}$/),//中文姓名
  phone: (/^(?=\d{11}$)^1(?:3\d|4[57]|5[^4\D]|66|7[^249\D]|8\d|9[89])\d{8}$/),// 通用手机号
  chinaMobile: (/^1(3[4-9]|4[7]|5[0-27-9]|7[08]|8[2-478])\d{8}$/),// 中国移动
  chinaUnion: (/^1(3[0-2]|4[5]|5[256]|7[016]|8[56])\d{8}$/),// 中国联通
  chinaTelcom: (/^1(3[34]|53|7[07]|8[019])\d{8}$/),// 中国电信
  idcard: ''// 身份证号
}

export default {
  chkFormat(str, ftype) {
    if (!str) {
      return false
    }
    if (ftype != 'idcard') {
      var nReg = Regexs[ftype]
      return nReg.test(str)
    } else {
      return IdCardValidate(str)
    }
  }
}

// 身份证验证
var Wi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1];    // 加权因子
var ValideCode = [1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2];            // 身份证验证位值.10代表X
function IdCardValidate (idCard) {
  idCard = trim(idCard.replace(/ /g, ""));               //去掉字符串头尾空格
  if (idCard.length == 15) {
    return isValidityBrithBy15IdCard(idCard);       //进行15位身份证的验证
  } else if (idCard.length == 18) {
    var a_idCard = idCard.split("");                // 得到身份证数组
    if (isValidityBrithBy18IdCard(idCard) && isTrueValidateCodeBy18IdCard(a_idCard)) {   //进行18位身份证的基本验证和第18位的验证
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}
/**
 * 判断身份证号码为18位时最后的验证位是否正确
 * @param a_idCard 身份证号码数组
 * @return
 */
function isTrueValidateCodeBy18IdCard (a_idCard) {
  var sum = 0;                             // 声明加权求和变量
  if (a_idCard[17].toLowerCase() == 'x') {
    a_idCard[17] = 10;                    // 将最后位为x的验证码替换为10方便后续操作
  }
  for (var i = 0; i < 17; i++) {
    sum += Wi[i] * a_idCard[i];            // 加权求和
  }
  let valCodePosition = sum % 11;                // 得到验证码所位置
  if (a_idCard[17] == ValideCode[valCodePosition]) {
    return true;
  } else {
    return false;
  }
}
/**
 * 验证18位数身份证号码中的生日是否是有效生日
 * @param idCard 18位书身份证字符串
 * @return
 */
function isValidityBrithBy18IdCard (idCard18) {
  var year = idCard18.substring(6, 10);
  var month = idCard18.substring(10, 12);
  var day = idCard18.substring(12, 14);
  var temp_date = new Date(year, parseFloat(month) - 1, parseFloat(day));
  // 这里用getFullYear()获取年份，避免千年虫问题
  if (temp_date.getFullYear() != parseFloat(year)
    || temp_date.getMonth() != parseFloat(month) - 1
    || temp_date.getDate() != parseFloat(day)) {
    return false;
  } else {
    return true;
  }
}
/**
 * 验证15位数身份证号码中的生日是否是有效生日
 * @param idCard15 15位书身份证字符串
 * @return
 */
function isValidityBrithBy15IdCard (idCard15) {
  var year = idCard15.substring(6, 8);
  var month = idCard15.substring(8, 10);
  var day = idCard15.substring(10, 12);
  var temp_date = new Date(year, parseFloat(month) - 1, parseFloat(day));
  // 对于老身份证中的你年龄则不需考虑千年虫问题而使用getYear()方法
  if (temp_date.getYear() != parseFloat(year)
    || temp_date.getMonth() != parseFloat(month) - 1
    || temp_date.getDate() != parseFloat(day)) {
    return false;
  } else {
    return true;
  }
}
//去掉字符串头尾空格
function trim (str) {
  return str.replace(/(^\s*)|(\s*$)/g, "");
}


