import { defineStore } from 'pinia'

export default defineStore('auth', {
  state: () => {
    return { isAuthenticated: false, user: {} }
  },
  getters: {
    getAuthenticated: (state) => state.isAuthenticated,
    getUser: (state) => state.user
  },
  actions: {
    setAuth(isAuth: boolean) {
      if (isAuth) {
        this.isAuthenticated = isAuth
      } else {
        this.isAuthenticated = false
      }
    },
    setUser(user: null) {
      if (user) {
        this.user = user
      } else {
        this.user = {}
      }
    }
  }
})
