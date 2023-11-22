import request from '@/utils/request'

// 登录
export const login = (data: any) => {
  return request.post('/login', data)
}

// 验证码
export const captcha = () => {
  return request.get('/captchaImage')
}
