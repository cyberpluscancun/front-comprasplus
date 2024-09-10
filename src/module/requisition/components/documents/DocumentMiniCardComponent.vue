<script setup>
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
    <div class="grid bg-purple rounded-t-lg place-items-start">
      <div class="text-sm ml-4 font-bold">
        <h1>{{ props.DocumentId }}</h1>
      </div>
    </div>

    <div class="p-0 rounded-lg flex">
      <div class="text-sm font-light">
        <h3>{{ formatDate(props.DocumentDate) }}</h3>
      </div>
      <div class="text-sm tex">
        <h3>{{ props.FolioUuid }}</h3>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
