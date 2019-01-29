<template>
  <el-dialog :title="btnName" :visible.sync="show" :close-on-click-modal="false" width="60%">
    <el-form :model="modelForm" :rules="rules" ref="modelForm" label-width="120px" v-if="modelForm"
             v-loading="loading">
      <el-row>
        <el-col :span="12">
          <el-form-item label="所属项目" prop="ProjectName">
            <el-select v-model='modelForm.ProjectName' placeholder='请选择项目'>
              <el-option v-for='item in projectList' :key='item.Code' :label='item.Name' :value='item.Code'></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="资源描述" prop="Message">
            <el-input v-model="modelForm.Message"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="资源Path" prop="Url">
            <el-input v-model="modelForm.Url"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
           <el-form-item label="请求方法" prop="Method">
             <el-radio-group v-model="modelForm.Method">
              <el-radio-button label="POST"></el-radio-button>
              <el-radio-button label="GET"></el-radio-button>
             </el-radio-group>
           </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="控制器" prop="Controller">
            <el-input v-model="modelForm.Controller"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
           <el-form-item label="控制器描述" prop="ControllerName">
             <el-input v-model="modelForm.ControllerName"></el-input>
           </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="是否禁用" prop="Disabled">
            <el-switch on-text="启用" off-text="禁用" v-model="modelForm.Disabled"></el-switch>
          </el-form-item>
        </el-col>
        <el-col :span="12">
           <el-form-item label="访问范围" prop="AllowScope">
            <el-select v-model='modelForm.AllowScope' placeholder='请选择'>
              <el-option label='匿名' :key='0' :value='0'></el-option>
              <el-option label='登陆' :key='1' :value='1'></el-option>
              <el-option label='角色' :key='2' :value='2'></el-option>
            </el-select>
           </el-form-item>
        </el-col>
      </el-row>
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
    projectList: {
      type: Array
    }
  },
  data () {
    return {
      data: [],
      show: false,
      btnName: '新建',
      rules: {
        ProjectName: [
          { required: true, message: '请选择项目', trigger: 'change' }
        ],
        Message: [
          { required: true, message: '请输入资源描述', trigger: 'blur' }
        ],
        Url: [
          { required: true, message: '请输入资源地址', trigger: 'blur' }
        ],
        Method: [
          { required: true, message: '请选择资源方法', trigger: 'blur' }
        ],
        Disabled: [
          { required: true, message: '请选择资源状态', trigger: 'blur' }
        ],
        AllowScope: [
          { required: true, message: '请选择访问范围', trigger: 'change' }
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
