
export {}

declare global {
  type AnyObject<T = any> = Record<string, T>
}