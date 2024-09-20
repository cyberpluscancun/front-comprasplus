import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useDocumentEvent = defineStore('documentEventStore', () => {
  const isCreatingNewDocument = ref(false)

  const startCreatingDocument = () => {
    console.log('iniciando startCreating')
    isCreatingNewDocument.value = true
  }

  const stopCreatingDocument = () => {
    console.log('cerrando startCreating')
    isCreatingNewDocument.value = false
  }

  return { isCreatingNewDocument, startCreatingDocument, stopCreatingDocument }
})
