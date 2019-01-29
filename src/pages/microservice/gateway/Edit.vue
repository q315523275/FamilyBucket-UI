<template>
  <el-dialog :title="btnName" :visible.sync="show" :close-on-click-modal="false" width="50%">
    <el-form :model="modelForm" :rules="rules" ref="modelForm" label-width="120px" v-if="modelForm"
             v-loading="loading">
      <el-tabs type="card">
        <el-tab-pane label="基础信息">
          <el-form-item label="网关Code" prop="GatewayKey">
            <el-input v-model="modelForm.GatewayKey"></el-input>
          </el-form-item>
          <el-form-item label="网关地址" prop="BaseUrl">
            <el-input v-model="modelForm.BaseUrl"></el-input>
          </el-form-item>
          <el-form-item label="下游请求" prop="DownstreamScheme">
            <el-input v-model="modelForm.DownstreamScheme"></el-input>
          </el-form-item>
          <el-form-item label="请求标识" prop="RequestIdKey">
            <el-input v-model="modelForm.RequestIdKey"></el-input>
          </el-form-item>
          <el-form-item label="地址负载" prop="LoadBalancerOptions">
            <el-select v-model="modelForm.LoadBalancerOptions.Type" placeholder="请选择">
              <el-option value='LeastConnection' key='LeastConnection' label='请求较少'></el-option>
              <el-option value='RoundRobin' key='RoundRobin' label='循环可用'></el-option>
              <el-option value='NoLoadBalancer' key='NoLoadBalancer' label='第一个地址'></el-option>
            </el-select>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="熔断配置">
          <el-form-item label="允许异常次数" prop="QoSOptions.ExceptionsAllowedBeforeBreaking">
            <el-input-number v-model="modelForm.QoSOptions.ExceptionsAllowedBeforeBreaking" :min="0" label="熔断允许异常次数"></el-input-number>
          </el-form-item>
          <el-form-item label="熔断持续时间" prop="QoSOptions.DurationOfBreak">
            <el-input-number v-model="modelForm.QoSOptions.DurationOfBreak" :min="0" label="熔断持续时间"></el-input-number>
          </el-form-item>
          <el-form-item label="超时时间" prop="QoSOptions.TimeoutValue">
            <el-input-number v-model="modelForm.QoSOptions.TimeoutValue" :min="0" label="超时时间"></el-input-number>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="限速限流">
          <el-form-item label="禁用HEAD标头" prop="RateLimitOptions.DisableRateLimitHeaders">
            <el-switch active-text="禁用" inactive-text="不禁用" v-model="modelForm.RateLimitOptions.DisableRateLimitHeaders"></el-switch>
          </el-form-item>
          <el-form-item label="客户端标识" prop="RateLimitOptions.ClientIdHeader">
            <el-input v-model="modelForm.RateLimitOptions.ClientIdHeader"></el-input>
          </el-form-item>
          <el-form-item label="计数器标识" prop="RateLimitOptions.RateLimitCounterPrefix">
            <el-input v-model="modelForm.RateLimitOptions.RateLimitCounterPrefix"></el-input>
          </el-form-item>
          <el-form-item label="限速提示状消息" prop="RateLimitOptions.QuotaExceededMessage">
            <el-input v-model="modelForm.RateLimitOptions.QuotaExceededMessage"></el-input>
          </el-form-item>
          <el-form-item label="限速提示状态码" prop="RateLimitOptions.HttpStatusCode">
            <el-input v-model="modelForm.RateLimitOptions.HttpStatusCode"></el-input>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="HTTP处理">
          <el-form-item label="允许重定向" prop="HttpHandlerOptions.AllowAutoRedirect">
            <el-switch active-text="允许" inactive-text="不允许" v-model="modelForm.HttpHandlerOptions.AllowAutoRedirect"></el-switch>
          </el-form-item>
          <el-form-item label="使用Cookie容器" prop="HttpHandlerOptions.UseCookieContainer">
            <el-switch active-text="使用" inactive-text="不使用" v-model="modelForm.HttpHandlerOptions.UseCookieContainer"></el-switch>
          </el-form-item>
          <el-form-item label="内置追踪" prop="HttpHandlerOptions.UseTracing">
            <el-switch active-text="使用" inactive-text="不使用" v-model="modelForm.HttpHandlerOptions.UseTracing"></el-switch>
          </el-form-item>
          <el-form-item label="使用代理" prop="HttpHandlerOptions.UseProxy">
            <el-switch active-text="使用" inactive-text="不使用" v-model="modelForm.HttpHandlerOptions.UseProxy"></el-switch>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="服务发现">
          <el-form-item label="主机" prop="ServiceDiscoveryProvider.Host">
            <el-input v-model="modelForm.ServiceDiscoveryProvider.Host"></el-input>
          </el-form-item>
          <el-form-item label="端口" prop="ServiceDiscoveryProvider.Port">
            <el-input v-model="modelForm.ServiceDiscoveryProvider.Port"></el-input>
          </el-form-item>
          <el-form-item label="组件" prop="ServiceDiscoveryProvider.Type">
            <el-input v-model="modelForm.ServiceDiscoveryProvider.Type"></el-input>
          </el-form-item>
          <el-form-item label="组件Token" prop="ServiceDiscoveryProvider.Token">
            <el-input v-model="modelForm.ServiceDiscoveryProvider.Token"></el-input>
          </el-form-item>
          <el-form-item label="存储Key" prop="ServiceDiscoveryProvider.ConfigurationKey">
            <el-input v-model="modelForm.ServiceDiscoveryProvider.ConfigurationKey"></el-input>
          </el-form-item>
          <el-form-item label="轮询时间" prop="ServiceDiscoveryProvider.PollingInterval">
            <el-input v-model="modelForm.ServiceDiscoveryProvider.PollingInterval"></el-input>
          </el-form-item>
        </el-tab-pane>
      </el-tabs>
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
        GatewayKey: [
          { required: true, message: '请输入网关名称', trigger: 'blur' }
        ],
        RequestIdKey: [
          { required: true, message: '请输入请求标识', trigger: 'blur' }
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
