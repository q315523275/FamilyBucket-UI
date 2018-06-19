/*! FileSaver.js
 *  A saveAs() FileSaver implementation.
 *  2014-01-24
 *
 *  By Eli Grey, http://eligrey.com
 *  License: X11/MIT
 *    See LICENSE.md
 */
/*global self */
/*jslint bitwise: true, indent: 4, laxbreak: true, laxcomma: true, smarttabs: true, plusplus: true */
/*! @source http://purl.eligrey.com/github/FileSaver.js/blob/master/FileSaver.js */
var saveAs = saveAs
  // IE 10+ (native saveAs)
  || (typeof navigator !== 'undefined' &&
    navigator.msSaveOrOpenBlob && navigator.msSaveOrOpenBlob.bind(navigator))
  // Everyone else
  || (function (view) {
    'use strict'
    // IE <10 is explicitly unsupported
    if (typeof navigator !== 'undefined' &&
      /MSIE [1-9]\./.test(navigator.userAgent)) {
      return
    }
    var
      doc                      = view.document
      // only get URL when necessary in case BlobBuilder.js hasn't overridden it yet
      , get_URL                = function () {
        return view.URL || view.webkitURL || view
      }
      , URL                    = view.URL || view.webkitURL || view
      , save_link              = doc.createElementNS('http://www.w3.org/1999/xhtml', 'a')
      , can_use_save_link      = !view.externalHost && 'download' in save_link
      , click                  = function (node) {
        var event = doc.createEvent('MouseEvents')
        event.initMouseEvent(
          'click', true, false, view, 0, 0, 0, 0, 0
          , false, false, false, false, 0, null
        )
        node.dispatchEvent(event)
      }
      , webkit_req_fs          = view.webkitRequestFileSystem
      , req_fs                 = view.requestFileSystem || webkit_req_fs || view.mozRequestFileSystem
      , throw_outside          = function (ex) {
        (view.setImmediate || view.setTimeout)(function () {
          throw ex
        }, 0)
      }
      , force_saveable_type    = 'application/octet-stream'
      , fs_min_size            = 0
      , deletion_queue         = []
      , process_deletion_queue = function () {
        var i = deletion_queue.length
        while (i--) {
          var file = deletion_queue[i]
          if (typeof file === 'string') { // file is an object URL
            URL.revokeObjectURL(file)
          } else { // file is a File
            file.remove()
          }
        }
        deletion_queue.length = 0 // clear queue
      }
      , dispatch               = function (filesaver, event_types, event) {
        event_types = [].concat(event_types)
        var i = event_types.length
        while (i--) {
          var listener = filesaver['on' + event_types[i]]
          if (typeof listener === 'function') {
            try {
              listener.call(filesaver, event || filesaver)
            } catch (ex) {
              throw_outside(ex)
            }
          }
        }
      }
      , FileSaver              = function (blob, name) {
        // First try a.download, then web filesystem, then object URLs
        var
          filesaver             = this
          , type                = blob.type
          , blob_changed        = false
          , object_url
          , target_view
          , get_object_url      = function () {
            var object_url = get_URL().createObjectURL(blob)
            deletion_queue.push(object_url)
            return object_url
          }
          , dispatch_all        = function () {
            dispatch(filesaver, 'writestart progress write writeend'.split(' '))
          }
          // on any filesys errors revert to saving with object URLs
          , fs_error            = function () {
            // don't create more object URLs than needed
            if (blob_changed || !object_url) {
              object_url = get_object_url(blob)
            }
            if (target_view) {
              target_view.location.href = object_url
            } else {
              if (navigator.userAgent.match(/7\.[\d\s\.]+Safari/)	// is Safari 7.x
                && typeof window.FileReader !== 'undefined'			// can convert to base64
                && blob.size <= 1024 * 1024 * 150										// file size max 150MB
              ) {
                var reader = new window.FileReader()
                reader.readAsDataURL(blob)
                reader.onloadend = function () {
                  var frame = doc.createElement('iframe')
                  frame.src = reader.result
                  frame.style.display = 'none'
                  doc.body.appendChild(frame)
                  dispatch_all()
                  return
                }
                filesaver.readyState = filesaver.DONE
                filesaver.savedAs = filesaver.SAVEDASUNKNOWN
                return
              }
              else {
                window.open(object_url, '_blank')
                filesaver.readyState = filesaver.DONE
                filesaver.savedAs = filesaver.SAVEDASBLOB
                dispatch_all()
                return
              }
            }
          }
          , abortable           = function (func) {
            return function () {
              if (filesaver.readyState !== filesaver.DONE) {
                return func.apply(this, arguments)
              }
            }
          }
          , create_if_not_found = {create: true, exclusive: false}
          , slice
        filesaver.readyState = filesaver.INIT
        if (!name) {
          name = 'download'
        }
        if (can_use_save_link) {
          object_url = get_object_url(blob)
          // FF for Android has a nasty garbage collection mechanism
          // that turns all objects that are not pure javascript into 'deadObject'
          // this means `doc` and `save_link` are unusable and need to be recreated
          // `view` is usable though:
          doc = view.document
          save_link = doc.createElementNS('http://www.w3.org/1999/xhtml', 'a')
          save_link.href = object_url
          save_link.download = name
          var event = doc.createEvent('MouseEvents')
          event.initMouseEvent(
            'click', true, false, view, 0, 0, 0, 0, 0
            , false, false, false, false, 0, null
          )
          save_link.dispatchEvent(event)
          filesaver.readyState = filesaver.DONE
          filesaver.savedAs = filesaver.SAVEDASBLOB
          dispatch_all()
          return
        }
        // Object and web filesystem URLs have a problem saving in Google Chrome when
        // viewed in a tab, so I force save with application/octet-stream
        // http://code.google.com/p/chromium/issues/detail?id=91158
        if (view.chrome && type && type !== force_saveable_type) {
          slice = blob.slice || blob.webkitSlice
          blob = slice.call(blob, 0, blob.size, force_saveable_type)
          blob_changed = true
        }
        // Since I can't be sure that the guessed media type will trigger a download
        // in WebKit, I append .download to the filename.
        // https://bugs.webkit.org/show_bug.cgi?id=65440
        if (webkit_req_fs && name !== 'download') {
          name += '.download'
        }
        if (type === force_saveable_type || webkit_req_fs) {
          target_view = view
        }
        if (!req_fs) {
          fs_error()
          return
        }
        fs_min_size += blob.size
        req_fs(view.TEMPORARY, fs_min_size, abortable(function (fs) {
          fs.root.getDirectory('saved', create_if_not_found, abortable(function (dir) {
            var save = function () {
              dir.getFile(name, create_if_not_found, abortable(function (file) {
                file.createWriter(abortable(function (writer) {
                  writer.onwriteend = function (event) {
                    target_view.location.href = file.toURL()
                    deletion_queue.push(file)
                    filesaver.readyState = filesaver.DONE
                    filesaver.savedAs = filesaver.SAVEDASBLOB
                    dispatch(filesaver, 'writeend', event)
                  }
                  writer.onerror = function () {
                    var error = writer.error
                    if (error.code !== error.ABORT_ERR) {
                      fs_error()
                    }
                  }
                  'writestart progress write abort'.split(' ').forEach(function (event) {
                    writer['on' + event] = filesaver['on' + event]
                  })
                  writer.write(blob)
                  filesaver.abort = function () {
                    writer.abort()
                    filesaver.readyState = filesaver.DONE
                    filesaver.savedAs = filesaver.FAILED
                  }
                  filesaver.readyState = filesaver.WRITING
                }), fs_error)
              }), fs_error)
            }
            dir.getFile(name, {create: false}, abortable(function (file) {
              // delete file if it already exists
              file.remove()
              save()
            }), abortable(function (ex) {
              if (ex.code === ex.NOT_FOUND_ERR) {
                save()
              } else {
                fs_error()
              }
            }))
          }), fs_error)
        }), fs_error)
      }
      , FS_proto               = FileSaver.prototype
      , saveAs                 = function (blob, name) {
        return new FileSaver(blob, name)
      }
    FS_proto.abort = function () {
      var filesaver = this
      filesaver.readyState = filesaver.DONE
      filesaver.savedAs = filesaver.FAILED
      dispatch(filesaver, 'abort')
    }
    FS_proto.readyState = FS_proto.INIT = 0
    FS_proto.WRITING = 1
    FS_proto.DONE = 2
    FS_proto.FAILED = -1
    FS_proto.SAVEDASBLOB = 1
    FS_proto.SAVEDASURI = 2
    FS_proto.SAVEDASUNKNOWN = 3
    FS_proto.error =
      FS_proto.onwritestart =
        FS_proto.onprogress =
          FS_proto.onwrite =
            FS_proto.onabort =
              FS_proto.onerror =
                FS_proto.onwriteend =
                  null
    view.addEventListener('unload', process_deletion_queue, false)
    saveAs.unload = function () {
      process_deletion_queue()
      view.removeEventListener('unload', process_deletion_queue, false)
    }
    return saveAs
  }(
    typeof self !== 'undefined' && self
    || typeof window !== 'undefined' && window
    || this.content
  ))
