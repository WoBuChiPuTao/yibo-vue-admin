<template>
  <ElSubMenu v-if="hasChildrenMenu(item)" :index="item.path">
    <template #title>
      {{ item.name }}
    </template>
    <template v-for="childrenItem in item.children || []" :key="childrenItem.path">
      <SubMenu :item="childrenItem"></SubMenu>
    </template>
  </ElSubMenu>
  <ElMenuItem v-else :index="item.path"><template #title>
      {{ item.name }}
    </template></ElMenuItem>
</template>

<script lang="ts">
import { ElSubMenu, ElMenuItem } from 'element-plus'
import { SimpleMenu } from '@/types/menu'
import { defineComponent, PropType } from 'vue'
// import SubMenuItem from './SubMenuItem.vue'
// import MenuItem from './MenuItem.vue'

export default defineComponent({
  name: 'SubMenu',
  inheritAttrs: false,
  components: { ElSubMenu, ElMenuItem },
  props: {
    item: {
      type: Object as PropType<SimpleMenu>,
      default: () => ({})
    }
  },
  setup(props) {
    console.log(props.item)
    function hasChildrenMenu(item: SimpleMenu): boolean {
      if (item.children) {
        return true
      } else {
        return false
      }
    }
    return {
      hasChildrenMenu
    }
  }
})
</script>
