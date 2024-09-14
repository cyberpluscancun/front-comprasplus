const authRoutes = [
  {
    path: '/auth',
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
