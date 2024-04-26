// @ts-nocheck

import Vue from 'vue'
import VueRouter from 'vue-router'
import storage from 'good-storage'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/', name: '', component: import('@/views/home/index.vue'), meta: { title: '首页' } },
    { path: '/login', name: 'Login', component: () => import('@/views/login/index.vue'), meta: { title: '登录' } }
    // { path: '/:path(.*)', name: 'NotFound', component: () => import('@/views/404/index.vue') }
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
    route.title = route.label
    router.addRoute('', {
      path: route.path,
      name: route.path.replace(/\//g, '_'),
      // @ts-ignore
      title: route.title,
      icon: route.icon,
      meta: { title: route.title },
      component: () => import(`@/views/${route.component}`)
    })

    route.children && addRoutes(route.children)
  })
}

export default router
