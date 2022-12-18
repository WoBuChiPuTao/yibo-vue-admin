/**
 * @description: Extract tree specified structure
 * @description: 提取树指定结构
 */
export function treeMapEach(
  data: any,
  { children = 'children', conversion }: { children?: string; conversion: Fn }
) {
  const haveChildren =
    Array.isArray(data[children]) && data[children].length > 0
  const conversionData = conversion(data) || {}
  if (haveChildren) {
    return {
      ...conversionData,
      [children]: data[children].map((item: any) =>
        treeMapEach(item, {
          children,
          conversion
        })
      )
    }
  } else {
    return {
      ...conversionData
    }
  }
}

/**
 * @description: Extract tree specified structure
 * @description: 提取树指定结构
 */
export function treeMap<T = any>(
  treeData: T[],
  opt: { children?: string; conversion: Fn }
): T[] {
  return treeData.map((item) => treeMapEach(item, opt))
}
