<script lang="ts">
import { useRoute } from 'vue-router'
import { ref, unref, onMounted, nextTick, defineComponent } from 'vue'

export default defineComponent({
  name: 'FrameView',
  setup() {
    const loading = ref(true)
    const currentRoute = useRoute()
    const frameSrc = ref<string>('')
    const frameRef = ref<HTMLElement | null>(null)

    if (unref(currentRoute.meta)?.frameSrc) {
      frameSrc.value = unref(currentRoute.meta)?.frameSrc as string
    }

    function hideLoading() {
      loading.value = false
    }

    function init() {
      nextTick(() => {
        const iframe = unref(frameRef)
        if (!iframe) return
        const _frame = iframe as any
        if (_frame.attachEvent) {
          _frame.attachEvent('onload', () => {
            hideLoading()
          })
        } else {
          iframe.onload = () => {
            hideLoading()
          }
        }
      })
    }

    onMounted(() => {
      init()
    })

    return {
      loading,
      frameRef,
      frameSrc
    }
  }
})
</script>

<template>
  <div class="frame" v-loading="loading">
    <iframe :src="frameSrc" class="frame-iframe" ref="frameRef" />
  </div>
</template>

<style lang="less" scoped>
.frame {
  height: 100%;

  .frame-iframe {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    overflow: hidden;
    border: 0;
  }
}

.main-content {
  margin: 2px 0 0 !important;
}
</style>
