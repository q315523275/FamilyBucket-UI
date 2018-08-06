<template>
  <el-dialog :title="btnName" :visible.sync="show" :close-on-click-modal="false" width="50%">
    <el-form :model="modelForm" :rules="rules" ref="modelForm" label-width="120px" v-if="modelForm"
             v-loading="loading">
      <el-form-item label="服务名称" prop="Name">
        <el-input v-model="modelForm.Name"></el-input>
      </el-form-item>
      <el-form-item label="版本" prop="Version">
        <el-input v-model="modelForm.Version"></el-input>
      </el-form-item>
      <el-form-item label="标签" prop="Tags">
        <el-tag :key="tag" type="danger" v-for="tag in modelForm.Tags" closable @close="tagClose(modelForm.Tags, tag)">{{tag}}</el-tag>
        <el-input class="input-new-tag" v-model="inputTagValue" placeholder="输入回车确认" @keyup.enter.native="handleInputTagConfirm(modelForm.Tags)" @blur="handleInputTagConfirm(modelForm.Tags)"></el-input>
      </el-form-item>
      <el-form-item label="服务地址" prop="HostAndPort">
        <el-col :span="10">
          <el-input v-model="modelForm.HostAndPort.Host" placeholder="地址" size="medium"></el-input>
        </el-col>
        <el-col :span="6">
          <el-input v-model="modelForm.HostAndPort.Port" placeholder="端口" size="medium" style="margin-left:10px"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="健康检查地址" prop="HealthCheckUri">
        <el-input v-model="modelForm.HealthCheckUri"></el-input>
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
      inputTagValue: '',
      rules: {
        Name: [
          { required: true, message: '请输入服务名称', trigger: 'blur' }
        ],
        Version: [
          { required: true, message: '请输入版本号', trigger: 'blur' }
        ],
        HostAndPort: [
          { required: true, message: '请输入服务地址', trigger: 'blur' }
        ],
        HealthCheckUri: [
          { required: true, message: '请输入检查地址', trigger: 'blur' }
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
    tagClose (arr, tag) {
      arr.splice(arr.indexOf(tag), 1)
    },
    handleInputTagConfirm (arr) {
      let inputValue = this.inputTagValue
      if (inputValue) {
        arr.push(inputValue)
      }
      this.inputTagValue = ''
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
.el-tag + .el-tag, .ml10 {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 120px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
