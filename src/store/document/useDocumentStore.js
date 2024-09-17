import { defineStore } from 'pinia'
import { ref } from 'vue'
import { documentService } from '@/services/document/document-service.js'

export const useDocumentStore = defineStore('documentStore', () => {
  const documents = ref([])
  const documentsItem = ref([])
  const isLoading = ref(false)
  const error = ref(null)

  const loadDocuments = async () => {
    isLoading.value = true
    error.value = null
    try {
      const response = await documentService.get(`/api/v1/documents`)

      const data = response.data
      console.log(data.documents)
      documents.value = data.documents
        .map((document) => ({
          ...document,
          DocumentId: String(document.DocumentId)
        }))
        .sort((a, b) => new Date(b.DocumentDate) - new Date(a.DocumentDate)) // Orden descendente

      console.log(documents.value)
    } catch (err) {
      error.value = err.message
    } finally {
      isLoading.value = false
    }
  }

  const getDocumentByID = (id) => {
    return documents.value.find((document) => document.DocumentId === id)
  }

  const loadDocumentsItem = async () => {
    isLoading.value = true
    error.value = null
    try {
      const response = await authService.get('/api/v1/documents')

      const data = response.data
      documentsItem.value = data.documents.map((documentItem) => ({
        ...documentItem,
        DocumentItemsId: String(documentItem.DocumentItemsId),
        DocumentId: String(documentItem.DocumentId)
      }))

      console.log(documentsItem.value)
    } catch (err) {
      error.value = err.message
    } finally {
      isLoading.value = false
    }
  }

  const loadDocumentsItemByIDDocument = async (id) => {
    return documentsItem.value.filter((documentItem) => documentItem.DocumentId === id)
  }

  return {
    documents,
    documentsItem,
    isLoading,
    error,
    loadDocuments,
    getDocumentByID,
    loadDocumentsItem,
    loadDocumentsItemByIDDocument
  }
})
