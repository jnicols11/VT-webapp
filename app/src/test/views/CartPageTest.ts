import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import CartPage from '@/views/CartPage.vue'
import { useCartStore } from '@/stores/CartStore'
import { createTestingPinia } from '@pinia/testing'
import router from '@/router'

// Mock Router
vi.mock('@/router', () => ({
  push: vi.fn()
}))

describe('CartPage.vue', () => {
  let wrapper: any
  let cartStore: any

  beforeEach(() => {
    wrapper = mount(CartPage, {
      global: {
        plugins: [createTestingPinia({ createSpy: vi.fn })]
      }
    })
    cartStore = useCartStore()
  })

  it('renders shopping cart page', () => {
    expect(wrapper.text()).toContain('Shopping Cart')
  })

  it('displays "Your cart is empty" when cart is empty', () => {
    expect(wrapper.text()).toContain('Your cart is empty.')
  })

  it('displays cart items when products are added', async () => {
    cartStore.cartItems = [
      { id: '1', name: 'Product 1', price: 10, quantity: 2, description: 'Test Product' },
      { id: '2', name: 'Product 2', price: 20, quantity: 1, description: 'Another Product' }
    ]

    await wrapper.vm.$nextTick()

    expect(wrapper.text()).toContain('Product 1')
    expect(wrapper.text()).toContain('Product 2')
    expect(wrapper.text()).toContain('$20.00') // Total for Product 1
    expect(wrapper.text()).toContain('$20.00') // Total for Product 2
  })

  it('correctly calculates subtotal, tax, and total', async () => {
    cartStore.cartItems = [
      { id: '1', name: 'Product 1', price: 10, quantity: 2, description: 'Test Product' }
    ]

    await wrapper.vm.$nextTick()

    expect(wrapper.text()).toContain('Subtotal: $20.00')
    expect(wrapper.text()).toContain('Tax (10%): $2.00')
    expect(wrapper.text()).toContain('Shipping: $5.99')
    expect(wrapper.text()).toContain('Total: $27.99')
  })

  it('removes product from cart when "Remove" button is clicked', async () => {
    cartStore.cartItems = [
      { id: '1', name: 'Product 1', price: 10, quantity: 2, description: 'Test Product' }
    ]

    await wrapper.vm.$nextTick()
    await wrapper.find('button.text-red-500').trigger('click')

    expect(cartStore.cartItems.length).toBe(0)
  })

  it('alerts when proceeding to checkout with an empty cart', async () => {
    global.alert = vi.fn()
    await wrapper.vm.proceedToCheckout()
    expect(global.alert).toHaveBeenCalledWith('Your cart is empty!')
  })

  it('navigates to checkout when "Proceed to Checkout" is clicked', async () => {
    cartStore.cartItems = [
      { id: '1', name: 'Product 1', price: 10, quantity: 2, description: 'Test Product' }
    ]

    await wrapper.vm.$nextTick()
    await wrapper.find('button.bg-blue-600').trigger('click')

    expect(router.push).toHaveBeenCalledWith('/checkout')
  })
})
