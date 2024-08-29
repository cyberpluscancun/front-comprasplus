import SettingsLayout from '@/components/SettingsLayout.vue'
import UserDetailView from '@/module/requisition/views/UserDetailView.vue'
import UserDetailComponent from '@/module/requisition/components/UserDetailComponent.vue'

const settingRoutes = [
  {
    path: 'settings',
    name: 'Settings',
    component: SettingsLayout,
    meta: { layout: 'settings' },
    children: [
      {
        path: 'users',
        name: 'Users',
        component: UserDetailView,
        meta: { layout: 'users' },
        children: [
          {
            path: 'user/:id',
            name: 'UserDetail',
            component: UserDetailComponent
          }
        ]
      }
    ]
  }
]

export default settingRoutes
