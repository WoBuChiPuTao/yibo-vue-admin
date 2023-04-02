<template>
  <div v-bind="$attrs" ref="elRef">
    <slot v-if="isLoad"></slot>
    <template v-else>
      <slot name="padding" v-if="$slots.padding"></slot>
      <div v-else :style="{ backgroundColor: 'red' }"> </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { useTimeoutFn } from '@/hooks/core/useTimeout'
import { tryOnUnmounted } from '@vueuse/shared'
import { onMounted, PropType, ref, toRef, unref } from 'vue'

const elRef = ref()
const isLoad = ref(false)

const props = defineProps({
  // 可视区域判定的基准元素默认window
  viewport: {
    type: Object as PropType<HTMLElement>,
    default: () => null
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

const emits = defineEmits(['load'])

function immediateLoad() {
  const { timeout } = props
  timeout &&
    useTimeoutFn(() => {
      startLoad()
    }, timeout)
}

function startLoad() {
  console.log('startLoad')
  if (unref(isLoad)) return
  isLoad.value = true
  emits('load')
}

function runIntersectionObserver() {
  const { timeout, direction, threshold } = props

  let rootMargin = '0px'
  switch (direction) {
    case 'vertical':
      rootMargin = `${threshold} 0px`
      break
    case 'horizontal':
      rootMargin = `0px ${threshold}`
  }

  if (timeout) return
  const observer = new IntersectionObserver(
    (entries, observer) => {
      const isIntersecting = entries[0].isIntersecting || entries[0].intersectionRatio
      if (isIntersecting) {
        startLoad()
        if (observer) {
          observer.unobserve(entries[0].target)
        }
      }
    },
    {
      root: toRef(props, 'viewport').value || null,
      rootMargin
    }
  )

  elRef.value && observer.observe(elRef.value)

  tryOnUnmounted(() => {
    observer.disconnect()
  })
}

onMounted(() => {
  immediateLoad()
  runIntersectionObserver()
})
</script>