// `self` is undefined in Firefox for Android content script context
// while `this` is nsIContentFrameMessageManager
// with an attribute `content` that corresponds to the window
// if (typeof module !== 'undefined' && module !== null) {
//   module.exports = saveAs
// } else if ((typeof define !== 'undefined' && define !== null) && (define.amd != null)) {
//   define([], function () {
//     return saveAs
//   })
// } else if (typeof Meteor !== 'undefined') { // make it available for Meteor
//   Meteor.saveAs = saveAs
// }
function datenum (v, date1904) {
  if (date1904) v += 1462
  var epoch = Date.parse(v)
  return (epoch - new Date(Date.UTC(1899, 11, 30))) / (24 * 60 * 60 * 1000)
}

function sheet_from_array_of_arrays (data, opts) {
  let merges = []
  var ws = {}
  var range = {s: {c: 10000000, r: 10000000}, e: {c: 0, r: 0}}
  for (var R = 0; R != data.length; ++R) {
    for (var C = 0; C != data[R].length; ++C) {
      if (range.s.r > R) range.s.r = R
      if (range.s.c > C) range.s.c = C
      if (range.e.r < R) range.e.r = R
      if (range.e.c < C) range.e.c = C
      var cell = {
        v: data[R][C]
      }
      if (opts) {
        if (opts.merges) {
          let col = opts.merges.find(x => x === C)
          if (col && R > 0) {
            if (data[R][C] === data[R - 1][C]) {
              let obj = merges.find(x => x.c === C && x.r2 === R - 1)
              if (obj) {
                obj.r2 = R
              } else {
                merges.push({
                  c: C,
                  r1: R - 1,
                  r2: R
                })
              }
            }
          }
        }
      }
      if (cell.v == null) continue
      var cell_ref = XLSX.utils.encode_cell({c: C, r: R})
      if (typeof cell.v === 'number') {
        cell.t = 'n'
      }
      else if (typeof cell.v === 'boolean') cell.t = 'b'
      else if (cell.v instanceof Date) {
        cell.t = 'n'
        cell.z = XLSX.SSF._table[14]
        cell.v = datenum(cell.v)
      }
      else cell.t = 's'
      ws[cell_ref] = cell
    }
  }
  if (range.s.c < 10000000) ws['!ref'] = XLSX.utils.encode_range(range)
  if (merges) {
    // 合并单元格
    let myMerges = []
    merges.sort((x1, x2) => x1.c - x2.c)
    merges.forEach(x => {
      myMerges.push({
        s: {//s为开始
          c: x.c,//开始列
          r: x.r1//开始取值范围
        },
        e: {//e结束
          c: x.c,//结束列
          r: x.r2//结束范围
        }
      })
    })
    ws['!merges'] = myMerges
  }
  return ws
}

