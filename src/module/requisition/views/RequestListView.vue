<script setup>
import ListMiniCardView from '@/module/requisition/views/ListMiniCardView.vue'
import { onMounted, ref } from 'vue'
import RequestMiniCardComponent from '@/module/requisition/components/RequestMiniCardComponent.vue'

const requests = ref([])
onMounted(async () => {
  try {
    const response = await fetch('/src/store/requests.json')
    if (!response.ok) {
      throw new Error('Error fetching requests data')
    }
    requests.value = await response.json()
    console.log(requests.value)
    for (let item in requests.value) {
      console.log(item)
    }
  } catch (error) {
    console.error('Error fetching requests data:', error)
  }
})
</script>

<template>
  <div class="w-full">
    <button
      type="button"
      class="text-text-white w-full bg-gray focus:ring-4 hover:bg-primary font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
    >
      Nueva Solicitud
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
          placeholder="Buscar por Titulo/Folio"
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
  <ListMiniCardView :items="requests">
    <template #default="{ item }">
      <RequestMiniCardComponent :title="item.title" :date="item.date" :folio="item.folio" />
    </template>
  </ListMiniCardView>
</template>

<style scoped></style>
