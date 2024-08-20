<script setup>
import { useRoute } from 'vue-router'
import ItemCardView from '@/components/ItemCardView.vue'

const route = useRoute()
</script>

<template>
  <div v-if="route.meta.layout === 'auth'" class="auth-layout">
    <router-view />
  </div>

  <div v-else class="w-screen h-screen flex">
    <!-- SideBar navigation -->
    <div class="grid place-items-center w-[25rem] h-full bg-background text-white">
      <div>
        <div class="h-[6.25rem] bg-gray-900 text-zinc-950">
          <div>
            <a href="http://localhost:5173/" class="flex items-center space-x-3 rtl:space-x-reverse">
              <img class="mt-8 mx-auto h-10 w-auto" src="@/assets/logo.png"
                   alt="Compras+">
            </a>
          </div>
        </div>

        <div class="w-full">
          <button type="button"
                  class="text-text-white w-full bg-gray focus:ring-4 hover:bg-primary font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 ">
            Nueva Solicitud
          </button>
        </div>

        <div class="mt-2.5">

          <form class="flex items-center max-w-sm mx-auto">
            <label for="simple-search" class="sr-only">Buscar</label>
            <div class="relative w-full">

              <input type="text" id="simple-search"
                     class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                     placeholder="Buscar solicitud..." required />
            </div>
            <button type="submit"
                    class=" bg-primary text-background p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                   viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg>
              <span class="sr-only">Buscar</span>
            </button>
          </form>
        </div>

        <div class="h-[calc(100vh-6.25rem)] bg-gray-800 text-center">
          <div class="mt-2.5">
            List CardView
          </div>
        </div>
      </div>
    </div>

    <!-- Split -->
    <div class="w-[0.15rem] h-full bg-gray"></div>

    <!-- Right side navigation -->
    <div class="w-full h-full bg-background">
      <div class="m-3.5 mt-3.5">
        <nav class="h-[calc(100vh-87vh)] bg-purple rounded-lg">
          <div class="grid place-content-start">
            <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">

              <button data-collapse-toggle="navbar-default" type="button"
                      class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                      aria-controls="navbar-default" aria-expanded="false">
                <span class="sr-only">Open main menu</span>
                <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                     viewBox="0 0 17 14">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M1 1h15M1 7h15M1 13h15" />
                </svg>
              </button>
              <div class="hidden w-full md:block md:w-auto" id="navbar-default">
                <ul
                  class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                  <li>
                    <a href="#"
                       class="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
                       aria-current="page">Home</a>
                  </li>
                  <li>
                    <a href="#"
                       class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">About</a>
                  </li>
                  <li>
                    <a href="#"
                       class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Services</a>
                  </li>
                  <li>
                    <a href="#"
                       class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Pricing</a>
                  </li>
                  <li>
                    <a href="#"
                       class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Contact</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>

        <div id="item-card-view" class="bg-card rounded-lg mt-3.5">
          <form class="p-3.5">
            <div class="gap-6 mb-2">
              <div class="flex">
                <div>
                  <label for="first_name"
                         class="block text-sm font-medium text-gray-900 dark:text-white">Cantidad</label>
                  <input type="text" id="first_name"
                         class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[5.6ren] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                         placeholder="Cantidad" required />
                </div>
                <div class="ml-3.5 w-full grid place-items-start">
                  <label for="last_name"
                         class="block text-sm font-medium text-gray-900 dark:text-white">Descripción</label>
                  <input type="text" id="last_name"
                         class="bg-gray-50 h-[2rem] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                         placeholder="Descripción" required />
                </div>
              </div>
              <div class="py-1">
                <label for="company"
                       class="block text-sm font-medium text-gray-900 dark:text-white">Comentarios</label>
                <input type="text" id="company"
                       class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                       placeholder="Comentarios..." required />
              </div>
              <div class="grid place-items-end mt-2.5">
                <button type="submit"
                        class="px-2 py-1 text-xs font-medium text-center inline-flex items-center text-text-white bg-gray hover:bg-primary rounded">
                  <svg class="mr-1 w-5 h-5 text-gray-800 dark:text-white" aria-hidden="true"
                       xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M12 4v16m8-8H4" />
                  </svg>
                  Agregar
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div class="m-3.5 mt-3.5">
        <ItemCardView />
      </div>

      <router-view />
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

</style>
