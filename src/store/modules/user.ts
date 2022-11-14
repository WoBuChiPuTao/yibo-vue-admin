import { defineStore } from 'pinia'
import { userType } from './types'

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
    setUser(user: userType | null) {
      if (user) {
        this.user = user
      } else {
        this.user = {}
      }
    }
  }
})
