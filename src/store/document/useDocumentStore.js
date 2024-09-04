import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useDocumentStore = defineStore('documentStore', () => {
  const documents = ref([])
  const isLoading = ref(false)
  const error = ref(null)

  const loadDocuments = async () => {
    isLoading.value = true
    error.value = null
    try {
      // const response = await fetch('https://api.example.com/requests')
      const response = await fetch('/src/assets/documents.json')
      if (!response.ok) {
        throw new Error('Error fetching documents')
      }
      let data = await response.json()
      documents.value = data.map((document) => ({
        ...document,
        DocumentId: String(document.DocumentId)
      }))
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

  return {
    documents,
    isLoading,
    error,
    loadDocuments,
    getDocumentByID
  }
})
