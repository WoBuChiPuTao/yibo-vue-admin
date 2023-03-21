<template>
  <div class="p-4">
    <VisitCard class="enter-y" :skeletonLoading="setLoading"></VisitCard>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import {} from 'element-plus'
import VisitCard from './components/VisitCard.vue'

export default defineComponent({
  name: 'Dashboard',
  components: { VisitCard },
  setup() {
    const setLoading = ref(true)
    setTimeout(() => {
      setLoading.value = false
    }, 2500)
    return { setLoading }
  }
})
</script>
