import api from '../../../api/microservice' // eslint-disable-line
import Base from '../../Base/index'

export default class extends Base {
  async fetch (params) {
    const res = await api.QueryGatewayList(params)
    if (res) {
      this.vm.dataList = res.Data
      this.vm.pagination.total = res.Total
    }
  }

  async search () {
    this.vm.currentIndex = 1
    this.fetch({
      PageIndex: this.vm.currentIndex,
      PageSize: this.vm.pagination.size
    })
  }

  handleTableChange (pagination) {
    this.vm.currentIndex = pagination.current
    this.fetch({
      PageIndex: pagination.current,
      PageSize: pagination.pageSize
    })
  }

  add () {
    this.vm.editModel = {
      GatewayKey: null,
      BaseUrl: null,
      DownstreamScheme: null,
      RequestIdKey: null,
      HttpHandlerOptions: {
        AllowAutoRedirect: false,
        UseCookieContainer: false,
        UseTracing: false,
        UseProxy: false
      },
      LoadBalancerOptions: {
        Type: 'RoundRobin',
        Key: null,
        Expiry: 0
      },
      QoSOptions: {
        ExceptionsAllowedBeforeBreaking: 0,
        DurationOfBreak: 0,
        TimeoutValue: 0
      },
      ServiceDiscoveryProvider: {
        Host: '',
        Port: 8500,
        Type: null,
        Token: null,
        ConfigurationKey: 'Bucket.ApiGateway',
        PollingInterval: 0
      },
      RateLimitOptions: {
        ClientIdHeader: 'ClientId',
        QuotaExceededMessage: 'Customize Tips!',
        RateLimitCounterPrefix: 'ocelot',
        DisableRateLimitHeaders: false,
        HttpStatusCode: 429
      }
    }
    this.vm.showEdit = true
  }

  editSubmit () {
    this.vm.$refs.modelForm.validate(async (valid) => {
      if (valid) {
        const op = { loadID: 'edit' }
        const res = await api.SetApiGatewayConfiguration(this.vm.modelForm, op)
        if (res) {
          this.vm.show = false
          this.vm.$emit('addSuccess')
          this.vm.$notify({
            title: '成功',
            message: '操作成功',
            type: 'success'
          })
        }
      } else {
        return false
      }
    })
  }

  notifySubmit () {
    this.vm.$refs.modelForm.validate(async (valid) => {
      if (valid) {
        const op = { loadID: 'edit' }
        if (this.vm.modelForm.SyncTarget === 'Redis') {
          const res = await api.SyncApiGatewayConfigurationToRedis(this.vm.modelForm, op)
          if (res) {
            this.vm.show = false
            this.vm.$notify({
              title: '成功',
              message: 'Redis同步成功',
              type: 'success'
            })
          }
        }
        if (this.vm.modelForm.SyncTarget === 'Consul') {
          const res = await api.SyncApiGatewayConfigurationToConsul(this.vm.modelForm, op)
          if (res) {
            this.vm.show = false
            this.vm.$notify({
              title: '成功',
              message: 'Consul数据同步成功',
              type: 'success'
            })
          }
        }
      } else {
        return false
      }
    })
  }
}
