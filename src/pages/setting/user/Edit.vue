<template>
  <el-dialog :title="btnName" :visible.sync="show" :close-on-click-modal="false" width="60%">
    <el-form :model="modelForm" :rules="rules" ref="modelForm" label-width="120px" v-if="modelForm"
             v-loading="loading">
      <el-form-item label="用户账号" prop="UserName">
        <el-input v-model="modelForm.UserName" :disabled="!!modelForm.Id"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="Password">
        <el-input type="password" v-model="modelForm.Password"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="Mobile">
        <el-input v-model="modelForm.Mobile"></el-input>
      </el-form-item>
      <el-form-item label="真实姓名" prop="RealName">
        <el-input v-model="modelForm.RealName"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="Email">
        <el-input v-model="modelForm.Email"></el-input>
      </el-form-item>
      <el-form-item label="账户状态" prop="State">
        <el-select v-model="modelForm.State">
          <el-option label="启用" :value=1></el-option>
          <el-option label="禁用" :value=2></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="选择角色" prop="Channel">
        <el-transfer v-model="modelForm.RoleIdList" :titles="['全部角色', '已选角色']" :data="data" style="width:90%"></el-transfer>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSubmit">{{btnName}}</el-button>
        <el-button @click="handleReset">重置</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script>
import BLL from './Index'
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    },
    modelForm: {
      type: Object
    },
    roleList: {
      type: Array
    }
  },
  data () {
    const validatePass = (rule, value, callback) => {
      if (this.btnName === '新建') {
        if (value === null) {
          callback(new Error('请输入密码'))
        } else {
          callback()
        }
      } else {
        callback()
      }
    }
    const validatePhone = (rule, value, callback) => {
      if (!this.$utils.Validate.chkFormat(value, 'phone')) {
        callback(new Error('请输入正确的手机号'))
      } else {
        callback()
      }
    }
    return {
      data: [],
      show: false,
      btnName: '新建',
      rules: {
        UserName: [
          { required: true, message: '请输入用户账号', trigger: 'blur' }
        ],
        Password: [
          { required: this.btnName === '新建', validator: validatePass, trigger: 'blur' }
        ],
        RealName: [
          { required: true, message: '请输入真实姓名', trigger: 'blur' }
        ],
        Phone: [
          { required: true, validator: validatePhone, trigger: 'blur' }
        ],
        RoleIdList: [
          { required: true, message: '请选择角色', trigger: 'blur', type: 'array' }
        ]
      }
    }
  },
  created () {
    // 初始化
    this.BLL = new BLL(this)
    if (this.value) {
      this.show = true
    }
  },
  computed: {
    loading () {
      return this.$store.getters.btnLoading.str && this.$store.getters.btnLoading.id === 'edit'
    }
  },
  mounted () { },
  methods: {
    handleReset () {
      this.$refs.modelForm.resetFields()
    },
    handleSubmit (ev) {
      this.BLL.editSubmit(ev)
    }
  },
  watch: {
    show (val) {
      this.$emit('input', val)
      if (val) {
        this.$nextTick(() => {
          const data = []
          if (this.roleList) {
            this.roleList.forEach(x => {
              data.push({
                key: x.Id,
                label: x.Name
              })
            })
          }
          this.data = data
          if (this.modelForm.Id) {
            this.btnName = '编辑'
          } else {
            this.btnName = '新建'
          }
        })
      } else {
        this.$refs.modelForm.clearValidate()
      }
    },
    value (val) {
      this.show = val
    }
  }
}
</script>
<style lang="less" rel="stylesheet/less">
.edit-contain {
  width: 50%;
  padding-top: 15px;
}
</style>
