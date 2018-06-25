<template>
  <div class="nav-contain">
    <el-form :inline='true' :model='filters'>
      <el-form-item>
        <el-select v-model='filters.PlatformId' placeholder='请选择'>
          <el-option :value=0 key='0' label='全部平台'></el-option>
          <el-option v-for='item in platformList' :key='item.Id' :label='item.Name' :value='item.Id'></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type='primary' @click='BLL.search()'>查询</el-button>
        <el-button type='primary' @click='BLL.add()'>新增</el-button>
      </el-form-item>
    </el-form>
    <iTable :tableData="dataList" :columns="columns" :loading="loading" :pageSize=pageSize ref="iTable"
            :otherHeight="230" :operateColumn="operateColumn" :tableRowClassName="tableRowClassName"></iTable>
    <edit v-model="showEdit" :modelForm="editModel" @addSuccess="BLL.search()"></edit>
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
        PlatformId: 0
      },
      dataList: [],
      pageSize: 20, // 每页数量
      customStyle: '', // 每页样式
      columns: [
        {
          prop: 'Name',
          label: '名称',
          width: '200',
          type: '',
          format: (row, column) => {
            let icon = ''
            if (row.Icon && row.Icon.indexOf('#') > -1) {
              icon = `<i class="axon-icon">${row.Icon}</i>`
            } else {
              icon = `<i class="${row.Icon}"></i>`
            }
            return row.ParentId ? `<span style="margin-left: 26px;font-size: 13px">${row.Name}</span>` : `${icon}<span style="font-size: 16px;font-weight:bold;padding-left: 10px">${row.Name}</span>`
          }
        },
        {
          prop: 'LinkUrl', label: '路径', minWidth: '200', type: ''
        },
        {
          prop: 'State',
          label: '状态',
          width: '100',
          align: 'center',
          type: '',
          render: (row, column) => {
            return !row.State ? <el-tag type="danger">禁用</el-tag> : <el-tag>启用</el-tag>
          }
        },
        {
          prop: 'SortId', label: '排序', width: '80', type: '', align: 'center'
        }
      ], // 数据列
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
                switchState: !!row.State,
                level: row.ParentId === 0 ? 0 : 1,
                parents: this.dataList.filter(x => {
                  return x.ParentId === 0 && x.Id !== row.Id
                })
              }
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
    this.BLL.init()
    this.BLL.search()
  },
  beforeDestroy () {},
  mounted () {},
  methods: {
    tableRowClassName ({ row, index }) {
      if (!row.ParentId) {
        return 'positive-row'
      }
      return ''
    }
  }
}
</script>
<style lang="less">
.nav-contain {
  background-color: #fff;
  .filter-area {
    margin-bottom: 10px;
  }
  .el-table .positive-row {
    background: rgba(240, 240, 240, .8);
  }
}
</style>
