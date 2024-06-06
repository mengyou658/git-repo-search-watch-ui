/*
 *  Copyright 2019-2020 YunChaoq
 */
import Vue from 'vue'
import { getAccessTokenBear } from '@/utils/auth'

export const aformOption = (self, detail) => {
  return {
    detail: detail,
    menuBtn: !detail,
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
        display: false,
        type: 'input',
        disabled: false
        // width: 140,
      },

      {
        label: '名称',
        prop: 'name',
        display: true,
        type: 'input',
        disabled: false
        // width: 140,
      },

      {
        label: '仓库类型',
        prop: 'repoType',
        display: true,
        type: 'radio',
        button: true,
        disabled: false,
        // width: 140,
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
        display: true,
        type: 'radio',
        button: true,
        disabled: false,
        // width: 140,
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
        display: true,
        type: 'radio',
        button: true,
        disabled: false,
        // width: 140,
        value: 0,

        dictParams: { dictName: 'repo_watch_task_type', dictType: 'repo_watch_task_type' },
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
        label: '状态',
        prop: 'status',
        display: true,
        type: 'radio',
        button: true,
        disabled: false,
        // width: 140,
        value: 0,

        dictParams: { dictName: 'repo_watch_task_status', dictType: 'repo_watch_task_status' },
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
        label: '运行状态',
        prop: 'workStatus',
        display: true,
        type: 'radio',
        button: true,
        disabled: false,
        // width: 140,
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
        display: true,
        type: 'input',
        disabled: false
        // width: 140,
      },

      {
        label: '开发语言',
        prop: 'keywordLang',
        display: true,
        type: 'select',
        disabled: false,
        // width: 140,
        value: 'Go',

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
            value: 'Javascript',
            label: 'Javascript'
          },
          {
            value: 'Vue',
            label: 'Vue'
          },
          {
            value: 'Uniapp',
            label: 'Uniapp'
          }
        ]
      },

      {
        label: '排除关键词',
        prop: 'keywordNegative',
        display: true,
        type: 'input',
        disabled: false
        // width: 140,
      },

      {
        label: '仓库搜索数据限制',
        prop: 'repoLimit',
        display: true,
        type: 'input',
        disabled: false
        // width: 140,
      },

      {
        label: '是否克隆仓库',
        prop: 'repoCloneFlag',
        display: true,
        type: 'radio',
        button: true,
        disabled: false,
        // width: 140,
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
        display: true,
        type: 'input',
        disabled: false
        // width: 140,
      },

      {
        label: '创建时间',
        prop: 'createTime',
        display: false,
        type: 'datetime',
        //valueFormat: 'YYYY-MM-DD HH:mm:ss',
        format: 'YYYY-MM-DD HH:mm:ss',
        disabled: false,
        width: 170
      },

      {
        label: '更新时间',
        prop: 'updateTime',
        display: false,
        type: 'datetime',
        //valueFormat: 'YYYY-MM-DD HH:mm:ss',
        format: 'YYYY-MM-DD HH:mm:ss',
        disabled: false,
        width: 170
      },

      {
        label: '删除时间',
        prop: 'deletedAt',
        display: false,
        type: 'input',
        disabled: false
        // width: 140,
      }
    ]
  }
}
export default aformOption
