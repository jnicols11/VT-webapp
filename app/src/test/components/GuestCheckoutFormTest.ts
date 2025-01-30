import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import GuestCheckoutForm from '@/components/GuestCheckoutForm.vue'
import { createTestingPinia } from '@pinia/testing'
import { useCartStore } from '@/stores/CartStore'

describe('GuestCheckoutForm.vue', () => {
  let wrapper: any
  let cartStore: any

  beforeEach(() => {
    wrapper = mount(GuestCheckoutForm, {
      global: {
        plugins: [createTestingPinia({ createSpy: vi.fn })]
      }
    })
    cartStore = useCartStore()
  })

  it('renders checkout form correctly', () => {
    expect(wrapper.find('form').exists()).toBe(true)
    expect(wrapper.find('input[type="email"]').exists()).toBe(true)
    expect(wrapper.find('textarea').exists()).toBe(true)
    expect(wrapper.find('button').text()).toBe('Complete Order')
  })

  it('updates email and shippingAddress models when input changes', async () => {
    const emailInput = wrapper.find('input[type="email"]')
    await emailInput.setValue('test@example.com')
    expect(wrapper.vm.email).toBe('test@example.com')

    const textarea = wrapper.find('textarea')
    await textarea.setValue('123 Main Street')
    expect(wrapper.vm.shippingAddress).toBe('123 Main Street')
  })

  it('calls checkoutAsGuest when form is submitted', async () => {
    cartStore.checkoutAsGuest = vi.fn().mockResolvedValueOnce({})

    await wrapper.find('input[type="email"]').setValue('test@example.com')
    await wrapper.find('textarea').setValue('456 Elm Street')
    await wrapper.find('form').trigger('submit.prevent')

    expect(cartStore.checkoutAsGuest).toHaveBeenCalledWith({
      email: 'test@example.com',
      shippingAddress: '456 Elm Street'
    })
  })

  it('shows alert on successful order completion', async () => {
    global.alert = vi.fn()
    cartStore.checkoutAsGuest = vi.fn().mockResolvedValueOnce({})

    await wrapper.find('form').trigger('submit.prevent')

    expect(global.alert).toHaveBeenCalledWith('Order completed successfully!')
  })

  it('shows error alert if checkout fails', async () => {
    global.alert = vi.fn()
    cartStore.checkoutAsGuest = vi.fn().mockRejectedValueOnce(new Error('Checkout failed'))

    await wrapper.find('form').trigger('submit.prevent')

    expect(global.alert).toHaveBeenCalledWith('Error completing order')
  })
})
