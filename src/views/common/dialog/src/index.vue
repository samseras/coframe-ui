<template>
  <el-dialog :visible.sync="dialogVisible" :title="title" v-bind="$attrs" :close-on-click-modal="false">
    <slot name="form"></slot>
    <div slot="footer">
      <el-button type="text" @click="cancel">取消</el-button>
      <el-button type="primary" @click="submit">{{okText}}</el-button>
    </div>
  </el-dialog>
</template>
<script>
  export default {
    components: {},
    mixins: [],
    computed: {},
    props: {
      dialogVisible: {},
      okText: {
        default: '提交'
      },
      title: {},
      formType: {
        default: 'form'
      },
    },
    mounted(){
    },
    data(){
      return {
//        title: ''
      }
    },
    watch: {
      dialogVisible(val) {
        if (!val) {
          this.cancel()
        }
      },
    },
    methods: {
      cancel(){
        this.$emit('update:dialogVisible', false)
        if (this.getForm() && this.getForm().cancel) {
          this.getForm().cancel()
        }
      },
      getForm(){
        if (this.$slots['form'] && this.$slots['form'].length === 1) {
          return this.$slots['form'][0]['componentInstance']
        } else {
          return null
        }
      },
      async submit(){
        if (this.formType === 'form') {
          let comp = this.getForm()
          if (comp.$refs[comp.formRef]) {
            comp.$refs[comp.formRef].validate(async valid => {
              if (valid) {
                if (comp.validateResolve) {
                  if (comp.validateResolve.call(comp, null)) {
                    this.cancel()
                  }
                }
              } else {
                comp.validateReject && comp.validateReject.call(comp, null)
              }
            })
          }
        } else {
          let comp = this.getForm()
          if (comp.callback()) {
            this.cancel()
          }
        }


      }
    }
  }
</script>
