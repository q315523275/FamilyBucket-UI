import api from '../../api/user' // eslint-disable-line
import Base from '../Base/index'

export default class extends Base {
  // constructor (vm) {
  //   super(vm)
  // }
  submitForm (formName) {
    this.vm.$refs[formName].validate(async (valid) => {
      if (valid) {
        const res = await api.SetPassword({
          OldPassword: this.vm.ruleForm2.oldPass,
          NewPassword: this.vm.ruleForm2.pass
        }, {
          loadMsg: '设置中...'
        })
        if (res) {
          this.vm.$notify({
            title: '成功',
            message: '设置成功',
            type: 'success',
            onClose: () => {
              this.vm.$router.push('/')
            }
          })
        }
      } else {
        return false
      }
    })
  }
}
