import { tryOnMounted, tryOnUnmounted, useDebounceFn } from '@vueuse/core'

export function useWindowSizeFn(fn: Fn, wait = 250, immediate = false) {
  let handleFn = () => {
    fn()
  }
  const handleSize = useDebounceFn(handleFn, wait)
  handleFn = handleSize

  const start = () => {
    if (immediate) {
      handleFn()
    }
    window.addEventListener('resize', handleFn)
  }

  const stop = () => {
    window.removeEventListener('resize', handleFn)
  }

  tryOnMounted(() => {
    start()
  })

  tryOnUnmounted(() => {
    stop()
  })
  return [start, stop]
}
