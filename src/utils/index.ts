// @ts-nocheck
import storage from 'good-storage'
import router from '@/router'

// 退出登录清空状态
export const signup = () => {
  storage.clear()
  router.push(`/login`)
}
