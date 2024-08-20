import {createRouter, createWebHistory} from 'vue-router'
import HelloWorld from "@/components/HelloWorld.vue";
import authRoutes from '@/module/auth/routes/auth-routes.js'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            name: 'HelloWorld',
            path: '/hello',
            component: HelloWorld
        },
      ...authRoutes,
    ]
})

export default router
