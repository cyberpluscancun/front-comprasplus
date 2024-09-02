import { defineStore } from 'pinia'

export const useUserEvent = defineStore('user', {
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
