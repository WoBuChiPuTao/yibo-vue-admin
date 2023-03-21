<template>
  <div>
    <BarChart style="width: 100%; height: 400px" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import BarChart from '../BarChart.vue'

export default defineComponent({
  name: 'Workbench',
  components: { BarChart }
})
</script>
