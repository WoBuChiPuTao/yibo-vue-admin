<template>
  <div class="flex items-center justify-between pt-4">
    <div class="flex items-center">
      <span class="mr-4 text-xl font-bold">{{ '变化趋势' }} </span>
      <ElSelect v-model="selected" @change="selectChange">
        <template v-for="item in varOption" :key="item">
          <ElOption :value="item" :label="item" />
        </template>
      </ElSelect>
    </div>
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
import { ElRadioGroup, ElRadioButton, ElDivider, ElSelect, ElOption } from 'element-plus'
import { useEchart } from '@/hooks/web/useEcharts'
import { computed, ComputedRef, onMounted, ref, unref } from 'vue'
import { EChartsOption } from 'echarts'
import echarts from '@/utils/lib/echarts'
import { varOption } from './data'

const chart = ref<HTMLDivElement>()
const radio = ref('Month')
const selected = ref(varOption[0])

const chartData: ComputedRef<EChartsOption> = computed(() => {
  const radioValue = unref(radio)
  if (radioValue === 'Month') {
    const oneDay = 24 * 3600 * 1000
    let base = +new Date() - 30 * oneDay
    const date = []
    const data = [Math.random() * 30000]
    for (let i = 1; i < 31; i++) {
      const now = new Date((base += oneDay))
      date.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'))
      data.push(Math.round((Math.random() - 0.5) * 20 + data[i - 1]))
    }
    return {
      tooltip: {
        trigger: 'axis'
      },
      title: {
        left: 'center',
        text: radioValue
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
        data: date
      },
      yAxis: {
        type: 'value',
        scale: true
      },
      series: [
        {
          name: 'NPV',
          type: 'line',
          stack: 'Total',
          color: '#e00000',
          data: data
        }
      ]
    }
  } else if (radioValue === 'Year') {
    let base = +new Date(2022, 3, 15)
    const oneDay = 24 * 3600 * 1000
    const date = []
    const data = [Math.random() * 300]
    for (let i = 1; i < 365; i++) {
      const now = new Date((base += oneDay))
      date.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'))
      data.push(Math.round((Math.random() - 0.5) * 20 + data[i - 1]))
    }
    return {
      tooltip: {
        trigger: 'axis',
        position: function (pt) {
          return [pt[0], '10%']
        }
      },
      title: {
        left: 'center',
        text: radioValue
      },
      toolbox: {
        feature: {
          dataZoom: {
            yAxisIndex: 'none'
          },
          restore: {},
          saveAsImage: {}
        }
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: date
      },
      yAxis: {
        type: 'value',
        boundaryGap: [0, '100%']
      },
      dataZoom: [
        {
          type: 'inside',
          start: 50,
          end: 100
        },
        {
          type: 'slider',
          start: 0,
          end: 10
        }
      ],
      series: [
        {
          name: 'Fake Data',
          type: 'line',
          symbol: 'none',
          sampling: 'lttb',
          itemStyle: {
            color: 'rgb(255, 70, 131)'
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgb(255, 158, 68)'
              },
              {
                offset: 1,
                color: 'rgb(255, 70, 131)'
              }
            ])
          },
          data: data
        }
      ]
    }
  }
  let base = +new Date(2020, 3, 15)
  const oneDay = 24 * 3600 * 1000
  const date = []
  const data = [Math.random() * 300]
  for (let i = 1; i < 365 * 3; i++) {
    const now = new Date((base += oneDay))
    date.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'))
    data.push(Math.round((Math.random() - 0.5) * 20 + data[i - 1]))
  }
  return {
    tooltip: {
      trigger: 'axis',
      position: function (pt) {
        return [pt[0], '10%']
      }
    },
    title: {
      left: 'center',
      text: radioValue
    },
    toolbox: {
      feature: {
        dataZoom: {
          yAxisIndex: 'none'
        },
        restore: {},
        saveAsImage: {}
      }
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: date
    },
    yAxis: {
      type: 'value',
      boundaryGap: [0, '100%']
    },
    dataZoom: [
      {
        type: 'inside',
        start: 90,
        end: 100
      },
      {
        start: 0,
        end: 50
      }
    ],
    series: [
      {
        name: 'Fake Data',
        type: 'line',
        symbol: 'none',
        sampling: 'lttb',
        itemStyle: {
          color: 'rgb(255, 70, 131)'
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgb(255, 158, 68)'
            },
            {
              offset: 1,
              color: 'rgb(255, 70, 131)'
            }
          ])
        },
        data: data
      }
    ]
  }
})

const { setOptions } = useEchart(chart)

function selectChange() {
  setOptions(chartData.value)
}

function handleRadioChange() {
  setOptions(chartData.value)
}

onMounted(() => setOptions(chartData.value))
</script>
