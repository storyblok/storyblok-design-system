import SbLinkButton from '../index'
import { mount } from '@vue/test-utils'

const factory = propsData => {
  return mount(SbLinkButton, {
    propsData
  })
}

describe('Tests for SbLinkButton', () => {
  it('Test if link-button render correctly', async () => {
    const wrapper = factory({
      label: 'Primary',
      to: 'http://storyblok.com',
      title: 'To home page'
    })

    const LinkButton = wrapper.find('button')

    expect(LinkButton.attributes('class')).toBe('sb-link-button sb-link-button--primary')
    expect(LinkButton.find('a').attributes('href')).toBe('http://storyblok.com')
    expect(LinkButton.find('a').attributes('title')).toBe('To home page')
    expect(LinkButton.find('a').text()).toBe('Primary')
  })

  it('Test if secondary link-button render correctly', async () => {
    const wrapper = factory({
      label: 'Secondary',
      to: 'http://storyblok.com/v2',
      title: 'To second page',
      status: 'secondary'
    })

    const LinkButton = wrapper.find('button')

    expect(LinkButton.attributes('class')).toBe('sb-link-button sb-link-button--secondary')
    expect(LinkButton.find('a').attributes('href')).toBe('http://storyblok.com/v2')
    expect(LinkButton.find('a').attributes('title')).toBe('To second page')
    expect(LinkButton.find('a').text()).toBe('Secondary')
  })

  it('Test if primary link-button render icon', async () => {
    const wrapper = factory({
      label: 'Secondary',
      to: 'http://storyblok.com/',
      title: 'Link with icon',
      icon: 'check'
    })

    const LinkButton = wrapper.find('button')

    expect(LinkButton.attributes('class')).toBe('sb-link-button sb-link-button--primary')
    expect(LinkButton.find('a').attributes('href')).toBe('http://storyblok.com/')
    expect(LinkButton.find('a').attributes('title')).toBe('Link with icon')

    expect(LinkButton.find('img').attributes('class')).toBe('sb-link-button--icon')
    expect(LinkButton.find('img').attributes('alt')).toBe('Is check')
  })
})
