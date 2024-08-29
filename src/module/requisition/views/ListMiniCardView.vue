<script setup>
import { ref, computed } from 'vue'
import MenuView from '@/module/requisition/views/MenuView.vue'

// Props
const props = defineProps({
  items: {
    type: Array,
    required: true
  },
  itemsPerPage: {
    type: Number,
    default: 5
  }
})

const currentPage = ref(1)

const totalPages = computed(() => Math.ceil(props.items.length / props.itemsPerPage))

const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * props.itemsPerPage
  const end = start + props.itemsPerPage
  return props.items.slice(start, end)
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
        <slot :item="item" />
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
                >
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
    <MenuView />
  </div>
</template>
