import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import ProductDetails from '@/views/ProductDetails.vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import { useCartStore } from '@/stores/CartStore'

// Mock Vue Router useRoute
vi.mock('vue-router', () => ({
  useRoute: vi.fn(() => ({
    params: { productId: '1' }
  }))
}))

// Mock CartStore
vi.mock('@/stores/CartStore', () => ({
  useCartStore: vi.fn(() => ({
    addToCart: vi.fn()
  }))
}))

// Mock Axios
vi.mock('axios')

describe('ProductDetails.vue', () => {
  let productMock

  beforeEach(() => {
    productMock = {
      productId: 1,
      name: 'Test Product',
      description: 'This is a test product.',
      price: 19.99,
      imageUrl: '/test-image.jpg'
    }
    axios.get.mockResolvedValue({ data: productMock })
  })

  it('fetches and displays product details', async () => {
    const wrapper = mount(ProductDetails)
    await wrapper.vm.$nextTick()

    expect(wrapper.text()).toContain('Test Product')
    expect(wrapper.text()).toContain('This is a test product.')
    expect(wrapper.text()).toContain('$19.99')
  })

  it('displays a loading state before product data is fetched', () => {
    axios.get.mockImplementationOnce(() => new Promise(() => {})) // Simulate loading
    const wrapper = mount(ProductDetails)
    expect(wrapper.text()).toContain('Loading product...')
  })

  it('displays an error message if the product is not found', async () => {
    axios.get.mockRejectedValue(new Error('Product not found'))
    const wrapper = mount(ProductDetails)
    await wrapper.vm.$nextTick()
    expect(wrapper.text()).toContain('Product not found')
  })

  it('adds a product to the cart when clicking "Add to Cart"', async () => {
    const cartStore = useCartStore()
    const wrapper = mount(ProductDetails)
    await wrapper.vm.$nextTick()

    await wrapper.setData({ selectedSize: 'M' }) // Select size
    await wrapper.find('button').trigger('click') // Click "Add to Cart"

    expect(cartStore.addToCart).toHaveBeenCalledWith({
      id: '1',
      name: 'Test Product',
      price: 19.99,
      description: 'This is a test product.'
    })
  })

  it('disables the "Add to Cart" button if no size is selected', async () => {
    const wrapper = mount(ProductDetails)
    await wrapper.vm.$nextTick()

    const button = wrapper.find('button')
    expect(button.attributes('disabled')).toBeDefined() // Ensure the button is disabled
  })
})
