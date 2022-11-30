<template>
  <SubMenuItem v-if="hasChildrenMenu(item)">
    <template #title>
      <EIcon :icon="item.icon"></EIcon>
      <span> {{ item.name }}</span>
    </template>
    <template
      v-for="childrenItem in item.children || []"
      :key="childrenItem.path"
    >
      <SubMenu :item="childrenItem"></SubMenu>
    </template>
  </SubMenuItem>
  <MenuItem v-else
    ><template #title>
      <EIcon :icon="item.icon"></EIcon>
      <span> {{ item.name }}</span>
    </template></MenuItem
  >
</template>

<script lang="ts">
// import { ElSubMenu, ElMenuItem } from 'element-plus'
import { SimpleMenu } from '@/types/menu'
import { defineComponent, PropType } from 'vue'
import SubMenuItem from './SubMenuItem.vue'
import MenuItem from './MenuItem.vue'
import EIcon from '@/components/icons/EIcon.vue'

export default defineComponent({
  name: 'SubMenu',
  components: { SubMenuItem, MenuItem, EIcon },
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
        console.log('111')
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
