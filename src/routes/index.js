import { createRouter, createWebHistory } from 'vue-router'
import HelloWorld from '@/components/HelloWorld.vue'
import authRoutes from '@/module/auth/routes/auth-routes.js'
import DashboardView from '@/components/DashboardView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/dashboard', // Ruta /dashboard
      name: 'Dashboard',
      component: DashboardView // Asigna App.vue como el componente
    },
    {
      path: '/', // Ruta raíz, redirige a /dashboard
      redirect: '/dashboard'
    },
    {
      name: 'HelloWorld',
      path: '/hello',
      component: HelloWorld
    },
    ...authRoutes
  ]
})

export default router
