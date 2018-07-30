<template>
  <div class='container'>
    <el-form v-model="filters" :inline='true'>
      <el-form-item label="Tag">
        <el-input v-model="filters.tags" t placeholder="http.status_code=200|http.method=GET" style="width:300px"></el-input>
      </el-form-item>
      <el-form-item label="时间">
        <el-date-picker v-model="filters.startTimestamp" type="datetime" placeholder="选择日期" format="yyyy-MM-dd HH:mm:ss" value-format="timestamp"></el-date-picker>
      </el-form-item>
      <el-form-item label="至">
        <el-date-picker v-model="filters.finishTimestamp" type="datetime" placeholder="选择日期" format="yyyy-MM-dd HH:mm:ss" value-format="timestamp"></el-date-picker>
      </el-form-item>
      <el-form-item label="数量">
        <el-select v-model="filters.limit" style="width:100px">
          <el-option label="10" :value=10></el-option>
          <el-option label="20" :value=20></el-option>
          <el-option label="50" :value=50></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type='primary' @click='BLL.search()'>查询</el-button>
      </el-form-item>
    </el-form>
    <iTable :tableData="dataList" :columns="columns" :loading="loading" :pageSize=200 ref="iTable"
            :otherHeight="230" :operateColumn="operateColumn"></iTable>
  </div>
</template>

<script type='text/jsx'>
import iTable from '../../../components/iTable.vue'
import BLL from './Index'

export default {
  components: { iTable },
  data () {
    return {
      editModel: null,
      showEdit: false,
      filters: {
        tags: null,
        limit: 10,
        startTimestamp: null,
        finishTimestamp: null
      },
      maxDuration: 1000,
      dataList: [],
      columns: [
        {
          prop: 'TraceId',
          label: '链路Id',
          width: 180
        },
        {
          prop: 'Duration',
          label: '时间',
          render: (row, column) => {
            let per = Math.round(row.Duration * 100 / this.maxDuration)
            return <div>{ this.$utils.Date.format(row.StartTimestamp, null) } - { this.$utils.Date.format(row.FinishTimestamp, null) }  耗时{ (row.Duration / 1000) }ms<el-progress percentage={ per }></el-progress></div>
          }
        },
        {
          prop: 'Services',
          label: '服务名称',
          render: (row, column) => {
            let arr = row.Services.map(x => x.Name)
            let dis = Array.from(new Set(arr))
            return dis.map((x) => {
              return <el-tag type="warning" style="margin-right:2px">{ x } X { arr.filter(f => f === x).length }</el-tag>
            })
          }
        }
      ],
      operateColumn: {
        width: 120,
        fixed: 'right',
        list: [
          {
            type: 'primary',
            name: '查看',
            icon: 'search',
            method: (index, row) => {

            },
            disabled: (index, row) => {
            }
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
    this.filters.startTimestamp = new Date(this.$utils.Date.add(null, -1, 'day')).getTime()
    this.filters.finishTimestamp = new Date().getTime()
  },
  beforeDestroy () {},
  mounted () {},
  methods: {}
}
</script>
