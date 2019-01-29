<template>
  <el-dialog title="数据同步" :visible.sync="show" :close-on-click-modal="false" width="35%">
    <el-form :model="modelForm" :rules="rules" ref="modelForm" label-width="120px" v-if="modelForm"
             v-loading="loading">
      <el-form-item label="目标数据源" prop="SyncTarget">
        <el-select v-model='modelForm.SyncTarget' placeholder='请选择'>
          <el-option key='SyncTarget_0' label='Redis' value='Redis'></el-option>
          <el-option key='SyncTarget_1' label='Consul' value='Consul'></el-option>
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
      btnName: '立即同步',
      rules: {
        SyncTarget: [
          { required: true, message: '请选择目标数据源', trigger: 'change' }
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
