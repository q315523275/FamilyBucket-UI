<template>
  <div>
    <div class="icons-container">
      <p class="warn-content">
        Element系统图标
      </p>
      <div v-for="(p,index) in elIcon" :key="index" @click="handleClipboard(generateIconCode(p.key),$event)">
        <el-tooltip placement="top">
          <div slot="content">
            {{ generateIconCode(p.key) }}
          </div>
          <div class="icon-item">
            <i :class="p.value"></i>
            <span>{{p.key}}</span>
          </div>
        </el-tooltip>
      </div>
    </div>
    <div class="icons-container">
      <p class="warn-content">
        自定义图标
      </p>
      <div v-for="(p,index) in customIcon" :key="index" @click="handleClipboard(generateIconCode(p.value,true),$event)">
        <el-tooltip placement="top">
          <div slot="content">
            {{ generateIconCode(p.value,true) }}
          </div>
          <div class="icon-item">
            <i class="axon-icon" v-html="p.value"></i>
            <span>{{p.key}}</span>
            <span style="color: #9f9f9f">{{p.value}}</span>
          </div>
        </el-tooltip>
      </div>
    </div>
  </div>
</template>

<script>
import BLL from './Index'
import { elIcon, customIcon } from '../../codes/navIcons'
import clipboard from '../../assets/utils/clipboard'

export default {
  components: {},
  data () {
    return {
      elIcon,
      customIcon
    }
  },
  computed: {},
  created () {
    // 初始化
    this.BLL = new BLL(this)
  },
  beforeDestroy () {},
  mounted () {},
  methods: {
    generateIconCode (symbol, su) {
      return su ? `<i class="axon-icon">${symbol}</i>` : `<i class="${symbol}"></i>`
    },
    handleClipboard (text, event) {
      clipboard(text, event)
    }
  }
}
</script>

<style lang="less" scoped>
.icons-container {
  margin: 10px 20px 0;
  overflow: hidden;
  .warn-content {
    background: rgba(66, 185, 131, .1);
    border-radius: 2px;
    padding: 16px;
    padding: 1rem;
    line-height: 1.6rem;
    word-spacing: .05rem;
    a {
      color: #42b983;
      font-weight: 600;
    }
  }
  .icons-wrapper {
    margin: 0 auto;
  }
  .icon-item {
    margin: 20px;
    height: 110px;
    text-align: center;
    width: 110px;
    float: left;
    font-size: 30px;
    color: #24292e;
    cursor: pointer;
  }
  span {
    display: block;
    font-size: 14px;
    margin-top: 10px;
  }
}
</style>
