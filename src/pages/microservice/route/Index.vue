<template>
  <div class='container'>
    <el-form :inline='true'>
      <el-form-item>
        <el-button type='primary' @click='BLL.search()'>查询</el-button>
        <el-button type="primary" @click="BLL.add()">新增</el-button>
      </el-form-item>
    </el-form>
    <iTable :tableData="dataList" :columns="columns" :loading="loading" :pageSize=200 ref="iTable"
            :otherHeight="230" :operateColumn="operateColumn"></iTable>
    <edit v-model="showEdit" :modelForm="editModel" :allModel="allData" :editIndex="editIndex" @addSuccess="BLL.search()"></edit>
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
        State: 0
      },
      editIndex: -1,
      allData: {},
      dataList: [],
      columns: [
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
          label: '下游Scheme'
        },
        {
          prop: 'UseServiceDiscovery',
          label: '下游端口',
          minWidth: 180,
          format: (row) => {
            if (row.UseServiceDiscovery) {
              return '<br />名称:' + row.ServiceName + '<br />负载:' + JSON.stringify(row.LoadBalancerOptions)
            } else {
              return '地址:' + JSON.stringify(row.DownstreamHostAndPorts) + '<br />负载:' + JSON.stringify(row.LoadBalancerOptions)
            }
          }
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
                ...row,
                UseServiceDiscovery: false
              }
              if (this.editModel.ServiceName === null || this.editModel.ServiceName.length === 0) {
                this.editModel.UseServiceDiscovery = false
              } else {
                this.editModel.UseServiceDiscovery = true
              }
              this.editIndex = index
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
    this.BLL.search()
  },
  beforeDestroy () {},
  mounted () {},
  methods: {}
}
</script>
