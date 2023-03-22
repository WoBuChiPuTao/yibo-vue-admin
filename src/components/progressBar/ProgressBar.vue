<template>
  <div class="flex flex-col">
    <div class="flex justify-between">
      <span>{{ props.title }}</span>
      <span>{{ `${outputValue}/${props.total}` }}</span>
    </div>
    <div class="relative w-full" :style="{ height: props.height }">
      <div class="absolute w-full h-full" :style="{ backgroundColor: props.backColor }"></div>
      <div class="absolute h-full" :style="{ backgroundColor: props.color, width: getWidth }"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTransition, TransitionPresets } from '@vueuse/core'
import { computed, onMounted, PropType, ref, unref } from 'vue'

const props = defineProps({
  title: String,
  progressValue: {
    type: Number,
    default: 50
  },
  total: {
    type: Number,
    default: 100
  },
  backColor: {
    type: String,
    default: 'var(--el-border-color)'
  },
  color: {
    type: String,
    default: 'red'
  },
  height: {
    type: String,
    default: '0.5rem'
  },
  duration: {
    type: Number,
    default: 1500
  },
  transition: {
    type: String as PropType<keyof typeof TransitionPresets>,
    default: 'linear'
  }
})

const source = ref(0)
const value = useTransition(source, {
  duration: props.duration,
  transition: TransitionPresets[props.transition]
})
const outputValue = computed(() => unref(value).toFixed(0))

const getWidth = computed(() => {
  return (unref(value) / props.total) * 100 + '%'
})

onMounted(() => {
  source.value = props.progressValue
})
</script>
