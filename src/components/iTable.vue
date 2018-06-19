<template>
  <div class="dmc-table-wrap">
    <el-table
      id="iTable"
      v-loading.iTable="loading"
      border
      :data="computedTableData"
      :style="customStyle"
      :max-height="height"
      :row-class-name="tableRowClassName"
      @sort-change="sortChange">
      <!--region 表格-->
      <el-table-column
        v-for="(column,index) in columns"
        :key="(column.prop||column.label)+index"
        :show-overflow-tooltip="column.showTooltip===undefined?true:column.showTooltip"
        :fixed="column.fixed"
        :sortable="column.sortable"
        :prop="column.prop"
        :type="column.type"
        :align="column.align"
        :label="column.label"
        :width="column.width"
        :min-width="column.minWidth||''">
        <template slot-scope="scope">
          <template v-if="!column.render">
              <span v-if="!column.format">
              <span>{{scope.row[column.prop]}}</span>
            </span>
            <span v-else v-html="column.format(scope.row,column)"
                  @click="column.method&&column.method(scope.row,column)"></span>
          </template>
          <template v-else>
            <node-content :column="column" :row="scope.row"></node-content>
          </template>
        </template>
      </el-table-column>
      <!--endregion-->
      <!--region 表格操作-->
      <el-table-column
        v-if="operateColumn"
        :fixed="operateColumn.fixed"
        label="操作"
        :width="operateColumn.width">
        <template slot-scope="scope">
          <el-button-group>
            <el-button
              v-for="(op,index) in operateColumn.list"
              :key="op.name+index"
              v-if="!op.show||op.show(scope.$index,scope.row)"
              :size="op.size||'small'"
              :type="op.type"
              :icon="'el-icon-'+op.icon"
              :disabled="op.disabled&&op.disabled(scope.$index,scope.row)"
              @click.native.prevent="op.method(scope.$index, scope.row)">
              {{op.name}}
            </el-button>
          </el-button-group>
        </template>
      </el-table-column>
      <!--endregion-->
    </el-table>
    <!--分页-->
    <div class="block pagination" v-if="showPagination&&!loading">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="tablePagination.current"
        :page-size="computedPagination.size"
        layout="total, prev, pager, next, jumper"
        :total="computedPagination.total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    tableData: Array, // 表格数据
    columns: Array, // 表头
    loading: Boolean, // 是否加表格loading
    customStyle: String, // 自定义样式
    pagination: {
      type: Object,
      default: null
    }, // 分页
    operateColumn: {
      type: Object
    }, // 操作集合
    otherHeight: {
      type: Number,
      default: 170
    }, // 表格之外的高度
    pageSize: {
      type: Number,
      default: 10
    }, // 每页数量
    showPagination: {
      type: Boolean,
      default: true
    }, // 是否显示分页
    tableRowClassName: Function
  },
  components: {
    NodeContent: {
      props: {
        column: {
          required: true
        },
        row: {
          required: true
        }
      },
      render (h) {
        return h('div', {}, ([this.column.render(this.row, this.column)]))
      }
    }
  },
  data () {
    return {
      tablePagination: {
        current: 1,
        pageSize: (this.pagination && this.pagination.size) || this.pageSize
      },
      sort: undefined
    }
  },
  computed: {
    height () {
      return this.$utils.Common.getWidthHeight().height - this.otherHeight
    },
    computedPagination () {
      if (this.pagination) {
        return this.pagination
      }
      return {
        size: this.pageSize,
        total: this.tableData ? this.tableData.length : 0
      }
    },
    computedTableData () {
      if (!this.showPagination) {
        return this.tableData
      }
      if (this.pagination) {
        return this.tableData
      }
      if (this.tableData) {
        return this.tableData.slice((this.tablePagination.current - 1) * this.pageSize, this.tablePagination.current * this.pageSize)
      }
      return null
    }
  },
  methods: {
    handleCurrentChange (current, emit = true) {
      document.getElementsByClassName('el-table__body-wrapper')[0].scrollTop = 0
      if (this.pagination) {
        this.tablePagination = {
          current,
          pageSize: this.pagination.size
        }
        if (emit) {
          this.$emit('handleTableChange', this.tablePagination, this.sort)
        }
      } else {
        this.tablePagination = {
          current,
          pageSize: this.pageSize
        }
      }
    },
    sortChange (sort) {
      document.getElementsByClassName('el-table__body-wrapper')[0].scrollTop = 0
      if (sort.prop) {
        this.sort = {
          prop: sort.prop,
          order: sort.order
        }
      } else {
        this.sort = undefined
      }
      this.$emit('handleTableChange', this.tablePagination, this.sort)
    }
  }
}
</script>
<style lang="less" rel="stylesheet/less">
.pagination {
  float: right;
  margin: 20px;
}

.el-table-column--selection .cell {
  padding-left: 0;
}
</style>
