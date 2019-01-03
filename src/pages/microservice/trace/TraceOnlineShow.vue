<template>
  <el-dialog title="片段详细内容" :visible.sync="show" :close-on-click-modal="false" width="60%">
    <el-form :model="modelForm" label-width="100px" v-if="modelForm" v-loading="loading">
      <el-form-item label="JSON内容" prop="JSON">
        <el-input type="textarea" v-model="modelForm.JSON" :autosize="{ minRows: 17, maxRows: 30}"></el-input>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    },
    modelForm: {
      type: Object
    }
  },
  data () {
    return {
      data: [],
      show: false
    }
  },
  created () {
    if (this.value) {
      this.show = true
    }
  },
  computed: {
    loading () {
      return this.$store.getters.btnLoading.str && this.$store.getters.btnLoading.id === 'edit'
    }
  },
  mounted () { },
  methods: { },
  watch: {
    show (val) {
      this.$emit('input', val)
    },
    value (val) {
      this.show = val
    }
  }
}
</script>
<style lang="less" rel="stylesheet/less">
.edit-contain {
  width: 50%;
  padding-top: 15px;
}
</style>
