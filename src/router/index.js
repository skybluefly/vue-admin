import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  },

  {
    path: '/suning',
    component: Layout,
    redirect: '/suning/account',
    name: 'Suning',
    meta: { title: '苏宁', icon: 'icon-v-suning' },
    children: [
      {
        path: 'account',
        name: 'suningAccount',
        component: () => import('@/views/suning-account/index'),
        meta: { title: '苏宁账号', icon: 'icon-v-account' }
      },
      {
        path: 'order',
        name: 'suningOder',
        component: () => import('@/views/suning-order/index'),
        meta: { title: '苏宁订单', icon: 'icon-v-order' },
      },


    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})


export const asyncRouterMap = [
  {
    path: '/permission',
    component:Layout,
    redirect: '/permission/index',
    name: 'permission',
    meta: {
      title: 'permission',
      icon: 'lock',
      roles: ['admin'] // you can set roles in root nav
    },
    children:[
      {
        path: 'index',
        name: 'permissionIndex',
        component: () => import('@/views/permission/index'),
        meta: { title: '权限页面测试', icon: 'table' },
      }
    ]

  }
  ]