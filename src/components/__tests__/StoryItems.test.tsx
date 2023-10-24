import { describe, it, expect } from 'vitest'
import { render, screen, waitFor, fireEvent } from "@testing-library/vue";
import { nextTick } from 'Vue'
import { mount } from '@vue/test-utils'
import StoryItems from '../StoryItems.vue'

describe('StoryItems', () => {
  it('renders properly', async () => {

    render(StoryItems, {
      props: {endpoint: 'topstories',baseApiUrl: 'https://hacker-news.firebaseio.com/v0'}

    })

   await nextTick()

    await waitFor(() => {
      expect(screen.getByText('Comment')).toBeDefined()
      console.log('asd')
    });
    


  })
})
