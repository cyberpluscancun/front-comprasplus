<script setup>
import { useRoute } from 'vue-router'
import UserListView from '@/module/requisition/views/users/UserListView.vue'
import DocumentListView from '@/module/requisition/views/documents/DocumentListView.vue'
import ModalComponent from '@/commons/ModalComponent.vue'

const route = useRoute()
</script>

<template>
  <div v-if="route.meta.layout === 'auth'" class="auth-layout">
    <RouterView />
  </div>

  <div v-else class="w-screen h-screen flex">
    <ModalComponent />
    <!-- SideBar navigation -->
    <div class="grid place-items-center w-[25rem] h-full bg-background text-white">
      <!-- Contenido de la barra lateral -->
      <div>
        <div class="h-[6.25rem] bg-gray-900 text-zinc-950">
          <div>
            <a
              href="http://localhost:5173/"
              class="flex items-center space-x-3 rtl:space-x-reverse"
            >
              <img class="mt-8 mx-auto h-10 w-auto" src="@/assets/logo.png" alt="Compras+" />
            </a>
          </div>
        </div>
        <!-- Botón y formulario -->
        <div id="minicard-container">
          <UserListView v-if="route.path.includes('/dashboard/settings/users')" />
          <DocumentListView v-else />
        </div>
      </div>
    </div>

    <!-- Split -->
    <div class="w-[0.15rem] h-full bg-gray"></div>

    <!-- Right side navigation -->
    <div id="right-side-navigation" class="w-full h-full bg-background">
      <!-- Aquí se carga el contenido de las rutas hijas -->
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
input {
  height: 2rem;
}

.auth-layout {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f7f9fc;
}

@media (max-width: 720px) {
  .mini-card-view-container {
    height: 80%;
  }
}
</style>
