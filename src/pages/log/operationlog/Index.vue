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
        <el-form-item label="管理员账号" :label-width="formLabelWidth">
          <el-input v-model="form.ManagerUserName" :readonly="true"></el-input>
        </el-form-item>
        <el-form-item label="管理员姓名" :label-width="formLabelWidth">
          <el-input v-model="form.ManagerRealName" :readonly="true"></el-input>
        </el-form-item>
        <el-form-item label="操作时间" :label-width="formLabelWidth">
          <el-input v-model="form.AddTimeFormat" :readonly="true"></el-input>
        </el-form-item>
        <el-form-item label="请求参数" :label-width="formLabelWidth">
          <el-input v-model="form.ReqParamFormat" :readonly="true" type="textarea" autosize></el-input>
        </el-form-item>
        <el-form-item label="操作状态" :label-width="formLabelWidth">
          <el-input v-model="form.StateFormat" :readonly="true"></el-input>
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
          prop: 'Id',
          label: '编号',
          width: 80,
          align: 'center'
        },
        {
          prop: 'ManagerId',
          label: '管理员编号',
          width: 100,
          align: 'center'
        },
        {
          prop: 'ManagerUserName',
          label: '管理员账号',
          width: 180
        },
        {
          prop: 'ManagerRealName',
          label: '管理员姓名',
          width: 200
        },
        {
          prop: 'EventName',
          label: '事件名称',
          minWidth: 200
        },
        {
          prop: 'State',
          label: '操作状态',
          width: 150,
          align: 'center',
          render: (row, column) => {
            return !row.State ? <el-tag type="danger">失败</el-tag> : <el-tag>成功</el-tag>
          }
        },
        {
          prop: 'AddTime',
          label: '操作时间',
          width: 160,
          render: (row, column) => {
            return <span>{ this.$utils.Date.format(parseInt(row.AddTime / 1000)) }</span>
          }
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
                AddTimeFormat: this.$utils.Date.format(parseInt(row.AddTime / 1000)),
                ReqParamFormat: row.ReqParam ? JSON.stringify(JSON.parse(row.ReqParam), null, 4) : '无',
                StateFormat: row.State ? '成功' : '失败'
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
