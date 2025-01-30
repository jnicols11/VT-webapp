import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import LandingView from '@/views/LandingView.vue'
import { useRouter } from 'vue-router'

vi.mock('vue-router', () => ({
  useRouter: vi.fn(() => ({
    push: vi.fn()
  }))
}))

describe('LandingView.vue', () => {
  it('renders the hero section with the correct title', () => {
    const wrapper = mount(LandingView)
    expect(wrapper.text()).toContain('Elevate Your Style with Vibed Threads')
  })

  it('renders the Shop by Category section', () => {
    const wrapper = mount(LandingView)
    expect(wrapper.text()).toContain('Shop by Category')
    expect(wrapper.text()).toContain("Men's Collection")
    expect(wrapper.text()).toContain("Women's Collection")
    expect(wrapper.text()).toContain("Kids' Collection")
  })

  it('renders the customer testimonials section', () => {
    const wrapper = mount(LandingView)
    expect(wrapper.text()).toContain('What Our Customers Say')
    expect(wrapper.text()).toContain('Absolutely love Vibed Threads!')
    expect(wrapper.text()).toContain('My go-to for stylish and comfortable clothes.')
  })

  it('calls router.push when clicking Shop Now', async () => {
    const router = useRouter()
    const wrapper = mount(LandingView)
    await wrapper.find('button').trigger('click')
    expect(router.push).toHaveBeenCalledWith('/shop')
  })

  it('calls router.push when clicking Learn More', async () => {
    const router = useRouter()
    const wrapper = mount(LandingView)
    await wrapper.findAll('button')[1].trigger('click')
    expect(router.push).toHaveBeenCalledWith('/about')
  })

  it('calls router.push when clicking a category', async () => {
    const router = useRouter()
    const wrapper = mount(LandingView)
    await wrapper.findAll('.category-card')[0].trigger('click')
    expect(router.push).toHaveBeenCalledWith('/category/mens')
  })
})
