<template>
  <Card :loading="skeletonLoading">
    <template #header>
      <div class="flex items-center justify-between">
        <span class="text-xl font-bold">{{ '访问趋势' }}</span>
      </div>
    </template>
    <div ref="chart" class="h-64"></div>
  </Card>
</template>

<script setup lang="ts">
import { useEchart } from '@/hooks/web/useEcharts'
import Card from '@/components/card/Card.vue'
import { onMounted, ref } from 'vue'

const chart = ref<HTMLDivElement>()

const props = defineProps({
  skeletonLoading: Boolean
})

const { setOptions } = useEchart(chart)

onMounted(() => {
  setOptions({
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['Email', 'Union Ads', 'Video Ads']
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: 'Email',
        type: 'line',
        stack: 'Total',
        data: [120, 132, 101, 134, 90, 230, 210]
      },
      {
        name: 'Union Ads',
        type: 'line',
        stack: 'Total',
        data: [220, 182, 191, 234, 290, 330, 310]
      },
      {
        name: 'Video Ads',
        type: 'line',
        stack: 'Total',
        data: [150, 232, 201, 154, 190, 330, 410]
      }
    ]
  })
})
</script>
