<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function goBack() {
  router.push('/dashboard/main')
}
</script>

<template>
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
  </div>
</template>

<style scoped>
#title {
  font-size: 1.5rem;
}
</style>
