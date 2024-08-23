<script setup>
const handleClick = () => {
  // Acción cuando se hace clic en la tarjeta
  console.log("MiniCard clickeado!");
};
</script>

<template>
  <div @click="handleClick" class="bg-card rounded-lg h-[4rem] mt-2.5 cursor-pointer">
    <div class="m-2 rounded-lg p-2 flex">
      <div class="w-full grid place-items-start">
        <div class="font-bold">
          <h1>Titulo</h1>
        </div>
        <div class="font-light">
          <h3>Fecha</h3>
        </div>
      </div>

      <div>
        <h3>Folio</h3>
      </div>

    </div>
  </div>
</template>

<style scoped>

</style>