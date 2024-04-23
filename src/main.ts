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
import '@/app.scss'

Vue.use(pts)
new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
  mounted() {
    this.$restore()
  }
}).$mount('#app')
