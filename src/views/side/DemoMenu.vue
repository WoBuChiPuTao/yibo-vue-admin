<template>
  <div>logo</div>
  <ElContainer>
    <ElMenu :collapse="isCollapse">
      <template v-for="item in items" :key="item.path">
        <SubMenu :item="item"></SubMenu>
      </template>
    </ElMenu>
  </ElContainer>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import { ElMenu, ElContainer } from 'element-plus'
import SubMenu from '@/components/menu/SubMenu.vue'
import { SimpleMenu } from '@/types/menu'
export default defineComponent({
  name: 'DemoMenu',
  components: { ElMenu, SubMenu, ElContainer },
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
