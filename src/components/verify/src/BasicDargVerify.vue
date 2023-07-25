<script setup lang="tsx">
import { computed, onUnmounted, reactive, ref, unref, useSlots } from 'vue'
import { basicDargProps } from './info'
import { ElIcon } from 'element-plus'
import { Check, Close, DArrowRight } from '@element-plus/icons-vue'
import { useEventListener } from '@/hooks/event/useEventListener'
import { useTimeoutFn } from '@/hooks/core/useTimeout'

const props = defineProps(basicDargProps)

const emits = defineEmits(['update:status', 'start', 'move', 'end', 'success', 'fail'])

defineExpose({
  revert
})

const slots = useSlots()

const dragStatus = computed({
  set: (val) => {
    emits('update:status', val)
  },
  get: () => props.status
})

const state = reactive({
  isMove: false,
  mouseDownX: 0,
  toLeft: false,
  startTime: 0,
  endTime: 0,
  operateNum: 0
})

const dargWarpRef = ref<HTMLDivElement | null>(null)
const actionRef = ref<HTMLDivElement | null>(null)
const fillBarRef = ref<HTMLDivElement | null>(null)

function handleEventListener() {
  const { removeEvent: removeMousemove } = useEventListener({
    el: document.documentElement,
    name: 'mousemove',
    listener: handleDragMove,
    wait: 0
  })

  const { removeEvent: removeTouchmove } = useEventListener({
    el: document.documentElement,
    name: 'touchmove',
    listener: handleDragMove,
    wait: 0
  })

  const { removeEvent: removeMouseup } = useEventListener({
    el: document.documentElement,
    name: 'mouseup',
    listener: handleDragOver
  })
  const { removeEvent: removeTouchend } = useEventListener({
    el: document.documentElement,
    name: 'touchend',
    listener: handleDragOver
  })

  onUnmounted(() => {
    removeMousemove()
    removeTouchmove()
    removeMouseup()
    removeTouchend()
  })
}

handleEventListener()

function handleDragStart(e: MouseEvent | TouchEvent) {
  const status = unref(dragStatus)
  if (status !== 'default') {
    return
  }
  const actionEl = unref(actionRef)
  if (!actionEl) return
  emits('start', e)
  state.mouseDownX = getEventPageX(e) - (parseInt(actionEl.style.left.replace('px', '')) || 0)
  state.startTime = new Date().getTime()
  state.isMove = true
}

function getEventPageX(e: MouseEvent | TouchEvent) {
  return (e as MouseEvent).pageX || (e as TouchEvent).touches[0].pageX
}

function handleDragMove(e: MouseEvent | TouchEvent) {
  const { isMove, mouseDownX } = state
  if (!isMove) return
  const actionEl = unref(actionRef)
  const barEl = unref(fillBarRef)
  if (!actionEl || !barEl) return
  const { maxMoveDistance, warpWidth, actionWidth } = getMoveLimit()
  const moveX = getEventPageX(e) - mouseDownX

  emits('move', e, moveX, maxMoveDistance, warpWidth, actionWidth)

  if (moveX >= 0 && moveX < maxMoveDistance) {
    actionEl.style.left = `${moveX}px`
    barEl.style.width = `${moveX + actionWidth / 2}px`
  } else if (moveX > maxMoveDistance) {
    actionEl.style.left = `${maxMoveDistance}px`
    barEl.style.width = `${warpWidth - actionWidth / 2}px`
  } else {
    actionEl.style.left = '0px'
    barEl.style.width = '0px'
  }
}

function getMoveLimit() {
  const dargWarpEl = unref(dargWarpRef)
  const actionEl = unref(actionRef)
  if (!dargWarpEl || !actionEl) {
    return { warpWidth: 0, actionWidth: 0, maxMoveDistance: 0 }
  }
  const warpWidth = dargWarpEl.clientWidth || dargWarpEl.offsetWidth
  const actionWidth = actionEl.clientWidth || actionEl.offsetWidth
  return {
    warpWidth,
    actionWidth,
    maxMoveDistance: warpWidth - actionWidth
  }
}

