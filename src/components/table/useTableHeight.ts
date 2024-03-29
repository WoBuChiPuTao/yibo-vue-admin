import { getEloffset } from '@/hooks/dom/useElOffset'
import { useWindowSizeFn } from '@/hooks/event/useWindowSizeFn'
import { tryOnMounted, useDebounceFn } from '@vueuse/core'
import { ComputedRef, Ref, nextTick, ref, unref, watch } from 'vue'

export function useTableHeight(
  tableRef: Ref<ElementRef>,
  getDataSourceRef: ComputedRef<Recordable[]> | Ref<Recordable[]> | Recordable[],
  toBottom = 90
) {
  const tableHeight = ref('100%')

  watch(
    () => (unref(getDataSourceRef) as Recordable[])?.length,
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
    const tableData = unref(getDataSourceRef) as Recordable[]

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

    // 头部距离可视页面底部和顶部距离
    const { top, bottomToVisibleWindow } = getEloffset(headEl)
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
    // nextTick(() => {
    //   debounceRedoHeight()
    // })
  })
  return { redoHeight, tableHeight }
}
