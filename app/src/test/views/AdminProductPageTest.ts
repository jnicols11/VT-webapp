import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import AdminProductPage from '@/views/AdminProductPage.vue'
import axios from 'axios'

// Mock axios
vi.mock('axios')

describe('AdminProductPage.vue', () => {
  let wrapper: any

  beforeEach(() => {
    wrapper = mount(AdminProductPage)
  })

  it('renders the admin product management page', () => {
    expect(wrapper.text()).toContain('Admin Product Management')
    expect(wrapper.text()).toContain('All Products')
  })

  it('fetches products on mount', async () => {
    ;(axios.get as jest.Mock).mockResolvedValue({
      data: [
        { productId: 1, name: 'Product 1', price: 100, quantity: 10 },
        { productId: 2, name: 'Product 2', price: 200, quantity: 5 }
      ]
    })

    await wrapper.vm.fetchProducts()
    expect(wrapper.vm.products.length).toBe(2)
    expect(wrapper.text()).toContain('Product 1')
    expect(wrapper.text()).toContain('Product 2')
  })

  it('sets product for editing', async () => {
    const product = { productId: 1, name: 'Test Product', price: 100, quantity: 10, images: [] }
    await wrapper.vm.editProduct(product)
    expect(wrapper.vm.isEditing).toBe(true)
    expect(wrapper.vm.currentProduct.name).toBe('Test Product')
  })

  it('handles product deletion', async () => {
    ;(axios.delete as jest.Mock).mockResolvedValue({})
    await wrapper.vm.deleteProduct(1)
    expect(axios.delete).toHaveBeenCalledWith('http://localhost:8080/api/products/1')
  })

  it('handles form submission for adding a product', async () => {
    ;(axios.post as jest.Mock).mockResolvedValue({ data: {} })
    wrapper.vm.currentProduct = {
      productId: 0,
      name: 'New Product',
      price: 50,
      quantity: 5,
      images: []
    }
    await wrapper.vm.submitProductForm()
    expect(axios.post).toHaveBeenCalled()
  })

  it('handles form submission for updating a product', async () => {
    ;(axios.put as jest.Mock).mockResolvedValue({ data: {} })
    wrapper.vm.isEditing = true
    wrapper.vm.currentProduct = {
      productId: 1,
      name: 'Updated Product',
      price: 120,
      quantity: 8,
      images: []
    }
    await wrapper.vm.submitProductForm()
    expect(axios.put).toHaveBeenCalledWith(
      'http://localhost:8080/api/products/1',
      expect.any(FormData)
    )
  })
})
