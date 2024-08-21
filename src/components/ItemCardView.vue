<script setup>

import { ref } from 'vue'


let isExpanded = ref(false)


function expandCard() {
  isExpanded.value = !isExpanded.value
  console.log(`Expandir card -> ${isExpanded.value}`)
}

</script>

<template>
  <div id="item-card-view" :class="{'h-[20.6rem]': isExpanded, 'h-[12.5rem]': !isExpanded}"
       class="bg-card rounded-lg mt-3.5 transition-all duration-300">
    <form class="p-3.5">
      <div class="gap-6 mb-2">
        <div class="flex">
          <div>
            <label for="quantity"
                   class="block text-sm font-medium text-gray-900 dark:text-white">Cantidad</label>
            <input type="text" id="quantity"
                   class="bg-gray-50 h-[2rem] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                   placeholder="Cantidad" required />
          </div>
          <div class="ml-3.5 w-full grid place-items-start">
            <label for="description"
                   class="block text-sm font-medium text-gray-900 dark:text-white">Descripción</label>
            <input type="text" id="description"
                   class="bg-gray-50 w-full h-[2rem] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                   placeholder="Descripción" required />
          </div>
        </div>
        <div class="py-1">
          <label for="comments"
                 class="block text-sm font-medium text-gray-900 dark:text-white">Comentarios</label>
          <input type="text" id="comments"
                 class="bg-gray-50 h-[2rem] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                 placeholder="Comentarios..." required />
        </div>

        <div v-if="!isExpanded" class="mt-2.5">
          <div class="flex justify-between items-center">
            <!-- Botón al inicio -->
            <button id="card-expand" type="button"
                    @click="expandCard"
                    class="px-1 py-1 text-text-white bg-gray hover:bg-primary font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center me-2 ">
              <svg class="w-5 h-5 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                   width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M12 19V5m0 14-4-4m4 4 4-4" />
              </svg>
              <span class="sr-only">Icon description</span>
            </button>

            <!-- Botones al final -->
            <div class="flex space-x-2">
              <button type="submit"
                      class="px-2 py-1 text-xs font-medium text-center inline-flex items-center text-text-white bg-gray hover:bg-primary rounded">
                <svg class="mr-1 w-5 h-5 text-gray-800 dark:text-white" aria-hidden="true"
                     xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M13.213 9.787a3.391 3.391 0 0 0-4.795 0l-3.425 3.426a3.39 3.39 0 0 0 4.795 4.794l.321-.304m-.321-4.49a3.39 3.39 0 0 0 4.795 0l3.424-3.426a3.39 3.39 0 0 0-4.794-4.795l-1.028.961" />
                </svg>
                Asociar
              </button>

              <button type="submit"
                      class="px-2 py-1 text-xs font-medium text-center inline-flex items-center text-text-white bg-gray hover:bg-primary rounded">
                <svg class="mr-1 w-5 h-5 text-gray-800 dark:text-white" aria-hidden="true"
                     xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z" />
                </svg>
                Editar
              </button>

              <button type="submit"
                      class="px-2 py-1 text-xs font-medium text-center inline-flex items-center text-text-white bg-gray hover:bg-primary rounded">
                <svg class=" mr-1 w-5 h-5 text-gray-800 dark:text-white" aria-hidden="true"
                     xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z" />
                </svg>
                Borrar
              </button>
            </div>
          </div>
        </div>

        <!--   CardExpanded     -->
        <div v-else class="mt-2.5">

          <div class="gap-6 mb-2">
            <div class="flex"> <!-- Utiliza items-center para alinear los elementos verticalmente -->
              <div class="w-full">
                <label for="supplier"
                       class="block text-sm font-medium text-gray-900 dark:text-white">Proveedor</label>
                <input type="text" id="supplier"
                       class="bg-gray-50 w-full h-[2rem] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                       placeholder="Proveedor" required />
              </div>
              <div class="ml-2 mt-5"> <!-- Añade un margen a la izquierda para separar el botón del input -->
                <button type="submit"
                        class="h-[2rem] px-2 py-1 text-xs font-medium text-center inline-flex items-center text-text-white bg-gray hover:bg-primary rounded">
                  <svg class="w-5 h-5 text-gray-800 dark:text-white" aria-hidden="true"
                       xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-width="2"
                          d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
                  </svg>

                  Buscar
                </button>
              </div>
              <div class="ml-2 mt-5"> <!-- Añade un margen a la izquierda para separar el botón del input -->
                <button type="submit"
                        class="h-[2rem] px-2 py-1 text-xs font-medium text-center inline-flex items-center text-text-white bg-gray hover:bg-primary rounded">
                  <svg class="mr-1 w-5 h-5 text-gray-800 dark:text-white" aria-hidden="true"
                       xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M12 4v16m8-8H4" />
                  </svg>
                  Nuevo
                </button>
              </div>
            </div>
            <div class="flex mt-2.5"> <!-- Utiliza items-center para alinear los elementos verticalmente -->
              <div>
                <label for="key"
                       class="block text-sm font-medium text-gray-900 dark:text-white">Clave</label>
                <input type="text" id="key"
                       class="bg-gray-50 w-[16rem] h-[2rem] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                       placeholder="Clave" required />
              </div>
              <div class="ml-2 mt-5"> <!-- Añade un margen a la izquierda para separar el botón del input -->
                <button type="submit"
                        class="h-[2rem] px-2 py-1 text-xs font-medium text-center inline-flex items-center text-text-white bg-gray hover:bg-primary rounded">
                  <svg class="w-5 h-5 text-gray-800 dark:text-white" aria-hidden="true"
                       xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-width="2"
                          d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
                  </svg>

                  Buscar
                </button>
              </div>
              <div class="ml-2 mt-5"> <!-- Añade un margen a la izquierda para separar el botón del input -->
                <button type="submit"
                        class="h-[2rem] px-2 py-1 text-xs font-medium text-center inline-flex items-center text-text-white bg-gray hover:bg-primary rounded">
                  <svg class="mr-1 w-5 h-5 text-gray-800 dark:text-white" aria-hidden="true"
                       xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M12 4v16m8-8H4" />
                  </svg>
                  Nuevo
                </button>
              </div>
              <div class="ml-3.5 w-full">
                <label for="description"
                       class="block text-sm font-medium text-gray-900 dark:text-white">Descripción</label>
                <input type="text" id="description"
                       class="bg-gray-50 w-full h-[2rem] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                       placeholder="Descripción" required />
              </div>
              <div class="ml-3.5">
                <label for="unitPrice"
                       class="block text-sm font-medium text-gray-900 dark:text-white">Precio Unitario</label>
                <input type="text" id="unitPrice"
                       class="bg-gray-50 w-[8rem] h-[2rem] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                       placeholder="Precio Unitario" required />
              </div>
            </div>
            <div class="flex justify-between items-center mt-5">
              <!-- Botón al inicio -->
              <button id="card-expand" type="button"
                      @click="expandCard"
                      class="px-1 py-1 text-text-white bg-gray hover:bg-primary font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center me-2 ">
                <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                     width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M12 6v13m0-13 4 4m-4-4-4 4" />
                </svg>

                <span class="sr-only">Icon description</span>
              </button>

              <!-- Botones al final -->
              <div class="flex space-x-2">

                <button type="submit"
                        class="px-2 py-1 text-xs font-medium text-center inline-flex items-center text-text-white bg-gray hover:bg-success rounded">
                  <svg class="mr-1 w-5 h-5 text-gray-800 dark:text-white" aria-hidden="true"
                       xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z" />
                  </svg>
                  Guardar
                </button>

                <button type="button"
                        class="px-2 py-1 text-xs font-medium text-center inline-flex items-center text-text-white bg-gray hover:bg-error rounded">
                  <svg class=" mr-1 w-5 h-5 text-gray-800 dark:text-white" aria-hidden="true"
                       xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z" />
                  </svg>
                  Cancelar
                </button>
              </div>
            </div>
          </div>


        </div>
      </div>
    </form>
  </div>
</template>


<style scoped>

</style>