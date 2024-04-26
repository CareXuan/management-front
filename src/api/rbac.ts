import request from '@/utils/request'

export const user_list = (params: any) => {
  return request.get('/user/list', { params: params })
}

export const user_add = (data: any) => {
  return request.post('/user/add', data)
}

export const role_list = (params: any) => {
  return request.get('/auth/roles', { params: params })
}

export const permission_list = () => {
  return request.get('/auth/permission')
}

export const permission_add = (data: any) => {
  return request.post('/auth/permission/add', data)
}

export const permission_delete = (data: any) => {
  return request.post('/auth/permission/delete', data)
}