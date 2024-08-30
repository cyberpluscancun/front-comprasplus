import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    isCreatingNewUser: false
  }),
  actions: {
    startCreatingUser() {
      this.isCreatingNewUser = true
    },
    stopCreatingUser() {
      this.isCreatingNewUser = false
    }
  }
})
