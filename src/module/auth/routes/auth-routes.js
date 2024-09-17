const authRoutes = [
  {
    path: '/auth',
    meta: { requireAuth: false },
    children: [
      {
        path: 'login',
        name: 'Login',
        component: () => import('@/module/auth/layout/LogIn.vue'),
        meta: { layout: 'auth' }
      }
    ]
  }
]

export default authRoutes
