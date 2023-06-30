<template>
  <span :class="$attrs.class">
    <Icon v-if="mode === 'offline'" :icon="icon || ''"></Icon>
    <OIcon v-else :icon="icon || ''"></OIcon>
  </span>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Icon as OIcon } from '@iconify/vue'
import { Icon, IconifyIcon, addIcon } from '@iconify/vue/dist/offline'
export default defineComponent({
  name: 'EIcon',
  components: { Icon, OIcon },
  props: {
    icon: {
      type: Object as PropType<string | IconifyIcon>,
      default: undefined
    },
    postIcon: {
      type: Object as PropType<IconifyIcon>,
      default: undefined
    },
    mode: {
      type: String as PropType<'online' | 'offline'>,
      default: 'offline'
    }
  },
  setup(props) {
    props.postIcon && addIcon(props.icon as string, props.postIcon)
    return {}
  }
})
</script>
