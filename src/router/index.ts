// @ts-nocheck

import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/layouts/admin'
import storage from 'good-storage'

Vue.use(VueRouter)
export const menus = [
  {
    path: '/',
    name: 'Home',
    meta: { title: '首页', icon: 'uim:clinic-medical' },
    component: () => import('@/views/home')
  }
]

const router = new VueRouter({
  routes: [
    { path: '/', name: 'Home', component: Layout, meta: { title: '首页' }, children: menus },
    { path: '/login', name: 'Login', component: () => import('@/views/login/index.vue'), meta: { title: '登录' } },
    { path: '/:path(.*)', name: 'NotFound', component: () => import('@/views/404/index.vue') }
  ]
})

router.beforeEach((to, from, next) => {
  document.title = to.meta?.title || 'admin'

  if (!storage.get('token') && to.path !== '/login') {
    next('/login')
  } else {
    next()
  }
})

export const addRoutes = (routes: any[]) => {
  routes.forEach(route => {
    router.addRoute('', {
      path: route.path,
      name: route.path.replace(/\//g, '_'),
      // @ts-ignore
      title: route.title,
      icon: route.icon,
      meta: {
        refresh: true,
        type: route.tool_key,
        title: route.title,
        keepAlive: true,
        qas: route.qa_page || []
      },
      component: () => import(`@/views/${route.component}`)
    })

    route.children && addRoutes(route.children)
  })
}

export default router
