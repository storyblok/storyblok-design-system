import SbButton from '../index'
import { mount } from '@vue/test-utils'

const factory = propsData => {
  return mount(SbButton, {
    propsData
  })
}

describe('Test SbButton Component', () => {
  it('test default SbButton', async () => {
    const wrapper = factory({
      label: 'Primary'
    })

    expect(wrapper.find('button').attributes('class')).toBe('sb-button sb-button--primary')
    expect(wrapper.find('button').text()).toBe('Primary')
  })

  it('test default SbButton in small size', async () => {
    const wrapper = factory({
      label: 'Small button',
      size: 'small'
    })

    expect(wrapper.find('button').attributes('class')).toBe('sb-button sb-button--primary sb-button--small')
    expect(wrapper.find('button').text()).toBe('Small button')
  })

  it('test default SbButton in large size', async () => {
    const wrapper = factory({
      label: 'Large Button',
      size: 'large'
    })

    expect(wrapper.find('button').attributes('class')).toBe('sb-button sb-button--primary sb-button--large')
    expect(wrapper.find('button').text()).toBe('Large Button')
  })

  it('test SbButton in secondary color', async () => {
    const wrapper = factory({
      label: 'Secondary Button',
      type: 'secondary'
    })

    expect(wrapper.find('button').attributes('class')).toBe('sb-button sb-button--secondary')
    expect(wrapper.find('button').text()).toBe('Secondary Button')
  })

  it('test SbButton disabled', async () => {
    const wrapper = factory({
      label: 'Disabled Button',
      isDisabled: true
    })

    expect(wrapper.find('button').attributes('class')).toBe('sb-button sb-button--primary sb-button--disabled')
    expect(wrapper.find('button').text()).toBe('Disabled Button')
  })
})
