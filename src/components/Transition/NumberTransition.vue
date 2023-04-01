<template>
  <span>{{ `${outputvalue}` }}</span>
</template>

<script setup lang="ts">
import { useTransition, TransitionPresets } from '@vueuse/core'
import { computed, onMounted, PropType, ref, unref } from 'vue'

interface FormatOptions {
  decimals: number
  separator: string
  prefix: string
  suffix: string
}

const props = defineProps({
  duration: {
    type: Number,
    default: 1500
  },
  startNumber: {
    type: Number,
    default: 0
  },
  endNumber: {
    type: Number,
    required: true
  },
  formatOptions: {
    type: Object as PropType<FormatOptions>,
    default: () => ({
      decimals: 0,
      separator: ',',
      prefix: '',
      suffix: ''
    }),
    validator(value: FormatOptions) {
      return value.decimals >= 0
    }
  },
  transition: {
    type: String as PropType<keyof typeof TransitionPresets>,
    default: 'linear'
  }
})

const source = ref(props.startNumber)

const value = useTransition(source, {
  duration: props.duration,
  transition: TransitionPresets[props.transition]
})
const outputvalue = computed(() => formatNumber(unref(value)))

onMounted(() => {
  source.value = props.endNumber
})

function formatNumber(value: number) {
  if (!value && value !== 0) {
    return ''
  }
  const { decimals, separator, prefix, suffix } = props.formatOptions
  const str = value.toFixed(decimals)
  const arr = str.split('.')
  let intStr = arr[0]
  const floatStr = arr.length > 1 ? '.' + arr[1] : ''
  const reg = /(\d+)(\d{3})/
  if (separator) {
    while (reg.test(intStr)) {
      intStr = intStr.replace(reg, '$1' + separator + '$2')
    }
  }
  return prefix + intStr + floatStr + suffix
}
</script>
