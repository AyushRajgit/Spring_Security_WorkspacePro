const API_BASE = (import.meta.env.VITE_API_BASE_URL || '/api').replace(/\/$/, '')

export async function apiRequest(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    credentials: 'include',
    ...options,
    headers: {
      ...(options.body ? { 'Content-Type': 'application/json' } : {}),
      ...options.headers,
    },
  })

  const body = await response.text()
  if (!response.ok) {
    let message = body
    try {
      const parsed = JSON.parse(body)
      message = parsed.message || parsed.error || parsed.detail || body
    } catch {
      // The backend may return plain text instead of JSON.
    }

    if (response.status === 401) {
      message = 'Your session has ended. Sign in again to continue.'
    } else if (response.status === 403) {
      message = 'Your account does not have permission to do that. Removing hires requires a Manager role.'
    }

    throw new Error(message || `Request failed (${response.status})`)
  }

  if (!body) return null
  try {
    return JSON.parse(body)
  } catch {
    return body
  }
}
