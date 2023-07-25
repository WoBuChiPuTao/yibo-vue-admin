import { ref, unref, watch } from 'vue'
import { useDebounceFn, useThrottleFn } from '@vueuse/core'

export type RemoveEventFn = () => void

interface EventListenerFn<T extends Event = Event> {
  (evt: T): void
}

type EventName = string & HTMLElementEventMap

export interface EventParams<K, T extends Event> {
  el: Window | Element | Document
  name: K
  listener: EventListenerFn<T>
  useCapture?: boolean
  autoRemove?: boolean
  isDebounce?: boolean
  wait?: number
}

export function useEventListener<K extends keyof EventName, T extends Event>({
  el = window,
  name,
  listener,
  useCapture = false,
  autoRemove = true,
  isDebounce = true,
  wait = 80
}: EventParams<K, T>): { removeEvent: RemoveEventFn } {
  const isAddRef = ref(false)
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  let remove: RemoveEventFn = () => {}
  if (el) {
    const refEl = ref(el as Element)
    const handleFn = isDebounce ? useDebounceFn(listener, wait) : useThrottleFn(listener, wait)
    const handler = wait ? handleFn : listener
    const addEventListener = (e: any) => {
      e.addEventListener(name, handler, useCapture)
    }
    const removeEventListener = (e: any) => {
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
