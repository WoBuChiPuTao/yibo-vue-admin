<script lang="tsx">
import { computed, defineComponent, unref } from 'vue'
import { useMenu } from './useMenu'
import { ElScrollbar } from 'element-plus'
import { useSiderSetting } from '@/hooks/setting/useSiderSetting'
import SideMenu from '@/components/menu/sideMenu/index.vue'
import TopMenu from '@/components/menu/topMenu/TopMenu.vue'
import { useAppInject } from '@/hooks/web/useAppInject'
export default defineComponent({
  name: 'Menu',
  components: { SideMenu, ElScrollbar, TopMenu },
  setup() {
    const { menuRef } = useMenu()
    const { getCollapsed, getShowSideMenu, getShowSider } = useSiderSetting()
    const { getIsMobile } = useAppInject()

    const getProps = computed(() => {
      const menus = unref(menuRef)
      return {
        menus,
        collapsed: unref(getCollapsed)
      }
    })

    function renderMenu() {
      const showMenu = unref(getShowSider)
      if (!showMenu) {
        return <></>
      }
      const showSideMenu = unref(getShowSideMenu)
      const { menus, collapsed } = unref(getProps)
      const isMobile = unref(getIsMobile)

      if (isMobile) {
        return (
          <ElScrollbar>
            <SideMenu menus={menus} collapsed={collapsed}></SideMenu>
          </ElScrollbar>
        )
      }

      return showSideMenu ? (
        <ElScrollbar>
          <SideMenu menus={menus} collapsed={collapsed}></SideMenu>
        </ElScrollbar>
      ) : (
        <TopMenu menus={menus}></TopMenu>
      )
    }

    return () => {
      return renderMenu()
    }
  }
})
</script>
