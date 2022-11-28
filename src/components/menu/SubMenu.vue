<template>
  <SubMenuItem v-if="hasChildrenMenu(item)" :index="item.path">
    <template #title>
      {{ item.name }}
    </template>
    <template v-for="childrenItem in item.children || []" :key="childrenItem.path">
      <SubMenu :item="childrenItem"></SubMenu>
    </template>
<<<<<<< HEAD
  </SubMenuItem>
  <MenuItem v-else :index="item.path"
    ><template #title>
      <span> {{ item.name }}</span>
    </template></MenuItem
  >
=======
  </ElSubMenu>
  <ElMenuItem v-else :index="item.path"><template #title>
      {{ item.name }}
    </template></ElMenuItem>
>>>>>>> 55dbfaf492b31d614904b4766737f95daa50310f
</template>

<script lang="ts">
// import { ElSubMenu, ElMenuItem } from 'element-plus'
import { SimpleMenu } from '@/types/menu'
import { defineComponent, PropType } from 'vue'
import SubMenuItem from './SubMenuItem.vue'
import MenuItem from './MenuItem.vue'

export default defineComponent({
  name: 'SubMenu',
  inheritAttrs: false,
  components: { SubMenuItem, MenuItem },
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
