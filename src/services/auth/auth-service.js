import { apiClient } from '@/apis/api-client.js'

export const authService = {
  get: (url) => {
    return apiClient.get(url)
  },

  post: (url, data) => {
    return apiClient.post(url, data)
  },

  put: (url, data) => {
    return apiClient.put(url, data)
  },

  delete: (url, params = {}) => {
    return apiClient.delete(url, { params })
  }
}
