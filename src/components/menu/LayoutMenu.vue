<script lang="tsx">
import { computed, defineComponent, unref } from 'vue'
import { useMenu } from './useMenu'
import { ElScrollbar } from 'element-plus'
import { useSiderSetting } from '@/hooks/setting/useSiderSetting'
import SideMenu from './sideMenu/index.vue'
import TopMenu from './topMenu/TopMenu.vue'
export default defineComponent({
  name: 'Menu',
  components: { SideMenu, ElScrollbar, TopMenu },
  setup() {
    const { menuRef } = useMenu()
    const { getCollapsed, getShowSideMenu, getShowSider } = useSiderSetting()

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
