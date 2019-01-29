<template>
  <el-dialog :title="btnName" :visible.sync="show" :close-on-click-modal="false" width="60%">
    <el-form :model="modelForm" :rules="rules" ref="modelForm" label-width="120px" v-if="modelForm" v-loading="loading">
      <el-tabs type="card">
        <el-tab-pane label="基础信息">
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
          <el-form-item v-if="!modelForm.UseServiceDiscovery" v-for="(hostAndPort, index) in modelForm.DownstreamHostAndPorts" :label="'下游地址' + index" :key="index" :prop="'DownstreamHostAndPorts.' + index + '.Host'">
            <el-col :span="10">
              <el-input v-model="hostAndPort.Host" placeholder="地址" size="medium"></el-input>
            </el-col>
            <el-col :span="6">
              <el-input v-model="hostAndPort.Port" placeholder="端口" size="medium" style="margin-left:10px"></el-input>
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
              <el-form-item label="是否启用" prop="State">
                <el-switch on-text="启用" off-text="禁用" :active-value="1" :inactive-value="0" v-model="modelForm.State"></el-switch>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="归属网关" prop="GatewayId">
                <el-select v-model='modelForm.GatewayId' placeholder='请选择网关'>
                  <el-option value='' key='' label='全部'></el-option>
                  <el-option v-for='item in gatewayList' :key='item.GatewayId' :label='item.GatewayKey' :value='item.GatewayId'></el-option>
                </el-select>
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
              <el-form-item label="请求标识" prop="RequestIdKey">
                <el-input v-model="modelForm.RequestIdKey"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="内容缓存" prop="FileCacheOptions">
            <el-col :span="6">
              <el-input-number v-model="modelForm.FileCacheOptions.TtlSeconds" :min="0" label="缓存时长"></el-input-number>
            </el-col>
            <el-col :span="8">
              <el-input v-model="modelForm.FileCacheOptions.Region" placeholder="缓存路径" class="ml10"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="上游主机限制" prop="UpstreamHost">
            <el-row>
              <el-col :span="12">
                <el-input v-model="modelForm.UpstreamHost" placeholder="上游主机限制"></el-input>
              </el-col>
            </el-row>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="认证授权">
          <el-form-item label="说明">Key为空不验证权限</el-form-item>
          <el-form-item label="策略Key" prop="AuthenticationOptions.AuthenticationProviderKey">
            <el-input v-model="modelForm.AuthenticationOptions.AuthenticationProviderKey" label="认证授权策略Key"></el-input>
          </el-form-item>
          <el-form-item label="验证角色" prop="AuthenticationOptions.AllowedScopes">
            <el-tag :key="tag" type="danger" v-for="tag in modelForm.AuthenticationOptions.AllowedScopes" closable @close="tagClose(modelForm.AuthenticationOptions.AllowedScopes, tag)">{{tag}}</el-tag>
            <el-input class="input-new-tag" v-model="inputTagValue" placeholder="输入回车确认" @keyup.enter.native="handleInputTagConfirm(modelForm.AuthenticationOptions.AllowedScopes)" @blur="handleInputTagConfirm(modelForm.AuthenticationOptions.AllowedScopes)"></el-input>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="错误熔断">
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
          <el-form-item label="白名单" prop="RateLimitOptions.ClientWhitelist">
            <el-tag :key="tag" type="danger" v-for="tag in modelForm.RateLimitOptions.ClientWhitelist" closable @close="tagClose(modelForm.RateLimitOptions.ClientWhitelist, tag)">{{tag}}</el-tag>
            <el-input class="input-new-tag" v-model="inputTagValue" placeholder="输入回车确认" @keyup.enter.native="handleInputTagConfirm(modelForm.RateLimitOptions.ClientWhitelist)" @blur="handleInputTagConfirm(modelForm.RateLimitOptions.ClientWhitelist)"></el-input>
          </el-form-item>
          <el-form-item label="启用速率限制" prop="RateLimitOptions.EnableRateLimiting">
            <el-switch active-text="启用" inactive-text="禁用" v-model="modelForm.RateLimitOptions.EnableRateLimiting"></el-switch>
          </el-form-item>
          <el-form-item label="限制时间区间" prop="AuthenticationOptions.Period">
            <el-input v-model="modelForm.AuthenticationOptions.Period"></el-input>
          </el-form-item>
          <el-form-item label="时间后重试" prop="RateLimitOptions.PeriodTimespan">
            <el-input-number v-model="modelForm.RateLimitOptions.PeriodTimespan" :min="0"></el-input-number>
          </el-form-item>
          <el-form-item label="限制次数" prop="RateLimitOptions.Limit">
            <el-input-number v-model="modelForm.RateLimitOptions.Limit" :min="0"></el-input-number>
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
        <el-tab-pane label="黑白名单">
          <el-form-item label="白名单" prop="SecurityOptions.IPAllowedList">
            <el-tag :key="tag" type="danger" v-for="tag in modelForm.SecurityOptions.IPAllowedList" closable @close="tagClose(modelForm.SecurityOptions.IPAllowedList, tag)">{{tag}}</el-tag>
            <el-input class="input-new-tag" v-model="inputTagValue" placeholder="输入回车确认" @keyup.enter.native="handleInputTagConfirm(modelForm.SecurityOptions.IPAllowedList)" @blur="handleInputTagConfirm(modelForm.SecurityOptions.IPAllowedList)"></el-input>
          </el-form-item>
          <el-form-item label="黑名单" prop="SecurityOptions.IPBlockedList">
            <el-tag :key="tag" type="danger" v-for="tag in modelForm.SecurityOptions.IPBlockedList" closable @close="tagClose(modelForm.SecurityOptions.IPBlockedList, tag)">{{tag}}</el-tag>
            <el-input class="input-new-tag" v-model="inputTagValue" placeholder="输入回车确认" @keyup.enter.native="handleInputTagConfirm(modelForm.SecurityOptions.IPBlockedList)" @blur="handleInputTagConfirm(modelForm.SecurityOptions.IPBlockedList)"></el-input>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="委托处理">
          <el-form-item label="HttpClient委托" prop="DelegatingHandlers">
            <el-tag :key="tag" type="danger" v-for="tag in modelForm.DelegatingHandlers" closable @close="tagClose(modelForm.DelegatingHandlers, tag)">{{tag}}</el-tag>
            <el-input class="input-new-tag" v-model="inputTagValue" placeholder="输入回车确认" @keyup.enter.native="handleInputTagConfirm(modelForm.DelegatingHandlers)" @blur="handleInputTagConfirm(modelForm.DelegatingHandlers)"></el-input>
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
    },
    gatewayList: {
      type: Array
    }
  },
  data () {
    return {
      data: [],
      inputTagValue: '',
      show: false,
      btnName: '新建',
      rules: {
        GatewayId: [
          { required: true, message: '必填', trigger: 'change' }
        ],
        UpstreamPathTemplate: [
          { required: true, message: '必填', trigger: 'blur' }
        ],
        UpstreamHttpMethod: [
          { required: true, message: '必填', trigger: 'blur' }
        ],
        DownstreamPathTemplate: [
          { required: true, message: '必填', trigger: 'blur' }
        ],
        DownstreamScheme: [
          { required: true, message: '必填', trigger: 'blur' }
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
