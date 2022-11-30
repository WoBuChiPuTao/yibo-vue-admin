<template>
  <li>
    <slot name="title"></slot>
    <slot></slot>
  </li>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SubMenuItem',
  setup() {
    return {}
  }
})
</script>
