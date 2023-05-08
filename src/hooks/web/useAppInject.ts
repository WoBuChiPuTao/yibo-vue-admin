import { useAppProvider } from '@/components/application/useAppContext'
import { computed, unref } from 'vue'

export function useAppInject() {
  const { classPrefix, isMobile } = useAppProvider()

  return {
    getIsMobile: computed(() => unref(isMobile)),
    getClassPrefix: computed(() => unref(classPrefix))
  }
}
