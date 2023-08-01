import { getEloffset } from '@/hooks/dom/useElOffset'
import { useWindowSizeFn } from '@/hooks/event/useWindowSizeFn'
import { tryOnMounted, useDebounceFn } from '@vueuse/core'
import { Ref, nextTick, ref, unref } from 'vue'

export function useTableHeight(
  tableRef: Ref<ElementRef>,
  toBottom = 90,
  version = 1 // ElTable 和 ElTableV2
) {
  const tableHeight = ref('100%')

  const debounceRedoHeight = useDebounceFn(redoHeight, 100)

  function redoHeight() {
    nextTick(() => {
      calcTableHeight()
    })
  }

  let bodyEl: HTMLElement | null

  async function calcTableHeight() {
    const table = unref(tableRef)
    if (!table) return

    const tableEl: Element = table.$el
    if (!tableEl) return

    if (!bodyEl) {
      bodyEl = tableEl.querySelector(
        version === 1 ? '.el-table__body-wrapper' : '.el-table-v2__body'
      )
      if (!bodyEl) return
    }
    bodyEl!.style.height = 'unset'

    await nextTick()

    // 头部距离可视页面底部和顶部距离
    const { top, bottomToVisibleWindow } = getEloffset(tableEl)
    // 如果距离顶部为零则页面已缓存隐藏
    if (!top) {
      setTimeout(() => {
        calcTableHeight()
      }, 200)
      return
    }

    // 自定义table到页面底部的距离
    const tableToPageBottomHeight = toBottom

    const height = bottomToVisibleWindow - tableToPageBottomHeight
    // table主体高度
    tableHeight.value = `${height}px`
  }

  useWindowSizeFn(calcTableHeight, 200)
  tryOnMounted(() => {
    debounceRedoHeight()
  })
  return { redoHeight, tableHeight }
}
