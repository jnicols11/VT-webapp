import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useAuthStore } from '@/stores/AuthStore'
import axios from 'axios'

// Mock Axios
vi.mock('axios')

describe('Auth Store', () => {
  let authStore: ReturnType<typeof useAuthStore>

  beforeEach(() => {
    setActivePinia(createPinia())
    authStore = useAuthStore()
    localStorage.clear()
  })

  it('should have default state', () => {
    expect(authStore.user).toBeNull()
    expect(authStore.token).toBeNull()
    expect(authStore.isAuthenticated).toBe(false)
    expect(authStore.loading).toBe(false)
    expect(authStore.error).toBeNull()
  })

  it('should successfully login and update state', async () => {
    const mockUser = { id: '1', email: 'test@example.com', firstName: 'John', lastName: 'Doe' }
    const mockToken = 'mock_token'

    axios.post.mockResolvedValueOnce({ data: { token: mockToken, user: mockUser } })

    await authStore.login('test@example.com', 'password123')

    expect(authStore.token).toBe(mockToken)
    expect(authStore.user).toEqual(mockUser)
    expect(authStore.isAuthenticated).toBe(true)
    expect(localStorage.getItem('authToken')).toBe(mockToken)
    expect(localStorage.getItem('authUser')).toBe(JSON.stringify(mockUser))
  })

  it('should handle login failure', async () => {
    axios.post.mockRejectedValueOnce({ response: { data: { message: 'Invalid credentials' } } })

    await authStore.login('wrong@example.com', 'wrongpassword')

    expect(authStore.token).toBeNull()
    expect(authStore.user).toBeNull()
    expect(authStore.isAuthenticated).toBe(false)
    expect(authStore.error).toBe('Invalid credentials')
  })

  it('should logout and clear state', () => {
    authStore.logout()

    expect(authStore.user).toBeNull()
    expect(authStore.token).toBeNull()
    expect(authStore.isAuthenticated).toBe(false)
    expect(localStorage.getItem('authToken')).toBeNull()
    expect(localStorage.getItem('authUser')).toBeNull()
  })

  it('should fetch user when token is valid', async () => {
    const mockUser = { id: '1', email: 'test@example.com', firstName: 'John', lastName: 'Doe' }
    authStore.token = 'mock_token'

    axios.get.mockResolvedValueOnce({ data: mockUser })

    await authStore.fetchUser()

    expect(authStore.user).toEqual(mockUser)
    expect(authStore.isAuthenticated).toBe(true)
  })

  it('should handle fetch user failure', async () => {
    authStore.token = 'mock_token'
    axios.get.mockRejectedValueOnce(new Error('Unauthorized'))

    await authStore.fetchUser()

    expect(authStore.user).toBeNull()
    expect(authStore.token).toBeNull()
    expect(authStore.isAuthenticated).toBe(false)
  })
})
