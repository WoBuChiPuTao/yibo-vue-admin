<template>
  <Card :loading="props.skeletonLoading">
    <template #header>
      <div class="flex items-center justify-between">
        <span class="text-xl font-bold">{{ '访问趋势' }}</span>
        <el-radio-group v-model="radio" @change="handleRadioChange">
          <el-radio-button label="Week"></el-radio-button>
          <el-radio-button label="Month"></el-radio-button>
        </el-radio-group>
      </div>
    </template>
    <div ref="chart" class="h-64"></div>
  </Card>
</template>

<script setup lang="ts">
import { ElRadioGroup, ElRadioButton } from 'element-plus'
import { useEchart } from '@/hooks/web/useEcharts'
import Card from '@/components/card/Card.vue'
import { computed, ComputedRef, onMounted, ref } from 'vue'
import { EChartsOption } from 'echarts'

const chart = ref<HTMLDivElement>()

const radio = ref('Week')

const props = defineProps({
  skeletonLoading: Boolean
})
const data = computed(() => {
  return radio.value === 'Week'
    ? [
        ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        [20, 30, 40, 35, 34, 15, 46],
        [40, 35, 34, 15, 46, 15, 12],
        [60, 45, 44, 25, 56, 25, 24]
      ]
    : [
        ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'JUl', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
        [120, 132, 101, 134, 90, 230, 210, 150, 238, 180, 100, 170],
        [150, 232, 201, 154, 190, 250, 270, 190, 350, 230, 140, 270],
        [200, 300, 260, 190, 240, 300, 340, 230, 400, 300, 200, 340]
      ]
})

const chartData: ComputedRef<EChartsOption> = computed(() => {
  return {
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['Angular', 'Vue', 'React']
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
      data: data.value[0]
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: 'Angular',
        type: 'line',
        stack: 'Total',
        color: '#e00000',
        data: data.value[1]
      },
      {
        name: 'Vue',
        type: 'line',
        stack: 'Total',
        color: '#00e000',
        data: data.value[2]
      },
      {
        name: 'React',
        type: 'line',
        stack: 'Total',
        color: '#00bedf',
        data: data.value[3]
      }
    ]
  }
})

const { setOptions } = useEchart(chart)

function handleRadioChange() {
  setOptions(chartData.value)
}

onMounted(() => setOptions(chartData.value))
</script>
