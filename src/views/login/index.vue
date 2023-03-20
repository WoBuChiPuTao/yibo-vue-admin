<template>
  <div class="body">
    <div class="app-setting-fixed">
      <AppThemeToggle class="theme-toggle" mode="icon"></AppThemeToggle>
      <AppLocalePicker class="locale-toggle" :reload="false"></AppLocalePicker>
    </div>
    <div class="container">
      <LoginForm></LoginForm>
      <RegisterForm></RegisterForm>
      <ForgetPasswordForm></ForgetPasswordForm>
    </div>
  </div>
</template>

<script lang="ts" setup>
import LoginForm from './LoginForm.vue'
import RegisterForm from './RegisterForm.vue'
import AppThemeToggle from '@/components/application/AppThemeToggle.vue'
import AppLocalePicker from '@/components/application/AppLocalePicker.vue'
import ForgetPasswordForm from './ForgetPasswordForm.vue'
</script>

<style lang="less">
.body {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.app-setting-fixed {
  position: fixed;
  top: 1.5rem;
  right: 1.5rem;
  display: flex;
  align-items: center;
  .theme-toggle {
    margin-right: 0.8rem;
  }

  .locale-toggle {
    .picker-content {
      font-size: 20px;
    }
  }
}

.container {
  height: auto;
  width: 80%;
  position: relative;
  border-radius: 5px;
  padding: 1rem;

  .h-center {
    text-align: center;
  }

  .back-fill {
    width: 100%;
    height: 100%;
  }

  .relative-box {
    position: relative;

    .absolute-right-3-top-5 {
      position: absolute;
      right: 3px;
      top: 5px;
    }
  }
}

@media screen and (min-width: 576px) {
  .container {
    width: 50%;
    padding: 1.5rem;
  }
}

@media screen and (min-width: 990px) {
  .container {
    width: 40%;
  }
}

@media screen and (min-width: 1200px) {
  .container {
    width: 30%;
    padding: 2rem;
  }
}

@media screen and (min-width: 1600px) {
  .container {
    width: 20%;
  }
}
</style>
