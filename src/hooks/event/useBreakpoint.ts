import { screenEnum, screenSizeEnum, screenMap } from '@/enums/breakpointEnum'
import { ComputedRef, ref, computed, unref } from 'vue'
import { useEventListener } from './useEventListener'

let screenSize: ComputedRef<screenSizeEnum>
let screenWidth: ComputedRef<screenEnum>
let realWidth: ComputedRef<number>

export interface BreakpointParam {
  screenSize: ComputedRef<screenSizeEnum>
  screenWidth: ComputedRef<number>
  realWidth: ComputedRef<number>
  screenSizeEnum: typeof screenSizeEnum
  screenMap: Map<screenSizeEnum, screenEnum>
}

export function useBreakpoint() {
  return { screenSize, screenWidth, realWidth }
}

export function createBreakpointsListener(fn?: (opt: BreakpointParam) => void) {
  const screenRef = ref<screenSizeEnum>(screenSizeEnum.XL)
  const realWidthRef = ref(window.innerWidth)

  function getWindowWidth() {
    const width = document.body.clientWidth
    const xs = screenMap.get(screenSizeEnum.XS)!
    const sm = screenMap.get(screenSizeEnum.SM)!
    const md = screenMap.get(screenSizeEnum.MD)!
    const lg = screenMap.get(screenSizeEnum.LG)!
    const xl = screenMap.get(screenSizeEnum.XL)!
    if (width < xs) {
      screenRef.value = screenSizeEnum.XS
    } else if (width < sm) {
      screenRef.value = screenSizeEnum.SM
    } else if (width < md) {
      screenRef.value = screenSizeEnum.MD
    } else if (width < lg) {
      screenRef.value = screenSizeEnum.LG
    } else if (width < xl) {
      screenRef.value = screenSizeEnum.XL
    } else {
      screenRef.value = screenSizeEnum.XXL
    }
    realWidthRef.value = width
  }

  getWindowWidth()
  screenSize = computed(() => unref(screenRef))
  screenWidth = computed(() => screenMap.get(unref(screenRef)))
  realWidth = computed(() => unref(realWidthRef))

  useEventListener({
    el: window,
    name: 'resize',
    listener: () => {
      getWindowWidth()
      resizeFn()
    }
  })

  // 窗口宽度变换时执行的回调函数
  function resizeFn() {
    fn?.({
      screenSize,
      screenWidth,
      realWidth,
      screenMap,
      screenSizeEnum
    })
  }

  return {
    screenSize,
    screenWidth,
    realWidth
  }
}
