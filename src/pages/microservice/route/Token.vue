<template>
  <el-dialog :title="btnName" :visible.sync="show" :close-on-click-modal="false" width="50%">
    <el-form :model="modelForm" :rules="rules" ref="modelForm" label-width="140px" v-if="modelForm"
             v-loading="loading">
      <el-form-item label="网关地址" prop="GatewayURL">
        <el-input v-model="modelForm.GatewayURL"></el-input>
      </el-form-item>
      <el-form-item label="配置Token" prop="AccessToken">
        <el-input v-model="modelForm.AccessToken"></el-input>
      </el-form-item>
      <el-form-item label="配置地址" prop="SettingURL">
        <el-input v-model="modelForm.SettingURL"></el-input>
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
    }
  },
  data () {
    return {
      data: [],
      show: false,
      btnName: '新建',
      rules: {
        GatewayURL: [
          { required: true, message: '请输入网关地址', trigger: 'blur' }
        ],
        AccessToken: [
          { required: true, message: '请输入设置Token', trigger: 'blur' }
        ],
        SettingURL: [
          { required: true, message: '路由配置地址', trigger: 'blur' }
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
      this.BLL.authSubmit(ev)
    }
  },
  watch: {
    show (val) {
      this.$emit('input', val)
      if (val) {
        this.$nextTick(() => {
          this.btnName = '认证授权'
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
