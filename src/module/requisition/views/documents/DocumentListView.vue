<script setup>
import { onMounted, ref, watch } from 'vue'
import DocumentMiniCardComponent from '@/module/requisition/components/documents/DocumentMiniCardComponent.vue'
import PaginatorView from '@/module/requisition/views/PaginatorView.vue'
import { useDocumentStore } from '@/store/document/useDocumentStore.js'
import { useRouter } from 'vue-router'
import { useDocumentEvent } from '@/store/document/useDocumentEvent.js'
import ModalComponent from '@/commons/ModalComponent.vue'

const router = useRouter()
const documentStore = useDocumentStore()
const documentEvent = useDocumentEvent()
const searchFilter = ref('')

onMounted(async () => {
  await documentStore.loadDocuments()
  console.log(documentStore.documents)
})

function goToDocumentDetail(id) {
  console.log(id)
  router.push({ name: 'DocumentDetail', params: { id } })
}

function handleNewRequest() {
  documentEvent.startCreatingDocument()
  console.log(`desde handleNewReq => ${documentEvent.isCreatingNewDocument}`)
}

watch(
  () => documentEvent.isCreatingNewDocument,
  (isCreating) => {
    console.log(`desde el watch => ${isCreating}`)
  }
)

const searchDocument = async () => {
  const document = documentStore.getDocumentByFolio(searchFilter.value)
  console.log(document)
  if (document) goToDocumentDetail(document.DocumentId)
}

const { isLoading, error } = documentStore
</script>

<template>
  <div class="p-0">
    <div class="w-full">
      <button
        @click="handleNewRequest"
        type="button"
        class="text-text-white w-full bg-gray focus:ring-4 hover:bg-primary font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
      >
        Nueva Solicitud
      </button>
    </div>

    <div v-if="documentEvent.isCreatingNewDocument">
      <ModalComponent />
    </div>
    <div class="mt-2.5">
      <form class="flex items-center max-w-sm mx-auto">
        <label for="simple-search" class="sr-only">Buscar</label>
        <div class="relative w-full">
          <input
            v-model="searchFilter"
            type="text"
            id="simple-search"
            class="bg-gray-50 h-[2rem] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Buscar por Titulo/Folio"
            required
          />
        </div>
        <button
          @click="searchDocument()"
          type="button"
          class="bg-primary text-background p-2 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <svg
            class="w-4 h-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
          <span class="sr-only">Buscar</span>
        </button>
      </form>
    </div>
    <div class="h-[calc(100vh-6.25rem)] bg-gray-800 text-center">
      <div id="document-list-container">
        <div v-if="isLoading" class="loading">Cargando documentos...</div>

        <div v-if="error" class="error">Error al cargar documentos: {{ error }}</div>

        <PaginatorView :items="documentStore.documents">
          <template #default="{ item }">
            <DocumentMiniCardComponent
              :DocumentId="item.DocumentId"
              :Title="item.Title"
              :DocumentDate="item.DocumentDate"
              :FolioUuid="item.FolioUuid"
              @click="() => goToDocumentDetail(item.DocumentId)"
            />
          </template>
        </PaginatorView>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
