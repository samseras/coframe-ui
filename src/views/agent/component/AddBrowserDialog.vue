<template>
  <el-dialog
    title=""
    class="add-browser-dialog"
    :visible.sync="dialogVisible"
    width="570px"
    :footer="false"
    :before-close="handleClose">
    <p>Separate multiple resource name with commas</p>
    <el-autocomplete
      class="inline-input"
      v-model="browser"
      :fetch-suggestions="querySearch"
      placeholder="input value"
      :trigger-on-focus="false"
    ></el-autocomplete>
    <div class="footer">
      <p @click="submitResource">Add Resources</p>
      <p @click="close">Cancel</p>
    </div>
  </el-dialog>
</template>

<script>
import autoComplate from './autoComplate'
export default {
  name: 'AddBrowserDialog',
  mixins: [autoComplate],
  data () {
    return {
      dialogVisible: false
    }
  },
  methods: {
    show () {
      this.dialogVisible = true
    },
    close () {
      this.dialogVisible = false
    },
    handleClose () {
      this.close()
    }
  }
}
</script>

<style scoped lang="scss">
.add-browser-dialog{
  /deep/ .el-dialog__body{
    padding: 0 20px;
  }
  /deep/.el-autocomplete,.inline-input{
    width: 100%;
    color: #00B4CF;
    border: none;
  }
  /deep/ .el-dialog__header{
    background: transparent;
    padding-top: 10px;
  }
  /deep/ .el-dialog__headerbtn .el-dialog__close{
    color: #00B4CF !important;
    font-weight: bold;
    font-size: 24px;
  }
  p{
    color: #666;
  }
  .footer{
    p{
      width: 120px;
      text-align: center;
      color: #fff;
      display: inline-block;
      height: 24px;
      line-height: 24px;
      cursor: pointer;
      &:nth-of-type(1){
        background: #00B4CF;
        margin-right: 10px;
      }
      &:nth-of-type(2){
        background: #435466;
      }
    }
  }
}
</style>
