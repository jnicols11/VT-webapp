import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AboutPage from '@/views/AboutPage.vue'

describe('AboutPage.vue', () => {
  it('renders the hero section with correct text', () => {
    const wrapper = mount(AboutPage)
    expect(wrapper.text()).toContain('Welcome to VibedThreads')
    expect(wrapper.text()).toContain('Discover the story behind our journey')
  })

  it('renders the vision section with correct heading', () => {
    const wrapper = mount(AboutPage)
    expect(wrapper.text()).toContain('Our Vision')
    expect(wrapper.text()).toContain('VibedThreads is more than just a store')
  })

  it('renders core values section with three values', () => {
    const wrapper = mount(AboutPage)
    expect(wrapper.text()).toContain('Quality')
    expect(wrapper.text()).toContain('Sustainability')
    expect(wrapper.text()).toContain('Innovation')
  })

  it('renders the team section with the developer’s name', () => {
    const wrapper = mount(AboutPage)
    expect(wrapper.text()).toContain('Meet the Team')
    expect(wrapper.text()).toContain('Jordan Nicols-Pyle')
  })

  it('renders the call-to-action button', () => {
    const wrapper = mount(AboutPage)
    expect(wrapper.find('button').text()).toBe('Start Shopping')
  })
})
