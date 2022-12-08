<template>
  <ElScrollbar>
    <div>logo</div>
    <Menu :collapse="isCollapse">
      <template v-for="item in items" :key="item.path">
        <SubMenu :item="item"></SubMenu>
      </template>
    </Menu>
  </ElScrollbar>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import { ElScrollbar } from 'element-plus'
import Menu from '@/components/menu/Menu.vue'
import SubMenu from '@/components/menu/SubMenu.vue'
import { SimpleMenu } from '@/types/menu'
export default defineComponent({
  name: 'DemoMenu',
  components: { Menu, SubMenu, ElScrollbar },
  props: {
    items: {
      type: Array as PropType<SimpleMenu[]>,
      default: () => []
    }
  },
  setup() {
    const iconName = ref('Search')
    const isCollapse = ref(false)
    return {
      isCollapse,
      iconName
    }
  }
})
</script>

<style lang="less"></style>
