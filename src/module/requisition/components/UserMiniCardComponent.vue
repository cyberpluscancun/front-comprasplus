<script setup>
// props que recibirá el componente
const props = defineProps({
  firstName: String,
  lastNamePaternal: String,
  lastNameMaternal: String
})

const handleClick = () => {}
</script>

<template>
  <div @click="handleClick" class="bg-card rounded-lg h-[4rem] mt-2.5 cursor-pointer">
    <div class="m-2 rounded-lg p-2 flex">
      <div class="w-full grid place-items-start">
        <div class="font-bold">
          <!-- Mostrar el título dinámico -->
          <h1>{{ props.firstName }}</h1>
        </div>
        <div class="font-light">
          <!-- Mostrar la fecha dinámica -->
          <h3>{{ props.lastNamePaternal }}</h3>
        </div>
      </div>

      <div>
        <!-- Mostrar el folio dinámico -->
        <h3>{{ props.lastNameMaternal }}</h3>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
