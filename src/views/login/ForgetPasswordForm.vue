<template>
  <template v-if="getShow">
    <h2 class="h-center enter-x">{{ t('sys.login.forgetFormTitle') }}</h2>
    <ElForm class="enter-x">
      <ElFormItem class="enter-x">
        <el-input size="large" :placeholder="t('sys.login.userName')">
        </el-input
      ></ElFormItem>
      <ElFormItem class="enter-x">
        <el-input size="large" :placeholder="t('sys.login.mobile')"> </el-input
      ></ElFormItem>
      <ElFormItem class="enter-x">
        <el-input size="large" :placeholder="t('sys.login.smsCode')">
        </el-input>
      </ElFormItem>
      <ElFormItem class="enter-x">
        <el-button type="primary" size="large" round class="back-fill">{{
          t('common.button.resetText')
        }}</el-button>
      </ElFormItem>
      <ElFormItem class="relative-box enter-x">
        <ElButton
          type="primary"
          link
          size="default"
          class="absolute-right-3-top-5"
          @click="setLoginState(LoginStateEnum.LOGIN)"
          >{{ t('sys.login.backSignIn') }}</ElButton
        >
      </ElFormItem>
    </ElForm>
  </template>
</template>

<script setup lang="ts">
import { ElForm, ElFormItem, ElInput, ElButton } from 'element-plus'
import { LoginStateEnum, useLoginState } from './useLogin'
import { useI18n } from '@/hooks/web/useI18n'
import { computed, unref } from 'vue'

const { getLoginState, setLoginState } = useLoginState()
const { t } = useI18n()

const getShow = computed(
  () => unref(getLoginState.value) === LoginStateEnum.FORGET_PASSWORD
)
</script>
