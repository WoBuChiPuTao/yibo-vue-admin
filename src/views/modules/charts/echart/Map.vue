<template>
  <div ref="chartRef" class="w-full h-full"></div>
</template>

<script lang="ts">
import { useEchart } from '@/hooks/web/useEcharts'
import { mapData } from './data'
import { defineComponent, onMounted, ref } from 'vue'
import { registerMap } from 'echarts'
export default defineComponent({
  name: 'Map',
  setup() {
    const chartRef = ref<HTMLDivElement>()
    const { setOptions } = useEchart(chartRef)
    onMounted(async () => {
      const json = (await (await import('./china.json')).default) as any
      registerMap('china', json)
      setOptions({
        title: {
          show: true,
          text: '中国地图',
          link: 'https://www.baidu.com',
          target: 'self',
          textStyle: {
            color: '#333',
            fontStyle: 'italic',
            fontWeight: 'lighter'
            // textBorderColor: 'yellow',
            // textBorderWidth: 0.5,
            // textBorderType: [5, 10],
            // textBorderDashOffset: 5,
            // textShadowBlur: 5,
            // textShadowColor: '#000',
            // textShadowOffsetX: 5,
            // textShadowOffsetY: 5
          },
          subtext: '出生率',
          sublink: 'https://www.baidu.com',
          subtarget: 'self',
          textAlign: 'center',
          textVerticalAlign: 'top',
          top: 40,
          right: 30,
          itemGap: 10
          // borderColor: 'green',
          // borderWidth: 1,
          // borderType: 'solid',
          // borderRadius: 5
        },
        visualMap: [
          {
            type: 'continuous',
            min: 0,
            max: 1000,
            // splitNumber: 5,
            align: 'bottom',
            text: ['高', '低'],
            inverse: true,
            left: 'left',
            top: 'bottom',
            calculable: false,
            orient: 'vertical',
            inRange: {
              color: ['#e0ffff', '#006edd'],
              symbolSize: [1, 2]
            }
          }
        ],
        tooltip: {
          trigger: 'item',
          backgroundColor: 'rgba(0, 0, 0, .6)',
          textStyle: {
            color: '#fff',
            fontSize: 12
          }
        },
        series: [
          {
            name: '生育率',
            type: 'map',
            map: 'china',
            label: {
              show: true,
              color: 'rgb(249, 249, 249)',
              fontSize: 10
            },
            itemStyle: {
              areaColor: '#2f82ce',
              borderColor: '#0DAAC1'
            },
            data: mapData
          }
        ]
      })
    })
    return {
      chartRef
    }
  }
})
</script>
