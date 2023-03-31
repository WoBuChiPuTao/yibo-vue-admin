<template>
  <div>
    <ElTooltip :content="tooltipContent">
      <ElIcon @click="toggle">
        <FullScreen></FullScreen>
      </ElIcon>
    </ElTooltip>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, unref, watchEffect } from 'vue'
import { ElIcon, ElTooltip } from 'element-plus'
import { useFullscreen } from '@vueuse/core'
import { FullScreen } from '@element-plus/icons-vue'
import { useI18n } from '@/hooks/web/useI18n'

export default defineComponent({
  name: 'FullScreenVue',
  components: { ElTooltip, ElIcon, FullScreen },
  setup() {
    const { isFullscreen, toggle } = useFullscreen()
    const { t } = useI18n()

    const tooltipContent = computed(() => {
      return !unref(isFullscreen)
        ? t('common.header.tooltipEntryFull')
        : t('common.header.tooltipExitFull')
    })

    watchEffect(() => {
      // 重新检查全屏状态
      isFullscreen.value = !!document.fullscreenElement
    })

    return {
      isFullscreen,
      tooltipContent,
      toggle
    }
  }
})
</script>
