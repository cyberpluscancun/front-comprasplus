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
const isSearching = ref(false)

// Define the number of items per page
const itemsPerPage = 5 

onMounted(async () => {
  await documentStore.loadDocuments()
  console.log(documentStore.documents)
})

function goToDocumentDetail(folioUuid) {
  console.log(folioUuid)
  router.push({ name: 'DocumentDetail', params: { folioUuid } })
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
  if (searchFilter.value.trim() === '') {
    return
  }
  if (isSearching.value) {
    searchFilter.value = ''
    isSearching.value = false
  } else {
    console.log(searchFilter.value)
    const documents = await documentStore.getDocumentsByQuery(String(searchFilter.value))
    console.log(documents)
    isSearching.value = true
    documentStore.filteredDocuments = documents
  }
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
            v-if="isSearching"
            class="h-4 w-4 text-red-500"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" />
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
          <svg
            v-else
            class="h-4 w-4 text-red-500"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" />
            <circle cx="10" cy="10" r="7" />
            <line x1="21" y1="21" x2="15" y2="15" />
          </svg>
          <span class="sr-only">Buscar</span>
        </button>
      </form>
    </div>
    <div class="h-[calc(100vh-6.25rem)] bg-gray-800 text-center">
      <div id="document-list-container">
        <div v-if="isLoading" class="loading">Cargando documentos...</div>

        <div v-if="error" class="error">Error al cargar documentos: {{ error }}</div>

        <PaginatorView
          :items="isSearching ? documentStore.filteredDocuments : documentStore.documents"
          :items-per-page="itemsPerPage"
        >
          <template #default="{ item }">
            <DocumentMiniCardComponent
              :DocumentId="String(item.DocumentId)"
              :Title="item.Title"
              :DocumentDate="item.DocumentDate"
              :FolioUuid="item.FolioUuid"
              @click="() => goToDocumentDetail(item.FolioUuid)"
            />
          </template>
        </PaginatorView>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
