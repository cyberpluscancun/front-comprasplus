<script setup>
import MiniCard from '@/components/MiniCardComponent.vue'
import { ref, computed } from 'vue'
import MenuComponent from '@/components/MenuComponent.vue'

// Array de objetos con propiedades title, date, y folio
const itemList = ref([
  { id: 1, title: 'Item 1', date: '2024-08-01', folio: '001' },
  { id: 2, title: 'Item 2', date: '2024-08-02', folio: '002' },
  { id: 3, title: 'Item 3', date: '2024-08-03', folio: '003' },
  { id: 4, title: 'Item 4', date: '2024-08-04', folio: '004' },
  { id: 5, title: 'Item 5', date: '2024-08-05', folio: '005' },
  { id: 6, title: 'Item 6', date: '2024-08-06', folio: '006' },
  { id: 7, title: 'Item 7', date: '2024-08-07', folio: '007' },
  { id: 8, title: 'Item 8', date: '2024-08-08', folio: '008' },
  { id: 9, title: 'Item 9', date: '2024-08-09', folio: '009' },
  { id: 10, title: 'Item 10', date: '2024-08-10', folio: '010' }
])

const itemsPerPage = ref(5)
const currentPage = ref(1)

const totalPages = computed(() => Math.ceil(itemList.value.length / itemsPerPage.value))

const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return itemList.value.slice(start, end)
})

const goToPage = (page) => {
  if (page > 0 && page <= totalPages.value) {
    currentPage.value = page
  }
}
</script>

<template>
  <div class="h-[calc(100vh-6.25rem)] bg-gray-800 text-center">
    <div class="mt-2.5 h-[70%] mini-card-view-container rounded-lg">
      <div v-for="item in paginatedItems" :key="item.id">
        <MiniCard :title="item.title" :date="item.date" :folio="item.folio" />
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
                <
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
                >
              </button>
            </li>

          </ul>
        </nav>
      </div>
    </div>
    <MenuComponent />
  </div>
</template>

