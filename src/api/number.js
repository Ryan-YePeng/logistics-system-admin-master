import {axiosG, axiosK} from './request'

// 单号录入
const addNumberUrl = 'hdd/exportDingDangHao';

export function addNumberApi(data) {
  return axiosK(addNumberUrl, data)
}

// 获得不可用的单号
const getNumberUrl = 'hdd/cannotUse';

export function getNumberApi() {
  return axiosG(getNumberUrl)
}

// 获取自己的下级部门
const getMySiteUrl = 'hdd/getUserRolelevel?';

export function getMySiteApi(data) {
  return axiosG(getMySiteUrl + data)
}

// 分配单号
const giveNumberUrl = 'hdd/toL_order?';

export function giveNumberApi(data) {
  return axiosK(giveNumberUrl, data)
}

// 获取哪些订单号已经分配下去
const getHadGivenUrl = 'hdd/getL_orderwasUse?';

export function getHadGivenApi(data) {
  return axiosG(getHadGivenUrl + data)
}


