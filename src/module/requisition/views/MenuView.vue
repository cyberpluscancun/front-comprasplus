<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/store/auth/useAuthStore.js'

const router = useRouter()
const authStore = useAuthStore()

const goSettings = () => {
  router.push({ name: 'Settings' })
}

const logout = async () => {
  await authStore.logout()
}
</script>

<template>
  <div class="h-[4rem] rounded-lg mt-3.5 flex justify-between w-full">
    <div class="p-2">
      <button
        @click="goSettings"
        type="button"
        class="bg-gray text-background p-1 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-primary focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        <svg
          class="w-6 h-6 text-gray-800 dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 13v-2a1 1 0 0 0-1-1h-.757l-.707-1.707.535-.536a1 1 0 0 0 0-1.414l-1.414-1.414a1 1 0 0 0-1.414 0l-.536.535L14 4.757V4a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v.757l-1.707.707-.536-.535a1 1 0 0 0-1.414 0L4.929 6.343a1 1 0 0 0 0 1.414l.536.536L4.757 10H4a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h.757l.707 1.707-.535.536a1 1 0 0 0 0 1.414l1.414 1.414a1 1 0 0 0 1.414 0l.536-.535 1.707.707V20a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-.757l1.707-.708.536.536a1 1 0 0 0 1.414 0l1.414-1.414a1 1 0 0 0 0-1.414l-.535-.536.707-1.707H20a1 1 0 0 0 1-1Z"
          />
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
          />
        </svg>
        <span class="sr-only">Config</span>
      </button>
    </div>
    <div class="p-2">
      <button
        @click="logout"
        type="button"
        class="bg-gray text-background p-1 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-primary focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        <svg
          class="w-6 h-6 text-gray-800 dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M20 12H8m12 0-4 4m4-4-4-4M9 4H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h2"
          />
        </svg>
        <span class="sr-only">Logout</span>
      </button>
    </div>
  </div>
</template>

<style scoped></style>
