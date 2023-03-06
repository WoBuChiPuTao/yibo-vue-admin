<template>
  <div>
    <BarChart style="height: 400px; width: 100%"></BarChart>
    <Dcharts style="height: 400px; width: 100%"></Dcharts>
    <BarChart style="height: 400px; width: 100%"></BarChart>
    <BarChart style="height: 400px; width: 100%"></BarChart>
    <BarChart style="height: 400px; width: 100%"></BarChart>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Dcharts from './Dcharts.vue'
import BarChart from './BarChart.vue'

export default defineComponent({
  name: 'HomePage',
  components: {
    BarChart,
    Dcharts
  },
  setup() {
    return {}
  }
})
</script>
