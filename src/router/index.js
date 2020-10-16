
import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
import Layout from '../views/layout/Layout'
//
 export const constantRouterMap = [
  { path: '/404', component: resolve => require(['@/views/errorPage/404'], resolve), hidden: true },
  { path: '/401', component: resolve => require(['@/views/errorPage/401'], resolve), hidden: true },
]
export const asyncRouterMap = [
  {
    path: '',
    component: Layout,
    redirect: 'agent',
    children: [
      {
        path: '/dashboard',
        component: resolve => require(['@/views/dashboard.vue'], resolve),
        name: 'dashboard',
        meta: { title: 'DASHBOARD', icon: 'icon-dashboard' },
      },
      {
        path: '/agent',
        component: resolve => require(['@/views/agent/index'], resolve),
        name: 'agent',
        meta: { title: 'AGENT', icon: 'icon-sitemap' },
      },
      {
        path: '/cruise',
        component: resolve => require(['@/views/cruise.vue'], resolve),
        name: 'cruise',
        meta: { title: 'MY CRUISE', icon: 'icon-boat' },
      },
      {
        path: '/help',
        component: resolve => require(['@/views/help.vue'], resolve),
        name: 'help',
        meta: { title: 'HELP', icon: 'icon-life-bouy' },
      }
    ]
  },
]

export default new Router({
  // mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap.concat(asyncRouterMap)
})
