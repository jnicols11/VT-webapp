import { defineStore } from 'pinia'
import axios from 'axios'

interface User {
  id: string
  email: string
  firstName: string
  lastName: string
}

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  loading: boolean
  error: string | null
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    token: localStorage.getItem('authToken') || null,
    isAuthenticated: !!localStorage.getItem('authToken'),
    loading: false,
    error: null
  }),

  actions: {
    async login(email: string, password: string) {
      this.loading = true
      this.error = null
      try {
        const response = await axios.post('/api/auth/login', { email, password })
        this.token = response.data.token
        this.user = response.data.user

        // Persist token and user info
        localStorage.setItem('authToken', this.token!)
        localStorage.setItem('authUser', JSON.stringify(this.user))

        this.isAuthenticated = true
      } catch (error: any) {
        console.error('Login error:', error)
        this.error = error.response?.data?.message || 'Login failed. Please try again.'
      } finally {
        this.loading = false
      }
    },

    async register(email: string, password: string, firstName: string, lastName: string) {
      this.loading = true
      this.error = null
      try {
        await axios.post('/api/auth/register', { email, password, firstName, lastName })
        // After registration, auto-login
        await this.login(email, password)
      } catch (error: any) {
        console.error('Registration error:', error)
        this.error = error.response?.data?.message || 'Registration failed. Please try again.'
      } finally {
        this.loading = false
      }
    },

    async fetchUser() {
      if (!this.token) return
      this.loading = true
      try {
        const response = await axios.get('/api/auth/me', {
          headers: { Authorization: `Bearer ${this.token}` }
        })
        this.user = response.data
        this.isAuthenticated = true
      } catch (error) {
        console.error('Fetch user error:', error)
        this.logout()
      } finally {
        this.loading = false
      }
    },

    logout() {
      this.user = null
      this.token = null
      this.isAuthenticated = false

      // Clear local storage
      localStorage.removeItem('authToken')
      localStorage.removeItem('authUser')
    },

    getToken() {
      return this.token
    },

    getUser() {
      return this.user
    }
  }
})
