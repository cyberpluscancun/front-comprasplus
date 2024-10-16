import { apiClient } from '@/apis/api-client.js'

export const documentService = {
  get: (url) => {
    return apiClient.get(url)
  },

  getByFolio: (url, folioId) => {
    return apiClient.get(`${url}/${folioId}`)
  },

  getByQuery: (url, query) => {
    console.log(`${url}?data=${query}`)
    return apiClient.get(`${url}?data=${query}`)
  },

  post: (url, data) => {
    return apiClient.post(url, data)
  },

  export: (url, data) => {
    console.log(data)
    return apiClient.post(url, data)
  },

  put: (url, data) => {
    return apiClient.put(url, data)
  },

  delete: (url, params = {}) => {
    return apiClient.delete(url, { params })
  }
}
