<template>
  <div> </div>
</template>

<script setup lang="ts">
import { PropType, reactive } from 'vue'

const props = defineProps({
  // 可视区域判定的基准元素默认window
  viewport: {
    type: Object as PropType<HTMLElement>,
    default: () => window.HTMLElement
  },
  // 加载等待时间，如果存在，无论是否可见，都将自动加载
  timeout: { type: Number },
  // 阈值，组件距离可视范围的距离
  threshold: { type: String, default: '0px' },
  // 主轴方向，用于与threshold联合判断距离
  direction: {
    type: String as PropType<'vertical' | 'horizontal'>,
    default: 'vertical'
  }
})

// function loadInstance() {}
</script>
