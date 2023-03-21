<template>
  <div class="p-4">
    <VisitCard class="mb-4 enter-y" :skeletonLoading="setLoading"></VisitCard>
    <ElRow :gutter="16">
      <ElCol :span="18">
        <VisitCharts :skeletonLoading="setLoading"></VisitCharts>
      </ElCol>
      <ElCol :span="6"></ElCol>
    </ElRow>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { ElRow, ElCol } from 'element-plus'
import VisitCard from './components/VisitCard.vue'
import VisitCharts from './components/VisitCharts.vue'

export default defineComponent({
  name: 'Dashboard',
  components: { VisitCard, ElRow, ElCol, VisitCharts },
  setup() {
    const setLoading = ref(true)
    setTimeout(() => {
      setLoading.value = false
    }, 2500)
    return { setLoading }
  }
})
</script>
