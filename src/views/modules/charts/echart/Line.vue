<template>
  <div class="contianer">
    <div ref="chartRef"></div>
  </div>
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

<style lang="less" scoped>
.container {
  width: 100%;
  height: 100%;
}
</style>
