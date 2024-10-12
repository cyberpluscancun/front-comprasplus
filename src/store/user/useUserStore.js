import { defineStore } from 'pinia'
import { ref } from 'vue'
import { userService } from '@/services/user/user-service.js'

export const useUserStore = defineStore('userStore', () => {
  const users = ref([])
  const afterPage = ref(null)
  const beforePage = ref(null)
  const totalDocuments = ref(0)
  const isLoading = ref(false)
  const error = ref(null)

  const loadUsers = async () => {
    isLoading.value = true
    error.value = null
    try {
      const response = await userService.get(`/api/v1/users`)
      const data = response.data
      console.log(data)
      users.value = data.users.map((user) => ({ ...user, UserId: String(user.UserId) }))
      afterPage.value = data.afterPage
      beforePage.value = data.beforePage
      totalDocuments.value = data.count
      console.log(users.value)
    } catch (err) {
      error.value = err.message
      console.error('Error loading users:', err)
    } finally {
      isLoading.value = false
    }
  }

  const getUserByID = async (id) => {
    return users.value.find((user) => user.UserId === String(id))
  }

  const saveNewUser = async (data) => {
    console.log('Guardando usuario:', data)
    const response = await userService.post(`/api/v1/users`, data)
    console.log(response)
  }

  const updateUser = async (id, data) => {
    console.log('Actualizando usuario con ID:', id)
    console.log('Datos del usuario:', data)
    const response = await userService.path(`/api/v1/users/${Number(id)}`, data)
    console.log(response)
    return response // Asegúrate de devolver la respuesta si es necesario
  }

  return {
    users,
    isLoading,
    error,
    loadUsers,
    getUserByID,
    saveNewUser,
    updateUser
  }
})
