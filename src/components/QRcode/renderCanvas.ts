import { RenderImageParam } from './types'

export function renderCnavas(canvas: HTMLCanvasElement, image?: string | RenderImageParam) {
  if (!image) {
    return new Promise((resolve) => {
      resolve(canvas.toDataURL())
    }) as Promise<string>
  }

  const {
    imageSize = 0.15,
    imageRadius = 0,
    bgColor = '#ffffff',
    borderSize = 0.05,
    borderRadius = 8
  } = image as RenderImageParam

  const canvasWidth = canvas.width

  const imageSrc = typeof image === 'string' ? image : image.src
  const imageWidth = canvasWidth * imageSize
  const imageXY = (canvasWidth / 2) * (1 - imageSize)
  const imageBgWidth = canvasWidth * (imageSize + borderSize)
  const imageBgXY = (canvasWidth / 2) * (1 - imageSize - borderSize)

  const ctx = canvas.getContext('2d')
  if (!ctx) {
    return ''
  }

  const imageObj = new Image()
  imageObj.src = imageSrc

  const drawWithImage = (img: CanvasImageSource) => {
    ctx.drawImage(img, imageXY, imageXY, imageWidth, imageWidth)
  }

  return new Promise((resolve) => {
    imageObj.onload = () => {
      drawWithImage(imageObj)
      resolve(canvas.toDataURL())
    }
  }) as Promise<string>
}
