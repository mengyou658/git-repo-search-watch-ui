/* * Copyright 2019-2020 YunChaoq */
<template>
  <ContentWrap>
    <component
      class="app-container"
      :is="isDialog ? 'el-dialog' : 'div'"
      v-model="dialogShow"
      :title="crud.title"
      width="1200px"
    >
      <avue-crud
        ref="avueCrudComponent"
        v-model:page="crud.page"
        :data="crud.data"
        :table-loading="crud.loading"
        :option="crudTableOption"
        :permission="crud.permission"
        v-model:search="crud.params"
        :before-open="onCrudBeforeOpen"
        v-model="crud.form"
        @selection-change="onCrudSelectionChange"
        @sort-change="onCrudSortChange"
        @search-change="onCrudSearchChange"
        @refresh-change="onCrudRefreshChange"
        @search-reset="onCrudSearchReset"
        @row-del="onCrudRowDel"
        @row-click="onCrudRowClick"
        @on-load="onCrudInit"
        @row-save="onCrudFormSaveEvent"
        @row-update="onCrudFormUpdateEvent"
      >
        <template #search-menu="{ row, size }"> </template>
        <template #search="{ size }"> </template>

        <template #menu-left>
          <el-button
            v-if="crud.selection && crud.selection.length && crud.permission.delBtn"
            type="danger"
            icon="el-icon-plus"
            size="small"
            @click.stop="onCrudDelAllMethod"
            >删除
          </el-button>
        </template>
        <template #menu-right>
          <!--<el-button v-if="crud.permission.addBtn"
                   type="warning"
                   icon="el-icon-plus"
                   size="small"
                   @click.stop="onCrudImportShow">导入
        </el-button>
        <el-button v-if="crud.permission.listBtn"
                   type="warning"
                   icon="el-icon-minus"
                   size="small"
                   @click.stop="onCrudExport">导出
        </el-button>-->

          <el-button
            type="warning"
            icon="el-icon-minus"
            size="small"
            v-hasPermi="['system:dict:query']"
            @click.stop="handleDictDataManage('repo_watch_task_keywords')"
            >关键词管理
          </el-button>
          <el-button
            type="warning"
            icon="el-icon-minus"
            size="small"
            v-hasPermi="['system:dict:query']"
            @click.stop="handleDictDataManage('repo_watch_task_keyword_lang')"
            >开发语言管理
          </el-button>
          <el-button
            type="warning"
            icon="el-icon-minus"
            size="small"
            v-hasPermi="['system:dict:query']"
            @click.stop="handleDictDataManage('repo_watch_task_keyword_negative')"
            >排除关键词管理
          </el-button>
        </template>
        <!-- 自定义行菜单按钮-->
        <template #menu="{ row, type, size }">
          <!--          <el-button
            icon="el-icon-check"
            :size="size"
            :type="type"
            plain
            text
            v-if="row.type != 0"
            @click.stop="toUpdateStatus(row, '类型', 'type', 0, '搜索')"
            >类型-搜索
          </el-button>
          <el-button
            icon="el-icon-check"
            :size="size"
            :type="type"
            plain
            text
            v-if="row.type != 1"
            @click.stop="toUpdateStatus(row, '类型', 'type', 1, '趋势')"
            >类型-趋势
          </el-button>
          <el-button
            icon="el-icon-check"
            :size="size"
            :type="type"
            plain
            text
            v-if="row.status != 0"
            @click.stop="toUpdateStatus(row, '状态', 'status', 0, '启用')"
            >状态-启用
          </el-button>
          <el-button
            icon="el-icon-check"
            :size="size"
            :type="type"
            plain
            text
            v-if="row.status != 1"
            @click.stop="toUpdateStatus(row, '状态', 'status', 1, '禁用')"
            >状态-禁用
          </el-button>
          <el-button
            icon="el-icon-check"
            :size="size"
            :type="type"
            plain
            text
            v-if="row.workStatus != 0"
            @click.stop="toUpdateStatus(row, '运行状态', 'workStatus', 0, '空闲中')"
            >运行状态-空闲中
          </el-button>
          <el-button
            icon="el-icon-check"
            :size="size"
            :type="type"
            plain
            text
            v-if="row.workStatus != 1"
            @click.stop="toUpdateStatus(row, '运行状态', 'workStatus', 1, '运行中')"
            >运行状态-运行中
          </el-button>-->
        </template>
        <!--   需要设置 searchslot=true   搜索-->
        <!--   不需要设置其他   表格展示-->
        <!-- 需要设置  formslot=true    表单-->
        <!-- 需要设置  formslot:true    表单标题-->
        <!--<template #name-label="scope">
        <span>姓名&nbsp;&nbsp;</span>
        <el-tooltip class="item" effect="dark" content="文字提示" placement="top-start">
          <i class="el-icon-warning"></i>
        </el-tooltip>
      </template>-->
      </avue-crud>
      <el-dialog
        title="导入"
        v-if="crud.importDataForm.visible"
        :width="'30%'"
        :close-on-click-modal="false"
        @close="onCrudImportDialogCLose"
        :visible="true"
      >
        <el-form
          ref="bindUserDataForm"
          :model="crud.importDataForm.model"
          :rules="crud.importDataForm.rules"
          label-width="120px"
        >
          <el-col :md="24" :xs="24">
            <el-form-item label="导入excel文件">
              <el-upload
                class="upload-demo"
                :action="crud.importDataForm.url"
                multiple
                :limit="1"
                :headers="crud.importDataForm.headers"
                :with-credentials="true"
                accept="xls,xlsx"
                :on-exceed="onCrudImportDataExceed"
                :on-error="onCrudImportDataError"
                :on-success="onCrudImportDataSuccess"
                :file-list="crud.importDataForm.fileList"
              >
                <el-button size="small" type="primary">点击上传</el-button>
                <template #tip>
                  <div class="el-upload__tip"
                    ><el-button plain type="text" @click="onCrudImportTemplate">下载模板</el-button
                    >只能上传xls和xlsx文件，且不超过10m</div
                  >
                  <div v-if="crud.importDataForm.info" class="el-upload__tip">
                    <el-alert
                      :title="crud.importDataForm.info"
                      :type="crud.importDataForm.infoType || 'success'"
                    />
                  </div>
                </template>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-form>
        <template #footer>
          <div class="dialog-footer">
            <el-button @click="onCrudImportDialogCLose">关闭</el-button>
          </div>
        </template>
      </el-dialog>
    </component>

    <dict-data-manage-dialog
      v-if="dictDataManageData.visible"
      v-model="dictDataManageData.visible"
      :dict-type="dictDataManageData.dictType"
      :condition="dictDataManageData.condition"
      simple-value="true"
    />
  </ContentWrap>
