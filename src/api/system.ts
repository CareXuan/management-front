import request from '@/utils/request'
import axios from 'axios'
import { set } from 'vue/types/umd'

// 登录
export const login = (data: any) => {
  // return request.post('/login', data)
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve({ token: Date.now() }), 1000)
  })
}

// 验证码
export const captcha = () => {
  return request.get('/captchaImage')
}

// 菜单
export const menus = () => {
  return axios.get(window.location.origin + '/json/menus.json')
}
