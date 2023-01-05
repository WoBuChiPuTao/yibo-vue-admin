import { useDebounceFn } from '@/hooks/core'
import { getAllParentPath } from '@/router/menu/util'
import { Menu } from '@/types/menu'
import { Ref, toRaw } from 'vue'

export function useOpenMenu(menus: Ref<Menu[]>, openNames: Ref<string[]>) {
  const getDebounceOpenMenu = useDebounceFn(getOpenMenu, 1)
  async function getOpenMenu(path: string) {
    const menuList = toRaw(menus.value)
    if (menuList?.length === 0) {
      return
    }
    openNames.value = getAllParentPath(menuList, path)
    console.log('openNames', openNames.value)
  }

  return { getOpenMenu: getDebounceOpenMenu }
}
