import { apiRequest } from './client'

export function login(credentials) {
  return apiRequest('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  })
}

export function register(credentials) {
  return apiRequest('/auth/register', {
    method: 'POST',
    body: JSON.stringify(credentials),
  })
}

export function logout() {
  return apiRequest('/auth/logout', { method: 'POST' })
}
