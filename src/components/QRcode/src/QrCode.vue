<template>
  <div>
    <component :is="drawType" ref="draw"></component>
  </div>
</template>

<script setup lang="ts">
import { PropType, Ref, onMounted, ref, unref, watch } from 'vue'
import { DrawType, RenderImageParam } from './types'
import { QRCodeRenderersOptions } from 'qrcode'
import { useDrawQrcode } from './draw'

const props = defineProps({
  value: {
    type: [String, Array] as PropType<string | any[]>,
    default: null
  },
  // img格式不能插入图片
  drawType: {
    type: String as PropType<DrawType>,
    default: 'canvas'
  },
  // 参数
  options: {
    type: Object as PropType<QRCodeRenderersOptions>,
    default: () => ({})
  },
  // 宽度
  width: {
    type: Number as PropType<number>,
    default: 200
  },
  // 图片
  image: {
    type: [String, Object] as PropType<string | RenderImageParam>,
    default: ''
  }
})

const emit = defineEmits(['success', 'error'])

const draw = ref<HTMLCanvasElement | HTMLImageElement | null>(null)

async function createQrcode() {
  if (!unref(draw)) {
    return
  }
  const { drawType: type, value: content, width, options, image } = props
  try {
    const urlRef = await useDrawQrcode({
      type,
      element: draw as Ref<HTMLCanvasElement | HTMLImageElement>,
      content,
      width,
      options,
      image
    })
    if (type === 'canvas') {
      emit('success', {
        url: unref(urlRef),
        ctx: (unref(draw) as HTMLCanvasElement).getContext('2d')
      })
    } else {
      emit('success', { url: unref(urlRef) })
    }
  } catch (error) {
    emit('error', error)
  }
}

watch(
  props,
  () => {
    createQrcode()
  },
  { deep: true }
)

onMounted(() => {
  createQrcode()
})
</script>
