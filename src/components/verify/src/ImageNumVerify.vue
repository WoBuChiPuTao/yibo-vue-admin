<script setup lang="ts">
import { watch } from 'vue'
import { drawImageNum } from './hooks'

interface Props {
  modelValue?: string
  width?: number
  height?: number
}

interface Emits {
  (e: 'update:modelValue', code: string): void
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  width: 120,
  height: 40
})

const emit = defineEmits<Emits>()

const { domRef, imgCode, setImgCode, getImgCode } = drawImageNum(props.width, props.height)

watch(
  () => props.modelValue,
  (newValue) => {
    setImgCode(newValue)
  }
)
watch(
  () => imgCode.value,
  (newValue) => {
    emit('update:modelValue', newValue)
  }
)

defineExpose({ getImgCode })
</script>

<template>
  <canvas ref="domRef" :width="width" :height="height" class="cursor-pointer" @click="getImgCode" />
</template>
