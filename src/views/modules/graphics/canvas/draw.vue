<template>
  <div class="flex flex-wrap items-center justify-around">
    <canvas ref="line" height="150" width="400">
      当前浏览器不支持canvas元素，请升级或更换浏览器！
    </canvas>
    <canvas ref="circle" height="150" width="400">
      当前浏览器不支持canvas元素，请升级或更换浏览器！
    </canvas>
    <canvas ref="curve" height="150" width="400">
      当前浏览器不支持canvas元素，请升级或更换浏览器！
    </canvas>
    <canvas ref="style" height="150" width="400">
      当前浏览器不支持canvas元素，请升级或更换浏览器！
    </canvas>
    <canvas ref="text" height="150" width="400">
      当前浏览器不支持canvas元素，请升级或更换浏览器！
    </canvas>
    <canvas ref="backPic" height="150" width="400">
      当前浏览器不支持canvas元素，请升级或更换浏览器！
    </canvas>
  </div>
</template>

<script setup lang="ts">
import { Ref, onMounted, ref, unref } from 'vue'

const line = ref<HTMLCanvasElement | null>(null)
const circle = ref<HTMLCanvasElement | null>(null)
const curve = ref<HTMLCanvasElement | null>(null)
const style = ref<HTMLCanvasElement | null>(null)
const text = ref<HTMLCanvasElement | null>(null)
const backPic = ref<HTMLCanvasElement | null>(null)

function drawLine(canvasRef: Ref<HTMLCanvasElement | null>) {
  const canvas = unref(canvasRef)
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  if (!ctx) return
  // 初始化一条路径
  ctx.beginPath()
  // 设置初始位置
  ctx.moveTo(10, 10)
  // 线条颜色
  ctx.strokeStyle = 'rgb(255, 0, 0)'
  // 线条宽度
  ctx.lineWidth = 10
  // 线条末端样式
  ctx.lineCap = 'round'
  // 设置线段到达位置
  ctx.lineTo(50, 50)
  // 绘制线段
  ctx.stroke()
  ctx.lineTo(100, 50)
  ctx.stroke()
  // 闭合路径
  ctx.closePath()

  // 绘制三角形
  ctx.beginPath()
  ctx.moveTo(110, 10)
  ctx.lineTo(210, 10)
  ctx.lineTo(160, 60)
  ctx.lineTo(110, 10)
  // 拐点样式
  ctx.lineJoin = 'round'
  ctx.stroke()
  ctx.closePath()

  // 绘制矩形
  ctx.strokeStyle = 'green'
  ctx.lineJoin = 'miter'
  ctx.strokeRect(230, 10, 100, 100)
  // 填充矩形
  ctx.fillStyle = 'yellow'
  ctx.fillRect(235, 15, 90, 90)
  // 清除矩形
  ctx.clearRect(255, 35, 50, 50)
}

function drawCircle(canvasRef: Ref<HTMLCanvasElement | null>) {
  const canvas = unref(canvasRef)
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  // 绘制一段半圆弧
  ctx.beginPath()
  ctx.arc(50, 50, 40, 0, Math.PI, false)
  ctx.stroke()
  ctx.closePath()

  // 绘制四分之三圆弧
  ctx.beginPath()
  ctx.arc(150, 50, 40, 0, Math.PI * 1.5)
  ctx.strokeStyle = '#0051ff'
  ctx.fillStyle = 'rgb(234, 0, 255)'
  ctx.stroke()
  ctx.fill()
  ctx.closePath()

  // 绘制椭圆
  ctx.beginPath()
  ctx.ellipse(250, 55, 25, 50, 0, 0, Math.PI * 2)
  ctx.stroke()
  ctx.beginPath()
  ctx.ellipse(330, 55, 25, 50, Math.PI / 2, 0, Math.PI * 2)
  ctx.fill()
}

