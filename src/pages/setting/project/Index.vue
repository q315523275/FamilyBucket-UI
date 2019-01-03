<template>
  <div class='container'>
    <el-form :inline='true' :model='filters'>
      <el-form-item>
        <el-button type='primary' @click='BLL.search()'>刷新</el-button>
        <el-button type='primary' @click='BLL.add()'>新增</el-button>
      </el-form-item>
    </el-form>
    <iTable :tableData='dataList' :columns='columns' :loading='loading' :pageSize=20 ref='iTable'
            :otherHeight='230' :operateColumn="operateColumn"></iTable>
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
          prop: 'Id',
          label: '编号',
          width: 80,
          align: 'center'
        },
        {
          prop: 'Name',
          label: '项目名称'
        },
        {
          prop: 'Code',
          label: '项目编号'
        },
        {
          prop: 'Remark',
          label: '备注'
        },
        {
          prop: 'RouteKey',
          label: '路由标识'
        },
        {
          prop: 'IsDeleted',
          label: '删除',
          align: 'center',
          width: 80,
          render: (row, column) => {
            return row.IsDeleted ? '是' : '否'
          }
        },
        {
          prop: 'LastTime',
          label: '修改时间',
          width: 160
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
                ...row
              }
              this.showEdit = true
            },
            disabled: (index, row) => {}
          },
          {
            type: 'danger',
            name: '应用通知',
            icon: 'refresh',
            method: (index, row) => {
              this.notifyModel = {
                ProjectName: row.Code,
                CommandText: null,
                CommandType: null
              }
              this.showNotify = true
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
