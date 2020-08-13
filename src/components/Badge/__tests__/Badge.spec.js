import { mount } from '@vue/test-utils'
import { waitMs } from '../../../utils/tests-utils'
import SbBadge from '..'

const factory = propsData => {
  return mount(SbBadge, {
    propsData
  })
}

describe('SbBadge component', () => {
  it('test success badge', async () => {
    const wrapper = factory({
      status: 'success'
    })

    await waitMs()

    expect(wrapper.find('span').attributes('class')).toBe('sb-badge sb-badge--success')
    expect(wrapper.find('span').text()).toBe('success')
  })

  it('test if svg was loaded', async () => {
    const wrapper = factory({
      status: 'success',
      icon: true
    })

    await waitMs()

    expect(wrapper.find('img').attributes('class')).toBe('sb-badge--icon')
  })

  it('test success badge with icon', async () => {
    const wrapper = factory({
      status: 'success',
      icon: true
    })

    await waitMs()

    expect(wrapper.find('img').attributes('class')).toBe('sb-badge--icon')
    expect(wrapper.find('span').text()).toBe('success')
  })

  it('test success badge only with icon', async () => {
    const wrapper = factory({
      status: 'success',
      onlyIcon: true
    })

    await waitMs()

    expect(wrapper.find('img').attributes('class')).toBe('sb-badge--icon')
    expect(wrapper.find('span').text()).toBe('')
  })

  it('test render badge with small text', async () => {
    const wrapper = factory({
      status: 'success',
      isSmall: true,
      text: '5'
    })

    await waitMs()

    expect(wrapper.find('span').text()).toBe('5')
    expect(wrapper.find('span').attributes('class')).toBe('sb-badge sb-badge--success sb-badge--small')
  })

  it('test render badge with medium text', async () => {
    const wrapper = factory({
      status: 'success',
      isSmall: true,
      text: '200'
    })

    await waitMs()

    expect(wrapper.find('span').text()).toBe('200')
    expect(wrapper.find('span').attributes('class')).toBe('sb-badge sb-badge--success sb-badge--medium')
  })
})
