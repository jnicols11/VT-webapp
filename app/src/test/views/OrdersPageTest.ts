import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import OrdersPage from '@/views/OrdersPage.vue'
import { useAuthStore } from '@/stores/AuthStore'
import axios from 'axios'

// Mock AuthStore
vi.mock('@/stores/AuthStore', () => ({
  useAuthStore: vi.fn(() => ({
    getToken: () => 'mock-token',
    getUser: () => ({ id: 1 })
  }))
}))

// Mock Axios
vi.mock('axios')

describe('OrdersPage.vue', () => {
  let ordersMock

  beforeEach(() => {
    ordersMock = [
      {
        id: 101,
        createdAt: '2024-01-20T10:00:00Z',
        status: 'Shipped',
        total: 59.99,
        subtotal: 49.99,
        tax: 5.0,
        shipping: 5.0,
        items: [{ productId: 1, productName: 'Shirt', price: 24.99, quantity: 2 }]
      }
    ]
    axios.get.mockResolvedValue({ data: ordersMock })
  })

  it('fetches and displays orders', async () => {
    const wrapper = mount(OrdersPage)
    await wrapper.vm.$nextTick()

    expect(wrapper.text()).toContain('My Orders')
    expect(wrapper.text()).toContain('Order #101')
    expect(wrapper.text()).toContain('Shipped')
    expect(wrapper.text()).toContain('$59.99')
  })

  it('shows order details when the button is clicked', async () => {
    const wrapper = mount(OrdersPage)
    await wrapper.vm.$nextTick()

    const button = wrapper.find('button')
    await button.trigger('click')

    expect(wrapper.text()).toContain('Shirt')
    expect(wrapper.text()).toContain('Quantity: 2')
  })

  it('displays a loading state before data is fetched', () => {
    axios.get.mockImplementationOnce(() => new Promise(() => {})) // Simulate loading
    const wrapper = mount(OrdersPage)
    expect(wrapper.text()).toContain('Loading orders...')
  })

  it('displays a message when no orders are found', async () => {
    axios.get.mockResolvedValue({ data: [] }) // No orders
    const wrapper = mount(OrdersPage)
    await wrapper.vm.$nextTick()
    expect(wrapper.text()).toContain('You have no orders yet.')
  })
})
