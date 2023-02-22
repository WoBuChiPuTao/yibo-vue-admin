<template>
  <li :class="getClass">
    <div class="menu-list-submenu-title" @click.stop="handleClick" :style="getItemStyle">
      <slot name="title"></slot>
      <EIcon v-if="!collapsed" icon="eva:arrow-ios-downward-outline" class="submenu-open-icon" />
    </div>
    <CollapseTransition>
      <ul v-show="opened">
        <slot></slot>
      </ul>
    </CollapseTransition>
  </li>

</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  getCurrentInstance,
  onBeforeMount,
  reactive,
  toRefs
} from 'vue'
import { useMenuItem } from './useMenu'
import EIcon from '@/components/icons/EIcon.vue'
import CollapseTransition from '@/components/Transition/CollapseTransition.vue'
import { useRootMenuContext } from './useMenuContext'

export default defineComponent({
  name: 'SubMenuItem',
  components: { EIcon, CollapseTransition },
  props: {
    name: {
      type: String,
      required: true
    },
    collapsed: Boolean
  },
  setup(props) {
    // 多级菜单样式
    const instance = getCurrentInstance()
    const { getItemStyle, getParentList } = useMenuItem(instance)

    const { rootMenuEmitter } = useRootMenuContext()
    // 菜单是否打开
    const state = reactive({
      opened: false,
      active: false
    })

    // 打开下级菜单
    function handleClick() {
      const opened = state.opened
      const { uidList } = getParentList()
      rootMenuEmitter.emit('on-update-opened', {
        opend: false,
        uidList: uidList
      })
      state.opened = !opened
    }

    const getClass = computed(() => {
      return [
        'menu-list-submenu',
        {
          'menu-list-submenu-opend': state.opened,
          'menu-list-submenu-child-active': state.active
        }
      ]
    })

    onBeforeMount(() => {
      rootMenuEmitter.on(
        'on-update-opened',
        (data: Record<string, any> | string[]) => {
          if (props.name && Array.isArray(data)) {
            state.opened = (data as (string | number)[]).includes(props.name)
          } else {
            const { opend, uidList } = data as {
              opend: boolean
              uidList: number[]
            }
            if (!uidList.includes(instance?.uid as number)) {
              state.opened = opend
            }
          }
        }
      )

      rootMenuEmitter.on('on-update-active-name:submenu', (data: number[]) => {
        if (instance?.uid) {
          state.active = data.includes(instance?.uid)
        }
      })
    })

    return {
      getItemStyle,
      getClass,
      handleClick,
      ...toRefs(state)
    }
  }
})
</script>
