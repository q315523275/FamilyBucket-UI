<template>
  <div class='container'>
    <el-form :inline='true' :model='filters'>
      <el-form-item>
        <el-select v-model='filters.AppId' placeholder='请选择'>
          <el-option v-for='item in appList' :key='item.AppId' :label='item.Name' :value='item.AppId'></el-option>
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
      appList: [],
      filters: {
        AppId: null
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
          label: '项目名称',
          width: 130
        },
        {
          prop: 'AppId',
          label: 'AppId',
          width: 100
        },
        {
          prop: 'IsPublic',
          label: '是否公有',
          align: 'center',
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
          label: '是否删除',
          align: 'center',
          render: (row, column) => {
            return row.IsDeleted ? '是' : '否'
          }
        },
        {
          prop: 'CreateTime',
          label: '创建时间',
          width: 160
        },
        {
          prop: 'CreateUid',
          label: '创建人编号'
        },
        {
          prop: 'LastTime',
          label: '修改时间',
          width: 160
        },
        {
          prop: 'LastUid',
          label: '修改人编号'
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
                ...row
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
