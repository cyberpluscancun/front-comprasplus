<script setup>
// props que recibirá el componente
const props = defineProps({
  Name: String,
  Email: String,
  LastNameFather: String
})

const handleClick = () => {}
</script>

<template>
  <div @click="handleClick" class="text-sm bg-card rounded-lg h-[4rem] mt-2.5 cursor-pointer">
    <div class="rounded-lg m-2 p-2 flex">
      <div class="w-full grid place-items-start">
        <div class="font-bold">
          <!-- Mostrar el título dinámico -->
          <h1>{{ props.Name }}</h1>
        </div>
        <div class="font-light">
          <!-- Mostrar la fecha dinámica -->
          <h3>{{ props.Email }}</h3>
        </div>
      </div>

      <div>
        <!-- Mostrar el folio dinámico -->
        <h3>{{ props.LastNameFather }}</h3>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
