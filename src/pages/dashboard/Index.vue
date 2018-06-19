<template>
  <div class="dashboard-contain">
    <h2>欢迎您，{{$store.state.auth.authInfo.RealName}}</h2>
  </div>
</template>

<script>

export default {
  components: {},
  data () {
    return {}
  },
  computed: {},
  created () {},
  beforeDestroy () {},
  mounted () {},
  methods: {}
}
</script>

<style lang="less">
.dashboard-contain {
  background-color: #fff;
  padding: 20px;
}
</style>
