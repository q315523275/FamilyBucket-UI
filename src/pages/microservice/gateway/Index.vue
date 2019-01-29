<template>
  <div class='container'>
    <el-form :inline='true' :model='filters'>
      <el-form-item>
        <el-button type='primary' @click='BLL.search()'>刷新</el-button>
        <el-button type='primary' @click='BLL.add()'>新增</el-button>
      </el-form-item>
    </el-form>
    <iTable :tableData='dataList' :columns='columns' :loading='loading' :pageSize=20 ref='iTable'
            :otherHeight='230' :operateColumn="operateColumn" @handleTableChange="handleTableChange"></iTable>
    <edit v-model='showEdit' :modelForm='editModel' @addSuccess='BLL.search()'></edit>
    <notify v-model='showNotify' :modelForm='notifyModel'></notify>
  </div>
</template>

<script type='text/jsx'>
import iTable from '../../../components/iTable.vue'
import BLL from './Index'
import Edit from './Edit.vue'
import Notify from './Notify.vue'

export default {
  components: { iTable, Edit, Notify },
  data () {
    return {
      editModel: null,
      showEdit: false,
      notifyModel: null,
      showNotify: false,
      dataList: [],
      filters: {},
      columns: [
        {
          prop: 'GatewayId',
          label: '网关编号',
          width: 80,
          align: 'center'
        },
        {
          prop: 'GatewayKey',
          label: '网关Code'
        },
        {
          prop: 'RequestIdKey',
          label: '请求标识'
        },
        {
          prop: 'LoadBalancerOptions',
          label: '负载方式'
        },
        {
          prop: 'ServiceDiscoveryProvider',
          label: '服务发现'
        },
        {
          prop: 'QoSOptions',
          label: '熔断配置'
        },
        {
          prop: 'RateLimitOptions',
          label: '限速配置'
        }
      ], // 操作列
      operateColumn: {
        width: 200,
        fixed: 'right',
        list: [
          {
            type: 'primary',
            name: '编辑',
            icon: 'edit',
            method: (index, row) => {
              this.editModel = {
                GatewayId: row.GatewayId,
                GatewayKey: row.GatewayKey,
                BaseUrl: row.BaseUrl,
                DownstreamScheme: row.DownstreamScheme,
                RequestIdKey: row.RequestIdKey,
                HttpHandlerOptions: JSON.parse(row.HttpHandlerOptions),
                LoadBalancerOptions: JSON.parse(row.LoadBalancerOptions),
                QoSOptions: JSON.parse(row.QoSOptions),
                ServiceDiscoveryProvider: JSON.parse(row.ServiceDiscoveryProvider),
                RateLimitOptions: JSON.parse(row.RateLimitOptions)
              }
              this.showEdit = true
            },
            disabled: (index, row) => {}
          },
          {
            type: 'danger',
            name: '数据同步',
            icon: 'refresh',
            method: (index, row) => {
              this.notifyModel = {
                GatewayId: row.GatewayId,
                SyncTarget: null
              }
              this.showNotify = true
            },
            disabled: (index, row) => {}
          }
        ]
      }, // 操作列
      currentIndex: 1,
      pagination: { size: 10 }
    }
  },
  computed: {
    loading () {
      return (
        this.$store.getters.btnLoading.str && !this.$store.getters.btnLoading.id
      )
    }
  },
  created () {
    // 初始化
    this.BLL = new BLL(this)
    this.BLL.search()
  },
  beforeDestroy () {},
  mounted () {},
  methods: {
    handleTableChange (pagination) {
      this.BLL.handleTableChange(pagination)
    }
  }
}
</script>
