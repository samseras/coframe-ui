<template>
  <i :class="icon" :style="iconStyle"></i>
</template>

<script>
export default {
  name: 'icon',
  props: {
    path: {},
    className: {
      type: String,
      default: ''
    },
    myStyle: {
      type: Object,
      default: () => ({})
    },
    color:{
      type: String,
      default: ''
    }
  },
  computed: {
    icon () {
      return this.className + ' iconfont icon-' + this.path
    },
    iconStyle() {
      return {
        ...this.myStyle,
        color: this.color
      }
    }
  },
}
</script>
<style lang="scss" scoped>
@import '~@/assets/iconfont/iconfont.css';
i{
  display: inline-block;
  min-width: 1em;
  min-height: 1em;
}
</style>
