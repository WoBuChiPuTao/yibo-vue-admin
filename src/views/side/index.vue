<template>
  <div>logo</div>
  <DemoMenu :items="menus"></DemoMenu>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import DemoMenu from './DemoMenu.vue'
import { useSplitMenu } from './useMenu'
export default defineComponent({
  name: 'AppSide',
  components: { DemoMenu },
  setup() {
    const menus = useSplitMenu()
    return {
      menus
    }
  }
})
</script>

<style></style>
