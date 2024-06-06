import { reactive, computed, getCurrentInstance, nextTick, defineEmits, ref } from 'vue'
import { downloadArraybufferFile, downloadFile } from '@/utils/index'
import { checkPermi, checkPermission } from '@/utils/permission'
import { getAccessTokenBear } from '@/utils/auth'
import { applyDict } from '@/utils'
import { ElNotification, ElMessage, ElMessageBox, FormItemRule } from 'element-plus'

import dayjs from 'dayjs'
import { UploadFile } from 'element-plus/es/components/upload/src/upload'
import { Arrayable } from 'element-plus/es/utils'
import { useUserStoreWithOut } from '@/store/modules/user'
import { useDictStoreWithOut } from '@/store/modules/dict'
const userStore = useUserStoreWithOut()
const dictStore = useDictStoreWithOut()

export type CrudDataType = {
  permission: {
    listBtn: boolean
    delBtn: boolean
    addBtn: boolean
    editBtn: boolean
  }
  // 表格数据
  data: Array<any>
  // 排序规则，默认 id 降序， 支持多字段排序 ['id,desc', 'createTime,asc']
  sort: Array<string>
  page: {
    total: number
    pageSize: number
    currentPage: number
  }
  // 请求数据的url
  url: string
  // 查询数据的参数
  params: Object
  // 待查询的对象
  query: Object
  // 查询数据的中间对象存储
  searchData: Object
  // 等待时间
  time: number
  // 是否为新增类型的表单
  isAdd: boolean
  // 导出的 Loading
  downloadLoading: boolean
  // 表格 Loading 属性
  loading: boolean
  // 删除 Loading 属性
  delLoading: boolean
  delAllLoading: boolean
  // 弹窗属性
  dialog: boolean
  // Form 表单 新增编辑
  form: Object
  // 标题
  title: string
  isDialog: boolean
  // 多选内容
  selection: Array<any>
  importDataForm: {
    url: string
    visible: boolean
    model: Object
    fileList: Array<UploadFile>
    headers: Object
    rules: Partial<Record<string, Arrayable<FormItemRule>>>
    info: string
    infoType: 'success' | 'warning' | 'error' | 'info'
  }
  apiMethod: {
    page: Function
    edit: Function
    add: Function
    del: Function
    download: Function
    importTemplate: Function
    editStatus: Function
  }
  tableOption: Function
  tableOptionExtra: Object
  tableOptionDialog: Object
}

