<script setup>
import { defineProps, ref } from 'vue'

// Define props
const props = defineProps({
  Quantity: Number,
  Description: String,
  Comments: String
})

const documentItem = {
  Quantity: props.Quantity,
  Description: props.Description,
  Comments: props.Comments
}
const isExpanded = ref(false)
const isEdit = ref(false)

function expandCard() {
  isExpanded.value = !isExpanded.value
}
</script>

<template>
  <div
    id="item-card-view"
    :class="{ 'h-[20.6rem]': isExpanded, 'h-[12.5rem]': !isExpanded }"
    class="bg-card rounded-lg mt-3.5 transition-all duration-300"
  >
    <form class="p-3.5">
      <div class="gap-6 mb-2">
        <div class="flex flex-col md:flex-row">
          <div class="w-full">
            <label for="quantity" class="block text-sm font-medium text-gray-900">Cantidad</label>
            <input
              v-model="documentItem.Quantity"
              type="number"
              id="quantity"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full"
              placeholder="Cantidad"
              required
              :disabled="!isEdit"
            />
          </div>
          <div class="mt-2 md:mt-0 md:ml-3.5 w-full">
            <label for="description" class="block text-sm font-medium text-gray-900">Descripción</label>
            <input
              v-model="documentItem.Description"
              type="text"
              id="description"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full"
              placeholder="Descripción"
              required
              :disabled="!isEdit"
            />
          </div>
        </div>
        <div class="py-1">
          <label for="comments" class="block text-sm font-medium text-gray-900">Comentarios</label>
          <input
            v-model="documentItem.Comments"
            type="text"
            id="comments"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full"
            placeholder="Comentarios..."
            required
            :disabled="!isEdit"
          />
        </div>

        <div v-if="!isExpanded" class="mt-2.5">
          <div class="flex justify-between items-center">
            <button
              type="button"
              @click="expandCard"
              class="px-1 py-1 text-white bg-gray hover:bg-primary font-medium rounded-full text-sm"
            >
              <svg class="w-5 h-5 text-gray-800" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-width="2" d="M12 19V5m0 14-4-4m4 4 4-4" />
              </svg>
            </button>

            <div class="flex space-x-2 button-group">
              <button type="submit" class="px-2 py-1 text-xs font-medium text-white bg-gray hover:bg-primary rounded">
                Guardar
              </button>
              <button type="button" class= "mt-2 px-2 py-1 text-xs font-medium text-white bg-gray hover:bg-error rounded">
                Borrar
              </button>
            </div>
          </div>
        </div>

        <div v-else class="mt-2.5 button-group">
          <div class="flex flex-col">
            <label for="supplier" class="block text-sm font-medium text-gray-900">Proveedor</label>
            <input
              type="text"
              id="supplier"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full"
              placeholder="Proveedor"
              required
            />
          </div>
          <div class="flex mt-2">
            <div class="flex-1">
              <label for="key" class="block text-sm font-medium text-gray-900">Clave</label>
              <input
                type="text"
                id="key"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full"
                placeholder="Clave"
                required
              />
            </div>
            <button type="button" class="h-[2rem] px-2 py-1 text-xs font-medium text-white bg-gray hover:bg-primary rounded ml-2">
              Buscar
            </button>
          </div>

          <div class="flex justify-between items-center mt-5">
            <button
              type="button"
              @click="expandCard"
              class="px-1 py-1 text-white bg-gray hover:bg-primary font-medium rounded-full text-sm"
            >
              <svg class="w-5 h-5 text-gray-800" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-width="2" d="M12 6v13m0-13 4 4m-4-4-4 4" />
              </svg>
            </button>

            <div class="flex space-x-2">
              <button type="submit" class="px-2 py-1 text-xs font-medium text-white bg-gray hover:bg-success rounded">
                Guardar
              </button>
              <button type="button" class="px-2 py-1 text-xs font-medium text-white bg-gray hover:bg-error rounded">
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<style scoped>
@media (max-width: 720px) {
  #item-card-view {
    padding: 1rem;
    height: auto;
  }

  .gap-6 {
    gap: 1rem;
  }

  .button-group {
    flex-direction: column;
  }

  input {
    height: 2.5rem;
  }
}
</style>
