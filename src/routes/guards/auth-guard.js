import { useAuthStore } from '@/store/auth/useAuthStore'
import { jwtDecode } from 'jwt-decode'

export const authGuard = async (to, from, next) => {
  const authStore = useAuthStore() // Mueve esto aquí dentro
  const protectedRoute = to.matched.some((record) => record.meta.requireAuth)

  const isTokenExpired = (token) => {
    if (!token) return true
    try {
      const decoded = jwtDecode(token)
      const currentTime = Date.now() / 1000 // En segundos
      return decoded.exp < currentTime
    } catch (error) {
      return true
    }
  }

  let token = authStore.token || localStorage.getItem('token')

  if (to.name === 'Login' && token && !isTokenExpired(token)) {
    next({ name: 'Dashboard' }) // O la ruta que maneje tu dashboard
    return
  }

  if (protectedRoute) {
    if (!token || isTokenExpired(token)) {
      authStore.token = null
      localStorage.removeItem('token')
      next({ name: 'Login' })
    } else {
      authStore.token = token
      next()
    }
  } else {
    next()
  }
}
