<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import UserMiniCardComponent from '@/module/requisition/components/users/UserMiniCardComponent.vue'
import { useUserEvent } from '@/store/user/useUserEvent.js'
import { useUserStore } from '@/store/user/useUserStore.js'
import PaginatorView from '@/module/requisition/views/PaginatorView.vue'

const router = useRouter()
const userEvent = useUserEvent()
const userStore = useUserStore()

onMounted(async () => {
  await userStore.loadUsers()
  console.log(userStore.users)
})

const goToUserDetail = (id) => {
  console.log(id)
  router.push({ name: 'UserDetail', params: { id } })
}

const handleNewUser = () => {
  userEvent.startCreatingUser()
}

const { isLoading, error } = userStore
</script>

<template>
  <div class="w-full">
    <button
      @click="handleNewUser"
      type="button"
      class="text-text-white w-full bg-gray focus:ring-4 hover:bg-primary font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
    >
      Nuevo Usuario
    </button>
  </div>
  <div class="mt-2.5">
    <form class="flex items-center max-w-sm mx-auto">
      <label for="simple-search" class="sr-only">Buscar</label>
      <div class="relative w-full">
        <input
          type="text"
          id="simple-search"
          class="bg-gray-50 h-[2rem] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Buscar por Nombre"
          required
        />
      </div>
      <button
        type="submit"
        class="bg-primary text-background p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        <svg
          class="w-4 h-4"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
          />
        </svg>
        <span class="sr-only">Buscar</span>
      </button>
    </form>
  </div>
  <div class="h-[calc(100vh-6.25rem)] bg-gray-800 text-center">
    <!-- List mini cards -->
    <div id="users-list-container">
      <div v-if="isLoading" class="loading">Cargando usuarios...</div>

      <div v-if="error" class="error">Error al cargar usuarios: {{ error }}</div>

      <PaginatorView :items="userStore.users">
        <template #default="{ item }">
          <UserMiniCardComponent
            :Name="item.Name"
            :Email="item.Email"
            :LastNameFather="item.LastNameFather"
            @click="() => goToUserDetail(item.UserId)"
          />
        </template>
      </PaginatorView>
    </div>
  </div>
</template>

<style scoped></style>
