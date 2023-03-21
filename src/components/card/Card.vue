<template>
  <ElCard :body-style="props.bodyStyle" :shadow="props.shadow">
    <template #header v-if="$slots.header">
      <slot name="header"></slot>
    </template>
    <ElSkeleton :rows="3" animated :loading="props.loading">
      <template #default>
        <slot></slot>
      </template>
    </ElSkeleton>
  </ElCard>
</template>

<script setup lang="ts">
import { ElCard, ElSkeleton } from 'element-plus'
import { CSSProperties, PropType } from 'vue'

const props = defineProps({
  bodyStyle: Object as PropType<CSSProperties>,
  shadow: {
    type: String as PropType<'hover' | 'always' | 'never'>,
    default: 'never'
  },
  loading: Boolean
})
</script>