function drawCurve(canvasRef: Ref<HTMLCanvasElement | null>) {
  const canvas = unref(canvasRef)
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  // 绘制二次贝塞尔曲线
  ctx.beginPath()
  ctx.moveTo(5, 5)
  ctx.quadraticCurveTo(30, 40, 100, 5)
  ctx.stroke()
  ctx.closePath()

  // 绘制三次贝塞尔曲线
  ctx.beginPath()
  ctx.moveTo(5, 100)
  ctx.bezierCurveTo(25, 120, 70, 60, 100, 100)
  ctx.stroke()
  ctx.closePath()

  ctx.beginPath()
  ctx.moveTo(110, 100)
  // 限制交点内角点到外角点的距离
  ctx.miterLimit = 20
  ctx.lineWidth = 5
  for (let i = 1; i < 30; i++) {
    const dy = i % 2 === 0 ? 80 : 120
    ctx.lineTo(110 + 30 * i, dy)
  }
  ctx.stroke()
  ctx.closePath()

  // 绘制虚线
  ctx.beginPath()
  ctx.lineWidth = 2
  ctx.moveTo(120, 10)
  // 设置虚线样式规则：【实线，虚线，实线，虚线】
  // 如果数组为奇数，那么数组会被复制一份
  ctx.setLineDash([5, 3, 10, 8])
  // 得到虚线样式
  // ctx.getLineDash()
  ctx.lineTo(300, 10)
  ctx.stroke()
  ctx.closePath()

  ctx.beginPath()
  ctx.moveTo(120, 30)
  ctx.setLineDash([5, 3, 10, 8])
  // 设置虚线的偏移量 正数为向左偏移
  ctx.lineDashOffset = 5
  ctx.lineTo(300, 30)
  ctx.stroke()
  ctx.closePath()
}

function drawStyle(canvasRef: Ref<HTMLCanvasElement | null>) {
  const canvas = unref(canvasRef)
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  ctx.beginPath()
  // 颜色添加透明度
  ctx.fillStyle = 'rgba(0, 255, 0, 0.2)'
  // ctx的透明度属性
  ctx.globalAlpha = 0.5
  ctx.fillRect(5, 5, 30, 50)
  ctx.closePath()

  //  线性渐变
  const gradient = ctx.createLinearGradient(50, 5, 50, 100)
  gradient.addColorStop(0, 'red')
  gradient.addColorStop(0.5, 'yellow')
  gradient.addColorStop(1, 'green')
  ctx.globalAlpha = 1
  ctx.beginPath()
  ctx.fillStyle = gradient
  ctx.fillRect(50, 5, 50, 95)
  ctx.closePath()

  // 径向渐变
  ctx.beginPath()
  const gradient2 = ctx.createRadialGradient(150, 50, 40, 150, 50, 10)
  gradient2.addColorStop(0, 'red')
  gradient2.addColorStop(1, 'white')
  ctx.arc(150, 50, 40, 0, 2 * Math.PI)
  ctx.fillStyle = gradient2
  ctx.fill()
  ctx.closePath()

  ctx.beginPath()
  const gradient3 = ctx.createRadialGradient(250, 50, 40, 270, 80, 0)
  gradient3.addColorStop(0, 'red')
  gradient3.addColorStop(1, 'white')
  ctx.arc(250, 50, 40, 0, 2 * Math.PI)
  ctx.fillStyle = gradient3
  ctx.fill()
  ctx.closePath()
}

function drawText(canvasRef: Ref<HTMLCanvasElement | null>) {
  const canvas = unref(canvasRef)
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  ctx.beginPath()
  ctx.font = '50px serif'
  ctx.fillStyle = 'red'
  ctx.fillText('canvas', 25, 25, 40)
  ctx.strokeStyle = 'green'
  ctx.strokeText('draw', 20, 70)
  ctx.closePath()

  ctx.beginPath()
  ctx.font = '15px serif'
  // 语言的方向
  ctx.direction = 'ltr'
  // 文字的横轴对齐方式
  ctx.textAlign = 'right'
  // 文字的基线
  ctx.textBaseline = 'bottom'
  ctx.fillText('I Love Graphics `!', 250, 10)
  ctx.direction = 'ltr'
  ctx.textAlign = 'center'
  ctx.fillText('I Love Graphics `!', 250, 30)
  ctx.direction = 'ltr'
  ctx.textAlign = 'left'
  ctx.fillText('I Love Graphics `!', 250, 50)
  ctx.direction = 'rtl'
  ctx.textAlign = 'left'
  ctx.fillText('I Love Graphics `!', 250, 70)
  ctx.direction = 'rtl'
  ctx.textAlign = 'center'
  ctx.fillText('I Love Graphics `!', 250, 90)
  ctx.direction = 'rtl'
  ctx.textAlign = 'right'
  ctx.fillText('I Love Graphics `!', 250, 110)
  ctx.closePath()
}

onMounted(() => {
  drawLine(line)
  drawCircle(circle)
  drawCurve(curve)
  drawStyle(style)
  drawText(text)
})
</script>
