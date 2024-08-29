<script setup>
import ItemCardView from '@/module/requisition/components/ItemCardComponent.vue'
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
  <div>
    <div class="m-3.5 mt-3.5">
      <nav class="h-[calc(100vh-87vh)] bg-purple rounded-lg">
        <div class="grid gap-4 p-2 ml-2">
          <div class="grid grid-cols-6 mt-2.5 gap-4">
            <div class="h-auto max-w-full">
              <div class="grid place-items-start">
                <div class="font-bold">
                  <h1>Titulo</h1>
                </div>
                <div class="font-light">
                  <h3>Centro Gasto / Departamento</h3>
                </div>
              </div>
            </div>
            <div class="h-auto max-w-full">
              <div class="grid place-items-start">Fecha</div>
            </div>
            <div class="h-auto max-w-full">
              <div class="grid place-items-start">Folio</div>
            </div>
            <div class="h-auto max-w-full">
              <div class="flex">
                <div>
                  <div class="font-bold">
                    <h1>Autorización1</h1>
                  </div>
                  <div class="font-light grid place-items-center">
                    <div class="flex items-center">
                      <input
                        id="checked-checkbox"
                        type="checkbox"
                        value=""
                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                    </div>
                  </div>
                </div>
                <div class="ml-4">
                  <div class="font-bold">
                    <h1>Autorización2</h1>
                  </div>
                  <div class="font-light grid place-items-center">
                    <div class="flex items-center">
                      <input
                        checked
                        id="checked-checkbox"
                        type="checkbox"
                        value=""
                        class="w-4 h-4 text-blue-600 bg-gray-100 bord er-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="h-auto max-w-full"></div>
            <div class="h-auto max-w-full">
              <div class="grid place-items-center">
                <div>
                  <svg
                    class="w-9 h-9 text-gray-800 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M12 20a7.966 7.966 0 0 1-5.002-1.756l.002.001v-.683c0-1.794 1.492-3.25 3.333-3.25h3.334c1.84 0 3.333 1.456 3.333 3.25v.683A7.966 7.966 0 0 1 12 20ZM2 12C2 6.477 6.477 2 12 2s10 4.477 10 10c0 5.5-4.44 9.963-9.932 10h-.138C6.438 21.962 2 17.5 2 12Zm10-5c-1.84 0-3.333 1.455-3.333 3.25S10.159 13.5 12 13.5c1.84 0 3.333-1.455 3.333-3.25S13.841 7 12 7Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <button
                    type="button"
                    class="text-text-white bg-primary h-[2rem] hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                  >
                    Exportar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div id="item-card-view" class="bg-purple2 rounded-lg mt-3.5">
        <form class="p-3.5">
          <div class="gap-6 mb-2">
            <div class="flex">
              <div>
                <label
                  for="quantity"
                  class="block text-sm font-medium text-gray-900 dark:text-white"
                  >Cantidad</label
                >
                <input
                  type="number"
                  id="quantity"
                  class="bg-gray-50 border w-[5.6ren] h-[2rem] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Cantidad"
                  required
                />
              </div>
              <div class="ml-3.5 w-full grid place-items-start">
                <label
                  for="last_name"
                  class="block text-sm font-medium text-gray-900 dark:text-white"
                  >Descripción</label
                >
                <input
                  type="text"
                  id="last_name"
                  class="bg-gray-50 h-[2rem] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Descripción"
                  required
                />
              </div>
            </div>
            <div class="py-1">
              <label for="company" class="block text-sm font-medium text-gray-900 dark:text-white"
                >Comentarios</label
              >
              <input
                type="text"
                id="company"
                class="bg-gray-50 h-[2rem] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Comentarios..."
                required
              />
            </div>
            <div class="grid place-items-end mt-2.5">
              <button
                type="submit"
                class="px-2 py-1 text-xs font-medium text-center inline-flex items-center text-text-white bg-gray hover:bg-primary rounded"
              >
                <svg
                  class="mr-1 w-5 h-5 text-gray-800 dark:text-white"
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
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Agregar
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>

    <div id="item-card-view-container" class="m-3.5 overflow-y-auto h-[calc(100vh-20rem)]">
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
                Anterior
              </button>
            </li>

            <li v-for="page in totalPages" :key="page">
              <button
                @click="goToPage(page)"
                :class="{
                  'bg-primary text-text-white border border-gray-300': page === currentPage,
                  'text-gray-500 bg-white border-gray-300 hover:bg-gray-100 hover:text-gray-700':
                    page !== currentPage
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
                Siguiente
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
