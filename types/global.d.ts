declare type Nullable<T> = T | null
declare type Recordable<T = any> = Record<string, T>

declare interface ChangeEvent extends Event {
  target: HTMLInputElement
}
