import { defineStore } from 'pinia'
import { ref } from 'vue'
import { jwtDecode } from 'jwt-decode'
import { useRouter } from 'vue-router'
import { authService } from '@/services/auth/auth-service.js'

export const useAuthStore = defineStore('authStore', () => {
  const router = useRouter()
  const token = ref('')
  const userDb = ref({})
  const errorMessage = ref('')

  const initAuth = () => {
    const storedToken = localStorage.getItem('token')
    if (storedToken) {
      token.value = storedToken
    }
  }

  const login = async (payload) => {
    try {
      const response = await authService.post('/api/v1/auth', payload)

      const data = response.data
      console.log(data)

      token.value = data.token

      userDb.value = await getLoginUser(token.value)
      console.log(`Value UserDB ${userDb.value.UserId}`)
      await saveLoginUser(data.token)

      await router.push({ name: 'Dashboard' })
    } catch (err) {
      if (err.response) {
        console.error('Error en la respuesta del servidor:', err.response.data)
        errorMessage.value = 'Error en la autenticación'
      } else if (err.request) {
        console.error('Error en la solicitud:', err.request)
        errorMessage.value = 'Fallo de conexión'
      } else {
        console.error('Error:', err.message)
        errorMessage.value = 'Fallo de conexión'
      }
    }
  }

  const getLoginUser = async (payload) => {
    if (payload === '') {
      return {}
    } else {
      return jwtDecode(payload)
    }
  }

  const saveLoginUser = async (payload) => {
    localStorage.setItem('token', payload)
    await getLoginUser(payload)
  }

  const logout = async () => {
    userDb.value = {}
    token.value = ''
    localStorage.removeItem('token')
    await router.push({ name: 'Login' })
  }

  const getToken = async () => {
    return localStorage.getItem('token')
  }

  const getUserId = async () => {
    const userDB = await getLoginUser(await getToken())
    return userDB.UserId
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
    errorMessage,
    initAuth,
    getToken,
    getUserId,
    getLoginUser,
    saveLoginUser,
    logout,
    login,
    readToken
  }
})
