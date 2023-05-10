import { useAppProvider } from '@/components/application/useAppContext'
import { computed, unref } from 'vue'

export function useAppInject() {
  const { isMobile } = useAppProvider()

  return {
    getIsMobile: computed(() => unref(isMobile))
  }
}
