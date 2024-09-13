import { defineStore } from 'pinia'
import { ref } from 'vue'
import { jwtDecode } from 'jwt-decode'
import { useRouter } from 'vue-router'

export const useAuthStore = defineStore('authStore', () => {
  const router = useRouter()
  const token = ref('')
  const userDb = ref({})

  const getLoginUser = async (payload) => {
    token.value = payload
    if (payload === '') {
      userDb.value = {}
    } else {
      userDb.value = jwtDecode(payload)
      await router.push({ name: 'Dashboard' })
    }
  }

  const saveLoginUser = async (payload) => {
    localStorage.setItem('token', payload)
    await getLoginUser(payload)
  }

  const closeLoginUser = async () => {
    userDb.value = {}
    localStorage.removeItem('token')
    await router.push({ name: 'Login' })
  }

  const readToken = async () => {
    const token = localStorage.getItem('token')
    if (token) {
      await getLoginUser(token)
    } else {
      userDb.value = {}
    }
  }

  return {
    userDb,
    token,
    getLoginUser,
    saveLoginUser,
    closeLoginUser,
    readToken
  }
})
