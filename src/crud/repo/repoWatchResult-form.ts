/*
 *  Copyright 2019-2020 YunChaoq
 */
import Vue from 'vue'
import { getAccessTokenBear } from '@/utils/auth'

export const aformOption = (self, detail) => {
  return {
    detail: detail,
    menuBtn: !detail,
    dictDatas: {},
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
        label: '任务ID',
        prop: 'taskId',
        display: true,
        type: 'select',
        disabled: false,
        // width: 140,

        dictParams: {},
        dicData: []
      },

      {
        label: '仓库ID',
        prop: 'repoId',
        display: true,
        type: 'input',
        disabled: false
        // width: 140,
      },

      {
        label: '仓库URL',
        prop: 'repoUrl',
        display: true,
        type: 'input',
        disabled: false
        // width: 140,
      },

      {
        label: '仓库SSHURL',
        prop: 'repoSshUrl',
        display: true,
        type: 'input',
        disabled: false
        // width: 140,
      },

      {
        label: '仓库开发语言',
        prop: 'repoLang',
        display: true,
        type: 'input',
        disabled: false
        // width: 140,
      },

      {
        label: '仓库名称',
        prop: 'repoName',
        display: true,
        type: 'input',
        disabled: false
        // width: 140,
      },

      {
        label: '仓库描述',
        prop: 'repoDesc',
        display: true,
        type: 'input',
        disabled: false
        // width: 140,
      },

      {
        label: '仓库本地克隆',
        prop: 'repoLocalClone',
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
