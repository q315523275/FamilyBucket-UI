<template>
 <div class='container'>
    <el-form :inline='true' :model='filters'>
      <el-form-item>
        <el-select v-model='filters.PlatformKey' placeholder='请选择项目'>
          <el-option value='' key='' label='全部项目'></el-option>
          <el-option v-for='item in platformList' :key='item.Key' :label='item.Name' :value='item.Key'></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type='primary' @click='BLL.search()'>查询</el-button>
        <el-button type='primary' @click='BLL.add()'>新增</el-button>
      </el-form-item>
    </el-form>
    <iTable :tableData='dataList' :columns='columns' :loading='loading' :pageSize=20 ref='iTable'
            :otherHeight='230' :operateColumn="operateColumn"></iTable>
    <edit v-model="showEdit" :modelForm="editModel" :menusList="menusList" :platformList="platformList" @addSuccess="BLL.search()"></edit>
  </div>
</template>
<script type="text/jsx">
import iTable from '../../../components/iTable.vue'
import Edit from './Edit.vue'
import BLL from './Index'
export default {
  components: {
    iTable, Edit
  },
  data () {
    return {
      editModel: null,
      showEdit: false,
      platformList: [],
      filters: {
        PlatformKey: ''
      },
      apiList: [],
      menusList: [],
      rowApiList: [],
      dataList: [],
      columns: [
        {
          prop: 'Id',
          label: '编号',
          width: 80,
          align: 'center'
        },
        {
          prop: 'PlatformKey',
          label: '平台名称'
        },
        {
          prop: 'Name',
          label: '角色名称'
        },
        {
          prop: 'Key',
          label: '角色标识'
        },
        {
          prop: 'Remark',
          label: '描述'
        },
        {
          prop: 'IsDel',
          label: '状态',
          align: 'center',
          render: (row, column) => {
            return row.IsDel ? <el-tag type="danger">禁用</el-tag> : <el-tag>启用</el-tag>
          }
        },
        {
          prop: 'CreateTime',
          label: '创建时间'
        }
      ],
      operateColumn: {
        width: 120,
        fixed: 'right',
        list: [
          {
            type: 'primary',
            name: '编辑',
            icon: 'edit',
            method: (index, row) => {
              this.editModel = { ...row }
              this.showEdit = true
            },
            disabled: (index, row) => {
            }
          }
        ]
      } // 操作列
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
    this.BLL.search()
    this.BLL.init()
  },
  beforeDestroy () {},
  mounted () {},
  methods: {}
}
</script>
<style lang="less">
.role-contain {
  .filter-area {
    margin-bottom: 10px;
  }
  background-color: #fff;
}
</style>
