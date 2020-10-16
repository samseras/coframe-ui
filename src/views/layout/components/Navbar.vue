<template>
  <div class="navbar-box">
    <el-menu class="navbar" mode="horizontal">
      <hamburger v-if="device === 'mobile' || device === 'phone'" class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
      <div class="right-menu">
        <div class="menu-logo">
          <img src="./../../../assets/image/logo.svg" alt="">
        </div>
        <el-dropdown size="default" class="avatar-container" trigger="click" @command="clickDropDown">
          <div class="avatar-wrapper">
          <span><img src="./../../../assets/image/ubuntu.png" alt=""></span>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="admin"><i class="icon-id-card"></i>Profile</el-dropdown-item>
            <el-dropdown-item command="changePassword"><i class="icon-sign-in"></i>Sign Out</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-menu>
  </div>

</template>

<script>
import { mapGetters } from 'vuex'
import store from '@util/sessionStore'
import Vue from 'vue'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import ErrorLog from '@/components/ErrorLog'
import Screenfull from '@/components/Screenfull'
import LangSelect from '@/components/LangSelect'
import ThemePicker from '@/components/ThemePicker'

// import ChangePassword from '@/views/coframe/user/change-password.vue'
import * as auth from '@/utils/auth.js'

export default {
  provide() {
    return {
      closeMenu: this.closeMenu,
    }
  },
  components: {
    Breadcrumb,
    Hamburger,
    ErrorLog,
    Screenfull,
    LangSelect,
    ThemePicker,
    // ChangePassword,
  },
  computed: {
    ...mapGetters(['sidebar', 'name', 'avatar', 'roles']),
    isAdmin() {
      return ['sysadmin'].some(role => this.$store.getters.roles.some(r1 => r1 === role))
    },
    currentPlatformName() {
      if (this.platform === 'system' || this.platform === 'dubbo') {
        return `当前系统：${this.currentSystem.name}`
      } else if (this.platform === 'admin') {
        return '管理平台'
      } else return null
    },
    hamburgarDisable() {
      return this.$route.name === 'dashboard' && this.currentPlatformName === null
    },
    device() {
      return this.$store.state.app.device
    },
  },
  mounted() {
    if (this.hamburgarDisable) {
      //        this.$store.dispatch('closeSideBar',false)
    }
  },
  data() {
    return {
      config: Vue.config,
      menu: {
        system: true,
      },
      changePasswordShow: false,
    }
  },
  methods: {
    closeMenu(name) {
      this.menu[name] = false
      this.$nextTick(() => {
        this.menu[name] = true
      })
    },
    toggleSideBar() {
      this.$store.dispatch('toggleSideBar')
    },
    logout() {
      if (auth.isIAM()) {
        this.$store.dispatch('setNeedGetPermission', true)
        this.$store.dispatch('LogOut')
      } else if (auth.isNormal()) {
        this.$store.dispatch('setNeedGetPermission', true)
        this.$store.dispatch('LogOut')
      } else {
        this.$router.push({name: 'login'})
      }

    },
    goSingleLoginPage(redirectUrl) {
      window.location.href = redirectUrl
    },
    refresh(){
//      window.history.go(0)
    },
    clickDropDown(command) {
      if (command === 'admin') {
        this.choosePlatform('admin')
      } else if (command === 'changePassword') {
        this.changePasswordShow = true
      } else if (command === 'miniTools') {
        this.$router.push({name:'mini-tools-index'})
      }
    },
  },
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar-box{
  background: #fff;
  height: 60px;
  line-height: 60px;
  border-radius: 0px !important;
  box-shadow: 0 0 20px -5px #999;
  .navbar {
   max-width: 1200px;
    margin: 0 auto;
    position: relative;
    .bang {
      position: absolute;
      width: 250px;
      text-align: center;
      left: 50%;
      font-size: 16px;
      transform: translate(-125px, 0px);
      cursor: pointer;
      &:hover {
        background: #ebeef5;
      }
    }
    .hamburger-container {
      line-height: 68px;
      height: 60px;
      float: left;
      padding: 0 10px;
    }
    .breadcrumb-container {
      float: left;
    }
    .errLog-container {
      display: inline-block;
      vertical-align: top;
    }
    .right-menu {
      user-select: none;
      height: 100%;
      height: 60px;
      position: relative;
      .menu-logo{
        height: 40px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        img{
          height: 100%;
        }
      }
      .avatar-container{
        float: right;
        display: inline-block;
        //line-height: 60px;
        margin-top: 10px;
        margin-right: 50px;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        &:hover{
          background: transparent !important;
        }
        img{
          width: 40px;
          height: 40px;
          border-radius: 50%;
        }
      }
      &:focus {
        outline: none;
      }
      .right-menu-item {
        display: inline-block;
        margin: 0 0px;
      }
      .screenfull {
        height: 60px;
        line-height: 60px;
        transform: translate(0, 10px);
      }
      .international {
        vertical-align: top;
      }
      .theme-switch {
        vertical-align: 15px;
        transform: translate(0, 10px);
      }
      .avatar-container {
        cursor: pointer;
        padding: 0px 8px;
        &:hover {
          background: #dcdfe6;
        }
      }
    }
    .workplatform {
      font-size: 14px;
      width: 80px;
      color: #606266;
      text-align: center;
      cursor: pointer;
      &:hover {
        background: #dcdfe6;
      }
    }
  }
}
</style>
