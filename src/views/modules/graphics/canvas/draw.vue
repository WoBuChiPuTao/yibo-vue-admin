<template>
  <div class="flex items-center justify-around">
    <canvas ref="line" height="150" width="400">
      当前浏览器不支持canvas元素，请升级或更换浏览器！
    </canvas>
    <canvas ref="circle" height="150" width="400">
      当前浏览器不支持canvas元素，请升级或更换浏览器！
    </canvas>
  </div>
</template>

<script setup lang="ts">
import { Ref, onMounted, ref, unref } from 'vue'

const line = ref<HTMLCanvasElement | null>(null)
const circle = ref<HTMLCanvasElement | null>(null)

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
  ctx.arc(50, 50, 40, 0, Math.PI, false)
  ctx.stroke()
}

onMounted(() => {
  drawLine(line)
  drawCircle(circle)
})
</script>
