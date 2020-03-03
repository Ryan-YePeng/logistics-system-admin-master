import {axiosds, axiosG, axiosK, axiosL, axiosP} from './request'

// 录入更改订单
const addOrderUrl = 'hdd/addL_order';

export function addOrderApi(data) {
  return axiosK(addOrderUrl, data)
}

// 删除订单
const deleteOrderUrl = 'hdd/deleteL_order?longs=';

export function deleteOrderApi(data) {
  return axiosds(deleteOrderUrl, data)
}

// 获得订单
const getOrderUrl = 'hdd/searchL_order?';

export function getOrderApi(data) {
  return axiosG(getOrderUrl + data)
}

// 导出订单
const exportOrderUrl = 'hdd/export?';

export function exportOrderApi(data) {
  return axiosL(exportOrderUrl + data)
}

// 获取所有网点
const getAllSiteUrl = 'hdd/getallUser';

export function getAllSiteApi() {
  return axiosG(getAllSiteUrl)
}
