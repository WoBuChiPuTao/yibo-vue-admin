<template>
  <Card :loading="props.skeletonLoading">
    <div ref="chart" class="h-64"></div>
  </Card>
</template>

<script setup lang="ts">
import Card from '@/components/card/Card.vue'
import { useEchart } from '@/hooks/web/useEcharts'
import { onMounted, ref } from 'vue'

const props = defineProps({
  skeletonLoading: Boolean
})

const chart = ref<HTMLDivElement>()

const { setOptions } = useEchart(chart)

onMounted(() => {
  setOptions({
    title: {
      text: '技能掌握',
      left: 'left'
    },
    color: ['#f43f5e', '#6366f1'],
    backgroundColor: 'transparent',
    tooltip: {},
    radar: {
      radius: '70%',
      center: ['50%', '50%'],
      splitNumber: 5,
      axisNameGap: 10,
      axisName: {
        color: '#6b7280'
      },
      axisLine: {
        lineStyle: {
          color: '#9ca3af40'
        }
      },
      splitLine: {
        lineStyle: {
          color: '#9ca3af40'
        }
      },
      splitArea: {
        areaStyle: {
          color: ['#77EADF', '#26C3BE', '#64AFE9'],
          shadowColor: 'rgba(0, 0, 0, 0.2)',
          shadowBlur: 10
        }
      },
      indicator: [
        {
          name: 'TypeScript',
          max: 100
        },
        {
          name: 'Vue',
          max: 100
        },
        {
          name: 'React',
          max: 100
        },
        {
          name: 'Svelte',
          max: 100
        },
        {
          name: 'NodeJs',
          max: 100
        },
        {
          name: 'WebGL',
          max: 100
        }
      ]
    },
    series: [
      {
        name: '熟练度',
        type: 'radar',
        symbolSize: 0,
        areaStyle: {
          shadowBlur: 13,
          shadowColor: 'rgba(0,0,0,.2)',
          shadowOffsetX: 0,
          shadowOffsetY: 10,
          opacity: 1
        },
        data: [
          {
            value: [50, 80, 90, 40, 60, 30],
            name: '2022年'
          },
          {
            value: [80, 90, 70, 90, 40, 70],
            name: '2023年'
          }
        ]
      }
    ]
  })
})
</script>

<style lang="less">
.el-card {
  overflow: visible;
}
</style>
