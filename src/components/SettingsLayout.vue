<script setup>
import { useRoute, useRouter } from 'vue-router'
import ButtonComponent from '@/commons/ButtonComponent.vue'

const route = useRoute()
const router = useRouter()

function goBack() {
  let currentPath = route.path
  if (currentPath.includes('/dashboard/settings/users')) {
    router.push('/dashboard/settings')
  } else if (currentPath.includes('/dashboard/settings')) {
    router.push('/dashboard/main')
  } else {
    router.push('/dashboard/main')
  }
}

function goUserDetails() {
  router.push('/dashboard/settings/users')
}
</script>

<template>
  <div v-if="route.meta.layout === 'users'">
    <div class="m-3.5 mt-3.5">
      <div class="flex">
        <div>
          <button
            @click="goBack"
            type="button"
            class="bg-gray text-background p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-primary focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <svg
              class="w-6 h-6 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m15 19-7-7 7-7"
              />
            </svg>

            <span class="sr-only">Config</span>
          </button>
        </div>
        <div class="bg-card w-full ml-4 rounded-lg">
          <h1 id="title" class="ml-4 text-5xl font-bold">Configuración</h1>
        </div>
      </div>
      <div class="p-2 mt-2.5">
        <router-view />
      </div>
    </div>
  </div>
  <div v-else class="m-3.5 mt-3.5">
    <div class="flex">
      <div>
        <button
          @click="goBack"
          type="button"
          class="bg-gray text-background p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-primary focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <svg
            class="w-6 h-6 text-gray-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m15 19-7-7 7-7"
            />
          </svg>

          <span class="sr-only">Config</span>
        </button>
      </div>
      <div class="bg-card w-full ml-4 rounded-lg">
        <h1 id="title" class="ml-4 text-5xl font-bold">Configuración</h1>
      </div>
    </div>

    <div class="p-2 mt-3.5">
      <div class="grid grid-cols-4 gap-2">
        <div class="h-[6rem] w-[12rem] rounded-lg bg-card p-2">
          <div class="grid place-items-center">
            <h1 class="font-bold">Usuarios</h1>
            <div class="flex mt-2.5">
              <div>
                <ButtonComponent label="Gestionar Usuarios" @click="goUserDetails" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#title {
  font-size: 1.5rem;
}
</style>
