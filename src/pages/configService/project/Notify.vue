<template>
  <el-dialog title="应用通知" :visible.sync="show" :close-on-click-modal="false" width="35%">
    <el-form :model="modelForm" :rules="rules" ref="modelForm" label-width="120px" v-if="modelForm"
             v-loading="loading">
      <el-form-item label="组件名称" prop="CommandType">
        <el-select v-model='modelForm.CommandType' placeholder='请选择'>
          <el-option key='CommandType_0' label='配置客户端' value='Bucket.Config'></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="命令" prop="CommandText">
        <el-select v-model='modelForm.CommandText' placeholder='请选择'>
          <el-option key='CommandText_0' label='配置更新' value='Refresh'></el-option>
          <el-option key='CommandText_1' label='配置重载' value='Reload'></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSubmit">{{btnName}}</el-button>
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
      btnName: '发送网络命令',
      rules: {
        CommandType: [
          { required: true, message: '请选择组件', trigger: 'blur' }
        ],
        CommandText: [
          { required: true, message: '请选择命令', trigger: 'blur' }
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
      this.BLL.notifySubmit(ev)
    }
  },
  watch: {
    show (val) {
      this.$emit('input', val)
      if (val) {
        this.$nextTick(() => {
          const data = []
          this.data = data
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
