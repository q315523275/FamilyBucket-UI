<template>
  <el-dialog :title="btnName" :visible.sync="show" :close-on-click-modal="false" width="60%">
    <el-form :model="modelForm" :rules="rules" ref="modelForm" label-width="120px" v-if="modelForm"
             v-loading="loading">
      <el-row>
        <el-col :span="12">
          <el-form-item label="上游路径" prop="UpstreamPathTemplate">
            <el-input v-model="modelForm.UpstreamPathTemplate"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="上游请求" prop="UpstreamHttpMethod">
            <el-checkbox-group v-model="modelForm.UpstreamHttpMethod" size="medium">
              <el-checkbox-button label="Get" key="Get">Get</el-checkbox-button>
              <el-checkbox-button label="Post" key="Post">Post</el-checkbox-button>
              <el-checkbox-button label="Put" key="Put">Put</el-checkbox-button>
              <el-checkbox-button label="Delete" key="Delete">Delete</el-checkbox-button>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="下游路径" prop="DownstreamPathTemplate">
            <el-input v-model="modelForm.DownstreamPathTemplate"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="下游请求" prop="DownstreamScheme">
            <el-radio-group v-model="modelForm.DownstreamScheme" size="medium">
              <el-radio-button label="http"></el-radio-button>
              <el-radio-button label="https"></el-radio-button>
              <el-radio-button label="ws"></el-radio-button>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="下游地址" prop="UseServiceDiscovery">
            <el-switch v-model="modelForm.UseServiceDiscovery" active-text="服务发现" inactive-text="指定地址"></el-switch>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="地址负载" prop="LoadBalancerOptions">
            <el-select v-model="modelForm.LoadBalancerOptions.Type" placeholder="请选择">
              <el-option value='LeastConnection' key='LeastConnection' label='请求较少'></el-option>
              <el-option value='RoundRobin' key='RoundRobin' label='循环可用'></el-option>
              <el-option value='NoLoadBalancer' key='NoLoadBalancer' label='第一个地址'></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item v-if="!modelForm.UseServiceDiscovery" v-for="(hostAndPort, index) in modelForm.DownstreamHostAndPorts" :label="'下游地址' + index" :key="hostAndPort.Host" :prop="'DownstreamHostAndPorts.' + index + '.Host'"
        :rules="{ required: true, message: '地址不能为空', trigger: 'blur' }">
        <el-col :span="10">
          <el-input v-model="hostAndPort.Host" placeholder="请输入地址" size="medium" style="border-radius: 2px 0 0 2px"></el-input>
        </el-col>
        <el-col :span="6">
          <el-input v-model="hostAndPort.Port" placeholder="请输入端口" size="medium" style="border-radius: 0 2px 2px 0; margin-left:-1px"></el-input>
        </el-col>
        <el-col :span="8" style='float:left'>
          <el-button @click.prevent="addHostAndPort()" size="medium" style="margin-left:15px">增加</el-button>
          <el-button @click.prevent="removeHostAndPort(hostAndPort)" size="medium">删除</el-button>
        </el-col>
      </el-form-item>
      <el-form-item v-if="modelForm.UseServiceDiscovery" label="服务名称" prop="ServiceName">
        <el-col :span="12">
          <el-input v-model="modelForm.ServiceName"></el-input>
        </el-col>
      </el-form-item>
      <el-row>
        <el-col :span="12">
          <el-form-item label="区分小大写" prop="ReRouteIsCaseSensitive">
            <el-switch v-model="modelForm.ReRouteIsCaseSensitive"></el-switch>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="请求标识" prop="RequestIdKey">
            <el-switch v-model="modelForm.RequestIdKey"></el-switch>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="配置权重" prop="Priority">
            <el-input-number v-model="modelForm.Priority" :min="0"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="超时时间" prop="Timeout">
            <el-input-number v-model="modelForm.Timeout" :min="0"></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="路由Key" prop="Key">
            <el-input v-model="modelForm.Key"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="SSL警告" prop="DangerousAcceptAnyServerCertificateValidator">
            <el-switch v-model="modelForm.DangerousAcceptAnyServerCertificateValidator"></el-switch>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="认证授权" prop="AuthenticationOptions">
        <el-input v-model="modelForm.AuthenticationOptions.AuthenticationProviderKey"></el-input>
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
      rules: {}
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
    addHostAndPort () {
      this.modelForm.DownstreamHostAndPorts.push({
        Host: '',
        Port: 80
      })
    },
    removeHostAndPort (item) {
      var index = this.modelForm.DownstreamHostAndPorts.indexOf(item)
      if (index !== -1) {
        this.modelForm.DownstreamHostAndPorts.splice(index, 1)
      }
    }
  },
  watch: {
    show (val) {
      this.$emit('input', val)
      if (val) {
        this.$nextTick(() => {
          const data = []
          this.data = data
          if (this.modelForm.UpstreamPathTemplate) {
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
