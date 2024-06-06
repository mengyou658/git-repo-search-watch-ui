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
    index: selection,
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
    addBtn: true, // 新增按钮
    editBtn: true, // 编辑按钮
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
    searchLabelWidth: 120,
    dialogWidth: selection ? '60%' : '100%',
    dictDatas: {
      deleted: {
        dictParams: {
          dictName: 'infra_boolean_string',
          dictType: 'infra_boolean_string'
        },
        dicData: {
          '0': '是',
          '1': '否'
        }
      }
    },
    column: [
      {
        label: '参数主键',
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
        label: '参数键名',
        prop: 'configKey',
        hide: false,
        type: 'input',
        search: true,
        overHidden: true,
        editDisabled: false,
        addDisplay: true,
        editDisplay: true,
        viewDisplay: true,
        width: 140
      },

      {
        label: '参数键值',
        prop: 'value',
        hide: false,
        type: 'input',
        search: true,
        overHidden: true,
        editDisabled: false,
        addDisplay: true,
        editDisplay: true,
        viewDisplay: true,
        width: 140
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
        label: '创建时间',
        prop: 'createTime',
        hide: false,
        type: 'datetime',
        valueFormat: 'YYYY-MM-DD HH:mm:ss',
        format: 'YYYY-MM-DD HH:mm',
        search: false,
        searchRange: true,
        overHidden: true,
        editDisabled: false,
        addDisplay: false,
        editDisplay: false,
        viewDisplay: true,
        searchSpan: 12,
        width: 170
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
      },

      {
        label: '更新时间',
        prop: 'updateTime',
        hide: false,
        type: 'datetime',
        valueFormat: 'YYYY-MM-DD HH:mm:ss',
        format: 'YYYY-MM-DD HH:mm',
        search: false,
        searchRange: true,
        overHidden: true,
        editDisabled: false,
        addDisplay: false,
        editDisplay: false,
        viewDisplay: true,
        searchSpan: 12,
        width: 170
      },

      {
        label: '是否删除',
        prop: 'deleted',
        hide: true,
        type: 'select',
        search: false,
        overHidden: true,
        editDisabled: false,
        addDisplay: false,
        editDisplay: false,
        viewDisplay: false,
        width: 140,
        value: 0,
        dictParams: {
          dictName: 'infra_boolean_string',
          dictType: 'infra_boolean_string'
        },
        dicData: [
          {
            value: 0,
            label: '是'
          },
          {
            value: 1,
            label: '否'
          }
        ]
      }
    ]
  }
}
export default tableOption
