<template>
  <li :class="getClass" :style="getItemStyle" @click.stop="handleClickItem">
    <slot></slot>
  </li>
</template>

<script lang="ts">
import { computed, defineComponent, getCurrentInstance, ref, unref, watch } from 'vue'
import { useMenuItem } from './useMenu'
import { useRootMenuContext } from './useMenuContext'

export default defineComponent({
  name: 'MenuItem',
  props: {
    name: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const active = ref(false)
    const instance = getCurrentInstance()
    const { getItemStyle } = useMenuItem(instance)
    const { rootMenuEmitter, selectedName } = useRootMenuContext()

    watch(() => selectedName.value, (name: string) => {
      if (name === props.name) {
        active.value = true
      } else {
        active.value = false
      }
    }, {
      immediate: true
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
      handleClickItem
    }
  }
})
</script>
