// 不会遍历枚举，如果添加宽度请修改useBreakpoint文件

export enum screenSizeEnum {
  XS = 'XS',
  SM = 'SM',
  MD = 'MD',
  LG = 'LG',
  XL = 'XL',
  XXL = 'XXL'
}

export enum screenEnum {
  XS = 480,
  SM = 576,
  MD = 768,
  LG = 992,
  XL = 1200,
  XXL = 1600
}

export const screenMap = new Map()

screenMap.set(screenSizeEnum.LG, screenEnum[screenSizeEnum.LG])
screenMap.set(screenSizeEnum.MD, screenEnum[screenSizeEnum.MD])
screenMap.set(screenSizeEnum.SM, screenEnum[screenSizeEnum.SM])
screenMap.set(screenSizeEnum.XL, screenEnum[screenSizeEnum.XL])
screenMap.set(screenSizeEnum.LG, screenEnum[screenSizeEnum.LG])
screenMap.set(screenSizeEnum.XS, screenEnum[screenSizeEnum.XS])
screenMap.set(screenSizeEnum.XXL, screenEnum[screenSizeEnum.XXL])
