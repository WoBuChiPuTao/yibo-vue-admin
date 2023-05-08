<script lang="ts">
import { defineComponent, ref, toRefs } from 'vue'
import { createAppProvider } from './useAppContext'
import { createBreakpointsListener } from '@/hooks/event/useBreakpoint'

const props = {
  classPrefix: {
    type: String,
    default: 'app'
  }
}

export default defineComponent({
  name: 'AppProvider',
  inheritAttrs: false,
  props,
  setup(props, { slots }) {
    const isMobile = ref(false)

    // 监听窗口宽度变换
    createBreakpointsListener(({ screenSizeEnum, realWidth, screenMap }) => {
      const width = screenMap.get(screenSizeEnum.LG)
      if (width) {
        isMobile.value = realWidth.value - 5 < width
      }
      console.log('isMobile', isMobile.value)
    })

    const { classPrefix } = toRefs(props)

    createAppProvider({ classPrefix, isMobile })

    return () => slots.default?.()
  }
})
</script>
