import { createRouter, createWebHistory } from 'vue-router'
import authRoutes from '@/module/auth/routes/auth-routes.js'
import settingRoutes from '@/module/requisition/routes/settings-routes.js'
import { authGuard } from '@/routes/guards/auth-guard.js'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: () => import('@/components/DashboardView.vue'),
      meta: { requireAuth: true },
      children: [
        {
          path: 'documents/:folioUuid',
          name: 'DocumentDetail',
          component: () => import('@/module/requisition/views/documents/DocumentDetailView.vue')
        },
        ...settingRoutes
      ]
    },
    {
      path: '/',
      redirect: '/auth/login'
    },
    {
      path: '/:catchAll(.*)',
      redirect: '/auth/login'
    },
    ...authRoutes
  ]
})

router.beforeEach(authGuard)

export default router
