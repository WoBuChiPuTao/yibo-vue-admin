<template>
  <div>
    <BarChart style="height: 400px; width: 100%"></BarChart>
    <BarChart style="height: 400px; width: 100%"></BarChart>
    <BarChart style="height: 400px; width: 100%"></BarChart>
    <BarChart style="height: 400px; width: 100%"></BarChart>
    <BarChart style="height: 400px; width: 100%"></BarChart>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import BarChart from './BarChart.vue'

export default defineComponent({
  name: 'HomePage',
  components: {
    BarChart
  },
  setup() {
    return {}
  }
})
</script>
