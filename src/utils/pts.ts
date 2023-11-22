// @ts-nocheck
import VuexPersistence from 'store-persistence'
import storage from 'good-storage'
import store from '@/store'
import { signup } from '@/utils'
import get from 'lodash.get'
import QuickDialog from 'quick-el-dialog'
import { mapGetters } from 'vuex'
import useDynamicMount from 'use-dynamic-mount'
import ElementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
export default {
  install(app: any) {
    app.use(useDynamicMount(), {
      name: '$createDialog',
      extend: QuickDialog,
      nextTick() {
        this.visible = true
      }
    })

    app.use(VuexPersistence, {
      states: 'jinxiu-admin',
      update: (name: string, value: any) => store.commit('update', { name, value }),
      removeItem: (name: string) => storage.remove(name),
      getItem: (name: string) => storage.get(name),
      setItem: (name: string, value: any) => storage.set(name, value)
    })
    app.use(ElementUi, { size: 'mini' })
    app.mixin({ computed: mapGetters(Object.keys(store.getters)) })
    app.prototype.$store = store
    app.prototype.$log = console.info
    app.prototype.$get = get
    app.prototype.$signup = signup
    app.prototype.$log = console.log

    app.config.productionTip = false
  }
}
