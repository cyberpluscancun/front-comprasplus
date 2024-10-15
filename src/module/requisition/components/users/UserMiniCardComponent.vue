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
          <h1>{{ props.Name }} {{ props.LastNameFather }}</h1>
        </div>
        <div class="font-light">
          <h3>{{ props.Email }}</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
