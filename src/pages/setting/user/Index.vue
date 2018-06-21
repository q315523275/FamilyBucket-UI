<template>
  <div class="user-contain">
    <el-form :inline="true" :model="filters" class="form-inline">
      <el-form-item>
        <el-input v-model="filters.RealName" placeholder="真实姓名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="filters.UserName" placeholder="用户账号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="filters.Phone" placeholder="手机号" :maxlength="11"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="filters.State">
          <el-option label="无" :value=-1></el-option>
          <el-option label="启用" :value=1></el-option>
          <el-option label="禁用" :value=0></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="BLL.search()">查询</el-button>
        <el-button @click="BLL.search()">刷新</el-button>
        <el-button type="success" icon="el-icon-plus" @click="BLL.add()">新增</el-button>
      </el-form-item>
    </el-form>
    <iTable :tableData="dataList" :columns="columns" :loading="loading" :pageSize=pageSize
            :operateColumn="operateColumn" ref="iTable" :otherHeight="230"></iTable>
    <edit v-model="showEdit" :modelForm="editModel" :roleList="roleList" @addSuccess="BLL.search()"></edit>
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
      pageSize: 20, // 每页数量
      editModel: null,
      showEdit: false,
      sort: {},
      dataList: [],
      roleList: [],
      currRoleValue: null,
      props: {
        value: 'value',
        children: 'cities'
      },
      pagination: { size: 20 },
      customStyle: '', // 每页样式
      columns: [
        {
          prop: 'Id', label: '用户编号', width: '150', type: ''
        },
        {
          prop: 'UserName', label: '用户账号', minWidth: '100', type: ''
        },
        {
          prop: 'RealName', label: '真实姓名', width: '100', type: ''
        },
        {
          prop: 'Mobile', label: '手机号', width: '160', type: ''
        },
        {
          prop: 'State',
          label: '账户状态',
          width: '160',
          align: 'center',
          type: '',
          render: (row, column) => {
            return !row.State ? <el-tag type="danger">禁用</el-tag> : <el-tag>启用</el-tag>
          }
        },
        {
          prop: 'CreateTime',
          label: '添加时间',
          width: '160',
          type: '',
          render: (row, column) => {
            return <span>{ this.$utils.Date.format(parseInt(row.CreateTime / 1000)) }</span>
          }
        },
        {
          prop: 'UpdateTime',
          label: '更新时间',
          width: '160',
          type: '',
          render: (row, column) => {
            return <span>{ this.$utils.Date.format(parseInt(row.UpdateTime / 1000)) }</span>
          }
        }
      ], // 数据列
      operateColumn: {
        width: 100,
        fixed: 'right',
        list: [
          {
            type: 'primary',
            name: '编辑',
            icon: 'edit',
            method: (index, row) => {
              this.editModel = {
                ...row,
                Password: null,
                RoleIdList: row.RoleList.map(x => x.Id)
              }
              this.showEdit = true
            },
            disabled: (index, row) => {
            }
          }
        ]
      }, // 操作列
      filters: {
        RealName: null,
        UserName: null,
        Phone: null,
        State: -1
      }
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
    this.BLL.editInit()
  },
  mounted () {},
  beforeDestroy () {},
  methods: {},
  watch: {}
}
</script>
<style lang="less">
.user-contain {
  background-color: #fff;
  .form-inline {
    input {
      width: 130px;
    }
  }
  .marginL:not(:first-child) {
    margin-left: 5px;
  }
}
</style>
