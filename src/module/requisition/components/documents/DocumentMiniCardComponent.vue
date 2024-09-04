<script setup>
// props que recibirá el componente
import { formatDate } from '@/services/format-date.js'

const props = defineProps({
  DocumentId: String,
  DocumentDate: String,
  FolioUuid: String
})

const handleClick = () => {}
</script>

<template>
  <div @click="handleClick" class="bg-card block rounded-lg h-[4rem] mt-2.5 cursor-pointer">
    <div class="p-0 m-2 rounded-lg flex">
      <div class="grid place-items-stretch">
        <div class="text-sm font-bold">
          <!-- Mostrar el título dinámico -->
          <h1>{{ props.DocumentId }}</h1>
        </div>
        <div class="text-sm font-light">
          <!-- Mostrar la fecha dinámica -->
          <h3 cl>{{ formatDate(props.DocumentDate) }}</h3>
        </div>
      </div>

      <div class="grid place-items-stretch w-full">
        <!-- Mostrar el folio dinámico -->
        <div class="text-sm">
          <h3>{{ props.FolioUuid }}</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
