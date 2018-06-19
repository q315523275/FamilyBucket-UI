<template>
  <div class="container">
    <el-form :inline="true">
      <el-form-item>
        <el-button type="primary" @click="BLL.add()">新增</el-button>
        <el-button type="primary" @click="BLL.search()">刷新</el-button>
      </el-form-item>
    </el-form>
    <iTable :tableData="dataList" :columns="columns" :loading="loading" ref="iTable"
            :otherHeight="230" :operateColumn="operateColumn"></iTable>
    <edit v-model="showEdit" :modelForm="editModel" @addSuccess="BLL.search()"></edit>
  </div>
</template>

<script type="text/jsx">
import iTable from '../../../components/iTable.vue'
import Edit from './Edit.vue'
import BLL from './Index'

export default {
  components: { iTable, Edit },
  data () {
    return {
      editModel: null,
      showEdit: false,
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
          label: '平台名称'
        },
        {
          prop: 'Key',
          label: '平台Key',
          width: 100
        },
        {
          prop: 'Icon',
          label: '图标',
          width: 100
        },
        {
          prop: 'Author',
          label: '负责人',
          width: 100
        },
        {
          prop: 'Developer',
          label: '开发',
          width: 100
        },
        {
          prop: 'AddTime',
          label: '创建时间',
          width: 160
        },
        {
          prop: 'Remark',
          label: '备注'
        },
        {
          prop: 'IsDel',
          label: '是否删除',
          align: 'center',
          width: 80,
          render: (row, column) => {
            return row.IsDel ? '是' : '否'
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
  },
  beforeDestroy () {},
  mounted () {},
  methods: {}
}
</script>
