import { ref } from 'vue'
import { useDebounceFn, useThrottleFn } from '@vueuse/core'

export type RemoveEventFn = () => void

export interface EventParams {
  el: Element | Window | any
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
  useCapture,
  isDebounce = true,
  wait = 80
}: EventParams) {
  const isAddRef = ref(false)

  if (el) {
    const element = ref(el as Element)
    const handleFn = isDebounce
      ? useDebounceFn<EventListener>(listener, wait)
      : useThrottleFn<EventListener>(listener, wait)
    const handler = wait ? handleFn : listener
    const addEventListen = (e: Element) => {
      e.addEventListener(name, handler, useCapture)
    }
    const removeEventListen = (e: Element) => {
      isAddRef.value = true
      e.removeEventListener(name, handler, useCapture)
    }
  }
}
