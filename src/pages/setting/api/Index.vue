<template>
  <div class='container'>
    <el-form :inline='true' :model='filters'>
      <el-form-item>
        <el-select v-model='filters.ProjectKey' placeholder='请选择项目'>
          <el-option value='' key='' label='全部项目'></el-option>
          <el-option v-for='item in projectList' :key='item.Key' :label='item.Name' :value='item.Key'></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type='primary' @click='BLL.search()'>查询</el-button>
        <el-button type='primary' @click='BLL.add()'>新建</el-button>
        <el-button type='primary' @click='BLL.search()'>批量导入</el-button>
      </el-form-item>
    </el-form>
    <iTable :tableData="dataList" :columns="columns" :loading="loading" :pageSize=20 ref="iTable"
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
      projectList: [],
      filters: {
        ProjectKey: null
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
          prop: 'ProjectName',
          label: '项目',
          width: 150
        },
        {
          prop: 'Url',
          label: '资源Url'
        },
        {
          prop: 'Method',
          label: '请求方式',
          width: 80,
          align: 'center'
        },
        {
          prop: 'ControllerName',
          label: '控制器',
          width: 130
        },
        {
          prop: 'ActionName',
          label: '执行方法',
          width: 130
        },
        {
          prop: 'CreateTime',
          label: '创建时间',
          width: 160
        },
        {
          prop: 'UpdateTime',
          label: '修改时间',
          width: 160
        },
        {
          prop: 'Disabled',
          label: '是否删除',
          align: 'center',
          width: 80,
          render: (row, column) => {
            return row.Disabled ? '是' : '否'
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
