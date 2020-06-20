
import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
// const route = [
//     {
//     path: '/login',
//     name: 'login',
//     component:  resolve => require(['@/views/login/index'], resolve),
//     hidden: true,
//   },
//   {
//     path: '/',
//     name: 'layout',
//     component:  resolve => require(['@/views/Layout/Layout'], resolve),
//     hidden: true,
//   },
//
// ]
import Layout from '../views/layout/Layout'
//
 export const constantRouterMap = [
  {
    path: '/login',
    name: 'login',
    component:  resolve => require(['@/views/login/index'], resolve),
    hidden: true,
  },
  { path: '/404', component: resolve => require(['@/views/errorPage/404'], resolve), hidden: true },
  { path: '/401', component: resolve => require(['@/views/errorPage/401'], resolve), hidden: true },
]
export const asyncRouterMap = [
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [
      {
        path: 'dashboard',
        component: resolve => require(['@/views/dashboard/index'], resolve),
        name: 'dashboard',
        meta: { title: '概要', icon: 'dashboard' ,noCache:true,},
      },
      {
        path: 'text',
        component: resolve => require(['@/views/text'], resolve),
        name: 'text',
        meta: { title: '测试', icon: 'dashboard' ,noCache:true,},
      }
    ],
  },
]

export default new Router({
  // mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap.concat(asyncRouterMap)
})
