import { getMenus } from '@/router/menu'
import { ref, watch } from 'vue'
// import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/modules/user'
import { Menu } from '#/list'

export function useLeftMenu() {
  const menuRef = ref<Menu[]>([])
  const userStore = useUserStore()

  // const { currentRoute } = useRouter()
  watch(
    () => userStore.getToken,
    () => {
      useGetMenu()
    },
    {
      immediate: true
    }
  )

  async function useGetMenu() {
    menuRef.value = await getMenus()
  }

  return { menuRef }
}
