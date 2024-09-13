import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '@/components/DashboardView.vue'
import authRoutes from '@/module/auth/routes/auth-routes.js'
import settingRoutes from '@/module/requisition/routes/settings-routes.js'
import DocumentDetailView from '@/module/requisition/views/documents/DocumentDetailView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: DashboardView,
      children: [
        {
          path: 'documents/:id',
          name: 'DocumentDetail',
          component: DocumentDetailView
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
