import { apiRequest } from './client'

export function getFreshHires() {
  return apiRequest('/info')
}

export function createFreshHire(details) {
  return apiRequest('/info', {
    method: 'POST',
    body: JSON.stringify(details),
  })
}

export function deleteFreshHire(id) {
  return apiRequest(`/info?id=${encodeURIComponent(id)}`, { method: 'DELETE' })
}
