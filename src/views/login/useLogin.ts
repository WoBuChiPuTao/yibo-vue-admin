import { computed, ref } from 'vue'

export enum LoginStateEnum {
  LOGIN,
  REGISTER,
  FORGET_PASSWORD,
  MOBILE,
  QR_CODE
}

const loginState = ref(LoginStateEnum.LOGIN)

export function useLoginState() {
  function setLoginState(state: LoginStateEnum) {
    loginState.value = state
  }

  const getLoginState = computed(() => loginState.value)

  function backToLogin() {
    setLoginState(LoginStateEnum.LOGIN)
  }
  return { getLoginState, setLoginState, backToLogin }
}
