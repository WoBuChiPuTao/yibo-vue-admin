<template>
  <BasicContainer>
    <PasswordMeter v-model="value"></PasswordMeter>
    <IconPicker v-model="value" />
  </BasicContainer>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import PasswordMeter from '@/components/password/PasswordMeter.vue'
import IconPicker from '@/components/icons/IconPicker.vue'

export default defineComponent({
  name: 'ModifyPassowrd',
  components: { PasswordMeter, IconPicker },
  setup() {
    const value = ref<string>('')
    return { value }
  }
})
</script>
