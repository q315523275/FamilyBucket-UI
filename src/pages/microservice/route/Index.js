import api from '../../../api/microservice' // eslint-disable-line
import Base from '../../Base/index'

export default class extends Base {
  async search () {
    const filter = this.vm.filters
    const res = await api.GetApiGatewayConfiguration(filter)
    if (res) {
      this.vm.allData = res.Data
      this.vm.dataList = this.vm.allData.ReRoutes
    }
  }
  add () {
    this.vm.editModel = {
      DownstreamPathTemplate: null,
      UpstreamPathTemplate: null,
      UpstreamHttpMethod: [],
      AddHeadersToRequest: {},
      UpstreamHeaderTransform: {},
      DownstreamHeaderTransform: {},
      AddClaimsToRequest: {},
      RouteClaimsRequirement: {},
      AddQueriesToRequest: {},
      RequestIdKey: null,
      FileCacheOptions: {
        TtlSeconds: 0,
        Region: null
      },
      ReRouteIsCaseSensitive: false,
      ServiceName: null,
      DownstreamScheme: null,
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
      DownstreamHostAndPorts: [
        {
          Host: '',
          Port: 80
        }
      ],
      UpstreamHost: null,
      Key: null,
      DelegatingHandlers: [],
      Priority: 0,
      Timeout: 0,
      DangerousAcceptAnyServerCertificateValidator: false
    }
    this.vm.editIndex = -1
    this.vm.showEdit = true
  }
  editSubmit () {
    this.vm.$refs.modelForm.validate(async (valid) => {
      if (valid) {
        if (this.vm.editIndex === -1) {
          this.vm.allModel.ReRoutes.push(this.vm.modelForm)
        } else {
          this.vm.allModel.ReRoutes.splice(this.vm.editIndex, 1, this.vm.modelForm)
        }
        const op = { loadID: 'edit' }
        const res = await api.SetApiGatewayConfiguration(this.vm.allModel, op)
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
