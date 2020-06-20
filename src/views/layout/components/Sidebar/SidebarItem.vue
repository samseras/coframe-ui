<template>
  <div class="menu-wrapper">
    <template v-for="item in routesWrapper" v-if="!item.hidden && item.children">
      <router-link
        v-if="hasOneShowingChildren(item.children) && !item.children[0].children && !item.alwaysShow"
        :to="item.path + '/' + item.children[0].path"
        :key="item.children[0].name"
      >
        <el-menu-item :index="item.path + '/' + item.children[0].path" :class="{ 'submenu-title-noDropdown': !isNest }">
          <icon v-if="item.meta && item.meta.icon" color="#fff" :path="item.meta.icon" />
          <icon v-else-if="item.children[0].meta && item.children[0].meta.icon" color="#fff" :path="item.children[0].meta.icon" />
          <span v-if="item.children[0].meta && item.children[0].meta.title"
                slot="title">{{ generateTitle(item.children[0].meta.title) }}</span>
        </el-menu-item>
      </router-link>

      <el-submenu v-else :index="item.name || item.path" :key="item.name">
        <template slot="title">
          <icon v-if="item.meta && item.meta.icon" color="#fff" :path="item.meta.icon" />
          <span v-if="item.meta && item.meta.title" slot="title">{{ generateTitle(item.meta.title) }}</span>
        </template>

        <template v-for="child in item.children" v-if="!child.hidden">
          <sidebar-item
            :is-nest="true"
            class="nest-menu"
            v-if="child.children && child.children.length > 0"
            :routes="[child]"
            :key="child.path"
          ></sidebar-item>

          <router-link v-else :to="item.path + '/' + child.path" :key="child.name">
            <el-menu-item style="padding-left:25px;" :index="item.path + '/' + child.path">
              <icon :path="child.meta.icon" color="#fff" />
              <span v-if="child.meta && child.meta.title" slot="title">{{ generateTitle(child.meta.title) }}</span>
            </el-menu-item>
          </router-link>
        </template>
      </el-submenu>
    </template>
  </div>
</template>

<script>
  import {generateTitle} from '@/utils/i18n'
  import _ from 'lodash'
  import Icon from '@/components/Icon/icon'
  export default {
    name: 'SidebarItem',
    components: {Icon},
    computed: {
      routesWrapper() {
        if (this.routes) {
          if(!this.platform){
            return this.routes
          }else{
            return this.routes.filter(r => {
              return !r.group || r.group === this.platform || (_.isArray(r.group) && r.group.some(g => g === this.platform))
            })
          }
        } else {
          return []
        }

      },
    },
    props: {
      routes: {
        type: Array,
      },
      isNest: {
        type: Boolean,
        default: false,
      },
    },
    methods: {
      hasOneShowingChildren(children) {
        const showingChildren = children.filter(item => {
          return !item.hidden
        })
        if (showingChildren.length === 1) {
          return true
        }
        return false
      },
      generateTitle,
    },
  }
</script>
