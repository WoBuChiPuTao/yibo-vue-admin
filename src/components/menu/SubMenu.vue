<template>
  <MenuItem></MenuItem>
  <SubMenuItem>
    <template
      v-for="childrenItem in item.children || []"
      :key="childrenItem.name"
    >
      <SubMenu :item="childrenItem"></SubMenu>
    </template>
  </SubMenuItem>
</template>

<script lang="ts">
import { SimpleMenu } from '@/types/menu'
import { defineComponent, PropType } from 'vue'
import MenuItem from './MenuItem.vue'
import SubMenuItem from './SubMenuItem.vue'

export default defineComponent({
  name: 'SubMenu',
  components: { MenuItem, SubMenuItem },
  props: {
    item: {
      type: Object as PropType<SimpleMenu>,
      default: () => ({})
    }
  },
  setup() {
    return {}
  }
})
</script>
