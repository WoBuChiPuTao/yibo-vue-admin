<template>
  <div class="flex items-center justify-between pt-4">
    <div class="flex items-center h-8">
      <span class="mr-4 text-xl font-bold">{{ '回溯曲线' }} </span>
    </div>
  </div>
  <ElDivider></ElDivider>
  <div ref="chart" class="h-5/6"></div>
</template>

<script setup lang="ts">
import { ElDivider } from 'element-plus'
import { useEchart } from '@/hooks/web/useEcharts'
import { computed, ComputedRef, onMounted, ref } from 'vue'
import { EChartsOption } from 'echarts'
import { xAxis, barData, lineData, mirrorLineData } from './data'

const chart = ref<HTMLDivElement>()

const getMarkPoint = computed(() => {
  const data: any[] = []
  barData.forEach((item, index) => {
    if (item > lineData[index]) {
      data.push({ name: 'index', value: item, xAxis: index, yAxis: item })
    }
  })
  return data
})

const getMarkPointMirror = computed(() => {
  const data: any[] = []
  barData.forEach((item, index) => {
    if (item < mirrorLineData[index]) {
      data.push({ name: 'index', value: item, xAxis: index, yAxis: item })
    }
  })
  return data
})

const chartData: ComputedRef<EChartsOption> = computed(() => {
  return {
    toolbox: {
      feature: {
        dataZoom: {
          yAxisIndex: false
        },
        saveAsImage: {
          pixelRatio: 2
        }
      }
    },
    legend: {
      data: ['日损益', 'VaR', '镜像VaR']
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: {
      bottom: 90
    },
    dataZoom: [
      {
        type: 'inside'
      },
      {
        type: 'slider'
      }
    ],
    xAxis: {
      data: xAxis,
      silent: false,
      splitLine: {
        show: false
      },
      splitArea: {
        show: false
      }
    },
    yAxis: {
      splitArea: {
        show: false
      }
    },
    series: [
      {
        type: 'bar',
        name: '日损益',
        data: barData,
        showSymbol: false,
        large: true,
        markPoint: {
          symbolRotate: (value) => {
            return value >= 0 ? 0 : 180
          },
          label: { position: 'insideBottom' },
          data: getMarkPointMirror.value
        }
      },
      {
        type: 'line',
        name: 'VaR',
        data: lineData,
        smooth: true,
        showSymbol: false,
        markPoint: {
          data: getMarkPoint.value
        }
      },
      {
        type: 'line',
        name: '镜像VaR',
        data: mirrorLineData,
        smooth: true,
        showSymbol: false
      }
    ]
  }
})

const { setOptions } = useEchart(chart)

onMounted(() => setOptions(chartData.value))
</script>
