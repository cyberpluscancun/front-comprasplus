const settingRoutes = [
  {
    path: 'settings',
    name: 'Settings',
    component: () => import('@/components/SettingsLayout.vue'),
    meta: { layout: 'settings' },
    children: [
      {
        path: 'users',
        name: 'Users',
        component: () => import('@/module/requisition/views/users/UserDetailView.vue'),
        meta: { layout: 'users' },
        children: [
          {
            path: 'user/:id',
            name: 'UserDetail',
            component: () => import('@/module/requisition/components/users/UserDetailComponent.vue')
          }
        ]
      }
    ]
  }
]

export default settingRoutes
