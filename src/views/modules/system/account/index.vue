<template>
  <div> account_management </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'AccountManagement',
  components: {},
  setup() {
    const value = ref<string>('')
    return { value }
  }
})
</script>
