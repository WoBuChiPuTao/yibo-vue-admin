<template>
  <ElDialog v-model="dialogVisible">
    <ElDescriptions :title="props.title" :border="true" :column="props.column">
      <template v-for="item in labelData" :key="item.prop">
        <ElDescriptionsItem
          v-if="item.type !== 'array'"
          :label="item.label"
          :min-width="item.minWidth"
          :align="item.align"
        >
          {{ data[item.prop] }}
        </ElDescriptionsItem>
        <ElDescriptionsItem
          v-else
          :label="item.label"
          :min-width="item.minWidth"
          :align="item.align"
        >
          <ElTag class="mr-1" v-for="(role, index) in data[item.prop]" :key="index">{{
            role
          }}</ElTag>
        </ElDescriptionsItem>
      </template>
    </ElDescriptions>
  </ElDialog>
</template>

<script setup lang="ts">
import { ElDialog, ElDescriptions, ElDescriptionsItem, ElTag } from 'element-plus'
import { PropType, computed } from 'vue'

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
    type: Array as PropType<TableColumnInfo[]>,
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
</script>
