import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import CheckoutPage from '@/views/CheckoutPage.vue'
import { useCartStore } from '@/stores/CartStore'
import { createTestingPinia } from '@pinia/testing'
import { loadStripe } from '@stripe/stripe-js'

// Mock Stripe
vi.mock('@stripe/stripe-js', () => ({
  loadStripe: vi.fn(() =>
    Promise.resolve({
      elements: () => ({
        create: vi.fn(() => ({
          mount: vi.fn(),
          destroy: vi.fn(),
          on: vi.fn(),
          update: vi.fn()
        }))
      }),
      createToken: vi.fn(() =>
        Promise.resolve({
          token: { id: 'test_token' },
          error: null
        })
      )
    })
  )
}))

describe('CheckoutPage.vue', () => {
  let wrapper: any
  let cartStore: any

  beforeEach(() => {
    wrapper = mount(CheckoutPage, {
      global: {
        plugins: [createTestingPinia({ createSpy: vi.fn })]
      }
    })
    cartStore = useCartStore()
    cartStore.cartItems = [
      { id: '1', name: 'Product 1', price: 10, quantity: 2 },
      { id: '2', name: 'Product 2', price: 20, quantity: 1 }
    ]
  })

  it('renders checkout page', () => {
    expect(wrapper.text()).toContain('Checkout')
    expect(wrapper.text()).toContain('Billing & Shipping Info')
    expect(wrapper.text()).toContain('Order Summary')
  })

  it('displays cart items in the order summary', async () => {
    await wrapper.vm.$nextTick()
    expect(wrapper.text()).toContain('Product 1')
    expect(wrapper.text()).toContain('Product 2')
    expect(wrapper.text()).toContain('$20.00') // Total for Product 1
    expect(wrapper.text()).toContain('$20.00') // Total for Product 2
  })

  it('calculates subtotal, tax, and total correctly', async () => {
    await wrapper.vm.$nextTick()
    expect(wrapper.text()).toContain('Subtotal: $40.00')
    expect(wrapper.text()).toContain('Tax (10%): $4.00')
    expect(wrapper.text()).toContain('Shipping: $5.99')
    expect(wrapper.text()).toContain('Total: $49.99')
  })

  it('proceeds to payment when form is filled correctly', async () => {
    await wrapper.setData({
      form: {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        address: '123 Main St',
        city: 'New York',
        state: 'NY',
        zipCode: '10001'
      }
    })

    await wrapper.find('form').trigger('submit.prevent')
    expect(wrapper.vm.showPaymentForm).toBe(true)
  })

  it('handles Stripe payment successfully', async () => {
    wrapper.vm.showPaymentForm = true
    await wrapper.vm.submitPayment()

    expect(loadStripe).toHaveBeenCalled()
    expect(wrapper.vm.showPaymentForm).toBe(true)
    expect(wrapper.vm.$data.form.firstName).toBe('John') // Mock user data
  })
})
