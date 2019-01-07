<template>
  <div class='container'>
    <el-form v-model="filters" :inline='true'>
      <el-form-item>
        <el-input v-model="filters.Name" placeholder="服务名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type='primary' @click='BLL.search()'>查询</el-button>
        <el-button type='primary' @click="BLL.add()">新增服务</el-button>
      </el-form-item>
    </el-form>
    <iTable :tableData="dataList" :columns="columns" :loading="loading" :pageSize=200 ref="iTable"
            :otherHeight="230" :operateColumn="operateColumn"></iTable>
    <edit v-model="showEdit" :modelForm="editModel" @addSuccess="BLL.search()"></edit>
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
      filters: {
        Name: null
      },
      dataList: [],
      columns: [
        {
          prop: 'Id',
          label: '服务编号'
        },
        {
          prop: 'Name',
          label: '服务名称'
        },
        {
          prop: 'HostAndPort',
          label: '服务地址',
          render: (row, column) => {
            return row.HostAndPort.Address + ':' + row.HostAndPort.Port
          }
        },
        {
          prop: 'Tags',
          label: 'Tags',
          format: (row) => {
            return row.Tags.join('<br />')
          }
        },
        {
          prop: 'Version',
          label: '版本号'
        }
      ],
      operateColumn: {
        width: 120,
        fixed: 'right',
        list: [
          {
            type: 'danger',
            name: '删除服务',
            icon: 'delete',
            method: (index, row) => {
              let tit = '此操作将删除' + row.Id + '服务节点, 是否继续?'
              this.$confirm(tit, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                this.BLL.delete(row.Id)
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                })
              })
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
