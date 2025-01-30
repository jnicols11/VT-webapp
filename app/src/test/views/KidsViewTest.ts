import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import KidsView from '@/views/KidsView.vue'
import ProductList from '@/components/ProductList.vue'

describe('KidsView.vue', () => {
  it('renders KidsView with correct title', () => {
    const wrapper = mount(KidsView)
    expect(wrapper.text()).toContain("Kid's Clothing")
  })

  it('renders ProductList component with the correct category prop', () => {
    const wrapper = mount(KidsView)

    const productList = wrapper.findComponent(ProductList)
    expect(productList.exists()).toBe(true)
    expect(productList.props('category')).toBe('Kids')
  })
})
