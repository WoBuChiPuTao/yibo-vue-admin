<template>
  <BasicContainer>
    <PasswordMeter v-model="value"></PasswordMeter>
  </BasicContainer>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import PasswordMeter from '@/components/password/PasswordMeter.vue'

export default defineComponent({
  name: 'ModifyPassowrd',
  components: { PasswordMeter },
  setup() {
    const value = ref<string>('')
    return { value }
  }
})
</script>
