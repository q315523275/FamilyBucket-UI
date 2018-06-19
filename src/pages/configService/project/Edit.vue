<template>
  <el-dialog :title="btnName" :visible.sync="show" :close-on-click-modal="false" width="50%">
    <el-form :model="modelForm" :rules="rules" ref="modelForm" label-width="120px" v-if="modelForm"
             v-loading="loading">
      <el-form-item label="项目名称" prop="Name">
        <el-input v-model="modelForm.Name"></el-input>
      </el-form-item>
      <el-form-item label="归属项目组" prop="AppId">
        <el-select v-model='modelForm.AppId' placeholder='请选择'>
          <el-option v-for='item in appList' :key='item.AppId' :label='item.Name' :value='item.AppId'></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否公有" prop="IsPublic">
        <el-switch v-model="modelForm.IsPublic"></el-switch>
      </el-form-item>
      <el-form-item label="备注" prop="Comment">
        <el-input type="textarea" v-model="modelForm.Comment"></el-input>
      </el-form-item>
      <el-form-item label="是否删除" prop="IsDeleted">
        <el-switch v-model="modelForm.IsDeleted"></el-switch>
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
      appList: [],
      show: false,
      btnName: '新建',
      rules: {
        Name: [
          { required: true, message: '请输入项目名称', trigger: 'blur' }
        ],
        AppId: [
          { required: true, message: '请选择项目组', trigger: 'blur' }
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
    this.BLL.init()
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
