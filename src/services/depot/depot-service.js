import { apiClientContpaq } from '@/apis/api-client.js'

export const depotService = {
  get: (url) => {
    return apiClientContpaq.get(url)
  },

  getById: (url, params = {}) => {
    return apiClientContpaq.get(url, { params })
  },

  post: (url, data) => {
    return apiClientContpaq.post(url, data)
  },

  put: (url, data) => {
    return apiClientContpaq.put(url, data)
  },

  delete: (url, params = {}) => {
    return apiClientContpaq.delete(url, { params })
  }
}
