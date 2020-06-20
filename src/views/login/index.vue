<template>
  <div class="text-center mt-50 f-20" v-if="!loginType"><i class="el-icon-loading"></i>登录跳转中...</div>
  <div v-else>
    <component :is="loginType" :url="loginUrl"></component>
  </div>
</template>

<script>
  import {setToken, setLoginType} from '@/utils/auth.js'
  import Normal from './login-normal.vue'
  export default {
    name: 'index',
    components: {Normal},
    computed: {},
    props: {},
    data() {
      return {
        loginType: 'Normal',
        loginUrl: ''
      }
    }

  }
</script>
