<template>
  <div ref="chartRef"></div>
</template>

<script setup lang="ts">
import { useEchart } from '@/hooks/web/useEcharts'
import { onMounted, Ref, ref } from 'vue'

const chartRef = ref<HTMLDivElement | null>(null)
const { setOptions } = useEchart(chartRef as Ref<HTMLDivElement>)

onMounted(() => {
  setOptions({})
})
</script>
