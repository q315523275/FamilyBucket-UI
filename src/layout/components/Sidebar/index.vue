<template>
  <div>
    <div class="dmc-user-info-bg">
      Family Bucket
      <!--<img src="../../../assets/images/axon.png" v-if="!isCollapse">-->
    </div>
    <scroll-bar class="scroll-bar">
      <el-menu mode="vertical" unique-opened :default-active="$route.path" :collapse="isCollapse"
               background-color="#304156" text-color="#fff" active-text-color="#409EFF" @select="select">
        <sidebar-item :routes="routes"></sidebar-item>
      </el-menu>
    </scroll-bar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
import ScrollBar from '../../../components/ScrollBar'

export default {
  components: { SidebarItem, ScrollBar },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    routes () {
      return this.$store.state.menus.userNavList
    },
    isCollapse () {
      return !this.sidebar.opened
    }
  },
  methods: {
    select (index) {
      if (index.startsWith('/frame?')) {
        // frame打开新窗
        let src = decodeURIComponent(index.replace('/frame?src=', ''))
        if (src.indexOf('?') > -1) {
          src += `&token=${this.$store.state.auth.authInfo.Token}`
        } else {
          src += `?token=${this.$store.state.auth.authInfo.Token}`
        }
        window.open(src)
      } else {
        this.$router.push({ path: index })
      }
    }
  }
}
</script>
<style lang="less">
.dmc-user-info-bg {
  font-size: 24px;
  color: #fff;
  font-weight: 500;
  z-index: 200;
  position: relative;
  border-top-left-radius: 4px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #304156 linear-gradient(0deg,
  rgba(48, 65, 86, .8) 0%,
  rgba(33, 33, 33, .8) 100%);
  img {
    width: 50%;
  }
}

.scroll-bar {
  position: fixed !important;
  top: 0;
  width: 180px !important;
}
</style>
