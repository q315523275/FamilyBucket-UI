// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// 例子：
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
Date.prototype.format = function (n) {
  var i = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        S: this.getMilliseconds()
      },
      t;
  /(y+)/.test(n) && (n = n.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length)))
  for (t in i) new RegExp("(" + t + ")").test(n) && (n = n.replace(RegExp.$1, RegExp.$1.length == 1 ? i[t] : ("00" + i[t]).substr(("" + i[t]).length)))
  return n
}
function getDate(date) {
  if (!date) {
    date = new Date()
  } else {
    // date类型
    if (date instanceof Date) {

    }
    // unix时间戳
    else if (/^\d{10|13}$/.test(date)) {
      date = new Date(parseInt(date) * 1000)
    }
    // 普通时间字符串
    else {
      date = new Date(date.replace(/-/g,"/"))
    }
  }
  return date
}

export default {
  removeTZ(date) {
    return date.replace(/T/, " ").replace(/Z/, "")
  },
  format(date, ft) {
    ft = ft || 'yyyy-MM-dd hh:mm:ss'
    return getDate(date).format(ft)
  },

  dateCompare(a, b) {
    var d1 = getDate(a)
    var d2 = getDate(b)
    return !( a != "" && b != "" && d1 >= d2)
  },

  add(date, value, type, ft) {
    ft = ft || 'yyyy-MM-dd hh:mm:ss'
    date = getDate(date)
    switch (type) {
      case 'mon':
        date.setMonth(date.getMonth() + value);
        break
      case 'day':
        date.setDate(date.getDate() + value);
        break
      case 'hou':
        date.setHours(date.getHours() + value);
        break
      case 'min':
        date.setMinutes(date.getMinutes() + value)
        break
      case 'sec':
        date.setSeconds(date.getSeconds() + value)
        break
    }
    return date.format(ft)
  },
  dataScope(a, b) {
    var date1 = getDate(a)
    var date2 = getDate(b)
    date2.setDate(date2.getDate() + 1)
    if (date1 > date2) {
      var tempDate = date1
      date1 = date2
      date2 = tempDate
    }
    date1.setDate(date1.getDate())
    var dateArr = []
    var i = 0
    while (!(date1.getFullYear() == date2.getFullYear()
    && date1.getMonth() == date2.getMonth() && date1.getDate() == date2
      .getDate())) {
      var dayStr = date1.getDate().toString()
      if (dayStr.length == 1) {
        dayStr = "0" + dayStr
      }
      dateArr[i] = date1.getFullYear() + "-" + (date1.getMonth() + 1) + "-"
        + dayStr
      i++
      date1.setDate(date1.getDate() + 1)
    }
    return dateArr
  }
}
