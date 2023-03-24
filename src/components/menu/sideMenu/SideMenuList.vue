<template>
  <ul class="menu-list">
    <slot></slot>
  </ul>
</template>

<script lang="ts">
import { defineComponent, nextTick, onMounted, PropType, ref, toRefs, unref, watch } from 'vue'
import { createRootMenuContext } from './useMenuContext'
import mitt, { Emitter } from '@/utils/mitt'
import { listenerRouteChange } from '@/hooks/mitt/routeChange'
import { RouteLocationNormalizedLoaded, useRouter } from 'vue-router'
import { Menu } from '#/list'
import { useOpenMenu } from './useOpen'

export default defineComponent({
  name: 'SideMenuList',
  props: {
    menus: {
      type: Array as PropType<Menu[]>,
      default: () => []
    },
    collapsed: Boolean
  },
  emits: ['selectMenuItem'],
  setup(props, { emit }) {
    const currentSelectedName = ref('')
    const openedNames = ref<string[]>([])
    const isClickGo = ref(false)
    const { currentRoute } = useRouter()
    const { menus } = toRefs(props)
    const { getOpenMenu } = useOpenMenu(menus, openedNames)

    const rootMenuEmitter: Emitter<Record<string, any>> = mitt()
    createRootMenuContext({
      rootMenuEmitter: rootMenuEmitter,
      selectedName: currentSelectedName
    })

    watch(
      () => openedNames.value,
      () => {
        nextTick(() => {
          updateOpened()
        })
      }
    )

    watch(
      () => props.collapsed,
      () => {
        if (props.collapsed) {
          openedNames.value = []
        } else {
          handleMenuChange()
        }
      }
    )

    function updateOpened() {
      rootMenuEmitter.emit('on-update-opened', openedNames.value)
    }

    listenerRouteChange((route) => {
      if (route.name === 'Redirect') return

      handleMenuChange(route)
    })

    async function handleMenuChange(route?: RouteLocationNormalizedLoaded) {
      if (unref(isClickGo)) {
        isClickGo.value = false
        return
      }
      const path = (route || unref(currentRoute)).path
      currentSelectedName.value = path
      getOpenMenu(path)
    }

    onMounted(() => {
      rootMenuEmitter.on('menu-item-selected', (name: string): void => {
        currentSelectedName.value = name
        emit('selectMenuItem', name)
        isClickGo.value = true
      })
    })
    return {}
  }
})
</script>

<style lang="less">
@import './menu.less';
</style>
