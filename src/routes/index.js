import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '@/components/DashboardView.vue'
import authRoutes from '@/module/auth/routes/auth-routes.js'
import DashboardLayout from '@/components/DashboardLayout.vue'
import settingRoutes from '@/module/requisition/routes/settings-routes.js'
import UserDetailView from '@/module/requisition/views/UserDetailView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: DashboardView,
      children: [
        {
          path: 'main',
          name: 'DashboardMain',
          component: DashboardLayout
        },
        ...settingRoutes
      ]
    },
    {
      path: '/',
      redirect: '/dashboard/main'
    },
    ...authRoutes
  ]
})

export default router
