import { computed, ComponentInternalInstance } from 'vue'
import type { CSSProperties } from 'vue'

export function useMenuItem(instance: ComponentInternalInstance | null) {
  const getItemStyle = computed((): CSSProperties => {
    let parent = instance?.parent
    let padding = 16
    if (!parent) {
      return {}
    }
    while (parent && parent.type.name !== 'Menu') {
      if (parent.type.name === 'SubMenuItem') {
        padding += padding
      }
      parent = parent.parent
    }
    return { paddingLeft: padding + 'px' }
  })

  function getParentList() {
    let parent = instance?.parent
    if (!parent) {
      return {
        uidList: []
      }
    }
    const int: ComponentInternalInstance[] = []
    while (parent && parent.type.name !== 'Menu') {
      if (parent.type.name === 'SubMenuItem') {
        int.push(parent)
      }
      parent = parent?.parent
    }
    return {
      uidList: int.map((item) => item.uid)
    }
  }
  return {
    getItemStyle,
    getParentList
  }
}
