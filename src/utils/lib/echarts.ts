import * as echarts from 'echarts/core'

import {
  BarChart,
  LineChart,
  PieChart,
  MapChart,
  PictorialBarChart,
  RadarChart,
  ScatterChart
} from 'echarts/charts'

import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  PolarComponent,
  AriaComponent,
  ParallelComponent,
  LegendComponent,
  RadarComponent,
  ToolboxComponent,
  DataZoomComponent,
  VisualMapComponent,
  TimelineComponent,
  CalendarComponent,
  GraphicComponent,
  DatasetComponent,
  TransformComponent
} from 'echarts/components'

import { LabelLayout, UniversalTransition } from 'echarts/features'

import { SVGRenderer, CanvasRenderer } from 'echarts/renderers'

export enum RenderType {
  SVGRenderer = 'canvas',
  CanvasRenderer = 'svg'
}

// 注册组件
echarts.use([
  BarChart,
  LineChart,
  PieChart,
  MapChart,
  PictorialBarChart,
  RadarChart,
  ScatterChart,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  PolarComponent,
  AriaComponent,
  ParallelComponent,
  LegendComponent,
  RadarComponent,
  ToolboxComponent,
  DataZoomComponent,
  VisualMapComponent,
  TimelineComponent,
  CalendarComponent,
  GraphicComponent,
  DatasetComponent,
  TransformComponent,
  LegendComponent,
  LabelLayout,
  UniversalTransition,
  SVGRenderer,
  CanvasRenderer
])

export default echarts
