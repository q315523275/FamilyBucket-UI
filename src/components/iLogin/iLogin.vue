<template>
  <div class="dmc-login-wrap">
    <!--短信 + 验证码登录-->
    <div class="ms-login">
      <div>
        <el-form :model="loginModel" ref="loginModel" label-width="0" @keyup.native.enter="BLL.login()">
          <el-form-item label="">
            <el-input placeholder="请填写登陆账号" v-model="loginModel.phone" :maxlength="11" autoComplete="on">
              <template slot="prepend"><img src="../../assets/images/user.png" alt="" class="icon small"></template>
            </el-input>
          </el-form-item>
          <el-form-item label="">
            <el-input placeholder="请填写登录密码" v-model="loginModel.pwd" type="password" autoComplete="on">
              <template slot="prepend"><img src="../../assets/images/pwd.png" alt="" class="icon"></template>
            </el-input>
          </el-form-item>
          <el-form-item label="">
            <el-input placeholder="请填写右侧图文验证码" v-model="loginModel.imgCode" :maxlength="4" class="imgCode">
              <template slot="prepend"><i class="el-icon-picture"></i></template>
              <template slot="append">
                <img :src="imgCodeText" @click="BLL.refreshImgCode()" alt=""/>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="btn-login" type="primary" @click="BLL.login()" :disabled="!!BLL.disabled()"
                       :loading="loading.state">
              <span>{{loading.str}}</span>
            </el-button>
          </el-form-item>
          <el-form-item>
            <p class="text-tip">PRESENTED BY FAMILYBUCKET R&D TEAM 2018-2020.</p>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import BLL from './Login'

export default {
  props: {
    showMask: {
      type: Boolean,
      default: true
    }
  },
  data: function () {
    return {
      uid: null,
      loginModel: {
        phone: '',
        pwd: '',
        imgCode: ''
      },
      loginStr: '登 录',
      countdown: {
        timeoutCount: 0,
        timeinterval: null,
        txt: null
      },
      imgCodeText: ''
    }
  },
  created () {
    // 初始化
    this.BLL = new BLL(this)
  },
  mounted () {
    this.$nextTick(() => {
      // this.BLL.refreshImgCode()
      // 初始化vuex缓存数据
      if (!this.showMask) {
        this.$store.commit('MENU_INIT')
      }
      this.$store.commit('AUTH_INIT')
      // 生成guid
      this.$store.commit('CREATED_GUID')
    })
  },
  computed: {
    loading () {
      if (this.$store.getters.btnLoading.str && !this.$store.getters.btnLoading.id) {
        return { state: true, str: this.$store.getters.btnLoading.str }
      }
      return { state: false, str: this.loginStr }
    },
    sendBtnLoading () {
      if (this.$store.getters.btnLoading.str && this.$store.getters.btnLoading.id === 'sendBtn') {
        return { state: true }
      }
      return { state: false }
    }
  },
  methods: {}
}
</script>

<style lang="less" rel="stylesheet/less">
@import "./iLogin.less";
</style>
