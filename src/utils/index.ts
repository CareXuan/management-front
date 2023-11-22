// @ts-nocheck
import storage from 'good-storage'
import router from '@/router'

export const signup = () => {
  storage.clear()
  router.replace('/login')
}
