<template>
  <div class='container'>
    <el-form :inline='true'>
      <el-form-item>
        <el-select v-model='filters.ProjectKey' placeholder='请选择网关'>
          <el-option value='' key='' label='全部'></el-option>
          <el-option v-for='item in gatewayList' :key='item.GatewayId' :label='item.GatewayKey' :value='item.GatewayId'></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="filters.State">
          <el-option label="无" :value=-1></el-option>
          <el-option label="启用" :value=1></el-option>
          <el-option label="禁用" :value=0></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type='primary' @click='BLL.search()'>查询</el-button>
        <el-button type="primary" @click="BLL.add()">新增</el-button>
      </el-form-item>
    </el-form>
    <iTable :tableData="dataList" :columns="columns" :loading="loading" :pageSize=200 ref="iTable"
            :otherHeight="230" :operateColumn="operateColumn"></iTable>
    <edit v-model="showEdit" :modelForm="editModel" :gatewayList="gatewayList" @addSuccess="BLL.search()"></edit>
  </div>
</template>

<script type='text/jsx'>
import iTable from '../../../components/iTable.vue'
import Edit from './Edit.vue'
import BLL from './Index'

export default {
  components: { iTable, Edit },
  data () {
    return {
      editModel: null,
      showEdit: false,
      filters: {
        GatewayId: -1,
        State: -1
      },
      gatewayList: [],
      dataList: [],
      columns: [
        {
          prop: 'Id',
          label: '编号',
          width: 80,
          align: 'center'
        },
        {
          prop: 'UpstreamPathTemplate',
          label: '上游地址'
        },
        {
          prop: 'UpstreamHttpMethod',
          label: '上游请求'
        },
        {
          prop: 'DownstreamPathTemplate',
          label: '下游地址'
        },
        {
          prop: 'DownstreamScheme',
          label: '下游Method',
          width: 100
        },
        {
          prop: 'DownstreamHostAndPorts',
          label: '下游端口'
        },
        {
          prop: 'Priority',
          label: '优先等级',
          width: 80
        }
      ],
      operateColumn: {
        width: 110,
        fixed: 'right',
        list: [
          {
            type: 'primary',
            name: '编辑',
            icon: 'edit',
            method: (index, row) => {
              this.editModel = {
                Id: row.Id,
                GatewayId: row.GatewayId,
                State: row.State,
                UpstreamPathTemplate: row.UpstreamPathTemplate,
                UpstreamHttpMethod: JSON.parse(row.UpstreamHttpMethod),
                UpstreamHost: row.UpstreamHost,
                DownstreamPathTemplate: row.DownstreamPathTemplate,
                DownstreamScheme: row.DownstreamScheme,
                DownstreamHostAndPorts: JSON.parse(row.DownstreamHostAndPorts),
                ServiceName: row.ServiceName,
                RequestIdKey: row.RequestIdKey,
                FileCacheOptions: JSON.parse(row.CacheOptions),
                QoSOptions: JSON.parse(row.QoSOptions),
                LoadBalancerOptions: JSON.parse(row.LoadBalancerOptions),
                RateLimitOptions: JSON.parse(row.RateLimitOptions),
                AuthenticationOptions: JSON.parse(row.AuthenticationOptions),
                HttpHandlerOptions: JSON.parse(row.HttpHandlerOptions),
                Key: row.Key,
                DelegatingHandlers: JSON.parse(row.DelegatingHandlers),
                Priority: row.Priority,
                Timeout: row.Timeout,
                SecurityOptions: JSON.parse(row.SecurityOptions),
                UseServiceDiscovery: false
              }
              if (this.editModel.ServiceName === null || this.editModel.ServiceName.length === 0) {
                this.editModel.UseServiceDiscovery = false
              } else {
                this.editModel.UseServiceDiscovery = true
              }
              this.showEdit = true
            },
            disabled: (index, row) => {}
          }
        ]
      }, // 操作列
      pagination: { size: 20 }
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
    this.BLL.init()
    this.BLL.search()
  },
  beforeDestroy () {},
  mounted () {},
  methods: {}
}
</script>
