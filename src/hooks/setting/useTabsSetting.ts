import { useAppStore } from '@/store/modules/app'
import { computed } from 'vue'

export function useTabsSetting() {
  const appStore = useAppStore()

  const getShowTabs = computed(() => appStore.getTabsSetting.show)
  const getTabsHeight = computed(() => appStore.getTabsSetting.tabsHeight)
  const getCanDrag = computed(() => appStore.getTabsSetting.canDrag)

  return {
    getShowTabs,
    getCanDrag,
    getTabsHeight
  }
}
