<template>
 <div class='container'>
    <el-form :inline='true' :model='filters'>
      <el-form-item>
        <el-select v-model='filters.PlatformId' placeholder='请选择'>
          <el-option value='0' key='0' label='全部平台'></el-option>
          <el-option v-for='item in platformList' :key='item.Id' :label='item.Name' :value='item.Id'></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type='primary' @click='BLL.search()'>查询</el-button>
      </el-form-item>
    </el-form>
    <iTable :tableData='dataList' :columns='columns' :loading='loading' :pageSize=20 ref='iTable'
            :otherHeight='230' :operateColumn="operateColumn"></iTable>
  </div>
</template>
<script type="text/jsx">
import iTable from '../../../components/iTable.vue'
import BLL from './Index'
export default {
  components: {
    iTable
  },
  data () {
    return {
      editModel: null,
      showEdit: false,
      projectList: [],
      filters: {},
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
          label: '项目名称'
        },
        {
          prop: 'Name',
          label: '角色名称'
        },
        {
          prop: 'Remark',
          label: '描述'
        },
        {
          prop: 'CreateTime',
          label: '创建时间'
        }
      ],
      operateColumn: {
        width: 200,
        fixed: 'right',
        list: [
          {
            type: 'primary',
            name: '设置权限',
            icon: 'edit',
            method: (index, row) => {
              this.rowApiList = []
              this.editModel = row
              this.apiList.forEach(x => {
                if (row.ProjectName === x.label) {
                  this.rowApiList = [x]
                }
              })
              this.showEdit = true
            },
            disabled: (index, row) => {
            }
          },
          {
            type: 'danger',
            name: '删除',
            icon: 'delete',
            method: (index, row) => {
              this.$confirm('确认要删除这条数据吗？', '系统提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                this.BLL.delete(row.Id)
              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '已取消删除'
                })
              })
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
