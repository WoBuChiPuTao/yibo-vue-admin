import { AddRouteRecordRaw } from '@/router/types'
import Home from './home'
import About from './about'
import System from './system'
import features from './features'
import Charts from './charts'
export const asyncRoutes: Array<AddRouteRecordRaw> = [Home, About, System, features, Charts]
