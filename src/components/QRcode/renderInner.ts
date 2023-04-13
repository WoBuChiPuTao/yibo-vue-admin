import { RenderImageParam } from './types'

export function renderInner(canvas: HTMLCanvasElement, image?: string | RenderImageParam) {
  if (!image) {
    return new Promise((resolve) => {
      resolve(canvas.toDataURL())
    }) as Promise<string>
  }

  const {
    imageSize = 0.15,
    imageRadius = 1,
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

  // image底色
  canvasRoundRect(ctx)(imageBgXY, imageBgXY, imageBgWidth, imageBgWidth, borderRadius)
  ctx.fillStyle = bgColor
  ctx.fill()

  const imageObj = new Image()
  imageObj.src = imageSrc

  const drawWithImage = (img: CanvasImageSource) => {
    ctx.drawImage(img, imageXY, imageXY, imageWidth, imageWidth)
  }

  const drawWithCanvas = (img: CanvasImageSource) => {
    const innerCnavas = document.createElement('canvas')
    innerCnavas.width = imageXY + imageWidth
    innerCnavas.height = imageXY + imageWidth
    const innerCtx = innerCnavas.getContext('2d')
    if (!innerCtx) return
    innerCtx.drawImage(img, imageXY, imageXY, imageWidth, imageWidth)
    canvasRoundRect(ctx)(imageXY, imageXY, imageWidth, imageWidth, imageRadius)

    const fillStyle = ctx.createPattern(innerCnavas, 'no-repeat')

    if (!fillStyle) return
    console.log('fill')
    ctx.fillStyle = fillStyle
    ctx.fill()
  }

  return new Promise((resolve) => {
    imageObj.onload = () => {
      imageRadius ? drawWithCanvas(imageObj) : drawWithImage(imageObj)
      resolve(canvas.toDataURL())
    }
  }) as Promise<string>
}

// 用于绘制圆角
function canvasRoundRect(ctx: CanvasRenderingContext2D) {
  return (x: number, y: number, w: number, h: number, r: number) => {
    const minSize = Math.min(w, h)
    if (r > minSize / 2) {
      r = minSize / 2
    }
    ctx.beginPath()
    ctx.moveTo(x + r, y)
    ctx.arcTo(x + w, y, x + w, y + h, r)
    ctx.arcTo(x + w, y + h, x, y + h, r)
    ctx.arcTo(x, y + h, x, y, r)
    ctx.arcTo(x, y, x + w, y, r)
    ctx.closePath()
    return ctx
  }
}
