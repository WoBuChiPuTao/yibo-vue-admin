<template>
  <li v-bind="$attrs" :class="getClass" :style="getItemStyle" @click.stop="handleClickItem">
    <slot></slot>
    <slot name="title"></slot>
  </li>
</template>

<script lang="ts">
import { computed, defineComponent, getCurrentInstance, ref, unref, watch } from 'vue'
import { useMenuItem } from './useMenu'
import { useRootMenuContext } from './useMenuContext'

export default defineComponent({
  name: 'MenuItem',
  components: {},
  props: {
    name: {
      type: String,
      required: true
    },
    topParent: Boolean
  },
  inheritAttrs: false,
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
      return props.topParent
    })

    const getClass = computed(() => {
      return [
        'menu-list-item',
        {
          'menu-list-item-selected': unref(active)
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
