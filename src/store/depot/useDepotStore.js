import { defineStore } from 'pinia'
import { ref } from 'vue'
import { depotService } from '@/services/depot/depot-service.js'

export const useDepotStore = defineStore('depotStore', () => {
  const depots = ref([])

  const loadDepots = async () => {
    try {
      const response = await depotService.get(`/api/v1/depot`)
      depots.value = response.data
      console.log('Depots data=>', depots.value)
    } catch (err) {
      console.error(err)
    }
  }

  return {
    depots,
    loadDepots
  }
})
