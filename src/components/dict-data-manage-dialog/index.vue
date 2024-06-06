<template>
  <el-dialog
    :close-on-click-modal="false"
    :width="'50%'"
    top="50px"
    @closed="value = false"
    v-model="value"
    :title="'字典管理:' + dictType"
    :append-to-body="true"
    draggable
  >
    <system-dict-data :dict-type="dictType" :simple-value="simpleValue" :condition="condition" />
    <template #footer>
      <div class="dialog-footer">
        <el-button type="" @click="value = false">关闭</el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import { defineEmits, onMounted } from 'vue'
import SystemDictData from '@/views/system/dict/data/index.vue'

const options = ref([])

const emit = defineEmits(['update:modelValue', 'update:disabled', 'update:name'])
const props = defineProps({
  modelValue: {
    type: Boolean,
    require: true,
    default: false
  },
  simpleValue: {
    type: String,
    require: false,
    default: 'false'
  },
  dictType: {
    type: String,
    require: true,
    default: ''
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
  }
})

watch(
  value,
  (val, valOld) => {
    onRemoteQuery(null)
  },
  { once: true }
)

watch(
  () => props.condition,
  (val, valOld) => {
    onRemoteQuery(null)
  },
  { deep: true }
)

const onRemoteQuery = (query) => {}

onMounted(() => {
  onRemoteQuery(null)
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
