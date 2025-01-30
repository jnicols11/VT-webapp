import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import SearchResults from '@/views/SearchResults.vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

// Mock Vue Router useRoute
vi.mock('vue-router', () => ({
  useRoute: vi.fn(() => ({
    query: { q: 'test' }
  }))
}))

// Mock Axios
vi.mock('axios')

describe('SearchResults.vue', () => {
  let productsMock

  beforeEach(() => {
    productsMock = [
      { productId: 1, name: 'Test Product 1', price: 19.99 },
      { productId: 2, name: 'Test Product 2', price: 29.99 }
    ]
    axios.get.mockResolvedValue({ data: productsMock })
  })

  it('fetches and displays search results', async () => {
    const wrapper = mount(SearchResults)
    await wrapper.vm.$nextTick()

    expect(wrapper.text()).toContain('Search Results')
    expect(wrapper.text()).toContain('Test Product 1')
    expect(wrapper.text()).toContain('Test Product 2')
  })

  it('displays a message when no products are found', async () => {
    axios.get.mockResolvedValue({ data: [] })
    const wrapper = mount(SearchResults)
    await wrapper.vm.$nextTick()

    expect(wrapper.text()).toContain('No products found for "test"')
  })

  it('fetches search results using the correct API query', async () => {
    mount(SearchResults)
    await axios.get

    expect(axios.get).toHaveBeenCalledWith('http://localhost:8080/api/products/search?query=test')
  })
})
