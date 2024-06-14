/*
 *  Copyright 2019-2020 YunChaoq
 */
import Vue from 'vue'
import { getAccessTokenBear } from '@/utils/auth'
import { isPc } from '@/utils'

export const tableOption = (self, isTenant, isPartner, crud) => {
  const selection = isPc()
  return {
    border: true,
    index: false,
    rowKey: 'id',
    menuType: 'text',
    indexLabel: '序号',
    indexWidth: 60,
    stripe: true,
    menuAlign: 'center',
    align: 'center',
    menu: true, // 列表操作列
    columnBtn: false, // 列表字段展示隐藏按钮
    refreshBtn: true, // 刷新按钮
    viewBtn: false, // 查看按钮
    addBtn: false, // 新增按钮
    editBtn: false, // 编辑按钮
    delBtn: true, // 删除按钮
    selectClearBtn: true, // 搜索清空按钮
    selection: true, // 是否显示行选择列
    reserveSelection: true, //
    dialogEscape: false,
    dialogClickModal: false,
    searchShow: true,
    cellBtn: false,
    height: 'auto',
    calcHeight: 120,
    searchMenuSpan: 8,
    searchLabelWidth: 150,
    menuWidth: 90,
    dialogWidth: selection ? '60%' : '100%',
    dictDatas: {},
    column: [
      {
        label: 'ID',
        prop: 'id',
        hide: true,
        type: 'input',
        search: false,
        overHidden: true,
        editDisabled: false,
        addDisplay: false,
        editDisplay: false,
        viewDisplay: true,
        width: 140
      },

      {
        label: '搜索',
        prop: 'query',
        hide: true,
        type: 'input',
        search: true,
        formslot: true,
        searchPlaceHolder: '仓库名称，描述',
        overHidden: true,
        editDisabled: false,
        addDisplay: false,
        editDisplay: false,
        viewDisplay: false,
        width: 120,
        searchSpan: 12,
        dictParams: {},
        dicData: []
      },

      {
        label: '任务',
        prop: 'taskId',
        hide: false,
        type: 'select',
        search: true,
        formslot: true,
        overHidden: true,
        editDisabled: false,
        addDisplay: true,
        editDisplay: true,
        viewDisplay: true,
        width: 120,
        dictParams: {},
        dicData: []
      },

      {
        label: '仓库ID',
        prop: 'repoId',
        hide: true,
        type: 'input',
        search: false,
        overHidden: true,
        editDisabled: false,
        addDisplay: true,
        editDisplay: true,
        viewDisplay: true,
        width: 100
      },

      {
        label: '仓库URL',
        prop: 'repoUrl',
        hide: false,
        type: 'input',
        search: false,
        overHidden: true,
        editDisabled: false,
        addDisplay: true,
        editDisplay: true,
        viewDisplay: true,
        width: 380
      },

      {
        label: '仓库SshUrl',
        prop: 'repoSshUrl',
        hide: true,
        type: 'input',
        search: false,
        overHidden: true,
        editDisabled: false,
        addDisplay: false,
        editDisplay: false,
        viewDisplay: false,
        width: 140
      },

      {
        label: '开发语言',
        prop: 'repoLang',
        hide: false,
        type: 'input',
        search: true,
        overHidden: true,
        editDisabled: false,
        addDisplay: false,
        editDisplay: false,
        viewDisplay: false,
        width: 100
      },

      {
        label: '开发语言是否空白',
        prop: 'repoLangEmpty',
        hide: true,
        type: 'select',
        search: true,
        overHidden: false,
        editDisabled: false,
        addDisplay: true,
        editDisplay: true,
        viewDisplay: true,
        width: 140,
        value: 0,
        dictParams: {
          dictName: 'infra_boolean_string',
          dictType: 'infra_boolean_string'
        },
        dicData: [
          {
            value: true,
            label: '是'
          },
          {
            value: false,
            label: '否'
          }
        ]
      },

      {
        label: '仓库名称',
        prop: 'repoName',
        hide: true,
        type: 'input',
        search: false,
        overHidden: true,
        editDisabled: false,
        addDisplay: true,
        editDisplay: true,
        viewDisplay: true
        // width: 140
      },

      {
        label: '仓库描述',
        prop: 'repoDesc',
        hide: false,
        type: 'input',
        search: false,
        overHidden: false,
        editDisabled: false,
        addDisplay: true,
        editDisplay: true,
        viewDisplay: true
        // width: 120
      },

      {
        label: '仓库描述是否空白',
        prop: 'repoDescEmpty',
        hide: true,
        type: 'select',
        search: true,
        overHidden: false,
        editDisabled: false,
        addDisplay: true,
        editDisplay: true,
        viewDisplay: true,
        width: 140,
        value: 0,
        dictParams: {
          dictName: 'infra_boolean_string',
          dictType: 'infra_boolean_string'
        },
        dicData: [
          {
            value: true,
            label: '是'
          },
          {
            value: false,
            label: '否'
          }
        ]
      },

      {
        label: '仓库本地克隆',
        prop: 'repoLocalClone',
        hide: true,
        type: 'input',
        search: false,
        overHidden: false,
        editDisabled: false,
        addDisplay: false,
        editDisplay: false,
        viewDisplay: false,
        width: 160
      },

      {
        label: '创建时间',
        prop: 'createTime',
        hide: false,
        type: 'datetime',
        valueFormat: 'YYYY-MM-DD HH:mm:ss',
        format: 'YYYY-MM-DD HH:mm',
        search: true,
        searchslot: false,
        // searchRange: true,
        overHidden: true,
        editDisabled: false,
        addDisplay: false,
        editDisplay: false,
        viewDisplay: true,
        searchSpan: 12,
        width: 170
      },

      {
        label: '更新时间',
        prop: 'updateTime',
        hide: false,
        type: 'datetime',
        valueFormat: 'YYYY-MM-DD HH:mm:ss',
        format: 'YYYY-MM-DD HH:mm',
        search: true,
        searchslot: false,
        searchRange: false,
        overHidden: true,
        editDisabled: false,
        addDisplay: false,
        editDisplay: false,
        viewDisplay: true,
        searchSpan: 12,
        width: 170
      },

      {
        label: '创建者',
        prop: 'creator',
        hide: true,
        type: 'input',
        search: false,
        overHidden: true,
        editDisabled: false,
        addDisplay: false,
        editDisplay: false,
        viewDisplay: false,
        width: 140
      },

      {
        label: '更新者',
        prop: 'updater',
        hide: true,
        type: 'input',
        search: false,
        overHidden: true,
        editDisabled: false,
        addDisplay: false,
        editDisplay: false,
        viewDisplay: false,
        width: 140
      }
    ]
  }
}
export default tableOption
