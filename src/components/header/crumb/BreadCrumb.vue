<template>
  <div>
    <ElBreadcrumb>
      <template v-for="route in routes" :key="route.path">
        <ElBreadcrumbItem>{{ t(route.name) }}</ElBreadcrumbItem>
      </template>
    </ElBreadcrumb>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect } from 'vue'
import { ElBreadcrumb, ElBreadcrumbItem } from 'element-plus'
import { getMenus } from '@/router/menu/index'
import { useRouter } from 'vue-router'
import { useI18n } from '@/hooks/web/useI18n'
import { getAllParentPath } from '@/router/menu/util'
import { Menu } from '@/types/menu'

export default defineComponent({
  name: 'breadCrumb',
  components: { ElBreadcrumb, ElBreadcrumbItem },
  setup() {
    const routes = ref<Menu[]>([])
    const { currentRoute } = useRouter()
    const { t } = useI18n()

    watchEffect(async () => {
      if (currentRoute.value.name === 'Redirect') return
      const menus = await getMenus()

      const path = currentRoute.value.path

      const parentPaths = getAllParentPath(menus, path)
      const filterMenu = menus.filter((item) => item.path === parentPaths[0])
      routes.value = flatItems(filterMenu, parentPaths)
    })

    function flatItems(menus: Menu[], parentPaths: string[]) {
      const flatMenu: Menu[] = []
      menus.forEach((item) => {
        if (parentPaths.includes(item.path)) {
          flatMenu.push({
            ...item
          })
        }
        if (item.children && item.children.length > 0) {
          flatMenu.push(...flatItems(item.children, parentPaths))
        }
      })
      return flatMenu
    }

    return {
      routes,
      t
    }
  }
})
</script>
