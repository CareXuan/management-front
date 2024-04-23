import request from '@/utils/request'
import axios from 'axios'

// 登录
export const login = (data: any) => {
  return request.post('/login', data)
}

// 验证码
export const captcha = () => {
  return request.get('/captchaImage')
}

// 菜单
export const menus = () => {
  return axios.get(window.location.origin + '/json/menus.json')
}
