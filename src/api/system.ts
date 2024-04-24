import request from '@/utils/request'
import Store from '@/store'

// 登录
export const login = (data: any) => {
  return request.post('/auth/login', data)
  // return new Promise((resolve, reject) => {
  //   setTimeout(() => resolve({ token: Date.now() }), 1000)
  // })
}

// 验证码
export const captcha = () => {
  return request.get('/captchaImage')
}

// 菜单
export const menus = (params: any) => {
  return request.get('/user/permission', { params: params })
}
