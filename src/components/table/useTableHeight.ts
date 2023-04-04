import { getEloffset } from '@/hooks/dom/useElOffset'
import { useWindowSizeFn } from '@/hooks/event/useWindowSizeFn'
import { tryOnMounted, useDebounceFn } from '@vueuse/core'
import { ComputedRef, Ref, nextTick, ref, unref, watch } from 'vue'

export function useTableHeight(
  tableRef: Ref<ElementRef>,
  getDataSourceRef: ComputedRef<Recordable[]>,
  toBottom = 54
) {
  const tableHeight = ref('100%')

  watch(
    () => unref(getDataSourceRef)?.length,
    () => {
      debounceRedoHeight()
    },
    {
      flush: 'post'
    }
  )

  const debounceRedoHeight = useDebounceFn(redoHeight, 100)

  function redoHeight() {
    nextTick(() => {
      calcTableHeight()
    })
  }

  let bodyEl: HTMLElement | null

  async function calcTableHeight() {
    const tableData = unref(getDataSourceRef)

    const table = unref(tableRef)
    if (!table) return

    const tableEl: Element = table.$el
    if (!tableEl) return

    if (!bodyEl) {
      bodyEl = tableEl.querySelector('.el-table__body-wrapper')
      if (!bodyEl) return
    }

    if (!unref(tableData) || tableData.length === 0) return

    bodyEl!.style.height = 'unset'
    await nextTick()

    const headEl = tableEl.querySelector('.el-table__header-wrapper')
    if (!headEl) return

    // 自定义table到页面底部的距离
    const tableToPageBottomHeight = toBottom
    // 头部高度
    const headerHegiht = (headEl as HTMLElement).offsetHeight

    // 头部距离可视页面底部距离
    const headrToBottom = getEloffset(headEl).bottomToVisibleWindow

    const height = headrToBottom - headerHegiht - tableToPageBottomHeight
    // table主体高度
    tableHeight.value = `${height}px`
  }
  useWindowSizeFn(calcTableHeight, 200)
  tryOnMounted(() => {
    calcTableHeight()
    nextTick(() => {
      debounceRedoHeight()
    })
  })
  return { redoHeight, tableHeight }
}
