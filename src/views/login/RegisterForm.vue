<template>
  <template v-if="getShow">
    <div class="register-content">注册</div>
  </template>
</template>

<script lang="ts" setup>
import { computed, unref } from 'vue'
import { LoginStateEnum, useLoginState } from './useLogin'
const { getLoginState } = useLoginState()

const getShow = computed(
  () => unref(getLoginState.value) === LoginStateEnum.REGISTER
)
</script>

<style lang="less">
.register-content {
  width: 50%;
}
</style>
