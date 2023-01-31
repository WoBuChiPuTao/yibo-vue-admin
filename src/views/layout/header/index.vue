<template>
  <LayoutHeader></LayoutHeader>
  <Tabs></Tabs>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import LayoutHeader from './LayoutHeader.vue'
import Tabs from '../tabs/index.vue'
export default defineComponent({
  name: 'Header',
  components: { LayoutHeader, Tabs },
  setup() {
    return {}
  }
})
</script>
