import { defineStore } from 'pinia'
import { ref } from 'vue'
import { costCenterService } from '@/services/costCenter/cost-center-service.js'

export const useCostCenterStore = defineStore('costCenterStore', () => {
  const costCenters = ref([])

  const loadCostCenters = async () => {
    try {
      const response = await costCenterService.get(`/api/v1/costcenters`)
      costCenters.value = response.data.CostCenters
      // console.log('CostCenters data=>', costCenters.value)
    } catch (err) {
      console.error(err)
    }
  }

  return {
    costCenters,
    loadCostCenters
  }
})
