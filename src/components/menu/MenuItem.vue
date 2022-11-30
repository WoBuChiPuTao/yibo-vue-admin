<template>
  <li>
    <slot name="title"></slot>
  </li>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MenuItem',
  setup() {
    return {}
  }
})
</script>
