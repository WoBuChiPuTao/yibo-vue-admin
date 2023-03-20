<template>
  <span :class="$attrs.class">
    <Icon :icon="icon"></Icon>
  </span>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Icon, IconifyIcon, addIcon } from '@iconify/vue/dist/offline'
export default defineComponent({
  name: 'EIcon',
  components: { Icon },
  props: {
    icon: {
      type: String,
      default: undefined
    },
    postIcon: {
      type: Object as PropType<IconifyIcon>,
      default: undefined
    }
  },
  setup(props) {
    props.postIcon && addIcon(props.icon as string, props.postIcon)
    return {}
  }
})
</script>
