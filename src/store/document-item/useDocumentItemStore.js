import { defineStore } from 'pinia'
import { ref } from 'vue'
import { documentItemService } from '@/services/documentItem/document-item-service.js'

export const useDocumentItemStore = defineStore('documentItemStore', () => {
  const documentItems = ref([])

  const saveDocumentItems = async (data) => {
    try {
      const response = await documentItemService.post(`/api/v1/document-items`, data)
      documentItems.value = response.data
      console.log('CostCenters data=>', documentItems.value)
    } catch (err) {
      console.error(err)
    }
  }

  return {
    documentItems,
    saveDocumentItems
  }
})
