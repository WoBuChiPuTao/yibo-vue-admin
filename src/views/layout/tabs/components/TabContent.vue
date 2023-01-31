<template>
  <ElDropdown :trigger="getTrigger" size="small" @command="handleMenuEvent">
    <div v-if="getIsTab" @contextmenu="handleContext" @click="handleContext">
      <span :class="activeClass">{{ props.tabItem.meta.title }}</span>
    </div>
    <template #dropdown>
      <ElDropdownMenu>
        <template v-for="item in getDropList" :key="item.text">
          <ElDropdownItem
            :icon="item.icon"
            :disabled="item.disabled"
            :command="item.event"
            :divided="item.divided"
          >
            {{ item.text }}</ElDropdownItem
          >
        </template>
      </ElDropdownMenu>
    </template>
  </ElDropdown>
</template>

<script setup lang="ts">
import { ElDropdown, ElDropdownMenu, ElDropdownItem } from 'element-plus'
import { computed, PropType, unref } from 'vue'
import { RouteLocationNormalized } from 'vue-router'
import { useTabDropdown } from '../useTabDropDown'
const props = defineProps({
  tabItem: {
    type: Object as PropType<RouteLocationNormalized>,
    default: null
  },
  isActive: {
    type: Boolean,
    default: false
  },
  isExtra: Boolean
})

const activeClass = computed(() => {
  return props.isActive ? 'active' : null
})

const getIsTab = computed(() => {
  return !props.isExtra
})
const getTrigger = computed((): ('contextmenu' | 'click' | 'hover')[] => {
  return unref(getIsTab) ? ['contextmenu'] : ['click']
})
const { getDropList, handleContextMenu, handleMenuEvent } = useTabDropdown(
  props.tabItem,
  getIsTab
)

function handleContext(e: Event) {
  props.tabItem && handleContextMenu(props.tabItem)(e)
}
</script>

<style lang="less">
.active {
  color: var(--el-color-primary);
}
</style>
