<template>
  <el-dialog :title="btnName" :visible.sync="show" :close-on-click-modal="false" width="50%">
    <el-form :model="modelForm" :rules="rules" ref="modelForm" label-width="120px" v-if="modelForm"
             v-loading="loading">
      <el-form-item label="环境" prop="Environment">
        {{ modelForm.Environment }}
      </el-form-item>
      <el-form-item label="归属项目组" prop="ConfigAppId">
        <el-select v-model='modelForm.ConfigAppId' placeholder='请选择' @change='searchNamespace()'>
          <el-option v-for='item in appList' :key='item.AppId' :label='item.Name' :value='item.AppId'></el-option>
        </el-select>
      </el-form-item>
       <el-form-item label="归属项目" prop="ConfigNamespaceName">
        <el-select v-model='modelForm.ConfigNamespaceName' placeholder='请选择项目'>
          <el-option v-for='item in nameSpaceList' :key='item.Name' :label='item.Name' :value='item.Name'></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="配置Key" prop="ConfigKey">
        <el-input v-model="modelForm.ConfigKey"></el-input>
      </el-form-item>
      <el-form-item label="配置Value" prop="ConfigValue">
        <el-input type="textarea" v-model="modelForm.ConfigValue"></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="Comment">
        <el-input type="textarea" v-model="modelForm.Remark"></el-input>
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
    },
    appList: {
      type: Array
    }
  },
  data () {
    return {
      data: [],
      nameSpaceList: [],
      filters: {
        AppId: null
      },
      show: false,
      btnName: '新建',
      rules: {
        Environment: [
          { required: true, message: '环境数据丢失', trigger: 'blur' }
        ],
        ConfigKey: [
          { required: true, message: '请输入配置项', trigger: 'blur' }
        ],
        ConfigValue: [
          { required: true, message: '请输入配置值', trigger: 'blur' }
        ],
        ConfigAppId: [
          { required: true, message: '请选择项目组', trigger: 'blur' }
        ],
        ConfigNamespaceName: [
          { required: true, message: '请选择项目', trigger: 'blur' }
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
    },
    searchNamespace () {
      this.filters.AppId = this.modelForm.ConfigAppId
      this.BLL.searchProejct()
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
        this.nameSpaceList = []
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
