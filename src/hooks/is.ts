/**
 * 是否为url
 */
export function isUrl(path: string): boolean {
  // eslint-disable-next-line no-useless-escape
  const reg = /^http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w-\.\/?%&=]*)?/
  return reg.test(path)
}
