<template>
  <ElDialog v-model="dialogVisible" :width="width">
    <ElDescriptions :title="props.title" :border="true" :column="props.column">
      <template v-for="item in labelData" :key="item.prop">
        <ElDescriptionsItem
          v-if="$slots[item.prop]"
          :label="item.label"
          :min-width="item.minWidth"
          :align="item.align"
        >
          <slot :name="item.prop" :data="data[item.prop]"></slot>
        </ElDescriptionsItem>
        <template v-else>
          <ElDescriptionsItem
            v-if="item.type === 'array'"
            :label="item.label"
            :min-width="item.minWidth"
            :align="item.align"
          >
            <ElTag class="mr-1" v-for="(role, index) in data[item.prop]" :key="index">{{
              role
            }}</ElTag>
          </ElDescriptionsItem>
          <ElDescriptionsItem
            v-else-if="item.type === 'textarea'"
            :label="item.label"
            :min-width="item.minWidth"
            :align="item.align"
          >
            <span class="whitespace-pre-line">
              {{ data[item.prop] }}
            </span>
          </ElDescriptionsItem>
          <ElDescriptionsItem
            v-else
            :label="item.label"
            :min-width="item.minWidth"
            :align="item.align"
          >
            {{ data[item.prop] }}
          </ElDescriptionsItem>
        </template>
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
  width: {
    type: String,
    default: '50%'
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
