<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <div v-if="route.meta.layout === 'auth'" class="auth-layout">
    <router-view />
  </div>

  <div v-else class="w-screen h-screen flex">
    <!-- SideBar navigation -->
    <div class="grid place-items-center w-[25rem] h-full bg-background text-white">
      <div class="h-[6.25rem] bg-gray-900 text-zinc-950">
        <div>
          <img class="mt-8 mx-auto h-10 w-auto" src="@/assets/logo.png"
               alt="Compras+">
        </div>
      </div>
      <div>

        <form class="flex items-center max-w-sm mx-auto">
          <label for="simple-search" class="sr-only">Buscar</label>
          <div class="relative w-full">
<!--            <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">-->
<!--              <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">-->
<!--                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>-->
<!--              </svg>-->
<!--            </div>-->
            <input type="text" id="simple-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Buscar solicitud..." required />
          </div>
          <button type="submit" class=" bg-primary text-background p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
            <span class="sr-only">Buscar</span>
          </button>
        </form>

      </div>

      <div class="h-[calc(100vh-6.25rem)] bg-gray-800 text-center">
        <span class="text-text-color-secondary text-x">Menu</span>
      </div>
    </div>

    <div class="w-[0.15rem] h-full bg-gray"></div>

    <!-- Right side navigation -->
    <div class="w-full h-full bg-background">
      <router-view/>
    </div>
  </div>
</template>

<style scoped>
.auth-layout {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f7f9fc;
}
</style>
