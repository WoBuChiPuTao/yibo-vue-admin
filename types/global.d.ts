// electron builder 自带变量，用于访问public文件夹
declare let __static: string

declare type Nullable<T> = T | null
declare type Recordable<T = any> = Record<string, T>

declare type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>
}

declare interface ChangeEvent extends Event {
  target: HTMLInputElement
}

declare interface ComponentElRef<T extends HTMLElement = HTMLDivElement> {
  $el: T
}

declare type ElementRef<T extends HTMLElement = HTMLDivElement> = ComponentElRef<T> | null
