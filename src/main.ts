// @ts-nocheck
import Vue from 'vue'
import router from '@/router'
import pts from '@/utils/pts'
import App from '@/App.vue'
import i18n from '@/local'
import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import 'element-ui/lib/theme-chalk/index.css'
import '@/app.scss'


Vue.use(pts)
new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')





