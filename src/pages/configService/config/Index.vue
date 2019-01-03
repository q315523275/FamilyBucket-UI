<template>
  <div class='container'>
    <el-form :inline='true' :model='filters'>
      <el-form-item>
        <el-select v-model='filters.AppId' placeholder='请选择' @change='BLL.searchProejct()'>
          <el-option v-for='item in appList' :key='item.AppId' :label='item.Name' :value='item.AppId'></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select v-model='filters.NameSpace' placeholder='请选择项目'>
          <el-option key="AppId" label='全部项目' value=''></el-option>
          <el-option v-for='item in nameSpaceList' :key='item.Name' :label='item.Name' :value='item.Name'></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="环境">
        <el-select v-model="filters.Environment" @change='BLL.search()'>
          <el-option label='测试环境' value='dev'></el-option>
          <el-option label='测试验收环境' value='uat'></el-option>
          <el-option label='预生产环境' value='prepro'></el-option>
          <el-option label='生产环境' value='pro'></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type='primary' @click='BLL.search()'>查询</el-button>
        <el-button type='primary' @click='BLL.add()'>新增</el-button>
      </el-form-item>
    </el-form>
    <iTable :tableData='dataList' :columns='columns' :loading='loading' :operateColumn='operateColumn'
            :pagination="pagination" @handleTableChange="handleTableChange" ref='iTable' :otherHeight='230'></iTable>
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
      nameSpaceList: [],
      filters: {
        AppId: null,
        NameSpace: null,
        Environment: 'dev'
      },
      currentIndex: 1,
      pagination: { size: 10 },
      dataList: [],
      columns: [
        {
          prop: 'Id',
          label: '编号',
          width: 80,
          align: 'center'
        },
        {
          prop: 'ConfigAppId',
          label: 'AppId',
          width: 100
        },
        {
          prop: 'ConfigNamespaceName',
          label: '项目',
          width: 120
        },
        {
          prop: 'ConfigKey',
          label: 'Key',
          width: 150
        },
        {
          prop: 'ConfigValue',
          label: 'Value'
        },
        {
          prop: 'Remark',
          label: '备注',
          width: 180
        },
        {
          prop: 'Version',
          label: '版本号',
          align: 'center',
          width: 80
        },
        {
          prop: 'LastTime',
          label: '修改时间',
          width: 160
        },
        {
          prop: 'IsDeleted',
          label: '删除',
          align: 'center',
          width: 80,
          render: (row, column) => {
            return row.IsDeleted ? '是' : '否'
          }
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
                Environment: this.filters.Environment
              }
              this.showEdit = true
            },
            disabled: (index, row) => {}
          }
        ]
      }
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
  methods: {
    handleTableChange (pagination) {
      this.BLL.handleTableChange(pagination)
    }
  }
}
</script>
