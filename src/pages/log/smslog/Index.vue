<template>
  <div class="container">
    <el-form :inline="true">
      <el-form-item>
        <el-date-picker
          value-format="timestamp"
          v-model="time"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          align="right">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-input v-model="phone" placeholder="手机号" :maxlength="11"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="BLL.init()" :disabled="!!BLL.disabled()">查询</el-button>
      </el-form-item>
    </el-form>
    <iTable :tableData="dataList" :columns="columns" :loading="loading" :pageSize=pageSize ref="iTable"
            :otherHeight="230"></iTable>
  </div>
</template>

<script type="text/jsx">
import BLL from './Index'
import iTable from '../../../components/iTable.vue'

export default {
  components: { iTable },
  data () {
    return {
      phone: null,
      time: '',
      dataList: [],
      columns: [
        {
          prop: 'CODEID',
          label: '编号',
          width: 80,
          align: 'center'
        },
        {
          prop: 'PHONE',
          label: '手机号',
          width: 130
        },
        {
          prop: 'CODE',
          label: '验证码',
          width: 100
        },
        {
          prop: 'OVERTIME',
          label: '有效期',
          width: 160,
          render: (row, column) => {
            return <span>{ this.$utils.Date.format(parseInt(row.OVERTIME / 1000)) }</span>
          }
        },
        {
          prop: 'SENDCONTENT',
          label: '短信内容',
          minWidth: 300
        },
        {
          prop: 'ISUSED',
          label: '是否使用',
          width: 160,
          align: 'center',
          render: (row, column) => {
            return !row.ISUSED ? <el-tag type="danger">未使用</el-tag> : <el-tag>已使用</el-tag>
          }
        },
        {
          prop: 'SENDTIME',
          label: '发送时间',
          width: 160,
          render: (row, column) => {
            return <span>{ this.$utils.Date.format(parseInt(row.SENDTIME / 1000)) }</span>
          }
        }
      ],
      pageSize: 20 // 每页数量
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
  },
  beforeDestroy () {},
  mounted () {},
  methods: {}
}
</script>

<style lang="less" scoped>
@import "./Index";
</style>
