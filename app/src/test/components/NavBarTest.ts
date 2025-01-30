import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import Navbar from '@/components/Navbar.vue'
import { createTestingPinia } from '@pinia/testing'
import { useCartStore } from '@/stores/CartStore'
import { createRouter, createWebHistory } from 'vue-router'
import { createAuth0 } from '@auth0/auth0-vue'

// Mock Vue Router
const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: '/', component: { template: '<div>Home</div>' } }]
})

// Mock Auth0
vi.mock('@auth0/auth0-vue', () => ({
  useAuth0: () => ({
    loginWithRedirect: vi.fn(),
    logout: vi.fn(),
    isAuthenticated: false
  })
}))

describe('Navbar.vue', () => {
  let wrapper: any

  beforeEach(() => {
    wrapper = mount(Navbar, {
      global: {
        plugins: [router, createTestingPinia({ createSpy: vi.fn })]
      }
    })
  })

  it('renders navbar correctly', () => {
    expect(wrapper.find('nav').exists()).toBe(true)
    expect(wrapper.find('a[href="/"]').text()).toBe('VibedThreads')
  })

  it('displays menu links', () => {
    expect(wrapper.text()).toContain('Men')
    expect(wrapper.text()).toContain('Women')
    expect(wrapper.text()).toContain('Kids')
  })

  it('toggles mobile menu', async () => {
    expect(wrapper.find('.hidden').exists()).toBe(true)

    await wrapper.find('button').trigger('click')
    expect(wrapper.vm.isMenuOpen).toBe(true)
  })

  it('calls login when login button is clicked', async () => {
    const loginMock = vi.fn()
    wrapper.vm.login = loginMock
    await wrapper.find('button').trigger('click')
    expect(loginMock).toHaveBeenCalled()
  })

  it('shows cart quantity when items exist', async () => {
    const cartStore = useCartStore()
    cartStore.totalQuantity = 5
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.bg-red-500').text()).toBe('5')
  })
})
