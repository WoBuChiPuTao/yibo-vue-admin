<template>
  <DemoMenu :items="menus"></DemoMenu>
</template>

<script lang="ts">
import { computed, defineComponent, unref } from 'vue'
import DemoMenu from './DemoMenu.vue'
import { useLeftMenu } from './useMenu'
export default defineComponent({
  name: 'AppSide',
  components: { DemoMenu },
  setup() {
    const { menuRef } = useLeftMenu()
    const menus = computed(() => {
      const menu = unref(menuRef)
      return menu
    })
    // const { menus } = unref(getCommonProps)
    return {
      menus
    }
  }
})
</script>
