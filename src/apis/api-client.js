import axios from 'axios'
import { useAuthStore } from '@/store/auth/useAuthStore.js'

// Crear una instancia configurada de Axios
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL
})

const apiClientContpaq = axios.create({
  baseURL: import.meta.env.VITE_API_URL_COM
})

apiClient.interceptors.request.use((config) => {
  const authStore = useAuthStore()
  const token = authStore.$state.token

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

apiClientContpaq.interceptors.request.use((config) => {
  const authStore = useAuthStore()
  const token = authStore.$state.token

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

export { apiClient, apiClientContpaq }
