import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MenView from '@/views/MenView.vue'
import ProductList from '@/components/ProductList.vue'

describe('MenView.vue', () => {
  it('renders the correct title', () => {
    const wrapper = mount(MenView)
    expect(wrapper.text()).toContain("Men's Clothing")
  })

  it('passes the correct category prop to ProductList', () => {
    const wrapper = mount(MenView)
    const productList = wrapper.findComponent(ProductList)
    expect(productList.exists()).toBe(true)
    expect(productList.props('category')).toBe('Mens')
  })
})
