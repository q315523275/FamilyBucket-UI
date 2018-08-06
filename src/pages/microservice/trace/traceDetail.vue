<template>
  <div class="app-container">
    <el-dialog title="链路查看" :visible.sync="show" :model="modelForm" v-if="modelForm" :close-on-click-modal="false" width="75%" style="padding-right:24px;">
      <el-row style="line-height: 20px">
        <el-col :span="12">追踪编号: {{ modelForm.TraceId }}</el-col>
        <el-col :span="12">起始时间: {{ modelForm.StartTimestamp }}</el-col>
      </el-row>
      <el-row style="line-height: 20px">
        <el-col :span="12">请求耗时: {{ (modelForm.Duration / 1000) }}ms</el-col>
        <el-col :span="12">结束时间: {{ modelForm.FinishTimestamp }}</el-col>
      </el-row>
      <tree-table :data="modelForm.Spans" :evalFunc="func" :evalArgs="args" :firstColumn="firstObj" :expandAll="expandAll" style="margin-top: 15px; border-top: 1px solid #eee">
      <el-table-column width="90" label="Time(%)">
        <template slot-scope="scope">
          {{ (scope.row.Duration * 100 / modelForm.Duration).toFixed(0) }}%
        </template>
      </el-table-column>
      <el-table-column label="TimeLine" width="520">
        <template slot-scope="scope">
          <el-tooltip effect="dark" :content="scope.row.Duration+'ms'" placement="left">
            <div class="processContainer">
              <div class="process" :style="{ width: (scope.row.Duration/modelForm.Duration) * 500+'px', marginLeft:(scope.row.Offset/modelForm.Duration) * 500+'px' }">
                <span style="display:inline-block"></span>
              </div>
            </div>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column width="60">
        <template slot-scope="scope">
          <el-button type="text" @click="goSpanDetail(scope.row)">详细</el-button>
        </template>
      </el-table-column>
    </tree-table>
    </el-dialog>
    <edit v-model="showEdit" :modelForm="editModel"></edit>
  </div>
</template>
<script>
import BLL from './Index'
import treeTable from '../../../components/TreeTable/TreeTable'
import treeToArray from './customEval'
import Edit from './spanDetail'

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
  components: { treeTable, Edit },
  data () {
    return {
      editModel: null,
      showEdit: false,
      data: [],
      show: false,
      func: treeToArray,
      firstObj: [ 'Span', 'OperationName' ],
      expandAll: false,
      args: [null, null, 'Duration']
    }
  },
  created () {
    // 初始化
    this.BLL = new BLL(this)
  },
  computed: {
    loading () {
      return this.$store.getters.btnLoading.str && this.$store.getters.btnLoading.id === 'edit'
    }
  },
  mounted () {},
  methods: {
    goSpanDetail (row) {
      console.log(row.SpanId)
      this.BLL.showSpanDetail(row.SpanId)
    }
  },
  watch: {
    show (val) {
      this.$emit('input', val)
      if (val) {
        this.$nextTick(() => {
          const data = []
          this.data = data
        })
      }
    },
    value (val) {
      this.show = val
      if (this.modelForm && this.modelForm.Spans.lenght <= 5) {
        this.expandAll = true
      }
    }
  }
}
</script>
<style lang="less" rel="stylesheet/less">
.app-container {
  padding: 20px 0;
}
.app-container .el-dialog__body {
  padding-top: 0;
}
.app-container .el-table td, .app-container .el-table th {
  padding: 6px;
}
.app-container .el-table th {
   background-color: #eee;
   font-weight: 100;
   color: #555;
}
.app-container .processContainer {
  background-color: #eee;
  border-radius: 2px;
}
.app-container .process {
  border-radius: 2px;
  line-height: 16px;
  background-color: #409EFF;
}
</style>
