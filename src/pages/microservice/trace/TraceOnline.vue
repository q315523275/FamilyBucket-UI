<template>
  <div class='container'>
    <el-form v-model="filters" :model="filters" :rules="rules" ref="filters" :inline='true'>
      <el-form-item>
        <el-button type='primary' @click='BLL.initWebSocket()' :disabled='initWebSocketBtnDisabled'>连接</el-button>
        <el-button type='danger' @click='BLL.closeWebSocket()' :disabled='closeWebSocketBtnDisabled'>断开</el-button>
      </el-form-item>
      <el-form-item prop="Identity">
        <el-input v-model="filters.Identity" placeholder="监听标识" :disabled="ListenerInputBtnDisabled"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type='primary' @click='BLL.addListener()' :disabled="addListenerBtnDisabled">开始监听</el-button>
        <el-button type='danger' @click='BLL.removeListener()' :disabled="removeListenerDisabled">移除监听</el-button>
        <el-button type='danger' @click='BLL.clear()'>清屏</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="dataList" border style="width: 100%">
      <el-table-column prop="ApplicationCode" label="应用"></el-table-column>
      <el-table-column prop="OperationName" label="模块"></el-table-column>
      <el-table-column prop="SpanLayer" label="类型"></el-table-column>
      <el-table-column prop="Component" label="组件"></el-table-column>
      <el-table-column prop="Duration" label="耗时"></el-table-column>
      <el-table-column prop="Time" label="时间"></el-table-column>
      <el-table-column fixed="right" label="操作" width="60">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <traceOnlineShow v-model="showView" :modelForm="viewModel"></traceOnlineShow>
  </div>
</template>
<script type='text/jsx'>
import BLL from './TraceOnline'
import TraceOnlineShow from './TraceOnlineShow.vue'

export default {
  components: { TraceOnlineShow },
  data () {
    return {
      initWebSocketBtnDisabled: false,
      closeWebSocketBtnDisabled: true,
      addListenerBtnDisabled: true,
      removeListenerDisabled: true,
      ListenerInputBtnDisabled: true,
      viewModel: null,
      showView: false,
      filters: {
        Identity: null
      },
      dataList: [],
      rules: {
        Identity: [
          { required: true, message: '请填写监听标识', trigger: 'blur' }
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
  },
  beforeDestroy () {
    this.BLL.closeWebSocket()
  },
  mounted () {},
  methods: {
    handleClick (row) {
      console.log(row)
      this.viewModel = {
        JSON: JSON.stringify(row, null, 4)
      }
      this.showView = true
    }
  }
}
</script>
