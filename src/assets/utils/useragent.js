export default {
  getInfo() {
    var ua = window.navigator.userAgent;
    var reg = /Imoral\/((.)*)/ig;
    let array = null;
    ua.replace(reg, function () {
      array = arguments[1].split('/')
    });
    if (array) {
      return {
        'AppVersion': array[0],
        'Device': array[1],
        'SysVersion': array[2]
      };
    }
    return null
  }
}