function Workbook () {
  if (!(this instanceof Workbook)) return new Workbook()
  this.SheetNames = []
  this.Sheets = {}
}

function s2ab (s) {
  var buf = new ArrayBuffer(s.length)
  var view = new Uint8Array(buf)
  for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
  return buf
}

function fixdata (data) { //文件流转BinaryString
  var o = '',
      l = 0,
      w = 10240
  for (; l < data.byteLength / w; ++l) o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)));
  o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)))
  return o
}

function importExcel (obj, header) {
  return new Promise((resolve, reject) => {
    var wb//读取完成的数据
    if (!obj.files) {
      return
    }
    var f = obj.files[0]
    var reader = new FileReader()
    reader.onload = function (e) {
      var data = e.target.result
      wb = XLSX.read(data, {
        type: 'binary'
      })
      //wb.SheetNames[0]是获取Sheets中第一个Sheet的名字
      //wb.Sheets[Sheet名]获取第一个Sheet的数据
      // document.getElementById('demo').innerHTML = JSON.stringify(XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]))
      resolve(XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], {header: header}))
    }
    reader.readAsBinaryString(f)
  })
}

export default {
  /**
   * 普通导出excel
   * @param data 导出数据，格式为2维数组，例如 [['第一列','第二列'],[1,2],['a','b']]
   * @param ws_name excel的sheet名
   * @param excelName excel的文件名
   * @param opts 合并单元格选项，会自动合并相邻行相等的数据，例如第二列数据要进行合并操作，{merges: [1]}，列数从0开始
   */
  exportExcel (data, ws_name, excelName, opts) {
    var wb = new Workbook(), ws = sheet_from_array_of_arrays(data, opts)
    wb.SheetNames.push(ws_name)
    wb.Sheets[ws_name] = ws
    var wbout = XLSX.write(wb, {bookType: 'xlsx', bookSST: true, type: 'binary'})
    /* write file */
    saveAs(new Blob([s2ab(wbout)], {type: 'application/octet-stream'}), excelName + '.xlsx')
  },
  /**
   * table组件导出excel
   * @param dataList table的dataList
   * @param columns table的columns
   * @param ws_name excel的sheet名
   * @param excelName excel的文件名
   * @param filterList 过滤数组，例如 ['Id']
   * @param opts 合并单元格选项，会自动合并相邻行相等的数据，例如第二列数据要进行合并操作，{merges: [1]}，列数从0开始
   */
  tableExportExcel (dataList, columns, ws_name, excelName, filterList, opts) {
    let arr = [Object.keys(columns).map((k) => {
      if (!filterList || filterList.indexOf(columns[k].prop) === -1) {
        return columns[k].label
      }
    }).filter(x => x)]
    dataList.forEach((x) => {
      let sub = Object.keys(columns).map((k) => {
        if (!filterList || filterList.indexOf(columns[k].prop) === -1) {
          // 自定义输出格式
          if (columns[k].excelFormat) {
            return columns[k].excelFormat(x[columns[k].prop])
          }
          // 不存在返回空格，避免错位
          if (x[columns[k].prop] === null || x[columns[k].prop] === '') {
            return ' '
          }
          return x[columns[k].prop].toString()
        }
      })
      arr.push(sub)
    })
    this.exportExcel(arr, ws_name, excelName, opts)
  },
  /**
   * 导入excel
   * @param obj input file的dom
   * @param columns table的columns
   * @param header excel是否有header（默认0：有头，没有：1）
   * @returns {Promise}
   */
  tableImportExcel (obj, columns, header = 0) {
    let array = []
    return new Promise((resolve, reject) => {
      importExcel(obj, header).then(excelData => {
        excelData.forEach(x => {
          let item = []
          Object.keys(x).forEach(y => {
            if (columns) {
              let find = columns.find(z => z.label === y)
              if (find) {
                if (item.length === 0) {
                  item = {}
                }
                item[find.prop] = x[y]
              } else {
                item.push(x[y])
              }
            } else {
              item.push(x[y])
            }
          })
          array.push(item)
        })
        resolve(array)
      })
    })
  }
}
