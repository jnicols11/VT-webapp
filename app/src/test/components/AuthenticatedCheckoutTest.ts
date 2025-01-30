import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import CheckoutForm from '@/components/CheckoutForm.vue'
import { createTestingPinia } from '@pinia/testing'
import { useCartStore } from '@/stores/CartStore'

describe('CheckoutForm.vue', () => {
  let wrapper: any
  let cartStore: any

  beforeEach(() => {
    wrapper = mount(CheckoutForm, {
      global: {
        plugins: [createTestingPinia({ createSpy: vi.fn })]
      }
    })
    cartStore = useCartStore()
  })

  it('renders checkout form correctly', () => {
    expect(wrapper.find('form').exists()).toBe(true)
    expect(wrapper.find('textarea').exists()).toBe(true)
    expect(wrapper.find('button').text()).toBe('Complete Order')
  })

  it('updates shippingAddress model when input changes', async () => {
    const textarea = wrapper.find('textarea')
    await textarea.setValue('123 Main Street')
    expect(wrapper.vm.shippingAddress).toBe('123 Main Street')
  })

  it('calls checkoutAsAuthenticated when form is submitted', async () => {
    cartStore.checkoutAsAuthenticated = vi.fn().mockResolvedValueOnce({})

    await wrapper.find('textarea').setValue('123 Main Street')
    await wrapper.find('form').trigger('submit.prevent')

    expect(cartStore.checkoutAsAuthenticated).toHaveBeenCalledWith({
      shippingAddress: '123 Main Street'
    })
  })

  it('shows alert on successful order completion', async () => {
    global.alert = vi.fn()
    cartStore.checkoutAsAuthenticated = vi.fn().mockResolvedValueOnce({})

    await wrapper.find('textarea').setValue('456 Elm Street')
    await wrapper.find('form').trigger('submit.prevent')

    expect(global.alert).toHaveBeenCalledWith('Order completed successfully!')
  })

  it('shows error alert if checkout fails', async () => {
    global.alert = vi.fn()
    cartStore.checkoutAsAuthenticated = vi.fn().mockRejectedValueOnce(new Error('Checkout failed'))

    await wrapper.find('form').trigger('submit.prevent')

    expect(global.alert).toHaveBeenCalledWith('Error completing order')
  })
})
