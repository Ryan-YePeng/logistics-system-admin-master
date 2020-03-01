import {axiosd, axiosG, axiosK} from './request'

// 搜索用户列表
const getUserListUrl = 'admin/getUserList?';

export function getUserListApi(data) {
  return axiosG(getUserListUrl + data)
}

// 编辑用户
const updateUserUrl = 'school/updateUser';

export function updateUserApi(data) {
  return axiosK(updateUserUrl, data)
}
