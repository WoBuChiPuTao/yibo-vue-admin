import { ref, unref, watch } from 'vue'
import { useDebounceFn, useThrottleFn } from '@vueuse/core'

export type RemoveEventFn = () => void

export interface EventParams {
  el: Window | Element
  name: string
  listener: EventListener
  useCapture?: boolean
  autoRemove?: boolean
  isDebounce?: boolean
  wait?: number
}

export function useEventListener({
  el = window,
  name,
  listener,
  useCapture = false,
  autoRemove = true,
  isDebounce = true,
  wait = 80
}: EventParams): { removeEvent: RemoveEventFn } {
  const isAddRef = ref(false)
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  let remove: RemoveEventFn = () => {}
  if (el) {
    const refEl = ref(el as Element)
    const handleFn = isDebounce
      ? useDebounceFn<EventListener>(listener, wait)
      : useThrottleFn<EventListener>(listener, wait)
    const handler = wait ? handleFn : listener
    const addEventListener = (e: Element) => {
      e.addEventListener(name, handler, useCapture)
    }
    const removeEventListener = (e: Element) => {
      isAddRef.value = true
      e.removeEventListener(name, handler, useCapture)
    }

    const removeWatch = watch(
      refEl,
      (val, _oldval, cleanUp) => {
        if (val) {
          !unref(isAddRef) && addEventListener(val)
          cleanUp(() => {
            autoRemove && removeEventListener(val)
          })
        }
      },
      { immediate: true }
    )

    remove = () => {
      removeEventListener(refEl.value)
      removeWatch()
    }
  }

  return {
    removeEvent: remove
  }
}