function handleDragOver(e: MouseEvent | TouchEvent) {
  const { isMove, startTime, mouseDownX } = state
  if (!isMove) return

  const actionEl = unref(actionRef)
  const barEl = unref(fillBarRef)
  if (!actionEl || !barEl) return
  const { maxMoveDistance, warpWidth, actionWidth } = getMoveLimit()
  const moveX = getEventPageX(e) - mouseDownX

  state.endTime = new Date().getTime()
  const dragTime = (state.endTime - startTime) / 1000
  emits('end', e, Number(dragTime.toFixed(1)), moveX, maxMoveDistance, warpWidth, actionWidth)

  state.isMove = false
  state.operateNum += 1
}

function revert() {
  state.isMove = false
  state.toLeft = false
  state.startTime = 0
  state.endTime = 0
  state.mouseDownX = 0
  state.operateNum = 0

  dragStatus.value = 'default'

  const actionEl = unref(actionRef)
  const barEl = unref(fillBarRef)
  if (!actionEl || !barEl) return
  state.toLeft = true
  useTimeoutFn(() => {
    state.toLeft = false
    actionEl.style.left = '0'
    barEl.style.width = '0'
  }, 100)
}

const renderContent = () => {
  const { text, successText, failedText, operateLimit } = props

  const cls = ['darg-verify-content']
  if (state.operateNum > operateLimit) {
    return <span class={cls}>失败过多请点击重试</span>
  }
  const status = unref(dragStatus)
  const isSuccess = status === 'success'
  const isFailed = status === 'fail'

  return <span class={cls}>{isSuccess ? successText : isFailed ? failedText : text}</span>
}

const renderFillBar = () => {
  const { toLeft, operateNum } = state
  const cls = ['darg-verify-bar']
  if (operateNum > props.operateLimit) {
    return <div class="darg-verify-exceeds" style={{ height: `${props.height}px` }}></div>
  }
  if (toLeft) {
    cls.push('to-left')
  }
  return (
    <>
      <div ref={fillBarRef} class={cls} style={{ height: `${props.height}px` }}></div>
    </>
  )
}

const renderAction = () => {
  const { toLeft, operateNum } = state
  if (operateNum > props.operateLimit) {
    return <></>
  }
  const status = unref(dragStatus)
  const isSuccess = status === 'success'
  const isFailed = status === 'fail'

  const renderIcon = () => {
    if (isSuccess) {
      return slots.successIcon ? (
        <slot name={'successIcon'}></slot>
      ) : (
        <ElIcon size={20}>
          <Check></Check>
        </ElIcon>
      )
    } else if (isFailed) {
      return slots.failedIcon ? (
        <slot name={'failedIcon'}></slot>
      ) : (
        <ElIcon size={20}>
          <Close></Close>
        </ElIcon>
      )
    } else {
      return slots.icon ? (
        <slot name={'icon'}></slot>
      ) : (
        <ElIcon size={20}>
          <DArrowRight></DArrowRight>
        </ElIcon>
      )
    }
  }
  const cls = ['darg-verify-action']
  if (toLeft) {
    cls.push('to-left')
  }
  return (
    <>
      <div
        ref={actionRef}
        class={cls}
        style={{ height: `${props.height}px`, width: `${props.height}px` }}
        onMousedown={handleDragStart}
        onTouchstart={handleDragStart}
      >
        {renderIcon()}
      </div>
    </>
  )
}

const App = () => {
  const status = unref(dragStatus)
  const cls = ['darg-verify']

  if (status === 'success') {
    cls.push('success')
  } else if (status === 'fail') {
    cls.push('fail')
  }
  return (
    <div
      ref={dargWarpRef}
      class={cls}
      style={{ height: `${props.height}px`, lineHeight: `${props.height}px` }}
    >
      {renderFillBar()}
      {renderContent()}
      {renderAction()}
    </div>
  )
}
</script>

<template>
  <App> </App>
</template>

<style lang="less">
.darg-verify {
  position: relative;
  text-align: center;

  background-color: var(--el-color-info-light-8);

  &-content {
    position: absolute;
    top: 0;
    transform: translateX(-50%);
    user-select: none;
  }

  &-bar {
    position: absolute;
    top: 0;
    left: 0px;
    width: 0;
    background-color: var(--el-color-primary);
    &.to-left {
      width: 0 !important;
      transition: width 0.5s;
    }
  }

  &-action {
    position: absolute;
    top: 0;
    left: 0px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: move;
    background-color: var(--el-bg-color);

    &.to-left {
      left: 0 !important;
      transition: left 0.5s;
    }
  }

  &-exceeds {
    width: 100%;
    background-color: var(--el-color-error-light-3);
  }
}
</style>
