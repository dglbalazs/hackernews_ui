import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import StoryItems from '../StoryItems.vue'

describe('StoryItems', () => {
  it('renders properly', () => {
    const wrapper = mount(StoryItems)
    expect(wrapper.text()).toContain('Lorem')
  })
})
