<script setup>
import { useRoute } from 'vue-router'
import { onMounted, ref, watch } from 'vue'
import { useDocumentStore } from '@/store/document/useDocumentStore.js'
import { formatDate } from '@/services/format-date.js'
import DocumentItemCardComponent from '@/module/requisition/components/documents/DocumentItemCardComponent.vue'

const route = useRoute()
const { isLoading, error } = useDocumentStore()
const paramsId = ref(route.params.id || '')
const auth1 = ref(false)
const auth2 = ref(false)
const documentStore = useDocumentStore()
const documentItems = ref([])
const blankValues = ref({})
const documentValues = ref({
  DocumentId: paramsId.value,
  CostCenterId: 0,
  DepotId: 0,
  FolioUuid: '',
  DocumentDate: '',
  Export: false,
  Auth1: false,
  Auth2: false
})
const documentItemValues = ref({
  DocumentId: paramsId.value,
  Quantity: 0,
  Description: '',
  Comments: ''
})

onMounted(async () => {
  await documentStore.loadDocuments()
  await documentStore.loadDocumentsItem()
  await fetchDocumentById(paramsId.value)
  await fetchDocumentsItemByID(paramsId.value)
})

watch(
  () => route.params.id,
  (newId) => {
    paramsId.value = newId
    fetchDocumentById(newId)
    fetchDocumentsItemByID(newId)
  }
)

const fetchDocumentById = async (id) => {
  const document = await documentStore.getDocumentByID(id)
  if (document) {
    console.log(document)
    documentValues.value = { ...document }
    auth1.value = document.Auth1
    auth2.value = document.Auth2
  } else {
    console.log(`Documento con ID ${id} no encontrado`)
  }
  return document
}

const fetchDocumentsItemByID = async (id) => {
  const items = await documentStore.loadDocumentsItemByIDDocument(id)
  if (items) {
    documentItems.value = items
    console.log('DocumentsItem =>', documentItems.value)
  } else {
    console.log(`DocumentItems con ID ${id} no encontrados`)
  }
  return documentItems.value
}

const resetForm = () => {
  documentItemValues.value = { ...blankValues }
}

const saveDocumentItem = () => {
  const savedDocumentItem = {
    DocumentId: paramsId.value,
    Quantity: documentItemValues.value.Quantity,
    Description: documentItemValues.value.Description,
    Comments: documentItemValues.value.Comments
  }
  console.log(savedDocumentItem)
  resetForm()
}
</script>

<template>
  <div>
    <div class="m-3.5 mt-3.5">
      <nav class="h-[calc(100vh-87vh)] bg-purple rounded-lg">
        <div class="grid gap-4 p-2 ml-2">
          <div class="grid grid-cols-6 mt-2.5 gap-4">
            <div class="h-auto max-w-full">
              <div class="grid place-items-start">
                <div class="font-bold">
                  <h1>Titulo</h1>
                </div>
                <div class="font-light">
                  <h3>{{ documentValues.CostCenterId }} / {{ documentValues.DepotId }}</h3>
                </div>
              </div>
            </div>
            <div class="h-auto max-w-full">
              <div class="grid place-items-start">
                {{ formatDate(documentValues.DocumentDate) }}
              </div>
            </div>
            <div class="h-auto max-w-full">
              <div class="grid place-items-start">{{ documentValues.FolioUuid }}</div>
            </div>
            <div class="h-auto max-w-full">
              <div class="flex">
                <div>
                  <div class="font-bold">
                    <h1>Autorización1</h1>
                  </div>
                  <div class="font-light grid place-items-center">
                    <div class="flex items-center">
                      <input
                        :checked="auth1"
                        id="checked-checkbox"
                        type="checkbox"
                        value=""
                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        @change="auth1 = !auth1"
                      />
                    </div>
                  </div>
                </div>
                <div class="ml-4">
                  <div class="font-bold">
                    <h1>Autorización2</h1>
                  </div>
                  <div class="font-light grid place-items-center">
                    <div class="flex items-center">
                      <input
                        :checked="auth2"
                        id="checked-checkbox"
                        type="checkbox"
                        value=""
                        class="w-4 h-4 text-blue-600 bg-gray-100 bord er-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        @change="auth2 = !auth2"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="h-auto max-w-full"></div>
            <div class="h-auto max-w-full">
              <div class="grid place-items-center">
                <div>
                  <button
                    type="button"
                    class="text-text-white bg-primary h-[2rem] hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                  >
                    Exportar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div id="item-card-view" class="bg-purple2 rounded-lg mt-3.5">
        <form class="p-3.5">
          <div class="gap-6 mb-2">
            <div class="flex">
              <div>
                <label
                  for="quantity"
                  class="block text-sm font-medium text-gray-900 dark:text-white"
                  >Cantidad</label
                >
                <input
                  v-model="documentItemValues.Quantity"
                  type="number"
                  id="quantity"
                  class="bg-gray-50 border w-[5.6ren] h-[2rem] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Cantidad"
                  required
                />
              </div>
              <div class="ml-3.5 w-full grid place-items-start">
                <label
                  for="last_name"
                  class="block text-sm font-medium text-gray-900 dark:text-white"
                  >Descripción</label
                >
                <input
                  v-model="documentItemValues.Description"
                  type="text"
                  id="last_name"
                  class="bg-gray-50 h-[2rem] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Descripción"
                  required
                />
              </div>
            </div>
            <div class="py-1">
              <label for="company" class="block text-sm font-medium text-gray-900 dark:text-white"
                >Comentarios</label
              >
              <input
                v-model="documentItemValues.Comments"
                type="text"
                id="company"
                class="bg-gray-50 h-[2rem] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Comentarios..."
                required
              />
            </div>
            <div class="grid place-items-end mt-2.5">
              <button
                type="button"
                class="px-2 py-1 text-xs font-medium text-center inline-flex items-center text-text-white bg-gray hover:bg-primary rounded"
                @click="saveDocumentItem"
              >
                <svg
                  class="mr-1 w-5 h-5 text-gray-800 dark:text-white"
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
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Agregar
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>

    <!--    Paginación de los items de un documento-->
    <div id="item-card-view-container" class="m-3.5 overflow-y-auto h-[calc(100vh-20rem)]">
      <div class="document-items-container">
        <div v-if="isLoading" class="loading">Cargando documentos...</div>

        <div v-if="error" class="error">Error al cargar documentos: {{ error }}</div>

        <!--        Lista DocumentsItem-->
        <div v-for="item in documentItems" :key="item.DocumentItemsId">
          <DocumentItemCardComponent
            :Quantity="item.Quantity"
            :Description="item.Description"
            :Comments="item.Comments"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
