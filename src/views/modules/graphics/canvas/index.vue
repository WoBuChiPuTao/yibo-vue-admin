<template>
  <div>
    <DrawCanvas></DrawCanvas>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import DrawCanvas from './draw.vue'

export default defineComponent({
  name: 'Canvas',
  components: { DrawCanvas },
  setup() {
    return {}
  }
})
</script>