</template>
<script lang="ts">
export default {
  name: 'RepoWatchTask'
}
</script>
<script setup lang="ts">
import { defineEmits, toRaw } from 'vue'
import { tableOption } from '@/crud/repo/repoWatchTask'
import useAvuejs from '@/hooks/web/useAvuejs'
import { useUserStoreWithOut } from '@/store/modules/user'
const userStore = useUserStoreWithOut()
const router = useRouter()
import { useDictStoreWithOut } from '@/store/modules/dict'
const dictStore = useDictStoreWithOut()

import { ElNotification, ElMessage, ElMessageBox, FormItemRule } from 'element-plus'
import api from '@/api/repo/repoWatchTask'
const emit = defineEmits(['update:isDialog'])
const props = defineProps({
  isDialog: {
    type: Boolean,
    require: false,
    default: false
  }
})
const dialogShow = computed({
  get: () => props.isDialog,
  set: (val) => {
    emit('update:isDialog', val)
  }
})

const isTenant = computed(() => {
  return userStore.isTenant
})

const isPartner = computed(() => {
  return userStore.isPartner
})

const avueCrudComponent = ref()
const options = {
  pageSize: 20,
  avueCrudComponent,
  dictFilter: (dict, dictType: string) => {
    if (
      dictType === 'repo_watch_task_keyword_negative' ||
      dictType === 'repo_watch_task_keyword_lang' ||
      dictType === 'repo_watch_task_keywords'
    ) {
      return dict.creator == userStore.getUser.id
    } else {
      return true
    }
  },
  onCrudBeforeInit() {
    //  增加额外查询参数：crud.value.query
    //  修改默认查询条件参数：crud.value.params
    //  排序：crud.value.sort=['id,desc']
    return true
  },
  onCrudAfterAddMethod: (row, res) => {
    dictStore.resetDict().then((res) => {
      avueCrudComponent.value.refreshTable()
    })
  },
  onCrudAfterEditMethod: (row, res) => {
    dictStore.resetDict().then((res) => {
      avueCrudComponent.value.refreshTable()
    })
  }
}

const {
  crud,
  crudTableOption,
  downloadFile,
  downloadArraybufferFile,
  checkPermi,
  checkPermission,
  toUpdateStatus,
  getCrudQueryParam,
  onCrudInit,
  onCrudSortChange,
  onCrudSelectionChange,
  onCrudSearchReset,
  onCrudSearchChange,
  onCrudRefreshChange,
  onCrudFormUpdateEvent,
  onCrudFormSaveEvent,
  onCrudRowDel,
  onCrudDelAllMethod,
  onCrudExport,
  onCrudImportShow,
  onCrudImportDataExceed,
  onCrudImportDataError,
  onCrudImportDataSuccess,
  onCrudImportTemplate,
  onCrudRowClick,
  onCrudImportDialogCLose,
  handleCrudPageChange,
  handleCrudSizeChange,
  copy
} = useAvuejs(options)

//  新增编辑打开前
const onCrudBeforeOpen = (done, type) => {
  if (['view', 'edit'].includes(type)) {
    //  查看和编辑逻辑
  } else {
    // 新增逻辑
    // 一定要用setTimeout包裹，由于form组件底层一些机制的设计
    setTimeout(() => {
      //  初始化赋值
    }, 0)
  }
  done()
}

crud.value.permission = {
  listBtn: checkPermission('repo:watch-task:query'),
  delBtn: checkPermission('repo:watch-task:delete'),
  addBtn: checkPermission('repo:watch-task:create'),
  editBtn: checkPermission('repo:watch-task:update')
}
crud.value.title = '仓库监控任务'
crud.value.apiMethod = api
crud.value.tableOption = tableOption

const handleJumpTo = (path) => {
  router.push({
    path,
    query: {
      simple: 'true'
    }
  })
}

const dictDataManageData = ref({
  visible: false,
  dictType: '',
  condition: {
    creator: userStore.getUser.id
  }
})

const handleDictDataManage = (dictType: string) => {
  dictDataManageData.value.dictType = dictType
  dictDataManageData.value.visible = true
}
</script>
<style lang="scss">
.mod-repo-watchTask {
}
</style>
