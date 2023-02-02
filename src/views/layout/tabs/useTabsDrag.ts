import { useSortable } from '@/hooks/web/useSortable'
import { useTabStore } from '@/store/modules/tabs'
import { isNullOrUnDef } from '@/utils/is'
import { nextTick } from 'vue'

export function useTabsDarg() {
  const tabStore = useTabStore()
  nextTick(() => {
    const el = document.querySelector('.el-tabs__nav') as HTMLElement
    console.log('.el-tabs__nav', el)
    const { initSortable } = useSortable(el, {
      //   filter: (e: ChangeEvent) => {
      //     const text = e?.target?.innerText
      //     if (!text) return false
      //     return true
      //   },
      onEnd: (evt) => {
        const { oldIndex, newIndex } = evt
        if (
          isNullOrUnDef(oldIndex) ||
          isNullOrUnDef(newIndex) ||
          oldIndex === newIndex
        ) {
          return
        }
        tabStore.sortTabs(oldIndex, newIndex)
      }
    })
    initSortable()
  })
}
