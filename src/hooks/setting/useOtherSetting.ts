import { useAppStore } from '@/store/modules/app'
import { computed } from 'vue'

export function useOtherSetting() {
  const appStore = useAppStore()
  const getPageLoading = computed(() => appStore.getPageLoading)

  return {
    getPageLoading
  }
}
