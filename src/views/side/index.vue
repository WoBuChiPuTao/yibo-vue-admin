<template>
  <div>logo</div>
  <DemoMenu></DemoMenu>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import DemoMenu from './DemoMenu.vue'
export default defineComponent({
  name: 'AppSide',
  components: { DemoMenu },
  setup() {
    return {}
  }
})
</script>

<style></style>
