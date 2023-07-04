<template>
  <li :class="getClass">
    <template v-if="!collapsed">
      <div class="menu-list-submenu-title" @click.stop="handleClick" :style="getItemStyle">
        <slot name="title"></slot>
        <EIcon
          icon="eva:arrow-ios-downward-outline"
          :post-icon="arrowIosDownwardOutline"
          class="submenu-open-icon"
        />
      </div>
      <CollapseTransition>
        <ul v-show="opened">
          <slot></slot>
        </ul>
      </CollapseTransition>
    </template>

    <ElPopover popper-class="side-menu-popover" v-else placement="right" trigger="click">
      <template #reference>
        <div
          :class="[
            {
              'side-menu-popover-title': topParent
            },
            ' menu-list-submenu-title'
          ]"
          @click.stop="handleClick"
        >
          <slot name="title"></slot>
          <EIcon
            v-if="!topParent"
            icon="eva:arrow-ios-downward-outline"
            :post-icon="arrowIosDownwardOutline"
            class="submenu-open-icon"
          />
        </div>
      </template>
      <div>
        <ul>
          <slot></slot>
        </ul>
      </div>
    </ElPopover>
  </li>
</template>

<script lang="ts">
import { computed, defineComponent, getCurrentInstance, onBeforeMount, reactive, toRefs } from 'vue'
import { useMenuItem } from './useMenu'
import EIcon from '@/components/icons/EIcon.vue'
import CollapseTransition from '@/components/Transition/CollapseTransition.vue'
import { useRootMenuContext } from './useMenuContext'
import arrowIosDownwardOutline from '@iconify-icons/eva/arrow-ios-downward-outline'
import { ElPopover } from 'element-plus'

export default defineComponent({
  name: 'SubMenuItem',
  components: { EIcon, CollapseTransition, ElPopover },
  props: {
    name: {
      type: String,
      required: true
    },
    collapsed: Boolean,
    topParent: Boolean
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
          'menu-list-submenu-child-active': state.active,
          'menu-list-submenu-child-active-collapsed': state.active && props.collapsed
        }
      ]
    })

    onBeforeMount(() => {
      rootMenuEmitter.on('on-update-opened', (data: Record<string, any> | string[]) => {
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
      })

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
      ...toRefs(state),
      arrowIosDownwardOutline
    }
  }
})
</script>

<style lang="less">
// popover样式
.side-menu-popover.el-popover {
  border: 0;
  padding: 0;
  background-color: var(--sider-child-bg-color);
  .el-popper__arrow {
    display: none;
  }

  .menu-list-item{
    padding-left: 24px;
  }
}

.side-menu-popover-title {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
