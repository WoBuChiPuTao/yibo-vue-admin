<script setup lang="ts">
import { watch } from 'vue'
import { drawImageNum } from './hooks'

interface Props {
  code?: string
  width?: number
  height?: number
}

interface Emits {
  (e: 'update:code', code: string): void
}

const props = withDefaults(defineProps<Props>(), {
  code: '',
  width: 120,
  height: 40
})

const emit = defineEmits<Emits>()

const { domRef, imgCode, setImgCode, getImgCode } = drawImageNum(props.width, props.height)

watch(
  () => props.code,
  (newValue) => {
    setImgCode(newValue)
  }
)
watch(imgCode, (newValue) => {
  emit('update:code', newValue)
})

defineExpose({ getImgCode })
</script>

<template>
  <canvas ref="domRef" :width="width" :height="height" class="cursor-pointer" @click="getImgCode" />
</template>
