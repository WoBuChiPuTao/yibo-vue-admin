import { setupEcharts, RenderType } from '@/utils/lib/echarts'
import { computed, nextTick, ref, Ref, unref, watch } from 'vue'
import { useMenuSetting } from '../setting/useMenuSetting'
import { useThemeMode } from '../setting/useTheme'
import { SVGRenderer, CanvasRenderer } from 'echarts/renderers'
import { EChartsOption } from 'echarts/types/dist/shared'
import echarts, { ECharts } from 'echarts'
import { useEventListener } from '../event/useEventListener'
import { tryOnUnmounted, useDebounceFn, useTimeoutFn } from '@vueuse/core'

export function useEchart(
  elRef: Ref<HTMLDivElement>,
  renderer?: RenderType,
  theme: 'light' | 'dark' | 'default' = 'default'
) {
  const echarts = setupEcharts()
  echarts.use(renderer === RenderType.CanvasRenderer ? CanvasRenderer : SVGRenderer)

  const { getThemeMode: getSysThemeMode } = useThemeMode()
  const { getCollapsed } = useMenuSetting()

  const getThemeMode = computed(() => (theme === 'default' ? getSysThemeMode.value : theme))

  let chartInstance: echarts.ECharts | null = null

  const cacheOptions = ref({}) as Ref<EChartsOption>
  const getOptions = computed(() => {
    if (getThemeMode.value !== 'dark') {
      return cacheOptions.value
    }
    return {
      backgroundColor: 'transparent',
      ...cacheOptions.value
    }
  })

  const resizeFn = useDebounceFn(resize, 200)
  let removeResizeFn: Fn

  function initEcharts(t = theme) {
    const el = unref(elRef)
    if (!el) {
      return
    }
    console.log('el', el.offsetHeight)
    chartInstance = echarts.init(el, t) as unknown as ECharts
    const { removeEvent } = useEventListener({
      el: window,
      name: 'resize',
      listener: resizeFn
    })
    removeResizeFn = removeEvent
    if (el.offsetWidth === 0 || el.offsetHeight === 0) {
      useTimeoutFn(() => {
        resizeFn()
      }, 30)
    }
  }

  function setOptions(options: EChartsOption, clear = true) {
    cacheOptions.value = options
    if (unref(elRef)?.offsetHeight === 0) {
      setTimeout(() => {
        setOptions(options)
      }, 30)
      return
    }
    nextTick(() => {
      !chartInstance && initEcharts(getThemeMode.value)
      if (!chartInstance) return
      chartInstance?.showLoading()
      clear && chartInstance.clear()
      chartInstance.setOption(unref(getOptions))
      chartInstance.hideLoading()
    })
  }

  function resize() {
    if (unref(elRef).offsetHeight === 0) {
      setTimeout(() => {
        resize()
      }, 50)
      return
    }
    chartInstance?.resize({
      animation: {
        duration: 300,
        easing: 'quadraticIn'
      }
    })
  }

  function getInstance(): echarts.ECharts | null {
    if (!chartInstance) {
      initEcharts(getThemeMode.value)
    }
    return chartInstance
  }

  watch(getThemeMode, () => {
    if (chartInstance) {
      chartInstance.dispose()
      chartInstance = null
      // initEcharts(theme)
      setOptions(cacheOptions.value)
    }
  })

  watch(getCollapsed, () => {
    useTimeoutFn(() => {
      resizeFn()
    }, 300)
  })

  tryOnUnmounted(() => {
    if (!chartInstance) return
    removeResizeFn()
    chartInstance.dispose()
    chartInstance = null
  })

  return {
    getInstance,
    setOptions,
    echarts,
    resize
  }
}
