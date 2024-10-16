<script setup>
import { useRoute } from 'vue-router'
import { onMounted, ref, watch } from 'vue'
import { useDocumentStore } from '@/store/document/useDocumentStore.js'
import { formatDate } from '@/services/format-date.js'
import DocumentItemCardComponent from '@/module/requisition/components/documents/DocumentItemCardComponent.vue'
import { useDocumentItemStore } from '@/store/document-item/useDocumentItemStore.js'
import InputComponent from '@/commons/InputComponent.vue'
import ButtonComponent from '@/commons/ButtonComponent.vue'

const documentItemStore = useDocumentItemStore()
const route = useRoute()
const { isLoading, error } = useDocumentStore()
const paramsFolio = ref(route.params.folioUuid || '')
const auth1 = ref(false)
const auth2 = ref(false)
const showAuth2Checkbox = ref(false)
const documentStore = useDocumentStore()
const blankValues = ref({})
const documentItems = ref([])
const exportError = ref(false)
const documentValues = ref({
  DocumentId: 0,
  CostCenterId: 0,
  DepotId: 0,
  FolioUuid: '',
  DocumentDate: '',
  Export: false,
  Auth1: false,
  Auth2: false
})
const documentItemValues = ref({
  DocumentId: 0,
  Quantity: 0,
  Description: '',
  Comments: ''
})

onMounted(async () => {
  await documentStore.loadDocuments()
  await documentStore.loadDocumentsItem()
  await fetchDocumentsItemByFolio(paramsFolio.value)
})

watch(
  () => route.params.folioUuid,
  (newFolio) => {
    paramsFolio.value = newFolio
    exportError.value = false
    fetchDocumentsItemByFolio(newFolio)
  }
)

watch(auth1, (newValue) => {
  showAuth2Checkbox.value = newValue
  if (!newValue) {
    auth2.value = false 
  }
})

const fetchDocumentsItemByFolio = async (folioUuid) => {
  const response = await documentStore.loadDocumentsItemByFolio(folioUuid)
  const document = response.Document
  if (document) {
    documentValues.value = { ...document }
    auth1.value = document.Auth1
    auth2.value = document.Auth2
  } else {
    console.log(`Documento con ID ${id} no encontrado`)
  }
  documentItems.value = response ? response.Items : []
  return document
}

const resetForm = () => {
  documentItemValues.value = { ...blankValues }
}

const saveDocumentItem = async () => {
  const savedDocumentItem = {
    DocumentId: Number(documentValues.value.DocumentId),
    Quantity: documentItemValues.value.Quantity,
    Description: documentItemValues.value.Description,
    Comments: documentItemValues.value.Comments
  }
  console.log(savedDocumentItem)
  await documentItemStore.saveDocumentItems(savedDocumentItem)
  documentItems.value.push(savedDocumentItem)
  fetchDocumentsItemByFolio(route.params.folioUuid)
  resetForm()
}

const exportDocument = async () => {
  if (!documentValues.value.Auth1 || !documentValues.value.Auth2) {
    exportError.value = true
    return
  }

  const data = {
    FolioUuid: paramsFolio.value
  }
  await documentStore.exportDocument(data)
  exportError.value = false
}
</script>

<template>
  <div>
    <div class="m-3.5 mt-3.5">
      <nav class="h-[calc(100vh-87vh)] bg-purple rounded-lg">
        <div class="p-2">
          <div class="flex justify-between flex-col md:flex-row text-sm">
            <div id="col-1" class="w-full md:w-[15%] flex flex-col">
              <h1 class="font-bold text-lg">{{ documentValues.Title }}</h1>
              <h3 class="font-light">
                {{ documentValues.CostCenterId }} / {{ documentValues.DepotId }}
              </h3>
            </div>
            <div id="col-2" class="w-full md:w-[80%] flex flex-col">
              <div class="flex">
                <div class="font-bold">Fecha:</div>
                <div class="ml-5">{{ formatDate(documentValues.DocumentDate) }}</div>
              </div>
              <div class="flex">
                <div class="font-bold">Folio:</div>
                <div class="ml-5">{{ documentValues.FolioUuid }}</div>
              </div>
              <div class="flex">
                <div class="flex items-center">
                  <label class="font-bold">Autorización 1:</label>
                  <input class="ml-3" type="checkbox" v-model="auth1" />
                </div>
                <div v-if="showAuth2Checkbox" class="flex items-center ml-4">
                  <label class="font-bold">Autorización 2:</label>
                  <input class="ml-3" type="checkbox" v-model="auth2" />
                </div>
              </div>
            </div>
            <div id="col-3" class="w-full md:w-[15%] flex justify-end">
              <button @click="exportDocument" class="bg-primary text-white px-4 py-2 rounded">
                Exportar
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div v-if="exportError" class="bg-error text-white p-2 text-center">
        <p>¡El documento debe estar autorizado por Auth1 y Auth2 para poder exportarse!</p>
      </div>

      <div id="item-card-view" class="bg-purple2 rounded-lg mt-3.5">
        <form class="p-3.5">
          <div class="flex flex-col gap-6 mb-2">
            <div class="flex flex-col md:flex-row">
              <div class="flex-1">
                <label for="quantity">Cantidad</label>
                <InputComponent
                  id="quantity"
                  :modelValue="documentItemValues.Quantity"
                  type="number"
                />
              </div>
              <div class="flex-1 md:ml-3.5">
                <label for="description">Descripción</label>
                <InputComponent
                  :id="description"
                  :modelValue="documentItemValues.Description"
                  :type="text"
                />
              </div>
            </div>
            <div>
              <label for="comments">Comentarios</label>
              <InputComponent
                :id="comments"
                :modelValue="documentItemValues.Comments"
                :type="text"
              />
            </div>
            <div>
              <ButtonComponent
                label="Agregar"
                @click="saveDocumentItem"
                customClass="bg-gray w-[5rem] h-[2rem] text-white"
              />
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

<style scoped>
@media (max-width: 720px) {
  #item-card-view-container {
    height: calc(100vh - 30rem);
  }
}
</style>
