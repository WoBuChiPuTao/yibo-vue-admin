import { QRCodeRenderersOptions, QRCodeSegment } from 'qrcode'
import { Ref } from 'vue'

export type DrawType = 'canvas' | 'img'

export type ContentType = string | QRCodeSegment[]

export interface RenderImageParam {
  src: string
  imageSize?: number
  imageRadius?: number
  borderSize?: number
  borderRadius?: number
  bgColor?: string
}

export interface DrawQrcodeParam {
  type: DrawType
  element: Ref<HTMLCanvasElement | HTMLImageElement>
  content: ContentType
  width?: number
  options?: QRCodeRenderersOptions
  image?: string | RenderImageParam
}
