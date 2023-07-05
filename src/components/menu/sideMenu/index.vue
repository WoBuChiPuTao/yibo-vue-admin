<template>
  <Menu v-if="!collapsed" @select-menu-item="handleSelected" :menus="menus">
    <template v-for="item in menus" :key="item.path">
      <SubMenu :item="item" :parent="true" :collapsed="collapsed"></SubMenu>
    </template>
  </Menu>
  <CollapsedMenu v-else :menus="menus"></CollapsedMenu>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import Menu from '@/components/menu/sideMenu/SideMenuList.vue'
import SubMenu from '@/components/menu/sideMenu/SubMenu.vue'
import { Menu as MenuType } from '#/list'
import { useGo } from '@/hooks/web/usePage'
import CollapsedMenu from './components/CollapsedMenu.vue'
export default defineComponent({
  name: 'SideMenu',
  components: { Menu, SubMenu, CollapsedMenu },
  props: {
    menus: {
      type: Array as PropType<MenuType[]>,
      default: () => []
    },
    collapsed: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    const go = useGo()

    function handleSelected(key: string) {
      go(key)
    }

    return {
      handleSelected
    }
  }
})
</script>
