<template>
  <div class="flex items-center justify-between pt-4">
    <div class="flex items-center h-8">
      <span class="mr-4 text-xl font-bold">{{ '风险指标对比' }} </span>
    </div>
  </div>
  <ElDivider></ElDivider>
  <div ref="chart" class="h-96"></div>
</template>

<script setup lang="ts">
import { ElDivider } from 'element-plus'
import { onMounted, ref } from 'vue'
import { useEchart } from '@/hooks/web/useEcharts'
import { portfolioData } from './data'

const chart = ref()

const { setOptions } = useEchart(chart)

onMounted(() =>
  setOptions({
    title: {
      text: '风险指标对比'
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['现值', 'VaR', 'ES', '压力VaR', '压力ES']
    },
    toolbox: {
      show: true,
      feature: {
        dataView: { show: true, readOnly: false },
        magicType: { show: true, type: ['line', 'bar'] },
        restore: { show: true },
        saveAsImage: { show: true }
      }
    },
    calculable: true,
    xAxis: [
      {
        type: 'category',
        data: portfolioData.map((item) => item.name)
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: '现值',
        type: 'bar',
        data: portfolioData.map((item) => item.present),
        markPoint: {
          data: [
            { type: 'max', name: 'Max' },
            { type: 'min', name: 'Min' }
          ]
        },
        markLine: {
          data: [{ type: 'average', name: 'Avg' }]
        }
      },
      {
        name: 'VaR',
        type: 'bar',
        data: portfolioData.map((item) => item.var),
        markPoint: {
          data: [
            { type: 'max', name: 'Max' },
            { type: 'min', name: 'Min' }
          ]
        },
        markLine: {
          data: [{ type: 'average', name: 'Avg' }]
        }
      },
      {
        name: 'ES',
        type: 'bar',
        data: portfolioData.map((item) => item.es),
        markPoint: {
          symbolRotate: (value) => {
            return value >= 0 ? 0 : 180
          },
          label: { position: 'insideBottom' },
          data: [
            { type: 'max', name: 'Max' },
            { type: 'min', name: 'Min' }
          ]
        },
        markLine: {
          data: [{ type: 'average', name: 'Avg' }]
        }
      },
      {
        name: '压力VaR',
        type: 'bar',
        data: portfolioData.map((item) => item.stressVar),
        markPoint: {
          symbolRotate: (value) => {
            return value >= 0 ? 0 : 180
          },
          data: [
            { type: 'max', name: 'Max' },
            { type: 'min', name: 'Min' }
          ]
        },
        markLine: {
          data: [{ type: 'average', name: 'Avg' }]
        }
      },
      {
        name: '压力ES',
        type: 'bar',
        data: portfolioData.map((item) => item.stressEs),
        markPoint: {
          symbolRotate: (value) => {
            return value >= 0 ? 0 : 180
          },
          label: { position: 'insideBottom' },
          data: [
            { type: 'max', name: 'Max' },
            { type: 'min', name: 'Min' }
          ]
        },
        markLine: {
          data: [{ type: 'average', name: 'Avg' }]
        }
      }
    ]
  })
)
</script>
