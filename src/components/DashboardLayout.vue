<script setup>

import ItemCardView from '@/components/ItemCardView.vue'
import { ref, computed } from 'vue'

const items = ref([...Array(10).keys()]) // Simulación de 10 elementos
const itemsPerPage = ref(5)
const currentPage = ref(1)

const totalPages = computed(() => Math.ceil(items.value.length / itemsPerPage.value))

const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return items.value.slice(start, end)
})

const goToPage = (page) => {
  if (page > 0 && page <= totalPages.value) {
    currentPage.value = page
  }
}
</script>

<template>
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

      <div id="item-card-view" class="bg-purple2 rounded-lg mt-3.5">
        <form class="p-3.5">
          <div class="gap-6 mb-2">
            <div class="flex">
              <div>
                <label for="first_name"
                       class="block text-sm font-medium text-gray-900 dark:text-white">Cantidad</label>
                <input type="text" id="first_name"
                       class="bg-gray-50 border w-[5.6ren] h-[2rem] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                     class="bg-gray-50 h-[2rem] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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

    <div id="item-card-view-container" class="m-3.5 overflow-y-auto h-[calc(100vh-20rem)] ">
      <div v-for="item in paginatedItems" :key="item">
        <ItemCardView />
      </div>
      <div class="mb-5 mt-0 grid place-items-center">
        <nav aria-label="Page navigation example" class="mt-4">
          <ul class="inline-flex -space-x-px text-sm">
            <li>
              <button
                @click="goToPage(currentPage - 1)"
                :disabled="currentPage === 1"
                class="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Previous
              </button>
            </li>

            <li v-for="page in totalPages" :key="page">
              <button
                @click="goToPage(page)"
                :class="{
      'bg-primary text-text-white border border-gray-300': page === currentPage,
      'text-gray-500 bg-white border-gray-300 hover:bg-gray-100 hover:text-gray-700': page !== currentPage
    }"
                class="flex items-center justify-center px-3 h-8 leading-tight border"
              >
                {{ page }}
              </button>
            </li>

            <li>
              <button
                @click="goToPage(currentPage + 1)"
                :disabled="currentPage === totalPages"
                class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Next
              </button>
            </li>

          </ul>
        </nav>
      </div>
    </div>


    <router-view />
  </div>

</template>

<style scoped>

</style>