<template>
  <el-dialog :title="btnName" :visible.sync="show" v-if="modelForm" :close-on-click-modal="false" width="70%">
    <el-row style="line-height: 20px">
      <el-col :span="12">请求编号: {{ modelForm.TraceId }}</el-col>
      <el-col :span="12">起始时间: {{ modelForm.StartTimestamp }}</el-col>
    </el-row>
    <el-row style="line-height: 20px">
      <el-col :span="12">请求耗时: {{ (modelForm.Duration / 1000) }}ms</el-col>
      <el-col :span="12">结束时间: {{ modelForm.FinishTimestamp }}</el-col>
    </el-row>
    <el-row style="line-height: 20px">
      <el-col :span="12">服务名称: {{ modelForm.ServiceName }}</el-col>
      <el-col :span="12">请求名称: {{ modelForm.OperationName }}</el-col>
    </el-row>
    <el-table :data="modelForm.Logs" border style="width: 100%; margin-top: 10px">
      <el-table-column prop="Timestamp" label="Time" width="200"></el-table-column>
      <el-table-column prop="Fields[0].Key" label="Key" width="200"></el-table-column>
      <el-table-column prop="Fields[0].Value" label="Value"></el-table-column>
    </el-table>
    <el-table :data="modelForm.Tags" border stripe style="width:100%; margin-top: 10px">
      <el-table-column prop="Key" label="Key" width="180"></el-table-column>
      <el-table-column prop="Value" label="Value"></el-table-column>
    </el-table>
  </el-dialog>
</template>
<script>
import BLL from './Index'

export default {
  props: {
    value: {
      type: Boolean,
      default: false
    },
    modelForm: {
      type: Object
    }
  },
  data () {
    return {
      show: false,
      btnName: null
    }
  },
  created () {
    // 初始化
    this.BLL = new BLL(this)
    if (this.value) {
      this.show = true
    }
  },
  computed: {
    loading () {
      return this.$store.getters.btnLoading.str && this.$store.getters.btnLoading.id === 'edit'
    }
  },
  mounted () { },
  methods: { },
  watch: {
    show (val) {
      this.$emit('input', val)
      if (val) {
        this.$nextTick(() => {
          const data = []
          this.data = data
          if (this.modelForm.SpanId) {
            this.btnName = 'SpanId ' + this.modelForm.SpanId + ' 详情'
          }
        })
      }
    },
    value (val) {
      this.show = val
    }
  }
}
</script>
<style lang="less" rel="stylesheet/less">
.edit-contain {
  width: 50%;
  padding-top: 15px;
}
</style>
