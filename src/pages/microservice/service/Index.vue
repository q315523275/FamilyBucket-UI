<template>
  <div class='container'>
    <el-form :inline='true'>
      <el-form-item>
        <el-button type='primary' @click='BLL.search()'>查询</el-button>
      </el-form-item>
    </el-form>
    <iTable :tableData="dataList" :columns="columns" :loading="loading" :pageSize=200 ref="iTable"
            :otherHeight="230"></iTable>
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
    this.BLL.search()
  },
  beforeDestroy () {},
  mounted () {},
  methods: {}
}
</script>
