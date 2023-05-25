<template>
  <ElDialog v-model="dialogVisible">
    <ElDescriptions :title="props.title" :border="true" :column="props.column">
      <template v-for="key in keys" :key="key">
        <ElDescriptionsItem :label="labelData[key]">{{ data[key] }}</ElDescriptionsItem>
      </template>
    </ElDescriptions>
  </ElDialog>
</template>

<script setup lang="ts">
import { ElDialog, ElDescriptions, ElDescriptionsItem } from 'element-plus'
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  title: {
    type: String,
    default: undefined
  },
  column: {
    type: Number,
    default: 2
  },
  labelData: {
    type: Object,
    required: true
  },
  // labelData必须要和data属性一一对应
  data: {
    type: Object,
    required: true
  }
})

const emits = defineEmits(['update:modelValue'])

const dialogVisible = computed({
  set: (val) => {
    emits('update:modelValue', val)
  },
  get: () => props.modelValue
})

const keys = computed(() => {
  return Object.keys(props.labelData)
})
</script>
