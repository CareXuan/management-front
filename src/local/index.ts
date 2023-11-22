import Vue from 'vue'
import VueI18n from 'vue-i18n'
import store from '@/store'
import en from '@/local/en'
import zh from '@/local/zh'

Vue.use(VueI18n)

export default new VueI18n({
  locale: store.getters.language,
  messages: { en, zh }
})
