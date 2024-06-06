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
        display: false,
        type: 'input',
        disabled: false
        // width: 140,
      },

      {
        label: '参数键名',
        prop: 'configKey',
        display: true,
        type: 'input',
        disabled: false
        // width: 140,
      },

      {
        label: '参数键值',
        prop: 'value',
        display: true,
        type: 'input',
        disabled: false
        // width: 140,
      },

      {
        label: '创建者',
        prop: 'creator',
        display: false,
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
        label: '更新者',
        prop: 'updater',
        display: false,
        type: 'input',
        disabled: false
        // width: 140,
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
        label: '是否删除',
        prop: 'deleted',
        display: false,
        type: 'radio',
        button: true,
        disabled: false,
        // width: 140,
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
export default aformOption
