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
        </template>
        <!-- 自定义行菜单按钮-->
        <template #menu="{ row, type, size }"> </template>
        <!--   需要设置 searchslot=true   搜索-->
        <template #taskId-search="{ disabled, size }">
          <repo-watch-task-search v-model="crud.params.taskId" placeholder="请选择名称" />
        </template>
        <template #createTime-search="{ disabled, size }">
          <el-date-picker
            v-model="crud.params.createTimeStart"
            :default-time="[new Date('1 00:00:00')]"
            class="!w-240px"
            placeholder="开始日期"
            type="date"
            value-format="YYYY-MM-DD HH:mm:ss"
          />
          -
          <el-date-picker
            v-model="crud.params.createTimeEnd"
            :default-time="[new Date('1 23:59:59')]"
            class="!w-240px"
            placeholder="结束日期"
            type="date"
            value-format="YYYY-MM-DD HH:mm:ss"
          />
        </template>
        <template #updateTime-search="{ disabled, size }">
          <el-date-picker
            v-model="crud.params.updateTimeStart"
            :default-time="[new Date('1 00:00:00')]"
            class="!w-240px"
            placeholder="开始日期"
            type="date"
            value-format="YYYY-MM-DD HH:mm:ss"
          />
          -
          <el-date-picker
            v-model="crud.params.updateTimeEnd"
            :default-time="[new Date('1 23:59:59')]"
            class="!w-240px"
            placeholder="结束日期"
            type="date"
            value-format="YYYY-MM-DD HH:mm:ss"
          />
        </template>
        <!--   不需要设置其他   表格展示-->
        <template #taskId="scope">
          {{ scope.row.task ? scope.row.task.name : '' }}
        </template>
        <template #repoUrl="scope">
          <el-link :href="scope.row.repoUrl" target="_blank" type="primary">{{
            scope.row.repoName
          }}</el-link>
          <p v-if="scope.row.repoLocalClone && scope.row.repoLocalClone.indexOf('http') === 0">
            <el-link :href="scope.row.repoLocalClone" target="_blank" type="primary"
              >打开阿里云仓库</el-link
            >
          </p>
          <p v-else>{{ scope.row.repoLocalClone || '暂无clone' }}</p>
        </template>
        <!-- 需要设置  formslot=true    表单-->
        <template #taskId-form="scope">
          <repo-watch-task-search
            v-model="crud.form.taskId"
            :disabled="scope.disabled"
            placeholder="请选择名称"
          />
        </template>
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
  </ContentWrap>
</template>
<script lang="ts">
export default {
  name: 'RepoWatchResult'
}
</script>
<script setup lang="ts">
import { defineEmits, toRaw } from 'vue'
import { tableOption } from '@/crud/repo/repoWatchResult'
import useAvuejs from '@/hooks/web/useAvuejs'
import { useUserStoreWithOut } from '@/store/modules/user'
const userStore = useUserStoreWithOut()

import { ElNotification, ElMessage, ElMessageBox, FormItemRule } from 'element-plus'
import api from '@/api/repo/repoWatchResult'
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
  pageSize: 100,
  avueCrudComponent,
  onCrudBeforeInit() {
    //  增加额外查询参数：crud.value.query
    //  修改默认查询条件参数：crud.value.params
    //  排序：crud.value.sort=['id,desc']
    let createTimeStart = crud.value.params.createTimeStart
    let createTimeEnd = crud.value.params.createTimeEnd
    if (createTimeStart && createTimeEnd) {
      crud.value.params.createTime = [createTimeStart, createTimeEnd]
    } else if (createTimeStart) {
      crud.value.params.createTime = [createTimeStart, null]
    } else if (createTimeEnd) {
      crud.value.params.createTime = [null, createTimeEnd]
    }
    let updateTimeStart = crud.value.params.updateTimeStart
    let updateTimeEnd = crud.value.params.updateTimeEnd
    if (updateTimeStart && updateTimeEnd) {
      crud.value.params.updateTime = [updateTimeStart, updateTimeEnd]
    } else if (updateTimeStart) {
      crud.value.params.updateTime = [updateTimeStart, null]
    } else if (updateTimeEnd) {
      crud.value.params.updateTime = [null, updateTimeEnd]
    }

    return true
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
  listBtn: checkPermission('repo:watch-result:query'),
  delBtn: checkPermission('repo:watch-result:delete'),
  addBtn: checkPermission('repo:watch-result:create'),
  editBtn: checkPermission('repo:watch-result:update')
}
crud.value.title = '仓库监控结果'
crud.value.apiMethod = api
crud.value.tableOption = tableOption

const handleOpen = (url) => {
  window.open(url, '_blank')
}
</script>
<style lang="scss">
.mod-repo-watchResult {
}
</style>
