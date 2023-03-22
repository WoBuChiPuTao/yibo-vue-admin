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

onMounted(() => {
  setOptions({
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        lineStyle: {
          width: 1,
          color: '#019680'
        }
      }
    },
    grid: {
      left: '1%',
      right: '1%',
      top: '5%',
      bottom: 0,
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'JUl', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
    },
    yAxis: {
      type: 'value',
      splitNumber: 4
    },
    series: [
      {
        data: [3000, 2000, 3333, 5000, 3200, 4200, 3200, 2100, 3000, 5100, 6000, 3200, 4800],
        type: 'bar',
        barMaxWidth: 80
      }
    ]
  })
})
</script>
