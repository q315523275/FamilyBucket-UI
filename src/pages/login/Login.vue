<template>
  <div class="login-wrap">
    <div class="login-content">
      <h2>Family Bucket 管理中心</h2>
      <!--region 登录组件-->
      <iLogin :showMask="false" @login-success="$router.push('/dashboard')"></iLogin>
      <!--endregion-->
    </div>
  </div>
</template>

<script>
import iLogin from '../../components/iLogin/iLogin.vue'

export default {
  components: { iLogin },
  data () {
    return {}
  },
  created () {
  },
  computed: {},
  methods: {}
}
</script>

<style lang="less" scoped>
@import "./Login.scss";
</style>
