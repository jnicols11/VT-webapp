import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import ProductList from '@/components/ProductList.vue'
import axios from 'axios'
import { createRouter, createWebHistory } from 'vue-router'

// Mocking Vue Router for <RouterLink>
const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: '/product/:id', component: {} }]
})

// Mock Axios
vi.mock('axios')

describe('ProductList.vue', () => {
  let wrapper: any

  beforeEach(() => {
    wrapper = mount(ProductList, {
      global: {
        plugins: [router],
        stubs: ['RouterLink']
      },
      props: { category: 'men' }
    })
  })

  it('renders loading skeleton when fetching data', async () => {
    wrapper.setData({ isLoading: true })
    await wrapper.vm.$nextTick()
    expect(wrapper.findAll('.animate-pulse').length).toBeGreaterThan(0)
  })

  it('displays error message when request fails', async () => {
    wrapper.setData({ hasError: true, isLoading: false })
    await wrapper.vm.$nextTick()
    expect(wrapper.text()).toContain('Oops! Something went wrong.')
  })

  it('displays "No Products Available" when API returns an empty list', async () => {
    wrapper.setData({ products: [], isLoading: false, hasError: false })
    await wrapper.vm.$nextTick()
    expect(wrapper.text()).toContain('No Products Available')
  })

  it('displays products correctly when data is loaded', async () => {
    const mockProducts = [
      { productId: 1, name: 'Shirt', price: 19.99, imageUrl: '/shirt.jpg' },
      { productId: 2, name: 'Jeans', price: 49.99, imageUrl: '/jeans.jpg' }
    ]
    wrapper.setData({ products: mockProducts, isLoading: false, hasError: false })
    await wrapper.vm.$nextTick()

    expect(wrapper.findAll('h2').length).toBe(2)
    expect(wrapper.text()).toContain('Shirt')
    expect(wrapper.text()).toContain('Jeans')
  })

  it('calls API to fetch products on mount', async () => {
    const mockResponse = {
      data: [{ productId: 1, name: 'Shirt', price: 19.99, imageUrl: '/shirt.jpg' }]
    }
    axios.get.mockResolvedValue(mockResponse)

    wrapper = mount(ProductList, {
      global: { plugins: [router] },
      props: { category: 'men' }
    })
    await wrapper.vm.$nextTick()

    expect(axios.get).toHaveBeenCalledWith('http://localhost:8080/api/products/category/men')
    expect(wrapper.vm.products.length).toBe(1)
  })

  it('retries fetching products when retry button is clicked', async () => {
    wrapper.setData({ hasError: true, isLoading: false })
    await wrapper.vm.$nextTick()

    const retryButton = wrapper.find('button')
    expect(retryButton.text()).toBe('Retry')

    vi.spyOn(wrapper.vm, 'fetchProducts')
    await retryButton.trigger('click')

    expect(wrapper.vm.fetchProducts).toHaveBeenCalled()
  })
})
