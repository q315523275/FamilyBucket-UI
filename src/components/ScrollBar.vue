<template>
  <div class="scroll-container" ref="scrollContainer" @wheel.prevent="handleScroll">
    <div class="scroll-wrapper" ref="scrollWrapper" :style="{top: top + 'px'}">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

const delta = 15
export default {
  name: 'scrollBar',
  data () {
    return {
      top: 80,
      min: 80
    }
  },
  created () {
    if (!this.sidebar.opened) {
      this.top = 0
      this.min = 0
    }
  },
  computed: {
    ...mapGetters([
      'sidebar'
    ])
  },
  methods: {
    handleScroll (e) {
      const eventDelta = e.wheelDelta || -e.deltaY * 3
      const $container = this.$refs.scrollContainer
      const $containerHeight = $container.offsetHeight
      const $wrapper = this.$refs.scrollWrapper
      const $wrapperHeight = $wrapper.offsetHeight
      if (eventDelta > 0) {
        this.top = Math.min(this.min, this.top + eventDelta)
      } else {
        if ($containerHeight - delta < $wrapperHeight) {
          if (this.top < -($wrapperHeight - $containerHeight + delta)) {
            this.top = this.top
          } else {
            this.top = Math.max(this.top + eventDelta, $containerHeight - $wrapperHeight - delta)
          }
        } else {
          this.top = this.min
        }
      }
    }
  },
  watch: {
    'sidebar.opened' (val) {
      if (!val) {
        this.top = 0
        this.min = 0
      } else {
        this.top = 80
        this.min = 80
      }
    }
  }
}
</script>

<style rel="stylesheet/less" lang="less" scoped>
@menuBg: #304156;

.scroll-container {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: @menuBg;
  .scroll-wrapper {
    position: absolute;
    width: 100% !important;
  }
}
</style>
