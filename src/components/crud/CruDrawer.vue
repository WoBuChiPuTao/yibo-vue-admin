<template>
  <ElDrawer v-model="visible" :title="title" :size="drawerWidth" @open="drawerBeforeOpen">
    <template #header>
      <slot v-if="$slots.header"></slot>
      <div v-else>
        <ElButton
          v-if="eventType !== 'view'"
          :size="'default'"
          type="primary"
          :loading="buttonLoading"
          @click="onSubmit"
          >{{ t('common.button.saveText') }}</ElButton
        >
      </div>
    </template>
    <ElForm
      ref="formRef"
      :rules="formRules"
      :label-width="labelWidth"
      :model="propsValue"
      @validate="validateFunc"
      status-icon
    >
      <template v-for="(item, index) in forData" :key="index">
        <ElRow :gutter="12 / props.column">
          <template v-for="col in item" :key="col">
            <ElCol :span="24 / props.column">
              <ElFormItem
                :label="col.label"
                :label-width="col.labelWidth"
                :prop="col.prop"
                :rules="col.rules"
              >
                <ElDatePicker
                  v-if="!$slots[col.prop] && isDate(col.type)"
                  v-model="propsValue[col.prop]"
                  :type="col.type"
                  :disabled="isDisabled(col) || allDisabled"
                  :format="col.format"
                >
                </ElDatePicker>
                <ElInput
                  v-else-if="!$slots[col.prop] && isNum(col.type)"
                  v-model.number="propsValue[col.prop]"
                  :disabled="isDisabled(col) || allDisabled"
                >
                </ElInput>
                <ElInput
                  v-else-if="!$slots[col.prop] && isTextarea(col.type)"
                  :type="col.type"
                  v-model="propsValue[col.prop]"
                  :disabled="isDisabled(col) || allDisabled"
                >
                </ElInput>
                <ElInput
                  v-else-if="!$slots[col.prop]"
                  v-model="propsValue[col.prop]"
                  :disabled="isDisabled(col) || allDisabled"
                >
                </ElInput>
                <slot v-else :name="col.prop" :col="col" :value="propsValue"></slot>
              </ElFormItem>
            </ElCol>
          </template>
        </ElRow>
      </template>
    </ElForm>
  </ElDrawer>
</template>

<script setup lang="ts">
import { ElDrawer, ElForm, ElFormItem, ElRow, ElCol, ElInput, ElDatePicker } from 'element-plus'
import type { FormInstance, FormItemProp, FormRules } from 'element-plus'
import { PropType, computed, reactive, ref, unref } from 'vue'
import { useI18n } from '@/hooks/web/useI18n'

const props = defineProps({
  // 是否显示drawer
  modelValue: {
    type: Boolean,
    required: true
  },
  // 打开事件类型
  eventType: {
    type: String as PropType<CruEventType>,
    default: 'view'
  },
  // drawer宽度
  drawerWidth: {
    type: Number,
    default: 500
  },
  // 每行显示的列数
  column: {
    type: Number,
    default: 2
  },
  // label宽度
  labelWidth: {
    type: [String, Number],
    default: '60px'
  },
  // 标题
  title: {
    type: String,
    default: undefined
  },
  // 元素的配置项参数
  itemsInfo: {
    type: Array as PropType<TableColumnInfo[]>,
    required: true
  },
  // value的属性要与 itemsInfo的prop一一对应
  value: {
    type: Object,
    default: () => ({})
  },
  formRules: {
    type: Object as PropType<FormRules>,
    default: () => ({})
  },
  // 保存按钮的执行函数
  submitFunc: {
    type: Function as PropType<(value: any, type: CruEventType) => void | Promise<void>>,
    required: true
  }
})

const emits = defineEmits(['update:modelValue', 'validate'])

const { t } = useI18n()

const visible = computed<boolean>({
  get() {
    return props.modelValue
  },
  set(val) {
    emits('update:modelValue', val)
  }
})

const formRef = ref<FormInstance>()
const buttonLoading = ref(false)

const propsValue = reactive(props.value)

const allDisabled = computed(() => {
  if (props.eventType === 'view') {
    return true
  }
  return false
})

const forData = computed((): TableColumnInfo[][] => {
  const itemsInfo = props.itemsInfo
  const arr = []
  let i = 0
  while (i < itemsInfo.length) {
    const endIndex = i + props.column < itemsInfo.length ? i + props.column : itemsInfo.length
    arr.push(itemsInfo.slice(i, endIndex))
    i = endIndex
  }
  return arr
})

function isDate(item: ColumnItemType | undefined): item is 'date' | 'datetime' {
  if (!item) return false
  if (item === 'date' || item === 'datetime') {
    return true
  }
  return false
}

function isNum(item: ColumnItemType | undefined): item is 'number' {
  if (!item) return false
  if (item === 'number') {
    return true
  }
  return false
}

function isTextarea(item: ColumnItemType | undefined): item is 'textarea' {
  if (!item) return false
  if (item === 'textarea') {
    return true
  }
  return false
}

function isDisabled(item: TableColumnInfo) {
  if (item.disabled) {
    return true
  }
  if (item.notEdit && props.eventType === 'update') {
    return true
  }
  return false
}

async function validateFunc(prop: FormItemProp, isValid: boolean, message: string) {
  await emits('validate', prop, isValid, message)
}

function drawerBeforeOpen() {
  const formEl = unref(formRef)
  if (!formEl) return
  formEl.clearValidate()
  if (props.eventType === 'create') {
    for (const key of Object.keys(propsValue)) {
      propsValue[key] = undefined
    }
  }
}

async function onSubmit() {
  const formEl = unref(formRef)
  if (!formEl) return
  const validateResult = await formEl.validate((valid, fields) => {
    if (!valid) {
      console.log('error submit!', fields)
    }
  })
  if (!validateResult) {
    return
  }
  buttonLoading.value = true
  await props.submitFunc(propsValue, props.eventType)
  buttonLoading.value = false
  visible.value = false
}
</script>
