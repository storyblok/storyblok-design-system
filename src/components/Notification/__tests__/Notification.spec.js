import SbNotification from '../index'
import { mount } from '@vue/test-utils'

const factory = (props) => {
  return mount(SbNotification, {
    props,
  })
}

describe('SbNotification tests', () => {
  it('test default notification', async () => {
    const wrapper = factory({
      status: 'positive',
    })

    expect(wrapper.find('div').attributes('class')).toBe(
      'sb-notification sb-notification--positive'
    )
  })

  it('test full size notification', async () => {
    const wrapper = factory({
      isFull: true,
    })

    expect(wrapper.find('div').attributes('class')).toBe(
      'sb-notification sb-notification--general sb-notification--full'
    )
  })

  it('test notification content', async () => {
    const wrapper = factory({
      status: 'positive',
      title: 'Notification title',
      description: 'A awesome description',
      linkName: 'Example link',
      link: 'http://storyblok.com',
    })

    expect(wrapper.find('div').attributes('class')).toBe(
      'sb-notification sb-notification--positive sb-notification--content'
    )

    expect(wrapper.find('span').text()).toBe('Notification title')

    expect(wrapper.find('a').text()).toBe('Example link')

    expect(wrapper.find('a').attributes('href')).toBe('http://storyblok.com')
  })
})
