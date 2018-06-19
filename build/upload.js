require('shelljs/global')
var config = require('../config')
var File = config.build.assetsPublicPath.replace(/\//g, '').replace(/test/g, '')
const path = require('path')
var PATH = path.resolve(__dirname, '../../') + '/pub/'
// 测试环境
if (process.env.NODE_ENV === 'testing') {
  PATH += 'test/'
}
var distFile = PATH + File
var chalk = require('chalk')

mkdir('-p', PATH)
rm('-rf', distFile)
cp('-R', 'dist', distFile)
rm('-rf', 'dist')

console.log(chalk.bgGreen('upload path:', distFile.replace(/\//g, '\\')))
console.log(chalk.bgGreen('ok!!!'))
