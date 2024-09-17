import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export const useUserStore = defineStore('userStore', () => {
  const users = ref([])
  const isLoading = ref(false)
  const error = ref(null)

  const loadUsers = async () => {
    isLoading.value = true
    error.value = null
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/users`)
      if (!response.ok) {
        throw new Error('Failed to load users')
      }
      let data = await response.json()
      users.value = data.map((user) => ({ ...user, UserId: String(user.UserId) }))
      console.log(users.value)
    } catch (err) {
      error.value = err.message
      console.error('Error loading users:', err)
    } finally {
      isLoading.value = false
    }
  }

  const getUserByID = (id) => {
    return users.value.find((user) => user.UserId === id)
  }

  return {
    users,
    isLoading,
    error,
    loadUsers,
    getUserByID
  }
})
