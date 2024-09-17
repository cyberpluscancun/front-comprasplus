// src/router/guards/auth-guard.js
import { useAuthStore } from '@/store/auth/useAuthStore'

export const authGuard = async (to, from, next) => {
  const authStore = useAuthStore() // Mueve esto aquí dentro
  const protectedRoute = to.matched.some((record) => record.meta.requireAuth)

  if (protectedRoute && !authStore.token) {
    const tokenFromStorage = localStorage.getItem('token')
    if (tokenFromStorage) {
      authStore.token.value = tokenFromStorage
      next()
    } else {
      next({ name: 'Login' })
    }
  } else {
    next()
  }
}
