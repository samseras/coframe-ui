<template>
  <el-drawer
    class="add-browser-drawer"
    title=""
    :visible.sync="drawer"
    direction="btt"
    :before-close="handleClose">
    <div class="draw-cont">
      <p>Separate multiple resource name with commas</p>
      <el-autocomplete
        class="inline-input"
        v-model="browser"
        :fetch-suggestions="querySearch"
        placeholder="input value"
        :trigger-on-focus="false"
      ></el-autocomplete>
      <p class="submit" @click="submitResource">
        Add Resources
      </p>
    </div>
  </el-drawer>
</template>

<script>
import autoComplate from './autoComplate'
export default {
  name: 'AddBrowserDrawer',
  mixins: [autoComplate],
  data () {
    return {
      drawer: false,
    }
  },
  methods: {
    show () {
      this.drawer = true
    },
    close () {
      this.drawer = false
    },
    handleClose () {
      this.close()
    }
  }
}
</script>

<style lang="scss">
.add-browser-drawer{
  /deep/.el-drawer__body{
    .draw-cont{
      padding: 20px;
      box-sizing: border-box;
      p{
        color: #666;
      }
      /deep/.el-autocomplete,.inline-input{
        width: 100%;
        color: #00B4CF;
        border: none;
      }
      .submit{
        padding: 6px;
        text-align: center;
        background: #00B4CF;
        color: #fff;
        cursor: pointer;
      }
    }
  }
  /deep/ .el-drawer__close-btn{
    color: #00B4CF;
    font-weight: bold;
    font-size: 24px;
  }
  /deep/ .el-drawer__header{
    margin-bottom: 0;
  }
}
</style>
