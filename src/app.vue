<template>
  <div id="app">
    <transition name="el-fade-in-linear" leave-to-class="leave-to-class">
      <router-view> </router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style lang="scss" scoped>
.leave-to-class {
  display: none;
}
</style>
