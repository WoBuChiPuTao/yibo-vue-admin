<template>
  <div class="flex items-center justify-between pt-4">
    <div class="flex items-center">
      <span class="mr-4 text-xl font-bold">{{ '组合对比' }} </span>
      <ElSelect v-model="selected">
        <template v-for="item in getSlelectedOptions" :key="item">
          <ElOption :value="item" :label="item" />
        </template>
      </ElSelect>
    </div>
  </div>
  <ElDivider></ElDivider>
  <div ref="chart" class="h-96"></div>
</template>

<script setup lang="ts">
import { ElDivider, ElOption, ElSelect } from 'element-plus'
import { stressTableData } from './data'
import { onMounted, ref } from 'vue'
import { computed } from '@vue/reactivity'
import { useEchart } from '@/hooks/web/useEcharts'

const selected = ref(stressTableData[0].name)

const chart = ref()

function getStressParentName(data: any[]) {
  const nameArr: any[] = []
  data.forEach((item) => {
    if (item['children'] && item['children'].length !== 0) {
      nameArr.push(item.name)
      getStressParentName(item.children).forEach((item) => nameArr.push(item))
    }
  })

  return nameArr
}

const getSlelectedOptions = computed(() => {
  return getStressParentName(stressTableData)
})

const { setOptions } = useEchart(chart)

onMounted(() =>
  setOptions({
    title: [
      {
        text: '现值',
        bottom: '5%',
        left: '22%'
      },
      {
        text: '日损益',
        bottom: '5%',
        right: '22%'
      }
    ],
    legend: {},
    tooltip: {},
    dataset: {
      source: [
        ['product', '现值', '日损益'],
        ['外汇远期', 30000, 150],
        ['外汇不可交割远期', 10000, 200],
        ['外汇掉期', 20000, 300]
      ]
    },
    series: [
      {
        type: 'pie',
        radius: '50%',
        center: ['25%', '50%'],
        encode: {
          itemName: 'product',
          value: '现值'
        }
      },
      {
        type: 'pie',
        radius: '50%',
        center: ['75%', '50%'],
        encode: {
          itemName: 'product',
          value: '日损益'
        }
      }
    ]
  })
)
</script>
