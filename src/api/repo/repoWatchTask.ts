/*
 *  Copyright 2019-2020 YunChaoq
 */
// import { request } from '@/config/axios'
import base from '@/api/base'

const preUrl = '/repo/watchTask'

// 有分页
const pageUrl = preUrl + '/page'
export function page(params) {
  return base.page(pageUrl, params)
}

export const pageWatchTask = page

const pageSimpleUrl = preUrl + '/page-simple'
export function pageSimple(params, config) {
  return base.page(pageSimpleUrl, params, config)
}

export const pageWatchTaskSimple = pageSimple

// 没有分页
const listUrl = preUrl + '/list'
export function list(params) {
  return base.list(listUrl, params)
}
export const listWatchTask = list

const listSimpleUrl = preUrl + '/list-simple'
export function listSimple(params) {
  return base.list(listSimpleUrl, params)
}
export const listWatchTaskSimple = listSimple

// 预留统计接口
const staticUrl = preUrl + '/staticData'
export function staticData(params) {
  return base.staticData(staticUrl, params)
}
export const staticDataWatchTask = staticData

const infoUrl = preUrl + '/get'
export function info(id) {
  return base.info(infoUrl, id)
}
export const infoWatchTask = info

const addUrl = preUrl + '/create'
export function add(data) {
  return base.add(addUrl, data)
}
export const addWatchTask = add

const delUrl = preUrl + '/delete'
export function del(ids) {
  return base.del(delUrl, ids)
}
export const deleteWatchTask = del

const editUrl = preUrl + '/update'
export function edit(data) {
  // data.id
  return base.edit(editUrl, data)
}
export const editWatchTask = edit

const editStatusUrl = preUrl + '/update-status'
export function editStatus(data) {
  // data.id
  return base.edit(editStatusUrl, data)
}
export const editStatusWatchTask = editStatus

// 导出
// const downloadUrl = preUrl + '/export-excel'
const downloadUrl = preUrl + '/exportData'
export function download(data) {
  return base.download(downloadUrl, data)
}
export const downloadWatchTask = download

// 下载导入模板
const importTemplateUrl = preUrl + '/importTemplate'
export function importTemplate(params) {
  return base.importTemplate(importTemplateUrl, params)
}
export const importTemplateWatchTask = importTemplate

// 导入数据
const importDataUrl = preUrl + '/importData'
export function importData(data) {
  return base.importData(importDataUrl, data)
}
export const importDataWatchTask = importData

export default {
  page,
  list,
  pageSimple,
  listSimple,
  staticData,
  info,
  add,
  del,
  edit,
  editStatus,
  download,
  importData,
  importTemplate,
  url: {
    pageUrl,
    listUrl,
    staticUrl,
    infoUrl,
    addUrl,
    delUrl,
    editUrl,
    downloadUrl,
    importTemplateUrl,
    importDataUrl
  }
}
