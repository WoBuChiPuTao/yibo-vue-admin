<template>
    <Icon :icon="icon" :class="$attrs.class"></Icon>
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
