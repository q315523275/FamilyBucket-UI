<template>
  <div class='container'>
    <el-form :inline='true' :model='filters'>
      <el-form-item>
        <el-select placeholder='请选择项目'>
          <el-option value='0' key='0' label='全部项目'></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type='primary' @click='BLL.search()'>查询</el-button>
        <el-button type='primary' @click='BLL.search()'>新建</el-button>
        <el-button type='primary' @click='BLL.search()'>批量导入</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script type='text/jsx'>
import iTable from '../../../components/iTable.vue'
import BLL from './Index'

export default {
  components: { iTable },
  data () {
    return {
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
  beforeDestroy () {},
  mounted () {},
  methods: {}
}
</script>
