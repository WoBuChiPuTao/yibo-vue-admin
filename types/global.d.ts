declare type Nullable<T> = T | null
declare type Recordable<T = any> = Record<string, T>

declare type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>
}

declare interface ChangeEvent extends Event {
  target: HTMLInputElement
}
