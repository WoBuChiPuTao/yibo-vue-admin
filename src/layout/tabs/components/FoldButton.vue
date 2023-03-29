<template>
  <span @click="handleFold">
    <EIcon :icon="getIcon.icon" :post-icon="getIcon.entity"></EIcon>
  </span>
</template>

<script setup lang="ts">
import materialSymbolsFullscreen from '@iconify-icons/material-symbols/fullscreen'
import materialSymbolsFullscreenExit from '@iconify-icons/material-symbols/fullscreen-exit'
import { computed, unref } from 'vue'
import { useHeaderSetting } from '@/hooks/setting/useHeaderSetting'
import { useSiderSetting } from '@/hooks/setting/useSiderSetting'

const { getShowHeader, setHeaderSetting } = useHeaderSetting()
const { getShowSideMenu, setSiderSetting } = useSiderSetting()

const isFull = computed(() => {
  return !unref(getShowHeader) && !unref(getShowSideMenu)
})

const getIcon = computed(() => {
  return {
    icon: isFull.value ? 'material-symbols:fullscreen-exit' : 'material-symbols:fullscreen',
    entity: isFull.value ? materialSymbolsFullscreenExit : materialSymbolsFullscreen
  }
})

function handleFold() {
  setHeaderSetting({ show: !unref(isFull) })
  setSiderSetting({ show: !unref(isFull) })
}
</script>
