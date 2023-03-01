<template>
  <div class="side-logo">logo</div>
  <ElScrollbar>
    <Menu
      :collapsed="collapsed"
      @select-menu-item="handleSelected"
      :menus="items"
    >
      <template v-for="item in items" :key="item.path">
        <SubMenu :item="item" :parent="true" :collapsed="collapsed"></SubMenu>
      </template>
    </Menu>
  </ElScrollbar>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import { ElScrollbar } from 'element-plus'
import Menu from '@/components/menu/Menu.vue'
import SubMenu from '@/components/menu/SubMenu.vue'
import { Menu as MenuType } from '@/types/menu'
import { useGo } from '@/hooks/web/usePage'
export default defineComponent({
  name: 'DemoMenu',
  components: { Menu, SubMenu, ElScrollbar },
  props: {
    items: {
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
    const iconName = ref('Search')

    function handleSelected(key: string) {
      go(key)
    }

    return {
      iconName,
      handleSelected
    }
  }
})
</script>

<style lang="less">
.side-logo {
  height: 48px;
  padding: 10px 4px 10px 10px;
  color: white;
}
</style>
