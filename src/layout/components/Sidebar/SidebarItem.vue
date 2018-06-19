<template>
  <div class="menu-wrapper">
    <template v-for="(menu, index) in routes">
      <el-menu-item :index="menu.sub[0].link" :key="menu.sub[0].name" class="submenu-title-noDropdown"
                    v-if="!menu.redirect">
        <i class="axon-icon" v-if="menu.icon.indexOf('#')>-1" v-html="menu.icon"></i>
        <i :class="menu.icon+' icon-size'" v-else></i>
        <span slot="title">{{menu.name}}</span>
      </el-menu-item>
      <el-submenu v-else :index="index.toString()" :key="index">
        <template slot="title">
          <i class="axon-icon" v-if="menu.icon.indexOf('#')>-1" v-html="menu.icon"></i>
          <i :class="menu.icon+' icon-size'" v-else></i>
          <span slot="title">{{menu.name}}</span>
        </template>
        <template v-for="sub in menu.sub">
          <el-menu-item :index="sub.link" :key="sub.name">
            <span slot="title">{{sub.name}}</span>
          </el-menu-item>
        </template>
      </el-submenu>
    </template>
  </div>
</template>

<script>
export default {
  name: 'SidebarItem',
  props: {
    routes: {
      type: Array
    }
  }
}
</script>
<style lang="less">
.axon-icon {
  padding-right: 10px;
  font-size: 16px;
}
</style>
