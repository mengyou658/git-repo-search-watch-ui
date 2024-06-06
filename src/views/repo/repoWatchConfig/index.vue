<template>
  <ContentWrap>
    <avue-form ref="form" v-model="dataForm" @submit="dataFormSubmit" :option="tableOption" />
  </ContentWrap>
</template>

<script lang="ts">
export default {
  name: 'RepoConfig'
}
</script>
<script setup lang="ts">
import { getRepoWatchConfigKey, saveRepoWatchConfig } from '@/api/repo/repoWatchConfig'

const paramKey = 'repo.config'
import Logger from '@/utils/Logger'
import { ElMessage } from 'element-plus'

const dataForm = ref({
  // chromeExePath: '',
  // userAgent: '',
  // localClonePath: '',
  // aliyunCloneAk: '',
  // aliyunCloneSk: '',
  // aliyunCloneOrganizationId: '',
  // repoConfigs: [
  //   {
  //     repoType: 0,
  //     userName: '',
  //     password: ''
  //   }
  // ]
})

const getConfig = () => {
  getRepoWatchConfigKey(paramKey).then((res) => {
    if (res) {
      dataForm.value = JSON.parse(res)
    }
  })
}

const dataFormSubmitBefore = (data) => {
  return { key: paramKey, name: '仓库配置', value: JSON.stringify(data) }
}
const fieldOptionModelVisible = ref(false)

// 表单提交
const dataFormSubmit = (form, done) => {
  const data = dataFormSubmitBefore(form)
  if (!data) {
    return
  }
  saveRepoWatchConfig({ ...data })
    .then((res) => {
      done()
      ElMessage.success(res.msg || '更新成功')
    })
    .catch((err) => {
      done()
      Logger.error(err)
      console.error(err)
    })
}

const title = '仓库配置'
const tableOption = ref({
  submitBtn: true,
  emptyBtn: false,
  labelWidth: 180,
  group: [
    {
      label: '爬虫配置',
      prop: 'spiderConfig',
      column: [
        {
          label: 'Chrome路径',
          prop: 'chromeExePath',
          tip: 'chrome.exe路径',
          span: 24
        },
        {
          label: '爬虫UserAgent配置',
          prop: 'userAgent',
          span: 24
        }
      ]
    },
    {
      label: '本地克隆配置',
      prop: 'cloneConfig',
      column: [
        {
          label: '本地克隆路径',
          prop: 'localClonePath',
          span: 24
        },
        {
          label: '阿里云AK',
          prop: 'aliyunCloneAk'
        },
        {
          label: '阿里云SK',
          prop: 'aliyunCloneSk'
        },
        {
          label: '阿里云企业标识',
          prop: 'aliyunCloneOrganizationId'
        },
        {
          label: '阿里云代码组ID',
          prop: 'aliyunCloneNamespaceId',
          type: 'number',
          control: false
        }
      ]
    },
    {
      label: '仓库配置',
      prop: 'repoConfig',
      column: [
        {
          label: '仓库配置',
          prop: 'repoConfigs',
          type: 'dynamic',
          span: 24,
          children: {
            align: 'center',
            headerAlign: 'center',
            rowAdd: (done) => {
              done({})
            },
            rowDel: (row, done) => {
              done()
            },
            column: [
              {
                label: '仓库类型',
                prop: 'repoType',
                type: 'select',
                value: 0,
                dicData: [
                  {
                    label: 'GitHub',
                    value: 0
                  },
                  {
                    label: 'GitLab',
                    value: 1
                  }
                ]
              },
              {
                label: '用户名',
                prop: 'userName'
              },
              {
                label: 'GitHub密码',
                prop: 'password'
              }
            ]
          }
        }
      ]
    }
  ]
})

onMounted(() => {
  getConfig()
})
</script>
