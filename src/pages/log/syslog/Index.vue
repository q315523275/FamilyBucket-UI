<template>
  <div class="container">
    <el-form :inline="true">
      <el-form-item>
        <el-date-picker
          value-format="timestamp"
          v-model="time"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          align="right">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="BLL.init()" :disabled="!!BLL.disabled()">查询</el-button>
      </el-form-item>
    </el-form>
    <iTable :tableData="dataList" :columns="columns" :loading="loading" :pageSize=pageSize ref="iTable"
            :otherHeight="230" :operateColumn="operateColumn"></iTable>
    <el-dialog title="详情内容" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="请求时间" :label-width="formLabelWidth">
          <el-input v-model="form.REQTIMEFORMAT" :readonly="true"></el-input>
        </el-form-item>
        <el-form-item label="响应时长（ms）" :label-width="formLabelWidth">
          <el-input v-model="form.REPTIMESPAN" :readonly="true"></el-input>
        </el-form-item>
        <el-form-item label="请求参数" :label-width="formLabelWidth">
          <el-input v-model="form.REQPARAM" :readonly="true" type="textarea" autosize></el-input>
        </el-form-item>
        <el-form-item label="响应内容" :label-width="formLabelWidth">
          <el-input v-model="form.REPVALUE" :readonly="true" type="textarea" autosize></el-input>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script type="text/jsx">
import BLL from './Index'
import iTable from '../../../components/iTable.vue'

export default {
  components: { iTable },
  data () {
    return {
      time: '',
      dataList: [],
      columns: [
        {
          prop: 'REQID',
          label: '编号',
          width: 80,
          align: 'center'
        },
        {
          prop: 'REQNAME',
          label: '接口名称',
          width: 200
        },
        {
          prop: 'REQURL',
          label: '请求URL',
          width: 200
        },
        {
          prop: 'REQPARAM',
          label: '请求参数',
          width: 350
        },
        {
          prop: 'REQHEADPARAM',
          label: '请求头',
          width: 350
        },
        {
          prop: 'REQTIME',
          label: '请求时间',
          width: 160,
          render: (row, column) => {
            return <span>{ this.$utils.Date.format(parseInt(row.REQTIME / 1000)) }</span>
          }
        },
        {
          prop: 'REPVALUE',
          label: '响应内容',
          minWidth: 350
        },
        {
          prop: 'REPTIME',
          label: '响应时间',
          width: 160,
          render: (row, column) => {
            return <span>{ this.$utils.Date.format(parseInt(row.REQTIME / 1000)) }</span>
          }
        },
        {
          prop: 'REPTIMESPAN',
          label: '响应时长（ms）',
          width: 160
        }
      ],
      operateColumn: {
        width: 180,
        fixed: 'right',
        list: [
          {
            type: 'primary',
            name: '查看详细',
            icon: 'info',
            method: (index, row) => {
              this.form = {
                ...row,
                REQTIMEFORMAT: this.$utils.Date.format(parseInt(row.REQTIME / 1000))
              }
              this.dialogFormVisible = true
            }
          }
        ]
      }, // 操作列
      pageSize: 20, // 每页数量
      formLabelWidth: '120px',
      form: {},
      dialogFormVisible: false
    }
  },
  computed: {
    loading () {
      return this.$store.getters.btnLoading.str && !this.$store.getters.btnLoading.id
    }
  },
  created () {
    // 初始化
    this.BLL = new BLL(this)
  },
  beforeDestroy () {},
  mounted () {},
  methods: {}
}
</script>

<style lang="less" scoped>
@import "./Index";
</style>
