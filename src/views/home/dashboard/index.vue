<template>
  <div class="p-4">
    <VisitCard class="mb-4 enter-y" :skeletonLoading="setLoading"></VisitCard>
    <ElRow :gutter="16" class="mb-4 enter-y">
      <ElCol :span="18">
        <VisitLineChart :skeletonLoading="setLoading"></VisitLineChart>
      </ElCol>
      <ElCol :span="6">
        <VisitProgress :skeletonLoading="setLoading"></VisitProgress>
      </ElCol>
    </ElRow>
    <ElRow :gutter="16" class="enter-y">
      <ElCol :span="8">
        <VisitPieChart :skeletonLoading="setLoading"></VisitPieChart>
      </ElCol>
      <ElCol :span="8">
        <VisitBarChart :skeletonLoading="setLoading"></VisitBarChart>
      </ElCol>
      <ElCol :span="8">
        <VisitRadarChart :skeletonLoading="setLoading"></VisitRadarChart>
      </ElCol>
    </ElRow>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { ElRow, ElCol } from 'element-plus'
import VisitCard from './components/VisitCard.vue'
import VisitLineChart from './components/VisitLineChart.vue'
import VisitPieChart from './components/VisitPieChart.vue'
import VisitBarChart from './components/VisitBarChart.vue'
import VisitRadarChart from './components/VisitRadarChart.vue'
import VisitProgress from './components/VisitProgress.vue'
export default defineComponent({
  name: 'Dashboard',
  components: {
    VisitCard,
    ElRow,
    ElCol,
    VisitLineChart,
    VisitPieChart,
    VisitRadarChart,
    VisitBarChart,
    VisitProgress
  },
  setup() {
    const setLoading = ref(true)
    setTimeout(() => {
      setLoading.value = false
    }, 2000)
    return { setLoading }
  }
})
</script>
