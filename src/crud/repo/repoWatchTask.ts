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
    labelWidth: 120,
    menuWidth: 90,
    dialogWidth: selection ? '60%' : '100%',
    dictDatas: {
      repoType: {
        dictParams: {
          dictName: 'repo_watch_task_repo_type',
          dictType: 'repo_watch_task_repo_type'
        },
        dicData: {
          '0': 'GitHub',
          '1': 'Gitee'
        }
      },
      cloneType: {
        dictParams: {
          dictName: 'repo_watch_task_clone_type',
          dictType: 'repo_watch_task_clone_type'
        },
        dicData: {
          '0': '本地',
          '1': '阿里云Codeup'
        }
      },
      type: {
        dictParams: {
          dictName: 'repo_watch_task_type',
          dictType: 'repo_watch_task_type'
        },
        dicData: {
          '0': '搜索',
          '1': '趋势'
        }
      },
      status: {
        dictParams: {
          dictName: 'repo_watch_task_status',
          dictType: 'repo_watch_task_status'
        },
        dicData: {
          '0': '启用',
          '1': '禁用'
        }
      },
      workStatus: {
        dictParams: {
          dictName: 'repo_watch_task_work_status',
          dictType: 'repo_watch_task_work_status'
        },
        dicData: {
          '0': '空闲中',
          '1': '运行中'
        }
      },
      keywordLang: {
        dictParams: {
          dictName: 'repo_watch_task_keyword_lang',
          dictType: 'repo_watch_task_keyword_lang'
        },
        dicData: {
          Go: 'Go',
          Rust: 'Rust',
          Javascript: 'Javascript',
          Vue: 'Vue',
          Uniapp: 'Uniapp'
        }
      },
      repoCloneFlag: {
        dictParams: {
          dictName: 'infra_boolean_int',
          dictType: 'infra_boolean_int'
        },
        dicData: {
          '0': '是',
          '1': '否'
        }
      }
    },
    column: [
      {
        label: 'ID',
        prop: 'id',
        hide: true,
        type: 'input',
        search: false,
        overHidden: false,
        editDisabled: false,
        addDisplay: false,
        editDisplay: false,
        viewDisplay: true,
        width: 140
      },

      {
        label: '名称',
        prop: 'name',
        hide: false,
        type: 'input',
        search: true,
        overHidden: false,
        editDisabled: false,
        addDisplay: true,
        editDisplay: true,
        viewDisplay: true,
        width: 140
      },

      {
        label: '仓库类型',
        prop: 'repoType',
        hide: false,
        type: 'select',
        search: true,
        overHidden: true,
        editDisabled: false,
        addDisplay: true,
        editDisplay: true,
        viewDisplay: true,
        width: 140,
        value: 0,
        dictParams: {
          dictName: 'repo_watch_task_repo_type',
          dictType: 'repo_watch_task_repo_type'
        },
        dicData: [
          {
            value: 0,
            label: 'GitHub'
          },
          {
            value: 1,
            label: 'Gitee'
          }
        ]
      },

      {
        label: '克隆类型',
        prop: 'cloneType',
        hide: false,
        type: 'select',
        search: true,
        overHidden: true,
        editDisabled: false,
        addDisplay: true,
        editDisplay: true,
        viewDisplay: true,
        width: 140,
        value: 0,
        dictParams: {
          dictName: 'repo_watch_task_clone_type',
          dictType: 'repo_watch_task_clone_type'
        },
        dicData: [
          {
            value: 0,
            label: '本地'
          },
          {
            value: 1,
            label: '阿里云Codeup'
          }
        ]
      },

      {
        label: '类型',
        prop: 'type',
        hide: false,
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
          dictName: 'repo_watch_task_type',
          dictType: 'repo_watch_task_type'
        },
        dicData: [
          {
            value: 0,
            label: '搜索'
          },
          {
            value: 1,
            label: '趋势'
          }
        ]
      },
      {
        label: '运行状态',
        prop: 'workStatus',
        hide: false,
        type: 'select',
        search: false,
        overHidden: false,
        editDisabled: false,
        addDisplay: false,
        editDisplay: false,
        viewDisplay: false,
        width: 140,
        value: 0,
        dictParams: {
          dictName: 'repo_watch_task_work_status',
          dictType: 'repo_watch_task_work_status'
        },
        dicData: [
          {
            value: 0,
            label: '空闲中'
          },
          {
            value: 1,
            label: '运行中'
          }
        ]
      },

      {
        label: '关键词',
        prop: 'keywords',
        hide: false,
        type: 'select',
        multiple: true,
        dataType: 'string',
        allowCreate: true,
        clearable: false,
        filterable: true,
        search: true,
        searchType: 'input',
        overHidden: false,
        editDisabled: false,
        addDisplay: true,
        editDisplay: true,
        viewDisplay: false,
        // append: 'el-icon-plus',
        value: '',
        span: 24,
        width: 140,
        dictParams: {
          dictName: 'repo_watch_task_keywords',
          dictType: 'repo_watch_task_keywords'
        },
        dicData: [
          {
            value: 'uniapp',
            label: 'uniapp'
          },
          {
            value: 'miniapp',
            label: 'miniapp'
          },
          {
            value: '微信小程序',
            label: '微信小程序'
          },
          {
            value: '小程序',
            label: '小程序'
          },
          {
            value: 'iot',
            label: 'iot'
          },
          {
            value: '物联网',
            label: '物联网'
          }
        ]
      },

      {
        label: '开发语言',
        prop: 'keywordLang',
        hide: false,
        type: 'select',
        multiple: true,
        dataType: 'string',
        allowCreate: true,
        filterable: true,
        clearable: false,
        search: true,
        searchType: 'input',
        overHidden: false,
        editDisabled: false,
        addDisplay: true,
        editDisplay: true,
        viewDisplay: false,
        // append: 'el-icon-plus',
        value: '',
        span: 24,
        width: 140,
        dictParams: {
          dictName: 'repo_watch_task_keyword_lang',
          dictType: 'repo_watch_task_keyword_lang'
        },
        dicData: [
          {
            value: 'Go',
            label: 'Go'
          },
          {
            value: 'Rust',
            label: 'Rust'
          },
          {
            value: 'JavaScript',
            label: 'JavaScript'
          },
          {
            value: 'Vue',
            label: 'Vue'
          }
        ]
      },

      {
        label: '排除关键词',
        prop: 'keywordNegative',
        hide: false,
        type: 'select',
        multiple: true,
        dataType: 'string',
        allowCreate: true,
        filterable: true,
        clearable: false,
        search: true,
        searchType: 'input',
        overHidden: false,
        editDisabled: false,
        addDisplay: true,
        editDisplay: true,
        viewDisplay: false,
        // append: 'el-icon-plus',
        value: '',
        span: 24,
        width: 140,
        dictParams: {
          dictName: 'repo_watch_task_keyword_negative',
          dictType: 'repo_watch_task_keyword_negative'
        },
        dicData: [
          {
            value: '蓝鲸',
            label: '蓝鲸'
          }
        ]
      },

      {
        label: '搜索条数限制',
        prop: 'repoLimit',
        hide: false,
        type: 'number',
        search: false,
        overHidden: false,
        editDisabled: false,
        addDisplay: true,
        editDisplay: true,
        viewDisplay: true,
        value: 50,
        width: 140
      },

      {
        label: '状态',
        prop: 'status',
        hide: false,
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
          dictName: 'repo_watch_task_status',
          dictType: 'repo_watch_task_status'
        },
        dicData: [
          {
            value: 0,
            label: '启用'
          },
          {
            value: 1,
            label: '禁用'
          }
        ]
      },

      {
        label: '是否克隆仓库',
        prop: 'repoCloneFlag',
        hide: false,
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
          dictName: 'infra_boolean_int',
          dictType: 'infra_boolean_int'
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
      },

      {
        label: '仓库克隆路径',
        prop: 'repoClonePath',
        hide: false,
        type: 'input',
        search: false,
        overHidden: false,
        editDisabled: false,
        addDisplay: true,
        editDisplay: true,
        viewDisplay: true,
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
