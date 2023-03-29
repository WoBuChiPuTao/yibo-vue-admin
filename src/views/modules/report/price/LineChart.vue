<template>
  <div class="flex items-center justify-between pt-4">
    <span class="text-xl font-bold">{{ '变化趋势' }}</span>
    <el-radio-group v-model="radio" @change="handleRadioChange">
      <el-radio-button label="Month"></el-radio-button>
      <el-radio-button label="Year"></el-radio-button>
      <el-radio-button label="3 Year"></el-radio-button>
    </el-radio-group>
  </div>
  <ElDivider></ElDivider>
  <div ref="chart" class="h-5/6"></div>
</template>

<script setup lang="ts">
import { ElRadioGroup, ElRadioButton, ElDivider } from 'element-plus'
import { useEchart } from '@/hooks/web/useEcharts'
import { computed, ComputedRef, onMounted, ref } from 'vue'
import { EChartsOption } from 'echarts'

const chart = ref<HTMLDivElement>()

const radio = ref('Month')

const data = computed(() => {
  return radio.value === 'Month'
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
      data: ['NPV', '净价', '久期']
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
        name: 'NPV',
        type: 'line',
        stack: 'Total',
        color: '#e00000',
        data: data.value[1]
      },
      {
        name: '净价',
        type: 'line',
        stack: 'Total',
        color: '#00e000',
        data: data.value[2]
      },
      {
        name: '久期',
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
