import { QRCodeRenderersOptions, toCanvas, toDataURL } from 'qrcode'
import { ContentType, DrawQrcodeParam } from './types'
import { unref, watch, ref } from 'vue'
import { cloneDeep } from 'lodash-es'
import { useThemeMode } from '@/hooks/setting/useTheme'
import { renderCnavas } from './renderCanvas'

export async function useDrawQrcode({
  type,
  element,
  content,
  width = 0,
  options = {},
  image
}: DrawQrcodeParam) {
  const urlRef = ref('')
  const { getThemeMode } = useThemeMode()

  const renderParams = cloneDeep(options)
  renderParams.errorCorrectionLevel =
    renderParams.errorCorrectionLevel || getErrorCorrectionLevel(content)

  let originWidth: number | null = null
  if (type === 'canvas') {
    originWidth = await getOriginWidth(content, renderParams)
  }

  async function drawQrcode(opt: QRCodeRenderersOptions) {
    const warp = unref(element)
    if (!warp) return

    if (type === 'canvas') {
      if (originWidth) {
        opt.scale = width === 0 ? undefined : (width / originWidth) * 4
      }
      urlRef.value = await toCanvas(warp, content, opt).then(() =>
        renderCnavas(warp as HTMLCanvasElement, image)
      )
    } else {
      const url = await toDataURL(content, { errorCorrectionLevel: 'H', width, ...opt })
      ;(<HTMLImageElement>warp).src = url
      urlRef.value = url
    }
  }

  // 监听主题变化
  watch(
    () => getThemeMode.value,
    (v) => {
      if (renderParams.color && renderParams.color.dark && renderParams.color.light) {
        return
      }
      // 主题的颜色
      let dark = '#000000'
      let light = '#ffffff'
      if (v === 'dark') {
        dark = '#ffffff'
        light = '#1d1e1f'
      }
      // 自带颜色权重更高
      if (renderParams.color) {
        renderParams.color.dark && (dark = renderParams.color.dark)
        renderParams.color.light && (light = renderParams.color.light)
      }
      drawQrcode({ ...renderParams, color: { dark, light } })
    },
    {
      immediate: true
    }
  )

  return urlRef
}

// 得到原QrCode的大小，以便缩放得到正确的QrCode大小
function getOriginWidth(content: ContentType, options: QRCodeRenderersOptions) {
  const _canvas = document.createElement('canvas')
  return toCanvas(_canvas, content, options).then(() => _canvas.width)
}

// 根据内容选着容错率类型，内容越大错误率越低
function getErrorCorrectionLevel(content: ContentType) {
  const len = content.length
  if (len > 128) {
    return 'L'
  } else if (len > 36) {
    return 'M'
  } else if (len > 18) {
    return 'Q'
  } else {
    return 'H'
  }
}
