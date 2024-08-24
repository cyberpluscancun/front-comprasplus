import Login from '@/module/auth/layout/LogIn.vue'

const authRoutes = [
  {
    path: '/auth',
    component: Login,
    children: [
      {
        path: 'login',
        name: 'Login',
        component: Login,
        meta: { layout: 'auth' }
      }
    ]
  }
]

export default authRoutes
