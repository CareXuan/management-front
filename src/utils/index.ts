// @ts-nocheck
import storage from 'good-storage'
import router from '@/router'

// 退出登录清空状态
export const signup = () => {
  storage.clear()
  store.commit('update', { name: 'token', value: null })
  router.push(`/login`)
}
