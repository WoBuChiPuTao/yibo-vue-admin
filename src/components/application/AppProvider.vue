<script lang="ts">
import { defineComponent, ref } from 'vue'
import { createAppProvider } from './useAppContext'
import { createBreakpointsListener } from '@/hooks/event/useBreakpoint'

export default defineComponent({
  name: 'AppProvider',
  inheritAttrs: false,
  setup(props, { slots }) {
    const isMobile = ref(false)

    // 监听窗口宽度变换
    createBreakpointsListener(({ screenSizeEnum, realWidth, screenMap }) => {
      const width = screenMap.get(screenSizeEnum.LG)
      if (width) {
        isMobile.value = realWidth.value - 5 < width
      }
    })

    createAppProvider({ isMobile })

    return () => slots.default?.()
  }
})
</script>
