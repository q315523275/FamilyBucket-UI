<template>
  <div class='container'>
    <el-form :inline='true' :model='filters'>
      <el-form-item>
        <el-select v-model='filters.AppId' placeholder='请选择'>
          <el-option value='' key='' label='全部项目组'></el-option>
          <el-option v-for='item in appList' :key='item.AppId' :label='item.Name' :value='item.AppId'></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select v-model="filters.IsPublic">
          <el-option label="全部" :value=-1></el-option>
          <el-option label="公有" :value=1></el-option>
          <el-option label="私有" :value=0></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type='primary' @click='BLL.search()'>查询</el-button>
        <el-button type='primary' @click='BLL.add()'>新增</el-button>
      </el-form-item>
    </el-form>
    <iTable :tableData='dataList' :columns='columns' :loading='loading' :pageSize=20 ref='iTable'
            :otherHeight='230' :operateColumn='operateColumn'></iTable>
    <edit v-model='showEdit' :modelForm='editModel' :appList='appList' @addSuccess='BLL.search()'></edit>
    <notify v-model='showNotify' :modelForm='notifyModel'></notify>
  </div>
</template>

<script type='text/jsx'>
import iTable from '../../../components/iTable.vue'
import Edit from './Edit.vue'
import Notify from './Notify.vue'
import BLL from './Index'

export default {
  components: { iTable, Edit, Notify },
  data () {
    return {
      editModel: null,
      showEdit: false,
      notifyModel: null,
      showNotify: false,
      appList: [],
      filters: {
        AppId: ''
      },
      dataList: [],
      columns: [
        {
          prop: 'Id',
          label: '编号',
          width: 80,
          align: 'center'
        },
        {
          prop: 'Name',
          label: '项目编号'
        },
        {
          prop: 'AppId',
          label: 'AppId',
          width: 100
        },
        {
          prop: 'IsPublic',
          label: '公有',
          align: 'center',
          width: 80,
          render: (row, column) => {
            return row.IsPublic ? '是' : '否'
          }
        },
        {
          prop: 'Comment',
          label: '备注'
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
      ],
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
                ProjectName: row.Name,
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
    this.BLL.init()
    this.BLL.search()
  },
  beforeDestroy () {},
  mounted () {},
  methods: {}
}
</script>
