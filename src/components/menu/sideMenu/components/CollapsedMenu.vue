<template>
  <ElMenu class="collapsed-menu"  :collapse="true" router :default-active="currentRoute.path">
    <template v-for="items in props.menus" :key="items.path">
      <CollapsedMenuItem :parent="true" :menu="items"></CollapsedMenuItem>
    </template>
  </ElMenu>
</template>

<script setup lang="ts">
import { ElMenu } from 'element-plus'
import { PropType } from 'vue'
import { useRouter } from 'vue-router'
import { Menu } from '#/list'
import CollapsedMenuItem from './CollapsedMenuItem.vue'

const props = defineProps({
  menus: {
    type: Array as PropType<Menu[]>,
    default: () => []
  }
})

const { currentRoute } = useRouter()
</script>

<style lang="less" scoped>
@import './collapsedMenu.less';
</style>
