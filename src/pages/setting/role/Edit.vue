<template>
  <el-dialog :title="btnName" :visible.sync="show" :close-on-click-modal="false" width="50%" style="padding-right:24px;">
    <el-form :model="modelForm" :rules="rules" ref="modelForm" label-width="120px" v-if="modelForm"
             v-loading="loading">
      <el-row>
        <el-col :span="12">
          <el-form-item label="所属项目" prop="ProjectName">
            <el-select v-model='modelForm.PlatformKey' placeholder='请选择项目' @change='BLL.searchApiList()'>
              <el-option v-for='item in platformList' :key='item.Key' :label='item.Name' :value='item.Key'></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="是否禁用" prop="IsDel">
            <el-switch active-text="禁用" active-color="#F56C6C" inactive-color="#F2F6FC" v-model="modelForm.IsDel"></el-switch>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="角色名称" prop="Name">
            <el-input v-model="modelForm.Name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="角色标识" prop="Key">
            <el-input v-model="modelForm.Key"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="备注" prop="Remark">
        <el-input type="textarea" v-model="modelForm.Remark"></el-input>
      </el-form-item>
      <el-form-item label="菜单权限" v-if="menusList">
        <el-tree
          :data="menusList"
          show-checkbox
          node-key="id"
          ref="menusTree"
          highlight-current
          :props="defaultProps">
        </el-tree>
      </el-form-item>
      <el-form-item label="接口权限" v-if="apiTreeList">
         <el-tree
          :data="apiTreeList"
          show-checkbox
          node-key="id"
          ref="apiTree"
          :default-checked-keys="apiTreeCheck"
          highlight-current
          :props="defaultProps">
        </el-tree>
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
    menusList: {
      type: Array
    },
    platformList: {
      type: Array
    }
  },
  data () {
    return {
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      apiTreeList: [],
      apiTreeCheck: [],
      show: false,
      btnName: '新建',
      rules: {
        PlatformKey: [
          { required: true, message: '请选择所属平台', trigger: 'blur' }
        ],
        Name: [
          { required: true, message: '请输入角色名称', trigger: 'blur' }
        ],
        Key: [
          { required: true, message: '请输入角色标识', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    // 初始化
    this.BLL = new BLL(this)
    if (this.value) {
      this.show = true
      this.BLL.searchApiList()
      this.BLL.editInit()
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
          this.BLL.editInit()
          if (this.modelForm.Id) {
            this.btnName = '编辑'
          } else {
            this.btnName = '新建'
          }
        })
      } else {
        this.$refs.modelForm.clearValidate()
        this.$refs.apiTree.setCheckedKeys([])
        this.$refs.menusTree.setCheckedKeys([])
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
