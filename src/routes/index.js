import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '@/components/DashboardView.vue'
import SettingsLayout from '@/components/SettingsLayout.vue'
import authRoutes from '@/module/auth/routes/auth-routes.js'
import DashboardLayout from '@/components/DashboardLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/dashboard', // Ruta /dashboard
      name: 'Dashboard',
      component: DashboardView,
      children: [
        {
          path: '', // Ruta vacía para redireccionar a /dashboard/main
          redirect: '/dashboard/main'
        },
        {
          path: 'main', // Ruta por defecto que muestra el DashboardLayout
          name: 'DashboardMain',
          component: DashboardLayout
        },
        {
          path: 'settings', // Ruta para settings
          name: 'Settings',
          component: SettingsLayout
        }
      ]
    },
    {
      path: '/', // Ruta raíz, redirige a /dashboard
      redirect: '/dashboard'
    },
    ...authRoutes
  ]
})

export default router
