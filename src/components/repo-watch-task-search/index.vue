<template>
  <el-select
    v-model="value"
    filterable
    remote
    reserve-keyword
    clearable
    :disabled="disabledVal"
    :placeholder="placeholder"
    :remote-method="onRemoteQuery"
    :teleported="true"
    popper-class="dialog-form-select"
  >
    <el-option
      v-for="(item, index) in options"
      :key="index"
      :label="item.name"
      :value="item[idName]"
    />
  </el-select>
</template>
<script lang="ts" setup>
import { defineEmits, onMounted } from 'vue'
import api from '@/api/repo/repoWatchTask'

const options = ref([])

const emit = defineEmits(['update:modelValue', 'update:disabled', 'update:name'])
const props = defineProps({
  modelValue: {
    type: [String, Number, null],
    require: true,
    default: null
  },
  idName: {
    type: String,
    require: true,
    default: 'id'
  },
  placeholder: {
    type: String,
    require: false,
    default: '仓库监控任务名称'
  },
  disabled: {
    type: Boolean,
    require: false,
    default: false
  },
  searchStart: {
    type: Boolean,
    require: false,
    default: true
  },
  firstOption: {
    type: Boolean,
    require: false,
    default: false
  },
  condition: {
    type: [Object, null],
    require: false,
    default: () => {
      {
      }
    }
  }
})
const value = computed({
  get: () => props.modelValue,
  set: (val) => {
    emit('update:modelValue', val)
    if (val) {
      let tmpOptions = options.value.filter((it) => it[props.idName] == val)
      let option = tmpOptions && tmpOptions.length ? tmpOptions[0] : {}
      emit('update:name', option['name'])
    }
  }
})

const disabledVal = computed({
  get: () => props.disabled,
  set: (val) => {
    emit('update:disabled', val)
  }
})

watch(
  value,
  (val, valOld) => {
    if (props.searchStart) {
      onRemoteQuery(null, value.value)
    }
  },
  { once: true }
)

watch(
  () => props.condition,
  (val, valOld) => {
    if (props.searchStart) {
      onRemoteQuery(null, null)
    }
  },
  { deep: true }
)

const onRemoteQuery = (query, id) => {
  let params = query ? { query } : {}
  if (id) {
    params[props.idName] = id
  }
  if (props.condition) {
    params = { ...params, ...props.condition }
  }
  params.pageNo = 1
  params.pageSize = 20
  api
    .pageSimple(params)
    .then((res) => {
      options.value = res.data.list
      if (props.firstOption && !value.value && res.data.list && res.data.list.length) {
        value.value = res.data.list[0][props.idName]
      }
    })
    .then(() => {})
    .catch(() => {})
}

onMounted(() => {
  if (props.searchStart) {
    onRemoteQuery(null, value.value)
  }
})
</script>
<style lang="scss" scoped>
.el-cascader {
  width: 100% !important;
}

.el-select {
  width: 100% !important;
}

.el-input {
  width: 100% !important;
}

.el-input__inner {
  width: 100% !important;
}
.dialog-form-select {
  z-index: 8888 !important;
}
</style>

<style lang="scss">
.el-popper.el-select__popper.dialog-form-select {
  z-index: 8888 !important;
}
</style>
