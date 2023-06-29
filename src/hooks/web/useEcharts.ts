import echarts, { RenderType } from '@/utils/lib/echarts'
import { computed, nextTick, ref, Ref, unref, watch } from 'vue'
import { useThemeMode } from '../setting/useTheme'
// import { useEventListener } from '../event/useEventListener'
import { tryOnUnmounted, useDebounceFn, useTimeoutFn } from '@vueuse/core'
import { EChartsOption } from 'echarts/types/dist/echarts'

export function useEchart(
  elRef: Ref<HTMLDivElement | undefined>,
  renderer: RenderType = RenderType.SVGRenderer,
  theme: 'light' | 'dark' | 'default' = 'default'
) {
  const { getThemeMode: getSysThemeMode } = useThemeMode()

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

  const resizeFn = useDebounceFn(resize, 100)
  let removeResizeFn: Fn

  function initEcharts(t = theme) {
    const el = unref(elRef)
    if (!el) {
      return
    }
    chartInstance = echarts.init(el, t, { renderer }) as unknown as echarts.ECharts
    // 监听window的resize事件
    // const { removeEvent } = useEventListener({
    //   el: window,
    //   name: 'resize',
    //   listener: resizeFn
    // })
    // removeResizeFn = removeEvent
    // 由于dom元素没有resize事件将其修改为ResizeObserver
    const resizeObserver = new ResizeObserver(() => resizeFn())
    resizeObserver.observe(el)
    removeResizeFn = () => {
      resizeObserver.unobserve(el)
    }

    if (el.offsetWidth === 0 || el.offsetHeight === 0) {
      useTimeoutFn(() => {
        resizeFn()
      }, 30)
    }
  }

  function setOptions(options: EChartsOption, clear = true) {
    cacheOptions.value = options
    const el = unref(elRef)
    if (!el || el.offsetHeight === 0 || el.offsetWidth === 0) {
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
    const el = unref(elRef)
    if (!el || el?.offsetHeight === 0 || el?.offsetWidth === 0) {
      return
    }
    requestAnimationFrame(() => {
      chartInstance?.resize({
        animation: {
          duration: 300,
          easing: 'quadraticIn'
        }
      })
    })
  }

  function getInstance(): echarts.ECharts | null {
    if (!chartInstance) {
      initEcharts(getThemeMode.value)
    }
    return chartInstance
  }

  // 监听主题的变化
  watch(getThemeMode, () => {
    if (chartInstance) {
      chartInstance.dispose()
      chartInstance = null
      setOptions(cacheOptions.value)
    }
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
