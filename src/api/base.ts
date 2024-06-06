import { request } from '@/config/axios'
import qs from 'qs'

// 有分页
export function page(url, params, conf = {}) {
  return request({
    url,
    method: 'get',
    params,
    ...conf
  })
}

// 没有分页
export function list(url, params) {
  return request({
    url,
    method: 'get',
    params
  })
}

// 预留统计接口
export function staticData(url, params) {
  return request({
    url,
    method: 'get',
    params
  })
}

export function infoParamKey(url, params) {
  return request({
    url: url + '?' + params.field + '=' + params.value,
    method: 'get'
  })
}

export function info(url, id) {
  return request({
    url: url + '?id=' + id,
    method: 'get'
  })
}

export function add(url, data) {
  return request({
    url,
    method: 'post',
    data
  })
}

export function del(url, data) {
  return request({
    url: url,
    method: 'delete',
    data
  })
}

export function edit(url, data) {
  return request({
    url,
    method: 'put',
    data
  })
}

export function download(url, params) {
  return request({
    url: url,
    method: 'get',
    params,
    responseType: 'arraybuffer'
  })
}

// 下载导入模板
export function importTemplate(url, params) {
  return request({
    url: url,
    method: 'get',
    params,
    responseType: 'arraybuffer'
  })
}

// 导入数据
export function importData(url, data) {
  return request({
    url,
    header: { 'Content-Type': 'multipart/form-data' },
    method: 'post',
    data
  })
}

export default {
  page,
  list,
  staticData,
  info,
  infoParamKey,
  add,
  del,
  edit,
  download,
  importData,
  importTemplate
}
