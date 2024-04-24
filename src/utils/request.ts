import axios from 'axios'
import store from '@/store'
import { signup } from '@/utils'

const instance = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: 100000
})

instance.interceptors.request.use(
  config => {
    const token = store.getters.token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  response => {
    const { code, msg, data } = response.data
    if (code !== 200) {
      code === 401 && signup()
      return Promise.reject(msg || '出错了噢')
    }
    if (['/captchaImage', '/login'].includes(response.config.url as string)) return response.data
    return data
  },
  error => {
    return Promise.reject(error || '出错了噢')
  }
)
export default instance
