<template>
  <div ref="mapRef" class="container"></div>
</template>

<script lang="ts">
import { defineComponent, nextTick, onMounted, ref, unref } from 'vue'
import { useScript } from '@/hooks/web/useScript'

const MAP_URL =
  'https://webapi.amap.com/maps?v=1.4.15&key=7cee3e77f35b217a21533a427e5b9a63'

export default defineComponent({
  name: 'GaoDeMap',
  setup() {
    const mapRef = ref<HTMLDivElement | null>(null)
    const { toPromise: toMapPromise } = useScript({ src: MAP_URL })

    async function initMap() {
      await toMapPromise()
      await nextTick()
      const mapEl = unref(mapRef)
      if (!mapEl) return
      const AMap = (window as any).AMap

      // eslint-disable-next-line no-new
      new AMap.Map(mapEl, {
        zoom: 18, // 初始化地图层级
        center: [121.530315, 31.223483],
        viewMode: '3D'
      })
    }

    onMounted(() => {
      initMap()
    })
    return {
      mapRef
    }
  }
})
</script>

<style lang="less" scoped>
.container {
  height: 100%;
  width: 100%;
}
</style>
