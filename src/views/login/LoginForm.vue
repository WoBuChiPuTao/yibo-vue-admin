<template>
  <template v-if="getShow">
    <h2 class="h-center enter-x">{{ t('sys.login.signInFormTitle') }}</h2>
    <el-form class="enter-x" :model="loginForm" @keypress.enter="handleLogin">
      <el-form-item class="enter-x" prop="account">
        <el-input size="large" v-model="loginForm.account" :placeholder="t('sys.login.userName')">
        </el-input>
      </el-form-item>
      <el-form-item prop="password" class="enter-x">
        <el-input
          type="password"
          size="large"
          v-model="loginForm.password"
          :placeholder="t('sys.login.password')"
          show-password
        >
        </el-input>
      </el-form-item>
      <el-row>
        <el-col :span="12" class="enter-x">
          <el-form-item>
            <ElCheckbox v-model="rememberMe" size="small">
              {{ t('sys.login.rememberMe') }}
            </ElCheckbox>
          </el-form-item>
        </el-col>
        <el-col :span="12" class="enter-x">
          <el-form-item class="relative">
            <ElButton
              type="primary"
              link
              size="small"
              class="absolute-right"
              @click="setLoginState(LoginStateEnum.FORGET_PASSWORD)"
              >{{ t('sys.login.forgetPassword') }}</ElButton
            >
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item class="enter-x">
        <el-button
          type="primary"
          size="large"
          round
          class="back-fill"
          @click="handleLogin"
          :loading="loading"
          >{{ t('sys.login.loginButton') }}</el-button
        >
      </el-form-item>
    </el-form>
    <el-row>
      <el-col></el-col>
      <el-col></el-col>
      <el-col></el-col>
    </el-row>
    <ElDivider class="enter-x">{{ t('sys.login.otherSignIn') }}</ElDivider>
    <div class="login-icon-container enter-x">
      <Icon icon="mdi:github"></Icon>
      <Icon icon="ic:baseline-wechat"></Icon>
      <Icon icon="ri:alipay-fill"></Icon>
      <Icon icon="ph:google-logo-fill"></Icon>
      <Icon icon="ic:baseline-facebook"></Icon>
    </div>
  </template>
</template>

<script lang="ts" setup>
import {
  ElForm,
  ElFormItem,
  ElInput,
  ElRow,
  ElCol,
  ElButton,
  ElCheckbox,
  ElDivider,
  ElNotification
} from 'element-plus'
import { ref, reactive, unref, computed } from 'vue'
// mock
// eslint-disable-next-line import/no-absolute-path
import '/mock/login'
import { useUserStore } from '@/store/modules/user'
import { LoginStateEnum, useLoginState } from './useLogin'
import { useI18n } from '@/hooks/web/useI18n'
import EIcon from '@/components/icons/EIcon.vue'
import Icon from '@/components/icons/Icon.vue'

const { getLoginState, setLoginState } = useLoginState()
const { t } = useI18n()

const getShow = computed(() => unref(getLoginState.value) === LoginStateEnum.LOGIN)

const rememberMe = ref(false)
const loading = ref(false)

const loginForm = reactive<{ account: string; password: string }>({
  account: 'lyb01',
  password: '123'
})

const userStore = useUserStore()

async function handleLogin() {
  loading.value = true
  try {
    const userInfo = await userStore.toLogin({
      username: loginForm.account,
      password: loginForm.password
    })
    if (userInfo) {
      ElNotification({
        title: t('sys.login.loginSuccessTitle'),
        message: t('sys.login.loginSuccessDesc'),
        duration: 3000,
        type: 'success'
      })
    }
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
}
</script>

<style lang="less" scoped>
.relative {
  position: relative;

  .absolute-right {
    position: absolute;
    right: 0;
    top: 3px;
  }
}

.login-icon-container {
  display: flex;
  justify-content: space-around;
  font-size: 1.6rem;

  span {
    cursor: pointer;

    &:hover {
      color: var(--el-color-primary-dark-2);
    }
  }
}
</style>
