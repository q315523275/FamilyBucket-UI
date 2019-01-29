import api from '../../../api/microservice' // eslint-disable-line
import Base from '../../Base/index'

export default class extends Base {
  async init () {
    const res = await api.QueryGatewayList({
      PageIndex: 1,
      PageSize: 100
    })
    if (res) {
      this.vm.gatewayList = res.Data
    }
  }

  async fetch (params) {
    const res = await api.QueryApiGatewayReRouteList(params)
    if (res) {
      this.vm.dataList = res.Data
      this.vm.pagination.total = res.Total
    }
  }

  async search () {
    this.vm.currentIndex = 1
    this.fetch({
      PageIndex: this.vm.currentIndex,
      PageSize: this.vm.pagination.size,
      ...this.vm.filters
    })
  }

  handleTableChange (pagination) {
    this.vm.currentIndex = pagination.current
    this.fetch({
      PageIndex: pagination.current,
      PageSize: pagination.pageSize,
      ...this.vm.filters
    })
  }

  add () {
    this.vm.editModel = {
      GatewayId: null,
      State: 1,
      UpstreamPathTemplate: null,
      UpstreamHttpMethod: [],
      UpstreamHost: null,
      DownstreamPathTemplate: null,
      DownstreamScheme: null,
      DownstreamHostAndPorts: [
        {
          Host: '',
          Port: 80
        }
      ],
      ServiceName: null,
      RequestIdKey: null,
      FileCacheOptions: {
        TtlSeconds: 0,
        Region: null
      },
      QoSOptions: {
        ExceptionsAllowedBeforeBreaking: 0,
        DurationOfBreak: 0,
        TimeoutValue: 0
      },
      LoadBalancerOptions: {
        Type: null,
        Key: null,
        Expiry: 0
      },
      RateLimitOptions: {
        ClientWhitelist: [],
        EnableRateLimiting: false,
        Period: null,
        PeriodTimespan: 0,
        Limit: 0
      },
      AuthenticationOptions: {
        AuthenticationProviderKey: null,
        AllowedScopes: []
      },
      HttpHandlerOptions: {
        AllowAutoRedirect: false,
        UseCookieContainer: false,
        UseTracing: false,
        UseProxy: false
      },
      UseServiceDiscovery: false,
      Key: null,
      DelegatingHandlers: [],
      Priority: 0,
      Timeout: 0,
      SecurityOptions: {
        IPAllowedList: [],
        IPBlockedList: []
      }
    }
    this.vm.editIndex = -1
    this.vm.showEdit = true
  }
  editSubmit () {
    this.vm.$refs.modelForm.validate(async (valid) => {
      if (valid) {
        const op = { loadID: 'edit' }
        const res = await api.SetApiGatewayReRoute(this.vm.modelForm, op)
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
}
