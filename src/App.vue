<template>
  <div id="app" style="height:100%;">
    <!--default slot-->
    <router-view></router-view>
    <!--登录框组件-->
    <div v-if="LoginDialogIsShow" class="login-contain">
      <iLogin></iLogin>
    </div>
  </div>
</template>

<script>
import iLogin from './components/iLogin/iLogin.vue'
import { mapState } from 'vuex'

export default {
  components: { iLogin },
  data () {
    return {}
  },
  computed: {
    ...mapState({
      LoginDialogIsShow: ({ login }) => login.loginDialogIsShow
    })
  },
  methods: {}
}
</script>

<style lang="less" rel="stylesheet/less">
#nprogress .spinner {
  display: none;
}

.login-contain {
  position: fixed;
  top: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  z-index: 1002;
}

@import "styles/icon.css";
</style>
