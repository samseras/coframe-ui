<template>
  <el-scrollbar wrapClass="scrollbar-wrapper">
    <el-menu
      mode="vertical"
      :show-timeout="200"
      :default-active="$route.path"
      background-color="#304156"
      text-color="#efefef"
      active-text-color="#0084CF"
      :router="true"
    >
<!--      <sidebar-item :routes="routers"></sidebar-item>-->
      <el-menu-item :index="item.path" v-for="item in routers" :key="item.name">
        <i :class="item.meta.icon"></i>
        <span slot="title">{{item.meta.title}}</span>
      </el-menu-item>
    </el-menu>
    <history class="his-map"></history>
  </el-scrollbar>
</template>

<script>
  import {mapGetters} from 'vuex'
  import SidebarItem from './SidebarItem'
  import {constantRouterMap, asyncRouterMap} from '@/router'
  import Vue from 'vue'
  import History from './History'

  export default {
    components: {SidebarItem, History},
    computed: {
      ...mapGetters(['permission_routers', 'sidebar']),
      routers() {
          return asyncRouterMap[0].children
      },
      // isCollapse() {
      //   return !this.sidebar.opened
      // },
      menuDisable() {
        return !(this.$route.name === 'dashboard' && this.platform === null)
      },

    },
    data(){
      return {
        config: Vue.config,
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.his-map{
  position: absolute;
  bottom: 20px;
  left: 0;
}
</style>