const useAvuejs = (opts?: any) => {
  const emit = defineEmits(['change', 'onSelect'])
  const {
    pageSize = 10,
    avueCrudComponent = ref(),
    dictFilter = (dict: any, dictType: string) => {
      return true
    },
    onCrudChangeTableOption = (config?: any) => {
      // 这里预留可以处理初始化option的更改
      return config
    },
    onCrudBeforeInit = () => {
      return true
    },
    onCrudInitAfterDataProcess = (data: any) => {
      return data
    },
    onCrudAddSuccessNotify = (row: any, res) => {
      ElNotification({
        title: res.msg ? res.msg : '新增成功',
        type: 'success',
        duration: 2500
      })
    },
    onCrudEditSuccessNotify = (row, res) => {
      ElNotification({
        title: res.msg ? res.msg : '编辑成功',
        type: 'success',
        duration: 2500
      })
    },
    onCrudDelSuccessNotify = (row, res) => {
      ElNotification({
        title: res.msg ? res.msg : '删除成功',
        type: 'success',
        duration: 2500
      })
    },
    /**
     * 新增后可以调用该方法
     */
    onCrudAfterAddMethod = (row, res) => {},
    /**
     * 新增失败后调用该方法
     */
    onCrudAfterAddErrorMethod = (row) => {},
    /**
     * 编辑后可以调用该方法
     */
    onCrudAfterEditMethod = (row, res) => {},
    onCrudAfterEditErrorMethod = (row) => {
      ElNotification({
        title: '编辑出错了，请稍候再试吧'
      })
    },
    /**
     * 提交前可以调用该方法
     */
    onCrudBeforeFormSaveEvent = async (row) => {
      return row
    },
    onCrudBeforeFormEditEvent = async (row: any, index: number) => {
      return row
    },
    /**
     * 删除前可以调用 onCrudBeforeDelMethod 做一些操作
     */
    onCrudBeforeDelMethod = (row) => {
      return row
    },
    onCrudAfterDelMethod = (row, res) => {},
    /**
     * 多选删除前
     */
    onCrudBeforeDelAllMethod = () => {
      return true
    }
  } = opts

  const crud = ref<CrudDataType>({
    permission: {
      listBtn: true,
      delBtn: true,
      addBtn: true,
      editBtn: true
    },
    // 表格数据
    data: [],
    // 排序规则，默认 id 降序， 支持多字段排序 ['id,desc', 'createTime,asc']
    sort: ['id,desc'],
    page: {
      // 总页数
      total: 1,
      // 当前页数
      currentPage: 1,
      // 每页显示多少条
      pageSize: pageSize
    },
    // 请求数据的url
    url: '',
    // 查询数据的参数
    params: {},
    // 待查询的对象
    query: {},
    // 查询数据的中间对象存储
    searchData: {},
    // 等待时间
    time: 50,
    // 是否为新增类型的表单
    isAdd: false,
    // 导出的 Loading
    downloadLoading: false,
    // 表格 Loading 属性
    loading: true,
    // 删除 Loading 属性
    delLoading: false,
    delAllLoading: false,
    // 弹窗属性
    dialog: false,
    // Form 表单 新增编辑
    form: {},
    // 标题
    title: '',
    isDialog: false,
    // 多选内容
    selection: [],
    importDataForm: {
      url: '',
      visible: false,
      model: {},
      fileList: [],
      headers: {
        Authorization: getAccessTokenBear()
      },
      rules: {},
      info: '',
      infoType: 'success'
    },
    apiMethod: {
      page: (params) => {},
      edit: (params) => {},
      add: (params) => {},
      del: (params) => {},
      download: (params) => {},
      importTemplate: (params) => {},
      editStatus: (params) => {}
    },
    tableOption: () => {},
    tableOptionExtra: {},
    tableOptionDialog: {
      menu: false,
      columnBtn: false,
      refreshBtn: false,
      searchBtn: true,
      searchMenuSpan: 8,
      stripe: false,
      highlightCurrentRow: true,
      selection: false,
      permission: {
        listBtn: false,
        delBtn: false,
        addBtn: false,
        editBtn: false
      }
    }
  })

  const crudTableOption = computed(() => {
    // 字典处理相关
    const instance = getCurrentInstance()
    let res = applyDict(
      crud.value.tableOption(instance, userStore.isTenant, false, crud),
      dictStore.getDictMap,
      dictFilter
    )
    res = Object.assign({}, res, crud.value.tableOptionExtra)
    // if (this.isDialog) {
    //   Object.assign(res, crud.value.tableOptionDialog)
    // }
    if (onCrudChangeTableOption) {
      res = onCrudChangeTableOption(res)
    }
    return res
  })

  function onCrudInit() {
    if (onCrudBeforeInit && !onCrudBeforeInit()) {
      return
    }
    // crud.value.loading = true
    // 请求数据
    crud.value.apiMethod
      .page(getCrudQueryParam())
      .then((data) => {
        crud.value.page.total = data.data.total
        crud.value.data = onCrudInitAfterDataProcess(data.data.list)
        // time 毫秒后显示表格
        crud.value.loading = false
      })
      .catch((err) => {
        console.error('onCrudInit', err)
        crud.value.loading = false
      })
  }

  function getCrudQueryParam() {
    return {
      pageNo: crud.value.page.currentPage,
      pageSize: crud.value.page.pageSize,
      sort: crud.value.sort || null,
      ...crud.value.query,
      ...crud.value.params
    }
  }

  return {
    crud,
    crudTableOption,
    downloadFile,
    downloadArraybufferFile,
    checkPermi,
    checkPermission,
    getCrudQueryParam,
    onCrudInit,
    onCrudSortChange: function (sorts) {
      console.log('onCrudSortChange', sorts)
    },
    // 多选变化
    onCrudSelectionChange(val) {
      crud.value.selection = val
    },
    // 清空自定义数据
    onCrudSearchReset() {},
    // 查询点击的时候
    onCrudSearchChange(params, done) {
      done()
      crud.value.page.currentPage = 1
      nextTick(function () {
        onCrudInit()
      })
    },
    /**
     * 刷新回调
     */
    onCrudRefreshChange() {
      crud.value.page.currentPage = 1
      onCrudInit()
    },
    /**
     * 通用的编辑方法
     */
    async onCrudFormUpdateEvent(row, index, done, loading) {
      const b = await onCrudBeforeFormEditEvent(row, index)
      if (!b) {
        loading()
        return
      }
      crud.value.apiMethod
        .edit(b)
        .then((data) => {
          onCrudEditSuccessNotify(row, data)
          onCrudAfterEditMethod(row, data)
          done()
          onCrudInit()
        })
        .catch(() => {
          loading()
          onCrudAfterEditErrorMethod(row)
        })
    },
    /**
     * 通用的新增方法
     */
    async onCrudFormSaveEvent(row, done, loading) {
      const b = await onCrudBeforeFormSaveEvent(row)
      if (!b) {
        return
      }
      crud.value.apiMethod
        .add(b)
        .then((data) => {
          onCrudAddSuccessNotify(row, data)
          onCrudAfterAddMethod(row, data)
          done()
          onCrudInit()
        })
        .catch(() => {
          onCrudAfterAddErrorMethod(row)
          loading()
        })
    },

    notify(title, type) {
      ElNotification({
        title: title,
        type: type,
        duration: 2500
      })
    },
    /**
     * 通用的删除
     */
    onCrudRowDel(row) {
      const b = onCrudBeforeDelMethod(row)
      if (!b) {
        return
      }
      ElMessageBox.confirm('你确定删除当前数据吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        crud.value.apiMethod
          .del([row[crudTableOption.value.rowKey]])
          .then((res) => {
            onCrudDelSuccessNotify(row, res)
            onCrudAfterDelMethod(row, res)
            onCrudInit()
          })
          .catch(() => {})
      })
    },
    /**
     * 多选删除
     */
    onCrudDelAllMethod() {
      const b = onCrudBeforeDelAllMethod()
      if (!b) {
        return
      }
      if (!crud.value.selection || !crud.value.selection.length) {
        ElNotification({
          title: '请先选择数据'
        })
        return
      }
      ElMessageBox.confirm('你确定删除选中的数据吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        crud.value.delAllLoading = true
        const data = crud.value.selection
        const ids = data.map((it) => it[crudTableOption.value.rowKey])
        crud.value.apiMethod
          .del(ids)
          .then(() => {
            crud.value.delAllLoading = false
            avueCrudComponent.value.toggleSelection(data)
            onCrudInit()
            onCrudDelSuccessNotify()
          })
          .catch(() => {
            crud.value.delAllLoading = false
          })
      })
    },

    /**
     * 通用导出
     */
    onCrudExport() {
      onCrudBeforeInit()
      crud.value.downloadLoading = true
      crud.value.apiMethod
        .download(crud.value.params)
        .then((res) => {
          crud.value.downloadLoading = false
          downloadArraybufferFile(
            res,
            crud.value.title + '导出数据-' + dayjs().format('YYYYMMDDHHmmss') + '.xlsx'
          )
        })
        .catch(() => {
          crud.value.downloadLoading = false
        })
    },
    // 导入
    onCrudImportShow(params) {
      crud.value.importDataForm.visible = true
    },
    onCrudImportDataExceed(files, fileList) {
      if (files.length > 2) {
        ElMessage.warning('当前限制选择 1 个文件')
        return
      }
      crud.value.importDataForm.fileList = []
    },
    onCrudImportDataError(err, files, fileList) {
      if (err) {
        crud.value.importDataForm.info = err
        crud.value.importDataForm.infoType = 'error'
      }
    },
    onCrudImportDataSuccess(response, files, fileList) {
      nextTick(function () {
        if (response && response.code != 0) {
          crud.value.importDataForm.infoType = 'error'
          crud.value.importDataForm.info = response.msg ? response.msg : '导入失败'
        } else {
          crud.value.importDataForm.infoType = 'success'
          crud.value.importDataForm.info = response.msg ? response.msg : '导入成功'
        }
      })
    },
    onCrudImportTemplate() {
      crud.value.apiMethod
        .importTemplate(crud.value.params)
        .then((res) => {
          downloadArraybufferFile(res, crud.value.title + '导出数据模板.xlsx')
        })
        .catch(() => {})
    },
    // 行点选
    onCrudRowClick(val) {
      if (crud.value.isDialog) {
        emit('change', val)
        emit('onSelect', val)
      }
      // avueCrudComponent.value.toggleSelection([val])
    },

    onCrudImportDialogCLose() {
      crud.value.importDataForm.visible = false
      crud.value.importDataForm.info = ''
      crud.value.importDataForm.fileList = []
      onCrudInit()
    },

    toUpdateStatus(item, fieldName, field, status, label) {
      ElMessageBox.confirm(
        '确定修改当前${table.classComment}-' + fieldName + '：' + label,
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(() => {
        crud.value.apiMethod
          .editStatus({ id: item.id, [field]: status })
          .then((res) => {
            if (res && res.code == 0) {
              ElMessage.success(res.msg || '成功')
              onCrudInit()
            } else {
              ElMessage.error(res.msg || '失败，请稍后再试')
            }
          })
          .catch((e) => {
            ElMessage.error(e.msg || '失败，请稍后再试')
          })
      })
    },
    copy(data) {
      const url = data
      const oInput = document.createElement('textarea')
      oInput.value = url
      document.body.appendChild(oInput)
      oInput.select() // 选择对象;
      document.execCommand('Copy') // 执行浏览器复制命令
      ElMessage({
        message: '复制成功',
        type: 'success'
      })
      oInput.remove()
    },
    handleCrudPageChange(page) {
      crud.value.page.currentPage = page
      onCrudInit()
    },
    handleCrudSizeChange(size) {
      crud.value.page.pageSize = size
      onCrudInit()
    }
  }
}

export default useAvuejs
