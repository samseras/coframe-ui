import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import Element from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.scss' // global css
import animate from 'animate.css'
import App from './app'
import router from './router'
// import './router/before'

import store from './store'

import i18n from './lang' // Internationalization
// import './icons' // icon
import './assets/iconfont/fonts.css'

import * as filters from './filters' // global filters
// import './views/common'
import ReadConfig from './utils/config.js'

Vue.use(Element, {
  size: 'mini', // set element-ui default size
  i18n: (key, value) => i18n.t(key, value),
})

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
Vue.config.productionTip = false
Vue.config.lang = 'zh_CN'
const create = async () => {
  await ReadConfig(Vue)
  new Vue({
    el: '#app',
    router,
    store,
    i18n,
    template: '<App/>',
    components: {App},
  })
}
create()
