<template>
  <span :class="$attrs.class">
    <Icon :icon="icon"></Icon>
  </span>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Icon } from '@iconify/vue'
export default defineComponent({
  name: 'EIcon',
  components: { Icon },
  props: {
    icon: {
      type: String,
      default: null
    }
  },
  setup() {
    return {}
  }
})
</script>
