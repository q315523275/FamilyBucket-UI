<template>
  <el-dialog :title="btnName" :visible.sync="show" :close-on-click-modal="false">
    <el-form :model="modelForm" :rules="rules" ref="modelForm" label-width="100px" v-if="modelForm"
             v-loading="loading" style="padding-right:24px;">
      <el-row>
        <el-col :span="12">
          <el-form-item label="名称" prop="Name">
            <el-input v-model="modelForm.Name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
           <el-form-item label="路径" prop="LinkUrl">
             <el-input v-model="modelForm.LinkUrl"></el-input>
           </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="平台" prop="PlatformId">
        <el-select v-model='modelForm.PlatformId' placeholder='请选择平台'>
          <el-option v-for='item in platformList' :key='item.Id' :label='item.Name' :value='item.Id'></el-option>
        </el-select>
      </el-form-item>
      <el-row>
        <el-col :span="12">
          <el-form-item label="级别" prop="level">
            <el-select v-model="modelForm.level" placeholder="请选择级别" @change="levelChange">
              <el-option label="一级目录" :value="0"></el-option>
              <el-option label="二级目录" :value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="上级" prop="ParentId" v-if="modelForm.level===1">
            <el-select v-model="modelForm.ParentId" placeholder="请选择上级目录">
              <el-option v-for="p in modelForm.parents" :key="p.Id" :label="p.Name" :value="p.Id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="图标" prop="Icon" v-if="modelForm.level===0">
        <el-select v-model="modelForm.Icon" placeholder="" filterable>
          <el-option v-for="(p,index) in this.navIcons" :key="p.key+index" :value="p.value" :label="p.key">
            <span style="float: left">{{p.key}}</span>
            <i class="axon-icon" v-if="p.value&&p.value.indexOf('#')>-1" style="float: right;"
               v-html="p.value"></i>
            <i :class="p.value" v-else style="float: right;"></i>
          </el-option>
        </el-select>
        <i class="axon-icon icon-size" v-if="modelForm.Icon&&modelForm.Icon.indexOf('#')>-1" style="padding-left: 10px"
           v-html="modelForm.Icon"></i>
        <i :class="modelForm.Icon" v-else style="padding-left: 10px"></i>
      </el-form-item>
      <el-row>
        <el-col :span="12">
          <el-form-item label="排序" prop="SortId">
            <el-input-number v-model="modelForm.SortId" :min="1"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="状态" prop="switchState">
            <el-switch on-text="启用" off-text="禁用" v-model="modelForm.switchState"></el-switch>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="关联接口" prop="ApiList">
        <el-select v-model="value5" multiple placeholder="请选择" style="width: 100%;">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
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
import { elIcon } from '../../../codes/navIcons'
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
      navIcons: [...elIcon],
      show: false,
      btnName: '新建',
      rules: {
        PlatformId: [
          { required: true, message: '请选择平台', trigger: 'blur' }
        ],
        Name: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ],
        Icon: [
          { required: true, message: '请输入图标', trigger: 'blur' }
        ],
        // LinkUrl: [
        //   { required: true, message: '请输入路径', trigger: 'blur' }
        // ],
        ParentId: [
          { required: true, message: '请输入上级目录', trigger: 'blur', type: 'number' }
        ]
      },
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value5: []
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
  mounted () {
  },
  computed: {
    loading () {
      return this.$store.getters.btnLoading.str && this.$store.getters.btnLoading.id === 'edit'
    }
  },
  methods: {
    handleReset () {
      this.$refs.modelForm.resetFields()
    },
    handleSubmit (ev) {
      this.BLL.editSubmit(ev)
    },
    levelChange (val) {
      if (val === 1 && this.modelForm.ParentId === 0) {
        this.modelForm.ParentId = null
      }
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
