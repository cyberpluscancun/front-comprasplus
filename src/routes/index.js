import { createRouter, createWebHistory } from 'vue-router'
import authRoutes from '@/module/auth/routes/auth-routes.js'
import settingRoutes from '@/module/requisition/routes/settings-routes.js'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: () => import('@/components/DashboardView.vue'),
      children: [
        {
          path: 'documents/:id',
          name: 'DocumentDetail',
          component: () => import('@/module/requisition/views/documents/DocumentDetailView.vue')
        },
        ...settingRoutes
      ]
    },
    {
      path: '/',
      redirect: '/auth'
    },
    ...authRoutes
  ]
})

export default router
