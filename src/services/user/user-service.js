import { apiClient } from '@/apis/api-client.js'

export const userService = {
  get: (url) => {
    return apiClient.get(url)
  },

  post: (url, data) => {
    return apiClient.post(url, data)
  },

  put: (url, data) => {
    return apiClient.put(url, data)
  },

  path: (url, data) => {
    return apiClient.patch(url, data)
  },

  delete: (url, params = {}) => {
    return apiClient.delete(url, { params })
  }
}
