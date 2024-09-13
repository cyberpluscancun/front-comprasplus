import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useDocumentStore = defineStore('documentStore', () => {
  const documents = ref([])
  const documentsItem = ref([])
  const isLoading = ref(false)
  const error = ref(null)

  const loadDocuments = async () => {
    isLoading.value = true
    error.value = null
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/documents`)
      // const response = await fetch('/src/assets/documents.json')
      if (!response.ok) {
        throw new Error('Error fetching documents')
      }
      let data = await response.json()
      documents.value = data
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
      // const response = await fetch('https://api.example.com/requests')
      const response = await fetch('/src/assets/document-items.json')
      if (!response.ok) {
        throw new Error('Error fetching documents')
      }
      let data = await response.json()
      documentsItem.value = data.map((documentItem) => ({
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
