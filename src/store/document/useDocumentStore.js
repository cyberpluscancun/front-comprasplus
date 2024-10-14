import { defineStore } from 'pinia'
import { ref } from 'vue'
import { documentService } from '@/services/document/document-service.js'

export const useDocumentStore = defineStore('documentStore', () => {
  const documents = ref([])
  const filteredDocuments = ref([])
  const documentsByFolio = ref([])
  const documentsItem = ref([])
  const afterPage = ref(null)
  const beforePage = ref(null)
  const totalDocuments = ref(0)
  const isLoading = ref(false)
  const error = ref(null)

  const loadDocuments = async () => {
    isLoading.value = true
    error.value = null
    try {
      const response = await documentService.get(`/api/v1/documents`)
      const data = response.data
      console.log(data)
      documents.value = data.documents
        .map((document) => ({
          ...document,
          DocumentId: String(document.DocumentId)
        }))
        .sort((a, b) => new Date(b.DocumentDate) - new Date(a.DocumentDate)) // Orden descendente

      console.log(documents.value)
      afterPage.value = data.afterPage
      beforePage.value = data.beforePage
      totalDocuments.value = data.count
      console.log(`${afterPage.value} ${beforePage.value} ${totalDocuments.value}`)
    } catch (err) {
      error.value = err.message
    } finally {
      isLoading.value = false
    }
  }

  const getDocumentByID = (id) => {
    return documents.value.find((document) => document.DocumentId === id)
  }

  const getDocumentByFolio = (folio) => {
    return documents.value.find((document) => document.FolioUuid === folio)
  }

  const getDocumentsByQuery = async (query) => {
    if (!query) {
      console.error('Query is undefined or empty')
      return
    }
    const response = await documentService.getByQuery(`/api/v1/searchs/documents`, query)
    const data = response.data
    filteredDocuments.value = data.documents
    console.log(filteredDocuments.value)
    return data.documents
  }

  const saveDocument = async (document) => {
    try {
      const response = await documentService.post('/api/v1/documents', document)
      console.log(response)
    } catch (err) {
      error.value = err.message
    }
  }

  const exportDocument = async (data) => {
    try {
      console.log(data)
      const response = await documentService.export('/api/v1/exports', data)
      console.log(response)
    } catch (err) {
      error.value = err.message
    }
  }

  const loadDocumentsItemByFolio = async (folioUuid) => {
    try {
      const response = await documentService.getByFolio('/api/v1/documents/document', folioUuid)
      documentsByFolio.value = response.data
      console.log(documentsByFolio.value.Items)
      return response.data
    } catch (err) {
      error.value = err.message
    }
  }

  const loadDocumentsItem = async () => {
    isLoading.value = true
    error.value = null
    try {
      const response = await documentService.get('/api/v1/documents')
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
    filteredDocuments,
    documentsByFolio,
    documentsItem,
    isLoading,
    error,
    loadDocuments,
    getDocumentByID,
    getDocumentByFolio,
    getDocumentsByQuery,
    loadDocumentsItemByFolio,
    saveDocument,
    exportDocument,
    loadDocumentsItem,
    loadDocumentsItemByIDDocument
  }
})
