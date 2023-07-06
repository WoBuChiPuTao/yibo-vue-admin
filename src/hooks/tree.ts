// interface TreeHelperConfig {
//   id: string
//   children: string
//   pid: string
// }

/**
 * @description: Extract tree specified structure
 * @description: 提取树指定结构
 */
export function treeMapEach(
  data: any,
  { children = 'children', conversion }: { children?: string; conversion: Fn }
) {
  const haveChildren = Array.isArray(data[children]) && data[children].length > 0
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
 * @description 过滤树中的空对象
 */
function filterTreeEach(data: any, children = 'children') {
  const keys = Object.keys(data)
  if (keys.length === 0 || (keys.length === 1 && keys.includes(children))) {
    return undefined
  }
  const haveChildren = Array.isArray(data[children]) && data[children].length > 0
  if (haveChildren) {
    const childData = data[children]
      .map((item: any) => filterTreeEach(item, children))
      .filter((val: any) => val)
    return {
      ...data,
      [children]: childData.length ? childData : undefined
    }
  } else {
    return data
  }
}

/**
 * @description: Extract tree specified structure
 * @description: 提取树指定结构
 */
export function treeMap<T = any>(
  treeData: T[],
  opt: { children?: string; conversion: Fn<T[]> }
): T[] {
  return treeData
    .map((item) => filterTreeEach(treeMapEach(item, opt), opt.children))
    .filter((val) => val)
}

/**
 * @param tree 树
 * @param func 判断函数
 * @param children 子节点key
 * @returns: 新数组
 * @description: 查找树节点路径
 */
export function findPath<T = any>(tree: any, func: Fn, children = 'children'): T | T[] | null {
  const path: T[] = []
  const list = [...tree]
  const visitedSet = new Set()
  while (list.length) {
    const node = list[0]
    // 栈剪枝
    if (visitedSet.has(node)) {
      path.pop()
      list.shift()
    } else {
      visitedSet.add(node)
      node[children!] && list.unshift(...node[children!])
      path.push(node)
      if (func(node)) {
        return path
      }
    }
  }
  return null
}
