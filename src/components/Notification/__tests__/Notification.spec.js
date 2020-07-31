import SbNotification from '../index'
import { mount } from '@vue/test-utils'

const factory = propsData => {
  return mount(SbNotification, {
    propsData
  })
}

describe('SbNotification tests', () => {
  it('test default notification', async () => {
    const wrapper = factory({
      status: 'success',
      title: 'Notification title',
      description: 'Subtitle text goes here.',
      linkNname: 'Example link',
      link: 'http://#'
    })

    expect(wrapper.find('div').attributes('class')).toBe('sb-notification sb-notification--success')
  })

  it('test short notification', async () => {
    const wrapper = factory({
      status: 'success',
      title: 'Notification title',
      linkNname: 'Example link',
      link: 'http://#',
      short: true
    })

    expect(wrapper.find('div').find('div').attributes('class')).toBe('sb-notification sb-notification--success sb-notification--short sb-notification-banner')
  })

  it('test banner notification', async () => {
    const wrapper = factory({
      status: 'info',
      title: 'Notification title',
      linkNname: 'Example link',
      link: 'http://#',
      format: 'banner'
    })

    expect(wrapper.find('div').attributes('class')).toBe('sb-notification sb-notification--info sb-notification-banner')
  })

  it('test notification assert', async () => {
    const wrapper = factory({
      status: 'info',
      title: 'Notification title',
      description: 'A awesome description',
      linkName: 'Example link',
      link: 'http://storyblok.com'
    })

    const notification = wrapper.findAll('div')

    const classes = ['sb-notification sb-notification--info', 'sb-notification--header', 'sb-notification--content']

    notification.filter((element, index) => {
      // test if all classes at component exists
      expect(element.attributes('class')).toBe(classes[index])

      // test title of the notification
      if (element.find('span').attributes('class') === 'sb-notification--title') {
        expect(element.find('span').text()).toBe('Notification title')
      }

      // test text of description
      if (element.find('p').exists()) {
        expect(element.find('p').text()).toBe('A awesome description')
      }

      // test link atributes
      if (element.find('a').exists()) {
        expect(element.find('a').text()).toBe('Example link')
        expect(element.find('a').attributes('href')).toBe('http://storyblok.com')
      }
    })
  })
})
