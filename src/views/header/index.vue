<template>
  <LayoutHeader></LayoutHeader>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import LayoutHeader from './LayoutHeader.vue'
export default defineComponent({
  name: 'Header',
  components: { LayoutHeader },
  setup() {
    return {}
  }
})
</script>
