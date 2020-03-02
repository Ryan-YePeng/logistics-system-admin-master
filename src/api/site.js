import {axiosds, axiosG, axiosK, axiosP} from './request'

// 添加网点
const addSiteUrl = 'hdd/addRegister';

export function addSiteApi(data) {
  return axiosK(addSiteUrl, data)
}

// 删除网点
const deleteSiteUrl = 'hdd/deleteUser?longs=';

export function deleteSiteApi(data) {
  return axiosds(deleteSiteUrl, data)
}

// 修改网点
const updateSiteUrl = 'hdd/updateUser';

export function updateSiteApi(data) {
  return axiosP(updateSiteUrl, data)
}

// 获得网点
const getSiteUrl = 'hdd/searchUser?';

export function getSiteApi(data) {
  return axiosG(getSiteUrl + data)
}
