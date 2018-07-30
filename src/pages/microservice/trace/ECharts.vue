<template>
  <div class='container'>
    <el-form v-model="filters" :inline='true'>
      <el-form-item label="Tag">
        <el-input v-model="filters.tags" t placeholder="http.status_code=200|http.method=GET" style="width:300px"></el-input>
      </el-form-item>
      <el-form-item label="时间">
        <el-date-picker v-model="filters.startTimestamp" type="datetime" placeholder="选择日期" format="yyyy-MM-dd HH:mm:ss" value-format="timestamp"></el-date-picker>
      </el-form-item>
      <el-form-item label="至">
        <el-date-picker v-model="filters.finishTimestamp" type="datetime" placeholder="选择日期" format="yyyy-MM-dd HH:mm:ss" value-format="timestamp"></el-date-picker>
      </el-form-item>
      <el-form-item label="刷新">
        <el-select v-model="filters.limit" style="width:100px">
          <el-option label="不刷新" :value=0></el-option>
          <el-option label="5S" :value=5></el-option>
          <el-option label="10S" :value=10></el-option>
          <el-option label="20S" :value=20></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type='primary' @click='BLL.echartSearch()'>查询</el-button>
      </el-form-item>
    </el-form>
    <div id="myChart" style="height:450px;width:100%;margin-top:20px;"></div>
  </div>
</template>

<script type='text/jsx'>
import BLL from './Index'

export default {
  components: { },
  data () {
    return {
      editModel: null,
      showEdit: false,
      filters: {
        tags: null,
        limit: 0,
        startTimestamp: null,
        finishTimestamp: null
      },
      accessChart: null,
      dateList: [],
      valueList: []
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
    this.filters.startTimestamp = new Date(this.$utils.Date.add(null, -1, 'hou')).getTime()
    this.filters.finishTimestamp = new Date().getTime()
  },
  beforeDestroy () {},
  mounted () {
    this.BLL.echartInit()
  },
  methods: {}
}
</script>
