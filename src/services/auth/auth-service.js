import { apiClient } from '@/apis/api-client.js'

export const authService = {
  post: (url, data) => {
    return apiClient.post(url, data)
  }
}
