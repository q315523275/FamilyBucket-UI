<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="item in levelList" :key="item.path" v-if='item.name'>
        <span class="no-redirect">{{(item.meta&&item.meta.title)||item.name}}</span>
        <!--<router-link v-else :to="item.path">{{(item.meta&&item.meta.title)||item.name}}</router-link>-->
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>

export default {
  created () {
    this.getBreadcrumb()
  },
  data () {
    return {
      levelList: null
    }
  },
  watch: {
    $route () {
      this.getBreadcrumb()
    }
  },
  methods: {
    getBreadcrumb () {
      let matched = this.$route.matched.filter(item => item.name)
      const first = matched[0]
      if (first && first.name !== '首页') {
        // matched = [{ path: '/dashboard', name: '首页' }].concat(matched)
      }
      this.levelList = matched
    }
  }
}
</script>

<style rel="stylesheet/less" lang="less" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 10px;
  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
