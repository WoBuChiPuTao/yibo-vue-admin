<template>
  <li :class="getClass" :style="collapsed ? {} : getItemStyle" @click.stop="handleClickItem">
    <ElTooltip v-if="getShowTooltip" effect="dark" placement="right" raw-content>
      <div class="menu-list-item-tooltip">
        <slot></slot>
      </div>
      <template #content>
        <slot name="title"></slot>
      </template>
    </ElTooltip>

    <template v-else>
      <slot></slot>
      <slot name="title"></slot>
    </template>
  </li>
</template>

<script lang="ts">
import { computed, defineComponent, getCurrentInstance, ref, unref, watch } from 'vue'
import { useMenuItem } from './useMenu'
import { ElTooltip } from 'element-plus'
import { useRootMenuContext } from './useMenuContext'

export default defineComponent({
  name: 'MenuItem',
  components: { ElTooltip },
  props: {
    name: {
      type: String,
      required: true
    },
    topParent: Boolean,
    collapsed: Boolean
  },
  setup(props) {
    const active = ref(false)
    const instance = getCurrentInstance()
    const { getItemStyle, getParentList } = useMenuItem(instance)
    const { rootMenuEmitter, selectedName } = useRootMenuContext()

    watch(
      () => selectedName.value,
      (name: string) => {
        if (name === props.name) {
          active.value = true
          const { list, uidList } = getParentList()
          list.forEach((item) => {
            if (item.proxy) {
              (item.proxy as any).active = true
            }
          })
          rootMenuEmitter.emit('on-update-active-name:submenu', uidList)
        } else {
          active.value = false
        }
      },
      {
        immediate: true
      }
    )

    const getShowTooltip = computed(() => {
      return props.topParent && props.collapsed
    })

    const getClass = computed(() => {
      return [
        'menu-list-item',
        {
          'menu-list-item-selected': unref(active),
          'menu-list-item-selected-collapsed': unref(active) && props.collapsed
        }
      ]
    })

    function handleClickItem() {
      rootMenuEmitter.emit('menu-item-selected', props.name)
    }

    return {
      getItemStyle,
      getClass,
      getShowTooltip,
      handleClickItem
    }
  }
})
</script>
