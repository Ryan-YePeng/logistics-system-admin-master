import {axiosG} from './request'

// 获得个人信息
const getUserUrl = 'auth/getUser?u_id=';

export function getUserApi(data) {
  return axiosG(getUserUrl + data)
}
