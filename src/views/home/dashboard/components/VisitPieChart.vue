<template>
  <Card :loading="props.skeletonLoading">
    <div ref="chart" class="h-64"></div>
  </Card>
</template>

<script setup lang="ts">
import { useEchart } from '@/hooks/web/useEcharts'
import Card from '@/components/card/Card.vue'
import { onMounted, ref } from 'vue'

const chart = ref<HTMLDivElement>()
const { setOptions } = useEchart(chart)
const props = defineProps({
  skeletonLoading: Boolean
})

onMounted(() =>
  setOptions({
    title: {
      text: '访问统计',
      subtext: 'Fake Data',
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'horizontal',
      bottom: '0'
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: '50%',
        color: ['#00bedf', '#00e000', '#e00000'],
        data: [
          { value: 1048, name: 'React' },
          { value: 735, name: 'Vue' },
          { value: 580, name: 'Angular' }
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  })
)
</script>
