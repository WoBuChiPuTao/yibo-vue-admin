import { defineStore } from 'pinia'

const useStore = defineStore('user', {
  state: () => ({
    userInfo: JSON.parse(window.localStorage.getItem('userInfo') || '{}'),
    isLogged: false
  }),
  getters: {},
  actions: {
    setUserInfo() {
      console.log('getUserInfo')
    }
  }
})
export default useStore
